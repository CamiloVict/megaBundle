import React, { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { View, Platform, StatusBar, AppState, Alert } from 'react-native'
import { useTranslations } from 'dopenative'
import { useDispatch, useSelector } from 'react-redux'
import { useStripe } from '@stripe/stripe-react-native'
import { Header, CheckOutDetails, FooterButton } from '../../components'
import { resetCheckout } from '../../redux/'
import { usePaymentSheetManager } from '../../Core/payment/api'
import { useCartManager } from '../../Core/cart/api'
import AppStyles from '../../AppStyles'
import { Appearance, useColorScheme } from 'react-native'
import styles from './styles'
import { useConfig } from '../../config'
import useOrderManager from '../../apis/OrderAPIManager/hooks/useOrderManager'
import { TNActivityIndicator } from '../../Core/truly-native'

export default function CheckoutScreen({ navigation, route }) {
  const { localized } = useTranslations()

  const config = useConfig()

  const colorScheme = useColorScheme()
  const {
    initPaymentSheet,
    presentPaymentSheet,
    presentApplePay,
    confirmApplePayPayment,
    isApplePaySupported,
  } = useStripe()

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth.user)
  const totalPrice = useSelector(state => state.checkout.totalPrice)
  const shoppingBag = useSelector(state => state.products.shoppingBag)
  const selectedShippingMethod = useSelector(
    state => state.checkout.selectedShippingMethod,
  )
  const selectedPaymentMethod = useSelector(
    state => state.checkout.selectedPaymentMethod,
  )
  const orderHistory = useSelector(state => state.products.orderHistory)
  const currentOrderId = useSelector(state => state.checkout.currentOrderId)
  // const shippingMethods = useSelector((state) => state.checkout.shippingMethods);

  const [isLoading, setIsLoading] = useState(false)

  const appState = useRef(AppState.currentState)

  const { orderAPIManager } = useOrderManager({
    totalPrice,
    shoppingBag,
    currentUser,
    orderHistory,
    currentOrderId,
    selectedShippingMethod,
  })

  const stripeClientSecret = useRef(null)

  const { constructApplePayOptions, retrieveSheetKeys } =
    usePaymentSheetManager(config)
  const { fetchPaypalToken, chargePaypalCustomer, checkoutWithPaypal } =
    useCartManager(config)

  const isStripeCheckoutEnabled = config?.isStripeCheckoutEnabled
  const currentTheme = AppStyles.colorSet[colorScheme]

  useLayoutEffect(() => {
    const colorScheme = Appearance.getColorScheme()
    const currentTheme = AppStyles.navThemeConstants[colorScheme]

    navigation.setOptions({
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? undefined : StatusBar.currentHeight,
      },
      headerBackTitle: localized('Shopping Bag'),
      headerTintColor: currentTheme.fontColor,
    })
  }, [navigation])

  useEffect(() => {
    if (
      (selectedPaymentMethod.key === 'card' ||
        selectedPaymentMethod.isNativePaymentMethod) &&
      config.isStripeCheckoutEnabled
    ) {
      setPaymentKeys()
    }

    AppState.addEventListener('change', handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      onAppStateChange()
    }
    appState.current = nextAppState
  }

  const onAppStateChange = async () => {
    if (orderAPIManager?.handleAppStateChange) {
      return
    }

    const { success, paymentUrl, error } =
      orderAPIManager?.getWebCheckoutStatus()
    if (error) {
      setIsLoading(false)
      return
    }
    if (success) {
      onOrderPlaced()
      return
    }
    if (paymentUrl) {
      Alert.alert(
        localized('Checkout not complete'),
        localized('Do you want to complete your checkout?'),
        [
          {
            text: localized('Complete checkout'),
            onPress: () => orderAPIManager.openWebUrl(paymentUrl),
          },
          {
            text: 'Cancel',
            style: 'destructive',
            onPress: () => setIsLoading(false),
          },
        ],
        { cancelable: true },
      )
    }
  }

  const setPaymentKeys = async () => {
    setIsLoading(true)
    const res = await retrieveSheetKeys(currentUser.email, totalPrice)

    if (!res) {
      alertPaymentSetupFailed()
      return
    }

    const {
      customerId,
      customerEphemeralKeySecret,
      paymentIntentClientSecret,
      clientSecret,
    } = res

    const { error } = await initPaymentSheet({
      customerId,
      customerEphemeralKeySecret,
      paymentIntentClientSecret,
      applePay: false,
      googlePay: false,
      testEnv: true,
      // merchantCountryCode: 'US',
    })

    if (error) {
      alertPaymentSetupFailed()
      return
    }

    stripeClientSecret.current = clientSecret
    setIsLoading(false)
  }

  const onContinueCheckout = async () => {
    if (selectedPaymentMethod.isNativePaymentMethod) {
      onNativePay()
      return
    }

    if (selectedPaymentMethod.key === 'paypal') {
      handlePaypalPayment()
      return
    }

    if (selectedPaymentMethod.key === 'cashOnDelivery') {
      handleCashOnDelivery()
      return
    }

    if (!stripeClientSecret.current) {
      alertPaymentSetupFailed()
      return
    }

    setIsLoading(true)

    const { order, error: orderError } = await orderAPIManager?.startCheckout()

    if (orderError) {
      setIsLoading(false)
      return
    }

    if (!order) {
      return
    }

    const { error, paymentOption } = await presentPaymentSheet({
      clientSecret: stripeClientSecret.current,
      confirmPayment: true,
    })

    if (error) {
      alertTransactionFailed(error.localizedMessage)
      return null
    }
    const res = await orderAPIManager?.persistOrder(order)

    if (res?.order) {
      alertOrderPlaced()
      return null
    }
    setIsLoading(false)
  }

  const getAppleCartItems = () => {
    return shoppingBag?.map(shoppingBagItem => ({
      label: shoppingBagItem?.name ?? '',
      amount: (
        Number(shoppingBagItem.price) * shoppingBagItem.quantity
      )?.toFixed(2),
    }))
  }

  const handlePaypalPayment = async () => {
    const { order } = await orderAPIManager?.startCheckout()

    if (!order) {
      return
    }

    setIsLoading(true)

    fetchPaypalToken().then(async token => {
      if (token.success) {
        let res = await chargePaypalCustomer({
          token: token.clientToken,
          amount: totalPrice,
          currency: 'USD',
        })
        if (res.success) {
          checkoutWithPaypal({ nonce: res.nonce, amount: totalPrice }).then(
            async checkoutRes => {
              if (checkoutRes.success) {
                const result = await orderAPIManager?.persistOrder(order)
                if (result?.order) {
                  alertOrderPlaced()
                  return null
                }
                setIsLoading(false)
              }
            },
          )
        } else {
          alertTransactionFailed()
        }
      } else {
        alertTransactionFailed()
      }
    })
  }

  const handleCashOnDelivery = async () => {
    setIsLoading(true)
    const { order } = await orderAPIManager?.startCheckout()

    if (!order) {
      return
    }
    const res = await orderAPIManager?.persistOrder(order)
    if (res?.order) {
      alertOrderPlaced()
      return
    }
    setIsLoading(false)
  }

  const onNativePay = async () => {
    if (!isApplePaySupported) return

    const { order } = await orderAPIManager?.startCheckout()

    if (!order) {
      return
    }

    setIsLoading(true)
    const applePayOptions = await constructApplePayOptions(getAppleCartItems())
    const { error } = await presentApplePay(applePayOptions)
    if (error) {
      // handle error
      alertTransactionFailed()
      return
    }

    const { error: confirmError } = await confirmApplePayPayment(
      stripeClientSecret.current,
    )

    if (confirmError) {
      // handle error
      alertTransactionFailed()
      return
    }

    const res = await orderAPIManager?.persistOrder(order)

    if (res?.order) {
      alertOrderPlaced()
      return null
    }
    setIsLoading(false)
  }

  const alertPaymentSetupFailed = () => {
    Alert.alert(
      localized('Failed to set up payment'),
      localized(
        'An error occurred while setting up payment. Please try again later',
      ),
      [
        {
          text: localized('OK'),
          onPress: () => setIsLoading(false),
        },
      ],
    )
  }

  const alertTransactionFailed = errMessage => {
    Alert.alert(
      localized('Transaction Failed'),
      errMessage ??
        localized('Please select another card or try another means of payment'),
      [
        {
          text: localized('OK'),
          onPress: () => setIsLoading(false),
        },
      ],
    )
  }

  const alertOrderPlaced = order => {
    Alert.alert(
      localized('Congratulations!'),
      localized('Your order has been placed successfully.'),
      [
        {
          text: localized('OK'),
          onPress: () => onOrderPlaced(order),
        },
      ],
    )
  }

  const onOrderPlaced = () => {
    setIsLoading(false)
    dispatch(resetCheckout())
    // props.onCancelPress && props.onCancelPress();
    navigation.navigate('Order', { config })
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: currentTheme.mainThemeBackgroundColor,
      }}>
      <Header
        headerContainerStyle={{ borderBottomWidth: 0 }}
        headerStyle={{ fontFamily: AppStyles.fontFamily.boldFont }}
        title={'Checkout'}
      />
      <CheckOutDetails
        config={config}
        totalPrice={totalPrice}
        selectedShippingMethod={selectedShippingMethod}
        title={'Shipping Adress'}
        isShippinngAddress={true}
        isStripeCheckoutEnabled={isStripeCheckoutEnabled}
      />
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <FooterButton
          footerContainerStyle={{
            backgroundColor: currentTheme.mainThemeForegroundColor,
          }}
          footerTitleStyle={{ color: 'white' }}
          onPress={onContinueCheckout}
          title={localized('Countinue checkout')}
        />
      </View>
      {isLoading && <TNActivityIndicator />}
    </View>
  )
}

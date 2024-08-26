import React, { useLayoutEffect, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTranslations } from 'dopenative'
import {
  Header,
  ProcedureImage,
  PaymentOptions,
  HeaderButton,
} from '../../components'
import DataAPIManager from '../../apis/DataAPIManager'
import { setShippingMethods } from '../../redux'
import AppStyles from '../../AppStyles'
import { Appearance } from 'react-native'

import { useConfig } from '../../config'

export default function PaymentMethodScreen({ route, navigation }) {
  const { localized } = useTranslations()

  const dispatch = useDispatch()
  const paymentMethods = useSelector(({ checkout }) => checkout.paymentMethods)
  const user = useSelector(({ app }) => app.user)
  const config = useConfig()

  const dataAPIManager = useRef(new DataAPIManager(config)).current

  useLayoutEffect(() => {
    const colorScheme = Appearance.getColorScheme()
    const currentTheme = AppStyles.navThemeConstants[colorScheme]

    navigation.setOptions({
      headerTintColor: currentTheme.fontColor,
      cardStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
      },
      title: '',
      headerLeft: () => (
        <HeaderButton
          onPress={() => {
            navigation.goBack()
          }}
          buttonContainerStyle={{ marginLeft: 10 }}
          title={localized('Cancel')}
        />
      ),
      headerRight: () => (
        <HeaderButton
          onPress={() => {
            navigation.replace('ShippingAddress', {
              config: route.params.config,
            })
          }}
          buttonContainerStyle={{ marginRight: 10 }}
          title={localized('Next')}
        />
      ),
    })
  }, [])

  useEffect(() => {
    loadData()
    return dataAPIManager.unsubscribe && dataAPIManager.unsubscribe()
  }, [])

  const loadData = () => {
    dataAPIManager.loadShippingMethods(user, ({ shippingMethods }) => {
      if (shippingMethods?.length > 1) {
        dispatch(setShippingMethods(shippingMethods))
      }
    })
  }

  const colorScheme = Appearance.getColorScheme()
  const currentTheme = AppStyles.colorSet[colorScheme]

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: currentTheme.mainThemeBackgroundColor }}>
      <Header title={localized('Payment Method')} />
      <ProcedureImage source={AppStyles.imageSet.creditCard} />
      <PaymentOptions navigation={navigation} paymentMethods={paymentMethods} />
    </KeyboardAwareScrollView>
  )
}

import React, { useEffect, useRef } from 'react'
import { View, Platform, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslations } from 'dopenative'
import {
  Header,
  ProcedureImage,
  ShippingDetails,
  HeaderButton,
} from '../../components'
import {
  setSelectedShippingMethod,
  setTotalPrice,
} from '../../Core/payment/redux/checkout'
import AppStyles from '../../AppStyles'
import { Appearance, useColorScheme } from 'react-native'
import { useConfig } from '../../config'

export default function ShippingMethodScreen(props) {
  const { localized } = useTranslations()
  const { navigation } = props

  const colorScheme = useColorScheme()

  const config = useConfig()

  const dispatch = useDispatch()
  const selectedShipppingMethodIndex = useSelector(
    ({ checkout }) => checkout.selectedShipppingMethodIndex,
  )
  const shippingAddress = useSelector(({ app }) => app.user.shippingAddress)
  const shippingMethods = useSelector(
    ({ checkout }) => checkout.shippingMethods,
  )

  useEffect(() => {
    const currentTheme = AppStyles.navThemeConstants[colorScheme]

    navigation.setOptions({
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? undefined : StatusBar.currentHeight,
      },
      headerBackTitle: localized('Shopping Bag'),
      headerTintColor: currentTheme.fontColor,
      headerRight: () => (
        <HeaderButton
          onPress={navigateUser}
          buttonContainerStyle={{ marginRight: 10 }}
          title={'Done'}
        />
      ),
    })
    dispatch(
      setSelectedShippingMethod(shippingMethods[selectedShipppingMethodIndex]),
    )
  }, [])

  const onShippingMethodSelected = selectedIndex => {
    dispatch(setSelectedShippingMethod(shippingMethods[selectedIndex]))
  }

  const navigateUser = () => {
    dispatch(setTotalPrice())
    navigation.replace('Checkout', { config: config })
  }

  const currentTheme = AppStyles.colorSet[colorScheme]
  return (
    <View
      style={{
        backgroundColor: currentTheme.mainThemeBackgroundColor,
        flex: 1,
      }}>
      <Header title={localized('Shipping')} />
      <ProcedureImage source={AppStyles.imageSet.box} />
      <ShippingDetails
        selectedShipppingMethodIndex={selectedShipppingMethodIndex}
        isShippinngMethod={true}
        shippingMethods={shippingMethods}
        shippingAddress={shippingAddress}
        onShippingMethodSelected={onShippingMethodSelected}
        title={localized('Shipping Method')}
        onChangeValue={() => {}}
      />
    </View>
  )
}

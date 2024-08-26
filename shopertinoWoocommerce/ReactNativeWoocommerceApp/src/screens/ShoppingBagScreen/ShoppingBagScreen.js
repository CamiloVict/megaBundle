import React, { useLayoutEffect, useRef, useEffect } from 'react'
import { Alert, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme, useTranslations } from 'dopenative'
import { ShoppingBag } from '../../components'
import { removeFromShoppingBag, updateShoppingBag } from '../../redux'
import { setSubtotalPrice } from '../../Core/payment/redux/checkout'
import DataAPIManager from '../../apis/DataAPIManager'
import { useConfig } from '../../config'

const ShoppingBagScreen = ({ navigation }) => {
  const config = useConfig()
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()

  const dispatch = useDispatch()
  // const user = useSelector(state => state.auth.user)
  const totalShoppinBagPrice = useSelector(
    state => state.products.totalShoppinBagPrice,
  )
  const shoppingBag = useSelector(state => state.products.shoppingBag)

  const dataAPIManager = useRef(null)

  useEffect(() => {
    dataAPIManager.current = new DataAPIManager(config)
  }, [])

  useLayoutEffect(() => {
    const currentTheme = theme.navThemeConstants[appearance]
    navigation.setOptions({
      title: localized('Shopping Bag'),
      headerTintColor: currentTheme.fontColor,
      headerBackTitle: localized('Shop'),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? undefined : StatusBar.currentHeight,
      },
    })
  }, [appearance])

  const onQtyChange = product => {
    dispatch(updateShoppingBag(product))
  }

  const onLongPress = item => {
    Alert.alert(
      localized('Remove from cart'),
      localized('This product will be removed from cart.'),
      [
        {
          text: localized('Remove'),
          onPress: () => dispatch(removeFromShoppingBag(item)),
          style: 'destructive',
        },
        {
          text: localized('Cancel'),
        },
      ],
      { cancelable: true },
    )
  }

  const onColorSelected = ({ item, index }) => {
    item.selectedColorIndex = index

    dispatch(updateShoppingBag(item))
  }

  const onSizeSelected = ({ item, index }) => {
    item.selectedSizeIndex = index
    dispatch(updateShoppingBag(item))
  }

  const onAttributesSelected = (item, selectedAttributes) => {
    item.selectedAttributes = selectedAttributes
    dispatch(updateShoppingBag(item))
  }

  const onContinuePress = async () => {
    if (shoppingBag.length < 1) {
      return
    }
    dispatch(setSubtotalPrice(Number(totalShoppinBagPrice)))

    if (!config.isStripeCheckoutEnabled) {
      navigation.navigate('ShippingAddress', {
        appConfig: config,
      })
      return
    }

    navigation.navigate('PaymentMethod', {
      appConfig: config,
    })
  }

  const onRemoveFromShipping = item => {
    dispatch(removeFromShoppingBag(item))
  }

  return (
    <ShoppingBag
      shoppingBag={shoppingBag}
      totalShoppinBagPrice={totalShoppinBagPrice}
      removeFromShoppingBag={onRemoveFromShipping}
      onContinuePress={onContinuePress}
      onColorSelected={onColorSelected}
      onSizeSelected={onSizeSelected}
      onQtyChange={onQtyChange}
      onAttributesSelected={onAttributesSelected}
      onLongPress={onLongPress}
      appConfig={config}
    />
  )
}

export default ShoppingBagScreen

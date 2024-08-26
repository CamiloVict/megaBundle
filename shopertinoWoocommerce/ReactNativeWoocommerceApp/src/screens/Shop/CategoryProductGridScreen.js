import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { View, StatusBar, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { useTranslations, useTheme } from 'dopenative'
import { ProductGrid, ProductDetailModal } from '../../components'
import styles from './styles'
import AppStyles from '../../AppStyles'

import { TNEmptyStateView } from '../../Core/truly-native'
import { useConfig } from '../../config'

const CategoryProductGridScreen = ({ extraData, navigation, route }) => {
  const { theme, appearance } = useTheme()
  const { localized } = useTranslations()
  const config = useConfig()

  const allProducts = useSelector(state => state.products.allProducts)
  const user = useSelector(state => state.app.user)
  const wishlist = useSelector(state => state.products.wishlist)
  const shippingMethods = useSelector(state => state.checkout.shippingMethods)

  const [isProductDetailVisible, setIsProductDetailVisible] = useState(false)
  const [product, setProduct] = useState({})
  const [categoryProducts, setCategoryProducts] = useState([])

  const products = useRef(route.params.products).current
  const categoryId = useRef(route.params.categoryId).current

  const emptyStateConfig = {
    title: localized('Empty Category'),
    description: localized(
      'There are no products for this category. Please check back later',
    ),
    buttonName: localized('Go back'),
    onPress: () => navigation.goBack(),
  }

  useLayoutEffect(() => {
    const currentTheme = theme.navThemeConstants[appearance]

    navigation.setOptions({
      headerBackTitle: localized('Shop'),
      title:
        typeof route.params === 'undefined' ||
        typeof route.params.title === 'undefined'
          ? localized('Cartegory Grid')
          : route.params.title,
      headerTintColor: currentTheme.fontColor,

      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? undefined : StatusBar.currentHeight,
      },
    })
  }, [])

  useEffect(() => {
    if (products && products.length) {
      setCategoryProducts(products)
    } else {
      getCategoryProducts()
    }
  }, [])

  const getCategoryProducts = () => {
    const categoryProducts = allProducts.filter(product => {
      if (product.categories && typeof product.categories === 'object') {
        return product.categories.find(id => {
          return id === categoryId
        })
      }
    })

    setCategoryProducts(categoryProducts)
  }

  const onCardPress = item => {
    setIsProductDetailVisible(!isProductDetailVisible)
    setProduct(item)
  }

  const onAddToBag = () => {
    setIsProductDetailVisible(false)
  }

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyViewContainer}>
        <TNEmptyStateView
          appStyles={AppStyles}
          emptyStateConfig={emptyStateConfig}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ProductGrid
        products={categoryProducts}
        onCardPress={onCardPress}
        itemContainerStyle={{ alignItems: 'center' }}
        extraData={extraData}
        appConfig={config}
        ListEmptyComponent={renderEmptyList()}
      />
      <ProductDetailModal
        shippingMethods={shippingMethods}
        item={product}
        visible={isProductDetailVisible}
        wishlist={wishlist}
        user={user}
        onAddToBag={onAddToBag}
        onCancelPress={() => setIsProductDetailVisible(!isProductDetailVisible)}
        appConfig={config}
        navigation={navigation}
      />
    </View>
  )
}

export default CategoryProductGridScreen

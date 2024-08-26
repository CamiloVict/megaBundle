import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Home } from '../../components'
import DataAPIManager from '../../apis/DataAPIManager'
import {
  setUserData,
  setCategories,
  setProducts,
  setWishlist,
} from '../../redux/'
import { setShippingAddress } from '../../Core/payment/redux/checkout'
import { useConfig } from '../../config'

const HomeScreen = ({ navigation }) => {
  const config = useConfig()

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const categories = useSelector(state => state.products.categories)
  const allProducts = useSelector(state => state.products.allProducts)
  const wishlist = useSelector(state => state.products.wishlist)

  const [isProductDetailVisible, setIsProductDetailVisible] = useState(false)
  const [product, setProduct] = useState({})
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const dataAPIManager = useRef(null)

  useEffect(() => {
    dataAPIManager.current = new DataAPIManager(config)
    loadData()
    loadShippingAddress()

    return () => {
      dataAPIManager.current?.unsubscribe?.()
    }
  }, [])

  useEffect(() => {
    if (shouldUpdate === false && allProducts.length) {
      setShouldUpdate(true)
    }
  }, [shouldUpdate])

  const loadData = async () => {
    dataAPIManager.current?.loadShopData(({ products, categories }) => {
      setIsLoading(false)
      if (products) {
        loadProducts(products)
      }

      if (categories) {
        loadCategories(categories)
      }
    })

    const wishlist = await dataAPIManager.current?.setWishlistState(user)
    if (wishlist) {
      wishlist?.map(wishlist => {
        dispatch(setWishlist(wishlist))
      })
    }
  }

  const updateUserData = async updatedUser => {
    if (updatedUser.success) {
      dispatch(
        setUserData({
          user: {
            ...updatedUser.data,
          },
        }),
      )
    }
  }

  const loadShippingAddress = () => {
    if (user.shippingAddress) {
      dispatch(setShippingAddress(user.shippingAddress))
    } else if (user.shipping) {
      dispatch(setShippingAddress(user.shipping))
    }
  }

  const onCardPress = item => {
    setProduct(item)
    setIsProductDetailVisible(!isProductDetailVisible)
  }

  const onCategoryPress = item => {
    navigation.navigate('CategoryProductGrid', {
      title: item.name,
      categoryId: item.id,
      products: item.products,
      appConfig: config,
    })
  }

  const onAddToBag = () => {
    setIsProductDetailVisible(false)
  }

  const onModalCancel = () => {
    setIsProductDetailVisible(!isProductDetailVisible)
  }

  const loadProducts = products => {
    dispatch(setProducts(products))
  }

  const loadCategories = categories => {
    dispatch(setCategories(categories))
  }

  return (
    <Home
      categories={categories}
      isLoading={isLoading}
      newArrivals={allProducts}
      featured={allProducts}
      bestSellers={allProducts}
      navigation={navigation}
      onCardPress={onCardPress}
      wishlist={wishlist}
      user={user}
      onCategoryPress={onCategoryPress}
      onAddToBag={onAddToBag}
      product={product}
      isProductDetailVisible={isProductDetailVisible}
      onModalCancelPress={onModalCancel}
      appConfig={config}
    />
  )
}

export default HomeScreen

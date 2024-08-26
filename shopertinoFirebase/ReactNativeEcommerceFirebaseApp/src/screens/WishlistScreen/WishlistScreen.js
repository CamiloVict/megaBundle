import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Wishlist } from '../../components'
import { useConfig } from '../../config'

const WishlistScreen = ({ navigation }) => {
  const user = useSelector(state => state.auth.user)
  const wishlist = useSelector(state => state.products.wishlist)
  const shippingMethods = useSelector(state => state.checkout.shippingMethods)

  const [isProductDetailVisible, setIsProductDetailVisible] = useState(false)
  const [product, setProduct] = useState({})

  const config = useConfig()

  const onAddToBag = () => {
    setIsProductDetailVisible({ isProductDetailVisible: false })
  }

  const onCardPress = item => {
    setProduct(item)
    setIsProductDetailVisible(!isProductDetailVisible)
  }

  const onModalCancel = () => {
    setIsProductDetailVisible(!isProductDetailVisible)
  }

  return (
    <Wishlist
      data={wishlist}
      shippingMethods={shippingMethods}
      onCardPress={onCardPress}
      product={product}
      onAddToBag={onAddToBag}
      onModalCancel={onModalCancel}
      wishlist={wishlist}
      user={user}
      isProductDetailVisible={isProductDetailVisible}
      appConfig={config}
      navigation={navigation}
    />
  )
}

export default WishlistScreen

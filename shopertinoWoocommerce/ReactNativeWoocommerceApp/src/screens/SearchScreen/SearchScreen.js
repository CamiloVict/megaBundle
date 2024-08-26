import React, { useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Search } from '../../components'
import SearchBar from '../../Core/ui/SearchBar/SearchBar'
import { searchByKeyText } from '../../redux/'
import { View } from 'react-native'
import { useTranslations } from 'dopenative'
import styles from './styles'
import { useConfig } from '../../config'

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const wishlist = useSelector(state => state.products.wishlist)
  const shippingMethods = useSelector(state => state.checkout.shippingMethods)
  const searchResultProducts = useSelector(
    state => state.products.searchResultProducts,
  )

  const [isProductDetailVisible, setIsProductDetailVisible] = useState(false)
  const [product, setProduct] = useState({})

  const config = useConfig()
  const { localized } = useTranslations()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.searchBarContainer}>
          <SearchBar
            onChangeText={text => {
              dispatch(searchByKeyText(text))
            }}
            onSearchBarCancel={text => {
              dispatch(searchByKeyText(''))
            }}
            placeholder={localized('Search...')}
          />
        </View>
      ),
    })
  }, [])

  const onCardPress = item => {
    setProduct(item)
    setIsProductDetailVisible(!isProductDetailVisible)
  }

  const onAddToBag = () => {
    setIsProductDetailVisible({ isProductDetailVisible: false })
  }

  const onModalCancel = () => {
    setIsProductDetailVisible(!isProductDetailVisible)
  }

  return (
    <Search
      products={searchResultProducts}
      shippingMethods={shippingMethods}
      onModalCancel={onModalCancel}
      onAddToBag={onAddToBag}
      onCardPress={onCardPress}
      wishlist={wishlist}
      user={user}
      product={product}
      isProductDetailVisible={isProductDetailVisible}
      appConfig={config}
      navigation={navigation}
    />
  )
}

export default SearchScreen

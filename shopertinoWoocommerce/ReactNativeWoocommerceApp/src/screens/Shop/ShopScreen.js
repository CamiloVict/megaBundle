import React from 'react'
import { useSelector } from 'react-redux'
import { Shop } from '../../components'
import { useConfig } from '../../config'

const ShopScreen = ({ navigation }) => {
  const config = useConfig()

  const categories = useSelector(state => state.products.categories)

  return (
    <Shop categories={categories} navigation={navigation} appConfig={config} />
  )
}

export default ShopScreen

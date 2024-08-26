import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View } from 'react-native'
import { Order } from '../../components'
import DataAPIManager from '../../apis/DataAPIManager'
import { loadOrderHistory, updateShoppingBag } from '../../redux/'
import {
  setSubtotalPrice,
  setSelectedShippingMethod,
  setSelectedPaymentMethod,
  setCurrentOrderId,
} from '../../Core/payment/redux/checkout'
import styles from './styles'
import { useConfig } from '../../config'

const OrdersScreen = ({ navigation }) => {
  const config = useConfig()

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const orderHistory = useSelector(state => state.products.orderHistory)

  const [isLoading, setIsLoading] = useState(false)
  const dataAPIManager = useRef(null)

  useEffect(() => {
    dataAPIManager.current = new DataAPIManager(config)
    loadOrder()

    return () => {
      dataAPIManager.current?.unsubscribe?.()
    }
  }, [])

  const loadOrder = () => {
    setIsLoading(true)
    dataAPIManager.current?.loadOrder(user, data => {
      data && setOrderHistory(data)
      setIsLoading(false)
    })
  }

  const setOrderHistory = orders => {
    dispatch(loadOrderHistory(orders))
    setIsLoading(false)
  }

  const onReOrder = order => {
    addToShoppingBag(order.shopertino_products)
    dispatch(setSubtotalPrice(order.totalPrice))
    dispatch(setCurrentOrderId(order.id))

    order.selectedShippingMethod &&
      dispatch(setSelectedShippingMethod(order.selectedShippingMethod))
    dispatch(setSelectedPaymentMethod(order.selectedPaymentMethod))

    navigation.navigate('Bag')
  }

  const addToShoppingBag = products => {
    products.forEach(product => {
      const newProductPriceByQty = {
        id: product.id,
        qty: product.quantity,
        totalPrice: Number(product.price * product.quantity),
      }

      dispatch(updateShoppingBag(product))
    })
  }

  return (
    <View style={styles.container}>
      <Order
        isLoading={isLoading}
        orderHistory={orderHistory}
        navigation={navigation}
        onReOrder={onReOrder}
        appConfig={config}
      />
    </View>
  )
}

export default OrdersScreen

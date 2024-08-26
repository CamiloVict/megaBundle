import { Alert } from 'react-native'
import uuid from 'uuidv4'
import { firebaseDataManager } from '../firebase/'
import Order from '../../models/Order'

export default class {
  constructor(
    {
      totalPrice,
      shoppingBag,
      currentUser,
      orderHistory,
      currentOrderId,
      selectedShippingMethod,
    },
    appConfig,
  ) {
    this.currentUser = currentUser
    this.orderHistory = orderHistory
    this.shoppingBag = shoppingBag
    this.totalPrice = totalPrice
    this.currentOrderId = currentOrderId
    this.selectedShippingMethod = selectedShippingMethod
    this.appConfig = appConfig
  }
  handleAppStateChange = () => {}

  startCheckout = async () => {
    return await this.createOrder()
  }

  createOrder = async () => {
    this.order = {
      id: uuid(),
      createdAt: new Date(),
      shopertino_products:
        this.shoppingBag.length > 0
          ? [...this.shoppingBag]
          : this.getProductsFromOrderHistory(),
      totalPrice: Number(this.totalPrice),
      status: 'Order Placed',
      user: this.currentUser,
      selectedShippingMethod: this.selectedShippingMethod,
      shippingAddress: this.currentUser.shippingAddress,
    }

    if (this.currentUser.id) {
      this.order.user_id = this.currentUser.id
    }

    return { order: this.order }
  }

  persistOrder = async () => {
    const orderCopy = {
      ...this.order,
    }

    if (this.selectedShippingMethod?.amount) {
      orderCopy.totalPrice =
        this.order.totalPrice - this.selectedShippingMethod.amount
    }

    const response = await firebaseDataManager.updateOrders(
      this.appConfig,
      orderCopy,
    )

    if (response.success) {
      return { order: orderCopy }
    }

    if (!response.success) {
      alert(response.error)
    }
  }

  getProductsFromOrderHistory = () => {
    const order = this.orderHistory.find(product => {
      return product.id === this.currentOrderId
    })

    if (
      order &&
      order.shopertino_products &&
      order.shopertino_products.length > 0
    ) {
      return order.shopertino_products
    }
    return []
  }
}

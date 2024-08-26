import { Alert } from 'react-native'
import base64 from 'react-native-base64'
import { shopifyDataManager } from '../shopify'
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

  getWebCheckoutStatus = () => {}

  startCheckout = async () => {
    return await this.createOrder()
  }

  createOrder = async () => {
    const line_items = this.getLineItems(this.shoppingBag)
    const { name, address, apt, zipCode, city, state, country } =
      this.currentUser?.shippingAddress

    this.order = {
      email: this.currentUser.email,
      financial_status: 'paid',
      shipping_address: {
        first_name: name,
        last_name: name,
        address1: apt,
        address2: address,
        city: city,
        province: state,
        zip: zipCode,
        country: country,
      },
      line_items,
      total_price: Number(this.totalPrice),
    }

    if (this.currentUser.id) {
      this.order.customer = {
        id: this.currentUser.id,
      }
    }

    return { order: this.order }
  }

  getLineItems = shoppingBag => {
    const productsItems =
      shoppingBag.length > 0
        ? [...shoppingBag]
        : this.getProductsFromOrderHistory()

    return productsItems.map(product => {
      return {
        variant_id:
          typeof product.id === 'number'
            ? product.id
            : base64.decode(product.id)?.replace(/[^0-9]/g, ''),
        quantity: product.quantity ? product.quantity : 1,
        // meta_data: this.getLineItemMetaData(product),
      }
    })
  }

  getLineItemMetaData = product => {
    if (
      product.selectedAttributes &&
      Object.keys(product.selectedAttributes)?.length
    ) {
      return Object.values(product.selectedAttributes).map(attribute => {
        return { key: attribute.attributeName, value: attribute.option }
      })
    }

    return []
  }

  persistOrder = async order => {
    const orderCopy = {
      ...order,
    }

    if (this.selectedShippingMethod?.amount) {
      orderCopy.total_price =
        order.total_price - this.selectedShippingMethod.amount
    }

    const result = await shopifyDataManager.createOrder({
      order: orderCopy,
    })

    if (result.order) {
      return result
    }

    if (result.error) {
      alert(result.error)
      return null
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

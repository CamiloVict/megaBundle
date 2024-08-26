import { Alert } from 'react-native'
import { wooCommerceDataManager } from '../wooCommerce'
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

    this.order = {
      // payment_method: selectedPaymentMethod.brand,
      // payment_method_title: selectedPaymentMethod.title,
      set_paid: false,
      status: 'pending',
      shipping: {
        first_name: this.currentUser.shipping?.first_name,
        last_name: this.currentUser.shipping?.last_name,
        address_1: this.currentUser.shipping?.address_1,
        address_2: this.currentUser.shipping?.address_2,
        city: this.currentUser.shipping?.city,
        state: this.currentUser.shipping?.state,
        postcode: this.currentUser.shipping?.postcode,
        country: 'US',
      },
      line_items,
      shipping_lines: [
        {
          method_id: this.selectedShippingMethod.id,
          method_title: this.selectedShippingMethod.label,
          total: this.selectedShippingMethod.amount,
        },
      ],
      totalPrice: Number(this.totalPrice),
    }

    if (this.currentUser.id) {
      this.order.customer_id = this.currentUser.id
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
        product_id: product.id,
        quantity: product.quantity ? product.quantity : 1,
        meta_data: this.getLineItemMetaData(product),
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

  persistOrder = async () => {
    const orderCopy = {
      ...this.order,
      status: 'completed',
      set_paid: true,
    }

    if (this.selectedShippingMethod?.amount) {
      orderCopy.totalPrice =
        this.order.totalPrice - this.selectedShippingMethod.amount
    }

    const wooOrderPending = await wooCommerceDataManager.placeOrder(orderCopy)

    if (wooOrderPending.response.id) {
      return { order: wooOrderPending.response }
    }

    if (!wooOrderPending.response.id || !wooOrderPending.success) {
      alert(wooOrderPending.error)
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

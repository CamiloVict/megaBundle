import { Alert, Linking } from 'react-native'
import uuid from 'uuidv4'
import { shopifyDataManager } from '../shopify'

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

  startCheckout = async () => {
    return this.createOrder()
  }

  createOrder = async () => {
    const { name, address, apt, zipCode, city, state, country } =
      this.currentUser?.shippingAddress

    const lineItems = this.getLineItems()

    const params = {
      email: this.currentUser.email,
      lineItems,
      shippingAddress: {
        address1: apt,
        address2: address,
        city: city,
        country: country,
        firstName: name,
        lastName: name,
        province: state,
        zip: zipCode,
      },
    }

    const { success, response, error } =
      await shopifyDataManager.createCheckout(params)
    // shopifyDataManager.createOrder(params);

    if (success && response) {
      this.shopifyCheckoutId = response?.id
      this.openWebUrl(response?.webUrl)
      return { order: null, error }
    }

    if (error) {
      new Error(error)
      if (JSON.parse(error?.message).length) {
        Alert.alert(JSON.parse(error?.message)[0].message)
      } else {
        Alert.alert(error?.message)
      }
    }
    return { order: null, error }
  }

  getLineItems = () => {
    const productsItems =
      this.shoppingBag.length > 0
        ? [...this.shoppingBag]
        : this.getProductsFromOrderHistory()

    return productsItems.map(product => {
      const { id, quantity } = product
      return {
        quantity: parseInt(quantity, 10),
        variantId: id,
      }
    })
  }

  openWebUrl = async url => {
    try {
      await Linking.openURL(url)
    } catch (error) {
      console.warn(error)
    }
  }

  getWebCheckoutStatus() {
    return this.checkIfCheckoutCompleted()
  }

  checkIfCheckoutCompleted = async () => {
    if (!this.shopifyCheckoutId) {
      return { error: true }
    }

    const { success, response, error } = await shopifyDataManager.getCheckout(
      this.shopifyCheckoutId,
    )

    if (error) {
      return { error }
    }

    if (response.order) {
      return { success: true }
    }

    return response.webUrl && { paymentUrl: response.webUrl }
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

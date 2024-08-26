import { Alert } from 'react-native'
import { wooCommerceDataManager } from '../wooCommerce'
import deviceStorage from '../../utils/deviceStorage'

export default class {
  unsubscribe() {}
  async loadShopData(callback) {
    let products = []
    let categories = []

    const { response, success } =
      await wooCommerceDataManager.fetchMoreProducts()

    const { response: catResponse, success: catSuccess } =
      await wooCommerceDataManager.fetchCategories()

    if (success) {
      products = response
    }

    if (catSuccess) {
      categories = catResponse
    }

    callback && callback({ products, categories })
  }

  async setWishlistState(user) {
    const wishlist = await deviceStorage.getWishlist(user.email)
    return wishlist ?? []
  }

  setWishlist(user, wishlist) {
    deviceStorage.storeWishlist(user.email, wishlist)
  }

  async loadShippingMethods(user, callback) {
    const paymentMethods = await deviceStorage.getPaymentMethod(user.email)

    if (paymentMethods) {
      callback && callback({ paymentMethods })
    }
  }

  storeUserShippAddress(user, address, callback) {
    const data = {
      shipping: {
        first_name: address.name,
        last_name: address.name,
        address_1: address.apt,
        address_2: address.address,
        city: address.city,
        state: address.state,
        postcode: address.zipCode,
        country: 'US',
      },
    }

    if (!user?.id) {
      return callback({ shipping: data.shipping })
    }

    wooCommerceDataManager.updateCustomer(user.id, data)
    callback && callback({ shipping: data.shipping })
  }

  onUpdateUser(userID, newUserData) {
    const { firstName, lastName, phone } = newUserData
    const data = {
      first_name: firstName,
      last_name: lastName,
      billing: {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
      },
    }

    wooCommerceDataManager.updateCustomer(userID, data)
  }

  async loadOrder(user, callback) {
    const params = {
      customer: user.id,
    }
    const { response, success } = await wooCommerceDataManager.fetchOrders(
      user,
      params,
    )

    if (response && success) {
      callback && callback(response)
      return
    }
    callback && callback()
  }

  onShoppingBagContinuePress(props, appConfig) {}

  logout() {}
}

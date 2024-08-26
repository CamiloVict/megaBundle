import { Alert } from 'react-native'
import { shopifyDataManager } from '../shopify'
import deviceStorage from '../../utils/deviceStorage'
import Order from './../../models/Order'

export default class {
  constructor(appConfig) {}

  unsubscribe() {}
  async loadShopData(callback) {
    let products = []
    let categories = []

    const { response, success } = await shopifyDataManager.loadProducts()
    const { response: catResponse, success: catSuccess } =
      await shopifyDataManager.loadCategories()

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

  async updateCustomerAddress(user, address, callback) {
    const res = await shopifyDataManager.updateCustomerAddress(user.id, address)

    console.log(res)
    if (res.success) {
      callback && callback({ shippingAddress: address })
    }
    if (!res.success) {
      callback && callback({ success: false })
    }
  }

  storeUserShippAddress(user, address, callback) {
    if (!user?.id) {
      return callback && callback({ shippingAddress: address })
    }
    if (!user.shippingAddress) {
      this.updateCustomerAddress(user, address, callback)
      return
    }

    const oldAddress = { ...user.shippingAddress }
    oldAddress.country = address.country
    const stringifyOldAddress = JSON.stringify(
      Object.values(oldAddress),
    )?.toLowerCase()
    const stringifyNewAddress = JSON.stringify(
      Object.values(address),
    )?.toLowerCase()
    const didChangeAddress = stringifyOldAddress != stringifyNewAddress

    if (!didChangeAddress) {
      return
    }

    this.updateCustomerAddress(user, address, callback)
  }

  onUpdateUser(userID, newUserData) {
    //shopify
    // NOT YET DONE
  }

  async loadOrder(user, callback) {
    const order = await shopifyDataManager.getCustomerOrder(user.id)

    const processedORder = this.processOrders(user, order.response)

    if (order?.success) {
      if (processedORder?.length) {
        processedORder?.sort((a, b) => {
          return b.createdAt - a.createdAt
        })
      }
      callback && callback(processedORder)
      return
    }
    callback && callback()
  }

  processOrders(user, orders) {
    return orders.map(order => {
      const shoppingBag = this.getShoppingBagItems(order.line_items)

      return new Order(
        new Date(order.created_at),
        order.id,
        order.status,
        Number(order.total_price),
        shoppingBag,
        user,
        null,
        null,
        user.shipping_address,
        user.id,
      )
    })
  }

  getShoppingBagItems = lineItems => {
    return lineItems.map(item => {
      return {
        id: item.id,
        quantity: item?.quantity ? item?.quantity : 1,
        photo: item.image,
        name: item.title,
        price: item.price,
      }
    })
  }

  onShoppingBagContinuePress(props, appConfig) {}

  logout() {}
}

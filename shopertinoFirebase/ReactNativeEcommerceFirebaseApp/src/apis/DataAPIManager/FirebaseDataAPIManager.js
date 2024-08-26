import { Alert } from 'react-native'
import { firebaseDataManager } from '../firebase'
import { PaymentAPIManager } from '../../Core/api'

export default class {
  constructor(appConfig) {
    this.appConfig = appConfig
    this.unsubscribeProducts = null
    this.unsubscribeCategories = null
    this.unsubscribePaymentMethods = null
    this.unsubscribeShippingMethods = null
    this.unsubscribeOrders = null
    this.products = []
    this.categories = []
    this.paymentMethods = []
    this.shippingMethods = []
    this.paymentMethodDataManager = new PaymentAPIManager(appConfig)
  }

  unsubscribe() {
    this.unsubscribeProducts && this.unsubscribeProducts()
    this.unsubscribeCategories && this.unsubscribeCategories()
    this.unsubscribePaymentMethods && this.unsubscribePaymentMethods()
    this.unsubscribeShippingMethods && this.unsubscribeShippingMethods()
    this.unsubscribeOrders && this.unsubscribeOrders()
  }

  loadShopData(callback) {
    this.unsubscribeProducts = firebaseDataManager.subscribeProducts(
      this.appConfig,
      data => {
        this.products = data
        callback &&
          callback({ products: this.products, categories: this.categories })
      },
    )

    this.unsubscribeCategories = firebaseDataManager.subscribeCategories(
      this.appConfig,
      data => {
        this.categories = data
        callback &&
          callback({ products: this.products, categories: this.categories })
      },
    )
  }

  async setWishlistState(user) {
    const { wishlist } = user

    return wishlist ?? []
  }

  setWishlist(user, wishlist) {
    firebaseDataManager.setUserWishList(this.appConfig, user.id, wishlist)
  }

  loadShippingMethods(user, callback) {
    this.unsubscribePaymentMethods =
      this.paymentMethodDataManager.subscribePaymentMethods(user.id, data => {
        this.paymentMethods = data
        callback &&
          callback({
            paymentMethods: this.paymentMethods,
            shippingMethods: this.shippingMethods,
          })
      })

    this.unsubscribeShippingMethods =
      firebaseDataManager.subscribeShippingMethods(this.appConfig, data => {
        this.shippingMethods = data
        callback &&
          callback({
            paymentMethods: this.paymentMethods,
            shippingMethods: this.shippingMethods,
          })
      })
  }

  storeUserShippAddress(user, address, callback) {
    if (!user?.id) {
      return callback && callback({ shippingAddress: address })
    }
    firebaseDataManager.setUserShippingAddress(this.appConfig, user.id, address)
    callback && callback({ shippingAddress: address })
  }

  onUpdateUser(userID, newUserData) {
    firebaseDataManager.setUserProfile(this.appConfig, userID, newUserData)
  }

  loadOrder(user, callback) {
    this.unsubscribeOrders = firebaseDataManager.subscribeOrders(
      this.appConfig,
      user.id,
      callback,
    )
  }

  onShoppingBagContinuePress(props, appConfig) {}

  logout() {
    firebaseDataManager.logout()
  }
}

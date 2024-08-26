import { categoriesRef, subscribeCategories } from './categories'
import { savePaymentCharge, updateOrders } from './checkout'
import { setUserProfile } from './editProfile'
import { subscribeOrders } from './orders'
import { productsRef, subscribeProducts } from './products'
import {
  setUserShippingAddress,
  subscribeShippingMethods,
} from './shippingAddress'
import { setUserWishList } from './wishlist'

export const firebaseDataManager = {
  categoriesRef,
  subscribeCategories,
  savePaymentCharge,
  updateOrders,
  setUserProfile,
  subscribeOrders,
  productsRef,
  subscribeProducts,
  setUserShippingAddress,
  subscribeShippingMethods,
  setUserWishList,
}

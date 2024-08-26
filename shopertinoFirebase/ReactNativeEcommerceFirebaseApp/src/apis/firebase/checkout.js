import { firebase } from '../../Core/api/firebase/config'

export const updateOrders = async (appConfig, order) => {
  try {
    const response = await firebase
      .firestore()
      .collection(appConfig.FIREBASE_COLLECTIONS.ORDERS)
      .add(JSON.parse(JSON.stringify(order)))

    return { ...response, success: true }
  } catch (error) {
    return { error, success: false }
  }
}

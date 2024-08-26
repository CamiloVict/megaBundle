import { firebase } from '../../Core/api/firebase/config'

const onOrdersUpdate = (querySnapshot, callback) => {
  const orders = []

  querySnapshot?.forEach(doc => {
    const data = doc.data()

    orders.push(data)
  })

  return callback(orders)
}

export const subscribeOrders = (appConfig, userId, callback) => {
  const ordersRef = firebase
    .firestore()
    .collection(appConfig.FIREBASE_COLLECTIONS.ORDERS)

  return ordersRef
    .where('user_id', '==', userId)
    .onSnapshot(querySnapshot => onOrdersUpdate(querySnapshot, callback))
}

import firestore from '@react-native-firebase/firestore'

export const subscribeToVendorOrders = (
  vendorOrdersTableName,
  viewer,
  callback,
) => {
  // The current user (viewer) is the admin of a vendor, so they can manage all the orders placed for that vendor
  const ref = firestore()
    .collection(vendorOrdersTableName)
    .where('vendorID', '==', viewer.vendorID)
    .orderBy('createdAt', 'desc')

  return ref.onSnapshot(
    querySnapshot => {
      const orders = []
      querySnapshot?.forEach(doc => {
        const order = doc.data()
        orders.push({
          id: doc.id,
          ...order,
        })
      })
      callback?.(orders)
    },
    error => {
      console.warn(error)
    },
  )
}

export const accept = async (vendorOrdersTableName, order) => {
  return firestore()
    .collection(vendorOrdersTableName)
    .doc(order.id)
    .update({ status: 'Order Accepted' })
}

export const reject = async (vendorOrdersTableName, order) => {
  return firestore()
    .collection(vendorOrdersTableName)
    .doc(order.id)
    .update({ status: 'Order Rejected' })
}

export const onDelete = (vendorOrdersTableName, orderID) => {
  firestore()
    .collection(vendorOrdersTableName)
    .doc(orderID)
    .delete()
    .then(result => console.warn(result))
}

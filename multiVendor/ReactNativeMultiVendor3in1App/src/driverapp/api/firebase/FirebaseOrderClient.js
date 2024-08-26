import firestore from '@react-native-firebase/firestore'

export const subscribeToOrders = (config, driverID, callback) => {
  if (!driverID) {
    return () => {}
  }
  const ref = firestore()
    .collection(config.FIREBASE_COLLECTIONS.ORDERS)
    .where('driverID', '==', driverID)
    .orderBy('createdAt', 'desc')

  return ref.onSnapshot(
    sanapshot => {
      callback?.(sanapshot.docs.map(doc => doc.data()))
    },
    error => {
      console.log(error)
      alert(error)
    },
  )
}

export const subscribeToInprogressOrder = (config, orderID, callback) => {
  if (!orderID?.trim()) {
    return () => {}
  }

  return firestore()
    .collection(config.FIREBASE_COLLECTIONS.ORDERS)
    .doc(orderID)
    .onSnapshot(
      snapshot => {
        callback?.(snapshot.data())
      },
      error => {
        console.log(error)
      },
    )
}

export const accept = async (config, order, driver) => {
  if (!driver || !driver.id || driver.id.length === 0) {
    return
  }
  if (!order || !order.id || order.id.length === 0) {
    return
  }
  firestore()
    .collection(config.FIREBASE_COLLECTIONS.ORDERS)
    .doc(order.id)
    .update({
      status: 'Driver Accepted',
      driver,
      driverID: driver.id,
    })

  firestore()
    .collection(config.FIREBASE_COLLECTIONS.USERS)
    .doc(driver.id)
    .update({
      orderRequestData: null,
      inProgressOrderID: order.id,
    })
}

export const reject = async (config, order, driver) => {
  var rejectedByDrivers = order.rejectedByDrivers ? order.rejectedByDrivers : []
  rejectedByDrivers.push(driver.id)

  firestore()
    .collection(this.config.FIREBASE_COLLECTIONS.USERS)
    .doc(driver.id)
    .update({ orderRequestData: null })

  firestore()
    .collection(config.FIREBASE_COLLECTIONS.ORDERS)
    .doc(order.id)
    .update({ status: 'Driver Rejected', rejectedByDrivers })
}

export const onDelete = (config, orderID) => {
  firestore()
    .collection(config.FIREBASE_COLLECTIONS.ORDERS)
    .doc(orderID)
    .delete()
    .then(result => console.warn(result))
}

export const markAsPickedUp = async (config, order) => {
  firestore()
    .collection(config.FIREBASE_COLLECTIONS.ORDERS)
    .doc(order.id)
    .update({ status: 'In Transit' })
}

export const markAsCompleted = async (config, order, driver) => {
  firestore()
    .collection(config.FIREBASE_COLLECTIONS.ORDERS)
    .doc(order.id)
    .update({ status: 'Order Completed' })

  firestore()
    .collection(config.FIREBASE_COLLECTIONS.USERS)
    .doc(driver.id)
    .update({ inProgressOrderID: null, orderRequestData: null })
}

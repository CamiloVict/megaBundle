import { firebase } from '../../Core/api/firebase/config'

export const setUserShippingAddress = async (
  appConfig,
  userId,
  shippingAddress,
) => {
  try {
    const userRef = firebase
      .firestore()
      .collection(appConfig.FIREBASE_COLLECTIONS.USERS)
      .doc(userId)

    await userRef.update({
      shippingAddress,
    })
    const user = await userRef.get()

    return { user: user.data(), success: true }
  } catch (error) {
    return { error, success: false }
  }
}

export const subscribeShippingMethods = (appConfig, callback) => {
  const shippingMethodsRef = firebase
    .firestore()
    .collection(appConfig.FIREBASE_COLLECTIONS.SHIPPING_METHODS)

  return shippingMethodsRef.onSnapshot(querySnapshot => {
    const shippingMethods = []

    querySnapshot?.forEach(doc => {
      const data = doc.data()

      shippingMethods.push(data)
    })

    return callback(shippingMethods)
  })
}

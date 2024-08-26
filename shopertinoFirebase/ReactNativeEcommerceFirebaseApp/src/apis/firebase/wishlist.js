import { firebase } from '../../Core/api/firebase/config'

export const setUserWishList = async (appConfig, userId, wishlist) => {
  try {
    const userRef = firebase
      .firestore()
      .collection(appConfig.FIREBASE_COLLECTIONS.USERS)
      .doc(userId)

    await userRef.update({
      wishlist: JSON.parse(JSON.stringify(wishlist)),
    })
    const user = await userRef.get()

    return { user: user.data(), success: true }
  } catch (error) {
    console.log(error)
    return { error, success: false }
  }
}

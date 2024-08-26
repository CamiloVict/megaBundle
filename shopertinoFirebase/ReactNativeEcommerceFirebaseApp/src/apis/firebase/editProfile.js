import { firebase } from '../../Core/api/firebase/config'

export const setUserProfile = async (appConfig, userId, userData) => {
  try {
    const userRef = firebase
      .firestore()
      .collection(appConfig.FIREBASE_COLLECTIONS.USERS)
      .doc(userId)

    userRef.update({
      ...userData,
    })
  } catch (error) {
    return { error, success: false }
  }
}

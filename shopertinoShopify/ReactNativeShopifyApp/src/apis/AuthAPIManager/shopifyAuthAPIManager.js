import { shopifyDataManager } from '../shopify'
import { ErrorCode } from '../../Core/onboarding/api/ErrorCode'
import authAPI from '../../Core/users'
import deviceStorage from '../../utils/deviceStorage'
import { authManager as firebaseAuthManager } from '../../Core/onboarding/api'

const defaultProfilePhotoURL =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'

const loginWithEmailAndPassword = (email, password, appConfig) => {
  return new Promise(async (resolve, reject) => {
    shopifyDataManager.login(email, password).then(async res => {
      if (!res?.success) {
        return resolve({ error: res.error ? res.error : ErrorCode.noUser })
      }

      if (appConfig.isFirebasePushNotificationEnabled) {
        firebaseAuthManager
          .loginWithEmailAndPassword(email, password, appConfig)
          .then(({ user }) => {
            if (user && res.user?.id) {
              authAPI.updateUser(user.id, {
                shopifyID: res.user?.id,
              })
            }
          })
        return resolve(res)
      }
      resolve(res)
    })
  })
}

const createAccountWithEmailAndPassword = (userDetails, appConfig) => {
  return new Promise(async (resolve, reject) => {
    shopifyDataManager.signup(userDetails).then(async res => {
      if (!res?.success) {
        return resolve({
          error: res.error ? res.error : ErrorCode.serverError,
        })
      }
      if (appConfig.isFirebasePushNotificationEnabled) {
        return firebaseAuthManager
          .createAccountWithEmailAndPassword(userDetails, appConfig)
          .then(({ error, user }) => {
            if (user?.id && res.user?.id) {
              authAPI.updateUser(user.id, {
                shopifyID: res.user?.id,
              })
              resolve(res)
            } else {
              resolve(res)
            }
          })
      }
      resolve(res)
    })
  })
}

const validateUsernameFieldIfNeeded = () => {
  return new Promise(async (resolve, reject) => {
    resolve({ success: true })
  })
}

const retrievePersistedAuthUser = appConfig => {
  return new Promise(async (resolve, reject) => {
    shopifyDataManager.retrievePersistedAuthUser().then(async res => {
      if (!res?.success) {
        return resolve({ error: ErrorCode.noUser })
      }
      if (appConfig.isFirebasePushNotificationEnabled) {
        firebaseAuthManager
          .retrievePersistedAuthUser(appConfig)
          .then(({ user }) => {
            if (user && res.user?.id) {
              authAPI.updateUser(user.id, {
                shopifyID: res.user?.id,
              })
            }
          })
      }
      resolve(res)
    })
  })
}

const logout = (user, appConfig) => {
  deviceStorage.logoutDeviceStorage()
}

export const authManager = {
  retrievePersistedAuthUser,
  loginWithEmailAndPassword,
  logout,
  createAccountWithEmailAndPassword,
  validateUsernameFieldIfNeeded,
}

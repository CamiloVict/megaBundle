import { wooCommerceAuth } from '../wooCommerce'
import { ErrorCode } from '../../Core/onboarding/api/ErrorCode'
import { authManager as firebaseAuthManager } from '../../Core/onboarding/api'
import authAPI from '../../Core/users'
import deviceStorage from '../../utils/deviceStorage'

const defaultProfilePhotoURL =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'

const loginWithEmailAndPassword = (email, password, appConfig) => {
  return new Promise(async (resolve, reject) => {
    const wooResponse = await wooCommerceAuth.authCustomer({
      username: email,
      password: password,
    })

    if (!wooResponse?.success && !wooResponse?.response?.token) {
      resolve({ error: ErrorCode.noUser })
    }

    const res = await getUser(email, appConfig)

    if (!res?.success && !res?.user) {
      resolve({ error: ErrorCode.noUser })
    }

    if (appConfig.isFirebasePushNotificationEnabled) {
      firebaseAuthManager
        .loginWithEmailAndPassword(email, password, appConfig)
        .then(({ user }) => {
          if (user && res.user?.id) {
            authAPI.updateUser(user.id, {
              wooCommerceID: res.user?.id,
            })
          }
        })
      return resolve({
        user: res.user,
      })
    }

    resolve({
      user: res.user,
    })
  })
}

const validateUsernameFieldIfNeeded = () => {
  return new Promise(async (resolve, reject) => {
    resolve({ success: true })
  })
}

const createAccountWithEmailAndPassword = (userDetails, appConfig) => {
  return new Promise(async (resolve, reject) => {
    const { firstName, lastName, email, password } = userDetails

    const wooCustomer = {
      email,
      first_name: firstName,
      password,
      last_name: lastName,
    }

    const res = await wooCommerceAuth.createCustomer(wooCustomer)

    if (!res?.success && !res?.response?.id) {
      return resolve({ error: res.code })
    }

    const userResponse = await wooCommerceAuth.getCustomer({ email })
    const user = userResponse.response[0]

    const authUser = {
      id: user.id,
      email,
      firstName: user.first_name,
      lastName: user.last_name,
      photoURI: user.avatar_url,
      shipping: { ...user.shipping },
      billing: {
        ...user.billing,
      },
      phone: user.billing.phone,
    }

    if (appConfig.isFirebasePushNotificationEnabled) {
      return firebaseAuthManager
        .createAccountWithEmailAndPassword(userDetails, appConfig)
        .then(({ error, user }) => {
          if (user) {
            resolve({
              user: authUser,
            })
          } else {
            resolve({
              error,
            })
          }
        })
    }

    resolve({
      user: authUser,
    })
  })
}

const retrievePersistedAuthUser = appConfig => {
  return new Promise(async (resolve, reject) => {
    const authResponse = await wooCommerceAuth.retrievePersistedAuthUser()

    if (!authResponse?.success && !authResponse?.response?.token) {
      return resolve({
        error: ErrorCode.noUser,
      })
    }

    const res = await getUser(authResponse.response.user_email, appConfig)

    if (!res?.success && !res?.user) {
      return resolve(null)
    }

    if (appConfig.isFirebasePushNotificationEnabled) {
      firebaseAuthManager
        .retrievePersistedAuthUser(appConfig)
        .then(({ user }) => {
          if (user && res.user?.id) {
            authAPI.updateUser(user.id, {
              wooCommerceID: res.user?.id,
            })
          }
        })
    }

    resolve({
      user: res.user,
    })
  })
}

const logout = (user, appConfig) => {
  deviceStorage.logoutDeviceStorage()
}

const getUser = async (email, appConfig) => {
  const userResponse = await wooCommerceAuth.getCustomer({ email })

  if (userResponse.response.length > 0) {
    const user = userResponse.response[0]
    const authUser = {
      id: user.id,
      email,
      firstName: user.first_name,
      lastName: user.last_name,
      photoURI: user.avatar_url,
      shipping: { ...user.shipping },
      billing: { ...user.billing },
      phone: user.billing.phone,
    }

    return {
      success: true,
      user: authUser,
    }
  }

  return {
    success: false,
  }
}

export const authManager = {
  retrievePersistedAuthUser,
  loginWithEmailAndPassword,
  logout,
  createAccountWithEmailAndPassword,
  validateUsernameFieldIfNeeded,
}

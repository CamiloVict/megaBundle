import Geolocation from '@react-native-community/geolocation'
import * as Location from 'expo-location'
import { EventRegister } from 'react-native-event-listeners'

import * as authAPI from './authClient'
import { updateUser } from '../../../users'
import { ErrorCode } from '../../api/ErrorCode'

const defaultProfilePhotoURL =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'

const validateUsernameFieldIfNeeded = (inputFields, appConfig) => {
  return new Promise((resolve, reject) => {
    const usernamePattern = /^[aA-zZ]\w{3,29}$/

    if (!appConfig.isUsernameFieldEnabled) {
      resolve({ success: true })
    }
    if (
      appConfig.isUsernameFieldEnabled &&
      !inputFields?.hasOwnProperty('username')
    ) {
      return resolve({ error: 'Invalid username' })
    }

    if (!usernamePattern.test(inputFields.username)) {
      return resolve({ error: 'Invalid username' })
    }

    resolve({ success: true })
  })
}

const loginWithEmailAndPassword = (email, password) => {
  return new Promise(function (resolve, _reject) {
    authAPI.loginWithEmailAndPassword(email, password).then(response => {
      if (!response.error) {
        handleSuccessfulLogin({ ...response.user }, false).then(res => {
          // Login successful, push token stored, login credential persisted, so we log the user in.
          resolve({ user: res.user })
        })
      } else {
        resolve({ error: response.error })
      }
    })
  })
}

const createAccountWithEmailAndPassword = (userDetails, appConfig) => {
  const { photoFile } = userDetails
  const accountCreationTask = userData => {
    return new Promise((resolve, _reject) => {
      authAPI
        .registerWithEmail(userData, appConfig.appIdentifier)
        .then(async response => {
          if (response.error) {
            resolve({ error: response.error })
          } else {
            // We created the user succesfully, time to upload the profile photo and update the users table with the correct URL
            let user = response.user
              resolve({
                user: {
                  ...response.user,
                  profilePictureURL: defaultProfilePhotoURL,
                },
              })
          }
        })
    })
  }

  return new Promise(function (resolve, _reject) {
    const userData = {
      ...userDetails,
      profilePictureURL: defaultProfilePhotoURL,
    }
    accountCreationTask(userData).then(response => {
      if (response.error) {
        resolve({ error: response.error })
      } else {
        // We signed up successfully, so we are logging the user in (as well as updating push token, persisting credential,s etc.)
        handleSuccessfulLogin(response.user, true).then(response => {
          resolve({
            ...response,
          })
        })
      }
    })
  })
}

const retrievePersistedAuthUser = () => {
  return new Promise(resolve => {
    authAPI.retrievePersistedAuthUser().then(user => {
      if (user) {
        handleSuccessfulLogin(user, false).then(res => {
          // Persisted login successful, push token stored, login credential persisted, so we log the user in.
          resolve({
            user: res.user,
          })
        })
      } else {
        resolve(null)
      }
    })
  })
}

const sendPasswordResetEmail = email => {
  return new Promise(resolve => {
    authAPI.sendPasswordResetEmail(email)
    resolve()
  })
}

const logout = user => {
  const userData = {
    ...user,
    isOnline: false,
  }
  updateUser(user.id || user.userID, userData)
  authAPI.logout()
}


const handleSuccessfulLogin = (user, accountCreated) => {
  // After a successful login, we fetch & store the device token for push notifications, location, online status, etc.
  // we don't wait for fetching & updating the location or push token, for performance reasons (especially on Android)
  fetchAndStoreExtraInfoUponLogin(user, accountCreated)
  return new Promise(resolve => {
    resolve({ user: { ...user } })
  })
}

const fetchAndStoreExtraInfoUponLogin = async (user, accountCreated) => {
  authAPI.fetchAndStorePushTokenIfPossible(user)

  getCurrentLocation().then(async location => {
    const latitude = location.coords.latitude
    const longitude = location.coords.longitude
    var locationData = {}
    if (location) {
      locationData = {
        location: {
          latitude: latitude,
          longitude: longitude,
        },
      }
      if (accountCreated) {
        locationData = {
          ...locationData,
          signUpLocation: {
            latitude: latitude,
            longitude: longitude,
          },
        }
      }
    }

    const userData = {
      ...locationData,
      isOnline: true,
    }

    updateUser(user.id || user.userID, userData)
  })
}

const getCurrentLocation = () => {
  return new Promise(async resolve => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      resolve({ coords: { latitude: '', longitude: '' } })
      return
    }

    Geolocation.getCurrentPosition(
      location => {
        console.log(location)
        resolve(location)
      },
      error => {
        EventRegister.emit('get_current_position_failed')
        console.log(error)
      },
    )

    // setRegion(location.coords);
    // onLocationChange(location.coords);

    // Geolocation.getCurrentPosition(
    //     resolve,
    //     () => resolve({ coords: { latitude: "", longitude: "" } }),
    //     { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    // );
  })
}

const deleteUser = (userID, callback) => {
  authAPI.removeUser(userID).then(response => callback(response))
}

const authManager = {
  validateUsernameFieldIfNeeded,
  retrievePersistedAuthUser,
  loginWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  createAccountWithEmailAndPassword,
  deleteUser,
}

export default authManager

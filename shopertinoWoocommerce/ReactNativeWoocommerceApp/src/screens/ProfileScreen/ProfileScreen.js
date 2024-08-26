import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Profile } from '../../components'
import DataAPIManager from '../../apis/DataAPIManager'
import deviceStorage from '../../utils/deviceStorage'
import { logout } from '../../redux'
import { useConfig } from '../../config'

const ProfileScreen = ({ route, navigation }) => {
  const config = useConfig()

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  const dataAPIManager = useRef(null)

  useEffect(() => {
    dataAPIManager.current = new DataAPIManager(config)
  }, [])

  const onLogout = async () => {
    await deviceStorage.logoutDeviceStorage()
    await dataAPIManager.current?.logout()
    await dispatch(logout())
    onItemPress('LoadScreen')
  }

  const onItemPress = (routeName, title) => {
    navigation.navigate(routeName, {
      title: title ? title : routeName,
      appConfig: config,
    })
  }

  return (
    <Profile
      user={user}
      onLogout={onLogout}
      onItemPress={onItemPress}
      navigation={navigation}
    />
  )
}

export default ProfileScreen

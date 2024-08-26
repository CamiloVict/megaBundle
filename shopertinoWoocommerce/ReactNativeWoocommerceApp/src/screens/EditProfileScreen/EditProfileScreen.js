import React, { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { useTheme, useTranslations } from 'dopenative'
import { useSelector, useDispatch } from 'react-redux'
import { EditProfile, HeaderButton } from '../../components'
import DataAPIManager from '../../apis/DataAPIManager'
import { setUserData } from '../../redux/'
import { useConfig } from '../../config'

const EditProfileScreen = ({ route, navigation }) => {
  const config = useConfig()
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  const [userData, updateUserData] = useState({})

  const dataAPIManager = useRef(null)

  useEffect(() => {
    dataAPIManager.current = new DataAPIManager(config)
  }, [])

  useLayoutEffect(() => {
    const currentTheme = theme.navThemeConstants[appearance]
    navigation.setOptions({
      title:
        typeof route.params === 'undefined' ||
        typeof route.params.title === 'undefined'
          ? localized('Edit Profile')
          : route.params.title,
      headerTintColor: currentTheme.fontColor,
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? undefined : StatusBar.currentHeight,
      },
      headerRight: () => (
        <HeaderButton
          onPress={onUpdateUser}
          buttonContainerStyle={{ marginRight: 10 }}
          title={localized('Done')}
        />
      ),
      headerBackTitle: localized('Profile'),
      headerLeft: () => (
        <HeaderButton
          onPress={() => {
            navigation.goBack()
          }}
          buttonContainerStyle={{ marginLeft: 10 }}
          title={localized('Cancel')}
        />
      ),
    })
  }, [])

  const onUpdateUser = () => {
    dispatch(
      setUserData({
        user: { ...user, ...userData },
      }),
    )
    dataAPIManager.current?.onUpdateUser(user.id, userData)
    navigation.goBack()
  }

  const onProfileDataChange = newUserData => {
    updateUserData(newUserData)
  }

  return <EditProfile user={user} onProfileDataChange={onProfileDataChange} />
}

export default EditProfileScreen

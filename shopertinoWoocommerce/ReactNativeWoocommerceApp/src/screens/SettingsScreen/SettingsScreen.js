import React, { useLayoutEffect } from 'react'
import { StatusBar } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme, useTranslations } from 'dopenative'
// import PropTypes from "prop-types";
import { Settings } from '../../components'
import AppStyles from '../../AppStyles'
import { logout } from '../../redux'

const SettingsScreen = ({ route, navigation }) => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    const currentTheme = theme.navThemeConstants[appearance]
    navigation.setOptions({
      headerBackTitle: localized('Profile'),
      title:
        typeof route.params === 'undefined' ||
        typeof route.params.title === 'undefined'
          ? localized('Settings')
          : route.params.title,
      headerTintColor: currentTheme.fontColor,
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? undefined : StatusBar.currentHeight,
      },
    })
  }, [navigation, appearance])

  const onLogout = () => {
    dispatch(logout())
  }

  return <Settings navigation={navigation} logout={onLogout} />
}

export default SettingsScreen

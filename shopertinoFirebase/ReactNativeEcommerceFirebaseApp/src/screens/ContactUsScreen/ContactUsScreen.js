import React, { useLayoutEffect } from 'react'
import { StatusBar } from 'react-native'
import { ContactUs } from '../../components'
import { useTheme, useTranslations } from 'dopenative'

const ContactUsScreen = ({ navigation, route }) => {
  const { theme, appearance } = useTheme()
  const { localized } = useTranslations()

  useLayoutEffect(() => {
    const currentTheme = theme.navThemeConstants[appearance]
    navigation.setOptions({
      title:
        typeof route.params === 'undefined' ||
        typeof route.params.title === 'undefined'
          ? localized('Contact Us')
          : route.params.title,
      headerBackTitle: localized('Profile'),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? undefined : StatusBar.currentHeight,
      },
      headerTintColor: currentTheme.fontColor,
    })
  }, [navigation, appearance])

  return <ContactUs />
}

export default ContactUsScreen

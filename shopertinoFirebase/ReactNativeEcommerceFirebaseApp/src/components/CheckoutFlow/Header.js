import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { useColorScheme } from 'react-native'
import dynamicStyles from './styles'

function Header(props) {
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)
  const { title, headerContainerStyle, headerStyle } = props

  return (
    <View style={[styles.headerContainer, headerContainerStyle]}>
      <Text style={[styles.header, headerStyle]}>{title}</Text>
    </View>
  )
}

export default Header

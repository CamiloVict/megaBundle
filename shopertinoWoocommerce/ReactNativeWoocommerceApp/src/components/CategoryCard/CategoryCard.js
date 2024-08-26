import PropTypes from 'prop-types'
import React from 'react'
import { ImageBackground, TouchableOpacity, Text } from 'react-native'
import { useColorScheme } from 'react-native'
import dynamicStyles from './styles'

function CategoryCard(props) {
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)

  const { item, imageContainerStyle, onCategoryPress } = props

  return (
    <ImageBackground
      source={{ uri: item.photo }}
      style={[styles.categoryImageContainer, imageContainerStyle]}
      imageStyle={styles.categoryImage}
      resizeMode="cover">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onCategoryPress}
        style={styles.categoryTextContainerView}>
        <Text style={styles.categoryText}>{item.name.toUpperCase()}</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

export default CategoryCard

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import { useColorScheme } from 'react-native'
import dynamicStyles from './styles'

function ProductAttribute(props) {
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)
  const {
    index,
    containerStyle,
    option,
    attributeName,
    selectedAttribute,
    onPress,
  } = props

  const isSelectedIndex =
    selectedAttribute && selectedAttribute[attributeName]?.index === index
  const isSelectedName =
    selectedAttribute &&
    selectedAttribute[attributeName]?.attributeName === attributeName
  const isSelectedOption =
    selectedAttribute && selectedAttribute[attributeName]?.option === option

  const isSelected = isSelectedIndex && isSelectedName && isSelectedOption

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        isSelected
          ? [styles.sizeOptionBox, styles.selectedSizeOptionBox, containerStyle]
          : [styles.sizeOptionBox, containerStyle]
      }>
      <Text
        style={isSelected ? [styles.size, styles.selectedSize] : styles.size}>
        {option}
      </Text>
    </TouchableOpacity>
  )
}

ProductAttribute.propTypes = {
  index: PropTypes.number,
  onPress: PropTypes.func,
  containerStyle: PropTypes.any,
}

export default ProductAttribute

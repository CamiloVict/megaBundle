import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text } from 'react-native'
import { useColorScheme } from 'react-native'
import dynamicStyles from './styles'
import FastImage from 'react-native-fast-image'
import { useConfig } from '../../config'

function ProductCard(props) {
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)
  const config = useConfig()

  const { cardConainerStyle, onPress, item } = props

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.productCardConainer, cardConainerStyle]}>
      <View style={styles.productCardImageConainer}>
        <FastImage
          style={styles.productCardImage}
          source={{ uri: item.photo }}
        />
      </View>
      <Text
        style={
          styles.productCardPrice
        }>{`${config.currency}${item.price}`}</Text>
      <Text style={styles.productCardDescription} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  )
}

ProductCard.propTypes = {
  cardConainerStyle: PropTypes.object,
  item: PropTypes.object,
  onPress: PropTypes.func,
}

export default ProductCard

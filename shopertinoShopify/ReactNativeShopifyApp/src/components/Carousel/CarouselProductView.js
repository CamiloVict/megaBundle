import React from 'react'
import { Text, TouchableOpacity, Platform, View } from 'react-native'
import { useColorScheme } from 'react-native'
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types'
import dynamicStyles from './styles'

// const { width: screenWidth } = Dimensions.get("window");
// const width = screenWidth * 0.7;

function CarouselProductView(props) {
  const { item, onCardPress, appConfig } = props
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)

  return (
    <TouchableOpacity
      activeOpacity={Platform.OS === 'android' ? 1 : 0.7}
      onPress={onCardPress}>
      <View style={styles.carouselProductViewContainer}>
        <FastImage
          style={[styles.carouselProductViewImage]}
          source={{ uri: item.photo }}
        />
      </View>
      <Text numberOfLines={2} style={[styles.carouselProductViewTitle]}>
        {item.name.toUpperCase()}
      </Text>
      <Text
        style={[
          styles.carouselProductViewPrice,
        ]}>{`${appConfig.currency}${item.price}`}</Text>
    </TouchableOpacity>
  )
}

export default CarouselProductView

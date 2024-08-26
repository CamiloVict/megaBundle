import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from 'dopenative'
import FastImage from 'react-native-fast-image'
import dynamicStyles from './styles'

export default function FoodListView({ food, onPress }) {

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  return (
    <TouchableOpacity
      onPress={() => onPress(food)}
      style={styles.itemContainer}>
      <View style={styles.leftItemContainer}>
        <Text style={styles.title}>{food.name}</Text>
        <Text style={styles.description}>{food.description}</Text>
        <Text style={styles.price}>{food.price}</Text>
      </View>
      <FastImage style={styles.rightIcon} source={{ uri: food.photo }} />
    </TouchableOpacity>
  )
}

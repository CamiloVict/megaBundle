import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useTheme } from 'dopenative'
import { timeFormat } from '../../Core'
import dynamicStyles from './styles'

export default function ListingView({ listing, onPress }) {
  const { theme, appearance } = useTheme()

  const styles = dynamicStyles(theme, appearance)

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.container}>
        <Image style={styles.avatarStyle} source={{ uri: listing.photo }} />
        <View style={styles.titleContainer}>
          <>
            <Text style={styles.title}>{listing.title}</Text>
            <Text style={styles.time}>{timeFormat(listing.createdAt)}</Text>
          </>
          <Text style={styles.place}>{listing.place}</Text>
        </View>
        <Text style={styles.price}>{listing.price}</Text>
      </View>
    </TouchableOpacity>
  )
}

import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useTheme, useTranslations } from 'dopenative'
import dynamicStyles from './styles'
import Hamburger from '../../components/Hamburger/Hamburger'
import { useConfig } from '../../config'
import { useCategories } from '../../Core/vendor/api'

const CategoryListScreen = props => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const config = useConfig()

  const { categories } = useCategories()

  const { navigation } = props

  useLayoutEffect(() => {
    navigation.setOptions({
      title: localized('Cuisines'),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
    })
  }, [])

  const onPress = item => {
    if (config.isMultiVendorEnabled) {
      props.navigation.navigate('Vendor', {
        category: item,
      })
    } else {
      props.navigation.navigate('SingleVendor', {
        category: item,
      })
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.container}>
        <FastImage
          placeholderColor={theme.colors[appearance].grey9}
          style={styles.photo}
          source={{ uri: item.photo }}
        />
        <View style={styles.overlay} />
        <Text numberOfLines={3} style={styles.title}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <FlatList
      vertical
      showsVerticalScrollIndicator={false}
      style={styles.listStyle}
      numColumns={2}
      data={categories}
      renderItem={renderItem}
      keyExtractor={item => `${item.id}`}
    />
  )
}

export default CategoryListScreen

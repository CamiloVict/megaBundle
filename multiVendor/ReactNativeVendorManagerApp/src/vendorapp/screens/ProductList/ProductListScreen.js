import React, { useLayoutEffect, useRef, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { ListItem } from 'react-native-elements'
import { useTheme, useTranslations } from 'dopenative'
import PropTypes from 'prop-types'
import dynamicStyles from './styles'
import { useSelector } from 'react-redux'
import { TNEmptyStateView } from '../../../Core/truly-native'
import {
  useVendorProducts,
  useSingleVendorCategories,
  useVendorProductsMutations,
} from '../../api'
import Hamburger from '../../../components/Hamburger/Hamburger'
import { AddProductView } from '../../components/AddProduct/AddProductView'
import ActionSheet from 'react-native-actionsheet'
import { useConfig } from '../../../config'

function ProductListScreen(props) {
  const { navigation } = props

  const currentUser = useSelector(state => state.auth.user)

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const config = useConfig()

  const emptyStateConfig = {
    title: localized('No Products'),
    description: localized(
      'There are currently no products. Your products will show up here once you add them.',
    ),
  }

  const [refreshing] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const actionsheetRef = useRef(null)

  const { loading, products } = useVendorProducts(currentUser.vendorID)
  const { categories } = useSingleVendorCategories()
  const { addProduct, deleteProduct, updateProduct } =
    useVendorProductsMutations()

  const showActionSheet = async index => {
    actionsheetRef.current.show()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: localized('Your Products'),
      headerRight: () => (
        <TouchableOpacity onPress={onOpenModal}>
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/create.png')}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            props.navigation.openDrawer()
          }}
        />
      ),
    })
  }, [navigation])

  const onOpenModal = () => {
    setSelectedProduct(null)
    setItemToDelete(null)
    setIsVisible(true)
  }

  const onAddProduct = product => {
    addProduct({
      vendorID: currentUser.vendorID,
      ...product,
    })
  }

  const onUpdate = product => {
    updateProduct(product)
  }

  const onDeleteProduct = () => {
    if (itemToDelete) {
      deleteProduct(itemToDelete.id, () => setItemToDelete(null))
    }
  }

  const onCancel = () => {
    setIsVisible(false)
    setSelectedProduct(null)
    setItemToDelete(null)
  }

  const onPress = product => {
    setSelectedProduct(product)
  }

  const renderProduct = ({ item }) => {
    return (
      <>
        <ListItem
          containerStyle={styles.productContainerStyle}
          onPress={() => onPress(item)}
          onLongPress={() => {
            setItemToDelete(item)
            showActionSheet()
          }}>
          <View style={styles.leftItemContainer}>
            <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
            <ListItem.Subtitle style={styles.title}>
              <View style={styles.subtitleView}>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </ListItem.Subtitle>
          </View>
          <FastImage style={styles.rightIcon} source={{ uri: item.photo }} />
        </ListItem>
      </>
    )
  }

  return (
    <View style={styles.container}>
      {products.length === 0 && !loading && (
        <View style={styles.emptyViewContainer}>
          <TNEmptyStateView emptyStateConfig={emptyStateConfig} />
        </View>
      )}
      {(isVisible || selectedProduct) && (
        <AddProductView
          onCancel={onCancel}
          categoryData={categories}
          addProduct={onAddProduct}
          initialProduct={selectedProduct}
          onUpdate={onUpdate}
        />
      )}

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => `${item.id}`}
        initialNumToRender={5}
        refreshing={refreshing}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
      <ActionSheet
        ref={actionsheetRef}
        title={`Are you sure you want to remove ${itemToDelete?.name}?`}
        options={[
          localized('Remove Product'),
          localized('Cancel'),
          localized('Edit Product'),
        ]}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={index => {
          if (index == 0) {
            onDeleteProduct()
            return
          }
          if (index == 2) {
            setSelectedProduct(itemToDelete)
          }
        }}
      />
    </View>
  )
}

ProductListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
}

export default ProductListScreen

import React, { useLayoutEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import dynamicStyles from './styles'
import Hamburger from '../../../components/Hamburger/Hamburger'
import { useOrders } from '../../api'
import {
  TNEmptyStateView,
  TNActivityIndicator,
} from '../../../Core/truly-native'
import { useConfig } from '../../../config'

const OrdersScreen = props => {
  const { navigation } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const config = useConfig()

  const currentUser = useSelector(state => state.auth.user)

  const { orders } = useOrders(config, currentUser.id)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: localized('Orders'),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
    })
  })

  const renderItem = ({ item }) => {
    const address = item.address
    const addressText = localized('Deliver to: ')
    return (
      <View style={styles.container}>
        <View>
          {item != null &&
            item.products != null &&
            item.products[0] != null &&
            item.products[0].photo != null &&
            item.products[0].photo.length > 0 && (
              <FastImage
                placeholderColor={theme.colors[appearance].grey9}
                style={styles.photo}
                source={{ uri: item.products[0].photo }}
              />
            )}
          <View style={styles.overlay} />
          <Text style={styles.address}>
            {`${addressText} ${address?.line1} ${address?.line2} ${address?.city} ${address?.postalCode}`}
          </Text>
        </View>
        {item.products.map(product => {
          return (
            <View style={styles.rowContainer} key={product.id}>
              <Text style={styles.count}>{product.quantity}</Text>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.price}>${product.price}</Text>
            </View>
          )
        })}
        <View style={styles.actionContainer}>
          <Text style={styles.total}>
            {localized('Total: $')}
            {item.products
              .reduce((prev, next) => prev + next.price * next.quantity, 0)
              .toFixed(2)}
          </Text>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    )
  }

  const emptyStateConfig = {
    title: localized('No Orders'),
    description: localized(
      'You have not delivered any orders yet. All your orders will be displayed here.',
    ),
  }

  if (orders == null) {
    return <TNActivityIndicator />
  }

  if (orders.length == 0) {
    return (
      <View style={styles.emptyViewContainer}>
        <TNEmptyStateView emptyStateConfig={emptyStateConfig} />
      </View>
    )
  }

  return (
    <FlatList
      style={styles.orderList}
      data={orders}
      renderItem={renderItem}
      keyExtractor={item => `${item.id}`}
      initialNumToRender={5}
    />
  )
}

OrdersScreen.propTypes = {
  user: PropTypes.shape(),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
}

export default OrdersScreen

import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { useColorScheme } from 'react-native'
import dynamicStyles from './styles'

function CheckOutDetails(props) {
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)
  const {
    containerStyle,
    selectedShippingMethod,
    totalPrice,
    selectedPaymentMethod,
    config,
  } = props

  const shipping = {
    key: 'Shipping',
    title: 'Shipping',
    value: selectedShippingMethod.label,
  }
  const total = {
    key: 'Total',
    title: 'Total',
    value: `${config.currency}${totalPrice}`,
  }
  const checkoutDetail = [shipping, total]

  const renderCheckOutDetails = ({ index, item, checkoutDetail }) => {
    if (props.isStripeCheckoutEnabled && item.title === 'Payment') {
      return null
    }

    return (
      <View
        key={item.key}
        style={[
          styles.checkOutItemContainer,
          {
            borderBottomWidth: index === checkoutDetail.length - 1 ? 0 : 0.5,
          },
        ]}>
        <View style={styles.checkOutTitleContainer}>
          <Text style={styles.checkOutTitle}>{item.title}</Text>
        </View>
        <View style={styles.checkOutValueContainer}>
          <Text style={styles.checkOutValue}>{item.value}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.checkOutDetailContainer, containerStyle]}>
      {checkoutDetail.map((item, index) =>
        renderCheckOutDetails({ item, index, checkoutDetail }),
      )}
    </View>
  )
}

export default CheckOutDetails

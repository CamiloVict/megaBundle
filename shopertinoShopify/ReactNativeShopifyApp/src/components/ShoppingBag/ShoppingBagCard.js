import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import { View, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { useTranslations } from 'dopenative'
import CardContent from './CardContent'
import QuantityControl from './QuantityControl'
import { useColorScheme } from 'react-native'
import FastImage from 'react-native-fast-image'
import dynamicStyles from './styles'

function ShoppingBagCard(props) {
  const { localized } = useTranslations()
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)
  const { item } = props
  const [itemQty, setItemQty] = useState(item.quantity || 1)
  const totalPrice = (item.price * itemQty).toFixed(2)

  useEffect(() => {
    itemQty === 0 && onItemEqualsZero()
  }, [itemQty])

  const increaseQty = () => {
    const newQty = itemQty + 1
    setItemQty(newQty)
    setObjForOnQtyChange(newQty)
  }

  const decreaseQty = () => {
    const newQty = itemQty === 0 ? itemQty : itemQty - 1
    setItemQty(newQty)
    setObjForOnQtyChange(newQty)
  }

  const setObjForOnQtyChange = newQty => {
    props.onQtyChange({ ...props.item, quantity: newQty })
  }

  const onItemEqualsZero = () => {
    Alert.alert(
      localized('Remove Item'),
      localized('Are you sure you want to remove this item from the cart?'),
      [
        {
          text: localized('Remove'),
          onPress: () => props.removeFromShoppingBag(item),
          style: 'destructive',
        },
        {
          text: localized('Cancel'),
          onPress: () => increaseQty(),
        },
      ],
      { cancelable: true },
    )
  }

  return (
    <TouchableOpacity
      onLongPress={() => props.onLongPress(item)}
      activeOpacity={1}
      style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <FastImage
          source={{ uri: item.photo }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      </View>
      <CardContent
        price={`${props.appConfig.currency}${totalPrice}`}
        item={item}
        onColorSelected={props.onColorSelected}
        onSizeSelected={props.onSizeSelected}
        contentContainer={styles.contentContainer}
        onAttributesSelected={props.onAttributesSelected}
      />
      <QuantityControl
        quantity={itemQty}
        onIncreaseQuantity={() => increaseQty()}
        onDecreaseQuantity={() => decreaseQty()}
        containerStyle={styles.quantityControlContainer}
      />
    </TouchableOpacity>
  )
}

ShoppingBagCard.propTypes = {
  onQtyChange: PropTypes.func,
  item: PropTypes.object,
  onSizeSelected: PropTypes.func,
  onColorSelected: PropTypes.func,
  onLongPress: PropTypes.func,
  removeFromShoppingBag: PropTypes.func,
}

export default connect()(ShoppingBagCard)

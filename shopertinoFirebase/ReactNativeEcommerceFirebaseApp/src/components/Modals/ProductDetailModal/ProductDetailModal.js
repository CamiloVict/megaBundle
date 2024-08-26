import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Share,
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import { useTranslations } from 'dopenative'
import PropTypes from 'prop-types'
import Modal from 'react-native-modal'
import Swiper from 'react-native-swiper'
import { useColorScheme } from 'react-native'
import Header from './Header'
import ProductOptions from './ProductOptions'
import Favourite from './Favourite'
import FooterButton from '../../FooterButton/FooterButton'
import AppStyles from '../../../AppStyles'
import DataAPIManager from '../../../apis/DataAPIManager'
import {
  resetCheckout,
  logout,
  setWishlist,
  updateShoppingBag,
} from '../../../redux/'
import dynamicStyles from './styles'
import FastImage from 'react-native-fast-image'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

function ProductDetailModal(props) {
  const { localized } = useTranslations()
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)

  const {
    visible,
    onCancelPress,
    item,
    onAddToBag,
    appConfig,
    setWishlist,
    wishlist,
    user,
  } = props

  const [selectedItem, setSelectedItem] = useState(item)

  const loading = useRef('')

  const dataAPIManager = useRef(new DataAPIManager(appConfig))

  useEffect(() => {
    dataAPIManager.current?.setWishlist(user, wishlist)
  }, [wishlist])

  useEffect(() => {
    console.log('item', item)
    setSelectedItem(item)
  }, [item])

  const onModalShow = () => {
    const favouritedItems = wishlist.find(
      wishlistItem => wishlistItem.id === selectedItem.id,
    )

    if (favouritedItems) {
      selectedItem.isFavourite = true
      setSelectedItem(favouritedItems)
    }
  }

  const onAttributesSelected = selectedAttributes => {
    selectedItem.selectedAttributes = selectedAttributes
  }

  const onSizeSelected = index => {
    selectedItem.selectedSizeIndex = index
  }

  const onColorSelected = index => {
    selectedItem.selectedColorIndex = index
  }

  const onShare = async () => {
    try {
      await Share.share({
        title: localized('Shopertino Product'),
        dialogTitle: localized(`Shopertino Product: ${selectedItem.name}`),
        message: selectedItem.description,
        url: selectedItem.photo,
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const onFavouritePress = async item => {
    item.isFavourite = !item.isFavourite
    setWishlist(item)
  }

  const addProductToBag = productItem => {
    const indexToUpdate = props.shoppingBag.findIndex(shoppingBagProduct => {
      return shoppingBagProduct.id === productItem.id
    })

    if (indexToUpdate !== -1) {
      productItem.quantity += 1
    } else {
      productItem.quantity = 1
    }

    const newProductPriceByQty = {
      id: productItem.id,
      qty: productItem.quantity,
      totalPrice: Number(productItem.price * productItem.quantity),
    }

    props.updateShoppingBag(productItem)
    onAddToBag(productItem)
  }

  return (
    <Modal
      isVisible={visible}
      onModalShow={onModalShow}
      hideModalContentWhileAnimating={true}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      style={styles.modalStyle}
      backdropOpacity={0.5}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}>
      <View style={styles.transparentContainer}>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="dark-content" />
        <View style={styles.viewContainer}>
          <ScrollView style={{ flex: 1 }}>
            {selectedItem.details && (
              <Swiper
                loop={false}
                activeDot={<View style={styles.activeDot} />}
                containerStyle={styles.swiperContainer}>
                {selectedItem.details.map((image, index) => (
                  <View
                    key={index + ''}
                    style={styles.imageBackgroundContainer}>
                    <FastImage
                      style={styles.imageBackground}
                      source={{ uri: image }}
                    />
                  </View>
                ))}
              </Swiper>
            )}
            <Header
              onCancelPress={onCancelPress}
              headerContainerStyle={styles.headerContainerStyle}
              onSharePress={onShare}
            />
            {/* <ProductOptions
            item={selectedItem}
            onSizeSelected={onSizeSelected}
            onColorSelected={onColorSelected}
            optionContainerStyle={styles.optionContainerStyle}
          /> */}
            <Favourite
              onPress={() => onFavouritePress(selectedItem)}
              isFavourite={selectedItem.isFavourite}
              favouriteContainerStyle={styles.favouriteContainerStyle}
            />
            <View style={styles.descriptionContainer}>
              <Text style={styles.title}>{selectedItem.name}</Text>
              <Text
                style={
                  styles.price
                }>{`${appConfig.currency}${selectedItem.price}`}</Text>
              <View style={styles.borderLine} />
            </View>
            <ProductOptions
              item={selectedItem}
              onSizeSelected={onSizeSelected}
              onColorSelected={onColorSelected}
              optionContainerStyle={styles.optionContainerStyle}
              onAttributesSelected={onAttributesSelected}
            />
            <View style={styles.footerContainer}>
              <FooterButton
                onPress={() => addProductToBag(selectedItem)}
                footerContainerStyle={styles.addToBagContainerStyle}
                footerTitleStyle={{
                  color: 'white',
                  fontFamily: AppStyles.fontFamily.regularFont,
                }}
                title={localized('ADD TO BAG')}
              />
              {/* <View style={styles.buttonSpace} /> */}
              {/* <FooterButton
                onPress={onPay}
                footerContainerStyle={styles.payContainerStyle}
                footerTitleStyle={{
                  color: AppStyles.colorSet[colorScheme].mainTextColor,
                  fontFamily: AppStyles.fontFamily.regularFont,
                }}
                iconSource={
                  Platform.OS === 'ios'
                    ? AppStyles.iconSet.appleFilled
                    : AppStyles.imageSet.googlePayColored
                }
                iconStyle={styles.footerIconStyle}
                title={localized('Pay')}
              /> */}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

ProductDetailModal.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.object,
  visible: PropTypes.bool,
  onCancelPress: PropTypes.func,
  onFavouritePress: PropTypes.func,
  onAddToBag: PropTypes.func,
  shippingMethods: PropTypes.array,
}

const mapStateToProps = ({ checkout, products, app }) => {
  return {
    totalPrice: checkout.totalPrice,
    selectedShippingMethod: checkout.selectedShippingMethod,
    shippingMethods: checkout.shippingMethods,
    cardNumbersEnding: checkout.cardNumbersEnding,
    selectedPaymentMethod: checkout.selectedPaymentMethod,
    currentOrderId: checkout.currentOrderId,
    shoppingBag: products.shoppingBag,
    orderHistory: products.orderHistory,
    stripeCustomer: app.stripeCustomer,
  }
}

export default connect(mapStateToProps, {
  resetCheckout,
  logout,
  setWishlist,
  updateShoppingBag,
})(ProductDetailModal)

import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, NativeModules } from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useTranslations } from 'dopenative'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types'
import {
  Header,
  ProcedureImage,
  ShippingDetails,
  HeaderButton,
} from '../../components'
import DataAPIManager from '../../apis/DataAPIManager'
import { setUserData } from '../../redux/'
import { setShippingAddress } from '../../Core/payment/redux/checkout'
import AppStyles from '../../AppStyles'
import { Appearance, useColorScheme } from 'react-native'

import { useConfig } from '../../config'

// const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/;

// const regexResult = regexEmail.test(value);
//     if (value.length > 0 && !regexResult) {
//       return true;
//     }
//     if (value.length > 0 && regexResult) {
//       return false;
//     }

export default function ShippingAddressScreen(props) {
  const { localized } = useTranslations()

  const [saving, setSaving] = useState(false)

  const { route, navigation } = props
  const colorScheme = useColorScheme()
  const currentTheme = AppStyles.navThemeConstants[colorScheme]

  // setShippingAddress,

  // setUserData,

  const dispatch = useDispatch()
  const user = useSelector(({ app }) => app.user)

  const config = useConfig()

  const updatedShippingAddress = useRef([])
  const shouldNavigateUser = useRef(false)
  const dataAPIManager = useRef(new DataAPIManager(config)).current

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: currentTheme.fontColor,
      headerTitle: '',
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
      },
      headerLeft: () => (
        <HeaderButton
          onPress={() => {
            navigation.goBack()
          }}
          buttonContainerStyle={{ marginLeft: 10 }}
          title={localized('Cancel')}
        />
      ),
      headerRight: () => {
        if (saving) {
          return <ActivityIndicator style={{ marginRight: 10 }} />
        }
        return (
          <HeaderButton
            onPress={navigateUser}
            buttonContainerStyle={{ marginRight: 10 }}
            title={localized('Next')}
          />
        )
      },
    })
  }, [saving])

  const navigateUser = () => {
    if (shouldNavigateUser.current) {
      handleUserNavigation()
    } else {
      Alert.alert(
        localized('Incomplete Address'),
        localized('Kindly complete your Shipping Address.'),
        [
          {
            text: localized('OK'),
          },
        ],
        { cancelable: true },
      )
    }
  }

  const handleUserNavigation = async () => {
    const convertedAddress = convertAddressToObject(
      updatedShippingAddress.current,
    )
    dispatch(setShippingAddress(convertedAddress))

    storeUserShippAddress(convertedAddress)

    setSaving(true)
  }

  const storeUserShippAddress = address => {
    const addressId = user.shipping?.id || user.default_address?.id || ''
    dataAPIManager.storeUserShippAddress(
      user,
      { ...address, id: addressId },
      ({ shipping, shippingAddress, success }) => {
        if (success === false) {
          alert(
            localized(
              'Unfortunately an error occurred while saving ur address, please enter a valid address before completing your order',
            ),
          )
          return
        }
        const newUser = {
          email: address.email,
          name: address.name,
          ...user,
        }
        if (shipping) {
          newUser.shipping = address
        }
        if (shippingAddress) {
          newUser.shippingAddress = address
        }

        dispatch(
          setUserData({
            user: newUser,
          }),
        )
        navigation.replace('ShippingMethod')
      },
    )
  }

  const convertAddressToObject = address => {
    const result = {}

    address.forEach(item => {
      result[item.key] = item.value
    })

    return result
  }

  const convertAddressToArray = address => {
    const result = []

    Object.keys(address).forEach((key, index) => {
      result.push({ index, key, value: address[key] })
    })

    return result
  }

  const onChangeValue = (changeValues, expectedLength) => {
    if (changeValues.length === expectedLength) {
      updatedShippingAddress.current = changeValues
      shouldNavigateUser.current = true
    } else {
      shouldNavigateUser.current = false
    }
  }

  const sortAddress = () => {
    let address = []
    let newShippingAddress = user?.shippingAddress
    const userAddress = user?.shipping || user.default_address
    if (userAddress) {
      newShippingAddress = {
        name: userAddress.first_name,
        email: user.email,
        apt: userAddress.address_1 ?? userAddress.address1,
        address: userAddress.address_2 ?? userAddress.address2,
        city: userAddress.city,
        state: userAddress.state ?? userAddress.province,
        zipCode: userAddress.postcode ?? userAddress.province_code,
      }
    }
    if (newShippingAddress && Object.keys(newShippingAddress).length > 0) {
      address = convertAddressToArray(newShippingAddress)
    }

    return address
  }

  const address = sortAddress()

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor:
          AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      }}>
      <Header title={localized('Shipping')} />
      <ProcedureImage source={AppStyles.imageSet.box} />
      <ShippingDetails
        shippingAddress={address}
        title={localized('Shipping Adress')}
        isShippinngAddress={true}
        onChangeValue={onChangeValue}
      />
    </KeyboardAwareScrollView>
  )
}

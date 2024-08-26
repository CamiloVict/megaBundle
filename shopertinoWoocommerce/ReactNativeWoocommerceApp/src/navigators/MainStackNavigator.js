import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import ShoppingBagScreen from '../screens/ShoppingBagScreen/ShoppingBagScreen'
import CategoryProductGridScreen from '../screens/Shop/CategoryProductGridScreen'
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen'
import ContactUsScreen from '../screens/ContactUsScreen/ContactUsScreen'
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen'
import ShippingAddressScreen from '../screens/CheckoutFlowScreen/ShippingAddressScreen'
import ShippingMethodScreen from '../screens/CheckoutFlowScreen/ShippingMethodScreen'
import PaymentMethodScreen from '../screens/CheckoutFlowScreen/PaymentMethodScreen'
import CheckoutScreen from '../screens/CheckoutFlowScreen/CheckoutScreen'
import DrawerStackNavigator from './DrawerStackNavigator'
import { useConfig } from '../config'

const MainStack = createStackNavigator()
const MainStackNavigator = () => {
  const config = useConfig()
  return (
    <MainStack.Navigator
      initialRouteName="Drawer"
      screenOptions={{ headerMode: 'float' }}>
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Drawer"
        component={DrawerStackNavigator}
      />
      <MainStack.Screen
        name="CategoryProductGrid"
        component={CategoryProductGridScreen}
      />
      <MainStack.Screen name="Settings" component={SettingsScreen} />
      <MainStack.Screen name="EditProfile" component={EditProfileScreen} />
      <MainStack.Screen name="Contact" component={ContactUsScreen} />
      <MainStack.Screen
        name="ShippingAddress"
        component={ShippingAddressScreen}
      />
      <MainStack.Screen
        name="ShippingMethod"
        component={ShippingMethodScreen}
      />
      <MainStack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <MainStack.Screen name="Checkout" component={CheckoutScreen} />
      <MainStack.Screen name="Bag" component={ShoppingBagScreen} />
    </MainStack.Navigator>
  )
}
export default MainStackNavigator

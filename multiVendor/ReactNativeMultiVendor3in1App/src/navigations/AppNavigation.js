import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useTheme, useTranslations } from 'dopenative'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import IMDrawerMenu from '../Core/ui/drawer/IMDrawerMenu/IMDrawerMenu'
import {
  LoadScreen,
  LoginScreen,
  SignupScreen,
  SmsAuthenticationScreen,
  ResetPasswordScreen,
  WalkthroughScreen,
  WelcomeScreen,
} from '../Core/onboarding'
import { IMChatScreen } from '../Core/chat'

import ShoppingCartButton from '../components/ShoppingCartButton/ShoppingCartButton'
import SingleItemDetail from '../screens/SingleItemDetail/SingleItemDetailScreen'
import SingleVendorScreen from '../screens/SingleVendor/SingleVendorScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import OrderListScreen from '../screens/OrderList/OrderListScreen'
import SearchScreen from '../screens/Search/SearchScreen'
import IMVendorsMap from '../Core/vendor/ui/IMVendorsMap/IMVendorsMap'
import AdminOrderListScreen from '../Core/vendor/admin/ui/AdminOrderList/AdminOrderListScreen'
import AdminVendorListScreen from '../Core/vendor/admin/ui/AdminVendorList/AdminVendorListScreen'
import CheckoutScreen from '../Core/cart/ui/IMCheckoutScreen'
import CardScreen from '../Core/payment/ui/Card/IMCardScreen'
import IMVendorReview from '../Core/review/ui/IMVendorReviewScreen/IMVendorReviewScreen'
import IMOrderTrackingScreen from '../Core/delivery/IMOrderTrackingScreen/IMOrderTrackingScreen'
import IMAddAddressModal from '../Core/payment/component/IMAddAddressModal/IMAddAddressModal'
import { IMCategoryVendorsScreen } from '../Core/vendor/ui/IMVendors/IMCategoryVendors/IMCategoryVendorsScreen'
import CartScreen from '../Core/cart/ui/Cart/IMCartScreen'
import CategoryListScreen from '../screens/CategoryList/CategoryListScreen'
import ReservationScreen from '../screens/Reservation/ReservationScreen'
import ReservationHistoryScreen from '../screens/ReservationHistory/ReservationHistoryScreen'
import MyProfileScreen from '../components/MyProfileScreen'
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
} from '../Core/profile'
import VendorHomeScreen from '../vendorapp/screens/Home/HomeScreen'
import VendorProductsScreen from '../vendorapp/screens/ProductList/ProductListScreen'

import DriverHomeScreen from '../driverapp/screens/Home/HomeScreen'
import DriverOrdersScreen from '../driverapp/screens/Orders/OrdersScreen'
import { NavigationContainer } from '@react-navigation/native'
import { useConfig } from '../config'
import useNotificationOpenedApp from '../Core/helpers/notificationOpenedApp'

const Main = createStackNavigator()
const MainNavigation = () => {
  useNotificationOpenedApp()
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const config = useConfig()
  return (
    <Main.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleStyle: {
          fontFamily: 'FallingSkyCond',
        },
        headerStyle: {
          backgroundColor: theme.colors[appearance].primaryBackground,
        },
        headerTintColor: theme.colors[appearance].primaryText,
        headerRight: () => (
          <View style={styles.headerRight}>
            {config.isMultiVendorEnabled && (
              <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                <FastImage
                  source={require('../assets/icons/map.png')}
                  style={styles.mapImage}
                  tintColor={theme.colors[appearance].primaryForeground}
                />
              </TouchableOpacity>
            )}
            <ShoppingCartButton
              onPress={() => {
                navigation.navigate('Cart')
              }}
            />
          </View>
        ),
      })}
      initialRouteName="Home"
      headerMode="float">
      <Main.Screen name="Home" component={HomeScreen} />
      <Main.Screen name="Cart" component={CartScreen} />
      <Main.Screen name="OrderList" component={OrderListScreen} />
      <Main.Screen name="Search" component={SearchScreen} />
      <Main.Screen name="SingleVendor" component={SingleVendorScreen} />
      <Main.Screen name="SingleItemDetail" component={SingleItemDetail} />
      <Main.Screen name="CategoryList" component={CategoryListScreen} />
      <Main.Screen name="Map" component={IMVendorsMap} />
      <Main.Screen name="Checkout" component={CheckoutScreen} />
      <Main.Screen name="Cards" component={CardScreen} />
      <Main.Screen name="Reviews" component={IMVendorReview} />
      <Main.Screen name="MyProfile" component={MyProfileScreen} />
      <Main.Screen
        options={{ headerRight: () => <View /> }}
        name={localized('Contact')}
        component={IMContactUsScreen}
      />
      <Main.Screen
        options={{ headerRight: () => <View /> }}
        name={localized('Settings')}
        component={IMUserSettingsScreen}
      />
      <Main.Screen name="AccountDetail" component={IMEditProfileScreen} />
      <Main.Screen name="Vendor" component={IMCategoryVendorsScreen} />
      <Main.Screen
        name="OrderTrackingScreen"
        component={IMOrderTrackingScreen}
      />
      <Main.Screen name="AddAddress" component={IMAddAddressModal} />
      <Main.Screen name="PersonalChat" component={IMChatScreen} />
      <Main.Screen name="ReservationScreen" component={ReservationScreen} />
      <Main.Screen
        name="ReservationHistoryScreen"
        component={ReservationHistoryScreen}
      />
    </Main.Navigator>
  )
}
const Drawer = createDrawerNavigator()
const DrawerStack = props => {
  const config = useConfig()
  const drawer = config.isMultiVendorEnabled ? (
    <IMDrawerMenu
      navigation={props.navigation}
      menuItems={config.drawerMenuConfig.vendorDrawerConfig.upperMenu}
      menuItemsSettings={config.drawerMenuConfig.vendorDrawerConfig.lowerMenu}
    />
  ) : (
    <IMDrawerMenu
      navigation={props.navigation}
      menuItems={config.drawerMenuConfig.customerDrawerConfig.upperMenu}
      menuItemsSettings={config.drawerMenuConfig.customerDrawerConfig.lowerMenu}
    />
  )
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerStyle={{ width: 250 }}
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => drawer}>
      <Drawer.Screen name="Main" component={MainNavigation} />
    </Drawer.Navigator>
  )
}

const AdminMain = createStackNavigator()
const AdminMainNavigation = () => {
  const { theme, appearance } = useTheme()
  return (
    <AdminMain.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme.colors[appearance].primaryBackground,
        },
        headerTitleAlign: 'center',
        headerTintColor: theme.colors[appearance].primaryText,
      })}
      initialRouteName="AdminVendorList"
      headerMode="float">
      <Main.Screen name="AdminVendorList" component={AdminVendorListScreen} />
      <Main.Screen name="AdminOrder" component={AdminOrderListScreen} />
      <Main.Screen name="Map" component={IMVendorsMap} />

      <AdminMain.Screen name="MyProfile" component={MyProfileScreen} />
      <AdminMain.Screen name="Contact" component={IMContactUsScreen} />
      <AdminMain.Screen name="Settings" component={IMUserSettingsScreen} />
      <AdminMain.Screen name="AccountDetail" component={IMEditProfileScreen} />
      <AdminMain.Screen name="PersonalChat" component={IMChatScreen} />
    </AdminMain.Navigator>
  )
}

const AdminDrawer = createDrawerNavigator()
const AdminDrawerStack = props => {
  const config = useConfig()
  return (
    <AdminDrawer.Navigator
      drawerPosition="left"
      drawerStyle={{ width: 250 }}
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
          navigation={props.navigation}
          menuItems={config.drawerMenuConfig.adminDrawerConfig.upperMenu}
          menuItemsSettings={
            config.drawerMenuConfig.adminDrawerConfig.lowerMenu
          }
        />
      )}>
      <AdminDrawer.Screen name="Main" component={AdminMainNavigation} />
    </AdminDrawer.Navigator>
  )
}

const Login = createStackNavigator()
const LoginStack = () => {
  return (
    <Login.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome">
      <Login.Screen name="Login" component={LoginScreen} />
      <Login.Screen name="Signup" component={SignupScreen} />
      <Login.Screen name="Welcome" component={WelcomeScreen} />
      <Login.Screen name="Sms" component={SmsAuthenticationScreen} />
      <Login.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Login.Navigator>
  )
}

const VendorMain = createStackNavigator()
const VendorMainNavigation = () => {
  const { theme, appearance } = useTheme()

  return (
    <VendorMain.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme.colors[appearance].primaryBackground,
        },
        headerTitleAlign: 'center',
        headerTintColor: theme.colors[appearance].primaryText,
      })}
      initialRouteName="Home"
      headerMode="float">
      <VendorMain.Screen name="Home" component={VendorHomeScreen} />
      <VendorMain.Screen name="Products" component={VendorProductsScreen} />
    </VendorMain.Navigator>
  )
}

const VendorDrawer = createDrawerNavigator()
const VendorDrawerStack = () => {
  const config = useConfig()
  return (
    <VendorDrawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerStyle={{ width: 250 }}
      drawerPosition="left"
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
          navigation={navigation}
          menuItems={config.drawerMenuConfig.vendorDrawer.upperMenu}
          menuItemsSettings={config.drawerMenuConfig.vendorDrawer.lowerMenu}
        />
      )}>
      <VendorDrawer.Screen name="Main" component={VendorMainNavigation} />
    </VendorDrawer.Navigator>
  )
}

const DriverMain = createStackNavigator()
const DriverMainNavigation = () => {
  const { theme, appearance } = useTheme()
  return (
    <DriverMain.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme.colors[appearance].primaryBackground,
        },
        headerTitleAlign: 'center',
        headerTintColor: theme.colors[appearance].primaryText,
      })}
      initialRouteName="Home"
      headerMode="float">
      <DriverMain.Screen name="Home" component={DriverHomeScreen} />
      <DriverMain.Screen name="MyProfile" component={MyProfileScreen} />
      <DriverMain.Screen
        name="DriverOrderList"
        component={DriverOrdersScreen}
      />
      <DriverMain.Screen name="Contact" component={IMContactUsScreen} />
      <DriverMain.Screen name="Settings" component={IMUserSettingsScreen} />
      <DriverMain.Screen name="AccountDetail" component={IMEditProfileScreen} />
      <DriverMain.Screen name="PersonalChat" component={IMChatScreen} />
    </DriverMain.Navigator>
  )
}

const DriverDrawer = createDrawerNavigator()
const DriverDrawerStack = () => {
  const config = useConfig()
  return (
    <DriverDrawer.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
          navigation={navigation}
          menuItems={config.drawerMenuConfig.driverDrawerConfig.upperMenu}
          menuItemsSettings={
            config.drawerMenuConfig.driverDrawerConfig.lowerMenu
          }
        />
      )}
      drawerPosition="left"
      drawerStyle={{ width: 250 }}>
      <DriverDrawer.Screen name="Main" component={DriverMainNavigation} />
    </DriverDrawer.Navigator>
  )
}

const RootStack = createStackNavigator()
const RootNavigator = () => {
  const currentUser = useSelector(state => state.auth.user)
  return (
    <RootStack.Navigator
      initialRouteName="LoadScreen"
      screenOptions={{ headerShown: false, animationEnabled: false }}
      headerMode="none">
      <RootStack.Screen
        options={{ headerShown: false }}
        name="LoadScreen"
        component={LoadScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="Walkthrough"
        component={WalkthroughScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="LoginStack"
        component={LoginStack}
      />
      {currentUser?.role === 'vendor' ? (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={VendorDrawerStack}
        />
      ) : currentUser?.role === 'driver' ? (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={DriverDrawerStack}
        />
      ) : currentUser?.role === 'admin' ? (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={AdminDrawerStack}
        />
      ) : (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={DrawerStack}
        />
      )}

    </RootStack.Navigator>
  )
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}

export { RootNavigator, AppNavigator }

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapImage: { width: 25, height: 25 },
})

import React from 'react'
import { connect } from 'react-redux'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { MenuButton, ShoppingBagButton } from '../components'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import ShopScreen from '../screens/Shop/ShopScreen'
import OrdersScreen from '../screens/Order/OrdersScreen'
import WishlistScreen from '../screens/WishlistScreen/WishlistScreen'
import SearchScreen from '../screens/SearchScreen/SearchScreen'
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import ShoppingBagScreen from '../screens/ShoppingBagScreen/ShoppingBagScreen'
import IMDrawerMenu from '../Core/ui/drawer/IMDrawerMenu/IMDrawerMenu'
import { useColorScheme } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AppStyles from '../AppStyles'
import { useConfig } from '../config'

const Drawer = createStackNavigator()
const DrawerNavigator = () => {
  const colorScheme = useColorScheme()

  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="Home"
      drawerStyle={{ width: 300 }}
      screenOptions={({ navigation, route }) => {
        const currentTheme = AppStyles.navThemeConstants[colorScheme]
        return {
          headerStyle: {
            backgroundColor: currentTheme.backgroundColor,
            borderBottomWidth: 0,
          },
          headerTintColor: currentTheme.fontColor,
          headerLeft: () => (
            <MenuButton
              onPress={() => {
                navigation.openDrawer()
              }}
            />
          ),
          headerRight: () =>
            route.key != 'ShoppingBag' && (
              <ShoppingBagButton
                onPress={() => {
                  navigation.navigate('Bag')
                }}
              />
            ),
          headerTitle: getDrawerScreenTitle(route.name),
          headerTitleAlign: 'center',
        }
      }}>
      <Drawer.Screen
        initialParams={{
          appStyles: AppStyles,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Drawer.Screen name="Shop" component={ShopScreen} />
      <Drawer.Screen name="Order" component={OrdersScreen} />
      <Drawer.Screen name="Wishlist" component={WishlistScreen} />
      <Drawer.Screen name="Search" component={SearchScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="ShoppingBag" component={ShoppingBagScreen} />
    </Drawer.Navigator>
  )
}

const AppDrawer = createDrawerNavigator()
const AppDrawerNav = () => {
  const config = useConfig()

  return (
    <AppDrawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
          navigation={navigation}
          menuItems={config.drawerMenuConfig.upperMenu}
          menuItemsSettings={config.drawerMenuConfig.lowerMenu}
        />
      )}>
      <AppDrawer.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </AppDrawer.Navigator>
  )
}

const getDrawerScreenTitle = routeKey => {
  switch (routeKey) {
    case 'Home':
      return 'Shopertino'
    case 'Shop':
      return 'Shop'
    case 'Order':
      return 'Orders'
    case 'Wishlist':
      return 'Wishlist'
    case 'Search':
      return 'Search'
    case 'Profile':
      return 'Profile'
    case 'ShoppingBag':
      return 'Shopping Bag'
    default:
      return 'Home'
  }
}

export default connect()(AppDrawerNav)

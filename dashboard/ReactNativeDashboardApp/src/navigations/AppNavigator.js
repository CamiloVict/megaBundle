import React from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AppStyles from '../AppStyles'
import DrawerContainer from '../components/DrawerContainer'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import HomeScreen from '../screens/HomeScreen'
import DashboardScreen from '../screens/DashboardScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
import ActivityScreen from '../screens/ActivityScreen'
import OrdersScreen from '../screens/OrdersScreen'
import ListScreen from '../screens/ListScreen'
import DetailScreen from '../screens/DetailScreen'
import AnalyticsScreen from '../screens/AnalyticsScreen'

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0,
  },
})

const Auth = createStackNavigator()
const Home = createStackNavigator()
const Dashboard = createStackNavigator()
const Order = createStackNavigator()
const Notifications = createStackNavigator()
const Activity = createStackNavigator()
const Root = createStackNavigator()
const Drawer = createDrawerNavigator()

const LoginStack = () => {
  return (
    <Auth.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
        headerTitleStyle: styles.headerTitleStyle,
        cardStyle: { backgroundColor: '#FFFFFF' },
        headerRight: () => <View />,
        headerMode: 'float',
      }}>
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Signup" component={SignupScreen} />
      <Auth.Screen
        options={{
          headerShown: false,
        }}
        name="Welcome"
        component={WelcomeScreen}
      />
    </Auth.Navigator>
  )
}

const HomeStack = () => {
  return (
    <Home.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
        headerTitleStyle: styles.headerTitleStyle,
        cardStyle: { backgroundColor: '#FFFFFF' },
        headerRight: () => <View />,
        headerMode: 'float',
      }}>
      <Home.Screen name="HomeScreen" component={HomeScreen} />
      <Home.Screen name="ListScreen" component={ListScreen} />
      <Home.Screen name="DetailScreen" component={DetailScreen} />
      <Home.Screen name="AnalyticsScreen" component={AnalyticsScreen} />
    </Home.Navigator>
  )
}

const DashboardStack = () => {
  return (
    <Dashboard.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{
        headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
        headerTitleStyle: styles.headerTitleStyle,
        cardStyle: { backgroundColor: '#FFFFFF' },
        headerRight: () => <View />,
        headerMode: 'float',
      }}>
      <Dashboard.Screen name="DashboardScreen" component={DashboardScreen} />
      <Dashboard.Screen name="ListScreen" component={ListScreen} />
      <Dashboard.Screen name="DetailScreen" component={DetailScreen} />
      <Dashboard.Screen name="AnalyticsScreen" component={AnalyticsScreen} />
    </Dashboard.Navigator>
  )
}

const OrdersStack = () => {
  return (
    <Order.Navigator
      initialRouteName="OrdersScreen"
      screenOptions={{
        headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
        headerTitleStyle: styles.headerTitleStyle,
        cardStyle: { backgroundColor: '#FFFFFF' },
        headerRight: () => <View />,
        headerMode: 'float',
      }}>
      <Order.Screen name="OrdersScreen" component={OrdersScreen} />
    </Order.Navigator>
  )
}

const NotificationsStack = () => {
  return (
    <Notifications.Navigator
      initialRouteName=" NotificationsScreen"
      screenOptions={{
        headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
        headerTitleStyle: styles.headerTitleStyle,
        cardStyle: { backgroundColor: '#FFFFFF' },
        headerRight: () => <View />,
        headerMode: 'float',
      }}>
      <Notifications.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
    </Notifications.Navigator>
  )
}

const ActivityStack = () => {
  return (
    <Activity.Navigator
      initialRouteName=" NotificationsScreen"
      screenOptions={{
        headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
        headerTitleStyle: styles.headerTitleStyle,
        cardStyle: { backgroundColor: '#FFFFFF' },
        headerTitleAlign: 'center',
        headerRight: () => <View />,
        headerMode: 'float',
      }}>
      <Activity.Screen name="ActivityScreen" component={ActivityScreen} />
    </Activity.Navigator>
  )
}

// drawer stack
const DrawerStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerPosition="left"
      drawerStyle={{ width: 300 }}
      initialRouteName="Home"
      drawerContent={({ navigation }) => (
        <DrawerContainer navigation={navigation} />
      )}>
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Dashboard" component={DashboardStack} />
      <Drawer.Screen name="Orders" component={OrdersStack} />
      <Drawer.Screen name="Notifications" component={NotificationsStack} />
      <Drawer.Screen name="Activity" component={ActivityStack} />
    </Drawer.Navigator>
  )
}

// Manifest of possible screens
const RootNavigator = () => {
  return (
    <Root.Navigator
      initialRouteName={DrawerStack}
      screenOptions={{
        headerShown: false,
        transitionConfig: noTransitionConfig,
      }}>
      <Root.Screen name="LoginStack" component={LoginStack} />
      <Root.Screen name="DrawerStack" component={DrawerStack} />
    </Root.Navigator>
  )
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    color: 'black',
    flex: 1,
  },
})

export { RootNavigator, AppNavigator }

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useTheme, useTranslations } from 'dopenative'
import IMDrawerMenu from '../Core/ui/drawer/IMDrawerMenu/IMDrawerMenu'
import { NavigationContainer } from '@react-navigation/native'
import useNotificationOpenedApp from '../Core/helpers/notificationOpenedApp'
import {
  LoadScreen,
  LoginScreen,
  ResetPasswordScreen,
  SignupScreen,
  SmsAuthenticationScreen,
  WalkthroughScreen,
  WelcomeScreen,
} from '../Core/onboarding'
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
} from '../Core/profile'
import MyProfileScreen from '../components/MyProfileScreen'
import ProfessionalItemDetail from '../screens/ProfessionalItemDetail/ProfessionalItemDetailScreen'
import ConversationsScreen from '../screens/ConversationsScreen/ConversationsScreen'


import EditVendorScreen from '../screens/EditVendor/EditVendorScreen'
import SearchScreen from '../screens/Search/SearchScreen'
import IMVendorReview from '../Core/review/ui/IMVendorReviewScreen/IMVendorReviewScreen'





import VendorHomeScreen from '../vendorapp/screens/Home/HomeScreen'

import { useConfig } from '../config'

const VendorMain = createStackNavigator()
const VendorMainNavigation = () => {
  const { theme, appearance } = useTheme()
  const { localized } = useTranslations()
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
      <VendorMain.Screen name="Search" component={SearchScreen} />
      <VendorMain.Screen name="EditVendor" component={EditVendorScreen} />
      <VendorMain.Screen name="Reviews" component={IMVendorReview} />
      <VendorMain.Screen
        name="ProfessionalItemDetail"
        component={ProfessionalItemDetail}
      />
      <VendorMain.Screen name="MyProfile" component={MyProfileScreen} />
      <VendorMain.Screen name="AccountDetail" component={IMEditProfileScreen} />
      <VendorMain.Screen name="Messages" component={ConversationsScreen} />
      <VendorMain.Screen
        options={{ headerRight: () => <View /> }}
        name={localized('Settings')}
        component={IMUserSettingsScreen}
      />
      <VendorMain.Screen
        options={{ headerRight: () => <View /> }}
        name={'Contact'}
        component={IMContactUsScreen}
      />
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
          menuItems={config.drawerMenuConfig.vendorDrawerConfig.upperMenu}
          menuItemsSettings={
            config.drawerMenuConfig.vendorDrawerConfig.lowerMenu
          }
        />
      )}>
      <VendorDrawer.Screen name="Main" component={VendorMainNavigation} />
    </VendorDrawer.Navigator>
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

const RootStack = createStackNavigator()
const RootNavigator = () => {
  const currentUser = useSelector(state => state.auth.user)
  console.log(currentUser.role)
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

      <RootStack.Screen
        options={{ headerShown: false }}
        name="MainStack"
        component={VendorDrawerStack}
      /> 


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

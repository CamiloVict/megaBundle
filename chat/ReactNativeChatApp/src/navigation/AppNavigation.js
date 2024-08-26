import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { useTranslations } from 'dopenative'
import IMDrawerMenu from '../Core/ui/drawer/IMDrawerMenu/IMDrawerMenu'
import { IMChatScreen, IMViewGroupMembersScreen } from '../Core/chat'
import { IMFriendsScreen, IMCreateGroupScreen } from '../Core'
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
  IMBlockedUsersScreen,
} from '../Core/profile'
import useNotificationOpenedApp from '../Core/helpers/notificationOpenedApp'
import HomeScreen from '../screens/HomeScreen/HomeScreen'

import {
  LoadScreen,
  LoginScreen,
  ResetPasswordScreen,
  SignupScreen,
  SmsAuthenticationScreen,
  WelcomeScreen,
  WalkthroughScreen,
} from '../Core/onboarding'

import MyProfileScreen from '../screens/MyProfileScreen/MyProfileScreen'
import { IMUserSearchModal } from '../Core/socialgraph/friendships'
import { NavigationContainer } from '@react-navigation/native'

import { useConfig } from '../config'

const AuthStack = createStackNavigator()
const AppStack = createStackNavigator()
const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
const RootStack = createStackNavigator()
const HomeSearchStackNavigator = createStackNavigator()
const FriendsSearchStackNavigator = createStackNavigator()

const LoginStack = () => {
  return (
    <AuthStack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={SignupScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Sms"
        component={SmsAuthenticationScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="ResetPassword"
        component={ResetPasswordScreen}
      />
    </AuthStack.Navigator>
  )
}

const HomeStack = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerTitleAlign: 'center', headerMode: 'float' }}>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="CreateGroup" component={IMCreateGroupScreen} />
      <AppStack.Screen name="PersonalChat" component={IMChatScreen} />
      <AppStack.Screen
        name="ViewGroupMembers"
        component={IMViewGroupMembersScreen}
      />
    </AppStack.Navigator>
  )
}

const HomeSearchStack = () => {
  return (
    <HomeSearchStackNavigator.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerMode: 'float',
        presentation: 'modal',
      }}>
      <HomeSearchStackNavigator.Screen
        name="Main"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <HomeSearchStackNavigator.Screen
        name="UserSearchScreen"
        component={IMUserSearchModal}
        options={{ headerShown: false }}
      />
    </HomeSearchStackNavigator.Navigator>
  )
}

const FriendsStack = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Friends"
      screenOptions={{ headerMode: 'float' }}>
      <AppStack.Screen
        initialParams={{
          showDrawerMenuButton: true,
        }}
        name="Friends"
        component={IMFriendsScreen}
      />
    </AppStack.Navigator>
  )
}

const FriendsSearchStack = () => {
  return (
    <FriendsSearchStackNavigator.Navigator
      initialRouteName="Main"
      screenOptions={{ headerMode: 'float', presentation: 'modal' }}>
      <FriendsSearchStackNavigator.Screen
        name="Main"
        component={FriendsStack}
        options={{ headerShown: false }}
      />
      <FriendsSearchStackNavigator.Screen
        name="UserSearchScreen"
        component={IMUserSearchModal}
        options={{ headerShown: false }}
      />
    </FriendsSearchStackNavigator.Navigator>
  )
}

const MyProfileStack = () => {
  return (
    <AuthStack.Navigator>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <AuthStack.Screen name="AccountDetails" component={IMEditProfileScreen} />
      <AuthStack.Screen name="Settings" component={IMUserSettingsScreen} />
      <AuthStack.Screen name="ContactUs" component={IMContactUsScreen} />
      <AuthStack.Screen name="BlockedUsers" component={IMBlockedUsersScreen} />
    </AuthStack.Navigator>
  )
}

// drawer stack
const DrawerStack = () => {
  const config = useConfig()
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerStyle={{ width: 270 }}
      drawerContent={({ navigation, state }) => {
        return (
          <IMDrawerMenu
            navigation={navigation}
            menuItems={config.drawerMenu.upperMenu}
            menuItemsSettings={config.drawerMenu.lowerMenu}
          />
        )
      }}
      initialRouteName="HomeSearchStack">
      <Drawer.Screen
        options={{ headerShown: false }}
        name="HomeSearchStack"
        component={HomeSearchStack}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="FriendsSearchStack"
        component={FriendsSearchStack}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="MyProfileStack"
        component={MyProfileStack}
      />
    </Drawer.Navigator>
  )
}

const MainStackNavigator = () => {
  const { localized } = useTranslations()

  useNotificationOpenedApp()

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerMode: 'float' }}>
      <Stack.Screen
        name={localized('Home')}
        options={{ headerShown: false }}
        component={DrawerStack}
      />
    </Stack.Navigator>
  )
}

// Manifest of possible screens
const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ animationEnabled: false, headerBackTitleVisible: false }}
      initialRouteName="LoadScreen">
      <Stack.Screen
        name="LoadScreen"
        options={{ headerShown: false }}
        component={LoadScreen}
      />
      <RootStack.Screen
        name="Walkthrough"
        options={{ headerShown: false }}
        component={WalkthroughScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="LoginStack"
        component={LoginStack}
      />
      <RootStack.Screen
        name="MainStack"
        options={{ headerShown: false }}
        component={MainStackNavigator}
      />
      <RootStack.Screen name="PersonalChat" component={IMChatScreen} />
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

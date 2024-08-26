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



import BookAppointmentScreen from '../screens/BookAppointment/BookAppointmentScreen'
import { IMChatScreen } from '../Core/chat'



import DateAppointmentsScreen from '../professionalApp/screens/DateAppointmentsScreen/DateAppointmentsScreen'
import AllAppointmentsScreen from '../professionalApp/screens/AllAppointmentsScreen/AllAppointmentsScreen'


import { useConfig } from '../config'


const ProfessionalMain = createStackNavigator()
const ProfessionalMainNavigation = () => {
  useNotificationOpenedApp()

  const { theme, appearance } = useTheme()
  const { localized } = useTranslations()

  return (
    <ProfessionalMain.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme.colors[appearance].primaryBackground,
        },
        headerTitleAlign: 'center',
        headerTintColor: theme.colors[appearance].primaryText,
      })}
      initialRouteName="Home"
      headerMode="float">
      <ProfessionalMain.Screen name="Home" component={DateAppointmentsScreen} />
      <ProfessionalMain.Screen
        options={{
          headerBackTitleVisible: false,
        }}
        name="Appointments"
        component={AllAppointmentsScreen}
      />
      <ProfessionalMain.Screen
        options={{
          headerBackTitleVisible: false,
        }}
        name="BookAppointment"
        component={BookAppointmentScreen}
      />
      <ProfessionalMain.Screen name="MyProfile" component={MyProfileScreen} />
      <ProfessionalMain.Screen
        options={{ headerRight: () => <View /> }}
        name={localized('Settings')}
        component={IMUserSettingsScreen}
      />
      <ProfessionalMain.Screen
        name="ProfessionalItemDetail"
        component={ProfessionalItemDetail}
      />
      <ProfessionalMain.Screen
        name="AccountDetail"
        component={IMEditProfileScreen}
      />
      <ProfessionalMain.Screen
        name="Messages"
        component={ConversationsScreen}
      />
      <ProfessionalMain.Screen name="PersonalChat" component={IMChatScreen} />
      <ProfessionalMain.Screen
        options={{ headerRight: () => <View /> }}
        name={'Contact'}
        component={IMContactUsScreen}
      />
    </ProfessionalMain.Navigator>
  )
}

const ProfessionalDrawer = createDrawerNavigator()
const ProfessionalDrawerStack = () => {
  const config = useConfig()
  return (
    <ProfessionalDrawer.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
          navigation={navigation}
          menuItems={config.drawerMenuConfig.professionalDrawerConfig.upperMenu}
          menuItemsSettings={
            config.drawerMenuConfig.professionalDrawerConfig.lowerMenu
          }
        />
      )}
      drawerPosition="left"
      drawerStyle={{ width: 250 }}>
      <ProfessionalDrawer.Screen
        name="Main"
        component={ProfessionalMainNavigation}
      />
    </ProfessionalDrawer.Navigator>
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
        component={ProfessionalDrawerStack}
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

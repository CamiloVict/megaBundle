import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  WelcomeScreen,
  LoginScreen,
  SignupScreen,
  SmsAuthenticationScreen,
  ResetPasswordScreen,
} from '../Core/onboarding'

const AuthStack = createStackNavigator()
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        cardShadowEnable: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
        headerShown: false,
      }}
      initialRouteName="Welcome">
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      <AuthStack.Screen name="Sms" component={SmsAuthenticationScreen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </AuthStack.Navigator>
  )
}

export default AuthStackNavigator

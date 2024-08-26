import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { LoadScreen, WalkthroughScreen } from '../Core/onboarding'
import MainStack from './MainStackNavigator'
import LoginStack from './AuthStackNavigator'

const DelayedStack = createStackNavigator()
const DelayedHomeStack = () => {
  return (
    <DelayedStack.Navigator
      initialRouteName="Delayed"
      screenOptions={{ presentation: 'modal' }}>
      <DelayedStack.Screen
        options={{
          headerShown: false,
        }}
        name="Delayed"
        component={MainStack}
      />
    </DelayedStack.Navigator>
  )
}

const Root = createStackNavigator()
const RootNavigator = () => {
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoadScreen">
      <Root.Screen name="LoadScreen" component={LoadScreen} />
      <Root.Screen name="Walkthrough" component={WalkthroughScreen} />
      <Root.Screen name="LoginStack" component={LoginStack} />
      <Root.Screen name="MainStack" component={MainStack} />
      <Root.Screen name="DelayedHome" component={DelayedHomeStack} />
    </Root.Navigator>
  )
}
/* export const RootNavigator = customCreateSwitchNavigator(
  {
    LoadScreen: LoadScreen,
    Walkthrough: WalkthroughScreen,
    LoginStack: LoginStack,
    MainStack: MainStack,
  },
  {
    initialRouteName: 'LoadScreen',
    initialRouteParams: ,
    transition: (
      <Transition.Together>
        <Transition.Out type="fade" durationMs={400} interpolation="easeIn" />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  },
); */

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}

export { RootNavigator, AppNavigator }

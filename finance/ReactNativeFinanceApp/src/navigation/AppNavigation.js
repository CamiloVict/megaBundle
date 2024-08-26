/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react'
import {
  Image,
  View,
  Platform,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'
import SplashScreen from '../screens/Splash/SplashScreen'
import OnboardingScreen from '../screens/OnBoarding/OnBoardingScreen'
import WelcomeScreen from '../screens/Welcome/WelcomeScreen'
import LogInScreen from '../screens/LogIn/LogInScreen'
import SignUpScreen from '../screens/SignUp/SignUpScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import PortfolioScreen from '../screens/Portfolio/PortfolioScreen'
import ExpensesScreen from '../screens/Expenses/ExpensesScreen'
import BankAccountsScreen from '../screens/BankAccounts/BankAccountsScreen'
import MoreScreen from '../screens/More/MoreScreen'
import AllSpendingCategoriesScreen from '../screens/AllSpendingCategories/AllSpendingCategoriesScreen'
import NewsScreen from '../screens/News/NewsScreen'
import NotificationsScreen from '../screens/Notifications/NotificationsScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import AccountDetailsScreen from '../screens/AccountDetails/AccountDetailsScreen'
import SettingsScreen from '../screens/Settings/SettingsScreen'
import LinkAccountsScreen from '../screens/LinkAccount/LinkAccountScreen'
import BankAccountDetalisScreen from '../screens/BankAccountDetails/BankAccountDetailsScreen'
import BuySellScreen from '../screens/BuySell/BuySellScreen'
import SearchScreen from '../screens/Search/SearchScreen'
import TransactionsScreen from '../screens/Transactions/TransactionsScreen'
import NewsWebView from '../screens/NewsWebView/NewsWebView'
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer'
import MenuImage from '../components/MenuImage/MenuImage'
import AssetScreen from '../screens/AssetScreen/AssetScreen'
import AllAssetsScreen from '../screens/AllAssetsScreen/AllAssetsScreen'
import AssetsWatchListScreen from '../screens/AssetsWatchListScreen/AssetsWatchListScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import BackButton from '../components/BackButton/BackButton'
import { SearchBar } from 'react-native-elements'

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  headerStyle: {
    backgroundColor: '#4a7bd0',
    elevation: 0,
    shadowColor: 'transparent',
    borderBottomWidth: 0,
  },
})

const Stack = createStackNavigator()
const BottomTabNavigator = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const LandingNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Onboarding"
        component={OnboardingScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
        }}
        name="LogIn"
        component={LogInScreen}
      />
      <Stack.Screen
        options={{
          headerTransparent: 'true',
          title: '',
        }}
        name="SignUp"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  )
}

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}

const ExpensesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
      }}>
      <Stack.Screen name="Expenses" component={ExpensesScreen} />
    </Stack.Navigator>
  )
}

const PortfolioStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
      }}>
      <Stack.Screen name="Portfolio" component={PortfolioScreen} />
    </Stack.Navigator>
  )
}

const BankAccountsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
      }}>
      <Stack.Screen
        options={{ title: 'Accounts' }}
        name="BankAccounts"
        component={BankAccountsScreen}
      />
    </Stack.Navigator>
  )
}

const MoreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
      }}>
      <Stack.Screen name="More" component={MoreScreen} />
    </Stack.Navigator>
  )
}

//ios
const TabNavigator = () => {
  return (
    <BottomTabNavigator.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home">
      <BottomTabNavigator.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('../assets/icons/home.png')}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Expenses"
        component={ExpensesStack}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/icons/expenses.png')}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Portfolio"
        component={PortfolioStack}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/icons/portfolio.png')}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="BankAccounts"
        component={BankAccountsStack}
        options={{
          title: 'Accounts',
          tabBarIcon: () => (
            <Image
              source={require('../assets/icons/bankAccounts.png')}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="More"
        component={MoreStack}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/icons/more.png')}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  )
}

//android
const mainScreensNavigator = () => {
  //const state = useNavigationState(state => state);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => {
        /*var {routeName} = navigation.state.routes[navigation.state.index];
        if (routeName == 'BankAccounts') {
          routeName = 'Bank Accounts';
        }*/
        return {
          //headerTitle: routeName,

          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#4a7bd0',
            elevation: 0,
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          },
          headerLeft: () => (
            <MenuImage
              onPress={() => {
                navigation.openDrawer()
              }}
            />
          ),
          headerRight: () => <View />,
        }
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Portfolio" component={PortfolioScreen} />
      <Stack.Screen name="Expenses" component={ExpensesScreen} />
      <Stack.Screen name="More" component={MoreScreen} />
      <Stack.Screen
        options={{
          title: 'Accounts',
        }}
        name="BankAccounts"
        component={BankAccountsScreen}
      />
    </Stack.Navigator>
  )
}

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 17,
          fontWeight: 'bold',
          textAlign: 'center',
          alignSelf: 'center',
          color: 'white',
        },
        headerStyle: {
          backgroundColor: '#4a7bd0',
          elevation: 0,
          shadowColor: 'transparent',
          borderBottomWidth: 0,
        },
        headerRight: () => <View />,
      }}>
      <Stack.Screen
        name="Nav"
        options={{
          headerShown: false,
        }}
        component={Platform.OS === 'ios' ? TabNavigator : mainScreensNavigator}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <BackButton
              onPress={() => navigation.goBack()}
              title={'Expenses'}
            />
          ),
          title: 'All Expenses',
        })}
        name="AllSpendingCategories"
        component={AllSpendingCategoriesScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () =>
            Platform.OS == 'ios' ? (
              <BackButton onPress={() => navigation.goBack()} title={'More'} />
            ) : (
              <MenuImage
                onPress={() => {
                  navigation.openDrawer()
                }}
              />
            ),
          title: 'News',
          headerRight: () => <View />,
        })}
        name="News"
        component={NewsScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () =>
            Platform.OS == 'ios' ? (
              <BackButton onPress={() => navigation.goBack()} title={'More'} />
            ) : (
              <MenuImage
                onPress={() => {
                  navigation.openDrawer()
                }}
              />
            ),
          title: 'Notifications',
          headerRight: () => <View />,
        })}
        name="Notifications"
        component={NotificationsScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () =>
            Platform.OS == 'ios' ? (
              <BackButton onPress={() => navigation.goBack()} title={'More'} />
            ) : (
              <MenuImage
                onPress={() => {
                  navigation.openDrawer()
                }}
              />
            ),
          title: 'Profile',
          headerRight: () => <View />,
        })}
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <BackButton onPress={() => navigation.goBack()} title={'Profile'} />
          ),
          title: 'Account Details',
          headerRight: () => <View />,
        })}
        name="AccountDetails"
        component={AccountDetailsScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <BackButton onPress={() => navigation.goBack()} title={'Profile'} />
          ),
          title: 'Account Details',
          headerRight: () => <View />,
        })}
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          title: 'Link New Account',
          headerLeft: () => (
            <BackButton onPress={() => navigation.goBack()} title={''} />
          ),
        })}
        name="LinkAccount"
        component={LinkAccountsScreen}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <BackButton onPress={() => navigation.goBack()} title={''} />
          ),
          title: route.params?.title,
          headerRight: () => <View />,
        })}
        name="BankAccountDetalis"
        component={BankAccountDetalisScreen}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <TouchableHighlight
              onPress={() => navigation.goBack()}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Text style={{ color: 'white', marginLeft: 10 }}>Cancel</Text>
            </TouchableHighlight>
          ),
          headerRight: () => <View />,
          title: route.params?.type + ' ' + route.params?.title,
        })}
        name="BuySell"
        component={BuySellScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <BackButton onPress={() => navigation.goBack()} title={''} />
          ),
          headerRight: () => <View />,
          headerTitle: () => (
            <SearchBar
              containerStyle={{
                backgroundColor: 'transparent',
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
                flex: 1,
              }}
              inputContainerStyle={{
                backgroundColor: 'white',
              }}
              inputStyle={{
                backgroundColor: 'white',
                borderRadius: 10,
                color: 'black',
              }}
              searchIcond
              clearIcon
              //lightTheme
              round
              onChangeText={text => this.handleSearch(text)}
              //onClear={() => params.handleSearch('')}
              placeholder="Search"
              value={this.getValue}
            />
          ),
        })}
        name="Search"
        component={SearchScreen}
      />
      <Stack.Screen
        name="Transactions"
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <BackButton
              onPress={() => navigation.goBack()}
              title={route.params.backScreen}
            />
          ),
          title: 'Transactions',
          headerRight: () => <View />,
        })}
        component={TransactionsScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerBackTitle: 'News',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          title: '',
        })}
        name="NewsWebView"
        component={NewsWebView}
      />
      <Stack.Screen
        options={{ animationTypeForReplace: 'pop' }}
        name="AssetScreen"
        component={AssetScreen}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          title: 'Your ' + route.params?.title,
          headerLeft: () => (
            <BackButton
              onPress={() => navigation.goBack()}
              title={'Portfolio'}
            />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight onPress={() => this.onPressBinocular()}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 10,
                    alignSelf: 'center',
                  }}
                  source={require('../assets/icons/binocular.png')}
                />
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() =>
                  navigation.navigate('Search', { type: route.params?.title })
                }>
                <Image
                  source={require('../assets/icons/search.png')}
                  style={{
                    marginRight: 10,
                    width: 20,
                    height: 20,
                    alignSelf: 'center',
                  }}
                />
              </TouchableHighlight>
            </View>
          ),
        })}
        name="AllAssetsScreen"
        component={AllAssetsScreen}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerLeft: (
            <BackButton
              onPress={() => navigation.goBack()}
              title={route.params?.type}
            />
          ),
          title: 'Your WatchList',
          headerRight: () => <View />,
        })}
        name="AssetsWatchListScreen"
        component={AssetsWatchListScreen}
      />
    </Stack.Navigator>
  )
}

//ios
const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Landing" component={LandingNavigator} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={MainNavigator}
      />
    </Stack.Navigator>
  )
}

//android
const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation, state }) => {
        return <DrawerContainer navigation={navigation} />
      }}
      drawerStyle={{ width: 250 }}
      initialRouteName="Main">
      <Drawer.Screen name="Landing" component={LandingNavigator} />
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  )
}

const AppContainer = () => {
  return (
    <NavigationContainer>
      {Platform.OS === 'ios' ? <Navigator /> : <DrawerStack />}
    </NavigationContainer>
  )
}

export default AppContainer

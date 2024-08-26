/* eslint-disable comma-dangle */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'
import MenuButton from '../../components/MenuButton/MenuButton'
export default function DrawerContainer({ navigation }) {
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="Home"
          source={require('../../assets/icons/home.png')}
          onPress={() => {
            navigation.navigate('Home')
            navigation.closeDrawer()
          }}
        />
        <MenuButton
          title="Expenses"
          source={require('../../assets/icons/expenses.png')}
          onPress={() => {
            navigation.navigate('Expenses')
            navigation.closeDrawer()
          }}
        />
        <MenuButton
          title="Portfolio"
          source={require('../../assets/icons/portfolio.png')}
          onPress={() => {
            navigation.navigate('Portfolio')
            navigation.closeDrawer()
          }}
        />
        <MenuButton
          title="Bank Accounts"
          source={require('../../assets/icons/bankAccounts.png')}
          onPress={() => {
            navigation.navigate('Nav', {
              screen: 'BankAccounts',
            })
            navigation.closeDrawer()
          }}
        />
        <MenuButton
          title="News"
          source={require('../../assets/icons/newsDrawer.png')}
          onPress={() => {
            navigation.navigate('News')
            navigation.closeDrawer()
          }}
        />
        <MenuButton
          title="Notifications"
          source={require('../../assets/icons/notificationsDrawer.png')}
          onPress={() => {
            navigation.navigate('Notifications')
            navigation.closeDrawer()
          }}
        />
        <MenuButton
          title="Profile"
          source={require('../../assets/icons/profileDrawer.png')}
          onPress={() => {
            navigation.navigate('Profile')
            navigation.closeDrawer()
          }}
        />
      </View>
    </View>
  )
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
}

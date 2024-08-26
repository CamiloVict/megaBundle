/* eslint-disable comma-dangle */
import React from 'react'
import { View, Image, TouchableHighlight, Text, ScrollView } from 'react-native'
import styles from './styles'

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  onPressLogButton = () => {
    this.props.navigation.navigate('LogIn')
  }

  onPressSignButton = () => {
    this.props.navigation.navigate('SignUp')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.mainContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/icons/pngLogo.png')}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to Finance</Text>
            <Text style={styles.description}>
              Manage all your finance accounts in one place.
            </Text>
          </View>
          <View style={styles.logContainer}>
            <TouchableHighlight
              style={styles.loginContainer}
              onPress={() => this.onPressLogButton()}>
              <Text style={styles.logTxt}>Log in</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.signupContainer}
              onPress={() => this.onPressSignButton()}>
              <Text style={styles.signTxt}>Sign up</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    )
  }
}

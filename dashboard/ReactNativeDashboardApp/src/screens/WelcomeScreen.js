import React from 'react'
import Button from 'react-native-button'
import { Text, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import AppStyles from '../AppStyles'

class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to your dashboard.</Text>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Log In
        </Button>
        <Button
          containerStyle={styles.signupContainer}
          style={styles.signupText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Sign Up
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    textAlign: 'center',
    fontSize: AppStyles.fontSizeSet.xlarge,
    fontWeight: 'bold',
    color: AppStyles.colorSet.mainThemeForegroundColor,
    marginTop: 20,
    marginBottom: 20,
    fontFamily: AppStyles.fontSet.regular,
  },
  loginContainer: {
    width: AppStyles.sizeSet.buttonWidth,
    backgroundColor: AppStyles.colorSet.mainThemeForegroundColor,
    borderRadius: AppStyles.sizeSet.radius,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.colorSet.mainThemeBackgroundColor,
    fontFamily: AppStyles.fontSet.regular,
  },
  signupContainer: {
    width: AppStyles.sizeSet.buttonWidth,
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
    borderRadius: AppStyles.sizeSet.radius,
    padding: 10,
    borderWidth: 1,
    borderColor: AppStyles.colorSet.mainThemeForegroundColor,
    marginTop: 30,
  },
  signupText: {
    color: AppStyles.colorSet.mainThemeForegroundColor,
    fontFamily: AppStyles.fontSet.regular,
  },
})

WelcomeScreen.propTypes = {
  navigation: PropTypes.object,
}

export default WelcomeScreen

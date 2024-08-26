import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Button from 'react-native-button'
import PropTypes from 'prop-types'
import AppStyles from '../AppStyles'
import Api from '../Api'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //   loading: true,
      email: 'w1@gmail.com',
      password: 'parola',
    }
  }

  onPressLogin = () => {
    Api.login(this.state.email, this.state.password, (success, data) => {
      if (success) {
        this.props.navigation.navigate('DrawerStack')
      } else {
        alert(data)
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="E-mail or phone number"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            secureTextEntry
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            underlineColorAndroid="transparent"
          />
        </View>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => this.onPressLogin()}>
          Log in
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: AppStyles.fontSizeSet.xlarge,
    fontWeight: 'bold',
    color: AppStyles.colorSet.mainThemeForegroundColor,
    marginTop: 20,
    marginBottom: 20,
    fontFamily: AppStyles.fontSet.regular,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
    fontFamily: AppStyles.fontSet.regular,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSizeSet.middle,
    color: AppStyles.colorSet.mainThemeForegroundColor,
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
  placeholder: {
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.sizeSet.buttonWidth,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: AppStyles.sizeSet.radius,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.colorSet.mainTextColor,
    fontFamily: AppStyles.fontSet.regular,
  },
})

LoginScreen.propTypes = {
  navigation: PropTypes.object,
}

export default LoginScreen

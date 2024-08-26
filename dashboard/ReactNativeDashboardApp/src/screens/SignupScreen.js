import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Button from 'react-native-button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types'
import AppStyles from '../AppStyles'
import Api from '../Api'

class SignupScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      //   loading: true,
      fullname: 'John smith',
      phone: '111',
      email: 'john@gmail.com',
      password: '111111',
    }
  }

  onRegister = () => {
    const { fullname, phone, email, password } = this.state

    Api.signup(fullname, phone, email, password, (success, data) => {
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
        <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
        <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }}>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Full Name"
              onChangeText={text => this.setState({ fullname: text })}
              value={this.state.fullname}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Phone Number"
              onChangeText={text => this.setState({ phone: text })}
              value={this.state.phone}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="E-mail Address"
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Password"
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
              underlineColorAndroid="transparent"
            />
          </View>
          <Button
            containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
            style={styles.facebookText}
            onPress={() => this.onRegister()}>
            Sign Up
          </Button>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: AppStyles.fontSizeSet.xlarge,
    fontWeight: 'bold',
    color: AppStyles.colorSet.mainThemeForegroundColor,
    marginTop: 20,
    fontFamily: AppStyles.fontSet.regular,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    fontFamily: AppStyles.fontSet.regular,
    marginLeft: 20,
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
    width: AppStyles.sizeSet.inputWidth,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    alignSelf: 'center',
    borderRadius: AppStyles.sizeSet.radius,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.colorSet.mainTextColor,
  },
  facebookContainer: {
    alignSelf: 'center',
    width: AppStyles.sizeSet.buttonWidth,
    backgroundColor: AppStyles.colorSet.mainThemeForegroundColor,
    borderRadius: AppStyles.sizeSet.radius,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: AppStyles.colorSet.mainThemeBackgroundColor,
    fontFamily: AppStyles.fontSet.regular,
  },
})

SignupScreen.propTypes = {
  navigation: PropTypes.object,
}

export default SignupScreen

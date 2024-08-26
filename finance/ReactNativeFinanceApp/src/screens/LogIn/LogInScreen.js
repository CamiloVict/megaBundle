/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import styles from './styles';

export default class LogInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  onPressLogButton = () => {
    this.props.navigation.navigate('Home');
  };

  onPressFacebookButton = () => {
    this.props.navigation.navigate('');
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.container}>
          <View>
            <Text style={styles.title}>Sign in</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email or phone number"
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              />
            </View>
            <View style={styles.logContainer}>
              <TouchableHighlight
                style={styles.loginContainer}
                onPress={() => this.onPressLogButton()}
              >
                <Text style={styles.logTxt}>Log in</Text>
              </TouchableHighlight>
              <Text style={styles.orTxt}>OR</Text>
              <TouchableHighlight
                style={styles.facebookContainer}
                onPress={() => this.onPressFacebookButton()}
              >
                <Text style={styles.facebookTxt}>Facebook Login</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

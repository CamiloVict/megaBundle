/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput
} from 'react-native';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      password: ''
    };
  }
  onPressSignButton = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.container}>
          <View>
            <Text style={styles.title}>Create a new account</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                onChangeText={text => this.setState({ name: text })}
                value={this.state.name}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email Adress"
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Phone number"
                onChangeText={text => this.setState({ phone: text })}
                value={this.state.phone}
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
                style={styles.signContainer}
                onPress={() => this.onPressSignButton()}
              >
                <Text style={styles.signTxt}>Sign In</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

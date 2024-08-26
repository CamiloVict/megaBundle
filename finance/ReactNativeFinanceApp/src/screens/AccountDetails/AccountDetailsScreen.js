/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import styles from './styles'

export default class AccountDetailsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: 'Adrian',
      lastName: 'Smith',
      gmail: 'g1@yahoo.com',
      userName: '',
      gender: 'Male',
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View>
            <View style={styles.mainContainer}>
              <Text style={styles.title}>Public Profile</Text>
              <View style={styles.settingContainer}>
                <Text style={styles.settingTxt}>First Name</Text>
                <TextInput
                  style={styles.inputTxt}
                  onChangeText={text => this.setState({ firstName: text })}
                  value={this.state.firstName}
                />
              </View>
              <View style={styles.settingContainer}>
                <Text style={styles.settingTxt}>Last Name</Text>
                <TextInput
                  style={styles.inputTxt}
                  onChangeText={text => this.setState({ lastName: text })}
                  value={this.state.lastName}
                />
              </View>
              <View style={styles.settingContainer}>
                <Text style={styles.settingTxt}>User name</Text>
                <TextInput
                  style={styles.inputTxt}
                  placeholder="Your first name"
                  onChangeText={text => this.setState({ userName: text })}
                  value={this.state.userName}
                />
              </View>
              <View style={styles.settingContainer}>
                <Text style={styles.settingTxt}>Gender</Text>
                <TextInput
                  style={styles.inputTxt}
                  onChangeText={text => this.setState({ gender: text })}
                  value={this.state.gender}
                />
              </View>
            </View>
            <View style={styles.mainContainer}>
              <Text style={styles.title}>Private Details</Text>
              <View style={styles.settingContainer}>
                <Text style={styles.settingTxt}>Email adress</Text>
                <TextInput
                  style={styles.inputTxt}
                  onChangeText={text => this.setState({ gmail: text })}
                  value={this.state.gmail}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

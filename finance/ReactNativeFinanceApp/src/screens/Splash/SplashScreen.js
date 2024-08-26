/* eslint-disable comma-dangle */
import React from 'react'
import { View, Image, TouchableHighlight } from 'react-native'
import styles from './styles'

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Onboarding')}
          underlayColor="rgba(73,182,77,1,0.9)">
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo.jpg')}
          />
        </TouchableHighlight>
      </View>
    )
  }
}

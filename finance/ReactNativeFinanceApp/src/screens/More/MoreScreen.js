/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react'
import { View, TouchableHighlight, Text, ScrollView, Image } from 'react-native'
import styles from './styles'

export default class MoreScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('News')}
            underlayColor="rgba(73,182,77,1,0.9)">
            <View style={styles.itemContainer}>
              <View style={styles.rowContainer}>
                <Image
                  style={styles.itemIcon}
                  source={require('../../assets/icons/news.png')}
                />
                <Text style={styles.itemTitle}>News</Text>
              </View>
              <Image
                style={styles.rightArrow}
                source={require('../../assets/icons/rightArrow.png')}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Notifications')}
            underlayColor="rgba(73,182,77,1,0.9)">
            <View style={styles.itemContainer}>
              <View style={styles.rowContainer}>
                <Image
                  style={styles.itemIcon}
                  source={require('../../assets/icons/notifications.png')}
                />
                <Text style={styles.itemTitle}>Notifications</Text>
              </View>
              <Image
                style={styles.rightArrow}
                source={require('../../assets/icons/rightArrow.png')}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Profile')}
            underlayColor="rgba(73,182,77,1,0.9)">
            <View style={styles.itemContainer}>
              <View style={styles.rowContainer}>
                <Image
                  style={styles.itemIcon}
                  source={require('../../assets/icons/profiel.png')}
                />
                <Text style={styles.itemTitle}>Profile</Text>
              </View>
              <Image
                style={styles.rightArrow}
                source={require('../../assets/icons/rightArrow.png')}
              />
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}

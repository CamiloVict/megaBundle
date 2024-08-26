/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import { View, TouchableHighlight, Text, ScrollView, TextInput } from 'react-native';
import styles from './styles';

export default class Sellcreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shares: '0',
      price: '180'
    };
  }

  onPressButton = () => {
    this.props.navigation.goBack();
  };

  render() {
    const title = this.props.route.params?.title;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.blueTxt}>SHARES OF {title}</Text>
            <TextInput
              placeholder="Enter number of shares"
              onChangeText={text => this.setState({ shares: text })}
              value={this.state.shares}
              style={styles.inputTxt}
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.blueTxt}>MKT PRICE</Text>
            <Text>X</Text>
            <Text>${this.state.price}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.greyTxt}>EST PRICE</Text>
            <Text style={styles.boldTxt}>
              $
              {parseInt(this.state.price, 10) *
                parseInt(this.state.shares == '' ? 0 : this.state.shares, 10)}
            </Text>
          </View>
        </View>
        <TouchableHighlight
          style={styles.btnContainer}
          onPress={() => this.onPressButton()}
          underlayColor="rgba(73,182,77,1,0.9)"
        >
          <Text style={styles.btnTxt}>Trade</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

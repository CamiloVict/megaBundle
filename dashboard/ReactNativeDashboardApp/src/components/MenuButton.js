import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import AppStyles from '../AppStyles';

export default class MenuButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.btnClickContain}
        underlayColor="rgba(128, 128, 128, 0.1)"
      >
        <View style={styles.btnContainer}>
          <View style={styles.imageContainer}>
            <Image source={this.props.source} style={styles.image} />
          </View>
          <Text style={styles.btnText}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 0.5,
    height: 30,
    width: 30,
    marginLeft: 20,
    marginRight: 10,
    borderColor: AppStyles.colorSet.mainTextColor,
  },
  image: {
    tintColor: AppStyles.colorSet.mainTextColor,
    height: 15,
    width: 15,
  },
  btnText: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2,
    fontFamily: AppStyles.fontSet.regular,
  },
});

MenuButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};

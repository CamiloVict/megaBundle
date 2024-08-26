import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import AppStyles from '../AppStyles';

export default class CategoryButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor={AppStyles.colorSet.hairlineColor}
      >
        <View style={styles.categoryItemContainer}>
          <View
            style={[
              styles.iconContainer,
              { borderColor: this.props.color, backgroundColor: this.props.lightColor },
            ]}
          >
            <Image
              style={[styles.categoryIcon, { tintColor: this.props.color }]}
              source={this.props.icon}
            />
          </View>
          <Text style={styles.categoryName}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const GAP = 10;

const styles = StyleSheet.create({
  categoryItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: AppStyles.colorSet.hairlineColor,
    borderRadius: 5,
    width: (AppStyles.windowW - 4 * GAP) / 3,
    height: ((AppStyles.windowW - 4 * GAP) * 1.5) / 3,
  },
  iconContainer: {
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: AppStyles.colorSet.hairlineColor,
    width: 60,
  },
  categoryIcon: {
    height: 20,
    width: 20,
  },
  categoryName: {
    marginTop: 10,
    fontFamily: AppStyles.fontSet.regular,
    alignSelf: 'center',
  },
});

CategoryButton.propTypes = {
  lightColor: PropTypes.number,
  icon: PropTypes.number,
  onPress: PropTypes.func,
  color: PropTypes.number,
  title: PropTypes.string,
};

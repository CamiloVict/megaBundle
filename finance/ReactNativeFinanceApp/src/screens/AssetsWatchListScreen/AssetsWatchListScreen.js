/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import CardView from '../../components/CardView/CardView';
import { connect } from 'react-redux';

class AssetWatchListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({ item }) => {
    if (item.watchList) {
      return (
        <CardView
          onPress={() =>
            this.props.navigation.navigate('AssetScreen', {
              item,
              type: this.props.route.params?.type,
              changeWatchList:
                this.props.route.params?.type == 'Stocks'
                  ? this.props.changeWatchListStock
                  : this.props.changeWatchListCrypto,
            })
          }
          item={item}
        />
      );
    }
  }

  render() {
    const array = this.props.route.params?.array;
    return (
      <View
        style={[
          {
            marginTop: 5,
          },
          styles.container,
        ]}>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={array}
          renderItem={this.renderItem}
          extraData={this.state}
          keyExtractor={item => `${item.id}`}
          listKey="0"
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeWatchListStock: id =>
      dispatch({ type: 'CHANGE_WATCHLIST_STOCK', id }),
    changeWatchListCrypto: id =>
      dispatch({ type: 'CHANGE_WATCHLIST_CRYPTO', id }),
  };
}

function mapStateToProps(state) {
  return {
    stocks: state.stocks.stocksArray,
    crypto: state.crypto.cryptoArray,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetWatchListScreen);

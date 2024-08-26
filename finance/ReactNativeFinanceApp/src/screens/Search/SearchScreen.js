/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, View } from 'react-native';
import styles from './styles';
import {
  getStocksByStockName,
  getCryptoByCryptoName,
} from '../../data/mockData';
import CardView from '../../components/CardView/CardView';
import { connect } from 'react-redux';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: [],
    };
  }

  handleSearch = text => {
    var type = this.props.route.params?.type;
    var arr = [];
    if (type === 'Stocks') {
      arr = getStocksByStockName(text);
    } else if (type === 'Cryptocurencies') {
      arr = getCryptoByCryptoName(text);
    }
    /*
    var stockArray = getStocksByStockName(text);
    var cryptoArray = getCryptoByCryptoName(text);
    var aux = stockArray.concat(cryptoArray);

    var arr = [...new Set(aux)];
    */
    if (text === '') {
      this.setState({
        value: '',
        data: [],
      });
    } else {
      this.setState({
        value: text,
        data: arr,
      });
    }
  }

  getValue = () => {
    return this.state.value;
  }

  renderItem = ({ item }) => (
    <CardView
      onPress={() =>
        this.props.navigation.navigate('AssetScreen', {
          params: {
            item,
            type: this.props.route.params?.type,
            changeWatchList:
              this.props.route.params?.type === 'Stocks'
                ? this.props.changeWatchListStock
                : this.props.changeWatchListCrypto,
          },
        })
      }
      item={item}
    />
  )

  render() {
    return (
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={styles.container}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

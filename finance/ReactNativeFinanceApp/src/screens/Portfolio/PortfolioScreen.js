/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import styles from './styles';
import { PieChart } from 'react-native-chart-kit';
import { portfolioData, chartConfig, storiesArray } from '../../data/dataArrays';
import { connect } from 'react-redux';
import CardView from '../../components/CardView/CardView';
import StoryView from '../../components/StoryView/StoryView';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

class PortfolioScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  renderStock = ({ item }) => (
    <CardView
      onPress={() =>
        this.props.navigation.navigate('AssetScreen', {
          item,
          type: 'Stocks',
          changeWatchList: this.props.changeWatchListStock,
        })
      }
      item={item}
    />
  )

  renderCrypto = ({ item }) => (
    <CardView
      onPress={() =>
        this.props.navigation.navigate('AssetScreen', {
          item,
          type: 'Cryptocurencies',
          changeWatchList: this.props.changeWatchListCrypto,
        })
      }
      item={item}
    />
  )

  renderStory = ({ item }) => (
    <StoryView
      item={item}
      onPress={() => this.props.navigation.navigate('NewsWebView', { item })}
    />
  )

  onPressViewCryptocureinces = () => {
    this.props.navigation.navigate('AllAssetsScreen', {
      array: this.props.crypto,
      title: 'Cryptocurencies',
    });
  }

  onPressViewStocks = () => {
    this.props.navigation.navigate('AllAssetsScreen', {
      array: this.props.stocks,
      title: 'Stocks',
    });
  }

  onPressViewStories = () => {}

  renderScreen = () => {
    return (
      <>
        <View style={styles.chartContainer}>
          <PieChart
            data={portfolioData}
            width={SCREEN_WIDTH}
            height={220}
            chartConfig={chartConfig}
            accessor="money"
            backgroundColor="transparent"
          />
        </View>
        <View style={styles.facilitieContainer}>
          <Text style={styles.title}>Stocks</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={this.props.stocks}
            renderItem={this.renderStock}
            extraData={this.state}
            keyExtractor={item => `${item.id}`}
            listKey="0"
          />
          <TouchableHighlight
            style={styles.viewContainer}
            onPress={() => this.onPressViewStocks()}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Text style={styles.viewTxt}>View all stocks</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.facilitieContainer}>
          <Text style={styles.title}>Cryptocurencies</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={this.props.crypto}
            renderItem={this.renderCrypto}
            extraData={this.state}
            keyExtractor={item => `${item.id}`}
            listKey="1"
          />
          <TouchableHighlight
            style={styles.viewContainer}
            onPress={() => this.onPressViewCryptocureinces()}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Text style={styles.viewTxt}>View all cryptocurencies</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.facilitieContainer}>
          <Text style={styles.title}>Top Stories</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={storiesArray}
            renderItem={this.renderStory}
            extraData={this.state}
            keyExtractor={item => `${item.id}`}
            listKey="2"
          />
          <TouchableHighlight
            style={styles.viewContainer}
            onPress={() => this.onPressViewStories()}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Text style={styles.viewTxt}>View all stories</Text>
          </TouchableHighlight>
        </View>
      </>
    )
  }
  render() {
    return (
      <FlatList
        data={[]}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={this.renderScreen}
        listKey="0"
        style={styles.container}
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

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen);

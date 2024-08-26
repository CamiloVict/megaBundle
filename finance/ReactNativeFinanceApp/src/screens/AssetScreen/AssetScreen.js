/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  FlatList,
  Image,
} from 'react-native'
import styles from './styles'
import LineChartView from '../../components/LineChartView/LineChartView'
import { getStockById, getCryptoById } from '../../data/mockData'
import {
  lineChartConfig,
  lineChartData,
  storiesArray,
  lineChartTables,
} from '../../data/dataArrays'
import BackButton from '../../components/BackButton/BackButton'
import StoryView from '../../components/StoryView/StoryView'

export default class AssetScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeChart: 0,
    }
  }

  componentDidMount() {
    const { navigation, route } = this.props
    //const { params = {} } = navigation.state;
    const item = route.params?.item
    const type = route.params?.type
    const watchlist =
      type == 'Stocks' ? getStockById(item.id) : getCryptoById(item.id)
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => navigation.navigate('Portfolio')}
          title={'Portfolio'}
        />
      ),
      title: route.params?.item.title,
      headerRight: () => (
        <TouchableHighlight
          underlayColor="#fff"
          onPress={() => this.onPressWatchList()}>
          <Image
            style={styles.wishListIcon}
            source={
              watchlist.watchList
                ? require('../../assets/icons/wishList.png')
                : require('../../assets/icons/wishListEmpty.png')
            }
          />
        </TouchableHighlight>
      ),
    })
  }

  renderStory = ({ item }) => (
    <StoryView
      item={item}
      onPress={() => this.props.navigation.navigate('NewsWebView', { item })}
    />
  )

  onPressWatchList = () => {
    const { route } = this.props
    const item = route.params?.item
    const type = route.params?.type
    const id = item.id
    route.params.changeWatchList(id)
    this.props.navigation.replace('AssetScreen', {
      item,
      type: type,
      changeWatchList: route.params.changeWatchList,
    })
  }

  onPressBuy = () => {
    this.props.navigation.navigate('BuySell', {
      title: this.props.route.params?.item.title,
      type: 'Buy',
    })
  }

  onPressSell = () => {
    this.props.navigation.navigate('BuySell', {
      title: this.props.route.params?.item.title,
      type: 'Sell',
    })
  }

  onPressViewStories = () => {}

  renderScreen = () => {
    const item = this.props.route.params?.item;
    return (
      <>
        <View style={styles.chartContainer}>
          <LineChartView
            lineChartData={lineChartData}
            lineChartConfig={lineChartConfig}
            lineChartTables={lineChartTables}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Your Position</Text>
          <View style={styles.rowContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.mainTxt}>Shares</Text>
              <Text style={styles.secTxt}>{item.position.shares}</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.mainTxt}>Equity</Text>
              <Text style={styles.secTxt}>{item.position.equity}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.mainTxt}>Avg Cost</Text>
              <Text style={styles.secTxt}>{item.position.avgCost}</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.mainTxt}>Portfolio Diversivity</Text>
              <Text style={styles.secTxt}>
                {item.position.portfolioDiversivity}
              </Text>
            </View>
          </View>
          <View style={styles.rowBorderContainer}>
            <Text style={styles.mainTxt}>Today's return</Text>
            <Text style={styles.secTxt}>{item.position.todayReturn}</Text>
          </View>
          <View style={styles.rowBorderContainer}>
            <Text style={styles.mainTxt}>Total return</Text>
            <Text style={styles.secTxt}>{item.position.totalReturn}</Text>
          </View>
        </View>
        <View style={styles.btnsContainer}>
          <TouchableHighlight
            style={styles.btnContainer}
            onPress={() => this.onPressBuy()}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Text style={styles.btnTxt}>Buy</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btnContainer}
            onPress={() => this.onPressSell()}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Text style={styles.btnTxt}>Sell</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Stats</Text>
          <View style={styles.rowContainer}>
            <View style={styles.row}>
              <Text style={styles.mainTxt}>Open</Text>
              <Text style={styles.secTxt}>{item.stats.open}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.mainTxt}>Volume</Text>
              <Text style={styles.secTxt}>{item.stats.volume}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.row}>
              <Text style={styles.mainTxt}>High</Text>
              <Text style={styles.secTxt}>{item.stats.high}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.mainTxt}>Avg Vol</Text>
              <Text style={styles.secTxt}>{item.stats.avgVol}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.row}>
              <Text style={styles.mainTxt}>Low</Text>
              <Text style={styles.secTxt}>{item.stats.low}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.mainTxt}>P/E Ratio</Text>
              <Text style={styles.secTxt}>{item.stats.peRatio}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.row}>
              <Text style={styles.mainTxt}>52 WK High</Text>
              <Text style={styles.secTxt}>{item.stats.wkHigh}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.mainTxt}>MKT Cap</Text>
              <Text style={styles.secTxt}>{item.stats.MKTCAP}</Text>
            </View>
          </View>
        </View>
        <View style={styles.facilitieContainer}>
          <Text style={styles.title}>Recent News</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={storiesArray}
            renderItem={this.renderStory}
            extraData={this.state}
            keyExtractor={item => `${item.id}`}
            listKey="0"
          />
          <TouchableHighlight
            style={styles.itemContainer}
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
        style={styles.container}
        listKey="0"
      />
    )
  }
}

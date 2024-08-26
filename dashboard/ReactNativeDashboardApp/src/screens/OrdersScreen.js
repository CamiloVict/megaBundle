import React from 'react'
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import AppStyles from '../AppStyles'
import Api from '../Api'

class OrdersScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      list: [],
    }
    const navigation = props.navigation

    navigation.setOptions({
      title: 'Orders',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer()
          }}>
          <Icon
            style={AppStyles.styleSet.menuButton}
            name="ios-menu"
            size={AppStyles.iconSizeSet.normal}
            color={AppStyles.colorSet.mainThemeForegroundColor}
          />
        </TouchableOpacity>
      ),
    })
  }

  componentDidMount() {
    this.setState({ list: Api.getOrders() })
  }

  onPressItem = item => {
    console.log(item)
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onPressItem(item)}>
      <View style={styles.itemContainer}>
        <FastImage style={styles.photo} source={{ uri: item.photo }} />
        <View style={styles.leftContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={item.valueType === 1 ? styles.value1 : styles.value2}>
            {item.value}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  render() {
    return (
      <FlatList
        data={this.state.list}
        renderItem={this.renderItem}
        keyExtractor={item => `${item.id}`}
        initialNumToRender={5}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    height: 60,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    margin: 10,
    borderColor: AppStyles.colorSet.hairlineColor,
  },
  leftContainer: {
    flex: 1,
  },
  title: {
    color: AppStyles.colorSet.mainTextColor,
    fontFamily: AppStyles.fontSet.regular,
  },
  description: {
    fontSize: 12,
    color: AppStyles.colorSet.mainSubtextColor,
    marginTop: 3,
    fontFamily: AppStyles.fontSet.regular,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  value1: {
    color: AppStyles.colorSet.redColor,
    fontFamily: AppStyles.fontSet.regular,
  },
  value2: {
    color: AppStyles.colorSet.mainThemeForegroundColor,
    fontFamily: AppStyles.fontSet.regular,
  },
})

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps)(OrdersScreen)

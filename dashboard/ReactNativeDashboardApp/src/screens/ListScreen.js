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
import PropTypes from 'prop-types'
import AppStyles from '../AppStyles'
import Api from '../Api'

class ListScreen extends React.Component {
  constructor(props) {
    super(props)

    const category = props.route.params.category
    this.state = {
      category,
      list: [],
    }
    props.navigation.setOptions({
      title: category,
    })
  }

  componentDidMount() {
    this.setState({ list: Api.getListOfCategory(this.state.category) })
  }

  onPressItem = item => {
    this.props.navigation.navigate('DetailScreen', {
      category: this.state.category,
      item,
    })
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
          <Text style={styles.value}>{item.value}</Text>
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
    height: 65,
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
  value: {
    color: AppStyles.colorSet.mainSubtextColor,
    fontFamily: AppStyles.fontSet.regular,
  },
})

const mapStateToProps = state => ({
  user: state.auth.user,
})

ListScreen.propTypes = {
  navigation: PropTypes.object,
}

export default connect(mapStateToProps)(ListScreen)

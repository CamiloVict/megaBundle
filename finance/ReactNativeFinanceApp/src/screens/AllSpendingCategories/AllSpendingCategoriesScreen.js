/* eslint-disable comma-dangle */
import React from 'react'
import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  TouchableHighlight,
} from 'react-native'
import { payments } from '../../data/dataArrays'
import BackButton from '../../components/BackButton/BackButton'
import styles from './styles'

export default class ExpensesScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  renderItem = ({ item }) => (
    <TouchableHighlight
      style={styles.itemContainer}
      onPress={() =>
        this.props.navigation.navigate('Transactions', {
          item: item,
          payments: payments,
          backScren: 'Expenses',
        })
      }>
      <View style={styles.mainContainer}>
        <View style={styles.rowContainer}>
          <Image style={styles.itemIcon} source={{ uri: item.icon }} />
          <View style={styles.itemTxtContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemmText}>{item.money}</Text>
          </View>
        </View>
        <Image
          style={styles.rightArrow}
          source={require('../../assets/icons/rightArrow.png')}
        />
      </View>
    </TouchableHighlight>
  )

  render() {
    const spendingArray = this.props.route.params?.spendingArray

    return (
      <View style={styles.container}>
        <View style={styles.facilitieContainer}>
          <Text style={styles.title}>All Spending Categories</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={spendingArray}
            renderItem={this.renderItem}
            extraData={this.state}
            keyExtractor={item => `${item.id}`}
            listKey="0"
          />
        </View>
      </View>
    )
  }
}

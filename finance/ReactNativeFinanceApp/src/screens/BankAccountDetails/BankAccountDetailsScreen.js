/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react'
import { FlatList } from 'react-native'
import LineChartView from '../../components/LineChartView/LineChartView'
import {
  lineChartData,
  lineChartConfig,
  lineChartTables,
} from '../../data/dataArrays'
import styles from './styles'
import TransactionView from '../../components/TransactionView/TransactionView'

export default class BankAccountDetalisScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeChart: 0,
    }
  }

  onPressItem = () => {}

  renderItem = ({ item }) => <TransactionView item={item} />

  renderGraph = () => {
    return (
      <LineChartView
        lineChartData={lineChartData}
        lineChartConfig={lineChartConfig}
        lineChartTables={lineChartTables}
      />
    )
  }

  render() {
    const item = this.props.route.params?.item
    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.chartContainer}
        vertical
        showsVerticalScrollIndicator={false}
        data={item.payments}
        renderItem={this.renderItem}
        extraData={this.state}
        ListHeaderComponent={this.renderGraph}
        keyExtractor={item => `${item.id}`}
        listKey="1"
      />
    )
  }
}

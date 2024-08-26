/* eslint-disable comma-dangle */
import React from 'react'
import {
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native'
import Card2View from '../../components/Card2View/Card2View'
import styles from './styles'
import { connect } from 'react-redux'

class BankAccountsScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  onPressItem = item => {}

  renderItem = ({ item }) => (
    <Card2View
      onPress={() =>
        this.props.navigation.navigate('BankAccountDetalis', {
          item: item,
          title: item.title,
        })
      }
      item={item}
    />
  )
  renderLinkButton = () => {
    return (
      <TouchableHighlight
        style={styles.btnContainer}
        onPress={() => this.props.navigation.navigate('LinkAccount')}
        underlayColor="rgba(73,182,77,1,0.9)">
        <Text style={styles.btnTxt}>Link Another Institution</Text>
      </TouchableHighlight>
    )
  }
  render() {
    return (
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.container, styles.facilitieContainer]}
        data={this.props.accounts}
        renderItem={this.renderItem}
        extraData={this.state}
        keyExtractor={item => `${'' + item.id + item?.title}`}
        listKey="0"
        ListFooterComponent={this.renderLinkButton}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addAccount: () => dispatch({ type: 'ADD_ACCOUNT' }),
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.bank.accounts,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountsScreen)

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import styles from './styles';
import { accounts } from '../../data/dataArrays';
import { connect } from 'react-redux';

class LinkAccountsScreen extends React.Component {
  constructor(props) {
    super(props);

    props.navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight
          onPress={() => this.addAccount()}
          underlayColor="rgba(73,182,77,1,0.9)">
          <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 10 }}>
            Done
          </Text>
        </TouchableHighlight>
      ),
    });

    this.state = {
      selected: [],
    };
  }

  addAccount = () => {
    var arr = this.state.selected;
    arr.map(data => {
      this.props.addAccount(accounts[data]);
    });
    this.props.navigation.navigate('BankAccounts');
  }

  onPressCard = item => {
    var arr = this.state.selected;
    if (arr.includes(item)) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
          arr.splice(i, 1);
          break;
        }
      }
    } else {
      arr.push(item);
    }
    this.setState({
      selected: arr,
    });
  }

  renderCard = ({ item }) => (
    <View>
      <TouchableHighlight
        underlayColor="rgba(73,182,77,1,0.9)"
        style={styles.cardContainer}
        onPress={() => this.onPressCard(item.id)}>
        <Image style={styles.cardImg} source={{ uri: item.icon }} />
      </TouchableHighlight>
      <Text
        style={
          this.state.selected.includes(item.id)
            ? styles.selectedCardTitle
            : styles.cardTitle
        }>
        {item.title}
      </Text>
    </View>
  )

  render() {
    return (
      <View
        style={[
          {
            marginTop: 5,
            alignItems: 'center',
          },
          styles.container,
        ]}>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={accounts}
          renderItem={this.renderCard}
          extraData={this.state}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addAccount: account => dispatch({ type: 'ADD_ACCOUNT', account }),
  };
}

function mapStateToProps(state) {
  return {
    accounts: state.bank.accounts,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkAccountsScreen);

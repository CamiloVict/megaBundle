/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import { View, Text, Switch, FlatList } from 'react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import { connect } from 'react-redux';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSetting = ({ item }) => (
    <View style={styles.settingContainer}>
      <Text style={styles.settingTxt}>{item.title}</Text>
      <Switch
        onValueChange={() => this.props.update(item.id)}
        value={item.switch}
      />
    </View>
  )

  renderScreen = () => {
    return (
      <>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>General Settings</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={this.props.settings.slice(0, 5)}
            renderItem={this.renderSetting}
            extraData={this.state}
            keyExtractor={item => `${item.id}`}
            listKey="0"
          />
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Stocks Notifications</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={this.props.settings.slice(5, 7)}
            renderItem={this.renderSetting}
            extraData={this.state}
            keyExtractor={item => `${item.id}`}
            listKey="1"
          />
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Maximum Distance</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={this.props.settings.slice(7, 9)}
            renderItem={this.renderSetting}
            extraData={this.state}
            keyExtractor={item => `${item.id}`}
            listKey="2"
          />
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
    update: id => dispatch({ type: 'UPDATE_SETTINGS', id }),
  };
}

function mapStateToProps(state) {
  return {
    settings: state.setting.settings,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

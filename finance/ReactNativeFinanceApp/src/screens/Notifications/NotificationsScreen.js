/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  FlatList,
} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import styles from './styles';
import { connect } from 'react-redux';
import MenuImage from '../../components/MenuImage/MenuImage';

class NotificationsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  renderUnreadMark = read => {
    if (!read) {
      return <View style={styles.unreadMark} />;
    }
  }

  renderNotification = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => this.props.update(item.id)}>
      <View style={styles.notificationContainer}>
        <View style={styles.rowContainer}>
          <Image style={styles.notificationIcon} source={{ uri: item.icon }} />
          <View style={{ alignSelf: 'center' }}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationText}>{item.text}</Text>
            <Text style={styles.notificationTime}>{item.date}</Text>
          </View>
        </View>
        {this.renderUnreadMark(item.read)}
      </View>
    </TouchableHighlight>
  )

  render() {
    return (
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={this.props.notifications}
        renderItem={this.renderNotification}
        extraData={this.state}
        keyExtractor={item => `${item.id}`}
        listKey="0"
        style={styles.container}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    update: id => dispatch({ type: 'UPDATE_NOTIFICATIONS', id }),
  };
}

function mapStateToProps(state) {
  return {
    notifications: state.notification.notifications,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen);

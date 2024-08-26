/* eslint-disable comma-dangle */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  notificationContainer: {
    borderBottomWidth: 1,
    borderColor: '#e1ddf5',
    width: '100%',
    padding: 10,
    justifyContent: 'center'
  },
  rowContainer: {
    width: '80%',
    flexDirection: 'row'
  },
  notificationIcon: {
    alignSelf: 'center',
    width: 25,
    height: 25,
    marginRight: 15,
    marginLeft: 10,
    tintColor: '#9B9B9B'
  },
  notificationTitle: {
    margin: 5,
    color: '#9B9B9B',
    fontWeight: '600',
    fontSize: 11
  },
  notificationText: {
    color: '#2d3142',
    fontSize: 14,
    margin: 5,
    fontWeight: '400'
  },
  notificationTime: {
    margin: 5,
    fontSize: 12,
    color: '#9B9B9B',
    fontWeight: '400',
    fontStyle: 'italic'
  },
  unreadMark: {
    backgroundColor: '#f4771f',
    width: 10,
    height: 10,
    borderRadius: 10,
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1
  }
});

export default styles;

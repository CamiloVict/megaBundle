/* eslint-disable comma-dangle */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9'
  },
  mainContainer: {
    marginBottom: 20
  },
  title: {
    fontSize: 13,
    color: '#070f12',
    margin: 10
  },
  settingContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    borderBottomColor: 'rgba(214, 214, 214, 0.4)',
    borderBottomWidth: 1
  },
  settingTxt: {
    alignSelf: 'center',
    fontSize: 17,
    color: 'black'
  },
  settingTxt2: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 17,
    color: 'silver'
  },
  inputTxt: {
    alignSelf: 'flex-end',
    fontSize: 17,
    marginLeft: 10,
    marginRight: 10,
    color: 'black'
  }
});

export default styles;

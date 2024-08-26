/* eslint-disable comma-dangle */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  mainContainer: {
    marginBottom: 40
  },
  title: {
    fontSize: 13,
    color: '#070f12',
    // fontWeight: 'bold',
    margin: 10
  },
  settingContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    //borderBottomColor: 'silver',
    borderBottomColor: 'rgba(214, 214, 214, 0.4)',
    borderBottomWidth: 1,
  },
  settingTxt: {
    fontSize: 17,
    color: 'black'
  },
  settingTxt2: {
    fontSize: 17,
    color: 'silver'
  }
});

export default styles;

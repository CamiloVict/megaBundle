/* eslint-disable comma-dangle */
import { StyleSheet } from 'react-native';
import { expenses } from '../../AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  facilitieContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    //marginTop: 70,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#070f12',
    margin: 20
  },
  itemContainer: expenses.itemContainer,
  mainContainer: expenses.mainContainer,
  rowContainer: expenses.rowContainer,
  itemIcon: expenses.itemIcon,
  itemTxtContainer: expenses.itemTxtContainer,
  itemTitle: expenses.itemTitle,
  itemText: expenses.itemText,
  itemMoney: expenses.itemMoney,
  rightArrow: expenses.rightArrow
});

export default styles;

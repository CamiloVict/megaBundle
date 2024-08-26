/* eslint-disable comma-dangle */
import { StyleSheet } from 'react-native';
import { chart, card } from '../../AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9'
  },
  chartContainer: {
    ...chart.chartContainer,
    //marginTop: 80,
    marginTop: 15,
    marginBottom: 40,
    paddingBottom: 40
  },
  facilitieContainer: card.facilitieContainer,
  itemContainer: card.itemContainer,
  mainContainer: card.mainContainer,
  rowContainer: card.rowContainer,
  itemIcon: card.itemIcon,
  itemTxtContainer: card.itemTxtContainer,
  itemTitle: card.itemTitle,
  itemText: card.itemText,
  itemMoney: card.itemMoney,
  viewTxt: card.viewTxt,
  greenProcentContainer: card.greenProcentContainer,
  greenItemProcent: card.greenItemProcent,
  redProcentContainer: card.redProcentContainer,
  redItemProcent: card.redItemProcent
});

export default styles;

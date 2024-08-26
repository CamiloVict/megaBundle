/* eslint-disable comma-dangle */
import { StyleSheet } from 'react-native';
import { chart, crypto } from '../../AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9'
  },
  chartContainer: {
    ...chart.chartContainer,
    //marginTop: 80,
    marginTop: 15,
    marginBottom: 20
  },
  infoContainer: crypto.infoContainer,
  infoTitle: crypto.infoTitle,
  rowContainer: crypto.rowContainer,
  mainTxt: crypto.mainTxt,
  secTxt: crypto.secTxt,
  btnsContainer: crypto.btnsContainer,
  btnContainer: crypto.btnContainer,
  btnTxt: crypto.btnTxt,
  row: crypto.row,
  storyTitle: crypto.storyTitle,
  storyDate: crypto.storyDate,
  facilitieContainer: crypto.facilitieContainer,
  viewTxt: crypto.viewTxt,
  title: crypto.title,
  itemContainer: crypto.itemContainer,
  rightContainer: crypto.rightContainer,
  leftContainer: crypto.leftContainer,
  rowBorderContainer: crypto.rowBorderContainer,
  wishListIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
    alignSelf: 'center'
  }
});

export default styles;

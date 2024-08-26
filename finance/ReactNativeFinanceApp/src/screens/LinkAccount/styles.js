/* eslint-disable comma-dangle */
import { StyleSheet, Dimensions } from 'react-native';
// screen sizing
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const ICONNumColums = 3;
// item size
const ICON_ITEM_OFFSET = 20;
const ICON_ITEM_MARGIN = ICON_ITEM_OFFSET * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: ICON_ITEM_OFFSET,
    marginTop: 20,
    width: (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - ICON_ITEM_MARGIN,
    height: 30,
    borderColor: '#ffff',
    backgroundColor: '#ffff',
  },
  selectedCardTitle: {
    fontSize: 12,
    marginBottom: 30,
    textAlign: 'center',
    color: '#4a7bd0',
    fontWeight: 'bold'
  },
  cardImg: {
    borderRadius: ((SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - ICON_ITEM_MARGIN - 30) / 2,
    width: (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - ICON_ITEM_MARGIN - 30,
    height: (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - ICON_ITEM_MARGIN - 30
  },
  cardTitle: {
    marginBottom: 30,
    fontSize: 12,
    textAlign: 'center',
    color: '#768695'
  }
});

export default styles;

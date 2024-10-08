import { StyleSheet, Dimensions } from 'react-native'
import AppStyles from '../../AppStyles'

const { height } = Dimensions.get('window')

const dynamicStyles = colorScheme => {
  return new StyleSheet.create({
    container: {
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      flex: 1,
    },
    carouselContainer: {
      marginTop: 18,
    },
    carouselTitleText: {
      textAlign: 'center',
      fontSize: 20,
      fontFamily: AppStyles.fontFamily.semiBoldFont,
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      marginTop: 10,
      marginBottom: 12,
    },
    unitContainer: {
      marginTop: 20,
      marginLeft: 7,
    },
    unitTitle: {
      textAlign: 'left',
      fontSize: 20,
      fontFamily: AppStyles.fontFamily.semiBoldFont,
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      marginLeft: 7,
      marginBottom: 7,
    },
    emptyViewContainer: {
      marginTop: height / 6,
    },
  })
}

export default dynamicStyles

import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import AppStyles from '../../AppStyles'

const { width, height } = Dimensions.get('window')

const dynamicStyles = colorScheme => {
  return new StyleSheet.create({
    container: {
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      flex: 1,
    },
    categoryImageContainerStyle: {
      width: width * 0.93,
      height: height * 0.12,
    },
    emptyViewContainer: {
      marginTop: height / 6,
    },
  })
}

export default dynamicStyles

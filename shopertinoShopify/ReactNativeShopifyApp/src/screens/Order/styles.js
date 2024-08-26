import { Appearance, StyleSheet } from 'react-native'
import AppStyles from '../../AppStyles'

const colorScheme = Appearance.getColorScheme()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
  },
})

export default styles

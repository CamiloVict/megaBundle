import { StyleSheet } from 'react-native'
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w,
} from 'react-native-responsive-screen'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return new StyleSheet.create({
    container: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      flex: 1,
    },
    productContainerStyle: {
      borderBottomWidth: 0,
      backgroundColor: theme.colors[appearance].primaryBackground,
      justifyContent: 'space-between',
    },
    leftItemContainer: {
      width: 250,
    },
    icon: {
      width: 25,
      height: 25,
      tintColor: theme.colors[appearance].primaryForeground,
      marginHorizontal: 5,
    },
    iconContainer: { flexDirection: 'row' },
    emptyState: {
      fontSize: 16,
      textAlignVertical: 'center',
      alignSelf: 'center',
      marginTop: h(40),
      textAlign: 'center',
      width: 300,
      color: theme.colors[appearance].primaryText,
    },
    modalContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingTop: h(2),
    },
    emptyViewContainer: {
      marginTop: '25%',
      flex: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    deleteModalView: {
      width: w(100),
      height: h(40),
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTopRightRadius: w(3),
      borderTopLeftRadius: w(3),
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    deleteModalContainer: {
      alignItems: 'center',
      backgroundColor: '#fff',
      width: w(100),
      marginTop: h(60),
      alignSelf: 'center',
    },
    deleteModalDescription: {
      fontSize: 18,
    },
    deleteModalHeader: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'center',
      color: theme.colors[appearance].primaryText,
    },
    addButtonContainer: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderRadius: 5,
      padding: 15,
      marginVertical: 5,
    },
    cancelButton: {
      color: theme.colors[appearance].primaryForeground,
      fontWeight: 'bold',
      fontSize: 16,
    },
    addButtonText: {
      color: '#FF0000',
      fontWeight: 'bold',
      fontSize: 15,
    },
    title: {
      fontSize: 16,
      color: theme.colors[appearance].primaryText,
      fontWeight: '500',
    },
    reserveButton: {
      color: theme.colors[appearance].primaryForeground,
      fontSize: 16,
      marginHorizontal: 4,
    },
    subtitleView: {
      paddingTop: 5,
    },
    description: {
      color: theme.colors[appearance].secondaryText,
      fontSize: 12,
    },
    price: {
      fontSize: 16,
      color: theme.colors[appearance].primaryText,
      marginTop: 10,
    },
    rightIcon: {
      width: 100,
      height: 100,
    },
  })
}
export default dynamicStyles

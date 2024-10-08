import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return new StyleSheet.create({
    emptyViewContainer: {
      marginTop: '25%',
      flex: 1,
    },
    orderList: {
      flex: 1,
      color: theme.colors[appearance].primaryBackground,
      backgroundColor: colorSet.primaryBackground,
    },
    container: {
      marginBottom: 30,
      flex: 1,
      padding: 10,
      backgroundColor: colorSet.primaryBackground,
    },
    photo: {
      width: '100%',
      height: 100,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    address: {
      position: 'absolute',
      top: 16,
      left: 16,
      right: 16,
      color: '#eeeeee',
      opacity: 0.8,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    rowContainer: {
      flexDirection: 'row',
    },
    count: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 1,
      borderWidth: 1,
      fontWeight: 'bold',
      paddingLeft: 7,
      paddingRight: 7,
      paddingTop: 2,
      paddingBottom: 2,
      textAlign: 'center',
      color: theme.colors[appearance].primaryForeground,
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderColor: theme.colors[appearance].primaryForeground,
      borderWidth: 1,
      borderRadius: 3,
    },
    price: {
      padding: 10,
      color: theme.colors[appearance].primaryText,
      fontWeight: 'bold',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    title: {
      flex: 1,
      padding: 10,
      color: theme.colors[appearance].primaryText,
      fontWeight: 'bold',
      fontWeight: 'bold',
      textAlign: 'left',
    },
    buttonsContainer: {
      flexDirection: 'row',
      flex: 2,
    },
    actionContainer: {
      flexDirection: 'row',
      marginTop: 30,
    },
    total: {
      flex: 1,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontWeight: 'bold',
      padding: 5,
      textAlign: 'center',
      color: theme.colors[appearance].primaryText,
      borderColor: colorSet.grey3,
    },
    statusText: {
      marginRight: 8,
      color: theme.colors[appearance].primaryForeground,
      fontSize: 14,
      borderWidth: 1,
      borderColor: theme.colors[appearance].primaryForeground,
      borderRadius: 5,
      textAlign: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      padding: 10,
    },
  })
}

export default dynamicStyles

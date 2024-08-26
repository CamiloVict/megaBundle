import React from 'react'
import { Provider } from 'react-redux'
import { enableScreens } from 'react-native-screens'
import store from './redux/store'
import AppContainer from './navigation/AppNavigation'

console.disableYellowBox = true

const App = () => {
  enableScreens()
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

export default App

import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { enableScreens } from 'react-native-screens'
import thunk from 'redux-thunk'

import AppReducer from './reducers'
import { AppNavigator } from './navigations/AppNavigator'

const store = createStore(AppReducer, applyMiddleware(thunk))

const App = props => {
  useEffect(() => {
    LogBox.ignoreAllLogs(true)
    enableScreens()
  }, [])

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}

export default App

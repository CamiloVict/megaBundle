import React, { useEffect } from 'react'

import { AppRegistry, LogBox } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import { extendTheme, DNProvider, TranslationProvider } from 'dopenative'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import AppReducer from './redux/reducers'
import AppContent from './AppContent'
import translations from './translations'
import { ConfigProvider } from './config'
import { AuthProvider } from './Core/onboarding/hooks/useAuth'
import { authManager } from './apis/AuthAPIManager'
import InstamobileTheme from './theme'

const store = createStore(AppReducer, applyMiddleware(thunk))

const App = () => {
  const theme = extendTheme(InstamobileTheme)

  useEffect(() => {
    SplashScreen.hide()
    LogBox.ignoreAllLogs(true)
  }, [])

  return (
    <Provider store={store}>
      <TranslationProvider translations={translations}>
        <DNProvider theme={theme}>
          <ConfigProvider>
            <AuthProvider authManager={authManager}>
              <AppContent />
            </AuthProvider>
          </ConfigProvider>
        </DNProvider>
      </TranslationProvider>
    </Provider>
  )
}

export default App

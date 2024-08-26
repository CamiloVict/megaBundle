import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { AppRegistry, LogBox } from 'react-native'
import { extendTheme, DNProvider, TranslationProvider } from 'dopenative'
import configureStore from './redux/store'
import AppContent from './AppContent'
import translations from './translations/'
import { ConfigProvider } from './config'
import { AuthProvider } from './Core/onboarding/hooks/useAuth'
import { ProfileAuthProvider } from './Core/profile/hooks/useProfileAuth'
import { authManager } from './Core/onboarding/api'
import InstamobileTheme from './theme'

const store = configureStore()

const App = () => {
  const theme = extendTheme(InstamobileTheme)

  useEffect(() => {
    LogBox.ignoreAllLogs(true)
  }, [])

  return (
    <Provider store={store}>
      <TranslationProvider translations={translations}>
        <DNProvider theme={theme}>
          <ConfigProvider>
            <AuthProvider authManager={authManager}>
              <ProfileAuthProvider authManager={authManager}>
                <AppContent />
              </ProfileAuthProvider>
            </AuthProvider>
          </ConfigProvider>
        </DNProvider>
      </TranslationProvider>
    </Provider>
  )
}

App.propTypes = {}

App.defaultProps = {}

AppRegistry.registerComponent('App', () => App)

export default App

import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { AppRegistry, LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { extendTheme, DNProvider, TranslationProvider } from 'dopenative'
import reduxStore from './redux/store'
import translations from './translations'
import AppContent from './AppContent'
import { authManager } from './Core/onboarding/api'
import InstamobileTheme from './theme'
import { ConfigProvider } from './config'
import { AuthProvider } from './Core/onboarding/hooks/useAuth'
import { ProfileAuthProvider } from './Core/profile/hooks/useProfileAuth'

const App = () => {
  const theme = extendTheme(InstamobileTheme)

  useEffect(() => {
    LogBox.ignoreAllLogs(true)
  }, [])

  return (
    <Provider store={reduxStore}>
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

AppRegistry.registerComponent('App', () => App)

export default App

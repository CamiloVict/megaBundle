/* https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { extendTheme, DNProvider, TranslationProvider } from 'dopenative'
import reduxStore from './redux/store'
import InstamobileTheme from './theme'
import translations from './translations'
import { ConfigProvider } from './config'
import AppContent from './AppContent'
import { AuthProvider } from './Core/onboarding/hooks/useAuth'
import { authManager } from './Core/onboarding/api'
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

export default App

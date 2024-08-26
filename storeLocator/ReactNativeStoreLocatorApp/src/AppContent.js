import React from 'react'
import { StatusBar } from 'react-native'
import { OnboardingConfigProvider } from './Core/onboarding/hooks/useOnboardingConfig'
import { useConfig } from './config'
import { ProfileConfigProvider } from './Core/profile/hooks/useProfileConfig'
import { AppNavigator } from './navigators/AppNavigation'
import { AdsConfigProvider } from './Core/ads/hooks/useAdsConfig'

export default AppContent = () => {
  const config = useConfig()

  return (
    <AdsConfigProvider config={config}>
      <ProfileConfigProvider config={config}>
        <OnboardingConfigProvider config={config}>
          <StatusBar />
          <AppNavigator />
        </OnboardingConfigProvider>
      </ProfileConfigProvider>
    </AdsConfigProvider>
  )
}

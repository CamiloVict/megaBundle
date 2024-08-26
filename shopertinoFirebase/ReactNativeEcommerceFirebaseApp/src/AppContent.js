import React from 'react'
import { StatusBar } from 'react-native'
import { StripeProvider } from '@stripe/stripe-react-native'
import { OnboardingConfigProvider } from './Core/onboarding/hooks/useOnboardingConfig'
import { AppNavigator } from './navigators/RootNavigator'
import { useConfig } from './config'

export default AppContent = () => {
  const config = useConfig()

  return (
    <OnboardingConfigProvider config={config}>
      <StripeProvider
        publishableKey={config.stripeConfig.PUBLISHABLE_KEY}
        merchantIdentifier={config.stripeConfig.MERCHANT_ID}>
        <StatusBar />
        <AppNavigator />
      </StripeProvider>
    </OnboardingConfigProvider>
  )
}

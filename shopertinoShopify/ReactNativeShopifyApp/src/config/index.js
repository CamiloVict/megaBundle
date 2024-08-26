import React, { useContext } from 'react'
import { useTheme, useTranslations } from 'dopenative'

const regexForNames = /^[a-zA-Z]{2,25}$/
const regexForPhoneNumber = /\d{9}$/
const regexForAge = /[0-9]/g

export const ConfigContext = React.createContext({})


export const shopifyConfig = {
  domain: 'iosapptemplates.myshopify.com',
  storefrontAccessToken: '3759cb72e4222c9b90332662fa39e93f',
  apiKey: 'a13b6696564ed7fdd3212491710a55f8',
  password: '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',
}

export const ConfigProvider = ({ children }) => {
  const { theme } = useTheme()
  const { localized } = useTranslations()
  const config = {
    isFirebasePushNotificationEnabled: false,
    isDelayedLoginEnabled: false,
    currency: '$',
    currencyCode: 'usd',
    appIdentifier: 'rn-social-network-android',
    facebookIdentifier: '285315185217069',
    webClientId:
      '525472070731-mg8m3q8v9vp1port7nkbq9le65hp917t.apps.googleusercontent.com',
    onboardingConfig: {
      welcomeTitle: localized('Welcome to your app'),
      welcomeCaption: localized(
        'Use this codebase to build your own ecommerce in minutes.',
      ),
      walkthroughScreens: [
        {
          icon: require('../assets/images/shopping-bag.png'),
          title: localized('Shopping Bag'),
          description: localized(
            'Add products to your shopping cart, and check them out later.',
          ),
        },
        {
          icon: require('../assets/images/quick-search.png'),
          title: localized('Quick Search'),
          description: localized(
            'Quickly find the products you like the most.',
          ),
        },
        {
          icon: require('../assets/images/wishlist.png'),
          title: localized('Wishlist'),
          description: localized(
            'Build a wishlist with your favourite products to buy them later.',
          ),
        },
        {
          icon: require('../assets/images/delivery.png'),
          title: localized('Order Tracking'),
          description: localized(
            'Monitor your orders and get updates when something changes.',
          ),
        },
        {
          icon: require('../assets/images/notification.png'),
          title: localized('Group Chats'),
          description: localized(
            'Get notifications for new products, promotions and discounts.',
          ),
        },
        {
          icon: require('../assets/images/payment.png'),
          title: localized('Stripe Payments'),
          description: localized(
            'We support all payment options, thanks to stripe.',
          ),
        },
        {
          icon:
            Platform.OS === 'ios'
              ? require('../assets/images/apple-pay.png')
              : require('../assets/images/google-pay.png'),
          title:
            Platform.OS === 'ios'
              ? localized('Apple Pay')
              : localized('Google Pay'),
          description:
            Platform.OS === 'ios'
              ? localized('Pay with a single click with Apple Pay.')
              : localized('Pay with a single click with Google Pay.'),
        },
      ],
    },
    tabIcons: {
      Feed: {
        focus: theme.icons.homefilled,
        unFocus: theme.icons.homeUnfilled,
      },
      Discover: {
        focus: theme.icons.search,
        unFocus: theme.icons.search,
      },
      Chat: {
        focus: theme.icons.commentFilled,
        unFocus: theme.icons.commentUnfilled,
      },
      Friends: {
        focus: theme.icons.friendsFilled,
        unFocus: theme.icons.friendsUnfilled,
      },
      Profile: {
        focus: theme.icons.profileFilled,
        unFocus: theme.icons.profileUnfilled,
      },
    },
    drawerMenuConfig: {
      upperMenu: [
        {
          title: localized('HOME'),
          icon: theme.icons.homeDrawer,
          navigationPath: 'Home',
        },
        {
          title: localized('SHOP'),
          icon: theme.icons.shopDrawer,
          navigationPath: 'Shop',
        },
        {
          title: localized('BAG'),
          icon: theme.icons.shoppingBagDrawer,
          navigationPath: 'ShoppingBag',
        },
        {
          title: localized('SEARCH'),
          icon: theme.icons.searchDrawer,
          navigationPath: 'Search',
        },
        {
          title: localized('ORDERS'),
          icon: theme.icons.orderDrawer,
          navigationPath: 'Order',
        },
        {
          title: localized('WISHLIST'),
          icon: theme.icons.wishlistDrawer,
          navigationPath: 'Wishlist',
        },
        {
          title: localized('PROFILE'),
          icon: theme.icons.profileDrawer,
          navigationPath: 'Profile',
        },
      ],
      lowerMenu: [
        {
          title: localized('LOGOUT'),
          icon: theme.icons.logoutDrawer,
          action: 'logout',
        },
      ],
    },
    tosLink: 'https://www.instamobile.io/eula-instachatty/',
    isUsernameFieldEnabled: false,
    smsSignupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
    ],
    signupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: localized('E-mail Address'),
        type: 'email-address',
        editable: true,
        regex: regexForNames,
        key: 'email',
        placeholder: 'E-mail Address',
        autoCapitalize: 'none',
      },
      {
        displayName: localized('Password'),
        type: 'default',
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: 'password',
        placeholder: 'Password',
        autoCapitalize: 'none',
      },
    ],
    editProfileFields: {
      sections: [
        {
          title: localized('PUBLIC PROFILE'),
          fields: [
            {
              displayName: localized('First Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'firstName',
              placeholder: 'Your first name',
            },
            {
              displayName: localized('Last Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'lastName',
              placeholder: 'Your last name',
            },
          ],
        },
        {
          title: localized('PRIVATE DETAILS'),
          fields: [
            {
              displayName: localized('E-mail Address'),
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'Your email address',
            },
            {
              displayName: localized('Phone Number'),
              type: 'text',
              editable: true,
              regex: regexForPhoneNumber,
              key: 'phone',
              placeholder: 'Your phone number',
            },
          ],
        },
      ],
    },
    userSettingsFields: {
      sections: [
        {
          title: localized('GENERAL'),
          fields: [
            {
              displayName: localized('Allow Push Notifications'),
              type: 'switch',
              editable: true,
              key: 'push_notifications_enabled',
              value: true,
            },
            {
              ...(Platform.OS === 'ios'
                ? {
                    displayName: localized('Enable Face ID / Touch ID'),
                    type: 'switch',
                    editable: true,
                    key: 'face_id_enabled',
                    value: false,
                  }
                : {}),
            },
          ],
        },
        {
          title: '',
          fields: [
            {
              displayName: localized('Save'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsFields: {
      sections: [
        {
          title: localized('CONTACT'),
          fields: [
            {
              displayName: localized('Address'),
              type: 'text',
              editable: false,
              key: 'push_notifications_enabled',
              value: '142 Steiner Street, San Francisco, CA, 94115',
            },
            {
              displayName: localized('E-mail us'),
              value: 'florian@instamobile.io',
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'Your email address',
            },
          ],
        },
        {
          title: '',
          fields: [
            {
              displayName: localized('Call Us'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsPhoneNumber: '+16504850000',
    serverSideEnv: {
      API: {
        baseURL: 'https://agile-retreat-80253.herokuapp.com/', //your copied heroku link
        timeout: 15000,
      },
    },
    stripeConfig: {
      PUBLISHABLE_KEY:
        'pk_test_51Ifl3jFrWOr9lMSK0AAR0DBI5veAeYhrpezBF0WrHB6GHTstLxBlu3SFQRaw2aAVlk0mMtgdpFtursJzFzcrxYXE002EjvLVn8', // "pk_test_..." in test mode and ""pk_live_..."" in live mode
      MERCHANT_ID: 'merchant.com.{{YOUR_APP_NAME}}',
      ANDROID_PAYMENT_MODE: 'test', // test || production
    },
    isStripeCheckoutEnabled: true,
    GOOGLE_SIGNIN_CONFIG: {
      SCOPES: ['https://www.googleapis.com/auth/drive.photos.readonly'],
      WEB_CLIENT_ID:
        '706061484183-l0l58dds4kg329fh1trbiha1ci5rqm5n.apps.googleusercontent.com', // from google-services.json file
      OFFLINE_ACCESS: true,
    },
    shopifyConfig: shopifyConfig,

  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigContext)

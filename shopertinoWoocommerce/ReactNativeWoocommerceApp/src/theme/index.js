import { Platform } from 'react-native'

const HORIZONTAL_SPACING_BASE = Platform.OS === 'web' ? 4 : 2
const VERTICAL_SPACING_BASE = 4

const icons = {
  shoppingBag: require('../assets/images/shopping-bag.png'),
  quickSearch: require('../assets/images/quick-search.png'),
  wishlist: require('../assets/images/wishlist.png'),
  delivery: require('../assets/images/delivery.png'),
  notification: require('../assets/images/notification.png'),
  payment: require('../assets/images/payment.png'),
  applePay: require('../assets/images/apple-pay.png'),
  googlePay: require('../assets/images/google-pay.png'),
  googlePayColored: require('../assets/images/google-pay-colored.png'),
  creditCard: require('../assets/images/credit-card.png'),
  box: require('../assets/images/box.png'),
  //
  logo: require('../assets/images/shopertino-logo.png'),
  userAvatar: require('../assets/icons/default-avatar.jpg'),
  homeDrawer: require('../assets/icons/home-drawer.png'),
  logoutDrawer: require('../assets/icons/logout-drawer.png'),
  orderDrawer: require('../assets/icons/order-drawer.png'),
  profileDrawer: require('../assets/icons/profile-drawer.png'),
  searchDrawer: require('../assets/icons/search-drawer.png'),
  shopDrawer: require('../assets/icons/shop-drawer.png'),
  shoppingBagDrawer: require('../assets/icons/shopping-bag-drawer.png'),
  wishlistDrawer: require('../assets/icons/wishlist-drawer.png'),
  menuHamburger: require('../assets/icons/menu-hamburger.png'),
  shoppingBagFilled: require('../assets/icons/shopping-bag-filled.png'),
  accountDetail: require('../assets/icons/account-detail.png'),
  settings: require('../assets/icons/settings.png'),
  contactUs: require('../assets/icons/contact-us.png'),
  rightArrow: require('../assets/icons/right-arrow.png'),
  wishlistFilled: require('../assets/icons/wishlist-filled.png'),
  wishlistUnFilled: require('../assets/icons/wishlist-unfilled.png'),
  arrowDown: require('../assets/icons/down-arrow.png'),
  share: require('../assets/icons/share.png'),
  simpleCheck: require('../assets/icons/simple-check.png'),
  appleFilled: require('../assets/icons/apple-filled.png'),
  add: require('../assets/icons/add.png'),
  minus: require('../assets/icons/minus.png'),
  creditCardIcon: require('../assets/icons/credit-card-icon.png'),
  tick: require('../assets/icons/tick.png'),
  plus: require('../assets/icons/plus.png'),
  visaPay: require('../assets/icons/visa.png'),
  americanExpress: require('../assets/icons/american-express.png'),
  dinersClub: require('../assets/icons/diners-club.png'),
  discover: require('../assets/icons/discover.png'),
  jcb: require('../assets/icons/jcb.png'),
  mastercard: require('../assets/icons/mastercard.png'),
  paypal: require('../assets/icons/paypal.png'),
  unionpay: require('../assets/icons/unionpay.png'),
  backArrow: require('../assets/icons/backArrow.png'),
  cashOnDelivery: require('../assets/icons/cod.png'),
}

const lightColors = {
  primaryBackground: '#ffffff',
  secondaryBackground: '#ffffff',
  primaryForeground: '#333333',
  secondaryForeground: '#f4f6fb',
  foregroundContrast: 'white',
  primaryText: '#464646',
  secondaryText: '#7e7e7e',
  hairline: '#e0e0e0',
  grey0: '#fafafa',
  grey3: '#f5f5f5',
  grey6: '#d6d6d6',
  grey9: '#939393',
  red: '#ea0606',
}

const lightNavBar = {
  backgroundColor: '#fff',
  fontColor: '#333333',
  activeTintColor: '#3875e8',
  inactiveTintColor: '#ccc',
  hairlineColor: '#e0e0e0',
  mainSubtextColor: '#999999',
}

const darkNavBar = {
  backgroundColor: '#121212',
  fontColor: '#fff',
  activeTintColor: '#3875e8',
  inactiveTintColor: '#888',
  hairlineColor: '#222222',
  mainSubtextColor: '#f5f5f5',
}

const InstamobileTheme = {
  colors: {
    light: lightColors,
    'no-preference': lightColors,
    dark: {
      primaryBackground: '#121212',
      secondaryBackground: '#000000',
      primaryForeground: '#333333',
      secondaryForeground: '#282828',
      foregroundContrast: 'white',
      primaryText: '#ffffff',
      secondaryText: '#c5c5c5',
      hairline: '#222222',
      grey0: '#0a0a0a',
      grey3: '#2a2a2a',
      grey6: '#f5f5f5',
      grey9: '#eaeaea',
      red: '#ea0606',
    },
  },
  navThemeConstants: {
    light: lightNavBar,
    dark: darkNavBar,
    'no-preference': lightNavBar,
    main: '#3875e8',
  },
  spaces: {
    horizontal: {
      s: 2 * HORIZONTAL_SPACING_BASE,
      m: 4 * HORIZONTAL_SPACING_BASE,
      l: 6 * HORIZONTAL_SPACING_BASE,
      xl: 8 * HORIZONTAL_SPACING_BASE,
    },
    vertical: {
      s: 2 * VERTICAL_SPACING_BASE,
      m: 4 * VERTICAL_SPACING_BASE,
      l: 6 * VERTICAL_SPACING_BASE,
      xl: 8 * VERTICAL_SPACING_BASE,
    },
  },
  fontSizes: {
    xxs: 8,
    xs: 12,
    s: 14,
    m: 16,
    l: 18,
    xl: 24,
    xxl: 32,
  },
  fontWeights: {
    s: '400',
    m: '600',
    l: '800',
  },
  icons: icons,
  // color, font size, space / margin / padding, vstack / hstack
  button: {
    borderRadius: 8,
  },
}

export default InstamobileTheme

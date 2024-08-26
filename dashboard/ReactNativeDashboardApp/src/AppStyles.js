import { Dimensions } from 'react-native'
import moment from 'moment'

const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

const _colorSet = {
  mainThemeBackgroundColor: 'white',
  mainThemeForegroundColor: '#3068CC',
  mainTextColor: '#464646',
  mainSubtextColor: '#b6b9bf',
  hairlineColor: '#d6d6d6',
  whiteColor: 'white',
  redColor: 'red',
  analyticsColor: '#5f65fc',
  analyticsLightColor: '#5f65fc30',
  customersColor: '#ff8a02',
  customersLightColor: '#ff8a0230',
  ordersColor: '#e090d7',
  ordersLightColor: '#e090d730',
  tasksColor: '#6fb168',
  tasksLightColor: '#6fb16830',
  salesColor: '#f8d246',
  salesLightColor: '#f8d24630',
  productsColor: '#bc6e7e',
  productsLightColor: '#bc6e7e30',
  taskNotStartedColor: '#f8d246',
  taskDoneColor: 'green',
}

const _fontSizeSet = {
  xxlarge: 40,
  xlarge: 30,
  large: 25,
  middle: 20,
  normal: 16,
  small: 13,
  xsmall: 11,
}

const _sizeSet = {
  buttonWidth: '70%',
  inputWidth: '80%',
  radius: 25,
}

const _iconSet = {
  home: require('./assets/icons/home.png'),
  bars: require('./assets/icons/bars.png'),
  bell: require('./assets/icons/bell.png'),
  feed: require('./assets/icons/feed.png'),
  logo: require('./assets/icons/logo.png'),
  orders: require('./assets/icons/orders.png'),
  analytics: require('./assets/icons/bars.png'),
  customers: require('./assets/icons/home.png'),
  tasks: require('./assets/icons/orders.png'),
  sales: require('./assets/icons/bell.png'),
  products: require('./assets/icons/feed.png'),
  logout: require('./assets/icons/logout.png'),
}

const _iconSizeSet = {
  large: 35,
  normal: 24,
  small: 20,
}

const _styleSet = {
  menuButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
}

const _functions = {
  timeFormat: timeStamp => {
    let time = ''
    if (timeStamp) {
      if (moment().diff(timeStamp, 'days') === 0) {
        time = moment(timeStamp).format('H:mm')
      } else {
        time = moment(timeStamp).fromNow()
      }
    }
    // time = postTime.toUTCString();
    return time
  },
}

const _chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  decimalPlaces: 0,
  paddingLeft: 0,
  color: () => `rgb(48, 104, 204)`,
}

const _dateRangeOptions = [
  { key: 'custom_range', label: 'Custom Range' },
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last_week', label: 'Last Week' },
  { key: 'this_month', label: 'This Month' },
  { key: 'last_month', label: 'Last Month' },
  { key: 'year_to_date', label: 'Year to Date' },
  { key: 'lifetime', label: 'Lifetime' },
]

const _fontSet = {
  regular: 'AppleSDGothicNeo-Regular',
  bold: 'AppleSDGothicNeo-Bold',
}

const StyleDict = {
  colorSet: _colorSet,
  iconSet: _iconSet,
  iconSizeSet: _iconSizeSet,
  sizeSet: _sizeSet,
  fontSizeSet: _fontSizeSet,
  styleSet: _styleSet,
  windowW: WINDOW_WIDTH,
  windowH: WINDOW_HEIGHT,
  utils: _functions,
  chartConfig: _chartConfig,
  dateRangeOptions: _dateRangeOptions,
  dateFormat: 'YYYY-MM-DD',
  fontSet: _fontSet,
}

export default StyleDict

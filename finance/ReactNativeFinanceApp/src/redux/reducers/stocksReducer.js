/* eslint-disable comma-dangle */
const stocksState = {
  stocksArray: [
    {
      id: 0,
      icon:
        'https://cfcdnpull-creativefreedoml.netdna-ssl.com/wp-content/uploads/2017/06/Twitter-featured.png',
      title: 'Twitter',
      text: 'TWTR',
      procent: '0.25',
      watchList: true,
      position: {
        shares: '5.0',
        equity: '$955.00',
        avgCost: '171.46',
        portfolioDiversivity: '7.2%',
        todayReturn: '-$20.45(-2.10%)',
        totalReturn: '+$920.45(+22.10%)'
      },
      stats: {
        open: '195.30',
        high: '197.69',
        volume: '19.49M',
        avgVol: '32.65M',
        low: '790.75',
        wkHigh: '233.47',
        peRatio: '15.71',
        MKTCAP: '903.6B'
      }
    },
    {
      id: 1,
      icon: 'https://images-na.ssl-images-amazon.com/images/I/21-leKb-zsL._SY355_.png',
      title: 'Facebook',
      text: 'FB',
      procent: '2.4',
      watchList: false,
      position: {
        shares: '5.0',
        equity: '$955.00',
        avgCost: '171.46',
        portfolioDiversivity: '7.2%',
        todayReturn: '-$20.45(-2.10%)',
        totalReturn: '+$920.45(+22.10%)'
      },
      stats: {
        open: '195.30',
        high: '197.69',
        volume: '19.49M',
        avgVol: '32.65M',
        low: '790.75',
        wkHigh: '233.47',
        peRatio: '15.71',
        MKTCAP: '903.6B'
      }
    },
    {
      id: 2,
      icon: 'https://pbs.twimg.com/profile_images/1089957236221329409/rsMZ82D3_400x400.jpg',
      title: 'Netflix',
      text: 'NFLX',
      procent: '1.43',
      watchList: false,
      position: {
        shares: '5.0',
        equity: '$955.00',
        avgCost: '171.46',
        portfolioDiversivity: '7.2%',
        todayReturn: '-$20.45(-2.10%)',
        totalReturn: '+$920.45(+22.10%)'
      },
      stats: {
        open: '195.30',
        high: '197.69',
        volume: '19.49M',
        avgVol: '32.65M',
        low: '790.75',
        wkHigh: '233.47',
        peRatio: '15.71',
        MKTCAP: '903.6B'
      }
    },
    {
      id: 3,
      icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png',
      title: 'Google',
      text: 'GOOG',
      procent: '2.75',
      watchList: false,
      position: {
        shares: '5.0',
        equity: '$955.00',
        avgCost: '171.46',
        portfolioDiversivity: '7.2%',
        todayReturn: '-$20.45(-2.10%)',
        totalReturn: '+$920.45(+22.10%)'
      },
      stats: {
        open: '195.30',
        high: '197.69',
        volume: '19.49M',
        avgVol: '32.65M',
        low: '790.75',
        wkHigh: '233.47',
        peRatio: '15.71',
        MKTCAP: '903.6B'
      }
    },
    {
      id: 4,
      icon: 'https://www.fineprintart.com/images/blog/amazon-logo/amazon_logo_history_5.jpg',
      title: 'Amazon',
      text: 'AMZN',
      procent: '0.25',
      watchList: false,
      position: {
        shares: '5.0',
        equity: '$955.00',
        avgCost: '171.46',
        portfolioDiversivity: '7.2%',
        todayReturn: '-$20.45(-2.10%)',
        totalReturn: '+$920.45(+22.10%)'
      },
      stats: {
        open: '195.30',
        high: '197.69',
        volume: '19.49M',
        avgVol: '32.65M',
        low: '790.75',
        wkHigh: '233.47',
        peRatio: '15.71',
        MKTCAP: '903.6B'
      }
    }
  ]
};

export const stocksReducer = (state = stocksState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'CHANGE_WATCHLIST_STOCK': {
      newState.stocksArray[action.id].watchList = !newState.stocksArray[action.id].watchList;
      break;
    }
    default:
      return newState;
  }
  return newState;
};

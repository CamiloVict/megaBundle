/* eslint-disable comma-dangle */
const cryptoState = {
  cryptoArray: [
    {
      id: 0,
      icon: 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png',
      title: 'Bitcoin',
      text: 'BTC',
      procent: '5.25',
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
      icon:
        'https://yt3.ggpht.com/a-/AAuE7mAn0bQ1H-wrEoxpkz03RNleGHvt0EmcSx4O4w=s288-mo-c-c0xffffffff-rj-k-no',
      title: 'Ethereum',
      text: 'ETH',
      procent: '2.65',
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
      icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Litecoin_Logo.jpg/600px-Litecoin_Logo.jpg',
      title: 'Litecoin',
      text: 'LTC',
      procent: '7.95',
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
        'https://cfcdnpull-creativefreedoml.netdna-ssl.com/wp-content/uploads/2017/06/Twitter-featured.png',
      title: 'Bitcoin Cash',
      text: 'BCH',
      procent: '0.43',
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

export const cryptoReducer = (state = cryptoState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'CHANGE_WATCHLIST_CRYPTO': {
      newState.cryptoArray[action.id].watchList = !newState.cryptoArray[action.id].watchList;
      break;
    }
    default:
      return newState;
  }
  return newState;
};

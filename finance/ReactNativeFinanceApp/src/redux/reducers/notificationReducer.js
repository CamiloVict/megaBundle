/* eslint-disable comma-dangle */
const notificationState = {
  notifications: [
    {
      id: 0,
      icon: 'http://simpleicon.com/wp-content/uploads/Calendar-Time.png',
      title: 'TRANSACTIONS',
      text: 'You paid $25 with your BofA credit card for Safeway',
      date: '12 hours ago',
      read: true
    },
    {
      id: 1,
      icon: 'http://simpleicon.com/wp-content/uploads/coin-money-9.png',
      title: 'SALARY RECEIVED',
      text: 'You received $5,250 salary from your employer',
      date: 'one day ago',
      read: false
    },
    {
      id: 2,
      icon: 'https://png.pngtree.com/svg/20160811/achievement_1181467.png',
      title: 'PORTFOLIO MILESTONE',
      text: 'Congratulations! Your net worth just surpassed $10,000!',
      date: 'one daya ago',
      read: false
    },
    {
      id: 3,
      icon: 'http://simpleicon.com/wp-content/uploads/comment.png',
      title: 'DIVIDEND RECEIVED',
      text: 'You received a dividend in the amount of $27.23 (from XLE)',
      date: 'one day ago',
      read: true
    },
    {
      id: 4,
      icon: 'http://simpleicon.com/wp-content/uploads/user-2.png',
      title: 'SHARES BOUGHT',
      text: 'You have just bought 53 shares of $NFLX for $4,023',
      date: 'one day ago',
      read: true
    },
    {
      id: 5,
      icon: 'http://simpleicon.com/wp-content/uploads/money-8.png',
      title: 'DEPOSIT',
      text: 'Congratulations! Your net worth just surpassed $10,000!',
      date: '2 days ago',
      read: true
    }
  ]
};

export const notificationReducer = (state = notificationState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'UPDATE_NOTIFICATIONS': {
      newState.notifications.map(data => {
        if (data.id == action.id) {
          data.read = true;
        }
      });
      break;
    }
    default:
      return newState;
  }

  return newState;
};

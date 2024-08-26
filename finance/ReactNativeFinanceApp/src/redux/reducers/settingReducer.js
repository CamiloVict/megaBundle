/* eslint-disable comma-dangle */
const settingState = {
  settings: [
    {
      id: 0,
      title: 'Allow Push Notification',
      name: 'pushNotification',
      switch: false
    },
    {
      id: 1,
      title: 'Notify on any transactions',
      name: 'transactions',
      switch: false
    },
    {
      id: 2,
      title: 'Breaking news notifications',
      name: 'transactions',
      switch: false
    },
    {
      id: 3,
      title: 'Net worth milestones',
      name: 'milestones',
      switch: false
    },
    {
      id: 4,
      title: 'Allow Location Access',
      name: 'locationAccess',
      switch: false
    },
    {
      id: 5,
      title: 'Stocks drops of 5%',
      name: 'stocksDrops',
      switch: false
    },
    {
      id: 6,
      title: 'Stocks increases of 5%',
      name: 'stocksIncreases',
      switch: false
    },
    {
      id: 7,
      title: 'Crypto drops of 5%',
      name: 'cryptoDrop',
      switch: false
    },
    {
      id: 8,
      title: 'Crypto increases of 5%',
      name: 'cryptoIncreses',
      switch: false
    }
  ]
};

export const settingReducer = (state = settingState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'UPDATE_SETTINGS': {
      newState.settings.map(data => {
        if (data.id == action.id) {
          data.switch = !data.switch;
        }
      });
      break;
    }
    default:
      return newState;
  }

  return newState;
};

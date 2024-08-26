/* eslint-disable comma-dangle */
const userState = {
  userFirstName: 'Adrian',
  userLastName: 'Smith',
  userEmail: '',
  userPassword: '',
  userGender: ''
};

export const userReducer = (state = userState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'CHANGE_NAME': {
      alert('ceva');
      break;
    }
    default:
      return newState;
  }

  return newState;
};

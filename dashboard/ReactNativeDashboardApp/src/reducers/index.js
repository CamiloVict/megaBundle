import { combineReducers } from 'redux'
// import Api from "../Api";

const initialAuthState = { isLoggedIn: false }

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true, user: action.user }
    case 'Logout':
      return { ...state, isLoggedIn: false, user: {} }
    default:
      return state
  }
}

const AppReducer = combineReducers({
  auth,
})

export default AppReducer

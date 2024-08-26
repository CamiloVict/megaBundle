/* eslint-disable comma-dangle */
import { combineReducers } from 'redux';
import { bankReducer as bank } from './bankReducer';
import { userReducer as user } from './userReducer';
import { notificationReducer as notification } from './notificationReducer';
import { settingReducer as setting } from './settingReducer';
import { stocksReducer as stocks } from './stocksReducer';
import { cryptoReducer as crypto } from './cryptoReducer';

export const rootReducer = combineReducers({
  bank,
  user,
  notification,
  setting,
  stocks,
  crypto
});

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducerFactory from '../auth/authReducer';
import comment from '../comments/commentReducer';
import menu from '../menu/menuReducer';
import rte from '../rte/rteReducer';
import ticket from '../tickets/ticketReducer';

const rootReducer = combineReducers({
  auth: authReducerFactory(window.localStorage),
  comment,
  form,
  menu,
  routing: routerReducer,
  rte,
  ticket
});

export default rootReducer;

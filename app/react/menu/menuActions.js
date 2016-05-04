import { createAction } from 'redux-actions';
import { request } from '../app/factories/createRequestActionTypes';

export const menuActionTypes = {
  hide: request('HIDE_MENU'),
  show: request('SHOW_MENU')
};

export default {
  hide: {
    request: createAction(menuActionTypes.hide.REQUEST)
  },
  show: {
    request: createAction(menuActionTypes.show.REQUEST)
  }
};

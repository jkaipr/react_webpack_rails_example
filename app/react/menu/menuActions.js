import { createAction } from 'redux-actions';
import createRequestActionTypes from '../app/factories/createRequestActionTypes';

export const menuActionTypes = {
  hide: createRequestActionTypes('HIDE_MENU')
};

export default {
  hide: {
    request: createAction(menuActionTypes.hide.REQUEST),
    success: createAction(menuActionTypes.hide.SUCCESS),
    failure: createAction(menuActionTypes.hide.FAILURE)
  }
};

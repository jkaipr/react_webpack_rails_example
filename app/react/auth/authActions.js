import { createAction } from 'redux-actions';
import createRequestActionTypes from '../app/factories/createRequestActionTypes';

export const authActionTypes = {
  login: createRequestActionTypes('LOGIN'),
  logout: createRequestActionTypes('LOGOUT'),
  refreshToken: createRequestActionTypes('REFRESH_TOKEN')
};

export default {
  login: {
    request: createAction(authActionTypes.login.REQUEST, (previousRoute, credentials) => ({
      previousRoute,
      ...credentials
    })),
    success: createAction(authActionTypes.login.SUCCESS),
    failure: createAction(authActionTypes.login.FAILURE)
  },
  logout: {
    request: createAction(authActionTypes.logout.REQUEST),
    success: createAction(authActionTypes.logout.SUCCESS),
    failure: createAction(authActionTypes.logout.FAILURE)
  },
  refreshToken: {
    request: createAction(authActionTypes.refreshToken.REQUEST),
    success: createAction(authActionTypes.refreshToken.SUCCESS),
    failure: createAction(authActionTypes.refreshToken.FAILURE)
  }
};

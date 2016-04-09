import { authActionTypes } from './authActions';

export default (localStorage) => {
  const initialState = {
    id: localStorage.getItem('id'),
    email: localStorage.getItem('email'),
    admin: localStorage.getItem('admin'),
    token: localStorage.getItem('token'),
    expires: localStorage.getItem('expires'),
    authenticated: !!localStorage.getItem('token') &&
      localStorage.getItem('expires') > (new Date()).getTime(),
    loading: false
  };

  return (state = initialState, { type, payload }) => {
    switch (type) {
      case authActionTypes.login.REQUEST:
        return {
          ...state,
          admin: false,
          authenticated: false,
          error: false,
          loading: true
        };

      case authActionTypes.login.SUCCESS:
        return {
          ...state,
          ...payload,
          expires: payload.expires * 1000,
          authenticated: true,
          error: false,
          loading: false
        };

      case authActionTypes.login.FAILURE:
        return {
          ...state,
          admin: false,
          authenticated: false,
          email: null,
          error: payload,
          id: null,
          loading: false,
          token: null,
          expires: null
        };

      case authActionTypes.logout.SUCCESS:
        return {
          ...state,
          admin: false,
          authenticated: false,
          email: null,
          id: null,
          loading: false,
          token: null,
          expires: null
        };
      default:
        return state;
    }
  };
};

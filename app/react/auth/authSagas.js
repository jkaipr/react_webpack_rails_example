import { routerActions } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { decodeJwtPayload } from './authUtils';

import {
  fetchLogin as fetchLoginApi,
  removeLocalUser as removeLocalUserApi,
  storeLocalUser as storeLocalUserApi
} from './authApi';
import authActions, { authActionTypes } from './authActions';

export const login = (fetchLogin, storeLocalUser) => function* loginSaga({
  payload: { email, password, previousRoute }
  }) {
  const { error, jwt } = yield call(fetchLogin, email, password);
  if (error) {
    console.log('error', error);
    yield put(authActions.login.failure(error));
  } else {
    console.log('jwt', jwt);
    const decodedJwtPayload = decodeJwtPayload(jwt);
    const user = {
      id: decodedJwtPayload.sub,
      admin: decodedJwtPayload.admin,
      email: decodedJwtPayload.email,
      token: jwt,
      expires: decodedJwtPayload.exp
    };
    yield call(storeLocalUser, user);
    yield put(authActions.login.success(user));
    yield put(routerActions.push(previousRoute));
  }
};

export const logout = removeLocalUser => function* signOutSaga() {
  yield call(removeLocalUser);
  yield put(authActions.logout.success());
  yield put(routerActions.push('/tickets'));
};

const sagas = function* sagas() {
  yield [
    takeLatest(authActionTypes.login.REQUEST, login(fetchLoginApi, storeLocalUserApi)),
    takeLatest(authActionTypes.logout.REQUEST, logout(removeLocalUserApi))
  ];
};

export default sagas;

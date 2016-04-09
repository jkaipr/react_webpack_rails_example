import 'babel-polyfill';

import { routerActions } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';

import {
  login as loginSagaFactory,
  logout as logoutSagaFactory
} from './authSagas';
import authActions from './authActions';

describe('authSagas', () => {
  describe('login', () => {
    const testEmail = 'test_email';
    const testPassword = 'test_password';
    const jwt = { jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiam9obi5kb2VAYWNtZS5jb20iLCJhZG1pbiI6dHJ1ZSwiZXhwIjoxNDYwMTE1MDk0NjM2fQ.5i_ngAvgTLjC57e6ZUUHB8iMxoG5xwWvc-t1wO7dzRw' };  // eslint-disable-line max-len
    const auth = {
      id: 1,
      admin: true,
      email: 'john.doe@acme.com',
      token: jwt.jwt,
      expires: 1460115094636
    };
    const storeLocalUser = sinon.spy();
    const fetchLogin = sinon.spy();

    const loginSaga = loginSagaFactory(fetchLogin, storeLocalUser);

    it('should call the fetchLogin function after a login action', () => {
      const saga = loginSaga(authActions.login.request('/next-route', {
        email: testEmail,
        password: testPassword
      }));

      expect(saga.next().value).to
        .deep.equal(call(fetchLogin, testEmail, testPassword));
    });

    it('should call the storeLocalUser function after a successful login', () => {
      const saga = loginSaga(authActions.login.request('/next-route', {
        email: testEmail,
        password: testPassword
      }));


      saga.next();

      expect(saga.next(jwt).value).to
        .deep.equal(call(storeLocalUser, auth));
    });

    it('should put the logged in action after a successful login', () => {
      const saga = loginSaga(authActions.login.request('/next-route', {
        email: testEmail,
        password: testPassword
      }));

      saga.next();

      saga.next(jwt);

      const nextValue = saga.next().value;
      const putLoginAcion = put(authActions.login.success(auth));
      expect(nextValue).to.deep.equal(putLoginAcion);
    });

    it('should put the routerActions.push action after a successful login', () => {
      const saga = loginSaga(authActions.login.request('/next-route', {
        email: testEmail,
        password: testPassword
      }));

      saga.next();

      saga.next(jwt);

      saga.next();

      expect(saga.next().value).to.deep.equal(put(routerActions.push('/next-route')));
    });

    it('should put the login action with error after a failed login', () => {
      const saga = loginSaga(authActions.login.request('/next-route', {
        email: testEmail,
        password: testPassword
      }));
      const error = new Error('It broke!');

      saga.next();
      expect(saga.next({
        error
      }).value).to.deep.equal(put(authActions.login.failure(error)));
    });
  });

  describe('logout', () => {
    const removeLocalUser = sinon.spy();
    const logoutSaga = logoutSagaFactory(removeLocalUser);

    it('should call the removeLocalUser function', () => {
      const saga = logoutSaga(authActions.logout.request());

      expect(saga.next().value).to.deep.equal(call(removeLocalUser));
    });

    it('should put the logout action', () => {
      const saga = logoutSaga(authActions.logout.request());

      saga.next();

      expect(saga.next().value).to.deep.equal(put(authActions.logout.success()));
    });

    it('should put the routerActions.push action', () => {
      const saga = logoutSaga(authActions.logout.request());

      saga.next();
      saga.next();

      expect(saga.next().value).to.deep.equal(put(routerActions.push('/tickets')));
    });
  });
});

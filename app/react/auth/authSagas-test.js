import 'babel-polyfill';

import { routerActions } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';

import {
  login as loginSagaFactory,
  logout as logoutSagaFactory
} from './authSagas';
import authActions from './authActions';

describe('userSagas', () => {
  describe('login', () => {
    const fetchSignIn = sinon.spy();
    const storeLocalUser = sinon.spy();
    const loginSaga = loginSagaFactory(fetchSignIn, storeLocalUser);

    it('should call the fetchSignIn function after a SIGN_IN action', () => {
      const saga = loginSaga(authActions.login.request('/next-route', {
        email: 'test_email',
        password: 'test_password'
      }));

      expect(saga.next().value).to
        .deep.equal(call(fetchSignIn, 'test_email', 'test_password'));
    });

    it('should call the storeLocalUser function after a successful login', () => {
      const saga = loginSaga(authActions.login.request('/next-route', {
        email: 'test_email',
        password: 'test_password'
      }));

      saga.next();

      expect(saga.next({ user: { id: 'foo' } }).value).to
        .deep.equal(call(storeLocalUser, { id: 'foo' }));
    });

    it('should put the logged in action after a successful login', () => {
      const saga = loginSaga(authActions.login.request('/next-route', {
        email: 'test_email',
        password: 'test_password'
      }));

      saga.next();

      saga.next({
        user: { id: 'foo' }
      });

      expect(saga.next().value).to.deep.equal(put(authActions.login.success({ id: 'foo' })));
    });

    it('should put the routerActions.push action after a successful login', () => {
      const saga = loginSaga(authActions.login.request('/next-route', {
        email: 'test_email',
        password: 'test_password'
      }));

      saga.next();

      saga.next({
        user: { id: 'foo' }
      });

      saga.next();

      expect(saga.next().value).to.deep.equal(put(routerActions.push('/next-route')));
    });

    it('should put the login action with error after a failed login', () => {
      const saga = loginSaga(authActions.login.request('/next-route', {
        email: 'test_email',
        password: 'test_password'
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

    it('should put the signedOut action', () => {
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

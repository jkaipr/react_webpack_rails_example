import authActions, { authActionTypes } from './authActions';

describe('userActions', () => {
  it('login.request should return the correct action', () => {
    const loginRequestAction = authActions.login.request('/route', { email: 'test_email', password: 'test_password' }); // eslint-disable-line max-len

    expect(loginRequestAction).to.deep.equal({
      type: authActionTypes.login.REQUEST,
      payload: {
        previousRoute: '/route',
        email: 'test_email',
        password: 'test_password'
      }
    });
  });

  it('login.success should return the correct action', () => {
    expect(authActions.login.success({ id: 'id_test', email: 'test_email', token: 'test_token' })).to.deep.equal({ // eslint-disable-line max-len
      type: authActionTypes.login.SUCCESS,
      payload: { id: 'id_test', email: 'test_email', token: 'test_token' }
    });
  });

  it('login.failure should return the correct action', () => {
    const error = new Error('Run you fools !');

    expect(authActions.login.failure(error)).to.deep.equal({
      type: authActionTypes.login.FAILURE,
      payload: error,
      error: true
    });
  });

  it('logout.request should return the correct action', () => {
    expect(authActions.logout.request()).to.deep.equal({
      type: authActionTypes.logout.REQUEST,
      payload: undefined
    });
  });

  it('logout.success should return the correct action', () => {
    expect(authActions.logout.success()).to.deep.equal({
      type: authActionTypes.logout.SUCCESS,
      payload: undefined
    });
  });
});

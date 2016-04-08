import reducerFactory from './authReducer';
import authActions from './authActions';

describe('auth reducer', () => {
  const getItemWithAuth = sinon.stub();
  const expireTokenTime = (new Date()).getTime() + 30 * 1000;
  getItemWithAuth.withArgs('id').returns(1);
  getItemWithAuth.withArgs('admin').returns(true);
  getItemWithAuth.withArgs('email').returns('john.doe@acme.com');
  getItemWithAuth.withArgs('token').returns('bar');
  getItemWithAuth.withArgs('expires').returns(expireTokenTime);

  const localStorageWithAuth = {
    getItem: getItemWithAuth
  };

  it('should return the auth saved in localStorage as its initial state', () => {
    const reducer = reducerFactory(localStorageWithAuth);
    const reducerInitState = reducer(undefined, { type: 1 });
    expect(reducerInitState).to.deep.equal({
      id: 1,
      authenticated: true,
      admin: true,
      email: 'john.doe@acme.com',
      loading: false,
      token: 'bar',
      expires: expireTokenTime
    });
  });

  it('should handle the login.success action', () => {
    const getItem = sinon.stub().returns(undefined);
    const localStorage = {
      getItem
    };
    const reducer = reducerFactory(localStorage);
    const jwt = { jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiam9obi5kb2VAYWNtZS5jb20iLCJhZG1pbiI6dHJ1ZSwiZXhwIjoxNDYwMTE1MDk0NjM2fQ.5i_ngAvgTLjC57e6ZUUHB8iMxoG5xwWvc-t1wO7dzRw' };  // eslint-disable-line max-len

    const reducerResult = reducer(undefined, authActions.login.success(jwt));
    console.log(reducerResult);
    expect(reducerResult).to.deep.equal({
      authenticated: true,
      admin: true,
      error: false,
      id: 1,
      email: 'john.doe@acme.com',
      loading: false,
      token: jwt.jwt,
      expires: 1460115094636
    });
  });

  it('should handle the login.failure action', () => {
    const getItem = sinon.stub().returns(undefined);
    const localStorage = {
      getItem
    };
    const reducer = reducerFactory(localStorage);
    const error = new Error('It broke!');
    expect(reducer(undefined, authActions.login.failure(error))).to.deep.equal({
      id: null,
      admin: false,
      email: null,
      token: null,
      expires: null,
      authenticated: false,
      loading: false,
      error
    });
  });

  it('should handle the logout.success action', () => {
    const reducer = reducerFactory(localStorageWithAuth);

    expect(reducer(undefined, authActions.logout.success())).to.deep.equal({
      admin: false,
      authenticated: false,
      id: null,
      email: null,
      loading: false,
      token: null,
      expires: null
    });
  });
});

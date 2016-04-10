export default (store) => (nextState, replace) => {
  const { auth: { authenticated } } = store.getState();

  if (!authenticated) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

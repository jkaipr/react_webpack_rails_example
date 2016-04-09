import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import DevTools from './DevTools';
import routesFactory from './routes';

const Root = ({ store }) => {
  const history = syncHistoryWithStore(hashHistory, store);
  const routes = routesFactory(store);

  if (ENABLE_DEV_TOOLS) { // eslint-disable-line no-undef
    return (
      <Provider {...{ store }}>
        <div style={{ height: '100%' }}>
          <Router {...{ history, routes }} />
          <DevTools />
        </div>
      </Provider>
    );
  }

  return (
    <Provider {...{ store }}>
      <Router {...{ history, routes }} />
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;

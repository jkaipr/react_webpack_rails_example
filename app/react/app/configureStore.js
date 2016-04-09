import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import DevTools from './DevTools';
import sagas from './sagas';

export default function configureStore(initialState, rootReducer) {
  let enhancers = [
    applyMiddleware(
      createSagaMiddleware(sagas),
      routerMiddleware(hashHistory),
      thunkMiddleware
    )
  ];

  if (ENABLE_DEV_TOOLS) { // eslint-disable-line no-undef
    enhancers = [
      ...enhancers,
      DevTools.instrument()
    ];
  }

  return createStore(rootReducer, initialState, compose(...enhancers));
}

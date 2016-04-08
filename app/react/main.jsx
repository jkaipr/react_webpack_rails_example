import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

require('./app/css/main.scss');

import Root from './app/Root';
import rootReducer from './app/reducers';
import configureStore from './app/configureStore';

const store = configureStore({}, rootReducer);

render(
  <Root {...{ store }} />,
  document.getElementById('root')
);

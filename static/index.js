import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './scripts/router';

import './style/index.less';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './scripts/reducers';

const store = createStore(rootReducer);

const element = document.createElement('div');
document.body.appendChild(element);

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>, 
  element
);

module.hot.accept();

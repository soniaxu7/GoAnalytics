// import React
import React from 'react';
import ReactDOM from 'react-dom';

// import React Router module
import AppRouter from './scripts/router';

// import all the styles
import './style/index.less';

// import Redux related
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './scripts/reducers';

// create a global store
const store = createStore(rootReducer);

// create a div DOM and append to the HTML
const element = document.createElement('div');
document.body.appendChild(element);

// create a global React Module and append to DOM
ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  element
);

// allow update code in browser in real time when developing
module.hot.accept();

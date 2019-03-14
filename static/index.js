import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './scripts/router';

import './style/index.less';

let element = document.createElement('div');
document.body.appendChild(element);

ReactDOM.render(<AppRouter />, element);

module.hot.accept();

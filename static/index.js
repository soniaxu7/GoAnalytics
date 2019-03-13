import React from 'react';
import ReactDOM from 'react-dom';
import Main from './scripts/main';

import './style/index.less';

let element = document.createElement('div');
document.body.appendChild(element);

ReactDOM.render(<Main />, element);

module.hot.accept();

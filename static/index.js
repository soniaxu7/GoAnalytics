import Button from 'react-bootstrap/Button';

function component() {
  let element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = 'hi index.js';

  return element;
}

document.body.appendChild(component());

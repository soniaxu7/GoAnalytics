import React from 'react';
import Header from './components/header';
import { Button } from 'react-bootstrap';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Button size="sm">Add Dataset</Button>
      </div>
    );
  }
}

export default Main;

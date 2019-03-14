import React from 'react';
import Header from './components/header';
import Menu from './components/menu';
import Page from './components/page';

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <Header />
        <div className="main-content">
          <div className="main-left"><Menu items={['Hello_world']} /></div>
          <div className="main-right"><Page /></div>
        </div>
      </div>
    );
  }
}

export default Main;

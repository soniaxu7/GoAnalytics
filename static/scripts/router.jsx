import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Header, Menu, Page, Upload } from './components/index';

function AppRouter() {
  return (
    <Router>
      <div className="main">
        <Header />
        <div className="main-content">
          <div className="main-left"><Menu items={['Hello_world']} /></div>
          <div className="main-right">
            <Route exact path="/" render={() => (<Redirect to="/upload"/>)} />
            <Route path="/upload" component={Upload} />
            <Route path="/p/:name" component={Page} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default AppRouter;

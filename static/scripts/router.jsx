import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Header, Menu, Page, Upload, Viz } from './components/index';
import { connect } from 'react-redux'

const AppRouter = ({ lists }) => {
  return (
    <Router>
      <div className="main">
        <Header />
        <div className="main-content">
          <div className="main-left"><Menu items={lists} /></div>
          <div className="main-right">
            <Route exact path="/" render={() => (<Redirect to="/upload"/>)} />
            <Route path="/upload" component={Upload} />
            <Route path="/viz" component={Viz} />
            <Route path="/p/:name" component={Page} />
          </div>
        </div>
      </div>
    </Router>
  );
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(
  mapStateToProps
)(AppRouter)


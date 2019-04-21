/*
* Global router => React Router: https://reacttraining.com/react-router/web/guides/quick-start
*/
import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { Header, Menu, Page, Upload} from './components/index';
import { connect } from 'react-redux';

// lists is list of names of the dataset
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
            <Route path="/p/:name" component={Page} />
          </div>
        </div>
      </div>
    </Router>
  );
}

// define local state as global state
const mapStateToProps = state => ({
  lists: state.lists
})

// link global state to this whole application
export default connect(
  mapStateToProps
)(AppRouter)


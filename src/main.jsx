import React from 'react';
import Dashboard from './components/dashboard';
import NewSession from './components/new-session';
import Session from './session';
import { connect } from 'react-redux';
import { DASHBOARD, NEW_SESSION, SESSION } from './types/common';

const Main = ({ screen }) => {
  switch(screen) {
  case DASHBOARD:
    return <Dashboard />
  case NEW_SESSION:
    return <NewSession />
  case SESSION:
    return <Session />
  default:
    throw 'undefined screen';
  }
};

const mapStateToProps = (state) => ({
  screen: state.screen
});

export default connect(mapStateToProps)(Main);

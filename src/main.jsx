import React from 'react';
import Dashboard from 'components/dashboard';
import NewSession from 'components/new-session';
import Session from 'components/session';
import { connect } from 'react-redux';
import { DASHBOARD, NEW_SESSION, SESSION } from 'types/common';

const Main = ({ screen }) => {
  switch(screen) {
  case DASHBOARD:
    return <div className='dashboard-root'><Dashboard /></div>
  case NEW_SESSION:
    return <div className='new-session-root'><NewSession /></div>
  case SESSION:
    return <div className='session-root'><Session /></div>
  default:
    throw 'undefined screen';
  }
};

const mapStateToProps = (state) => ({
  screen: state.screen
});

export default connect(mapStateToProps)(Main);

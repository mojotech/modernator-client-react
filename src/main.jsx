import React from 'react';
import Dashboard from 'components/dashboard';
import NewSession from 'components/new-session';
import Session from 'components/session';
import SignIn from 'components/authentication/sign-in';
import SignUp from 'components/authentication/sign-up';
import { connect } from 'react-redux';
import { Fragment } from 'redux-little-router';
import { dashboard, newSession, session, signIn, signUp } from 'lib/routes';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
require('styles/loading.less');

const Loader = () => (
  <div className='loading'>
    <div className='loader-top'>
      <div className='heading'>
        <div className='empty' />
        <h1 className='h1'>Modernator</h1>
      </div>
    </div>
    <div className='loader-bottom' />
  </div>
);

const Main = ({ isLoading }) => {
  return (
    <Fragment forRoute='/'>
      <div>
        <CSSTransitionGroup
          transitionName='loading'
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
          >
          {isLoading && <Loader key='big-loader' />}
        </CSSTransitionGroup>
        <Fragment forRoute={signIn()}><div className='authentication-root'><SignIn /></div></Fragment>
        <Fragment forRoute={signUp()}><div className='authentication-root'><SignUp /></div></Fragment>
        <Fragment forRoute={dashboard()}><div className='dashboard-root'><Dashboard /></div></Fragment>
        <Fragment forRoute={newSession()}><div className='new-session-root'><NewSession /></div></Fragment>
        <Fragment forRoute={session()}><div className='session-root'><Session /></div></Fragment>
      </div>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    isLoading: state.user.isLoading || !state.initialized
  };
};

export default connect(mapStateToProps)(Main);

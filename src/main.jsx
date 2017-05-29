import React from 'react';
import Dashboard from 'components/dashboard';
import NewSession from 'components/new-session';
import Session from 'components/session';
import SignIn from 'components/authentication/sign-in';
import SignUp from 'components/authentication/sign-up';
import { connect } from 'react-redux';
import { Fragment } from 'redux-little-router';
import { dashboard, newSession, session, signIn, signUp } from 'lib/routes';

const Main = () => {
  return (
    <Fragment forRoute='/'>
      <div>
        <Fragment forRoute={signIn()}><div className='authentication-root'><SignIn /></div></Fragment>
        <Fragment forRoute={signUp()}><div className='authentication-root'><SignUp /></div></Fragment>
        <Fragment forRoute={dashboard()}><div className='dashboard-root'><Dashboard /></div></Fragment>
        <Fragment forRoute={newSession()}><div className='new-session-root'><NewSession /></div></Fragment>
        <Fragment forRoute={session()}><div className='session-root'><Session /></div></Fragment>
      </div>
    </Fragment>
  );
};

export default Main;

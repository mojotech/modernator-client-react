import React from 'react';
import Dashboard from 'components/dashboard';
import NewSession from 'components/new-session';
import Session from 'components/session';
import { connect } from 'react-redux';
import { Fragment } from 'redux-little-router';

const Main = () => {
  return (
    <Fragment forRoute='/'>
      <div>
        <Fragment forRoute='/'><div className='dashboard-root'><Dashboard /></div></Fragment>
        <Fragment forRoute='/new'><div className='new-session-root'><NewSession /></div></Fragment>
        <Fragment forRoute='/session/:sessionId'><div className='session-root'><Session /></div></Fragment>
      </div>
    </Fragment>
  );
};

export default Main;

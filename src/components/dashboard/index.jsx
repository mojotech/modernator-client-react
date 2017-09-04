import React from 'react';
import { connect } from 'react-redux';
import { joinSession } from 'reducers/session';
import { DashboardSession } from 'types/prop-types';
import Session from './session';
import Heading from './heading';
import { curry, compose, values, reject, contains, concat, isEmpty, prop } from 'ramda';
import { isSignedIn } from 'types/user';
require('styles/dashboard.less');

const SessionList = ({ sessions, joinSession, showJoin }) => (
  <ul className='session-list'>
    {sessions.map((session) =>
      <li key={session.session.sessionId}>
        <Session {...session} joinSession={joinSession} showJoin={showJoin} />
      </li>
    )}
  </ul>
);

const Dashboard = ({ questionerSessions, answererSessions, otherSessions, loading, user, joinSession }) => (
  <div className='dashboard' >
    <Heading user={user} />
    {loading && <p>"Loading..."</p>}
    {answererSessions.length > 0 &&
      <div key='answerer' className='answerer-sessions'>
        <h2 className='h2'>Answerer</h2>
        <SessionList sessions={answererSessions} joinSession={joinSession} showJoin={isSignedIn(user)} />
      </div>
    }
    {questionerSessions.length > 0 &&
      <div key='questioner' className='questioner-sessions'>
        <h2 className='h2'>Questioner</h2>
        <SessionList sessions={questionerSessions} joinSession={joinSession} showJoin={isSignedIn(user)} />
      </div>
    }
    {otherSessions.length > 0 &&
      <div key='other' className='other-sessions'>
        <h2 className='h2'>Unjoined</h2>
        <SessionList sessions={otherSessions} joinSession={joinSession} showJoin={isSignedIn(user)} />
      </div>
    }
  </div>
);

Dashboard.propTypes = {
  answererSessions: React.PropTypes.arrayOf(DashboardSession).isRequired,
  questionerSessions: React.PropTypes.arrayOf(DashboardSession).isRequired,
  otherSessions: React.PropTypes.arrayOf(DashboardSession).isRequired
};

const mapDispatchToProps = (dispatch) => ({
  joinSession: curry((sessionId, _) => dispatch(joinSession(sessionId)))
});

export default connect(prop('dashboard'), mapDispatchToProps)(Dashboard);

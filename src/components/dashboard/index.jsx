import React from 'react';
import { connect } from 'react-redux';
import { joinSession } from 'reducers/session';
import { DashboardSession } from 'types/prop-types';
import Session from './session';
import Heading from './heading';
import { curry, compose, values, reject, contains, concat, isEmpty, prop } from 'ramda';
import { isSignedIn } from 'types/user';
import $ from 'redux-reducer-toolkit';
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

const partitionSessions = curry((sessions, user) => {
  if(user === null || isEmpty(sessions)) {
    return {
      answererSessions: [],
      questionerSessions: [],
      otherSessions: values(sessions)
    }
  }
  const answererSessions = user.answererSessions.map((id) => sessions[id]);
  const questionerSessions = user.questionerSessions.map((id) => sessions[id]);
  const userSessionIds = concat(user.answererSessions, user.questionerSessions);
  const otherSessions = reject((s) => contains(s.id, userSessionIds), values(sessions));

  return {
    answererSessions,
    questionerSessions,
    otherSessions
  };
});

const dashboardSelector = prop('dashboard');
const dashboardSessions = $.map(prop('sessions'), dashboardSelector);
const userSelector = s => s.user && s.user.user;

const selector = $.expand(
    dashboardSelector,
    $.ap($.ap($.of(partitionSessions), dashboardSessions), userSelector),
    $.objectify('user', userSelector)
);
const mapDispatchToProps = (dispatch) => ({
  joinSession: curry((sessionId, _) => dispatch(joinSession(sessionId)))
});

export default connect(selector, mapDispatchToProps)(Dashboard);

import React from 'react';
import { connect } from 'react-redux';
import { joinSession, rejoinSession } from 'reducers/session';
import { dashboardReset } from 'reducers/dashboard';
import { DashboardSession } from 'types/prop-types';
import onInitialize from 'components/on-initialize';
import Session from './session';
import { curry, compose } from 'ramda';
import { Link } from 'redux-little-router';
import { newSession } from 'lib/routes';
require('styles/dashboard.less');

const Dashboard = ({ sessions, loading, joinSession, rejoinSession }) => (
  <div className='dashboard' >
    <div className='heading'>
      <Link className='new-session' href={newSession()}>New Session</Link>
      <h1 className='h1'>Modernator</h1>
    </div>
    {loading && <p>"Loading..."</p>}
    <ul className='session-list'>
      {sessions.map((session) =>
        <li key={session.session.sessionId}>
          <Session {...session} joinSession={joinSession} rejoinSession={rejoinSession} />
        </li>
      )}
    </ul>
  </div>
);

Dashboard.propTypes = {
  sessions: React.PropTypes.arrayOf(DashboardSession).isRequired,
};

const mapStateToProps = (state) => (state.dashboard);
const mapDispatchToProps = (dispatch) => ({
  joinSession: curry((sessionId, name) => dispatch(joinSession(sessionId, name))),
  rejoinSession: compose(dispatch, rejoinSession),
  initialize: () => dispatch(dashboardReset)
});

export default connect(mapStateToProps, mapDispatchToProps)(onInitialize(Dashboard, 'initialize'));

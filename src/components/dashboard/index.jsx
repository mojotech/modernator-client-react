import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from 'reducers/change-screens';
import { joinSession, rejoinSession } from 'reducers/session';
import { dashboardReset } from 'reducers/dashboard';
import { NEW_SESSION, SESSION } from 'types/common';
import { DashboardSession } from 'types/prop-types';
import onInitialize from 'components/on-initialize';
import Session from './session';
import { curry, compose } from 'ramda';
require('styles/dashboard.less');

const Dashboard = ({ sessions, loading, createNewSession, joinSession, rejoinSession }) => (
  <div className='dashboard' >
    <button onClick={createNewSession}>Create New Session</button>
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
  createNewSession: () => dispatch(changeScreen(NEW_SESSION)),
  joinSession: curry((sessionId, name) => dispatch(joinSession(sessionId, name))),
  rejoinSession: compose(dispatch, rejoinSession),
  initialize: () => dispatch(dashboardReset)
});

export default connect(mapStateToProps, mapDispatchToProps)(onInitialize(Dashboard, 'initialize'));

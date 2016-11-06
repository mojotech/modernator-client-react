import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from 'reducers/change-screens';
import { joinSession } from 'reducers/session';
import { dashboardReset } from 'reducers/dashboard';
import { NEW_SESSION, SESSION } from 'types/common';
import { DashboardSession } from 'types/prop-types';
import onInitialize from 'components/on-initialize';
import Session from './session';

const Dashboard = ({ sessions, loading, createNewSession, joinSession }) => (
  <div>
    <button onClick={createNewSession}>Create New Session</button>
    <button onClick={joinSession}>Join Session</button>
    {loading && <p>"Loading..."</p>}
    <ul>
      {sessions.map((session) =>
        <Session key={session.session.sessionId} {...session} joinSession={joinSession} />
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
  joinSession: (sessionId) => dispatch(joinSession(sessionId, null)),
  initialize: () => dispatch(dashboardReset)
});

export default connect(mapStateToProps, mapDispatchToProps)(onInitialize(Dashboard, 'initialize'));

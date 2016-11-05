import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from '../change-screens';
import { joinSession } from '../session';
import { dashboardReset } from '../dashboard';
import { NEW_SESSION, SESSION } from '../types/common';
import { DashboardSession } from '../types/prop-types';
import onInitialize from './on-initialize';

const Dashboard = ({ sessions, loading, createNewSession, joinSession }) => (
  <div>
    <button onClick={createNewSession}>Create New Session</button>
    <button onClick={joinSession}>Join Session</button>
    {loading && <p>"Loading..."</p>}
    <ul>
      {sessions.map(({ session, answerer, totals }) => (
        <li key={session.sessionId}>
          <a onClick={() => joinSession(session.sessionId)}>
            {session.name}, {session.locked}, {answerer.name}, {totals.questioners} Questioners, {totals.answeredQuestions}/{totals.questions} Questions Answered
          </a>
        </li>
      ))}
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

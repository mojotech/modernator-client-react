import React from 'react';
import { connect } from 'react-redux';
import { joinSession } from 'reducers/session';
import { dashboardReset } from 'reducers/dashboard';
import { DashboardSession } from 'types/prop-types';
import onInitialize from 'components/on-initialize';
import Session from './session';
import Heading from './heading';
import { curry, compose } from 'ramda';
require('styles/dashboard.less');

const Dashboard = ({ sessions, loading, user, joinSession }) => (
  <div className='dashboard' >
    <Heading user={user} />
    {loading && <p>"Loading..."</p>}
    <ul className='session-list'>
      {sessions.map((session) =>
        <li key={session.session.sessionId}>
          <Session {...session} joinSession={joinSession} />
        </li>
      )}
    </ul>
  </div>
);

Dashboard.propTypes = {
  sessions: React.PropTypes.arrayOf(DashboardSession).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.dashboard,
  user: state.user.user
});
const mapDispatchToProps = (dispatch) => ({
  joinSession: curry((sessionId, _) => dispatch(joinSession(sessionId))),
  initialize: () => dispatch(dashboardReset)
});

export default connect(mapStateToProps, mapDispatchToProps)(onInitialize(Dashboard, 'initialize'));

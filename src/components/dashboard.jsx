import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from '../change-screens';
import { dashboardReset } from '../dashboard';
import { NEW_SESSION, SESSION } from '../types/common';
import onInitialize from './on-initialize';

const Dashboard = ({ loading, createNewSession, joinSession }) => (
  <div>
    <button onClick={createNewSession}>Create New Session</button>
    <button onClick={joinSession}>Join Session</button>
    {loading && <p>"Loading..."</p>}
  </div>
);

Dashboard.propTypes = {
  loading: React.PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => (state.dashboard);
const mapDispatchToProps = (dispatch) => ({
  createNewSession: () => dispatch(changeScreen(NEW_SESSION)),
  joinSession: () => dispatch(changeScreen(SESSION)),
  initialize: () => dispatch(dashboardReset)
});

export default connect(mapStateToProps, mapDispatchToProps)(onInitialize(Dashboard, 'initialize'));

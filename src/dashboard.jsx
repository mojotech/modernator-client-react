import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from './change-screens';
import { NEW_SESSION, SESSION } from './types/common';

const Dashboard = ({ createNewSession, joinSession }) => (
  <div>
    <button onClick={createNewSession}>Create New Session</button>
    <button onClick={joinSession}>Join Session</button>
  </div>
);

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  createNewSession: () => dispatch(changeScreen(NEW_SESSION)),
  joinSession: () => dispatch(changeScreen(SESSION))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

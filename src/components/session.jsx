import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from '../change-screens';
import { DASHBOARD } from '../types/common';

const Session = ({ leave }) => (
  <div>
    <button onClick={leave}>Leave Session</button>
  </div>
);

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  leave: () => dispatch(changeScreen(DASHBOARD)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);

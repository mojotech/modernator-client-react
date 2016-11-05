import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from '../change-screens';
import { SESSION, DASHBOARD } from '../types/common';

const NewSession = ({ cancel, submitSession }) => (
  <div>
    <button onClick={cancel}>Cancel</button>
    <button onClick={submitSession}>Submit</button>
  </div>
);

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  submitSession: () => dispatch(changeScreen(SESSION)),
  cancel: () => dispatch(changeScreen(DASHBOARD))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSession);

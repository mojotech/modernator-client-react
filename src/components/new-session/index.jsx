import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from 'reducers/change-screens';
import { SESSION, DASHBOARD } from 'types/common';
import { curry, compose } from 'ramda';
import { createSession } from 'reducers/session';
import preventDefault from 'lib/prevent-default';
import StatefulForm from 'components/stateful-form';

const NewSessionForm = curry((submitSession, onSubmit, onChange) =>
  <form onSubmit={compose(submitSession, preventDefault(onSubmit))}>
    <div>
      <label htmlFor='topic'>Session Topic</label>
      <input type='text' name='topic' placeholder='The weather' onChange={onChange} />
    </div>
    <div>
      <label htmlFor='name'>Your Name</label>
      <input type='text' name='name' placeholder='Dexter' onChange={onChange} />
    </div>
    <button type='submit'>Create Session</button>
  </form>
);

const NewSession = ({ cancel, submitSession }) => (
  <div>
    <button onClick={cancel}>Cancel</button>
    <StatefulForm form={NewSessionForm(submitSession)} />
  </div>
);

NewSession.propTypes = {
  submitSession: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  submitSession: compose(dispatch, createSession),
  cancel: () => dispatch(changeScreen(DASHBOARD))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSession);

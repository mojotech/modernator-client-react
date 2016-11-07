import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from 'reducers/change-screens';
import { SESSION, DASHBOARD } from 'types/common';
import { compose } from 'ramda';
import { createSession } from 'reducers/session';
import preventDefault from 'lib/prevent-default';
import statefulForm from 'components/stateful-form';

const NewSession = ({ cancel, submitSession, onSubmit, onChange }) => (
  <div>
    <button onClick={cancel}>Cancel</button>
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
  </div>
);

NewSession.propTypes = {
  submitSession: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  submitSession: compose(dispatch, createSession),
  cancel: () => dispatch(changeScreen(DASHBOARD))
});

export default connect(mapStateToProps, mapDispatchToProps)(statefulForm(NewSession));

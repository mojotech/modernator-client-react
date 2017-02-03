import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from 'reducers/change-screens';
import { SESSION, DASHBOARD } from 'types/common';
import { curry, compose } from 'ramda';
import { createSession } from 'reducers/session';
import preventDefault from 'lib/prevent-default';
import StatefulForm from 'components/stateful-form';
require('styles/new-session.less')

const NewSessionForm = curry((submitSession, cancel, { onSubmit, onChange, topic='', name='' }) =>
  <form className='new-session-form' onSubmit={compose(submitSession, preventDefault(onSubmit))}>
    <div className='topic'>
      <label htmlFor='topic'>Topic</label>
      <input className='topic-input' value={topic} type='text' placeholder='The weather' onChange={onChange('topic')} />
    </div>
    <div className='name'>
      <label htmlFor='name'>Name</label>
      <input className='topic-input' name={name} type='text' placeholder='Dexter' onChange={onChange('name')} />
    </div>
    <div className='buttons'>
      <button className='create-session' type='submit'>Create</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  </form>
);

const NewSession = ({ cancel, submitSession }) => (
  <div className='new-session'>
    <StatefulForm form={NewSessionForm(submitSession, cancel)} />
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

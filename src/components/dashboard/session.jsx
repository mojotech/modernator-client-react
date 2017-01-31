import React from 'react';
import { dashboardSessionShape } from 'types/prop-types';
import preventDefault from 'lib/prevent-default';
import { compose, propOr } from 'ramda';
import StatefulForm from 'components/stateful-form';

const DashboardSession = ({ session, answerer, totals, joinSession, rejoinSession }) => (
  <div className='session'>
    <div className='session-info'>
      <span className='session-name'>{session.name}</span> by
      <span className='session-answerer'>{answerer.name}</span>
      <p className='session-stats'>
        {totals.questioners} Questioners, {totals.answeredQuestions}/{totals.questions} Questions Answered
      </p>
    </div>
    <StatefulForm form={({ onSubmit, onChange, name='' }) => (
      <form className='session-join' onSubmit={compose(joinSession(session.sessionId), propOr(null, 'name'), preventDefault(onSubmit))}>
        <p className='no-margin'>
          <label htmlFor='name'>Join as</label>
          <input className='name-input' value={name} type='text' placeholder='Dexter' onChange={onChange('name')} />
        </p>
        <button className='submit' type='submit'>Join Session</button>
      </form>
    )} />
    <button className='session-rejoin' onClick={() => rejoinSession(session.sessionId)}>Rejoin Session</button>
  </div>
);

DashboardSession.propTypes = {
  ...dashboardSessionShape,
  joinSession: React.PropTypes.func.isRequired,
  rejoinSession: React.PropTypes.func.isRequired
};

export default DashboardSession;

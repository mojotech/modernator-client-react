import React from 'react';
import { dashboardSessionShape } from 'types/prop-types';
import preventDefault from 'lib/prevent-default';
import { compose, propOr } from 'ramda';
import StatefulForm from 'components/stateful-form';

const DashboardSession = ({ session, answerer, totals, joinSession }) => (
  <StatefulForm form={(onSubmit, onChange) => (
    <form onSubmit={compose(joinSession(session.sessionId), propOr(null, 'name'), preventDefault(onSubmit))}>
      <p>
        {session.name}, {session.locked}, {answerer.name}, {totals.questioners} Questioners, {totals.answeredQuestions}/{totals.questions} Questions Answered
      </p>
      <p>
        <label htmlFor='name'>Desired Name</label>
        <input name='name' type='text' placeholder='Dexter' onChange={onChange} />
      </p>
      <button type='submit'>Join Session</button>
    </form>
  )} />
);

DashboardSession.propTypes = {
  ...dashboardSessionShape,
  joinSession: React.PropTypes.func.isRequired
};

export default DashboardSession;

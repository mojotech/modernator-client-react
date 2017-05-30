import React from 'react';
import { dashboardSessionShape } from 'types/prop-types';
import preventDefault from 'lib/prevent-default';
import { compose, propOr } from 'ramda';
import StatefulForm from 'components/stateful-form';

const DashboardSession = ({ session, answerer, totals, showJoin=false, joinSession }) => (
  <div className='session'>
    <div className='session-info'>
      <span className='session-name'>{session.name}</span> by
      <span className='session-answerer'>{answerer.name}</span>
      <p className='session-stats'>
        {totals.questioners} Questioners, {totals.answeredQuestions}/{totals.questions} Questions Answered
      </p>
    </div>
    {showJoin &&
      <StatefulForm form={({ onSubmit, onChange }) => (
        <form className='session-join' onSubmit={compose(joinSession(session.sessionId), preventDefault(onSubmit))}>
          <div className='actions'>
            <button className='submit' type='submit'>Join</button>
          </div>
        </form>
      )} />
    }
  </div>
);

DashboardSession.propTypes = {
  ...dashboardSessionShape,
  joinSession: React.PropTypes.func.isRequired,
  showJoin: React.PropTypes.bool.isRequired
};

export default DashboardSession;

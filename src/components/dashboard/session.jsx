import React from 'react';
import { dashboardSessionShape } from 'types/prop-types';
import preventDefault from 'lib/prevent-default';
import { compose, propOr } from 'ramda';

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
      <div className='session-join actions'>
        <button
          onClick={compose(joinSession(session.sessionId), preventDefault())}
          className='submit'
          type='submit'
        >
          Join
        </button>
      </div>
    }
  </div>
);

DashboardSession.propTypes = {
  ...dashboardSessionShape,
  joinSession: React.PropTypes.func.isRequired,
  showJoin: React.PropTypes.bool.isRequired
};

export default DashboardSession;

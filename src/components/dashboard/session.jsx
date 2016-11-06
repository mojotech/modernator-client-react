import React from 'react';
import { dashboardSessionShape } from 'types/prop-types';
import onInitialize from 'components/on-initialize';

const DashboardSession = ({ session, answerer, totals, joinSession }) => (
  <li>
    <a onClick={() => joinSession(session.sessionId)}>
      {session.name}, {session.locked}, {answerer.name}, {totals.questioners} Questioners, {totals.answeredQuestions}/{totals.questions} Questions Answered
    </a>
  </li>
);

DashboardSession.propTypes = {
  ...dashboardSessionShape,
  joinSession: React.PropTypes.func.isRequired
};

export default DashboardSession;


import { PropTypes as PT } from 'react';

export const DashboardSession = PT.shape({
  session: PT.shape({
    sessionId: PT.number.isRequired,
    name: PT.string.isRequired,
    locked: PT.oneOf(['Locked', 'Unlocked'])
  }).isRequired,
  answerer: PT.shape({
    name: PT.string.isRequired
  }).isRequired,
  totals: PT.shape({
    answeredQuestions: PT.number.isRequired,
    questions: PT.number.isRequired,
    questioners: PT.number.isRequired,
  }).isRequired
});

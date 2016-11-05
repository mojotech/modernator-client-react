import { PropTypes as PT } from 'react';

const sessionShape = {
  sessionId: PT.number.isRequired,
  name: PT.string.isRequired,
  locked: PT.oneOf(['Locked', 'Unlocked'])
};

const answererShape = {
  name: PT.string.isRequired
};

export const DashboardSession = PT.shape({
  session: PT.shape(sessionShape).isRequired,
  answerer: PT.shape(answererShape).isRequired,
  totals: PT.shape({
    answeredQuestions: PT.number.isRequired,
    questions: PT.number.isRequired,
    questioners: PT.number.isRequired,
  }).isRequired
});

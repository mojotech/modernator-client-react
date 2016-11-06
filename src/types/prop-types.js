import { PropTypes as PT } from 'react';
import { QUESTIONER } from './common';
import { merge, mergeAll } from 'ramda';

const sessionShape = {
  sessionId: PT.number.isRequired,
  name: PT.string.isRequired,
  locked: PT.oneOf(['Locked', 'Unlocked'])
};

const answererShape = {
  name: PT.string.isRequired
};

const selfShape = {
  name: PT.string,
  type: PT.oneOf([QUESTIONER]),
  id: PT.number.isRequired
};

const questionShape = {
  questionId: PT.number.isRequired,
  questionVotes: PT.number.isRequired,
  questionText: PT.string.isRequired,
  questionAnswered: PT.bool.isRequired
};

const questionerShape = {
  questionerId: PT.number.isRequired,
  name: PT.string
};

export const dashboardSessionShape = {
  session: PT.shape(sessionShape).isRequired,
  answerer: PT.shape(answererShape).isRequired,
  totals: PT.shape({
    answeredQuestions: PT.number.isRequired,
    questions: PT.number.isRequired,
    questioners: PT.number.isRequired,
  }).isRequired
};

export const Question = PT.shape(questionShape);

export const Questioner = PT.shape(questionerShape);

export const Session = PT.shape(mergeAll([
  { me: selfShape },
  { answerer: answererShape },
  merge(sessionShape, { id: PT.number.isRequired }),
  {
    loading: PT.bool.isRequired,
    questioners: PT.arrayOf(Questioner).isRequired,
    questions: PT.arrayOf(Question).isRequired
  }
]));

export const DashboardSession = PT.shape(dashboardSessionShape);

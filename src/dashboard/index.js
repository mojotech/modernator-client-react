import { compose, filter, reduce, map } from 'ramda';
import { action } from '../types/common';
import apiPath from '../lib/api-path';
import requestJson from '../lib/request-json';

const initialState = {
  sessions: [],
  loading: true
};

const dashboard = (state = initialState, action) => {
  switch(action.type) {
  case 'dashboard/load-sessions':
    return { ...state, loading: false, sessions: action.payload };
  case 'dashboard/reset':
    action.sideEffect(fetchDashboard);
    return initialState;
  default:
    return state;
  }
};

export const dashboardReset = action('dashboard/reset', null);

export function fetchDashboard(dispatch) {
  return fetch(`${apiPath}/sessions`)
    .then(requestJson)
    .then(compose(dispatch, action('dashboard/load-sessions'), map(toDashboardSessionInfo)));
}

function toDashboardSessionInfo({ session, answerer, questioners, questions }) {
  return {
    session,
    answerer,
    totals: {
      answeredQuestions: filter((a) => a.questionAnswered, questions).length,
      questions: questions.length,
      questioners: questioners.length
    }
  };
}

export default dashboard;

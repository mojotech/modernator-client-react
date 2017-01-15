import { curry, compose, filter, reduce, map } from 'ramda';
import { action, DASHBOARD } from 'types/common';
import apiPath from 'lib/api-path';
import requestJson from 'lib/request-json';
import { CHANGE_SCREEN, getScreen } from '../change-screens';

const initialState = {
  sessions: [],
  loading: true,
  interval: null
};

const dashboard = (state = initialState, action) => {
  switch(action.type) {
  case 'dashboard/load-sessions':
    return { ...state, loading: false, sessions: action.payload };
  case 'dashboard/reset':
    action.sideEffect(fetchDashboard);
    return initialState;
  case 'dashboard/set-interval':
    return { ...state, interval: action.payload };
  case CHANGE_SCREEN:
    if (getScreen(action) !== DASHBOARD) {
      action.sideEffect(clearInterval(state.interval));
    }
    return state;
  default:
    return state;
  }
};

const clearInterval = curry((interval, dispatch) => {
  clearInterval(interval);
  dispatch(action('dashboard/set-interval', null));
})

export const dashboardReset = action('dashboard/reset', null);

export function fetchDashboard(dispatch) {
  const interval = setInterval(() => dashboardRequest(dispatch), 30 * 1000);

  dispatch(action('dashboard/set-interval', interval));
  dashboardRequest(dispatch);
}

function dashboardRequest(dispatch) {
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

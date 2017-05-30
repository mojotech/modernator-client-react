import { curry, compose, filter, reduce, map, indexBy, prop } from 'ramda';
import { action } from 'types/common';
import apiPath from 'lib/api-path';
import requestJson from 'lib/request-json';
import { LOCATION_CHANGED } from 'redux-little-router';
import { isRoute, dashboard as dashboardRoute } from 'lib/routes';
import { serverToUser } from 'types/user';

const initialState = {
  sessions: {},
  loading: true,
  interval: null
};

export const DASHBOARD_RESET = 'dashboard/reset';

const dashboard = (state = initialState, action) => {
  switch(action.type) {
  case 'dashboard/load-sessions':
    return { ...state, loading: false, sessions: action.payload };
  case DASHBOARD_RESET:
    action.sideEffect(fetchDashboard);
    return initialState;
  case 'dashboard/set-interval':
    return { ...state, interval: action.payload };
  case LOCATION_CHANGED:
    if (!isRoute(dashboardRoute(), action.payload)) {
      action.sideEffect(clearInterval(state.interval));
      return state;
    } else {
      action.sideEffect(dashboardReset);
      return state;
    }
  default:
    return state;
  }
};

const dashboardReset = (d) => d(action(DASHBOARD_RESET, null));

const clearInterval = curry((interval, dispatch) => {
  window.clearInterval(interval);
  dispatch(action('dashboard/set-interval', null));
})

export function fetchDashboard(dispatch) {
  const interval = setInterval(() => dashboardRequest(dispatch), 30 * 1000);

  dispatch(action('dashboard/set-interval', interval));
  dashboardRequest(dispatch);
}

function dashboardRequest(dispatch) {
  return fetch(`${apiPath}/sessions`)
    .then(requestJson)
    .then(compose(dispatch, action('dashboard/load-sessions'), indexBy(prop('id')), map(toDashboardSessionInfo)));
}

function toDashboardSessionInfo({ session, answerer, questioners, questions }) {
  return {
    id: session.sessionId,
    session,
    answerer: serverToUser(answerer),
    totals: {
      answeredQuestions: filter((a) => a.questionAnswered, questions).length,
      questions: questions.length,
      questioners: questioners.length
    }
  };
}

export default dashboard;

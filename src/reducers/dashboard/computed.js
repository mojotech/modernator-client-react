import $ from 'staticland-redux';
import { curry, concat, contains, prop, values, reject, isEmpty } from 'ramda';
import dashboard from 'reducers/dashboard';
import user from 'reducers/user';

const partitionSessions = curry((sessions, user) => {
  if(user === null || isEmpty(sessions)) {
    return {
      answererSessions: [],
      questionerSessions: [],
      otherSessions: values(sessions)
    }
  }
  const answererSessions = user.answererSessions.map((id) => sessions[id]);
  const questionerSessions = user.questionerSessions.map((id) => sessions[id]);
  const userSessionIds = concat(user.answererSessions, user.questionerSessions);
  const otherSessions = reject((s) => contains(s.id, userSessionIds), values(sessions));

  return {
    answererSessions,
    questionerSessions,
    otherSessions
  };
});

// Could do this slightly differently, but this way the dashboard reducer is only called once
export default $.chain((dashboardState) => (
  $.expand($.of(dashboardState), $.ap($.ap($.of(partitionSessions), $.of(dashboardState.sessions)), user))
), dashboard);

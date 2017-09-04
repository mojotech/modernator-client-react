import { curry, concat, contains, prop, values, reject, isEmpty } from 'ramda';

export default curry((sessions, user) => {
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

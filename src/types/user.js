import { contains } from 'ramda';

export function isSignedIn(user) {
  return user !== null;
}

export function isQuestionerForSession(user, sessionId) {
  return user !== null && contains(sessionId, user.questionerSessions)
}

export function isAnswererForSession(user, sessionId) {
  return user !== null && contains(sessionId, user.answererSessions)
}

import { action } from 'types/common';
import { compose, prop, curry, indexBy, map, isNil } from 'ramda';
import { apiPath, wsPath } from 'lib/api-path';
import requestJson from 'lib/request-json';
import { replace, LOCATION_CHANGED } from 'redux-little-router';
import { session as sessionRoute } from 'lib/routes';

const initialState = {
  id: null,
  name: null,
  locked: null,
  loading: true,
  socket: null,
  answerer: {
    name: null
  },
  questioners: [],
  questions: []
};

const session = (state=initialState, action) => {
  switch(action.type) {
  case 'session/create':
    action.sideEffect(createAndJoinSession(action.payload));
    return { ...initialState };
  case 'session/join':
    action.router.push(sessionRoute(action.payload.sessionId));
    action.sideEffect(joinAndFetchSession(action.payload.sessionId));
    return { ...initialState };
  case 'session/load':
    return { ...state, ...action.payload };
  case 'session/set_socket':
    return { ...state, socket: action.payload };
  case 'session/lock':
    return { ...state, locked: true };
  case 'session/question_asked':
    return { ...state, questions: { ...state.questions, [action.payload.questionId]: action.payload } };
  case 'session/question_upvoted':
    return { ...state, questions: { ...state.questions, [action.payload.questionId]: action.payload } };
  case 'session/question_answered':
    return { ...state, questions: { ...state.questions, [action.payload.questionId]: action.payload } };
  case 'session/ask_question':
    action.sideEffect(askQuestionRequest(state.id, action.payload));
    // TODO have some sort of processing indicator
    return state;
  case 'session/upvote_question':
    action.sideEffect(upvoteQuestionRequest(state.id, action.payload));
    // TODO have some sort of processing indicator
    return state;
  case 'session/answer_question':
    action.sideEffect(answerQuestionRequest(state.id, action.payload));
    // TODO have some sort of processing indicator
    return state;
  case 'session/questioner_joined':
    return { ...state, questioners: [ ...state.questioners, action.payload ] };
  case LOCATION_CHANGED:
    if(!isNil(action.payload.params.sessionId)) {
      action.sideEffect(d => setSessionSocket(action.payload.params.sessionId, d));
    }
    return initialState;
  default:
    return state;
  }
};

export function joinSession(sessionId) {
  return action('session/join', { sessionId });
}

const joinRequest = (sessionId) => {
  const headers = new Headers({ 'Content-type': 'application/json', 'Accept': 'application/json' });

  return fetch(`${apiPath}/sessions/${sessionId}/join`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: headers
  });
};

function setSessionSocket(sessionId, dispatch) {
  return action('session/set_socket', openSessionSocket(sessionId, dispatch));
}

const joinAndFetchSession = curry((sessionId, dispatch) => {
  return joinRequest(sessionId)
    .then(requestJson)
    .then((q) => {
      // store socket on state so it doesn't get garbage collected
      dispatch(setSessionSocket(sessionId, dispatch));
    });
});

function openSessionSocket(sessionId, dispatch) {
  const socket = new WebSocket(`${wsPath}/sessions/${sessionId}/messages`);
  socket.onmessage = compose(dispatch, handleMessage, parseMessage);
  socket.onclose = (c) => {
    console.log('Socket closed: ', c);
  };
  socket.onerror = (e) => {
    console.log('Socket error: ', e);
  };
  return socket;
}

const parseMessage = compose(JSON.parse, prop('data'));

function handleMessage(message) {
  switch(message.tag) {
  case 'SessionState':
    return action('session/load', toSessionInfo(message.session));
  case 'SessionLocked':
    return action('session/lock', null);
  case 'QuestionAsked':
    return action('session/question_asked', message.question);
  case 'QuestionUpvoted':
    return action('session/question_upvoted', message.question);
  case 'QuestionAnswered':
    return action('session/question_answered', message.question);
  case 'QuestionerJoined':
    return action('session/questioner_joined', message.questioner);
  }
}

function toSessionInfo({ session, answerer, questioners, questions }) {
  return {
    id: session.sessionId,
    name: session.name,
    locked: session.locked,
    answerer: { id: answerer.userId, name: answerer.userName },
    questions: indexBy(prop('questionId'), questions),
    questioners: map(q => ({ id: q.userId, name: q.userName }), questioners)
  };
}

export const askQuestion = action('session/ask_question');

const askQuestionRequest = curry((sessionId, text, dispatch) => (
  fetch(`${apiPath}/sessions/${sessionId}/questions/ask`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: new Headers({ 'Content-type': 'application/json', 'Accept': 'application/json' }),
    body: JSON.stringify({ question: text })
  })
));

export const upvoteQuestion = action('session/upvote_question');

const upvoteQuestionRequest = curry((sessionId, questionId, dispatch) => (
  fetch(`${apiPath}/sessions/${sessionId}/questions/${questionId}/upvote`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: new Headers({ 'Content-type': 'application/json', 'Accept': 'application/json' })
  })
));

export const answerQuestion = action('session/answer_question');

const answerQuestionRequest = curry((sessionId, questionId, dispatch) => (
  fetch(`${apiPath}/sessions/${sessionId}/questions/${questionId}/answer`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: new Headers({ 'Content-type': 'application/json', 'Accept': 'application/json' })
  })
));

export const createSession = action('session/create');

const createSessionRequest = (topic) => (
  fetch(`${apiPath}/sessions`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: new Headers({ 'Content-type': 'application/json', 'Accept': 'application/json' }),
    body: JSON.stringify({
      sessionName: topic
    })
  })
);

const createAndJoinSession = curry(({ topic }, dispatch) => (
  createSessionRequest(topic)
    .then(requestJson)
    .then((a) => {
      dispatch(setSessionSocket(a.sessionId, dispatch));
      dispatch(replace(sessionRoute(a.sessionId)));
    })
));

export default session;

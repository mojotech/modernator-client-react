import { action, SESSION, QUESTIONER, ANSWERER } from 'types/common';
import { changeScreen } from 'reducers/change-screens';
import { compose, prop, curry, indexBy } from 'ramda';
import { apiPath, wsPath } from 'lib/api-path';
import requestJson from 'lib/request-json';

const initialState = {
  id: null,
  name: null,
  locked: null,
  loading: true,
  me: {
    name: null,
    type: null,
    id: null
  },
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
    action.sideEffect((d) => d(changeScreen(SESSION)));
    action.sideEffect(createAndJoinSession(action.payload));
    return { ...initialState };
  case 'session/join':
    action.sideEffect((d) => d(changeScreen(SESSION)));
    action.sideEffect(joinAndFetchSession(action.payload.sessionId, action.payload.name));
    return { ...initialState };
  case 'session/load':
    return { ...state, ...action.payload };
  case 'session/set_socket':
    return { ...state, socket: action.payload };
  case 'session/set_self':
    return { ...state, me: action.payload };
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
  case 'session/questioner_joined':
    return { ...state, questioners: [ ...state.questioners, action.payload ] };
  default:
    return state;
  }
};

export function joinSession(sessionId, name) {
  return action('session/join', { sessionId, name });
}

const joinRequest = (sessionId, name) => {
  const headers = new Headers({ 'Content-type': 'application/json', 'Accept': 'application/json' });

  return fetch(`${apiPath}/sessions/${sessionId}/join`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify({ questionerName: name })
  });
};

function setSessionSocket(sessionId, dispatch) {
  return action('session/set_socket', openSessionSocket(sessionId, dispatch));
}

const joinAndFetchSession = curry((sessionId, name, dispatch) => {
  return joinRequest(sessionId, name)
    .then(requestJson)
    .then((q) => {
      dispatch(setSelfQuestioner(q));
      // store socket on state so it doesn't get garbage collected
      dispatch(setSessionSocket(sessionId, dispatch));
    });
});

function setSelfQuestioner(q) {
  return action('session/set_self', { id: q.questionerId, name: q.name, type: QUESTIONER });
}

function setSelfAnswerer(a) {
  return action('session/set_self', { id: a.answererId, name: a.name, type: ANSWERER });
}

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
    answerer,
    questions: indexBy(prop('questionId'), questions),
    questioners
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

export const createSession = action('session/create');

const createSessionRequest = (topic, name) => (
  fetch(`${apiPath}/sessions`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: new Headers({ 'Content-type': 'application/json', 'Accept': 'application/json' }),
    body: JSON.stringify({
      sessionName: topic,
      answererName: name
    })
  })
);

const createAndJoinSession = curry(({ topic, name }, dispatch) => (
  createSessionRequest(topic, name)
    .then(requestJson)
    .then((a) => {
      dispatch(setSelfAnswerer(a));
      dispatch(setSessionSocket(a.sessionId, dispatch));
    })
));

export default session;

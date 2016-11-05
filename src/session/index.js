import { action, SESSION } from '../types/common';
import { changeScreen } from '../change-screens';
import { compose, prop, curry } from 'ramda';
import { apiPath, wsPath } from '../lib/api-path';
import requestJson from '../lib/request-json';

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
  case 'session/join':
    action.sideEffect((d) => d(changeScreen(SESSION)));
    action.sideEffect(joinAndFetchSession(action.payload.sessionId, action.payload.name));
    return { ...initialState, id: action.payload.sessionId };
  case 'session/load':
    return { ...state, ...action.payload };
  case 'session/set_socket':
    return { ...state, socket: action.payload };
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

const joinAndFetchSession = curry((sessionId, name, dispatch) => {
  return joinRequest(sessionId, name)
    .then(requestJson)
    .then(() => {
      // store socket on state so it doesn't get garbage collected
      dispatch(action('session/set_socket', openSessionSocket(sessionId, dispatch)));
    });
});

function openSessionSocket(sessionId, dispatch) {
  const socket = new WebSocket(`${wsPath}/sessions/${sessionId}/messages`);
  socket.onmessage = compose(dispatch, handleMessage, parseMessage);
  return socket;
}

const parseMessage = compose(JSON.parse, prop('data'));

function handleMessage(message) {
  switch(message.tag) {
  case 'SessionState':
    return action('session/load', toSessionInfo(message.session));
  }
}

function toSessionInfo({ session, answerer, questioners, questions }) {
  return {
    id: session.sessionId,
    name: session.name,
    locked: session.locked,
    answerer,
    questions,
    questioners
  };
}

export default session;

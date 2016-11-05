import { action, SESSION } from '../types/common';
import { changeScreen } from '../change-screens';
import { curry } from 'ramda';
import { apiPath } from '../lib/api-path';

const initialState = {
  id: null
};

const session = (state=initialState, action) => {
  switch(action.type) {
  case 'session/join':
    action.sideEffect((d) => d(changeScreen(SESSION)));
    action.sideEffect(doJoinSession(action.payload.sessionId, action.payload.name));
    return { ...initialState, id: action.payload.sessionId };
  default:
    return state;
  }
};

export function joinSession(sessionId, name) {
  return action('session/join', { sessionId, name });
}

const doJoinSession = curry((sessionId, name, dispatch) => {
  const headers = new Headers({ 'Content-type': 'application/json', 'Accept': 'application/json' });

  return fetch(`${apiPath}/sessions/${sessionId}/join`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify({ questionerName: name })
  });
});

export default session;

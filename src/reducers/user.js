import apiPath from 'lib/api-path';
import requestJson from 'lib/request-json';
import { curry, compose } from 'ramda';
import { action } from 'types/common';
import { dashboard } from 'lib/routes';

const initialState = {
  isLoading: false,
  user: null
};

const user = (state = initialState, action) => {
  switch(action.type) {
  case 'user/sign_in':
    action.sideEffect(signInRequest(action.payload.name, action.payload.password));
    action.router.push(dashboard());
    return { ...initialState, isLoading: true };
  case 'user/sign_up':
    action.sideEffect(signUpRequest(action.payload.name, action.payload.password));
    action.router.push(dashboard());
    return { ...initialState, isLoading: true };
  case 'user/loaded':
    return { isLoading: false, user: action.payload };
  default:
    return state;
  }
};

function toUser(user) {
  return {
    name: user.userName,
    answererSessions: user.answererSessions,
    questionerSessions: user.questionerSessions
  };
}

export const signIn = action('user/sign_in');
const signInRequest = curry((name, password, dispatch) => {
  return fetch(`${apiPath}/users/login`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: new Headers({ 'Content-type': 'application/json', 'Accept': 'application/json' }),
    body: JSON.stringify({
      loginName: name,
      loginPassword: password
    })
  }).then(requestJson)
    .then(compose(dispatch, action('user/loaded'), toUser));
});

export const signUp = action('user/sign_up');
const signUpRequest = curry((name, password, dispatch) => {
  return fetch(`${apiPath}/users`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: new Headers({ 'Content-type': 'application/json', 'Accept': 'application/json' }),
    body: JSON.stringify({
      userName: name,
      userPassword: password
    })
  }).then(requestJson)
    .then(compose(dispatch, action('user/loaded'), toUser));
});

export default user;

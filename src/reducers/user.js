import apiPath from 'lib/api-path';
import requestJson from 'lib/request-json';
import { curry, compose, always } from 'ramda';
import { action } from 'types/common';
import { dashboard } from 'lib/routes';
import { INITIALIZE } from 'reducers/initialize';
import { serverToUser } from 'types/user';

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
  case INITIALIZE:
    action.sideEffect(meRequest);
    return { ...initialState, isLoading: true };
  default:
    return state;
  }
};

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
    .then(compose(dispatch, action('user/loaded'), serverToUser));
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
    .then(compose(dispatch, action('user/loaded'), serverToUser));
});

const meRequest = (dispatch) => {
  return fetch(`${apiPath}/users/me`, {
    credentials: 'include',
    headers: new Headers({ 'Accept': 'application/json' })
  }).then(requestJson)
    .then(compose(dispatch, action('user/loaded'), serverToUser))
    .catch(compose(dispatch, action('user/loaded'), always(null)));
};

export default user;

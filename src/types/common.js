import { curry } from 'ramda';

export const action = curry((type, payload) => ({ type, payload }));

export const DASHBOARD = 'dashboard';
export const NEW_SESSION = 'new-session';
export const SESSION = 'session';
export const QUESTIONER = 'questioner';
export const ANSWERER = 'answerer';

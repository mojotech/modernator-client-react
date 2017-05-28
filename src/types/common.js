import { curry } from 'ramda';

export const action = curry((type, payload) => ({ type, payload }));

export const QUESTIONER = 'questioner';
export const ANSWERER = 'answerer';

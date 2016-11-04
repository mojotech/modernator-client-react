import { action, DASHBOARD } from '../types/common';

const initialState = DASHBOARD;

const changeScreens = (state = initialState, action) => {
  switch(action.type) {
  case 'change-screen':
    return action.payload;
  default:
    return state;
  }
};

export function changeScreen(screen) {
  return action('change-screen', screen);
}

export default changeScreens;

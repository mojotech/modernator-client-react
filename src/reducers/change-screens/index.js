import { action, DASHBOARD } from 'types/common';

export const CHANGE_SCREEN = 'change-screen/change';

export function getScreen(action) {
  return action.payload;
}

const initialState = DASHBOARD;

const changeScreens = (state = initialState, action) => {
  switch(action.type) {
  case CHANGE_SCREEN:
    return action.payload;
  default:
    return state;
  }
};

export function changeScreen(screen) {
  return action(CHANGE_SCREEN, screen);
}

export default changeScreens;

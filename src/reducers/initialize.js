import { action } from 'types/common';

export const INITIALIZE = 'modernator/initialize';
export const initialize = action(INITIALIZE, null);

export default function(state = false, action) {
  if(action.type === INITIALIZE) {
    return true;
  }
  return state;
};

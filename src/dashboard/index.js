import { action } from '../types/common';

const initialState = {
  loading: true
};

const dashboard = (state = initialState, action) => {
  switch(action.type) {
  case 'dashboard/reset':
    return initialState;
  default:
    return state;
  }
};

export const dashboardReset = action('dashboard/reset', null);

export default dashboard;

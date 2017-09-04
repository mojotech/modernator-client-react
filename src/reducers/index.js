import dashboard from 'reducers/dashboard';
import session from 'reducers/session';
import user from 'reducers/user';
import initialized  from 'reducers/initialize';
import { combine } from 'redux-consumer-toolkit';
import router from '../router';

const reducers = combine({
  dashboard,
  user,
  session,
  router: router.reducer,
  initialized
});

export default reducers;

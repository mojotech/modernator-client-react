import dashboard from 'reducers/dashboard';
import session from 'reducers/session';
import user from 'reducers/user';
import initialized  from 'reducers/initialize';
import $ from 'redux-reducer-toolkit';
import partitionSessions from 'lib/partition-sessions'
import router from '../router';
import { pick } from 'ramda';

const independent = $.combine({
  dashboard,
  user,
  session,
  router: router.reducer,
  initialized
});

const partitionedSessions = $.map(
  ({ dashboard, user }) => ({
    dashboard: { ...dashboard, ...partitionSessions(dashboard.sessions, user.user) }
  }),
  $.map(pick(['dashboard', 'user']), independent)
);

const mainReducer = $.map(
  ({ user, session, initialized }) => ({
    main: user.isLoading || !initialized || session.loading
  }),
  $.map(pick(['user', 'session', 'initialized']), independent)
);
const reducers = $.expandAll(
  independent,
  partitionedSessions,
  mainReducer
);

export default reducers;

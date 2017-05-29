import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import { Provider} from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { actionSideEffectMiddleware } from 'redux-side-effect';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RouterProvider, routerForBrowser } from 'redux-little-router';
import routes from 'lib/routes';
import routerSideEffects from 'middleware/router-side-effects';

require('styles/base.less');

// reducers
import dashboard from 'reducers/dashboard';
import session from 'reducers/session';
import user from 'reducers/user';
import { initialize } from 'reducers/initialize';

const router = routerForBrowser({
  routes
})

function reducer(state={}, action) {
  return {
    dashboard: dashboard(state.dashboard, action),
    session: session(state.session, action),
    user: user(state.user, action),
    router: router.reducer(state.router, action)
  };
}

const store = createStore(reducer,
  composeWithDevTools(
    router.enhancer,
    applyMiddleware(
      actionSideEffectMiddleware,
      router.middleware,
      routerSideEffects
    )
  )
);

// initialize anything that needs initializing
store.dispatch(initialize);

ReactDOM.render(
  <Provider store={store}>
    <RouterProvider store={store}>
      <Main />
    </RouterProvider>
  </Provider>, document.getElementById('root'));

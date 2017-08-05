import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import { Provider} from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { actionSideEffectMiddleware } from 'redux-side-effect';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RouterProvider, routerForBrowser, initializeCurrentLocation } from 'redux-little-router';
import routerSideEffects from 'middleware/router-side-effects';
import router from './router';

require('styles/base.less');

// reducers
import dashboard from 'reducers/dashboard/computed';
import session from 'reducers/session';
import user from 'reducers/user';
import initialized, { initialize } from 'reducers/initialize';
import { Chain } from 'redux-reducer-toolkit';

const reducer = Chain.combine({
  dashboard,
  session,
  user,
  router: router.reducer,
  initialized
});

const store = createStore(reducer,
  {},
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
const initialLocation = store.getState().router;
if(initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

ReactDOM.render(
  <Provider store={store}>
    <RouterProvider store={store}>
      <Main />
    </RouterProvider>
  </Provider>, document.getElementById('root'));

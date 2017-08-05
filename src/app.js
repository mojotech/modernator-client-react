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
import { initialize } from 'reducers/initialize';
import { Chain, Profunctor } from 'redux-reducer-toolkit';
import reducers from 'reducers';

const store = createStore(reducers,
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

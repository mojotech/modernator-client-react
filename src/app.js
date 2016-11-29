import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { actionSideEffectMiddleware } from 'redux-side-effect';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import changeScreens from 'reducers/change-screens';
import dashboard from 'reducers/dashboard';
import session from 'reducers/session';

function reducer(state={}, action) {
  return {
    screen: changeScreens(state.screen, action),
    dashboard: dashboard(state.dashboard, action),
    session: session(state.session, action)
  };
}

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(actionSideEffectMiddleware)
));

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>, document.getElementById('root'));

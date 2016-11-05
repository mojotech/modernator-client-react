import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { actionSideEffectMiddleware } from 'redux-side-effect';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import changeScreens from './change-screens';
import dashboard from './dashboard';

function reducer(state={}, action) {
  return {
    screen: changeScreens(state.screen, action),
    dashboard: dashboard(state.dashboard, action)
  };
}

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(actionSideEffectMiddleware)
));

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { actionSideEffectMiddleware } from 'redux-side-effect';
import { composeWithDevTools } from 'redux-devtools-extension';
import changeScreens from './change-screens';

function reducer(state={}, action) {
  return {
    screen: changeScreens(state.screen, action)
  };
}

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(actionSideEffectMiddleware)
));

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>, document.getElementById('root'));

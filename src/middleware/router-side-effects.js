import { push, replace, goBack, goForward } from 'redux-little-router';

const router = (sideEffect) => ({
  push: (route) => sideEffect((d) => d(push(route))),
  replace: (route) => sideEffect((d) => d(replace(route))),
  goBack: () => sideEffect((d) => d(goBack())),
  goForward: () => sideEffect((d) => d(goForward()))
});

export default function() {
  return next => action => {
    action.router = router(action.sideEffect);
    return next(action);
  };
}

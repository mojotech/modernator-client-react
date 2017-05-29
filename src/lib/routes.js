export function dashboard() {
  return '/';
}

export function newSession() {
  return '/new';
}

export function session(sessionId = ':sessionId') {
  return `/session/${sessionId}`
}

export function isRoute(route, router) {
  return router.pathname === route;
}

export function signIn() {
  return '/signin';
}

export function signUp() {
  return '/signup';
}

export default {
  [dashboard()]: {},
  [newSession()]: {},
  [session()]: {},
  [signIn()]: {},
  [signUp()]: {}
};

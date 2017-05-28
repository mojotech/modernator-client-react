export function dashboard() {
  return '/';
}

export function newSession() {
  return '/new';
}

export function session(sessionId = ':sessionId') {
  return `/session/${sessionId}`
}

export default {
  [dashboard()]: {},
  [newSession()]: {},
  [session()]: {}
};

/**
 * This file handles figuring out which API endpoint to hit.
 */


// Parse query api url
const params = (new URL(document.location)).searchParams;
const paramApiPath = params.get("apiPath");
const paramWsPath = params.get("wsPath");

// Support for defaults and loading from env vars at build time
const DEFAULT_API_PATH = 'http://localhost:8080';
const DEFAULT_WS_PATH = 'ws://localhost:8080';

export const apiPath = paramApiPath || process.env.API_PATH || DEFAULT_API_PATH;
export const wsPath = paramWsPath || process.env.WS_PATH || DEFAULT_WS_PATH;

export default apiPath;

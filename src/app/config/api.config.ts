const isBrowser = typeof window !== 'undefined';
const hostname = isBrowser ? window.location.hostname : '';
const isLocalHost =
  hostname === 'localhost' ||
  hostname === '127.0.0.1';

/**
 * Local API on localhost.
 * On the public site use same origin so phones hit barbercontrolhq.com/company/...
 * (avoids flaky api.* subdomain / CORS issues on mobile networks).
 */
export const API_BASE_URL = isLocalHost
  ? 'http://localhost:5045'
  : isBrowser
    ? window.location.origin
    : 'https://barbercontrolhq.com';

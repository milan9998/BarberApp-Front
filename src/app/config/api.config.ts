const isLocalHost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1');

/** Local API when developing on localhost; Cloudflare tunnel API when opened via domain. */
export const API_BASE_URL = isLocalHost
  ? 'http://localhost:5045'
  : 'https://api.barbercontrolhq.com';

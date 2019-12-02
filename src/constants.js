import appConfig from './app.config';

/**
 * Base url for Ubuntu build server.
 */
export const BASE_URL = 'https://kernel.ubuntu.com/~kernel-ppa/mainline';

/**
 * Base url for the API.
 */
export const API_ORIGIN = process.browser
  ? window.location.origin
  : appConfig.baseUrl;

/**
 * Default date format of the build server.
 */
export const SERVER_DATE_FORMAT = 'YYYY-MM-DD HH:mm';

/**
 * Static build variant for binary headers.
 */
export const BUILD_VARIANT_ALL = 'all';

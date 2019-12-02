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
 * Base url for latest release information from kernel.org.
 */
export const KERNEL_ORG_RELEASES_URL = 'https://www.kernel.org/releases.json';

/**
 * Default date format of Ubuntu build server.
 */
export const SERVER_DATE_FORMAT = 'YYYY-MM-DD HH:mm';

/**
 * Static build variant for binary headers.
 */
export const BUILD_VARIANT_ALL = 'all';

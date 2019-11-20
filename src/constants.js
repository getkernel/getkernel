/**
 * Base url for Ubuntu build server.
 */
export const BASE_URL = 'https://kernel.ubuntu.com/~kernel-ppa/mainline';

/**
 * Default date format of the build server.
 */
export const SERVER_DATE_FORMAT = 'YYYY-MM-DD HH:mm';

/**
 * Build variants per platform.
 */
export const BUILD_VARIANTS = {
  amd64: ['generic', 'lowlatency'],
  arm64: ['generic', 'snapdragon'],
  armhf: ['generic', 'generic-lpae'],
  i386: ['generic', 'lowlatency'],
  ppc64el: ['generic'],
  s390x: ['generic'],
};

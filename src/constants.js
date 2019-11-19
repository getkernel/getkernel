export const BASE_URL = 'https://kernel.ubuntu.com/~kernel-ppa/mainline';

export const BUILD_VARIANTS = {
  amd64: ['generic', 'lowlatency'],
  arm64: ['generic', 'snapdragon'],
  armhf: ['generic', 'generic-lpae'],
  i386: ['generic', 'lowlatency'],
  ppc64el: ['generic'],
  s390x: ['generic'],
};

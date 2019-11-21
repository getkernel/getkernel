/**
 * String compare function.
 */
export default (alwaysOnTop = null) => (a, b) => {
  const valueA = a.toLowerCase();
  const valueB = b.toLowerCase();

  if (alwaysOnTop) {
    if (valueA.includes(alwaysOnTop) || valueB.includes(alwaysOnTop)) {
      return 1;
    }
  }

  if (valueA < valueB) return -1;
  if (valueA > valueB) return 1;
  return 0;
};

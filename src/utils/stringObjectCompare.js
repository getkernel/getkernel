/**
 * A higher order function that returns a compare function.
 */
export default (propertyName, alwaysOnTop = null) => (a, b) => {
  const valueA = a[propertyName].toLowerCase();
  const valueB = b[propertyName].toLowerCase();

  if (alwaysOnTop) {
    if (valueA.includes(alwaysOnTop) || valueB.includes(alwaysOnTop)) {
      return 1;
    }
  }

  if (valueA < valueB) return -1;
  if (valueA > valueB) return 1;
  return 0;
};

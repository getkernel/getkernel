import stringCompare from './stringCompare';

/**
 * A higher order function that returns a compare function.
 */
export default (propertyName, alwaysOnTop = null) => (a, b) => {
  const valueA = a[propertyName].toLowerCase();
  const valueB = b[propertyName].toLowerCase();

  return stringCompare(alwaysOnTop)(valueA, valueB);
};

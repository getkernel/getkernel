/**
 * Utility methods for strings.
 */
export default class StringUtils {
  /**
   * Converts only the initial character in a string to uppercase.
   * @param {String} str Input string
   */
  static toUpperFirst(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }
}

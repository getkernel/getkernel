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

  /**
   * Splits text into lines of data.
   * @param {String} text Source text
   * @param {String} token Token to split by. Defaults to "\n".
   */
  static splitText(text, token = '\n') {
    return text.split(token);
  }
}

import Compare from './Compare';
import { atob, btoa } from '../lib/base64';

/**
 * Utility methods for encoding and decoding Bookmarks data.
 */
export default class BookmarkUtils {
  /**
   * Encodes array of bookmarks into base64 string.
   * @param {Array} bookmarksArray Bookmarks array to be encoded.
   */
  static encode(bookmarksArray) {
    // Sort and join items.
    const versions = [...bookmarksArray].sort(Compare.string('desc')).join('|');
    return btoa(versions);
  }

  /**
   * Decodes encoded bookmarks string into array of bookmarks.
   * @param {String} encodedBookmarks Base64 encoded Bookmarks string to be decoded.
   */
  static decode(encodedBookmarks) {
    const bookmarksArrayStr = atob(encodedBookmarks);
    return bookmarksArrayStr.split('|');
  }
}

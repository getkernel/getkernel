import Version from '../models/Version';
import Compare from './Compare';
import { atob, btoa } from './base64';

/**
 * Utility methods for encoding and decoding Bookmarks data.
 */
export default class BookmarkUtils {
  /**
   * Encodes array of bookmarks into base64 string.
   * @param {Array} bookmarksArray Bookmarks array to be encoded.
   */
  static encode(bookmarksArray) {
    // Convert strings into Version objects, sort and join them.
    const versions = [...bookmarksArray]
      .map((version) => new Version(version))
      .sort(Compare.version('desc'))
      .map((versionObj) => versionObj.toString(false))
      .join('|');

    return btoa(versions);
  }

  /**
   * Decodes encoded bookmarks string into array of bookmarks.
   * @param {String} encodedBookmarks Base64 encoded Bookmarks string to be decoded.
   */
  static decode(encodedBookmarks) {
    const bookmarksArrayStr = atob(encodedBookmarks);
    const bookmarksArray = bookmarksArrayStr.split('|');
    return bookmarksArray.map((baseVersion) =>
      new Version(baseVersion).toString(),
    );
  }
}

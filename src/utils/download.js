import appConfig from '../app.config';

/**
 * Initiates file download.
 * @param {String} url File url
 * @param {String} fileName File name
 */
export const fileDownload = (url, fileName) => {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  if (fileName.endsWith('.deb')) {
    anchor.type = 'application/x-debian-package';
  }
  anchor.hidden = true;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

/**
 * Initiates batch download process.
 * @param {Array} binaries Array of binaries
 * @param {String} baseUrl Base url to prepend to file names
 */
export const batchDownload = (binaries, baseUrl) => {
  const items = binaries.map(({ file_name }) => {
    return {
      url: baseUrl + file_name,
      fileName: file_name,
    };
  });
  doBatchDownload(items);
};

/**
 * Performs batch download.
 * @param {Array} items Items to download
 */
const doBatchDownload = (items) => {
  if (items.length) {
    const { url, fileName } = items.shift();
    fileDownload(url, fileName);
    return setTimeout(() => {
      doBatchDownload(items);
    }, appConfig.downloadInterval);
  }
};

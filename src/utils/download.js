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
  return null;
};

/**
 * Initiates batch download process.
 * @param {Array} binaries Array of binaries
 * @param {String} baseUrl Base url to prepend to file names
 */
export const batchDownload = (binaries, baseUrl) => {
  const items = binaries.map(({ fileName }) => ({
    url: `${baseUrl}/${fileName}`,
    fileName,
  }));
  doBatchDownload(items);
};

/**
 * Calculates download size for selected binaries.
 * @param {Array} binaries Array of binaries
 */
export const calculateDownloadSize = (binaries) => {
  const kbBasedUnitTable = {
    g: 1024 * 1024,
    m: 1024,
    k: 1,
  };

  const sizes = binaries.map(({ fileSize }) => {
    // Grab unit and size.
    const unit = fileSize.match(/[A-Z]/i)[0];
    let size = Number(fileSize.replace(unit, ''));

    // Convert everything to KB.
    size *= kbBasedUnitTable[unit.toLowerCase()];
    return size;
  });

  const total = sizes.reduce((acc, current) => acc + current, 0);

  for (let i = 0; i < Object.keys(kbBasedUnitTable).length; i += 1) {
    const unit = Object.keys(kbBasedUnitTable)[i];
    const threshold = kbBasedUnitTable[unit];
    if (total >= threshold) {
      const fixed = Number.parseFloat(total / threshold).toFixed(1);
      return `${fixed}${unit.toUpperCase()}`;
    }
  }
  return null;
};

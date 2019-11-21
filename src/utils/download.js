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

export const batchDownload = (items, waitBetween = 1000) => {
  if (items.length) {
    const { url, fileName } = items.shift();
    fileDownload(url, fileName);
    return setTimeout(() => {
      batchDownload(items);
    }, waitBetween);
  }
};

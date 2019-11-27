export default (checkedBinaries, version, platform) => {
  if (!checkedBinaries.length) {
    return null;
  }

  const fileName = `CHECKSUMS.${Date.now()}`;
  let text = '';

  text += `# Checksums for ${version} (${platform}), check with the command below:\n`;
  text += `#     shasum -c ${fileName}`;

  text += '\n#\n# Checksums-Sha1:\n';
  text += checkedBinaries
    .map(({ fileName: file, sha1 }) => `${sha1}  ${file}`)
    .join('\n');

  text += '\n#\n# Checksums-Sha256:\n';
  text += checkedBinaries
    .map(({ fileName: file, sha256 }) => `${sha256}  ${file}`)
    .join('\n');

  text += `\n#\n# https://getkernel.sh/kernel/${version}\n`;

  return {
    fileName,
    text,
  };
};

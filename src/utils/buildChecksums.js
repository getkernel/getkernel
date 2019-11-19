export default (version, platform, binaries, checkedBinaryIndices) => {
  const selectedBinaries = binaries.filter((_, i) =>
    checkedBinaryIndices.includes(i)
  );

  const fileName = `CHECKSUMS.${Date.now()}`;
  let text = '';

  text += `# Checksums for ${version} (${platform}), check with the command below:\n`;
  text += `#     shasum -c ${fileName}`;

  text += '\n#\n# Checksums-Sha1:\n';
  text += selectedBinaries
    .map(({ binary, sha1 }) => `${sha1}  ${binary}`)
    .join('\n');

  text += '\n#\n# Checksums-Sha256:\n';
  text += selectedBinaries
    .map(({ binary, sha256 }) => `${sha256}  ${binary}`)
    .join('\n');

  text += `\n#\n# https://getkernel.sh/kernel/${version}\n`;

  return {
    fileName,
    text,
  };
};

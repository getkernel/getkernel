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
    .map(({ file_name, sha1 }) => `${sha1}  ${file_name}`)
    .join('\n');

  text += '\n#\n# Checksums-Sha256:\n';
  text += selectedBinaries
    .map(({ file_name, sha256 }) => `${sha256}  ${file_name}`)
    .join('\n');

  text += `\n#\n# https://getkernel.sh/kernel/${version}\n`;

  return {
    fileName,
    text,
  };
};

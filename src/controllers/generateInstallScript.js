const fetch = require('isomorphic-unfetch');

const buildScript = (binaries, version, kernelUrl, origin, platform) => {
  let script = '';
  const addLine = (line, extraLine = 0) => {
    script += `${line || ''}\n`;
    if (extraLine > 0) script += '\n'.repeat(extraLine);
  };
  const addComment = (comment) => {
    script += `# ${comment}\n`;
  };
  const echo = (text, extraLine = 0) => {
    addLine(`echo "\\e[33m${text}\\e[0m"`, extraLine);
  };

  const tempDir = '_TMP_DIR';
  const binariesFiles = binaries.map(({ fileName }) => fileName);
  const binariesUrls = binaries.map(
    ({ fileName }) => `${kernelUrl}/${fileName}`,
  );

  addLine('#!/bin/bash');
  addLine('set -ue', 1);

  addComment('Set wget progress option.');
  addLine(
    "wget --help | grep -q '\\--show-progress' && _PROGRESS_OPT=\"-q --show-progress --progress=bar\" || _PROGRESS_OPT=''",
    1,
  );

  addComment('Create a temp directory and run there.');
  addLine(`${tempDir}=$(mktemp -d) && cd $${tempDir}`, 1);

  echo(`This script will install Linux ${version} on your system.`, 1);

  echo('Downloading binaries...');
  binariesUrls.forEach((url) => {
    addLine(`wget $_PROGRESS_OPT ${url}`);
  });
  addLine();

  echo('Installing...');
  addLine(`sudo dpkg -i ${binariesFiles.join(' ')}`, 1);

  addComment('Delete temporary directory.');
  echo('Cleaning up...');
  addLine(`sudo rm -rf $${tempDir}`, 1);

  echo('Installation complete!');
  echo(
    "It's recommended to restart your computer immediately for the changes to take effect.",
  );
  echo(`${origin}/kernel/${version}#${platform}`);

  return script;
};

const generateInstallScript = async (origin, versionStr, platform, variant) => {
  const response = await fetch(`${origin}/api/kernel/${versionStr}`);
  const json = await response.json();

  const { success, data, error } = json;
  if (!success && error) {
    return error.message;
  }

  const { count, results } = data;
  if (count === 0) {
    return 'No results';
  }

  const { version, kernelUrl, builds } = results[0];

  const build = builds.find((b) => b.platform === platform);
  const { buildStatus, binaries } = build;
  if (!buildStatus) {
    return 'Build failed';
  }

  const selectedBinaries = binaries.filter(
    ({ fileName }) => fileName.includes(variant) || fileName.includes('_all'),
  );

  return buildScript(selectedBinaries, version, kernelUrl, origin, platform);
};

const controller = async (req, res) => {
  const { protocol, headers, params } = req;
  const origin = `${protocol}://${headers.host}`;

  const { version, platform, variant } = params;
  const result = await generateInstallScript(
    origin,
    version,
    platform,
    variant,
  );
  res.setHeader('application-type', 'text-plain');
  res.end(result);
};

module.exports = { generateInstallScript, controller };

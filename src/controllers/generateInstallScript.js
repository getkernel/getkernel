const fetch = require('isomorphic-unfetch');

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

  const { version, kernelUrl, urls, builds } = results[0];
  console.log(version, kernelUrl, urls);

  const build = builds.find((b) => b.platform === platform);
  const { buildStatus, binaries } = build;
  if (!buildStatus) {
    return 'Build failed';
  }

  const selectedBinaries = binaries.filter(
    ({ fileName }) => fileName.includes(variant) || fileName.includes('_all'),
  );

  let script = '';
  const addLine = (line) => {
    script += `${line || ''}\n`;
  };
  const addComment = (comment) => {
    script += `# ${comment}\n`;
  };

  addLine('#!/bin/bash');
  addLine('set -ue');
  addLine();

  addComment('Shows colorful output messages.');
  addLine(`show_msg () { 
    echo -e "\\e[33m$1\\e[0m"
}`);
  addLine();

  addComment('Set wget progress option.');
  addLine(
    "wget --help | grep -q '\\--show-progress' && _PROGRESS_OPT='-q --show-progress --progress=bar' || _PROGRESS_OPT=''",
  );
  addLine();

  addComment('Create a temp directory and run there.');
  addLine('_TMP_DIR=$(mktemp -d) && cd $_TMP_DIR');
  addLine();

  addLine(
    `show_msg "This script will install Linux ${version} on your system."`,
  );
  addLine();

  addLine('show_msg "Downloading binaries..."');
  selectedBinaries.forEach(({ fileName }) => {
    addLine(`wget $_PROGRESS_OPT ${kernelUrl}/${fileName}`);
  });

  return script;
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

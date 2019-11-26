import fetch from 'isomorphic-unfetch';
import cheerio from 'cheerio';
import Compare from '../utils/Compare';
import ApiResponseKernel from '../models/ApiResponseKernel';
import { BASE_URL } from '../constants';

const fetchVersion = async (version) => {
  const versionStr = version.toLowerCase().startsWith('v')
    ? version
    : `v${version}`;
  const baseUrl = `${BASE_URL}/${versionStr}`;

  const apiResponse = new ApiResponseKernel(baseUrl, versionStr);

  const files = {};
  let builtInfo = [];
  let checksums = [];

  try {
    // Fetch main html file.
    const resMain = await fetch(baseUrl);
    const bodyMain = await resMain.text();
    const $_main = cheerio.load(bodyMain);

    // Fetch and parse BUILT file.
    const resBuilt = await fetch(`${baseUrl}/BUILT`);
    const bodyBuilt = await resBuilt.text();
    builtInfo = bodyBuilt
      .split('\n')
      .map((line) => line.toLowerCase())
      .filter((line) => line.includes('status'))
      .map((line) => {
        const [, token] = line.split(':').map((l) => l.trim());
        const [platform, status] = token.split(' ');
        return {
          platform,
          status: status === '0',
        };
      });

    // Fetch and parse CHECKSUMS file.
    const resChecksums = await fetch(`${baseUrl}/CHECKSUMS`);
    const bodyChecksums = await resChecksums.text();
    checksums = bodyChecksums
      .split('\n')
      .filter((line) => line.includes('.deb'))
      .map((line) => {
        const [sum, file] = line.split('  ');
        return { file, sum };
      });

    // Loop over table rows and extract necessary information.
    $_main('table')
      .find('tr')
      .each((_, elem) => {
        const tds = $_main(elem).find('td');
        if (tds.length === 0) return true;

        // Extract file name, file size, platform and last modified date.
        const fileName = tds
          .eq(1)
          .text()
          .trim();
        const lastModified = tds
          .eq(2)
          .text()
          .trim();
        const fileSize = tds
          .eq(3)
          .text()
          .trim();

        if (!fileName.endsWith('.deb')) return true;

        const [platform] = fileName
          .substring(fileName.lastIndexOf('_') + 1)
          .split('.');

        if (!files[platform]) {
          files[platform] = [];
        }

        return files[platform].push({
          fileName,
          fileSize,
          lastModified,
        });
      });

    // Decide platforms data to use to generate files array.
    const platforms = builtInfo.length
      ? builtInfo.filter(({ platform }) => platform !== 'binary-headers')
      : Object.keys(files)
          .map((platform) => ({
            platform,
            status: true,
          }))
          .filter(({ platform }) => platform !== 'all')
          .sort((a, b) => Compare.string()(a.platform, b.platform));

    platforms.forEach(({ platform, status }) => {
      const platformFiles = [...files.all, ...(files[platform] || [])];

      // Build binaries array with checksums.
      const binaries = platformFiles
        .map((file) => {
          const [sha1, sha256] = checksums.filter(
            (c) => c.file === file.fileName,
          );

          if (!(sha1 && sha256)) {
            return {
              ...file,
            };
          }

          return {
            ...file,
            sha1: sha1.sum,
            sha256: sha256.sum,
          };
        })
        .sort((a, b) => Compare.string('asc', '_all')(a.fileName, b.fileName));

      return apiResponse.addBuildData(platform, status, binaries);
    });

    if (!apiResponse.isDataAvailable()) {
      apiResponse.setFailed('Unable to fetch data', 400);
    }
  } catch (error) {
    apiResponse.setFailed(error.message);
  }

  return apiResponse;
};

export default fetchVersion;

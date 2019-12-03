import fetch from 'isomorphic-unfetch';
import cheerio from 'cheerio';
import Compare from '../utils/Compare';
import ApiResponse from '../models/ApiResponse';
import BinaryPackage from '../models/BinaryPackage';
import Checksum from '../models/Checksum';
import Kernel from '../models/Kernel';
import { BASE_URL } from '../constants';

const fetchVersion = async (version) => {
  const versionStr = version.toLowerCase().startsWith('v')
    ? version
    : `v${version}`;
  const baseUrl = `${BASE_URL}/${versionStr}`;

  const apiResponse = new ApiResponse(baseUrl);
  const kernel = new Kernel(versionStr, baseUrl);

  const files = {};
  let builtInfo = [];
  let checksums = [];

  try {
    // Fetch main html file.
    const resMain = await fetch(baseUrl);
    const bodyMain = await resMain.text();
    const $ = cheerio.load(bodyMain);

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
      .map((line) => Checksum.parseLine(line));

    // Loop over table rows and extract necessary information.
    $('table')
      .find('tr')
      .each((_, elem) => {
        const tds = $(elem).find('td');
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

        // Grab checksums
        const [c1, c2] = checksums.filter((c) => c.fileName === fileName);
        const sha1 = c1.sha1 || null;
        const sha256 = c2.sha256 || null;

        return files[platform].push(
          new BinaryPackage(fileName, fileSize, lastModified, sha1, sha256),
        );
      });

    // Decide platforms data to use to generate files array.
    const platforms = builtInfo.length
      ? builtInfo.filter(({ platform }) => platform !== 'binary-headers')
      : Object.keys(files)
          .map((platform) => ({
            platform,
            status: true,
          }))
          .filter(({ platform }) => platform !== 'all');

    // Sort by platform - ascending order
    platforms.sort((a, b) => Compare.string()(a.platform, b.platform));

    platforms.forEach(({ platform, status }) => {
      const binaries = [...files.all, ...(files[platform] || [])].sort((a, b) =>
        Compare.string('asc', '_all')(a.fileName, b.fileName),
      );

      kernel.addBuild(platform, status, binaries);
    });

    // Append kernel data to response.
    apiResponse.addData(kernel);

    if (!(apiResponse.hasData() && kernel.hasBuilds())) {
      apiResponse.setFailed('Unable to fetch data', 400);
    }
  } catch (error) {
    apiResponse.setFailed(error.message);
  }

  return apiResponse;
};

export default fetchVersion;

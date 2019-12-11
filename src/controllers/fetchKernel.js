import { getTableData, getBuiltInfo, getChecksumData } from './helpers';
import ApiResponse from '../models/ApiResponse';
import Kernel from '../models/Kernel';
import BinaryPackage from '../models/BinaryPackage';
import Compare from '../utils/Compare';
import { BASE_URL } from '../constants';

const fetchKernel = async (version, tag = null) => {
  let versionStr;
  let baseUrl;

  if (tag) {
    versionStr = version;
    baseUrl = `${BASE_URL}/${tag}/${versionStr}`;
  } else {
    versionStr = version.toLowerCase().startsWith('v')
      ? version
      : `v${version}`;
    baseUrl = `${BASE_URL}/${versionStr}`;
  }

  const apiResponse = new ApiResponse(baseUrl);
  const kernel = new Kernel(versionStr, baseUrl, tag);

  const files = {};

  try {
    const mainData = await getTableData(baseUrl);
    const builtInfo = await getBuiltInfo(baseUrl);
    const checksums = await getChecksumData(baseUrl);

    // Extract necessary information.
    mainData.forEach(({ entryName, lastModified, size }) => {
      if (!entryName.endsWith('.deb')) return false;

      const [platform] = entryName
        .substring(entryName.lastIndexOf('_') + 1)
        .split('.');

      if (!files[platform]) {
        files[platform] = [];
      }

      // Grab checksums.
      const [c1, c2] = checksums.filter((c) => c.fileName === entryName);
      const sha1 = c1.sha1 || null;
      const sha256 = c2.sha256 || null;

      files[platform].push(
        new BinaryPackage(entryName, size, lastModified, sha1, sha256),
      );
      return true;
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

export default fetchKernel;

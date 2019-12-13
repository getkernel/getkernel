import { getTableData, getBuiltInfo, getChecksumData } from './helpers';
import ApiResponse from '../models/ApiResponse';
import Kernel from '../models/Kernel';
import BinaryPackage from '../models/BinaryPackage';
import Compare from '../utils/Compare';
import BinaryUtils from '../utils/BinaryUtils';
import { BASE_URL } from '../constants';

const fetchKernel = async (versionStr, tag = null) => {
  let versionName;
  let baseUrl;

  if (tag) {
    versionName = versionStr;
    baseUrl = `${BASE_URL}/${tag}/${versionName}`;
  } else {
    versionName = versionStr.toLowerCase().startsWith('v')
      ? versionStr
      : `v${versionStr}`;
    baseUrl = `${BASE_URL}/${versionName}`;
  }

  const apiResponse = new ApiResponse(baseUrl);
  const kernel = new Kernel(versionName, versionName, baseUrl, tag);

  const files = {};

  try {
    const mainData = await getTableData(baseUrl);
    const builtInfo = await getBuiltInfo(baseUrl);
    const checksums = await getChecksumData(baseUrl);

    if (tag) {
      // Extract version name from checksums.
      const { tokenStart } = BinaryUtils.extractTokens(checksums);
      kernel.versionName = `v${tokenStart}`;
    }

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

      return files[platform].push(
        new BinaryPackage(entryName, size, lastModified, sha1, sha256),
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

export default fetchKernel;

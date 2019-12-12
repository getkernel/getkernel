import { getTableData, getChecksumData } from './helpers';
import ApiResponse from '../models/ApiResponse';
import ExtraIndexObject from '../models/ExtraIndexObject';
import Compare from '../utils/Compare';
import BinaryUtils from '../utils/BinaryUtils';
import { BASE_URL } from '../constants';

const fetchExtras = async () => {
  const TAGS = [
    'daily',
    'drm-intel-next',
    'drm-intel-nightly',
    'drm-next',
    'drm-tip',
  ];

  const apiResponse = new ApiResponse(`${BASE_URL}/`);

  const getTagUrl = (tag) => `${BASE_URL}/${tag}/`;

  try {
    const promises = TAGS.map((tag) => {
      return new Promise((resolve, reject) => {
        getTableData(getTagUrl(tag))
          .then((data) => {
            resolve({
              tag,
              data,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    });

    const results = await Promise.all(promises);

    const versionPromises = results.map(({ tag, data }) => {
      return new Promise((resolve, reject) => {
        // Extract version info for every entry in the list.
        const inner = data
          .filter(({ entryName }) => entryName.toLowerCase() !== 'current')
          .map(({ entryName, entrySlug, lastModified }) => {
            return new Promise((res, rej) => {
              getChecksumData(`${getTagUrl(tag)}${entryName}`)
                .then((checksums) => {
                  const { tokenStart } = BinaryUtils.extractTokens(checksums);

                  const obj = new ExtraIndexObject(
                    `v${tokenStart}`,
                    lastModified,
                    entrySlug,
                    tag,
                  );
                  res(obj);
                })
                .catch((e) => rej(e));
            });
          });

        return Promise.all(inner)
          .then((items) => {
            // Sort items by date - desc.
            items.sort((a, b) =>
              Compare.date('desc')(a.lastModified, b.lastModified),
            );

            resolve({
              tag,
              items,
            });
          })
          .catch((e) => reject(e));
      });
    });

    const resFinal = await Promise.all(versionPromises);

    resFinal.forEach(({ tag, items }) => {
      const tagData = {
        tag,
        tagUrl: getTagUrl(tag),
        items,
      };
      apiResponse.addData(tagData);
    });

    if (apiResponse.hasData()) {
      apiResponse.sortData((a, b) => Compare.string('asc')(a.tag, b.tag));
    } else {
      // Set response as failed.
      apiResponse.setFailed('Unable to get data', 400);
    }
  } catch (error) {
    apiResponse.setFailed(error.message);
  }

  return apiResponse;
};

export default fetchExtras;

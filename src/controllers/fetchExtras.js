import fetch from 'isomorphic-unfetch';
import extractTableData from './extractTableData';
import ApiResponse from '../models/ApiResponse';
import Compare from '../utils/Compare';
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
        fetch(getTagUrl(tag))
          .then((data) => data.text())
          .then((body) => {
            resolve({
              tag,
              body,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    });

    const results = await Promise.all(promises);

    results.forEach(({ tag, body }) => {
      const tagData = {
        tag,
        tagUrl: getTagUrl(tag),
        items: [],
      };
      extractTableData(body).forEach(({ entryName, lastModified }) => {
        if (entryName.toLowerCase() !== 'current') {
          tagData.items.push({ itemName: entryName, lastModified });
        }
      });
      // Sort items by date - desc.
      tagData.items.sort((a, b) =>
        Compare.date('desc')(a.lastModified, b.lastModified),
      );
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

import fetch from 'isomorphic-unfetch';
import extractTableData from './extractTableData';
import ApiResponse from '../models/ApiResponse';
import Compare from '../utils/Compare';
import { BASE_URL } from '../constants';

const fetchExtras = async () => {
  const EXTRA_DIRS = [
    'daily',
    'drm-intel-next',
    'drm-intel-nightly',
    'drm-next',
    'drm-tip',
  ];

  const apiResponse = new ApiResponse(`${BASE_URL}/`);

  const getTipUrl = (tip) => `${BASE_URL}/${tip}/`;

  try {
    const promises = EXTRA_DIRS.map((tip) => {
      return new Promise((resolve, reject) => {
        fetch(getTipUrl(tip))
          .then((data) => data.text())
          .then((body) => {
            resolve({
              tip,
              body,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    });

    const results = await Promise.all(promises);

    results.forEach(({ tip, body }) => {
      const tipData = {
        tip,
        tipUrl: getTipUrl(tip),
        items: [],
      };
      extractTableData(body).forEach(({ entryName, lastModified }) => {
        if (entryName.toLowerCase() !== 'current') {
          tipData.items.push({ itemName: entryName, lastModified });
        }
      });
      // Sort items by date - desc.
      tipData.items.sort((a, b) =>
        Compare.date('desc')(a.lastModified, b.lastModified),
      );
      apiResponse.addData(tipData);
    });

    if (apiResponse.hasData()) {
      apiResponse.sortData((a, b) => Compare.string('asc')(a.tip, b.tip));
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

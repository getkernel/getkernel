import fetch from 'isomorphic-unfetch';
import extractTableData from './extractTableData';
import ApiResponse from '../models/ApiResponse';
import ServerIndexObject from '../models/ServerIndexObject';
import Compare from '../utils/Compare';
import { BASE_URL } from '../constants';

const fetchIndex = async () => {
  const apiResponse = new ApiResponse(`${BASE_URL}/`);

  try {
    const response = await fetch(BASE_URL);
    const bodyMain = await response.text();

    extractTableData(bodyMain).forEach(({ entryName, lastModified }) => {
      const siObject = new ServerIndexObject(entryName, lastModified);
      apiResponse.addData(siObject);
    });

    if (apiResponse.hasData()) {
      // Sort data by date - descending order
      apiResponse.sortData((a, b) =>
        Compare.date('desc')(a.lastModified, b.lastModified),
      );
    } else {
      // Set response as failed.
      apiResponse.setFailed('Unable to get data', 400);
    }
  } catch (error) {
    apiResponse.setFailed(error.message);
  }

  return apiResponse;
};

export default fetchIndex;

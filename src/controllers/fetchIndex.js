import { getTableData } from './helpers';
import ApiResponse from '../models/ApiResponse';
import ServerIndexObject from '../models/ServerIndexObject';
import Compare from '../utils/Compare';
import { BASE_URL } from '../constants';

export const fetchIndex = async () => {
  const apiResponse = new ApiResponse(`${BASE_URL}/`);

  try {
    const mainData = await getTableData(BASE_URL);

    mainData.forEach(({ entryName, lastModified }) => {
      // Grab only the entries that start with the letter "v".
      if (entryName.startsWith('v')) {
        const siObject = new ServerIndexObject(entryName, lastModified);
        apiResponse.addData(siObject);
      }
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

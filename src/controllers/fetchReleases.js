import fetch from 'isomorphic-unfetch';
import ApiResponse from '../models/ApiResponse';
import KernelOrgResponse from '../models/KernelOrgResponse';
import { KERNEL_ORG_RELEASES_URL } from '../constants';

export const fetchReleases = async () => {
  const apiResponse = new ApiResponse(KERNEL_ORG_RELEASES_URL);

  try {
    const response = await fetch(KERNEL_ORG_RELEASES_URL);
    const json = await response.json();

    apiResponse.addData(KernelOrgResponse.from(json));

    if (!apiResponse.hasData()) {
      // Set response as failed.
      apiResponse.setFailed('Unable to get data', 400);
    }
  } catch (error) {
    apiResponse.setFailed(error.message);
  }

  return apiResponse;
};

import fetch from 'isomorphic-unfetch';
import { ORIGIN } from '../constants';

/**
 * Fetches kernel data for the specified version from API.
 * @param {String} versionStr Version string
 * @returns {ApiResponse} ApiResponse object
 */
const getKernel = async (versionStr) => {
  const res = await fetch(`${ORIGIN}/api/kernel/${versionStr}`);
  const json = await res.json();
  return json;
};

export default getKernel;

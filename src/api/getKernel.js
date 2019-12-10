import fetch from 'isomorphic-unfetch';
import { ORIGIN } from '../constants';

/**
 * Fetches kernel data for the specified version from API.
 * @param {String} versionStr Version string
 * @param {String} tip The tip that the version belongs to (optional).
 * @returns {ApiResponse} ApiResponse object
 */
const getKernel = async (versionStr, tip = null) => {
  let url = `${ORIGIN}/api/kernel/${versionStr}`;
  if (tip) url += `?tip=${tip}`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export default getKernel;

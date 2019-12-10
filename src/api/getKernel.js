import fetch from 'isomorphic-unfetch';
import { ORIGIN } from '../constants';

/**
 * Fetches kernel data for the specified version from API.
 * @param {String} versionStr Version string
 * @param {String} tag The tag that the version belongs to (optional).
 * @returns {ApiResponse} ApiResponse object
 */
const getKernel = async (versionStr, tag = null) => {
  let url = `${ORIGIN}/api/kernel/${versionStr}`;
  if (tag) url += `?tag=${tag}`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export default getKernel;

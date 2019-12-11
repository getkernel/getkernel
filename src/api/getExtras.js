import fetch from 'isomorphic-unfetch';
import { ORIGIN } from '../constants';

/**
 * Fetches additional kernel data from API.
 * @returns {ApiResponse} ApiResponse object
 */
const getExtras = async () => {
  const res = await fetch(`${ORIGIN}/api/extras`);
  const json = await res.json();
  return json;
};

export default getExtras;

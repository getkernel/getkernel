import fetch from 'isomorphic-unfetch';
import { ORIGIN } from '../constants';

/**
 * Fetches the latest releases data from kernel.org.
 * @returns {ApiResponse} ApiResponse object
 */
const getReleases = async () => {
  const res = await fetch(`${ORIGIN}/api/releases`);
  const json = await res.json();
  return json;
};

export default getReleases;

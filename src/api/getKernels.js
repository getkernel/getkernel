import fetch from 'isomorphic-unfetch';
import { ORIGIN } from '../constants';

/**
 * Fetches kernels index data from API.
 * @returns {ApiResponse} ApiResponse object
 */
const getKernels = async () => {
  const res = await fetch(`${ORIGIN}/api/kernels`);
  const json = await res.json();
  return json;
};

export default getKernels;

import fetch from 'isomorphic-unfetch';
import { API_ORIGIN } from '../constants';

/**
 * Fetches kernels index data from API.
 * @returns {ApiResponse} ApiResponse object
 */
const getKernels = async () => {
  const res = await fetch(`${API_ORIGIN}/api/kernels`);
  const json = await res.json();
  return json;
};

export default getKernels;

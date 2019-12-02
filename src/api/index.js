import fetch from 'isomorphic-unfetch';
import fetchIndex from './fetchIndex';
import fetchKernel from './fetchKernel';
import appConfig from '../app.config';

const ORIGIN = process.browser ? window.location.origin : appConfig.baseUrl;

/**
 * Fetches kernels index data from Ubuntu build server.
 * @returns {ApiResponse} ApiResponse object
 */
const getKernels = async () => {
  const res = await fetch(`${ORIGIN}/api/kernels`);
  const json = await res.json();
  return json;
};

/**
 * Fetches specified kernel data from Ubuntu build server.
 * @param {String} versionStr Version string
 * @returns {ApiResponse} ApiResponse object
 */
const getKernel = async (versionStr) => {
  const res = await fetch(`${ORIGIN}/api/kernel/${versionStr}`);
  const json = await res.json();
  return json;
};

export { getKernels, getKernel, fetchIndex, fetchKernel };

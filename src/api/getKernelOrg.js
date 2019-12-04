import fetch from 'isomorphic-unfetch';
import { corsAnywhere } from '../utils/DownloadUtils';
import { KERNEL_ORG_RELEASES_URL } from '../constants';

/**
 * Fetches the latest releases data from kernel.org.
 * @returns {KernelOrgResponse} KernelOrgResponse object
 */
const getKernelOrg = async () => {
  const res = await fetch(corsAnywhere(KERNEL_ORG_RELEASES_URL));
  const json = await res.json();
  return json;
};

export default getKernelOrg;

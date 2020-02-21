import fetch from 'isomorphic-unfetch';
import Checksum from '../../models/Checksum';
import StringUtils from '../../utils/StringUtils';

/**
 * Fetches and parses the CHECKSUMS file.
 * @param {String} baseUrl Base url
 */
const getChecksumData = async (baseUrl) => {
  const response = await fetch(`${baseUrl}/CHECKSUMS`);
  const body = await response.text();
  return StringUtils.splitText(body)
    .filter((line) => line.includes('.deb'))
    .map((line) => Checksum.parseLine(line));
};

export default getChecksumData;

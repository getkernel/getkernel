import fetch from 'isomorphic-unfetch';
import StringUtils from '../../utils/StringUtils';

/**
 * Fetches and parses the BUILT file.
 * @param {String} baseUrl Base url
 */
const getBuiltInfo = async (baseUrl) => {
  const response = await fetch(`${baseUrl}/BUILT`);
  const body = await response.text();
  return StringUtils.splitText(body)
    .map((line) => line.toLowerCase())
    .filter((line) => line.includes('status'))
    .map((line) => {
      const [, token] = line.split(':').map((l) => l.trim());
      const [platform, status] = token.split(' ');
      return {
        platform,
        status: status === '0',
      };
    });
};

export default getBuiltInfo;

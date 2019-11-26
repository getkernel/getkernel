import fetch from 'isomorphic-unfetch';
import cheerio from 'cheerio';
import ApiResponseIndex from '../models/ApiResponseIndex';
import { BASE_URL } from '../constants';

const fetchIndex = async () => {
  const apiResponse = new ApiResponseIndex();
  apiResponse.baseUrl = `${BASE_URL}/`;

  try {
    const response = await fetch(BASE_URL);
    const body = await response.text();
    const $ = cheerio.load(body);

    $('table')
      .find('tr')
      .each((i, elem) => {
        const tds = $(elem).find('td');
        if (tds.length === 0) return true;

        // Extract version and last modified date.
        const version = tds.eq(1);
        const lastModified = tds
          .eq(2)
          .text()
          .trim();

        const versionName = version
          .text()
          .trim()
          .replace(/\//g, '');

        const versionSlug = version
          .find('a')
          .attr('href')
          .trim()
          .replace(/\//g, '');

        if (versionSlug.includes('~kernel-ppa')) return true;

        return apiResponse.addEntry(versionName, lastModified);
      });

    if (apiResponse.isDataAvailable()) {
      // Sort data by date - descending order
      apiResponse.sortEntries('date', 'desc');
    } else {
      // Set response as failed.
      apiResponse.setFailed('Unable to get data', 400);
    }
  } catch (error) {
    apiResponse.setFailed(error.message);
  }

  return apiResponse;
};

export default fetchIndex;

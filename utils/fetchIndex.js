import fetch from 'isomorphic-unfetch';
import cheerio from 'cheerio';
import moment from 'moment';
import { BASE_URL } from '../constants';

const fetchIndex = async () => {
  const result = {
    success: true,
    data: {
      base_url: `${BASE_URL}/`,
      entries: [],
    },
  };

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

        result.data.entries.push({
          version_name: versionName,
          version_slug: versionSlug,
          last_modified: moment(lastModified),
        });
      });

    // Sort data by date - descending order
    result.data.entries.sort((a, b) => b.last_modified - a.last_modified);
  } catch (error) {
    result.success = false;
    result.error = error.message;
    result.data = null;
  }

  return result;
};

export default fetchIndex;

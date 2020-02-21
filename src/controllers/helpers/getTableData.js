import fetch from 'isomorphic-unfetch';
import cheerio from 'cheerio';

/**
 * Fetches and parses main html file.
 * @param {String} baseUrl Base url
 */
const getTableData = async (baseUrl) => {
  const response = await fetch(baseUrl);
  const body = await response.text();

  const $ = cheerio.load(body);
  const entries = [];

  $('table')
    .find('tr')
    .each((_, elem) => {
      const tds = $(elem).find('td');
      if (tds.length === 0) return true;

      // Extract data.
      const entry = tds.eq(1);
      const lastModified = tds
        .eq(2)
        .text()
        .trim();
      const size = tds
        .eq(3)
        .text()
        .trim();

      const entryName = entry
        .text()
        .trim()
        .replace(/\//g, '');

      const entrySlug = entry
        .find('a')
        .attr('href')
        .trim()
        .replace(/\//g, '');

      if (entrySlug.includes('~kernel-ppa')) return true;

      return entries.push({
        entryName,
        entrySlug,
        lastModified,
        size: size !== '-' ? size : null,
      });
    });
  return entries;
};

export default getTableData;

import cheerio from 'cheerio';

const extractTableData = (htmlText) => {
  const $ = cheerio.load(htmlText);
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
        lastModified,
        size: size !== '-' ? size : null,
      });
    });
  return entries;
};

export default extractTableData;

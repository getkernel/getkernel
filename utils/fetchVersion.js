import fetch from 'isomorphic-unfetch';
import cheerio from 'cheerio';
import MarkdownIt from 'markdown-it';
import { BASE_URL } from '../constants';

const fetchVersion = async (version) => {
  const result = {
    success: true,
    data: [],
  };

  if (!version.includes('v')) version = `v${version}`;
  const md = new MarkdownIt();
  const kernelBaseUrl = `${BASE_URL}/${version}`;

  try {
    // Append global info to response object.
    result.base_url = `${kernelBaseUrl}/`;
    result.changes = `${kernelBaseUrl}/CHANGES`;
    result.gpg_key = `${kernelBaseUrl}/CHECKSUMS.gpg`;

    // Fetch README and parse as HTML.
    const response = await fetch(`${kernelBaseUrl}/README`);
    const body = await response.text();
    const html = md.render(body);
    const $ = cheerio.load(html);

    // Fetch CHECKSUMS.
    const checksumsResponse = await fetch(`${kernelBaseUrl}/CHECKSUMS`);
    const checksumBody = await checksumsResponse.text();
    const checksums = checksumBody.split('\n').map((line) => {
      const [sum, file] = line.split('  ');
      return { sum, file };
    });

    // Loop over newly generated 'p' tags and extract necessary information.
    $('p').each((i, elem) => {
      const entry = $(elem)
        .text()
        .trim();
      if (!entry.includes('Build for')) return true;

      const binaries = entry.split('\n');
      let signature = binaries.shift();
      signature = signature.replace('Build for', '').trim();
      const [platform, status] = signature.split(' ');

      // Build binaries array with checksums.
      const binariesData = binaries.map((binary) => {
        const [sha1, sha256] = checksums.filter((c) => c.file === binary);
        if (!sha1 || !sha256) {
          return {
            binary,
          };
        }
        return {
          binary,
          sha1: sha1.sum,
          sha256: sha256.sum,
        };
      });

      result.data.push({
        platform,
        status,
        binaries: binariesData,
        log: `BUILD.LOG.${platform}`,
      });
    });

    if (!result.data.length) {
      throw new Error('Unable to fetch data');
    }
  } catch (error) {
    result.success = false;
    result.error = error.message;
    result.data = null;
  }

  return result;
};

export default fetchVersion;

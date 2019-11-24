import fetch from 'isomorphic-unfetch';
import cheerio from 'cheerio';
import moment from 'moment';
import Compare from '../utils/Compare';
import { BASE_URL, SERVER_DATE_FORMAT } from '../constants';

const fetchVersion = async (version) => {
  if (!version.includes('v')) version = `v${version}`;
  const kernelBaseUrl = `${BASE_URL}/${version}`;

  const result = {
    success: true,
    data: {
      version,
      base_url: `${kernelBaseUrl}/`,
      changes: `${kernelBaseUrl}/CHANGES`,
      checksums: `${kernelBaseUrl}/CHECKSUMS`,
      gpg_key: `${kernelBaseUrl}/CHECKSUMS.gpg`,
      files: [],
    },
  };

  const files = {};
  let builtInfo = [];
  let checksums = [];

  try {
    // Fetch main html file.
    const resMain = await fetch(kernelBaseUrl);
    const bodyMain = await resMain.text();
    const $_main = cheerio.load(bodyMain);

    // Fetch and parse BUILT file.
    const resBuilt = await fetch(`${kernelBaseUrl}/BUILT`);
    const bodyBuilt = await resBuilt.text();
    builtInfo = bodyBuilt
      .split('\n')
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

    // Fetch and parse CHECKSUMS file.
    const resChecksums = await fetch(`${kernelBaseUrl}/CHECKSUMS`);
    const bodyChecksums = await resChecksums.text();
    checksums = bodyChecksums
      .split('\n')
      .filter((line) => line.includes('.deb'))
      .map((line) => {
        const [sum, file] = line.split('  ');
        return { file, sum };
      });

    // Loop over table rows and extract necessary information.
    $_main('table')
      .find('tr')
      .each((_, elem) => {
        const tds = $_main(elem).find('td');
        if (tds.length === 0) return true;

        // Extract file name, file size, platform and last modified date.
        const fileName = tds
          .eq(1)
          .text()
          .trim();
        const lastModified = tds
          .eq(2)
          .text()
          .trim();
        const fileSize = tds
          .eq(3)
          .text()
          .trim();

        if (!fileName.endsWith('.deb')) return true;

        const [platform] = fileName
          .substring(fileName.lastIndexOf('_') + 1)
          .split('.');

        if (!files[platform]) {
          files[platform] = [];
        }

        files[platform].push({
          file_name: fileName,
          file_size: fileSize,
          last_modified: moment(lastModified, SERVER_DATE_FORMAT),
        });
      });

    // Decide platforms data to use to generate files array.
    const platforms = builtInfo.length
      ? builtInfo.filter(({ platform }) => platform !== 'binary-headers')
      : Object.keys(files)
          .map((platform) => ({
            platform,
            status: true,
          }))
          .filter(({ platform }) => platform !== 'all')
          .sort(Compare.prop('platform'));

    result.data.files = platforms.map(({ platform, status }) => {
      const platformFiles = [...files['all'], ...(files[platform] || [])];

      // Build binaries array with checksums.
      const binaries = platformFiles
        .map((file) => {
          const [sha1, sha256] = checksums.filter(
            (c) => c.file === file.file_name
          );

          if (!(sha1 && sha256)) {
            return {
              ...file,
            };
          }

          return {
            ...file,
            sha1: sha1.sum,
            sha256: sha256.sum,
          };
        })
        .sort(Compare.prop('file_name', 'asc', '_all'));

      return {
        platform,
        build_status: status,
        binaries,
        log: `BUILD.LOG.${platform}`,
      };
    });

    if (!result.data.files.length) {
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

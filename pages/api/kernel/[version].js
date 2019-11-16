import { fetchVersion } from '../../../src/utils';

export default async (req, res) => {
  const {
    query: { version },
    method,
  } = req;

  switch (method) {
    case 'GET':
      const results = await fetchVersion(version);
      res.status(200).json(results);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

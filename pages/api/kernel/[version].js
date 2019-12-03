import { fetchKernel } from '../../../src/controllers';

export default async (req, res) => {
  const {
    query: { version },
    method,
  } = req;

  switch (method) {
    case 'GET': {
      const results = await fetchKernel(version);
      res.status(200).json(results);
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

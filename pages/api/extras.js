import { fetchExtras } from '../../src/controllers';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const result = await fetchExtras();
      res.status(result.statusCode).json(result);
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const express = require('express');
const next = require('next');

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const { controller } = require('./controllers/generateInstallScript');

(async () => {
  await app.prepare();
  const server = express();

  server.get('/get/:version/:platform/:variant/kernel.sh', controller);

  server.get('*', (req, res) => handle(req, res));

  const s = await server.listen(port);
  console.log(`> Ready on http://localhost:${s.address().port}`); // eslint-disable-line no-console
})();

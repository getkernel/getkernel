/* eslint-disable import/no-extraneous-dependencies, func-names, no-console */
const ngrok = require('ngrok');

(async function() {
  const url = await ngrok.connect(3000);
  console.log(url);
})();
/* eslint-enable import/no-extraneous-dependencies, func-names, no-console */

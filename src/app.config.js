import nowConfig from '../now.json';

export default {
  origin: `https://${nowConfig.name}.now.sh`,
  name: nowConfig.name,
  slogan: 'The Kernel Store for Ubuntu Derivatives',
  smoothScrollDuration: 500,
  downloadInterval: 1500,
};

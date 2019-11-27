import Compare from './Compare';

export default (binaries) => {
  const [base, ...rest] = binaries;
  const variants = new Set();

  const tokenBase = base.fileName
    .replace('linux-headers-', '')
    .replace('_all.deb', '');

  const [tokenStart, tokenFinish] = tokenBase.split('_');

  rest.forEach(({ fileName }) => {
    const variant = fileName.substring(
      fileName.indexOf(tokenStart) + tokenStart.length + 1,
      fileName.indexOf(tokenFinish) - 1,
    );
    variants.add(variant);
  });

  return [...variants].sort(Compare.string());
};

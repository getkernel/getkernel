import Compare from './Compare';

export default (binaries) => {
  const [base, ...rest] = binaries;
  const variants = new Set();

  const tokenBase = base.file_name
    .replace('linux-headers-', '')
    .replace('_all.deb', '');

  const [tokenStart, tokenFinish] = tokenBase.split('_');

  rest.forEach(({ file_name }) => {
    const variant = file_name.substring(
      file_name.indexOf(tokenStart) + tokenStart.length + 1,
      file_name.indexOf(tokenFinish) - 1
    );
    variants.add(variant);
  });

  return [...variants].sort(Compare.string());
};

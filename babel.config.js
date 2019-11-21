module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
    'next/babel',
  ],
  plugins: [
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-class-properties',
  ],
};

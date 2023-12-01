module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@assets': './src/assets/',
            '@components': './src/components/',
            '@navigation': './src/navigation/',
            '@screens': './src/screens/',
            '@types': './src/types/',
            '@utils': './src/utils/',
            '@translations': './src/translations/',
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};

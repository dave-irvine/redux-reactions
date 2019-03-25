module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'index.js',
    globalObject: "(typeof self != 'undefined' ? self : this)",
    libraryTarget: 'umd',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
    ],
  },
};

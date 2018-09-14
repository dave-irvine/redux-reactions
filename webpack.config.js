module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: "index.js",
    libraryTarget: "umd"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: [/node_modules/]
      }
    ]
  }
};

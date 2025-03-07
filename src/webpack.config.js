const path = require('path');

module.exports = {
  // Other Webpack configurations
  mode: 'development', // or 'production' based on your environment
  devtool: 'source-map', // Ensure source maps are enabled
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/react-github-login/, // Ignore source maps for react-github-login
          /node_modules\/.+/, // Ignore source maps for all other node_modules (optional, if needed)
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Ensure Webpack resolves JavaScript and JSX files
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
};

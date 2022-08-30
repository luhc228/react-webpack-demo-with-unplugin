const path = require('path');
const { webpackCompilationPlugin } = require('./compilation');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: './src/App.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.jsx', '...'],
  },
  cache: {
    type: 'filesystem',
  },
  plugins: [webpackCompilationPlugin()],
};

module.exports = config;

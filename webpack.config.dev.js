const path = require('path');

module.exports = {
  entry: './static/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  watchOptions: {
    ignored: ['node_modules']
  }
};

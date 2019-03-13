var webpack = require('./webpack.config');

module.exports = Object.assign({}, webpack, {
  watch: true,
  watchOptions: {
    ignored: ['node_modules']
  }
});

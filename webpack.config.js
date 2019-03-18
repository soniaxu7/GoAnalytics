const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './static/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.less$/,
        use: [{
            loader: 'style-loader' // creates style nodes from JS strings
          }, {
            loader: 'css-loader' // translates CSS into CommonJS
          }, {
            loader: 'less-loader' // compiles Less to CSS
          }
        ]
      }, {
        type: 'javascript/auto',
        test: /\.json$/,
        exclude: /node_modules/,
        use: ['raw-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },

  plugins: isProduction ? [
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin('./dist/style.css')
  ] : [
    new webpack.HotModuleReplacementPlugin({
        filename: "./dist/style.css"
    })
  ],
  node: {
    fs: "empty"
  }
};

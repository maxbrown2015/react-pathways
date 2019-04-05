const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    client: './pathways/main.jsx',
    admin: './admin_panel/main.jsx',
  },
  output: {
    publicPath: '/dist',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './views/index.html',
      filename: 'client.html',
      chunks: ['client'],

    }),
    new HtmlWebPackPlugin({
      template: './views/index.html',
      filename: 'admin.html',
      chunks: ['admin'],
    }),
  ],
};

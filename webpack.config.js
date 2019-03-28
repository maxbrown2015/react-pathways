const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const config = {
  entry: './public/main.jsx',
  output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
  },
  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use : {
                  loader: "babel-loader"
              }
          },
          {
              test: /\.html$/,
              use: [
                {
                  loader: "html-loader"
                }
              ]
          },      
          {
            test: /\.css$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" }
            ]
          }
      ],
  },
  devServer: {
    publicPath: "/",
    historyApiFallback: true,
  },
  plugins: [
      new HtmlWebPackPlugin({
        template: "./views/index.html",
        filename: "./index.html"
      })
    ],
  mode: "development"
}

module.exports = config;

//export default config;


const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    main: './public/main.jsx',
    admin: './public/components/Root.jsx',
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
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
        filename: "index.html",
        chunks:['main']
      }), 
      new HtmlWebPackPlugin({
        template: "./views/index.html",
        filename: "admin.html",
        chunks:['admin']
      })
    ],
  mode: "development"
}

module.exports = config;

//export default config;


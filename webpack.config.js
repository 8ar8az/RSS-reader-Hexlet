const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const yamlParser = require('js-yaml');
const fs = require('fs');

const textContentFile = path.resolve(__dirname, 'src/templates/text-content.yml');
const textContent = yamlParser.safeLoad(fs.readFileSync(textContentFile, 'UTF-8'));

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      inject: 'head',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      templateParameters: textContent,
    }),
  ],
};

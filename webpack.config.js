const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const exclude = /node_modules/;

function createParser(params) {
  return {
    ...params,
    exclude
  }
}

const imgParser = createParser({
  test: /\.(jpg|png)$/,
  use: ['file-loader']
});

const cssParser = createParser({
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: true,
      },
    },
    'css-loader'
  ]
});

const scssParser = createParser({
  test: /\.scss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: true,
      }
    },
    'css-loader',
    'sass-loader'
  ]
});

const jsParser = createParser({
  test: /\.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-transform-spread'
      ]
    }
  }
});

const ParserRules = [
  cssParser,
  scssParser,
  imgParser,
  jsParser
];

module.exports = {
  entry: './src/_index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  mode: 'none',
  module: {
    rules: ParserRules
  },
  plugins: [
    new TerserPlugin(),
    new MiniCssExtractPlugin()
  ]
}
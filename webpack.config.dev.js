const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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

const pugParser = createParser({
  test: /\.pug$/,
  use: ['pug-loader']
});

const jsParser = createParser({
  test: /\.js$/,
  use: [{
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
  }]
});

const ParserRules = [
  cssParser,
  scssParser,
  imgParser,
  jsParser,
  pugParser
];

module.exports = {
  entry: './src/_index.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    index: 'index.html',
    port: 8000
  },
  module: {
    rules: ParserRules
  },
  plugins: [
    // new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CleanWebpackPlugin({
      // cleanAfterEveryBuildPatterns: ['static*.*', '!static1.js'], // default: [] // удаляет файлы в watch mode
      cleanOnceBeforeBuildPatterns: ['**/*', '!some-folder*'] // default: [] // очистка конкретных директорий (!name.js паттерн для исключения)
    }),
    new HtmlWebpackPlugin({
      template: './template.pug'
    })
  ]
};

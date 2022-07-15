/* eslint-disable */
const path = require('path');
const { name } = require('./pkg');

module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'development' ? '/microp/' : '/sub/microp/',
  devServer: {
    port: 3075,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
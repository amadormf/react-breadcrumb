'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = function (config) {
  config.set({

    browsers: ['PhantomJS'],

    singleRun: !!process.env.CI,

    frameworks: ['mocha'],

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      './src/tests/index.js',
    ],


    preprocessors: {
      './src/tests/index.js': ['webpack', 'sourcemap'],
      './src/index.js': ['webpack', 'sourcemap', 'coverage'],
    },

    reporters: ['mocha', 'coverage'],

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-mocha-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-sourcemap-loader'),
      require('karma-coverage'),
    ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        noParse: [
          /node_modules\/sinon\//,
        ],
        preLoaders: [{
          test: /\.(js|jsx)$/,
          include: /src/,
          exclude: /node_modules/,
          loader: 'isparta',
        }],
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
          },
          {
            test: /\.json$/,
            loader: 'json',
          },
          {
            test: /\.styl$/,
            loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]!stylus?outputStyle=expanded&sourceMap',
          },
          {
            test: /\.css$/,
            loaders: [
              'style-loader',
              'css-loader?modules&importLoaders=1&localIdentName=[local]',
            ],
          },
        ],
      },
      resolve: {
        alias: {
          sinon: 'sinon/pkg/sinon',
        },
      },
      isparta: {
        embedSource: true,
        noAutoWrap: true,
        // these babel options will be passed only to isparta and not to babel-loader
        babel: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
      // fix issues with using enzyme
      externals: {
        jsdom: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'text-encoding': 'window',
        'react/addons': true,
      },
      // fix? issue with tape dep on fs
      node: { fs: 'empty' },
    },

    coverageReporter: {
      reporters: [
        { type: 'text-summary' },
        { type: 'html', dir: 'coverage' },
      ],
    },

    webpackServer: {
      noInfo: true,
    },

  });
};

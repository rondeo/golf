const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer;
const CopyPlugin = require('copy-webpack-plugin');


let config = {
  entry: {
    entry: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].js?[chunkhash]',
    chunkFilename: 'js/[name].js?[chunkhash]',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.(styl|stylus)$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
    ]
  },
  devServer: {
    historyApiFallback: true,
    //noInfo: true,
    overlay: true,
    contentBase: path.resolve(__dirname, './public'),
    //allowedHosts: ['',],
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new VueLoaderPlugin(),
     new CopyPlugin([
      { from: 'public', },
    ]), 
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['*', '.js', '.vue', '.json']
  },

  performance: {
    hints: false
  },
};

module.exports = (env, options) => {
  config.plugins.push(new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(options.mode)
  }));

  if (options.mode === 'production') {
    config.devtool = false;
    config.plugins.push(new PrerenderSPAPlugin({
      staticDir: path.resolve(__dirname, 'dist'),
      routes: [
          '/',
          '/equipment-sorted/ball',
          '/equipment/ball',
          '/contacts',
          '/about',
        ],
      renderer: new PuppeteerRenderer(),

      /* postProcess(renderedRoute) {
        // editing html after rendering
        renderedRoute.html = renderedRoute.html.replace(/from/g, 'to');       
        return renderedRoute
      }, */
    }));
  } else {
    config.devtool = 'eval-sourcemap';
  }
  return config;

};

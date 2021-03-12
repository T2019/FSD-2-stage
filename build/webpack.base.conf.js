const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

// Main const
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
// const PAGES_DIR = PATHS.src
const PAGES_DIR = `${PATHS.src}/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    // app: PATHS.src,
    form_elements: `${PATHS.src}/form-elements.js`,
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath:'' //при такой опции, в dev режиме не создавалась папка js и соответственно файлы с js
    //publicPath:PATHS.dist  папка js создается
   },
  optimization: {
    splitChunks: {
      cacheGroups: { 
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.pug$/,
      oneOf: [
        // this applies to <template lang="pug"> in Vue components
        {
          resourceQuery: /^\?vue/,
          use: ['pug-plain-loader']
        },
        // this applies to pug imports inside JavaScript
        {
          use: ['pug-loader']
        }
      ]
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loader: {
          scss: 'vue-style-loader!css-loader!sass-loader'
        }
      }
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      include:[path.resolve(__dirname, "../src/assets/fonts/")], // пока небыло этой строки, изменялся файл svg (она означает, что беруться файлы только из этоай папки)
      loader: 'file-loader',
      options: {
        name:'[name].[ext]',// влияет на показ пути в DEV
        // outputPath:'assets/fonts/', выводит файлы по этому адресу
         outputPath: `${PATHS.assets}fonts/`,  //выводит файлы по этому адресу BUILD, физически копирует файлы
         publicPath: '../fonts/', // выводит файлы по этому адресу в DEV, и даже в BUILD сборке есть пути в браузере, строчка влияет на них
      }
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      exclude: [path.resolve(__dirname, "../src/assets/fonts/")], // исключает копирование из папки шрифтов
      loader: 'file-loader',
      options: {emitFile: true,                 //разрешает или запрещает копировать файлы
        name:'[name].[ext]',
        outputPath:`${PATHS.assets}img/`,// папка которая будет в BUILD сборка, без этой строчки не отображаются картинки  в DEV сборке
        publicPath: `${PATHS.assets}img/`  //папка которая будет в DEV сборка
        
        
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true,
          url: false }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',{
          loader: MiniCssExtractPlugin.loader,
          //options: { publicPath:  '../../' }
        },
        
        {
          loader: 'css-loader',
          options: { sourceMap: true,
            url: false }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
      ]
    }]
  },
  resolve: {
    alias: {
      '~': PATHS.src,
      'vue$': 'vue/dist/vue.js',
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
      // { from: `${PATHS.src}/static`, to: "" },
      //{ from: `${PATHS.src}/static`, to: '' },
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery:'jquery',
      'window.jQuery':'jquery',
    }),

    // Automatic creation any html pages (Don't forget to RERUN dev server)
    // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
    // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best

    // ...PAGES.map(page => new HtmlWebpackPlugin({
    //   template: `${PAGES_DIR}/${page}`,
    //   filename: `./${page.replace(/\.pug/,'.html')}`
    // }))
    new HtmlWebpackPlugin({
      template:`${PAGES_DIR}/form-elements/form-elements.pug`,
      filename: `./index.html`,// было ./index.html, написал без точки и слеша и ошибка Cannor GET исчезла
      inject:true
    }),
    new CleanWebpackPlugin(),
  ],
}

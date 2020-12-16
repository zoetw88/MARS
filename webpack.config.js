const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    


  entry: {
 
    'note': [
      path.join(__dirname, 'public/js/editor/code_block.js'),
      path.join(__dirname, 'public/js/editor/icons.js'),
      path.join(__dirname, 'public/js/editor/editor.js'),
      path.join(__dirname, 'public/js/editor/index.js'),
      path.join(__dirname, 'public/js/editor/inputrules.js'),
      path.join(__dirname, 'public/js/editor/keymap.js'),
      path.join(__dirname, 'public/js/editor/menu.js'),
      path.join(__dirname, 'public/js/editor/prompt.js'),
      path.join(__dirname, 'public/js/editor/prosemirror-menu.js'),
      path.join(__dirname, 'public/js/editor/schema.js'),
    ]
    
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename:'bundle.js',
  },
//  module: {
//     rules: [
//       {
//         test: /\.m?js$/,
//         exclude: /(node_modules|bower_components)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env']
//           }
//         }
//       }
//     ]
//   }
  // ,

   plugins: [

     new HtmlWebpackPlugin({
      template: './public/index.html',
       filename: path.join(__dirname, 'public/index.html'),
      chunks: ['note'],
      chunksSortMode: 'manual',
    }),
   ],
};

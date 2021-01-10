const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    


  entry: {
 
    'note': [
      path.join(__dirname, 'public/api/1.0/js/editor/code_block.js'),
      path.join(__dirname, 'public/api/1.0/js/editor/icons.js'),
      path.join(__dirname, 'public/api/1.0/js/editor/editor.js'),
      path.join(__dirname, 'public/api/1.0/js/editor/index.js'),
      path.join(__dirname, 'public/api/1.0/js/editor/inputrules.js'),
      path.join(__dirname, 'public/api/1.0/js/editor/keymap.js'),
      path.join(__dirname, 'public/api/1.0/js/editor/menu.js'),
      path.join(__dirname, 'public/api/1.0/js/editor/prompt.js'),
      path.join(__dirname, 'public/api/1.0/js/editor/prosemirror-menu.js'),
      path.join(__dirname, 'public/api/1.0/js/editor/schema.js'),
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
      template: './public/api/1.0/editor.html',
       filename: path.join(__dirname, 'public/api/1.0/editor.html'),
      chunks: ['note'],
      chunksSortMode: 'manual',
    }),
   ],
};

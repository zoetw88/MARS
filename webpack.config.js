const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    


  entry: {
 
    'note': [
      path.join(__dirname, 'public/js/Editor/code_block.js'),
      path.join(__dirname, 'public/js/Editor/icons.js'),
      path.join(__dirname, 'public/js/Editor/Editor.js'),
      path.join(__dirname, 'public/js/Editor/index.js'),
      path.join(__dirname, 'public/js/Editor/inputrules.js'),
      path.join(__dirname, 'public/js/Editor/keymap.js'),
      path.join(__dirname, 'public/js/Editor/menu.js'),
      path.join(__dirname, 'public/js/Editor/prompt.js'),
      path.join(__dirname, 'public/js/Editor/prosemirror-menu.js'),
      path.join(__dirname, 'public/js/Editor/schema.js'),
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

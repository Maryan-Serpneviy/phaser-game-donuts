const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const GoogleFontsPlugin = require('google-fonts-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: 'dist/'
};

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader"
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/"
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../")
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new GoogleFontsPlugin({
      fonts: [
        { family: 'Fredoka One' }
      ],
      formats: [
        "ttf",
        "woff",
        "woff2",
        "eot",
        "svg"
      ],
      filename: '../src/assets/fonts/fonts.css'
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/assets/fonts`, to: `fonts/` },
		]),
  ]
};

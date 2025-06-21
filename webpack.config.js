const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/ts/main.ts',
  output: {
    filename: '[name].[contenthash].js',    // for entry chunks
    chunkFilename: '[name].[contenthash].js', // for dynamic imports (split chunks)
    path: path.resolve(__dirname, 'dist'),
    clean: true, // optional: clean output folder each build
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(exr|txt|png)$/,
        type: 'asset/resource'  // emits files, returns URL string
      },
      {
        test: /\.(glsl|vert|frag)$/,
        type: 'asset/source',
      }
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // split all chunks (sync + async)
      minSize: 20000,
      maxSize: 70000
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'), // your HTML template file
      inject: 'body', // inject scripts before </body>
    }),
  ],
  cache: {
    type: 'filesystem', // 'memory' is default
    buildDependencies: {
      config: [__filename], // invalidate cache when config changes
    },
  },

}

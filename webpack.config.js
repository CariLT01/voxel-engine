const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackbar = require("webpackbar")

module.exports = {
    mode: 'development', // or 'production'
    entry: './src/ts/main.ts',
    output: {
        filename: '[name].[contenthash].js',    // for entry chunks
        chunkFilename: '[name].[contenthash].js', // for dynamic imports (split chunks)
        path: path.resolve(__dirname, 'dist/client'),
        clean: true, // optional: clean output folder each build
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: "ts-loader",
                    options: {
                    configFile: path.resolve(__dirname, "tsconfig.json")
                },
                },
                
                exclude: /node_modules/,
            },
            {
                test: /\.(exr|txt|png)$/,
                type: 'asset/resource'  // emits files, returns URL string
            },
            {
                test: /\.(glsl|vert|frag|proto)$/,
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
            template: './src/index.html', // your HTML template file
            inject: 'body', // inject scripts before </body>
        }),
            new webpackbar({
      name: 'MC Client',
      color: '#b5f58aff',
      basic: false,       // show nicer bar
      reporter: 'fancy',  // 'fancy' shows module names
      profile: true,      // show build profile after finish
      fancy: {            // extra options (some versions)
        // optionally control width, etc.
      }
    })
    ],
    cache: {
        type: 'filesystem', // 'memory' is default
        buildDependencies: {
            config: [__filename], // invalidate cache when config changes
        },
    },


}

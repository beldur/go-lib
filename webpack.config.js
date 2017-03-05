const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    filename: process.env.NODE_ENV === 'production' ? 'go-lib.min.js' : 'go-lib.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'GoLib',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: '/node_modules/',
    }],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
}

module.exports = config

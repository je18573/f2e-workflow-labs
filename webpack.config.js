module.exports = {
  entry: {
    bundle1: './app/app.module.js'
  },
  output: {
    filename: './app/[name].js'
  },
  module: {
    loaders: 
    [
      {test: /\.css$/, loader:'style!css'}
    ],
    
  }
};

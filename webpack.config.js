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
      {test: /\.css$/, loader:'style!css?minimize!autoprefixer'},    
      //{test: /\.(jpg|png|gif)$/, loader:'url?limit=8000'}
      {test: /\.(jpg|png|gif)$/, loader:'file?name=img/google-[hash:6].[ext]?[hash]'}
    ],
    
  }
};

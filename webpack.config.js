let path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let conf = {
     entry: './src/index.js',
     output: {
          path: path.resolve(__dirname, './dist'),
          filename: 'main.js',
          publicPath: 'dist/'
     },
     devServer: {
     	overlay: true,
	    contentBase: './dist',
	    hot: true
     },
     module: {
     	rules: [
     	   {
     	   	  test: /\.(js|jsx)$/,
     	   	  exclude: '/node_modules/'
	          loader: "babel-loader",   // определяем загрузчик
	                options:{
	                    presets:["@babel/preset-env"]    // используемые плагины
	                }
           },
	      {
	        test: /\.css$/,
	        use: ExtractTextPlugin.extract({
	           fallback: "style-loader",
	           use: "css-loader"
	        })
	      }
     	]
      },
	  plugins: [
	    new ExtractTextPlugin("styles.css"),
	  ]
};

module.exports = (env, options) => {
	let production = options.mode === "production";
    conf.devtool = production
                    ? 'source-map'
                    : 'eval-sourcemap'; 
	return conf;
}
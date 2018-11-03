let path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let conf = {
     entry: ['babel-polyfill','./src/index.js'],
     output: {
          path: path.resolve(__dirname, './dist'),
          filename: 'main.js',
          publicPath: 'dist/'
     },
     devServer: {
     	overlay: true
	    // contentBase: './dist'
     },
     module: {
     	rules: [
     	   {
     	   	  test: /\.(js|jsx)$/,
     	   	  exclude: '/node_modules/',
	          loader: "babel-loader",   // определяем загрузчик
	                options:{
	                    presets:["@babel/preset-env","@babel/preset-react",{
                          'plugins': ['@babel/plugin-proposal-class-properties']}]    // используемые плагины
	                }
           },
           // {
           //    test: /\.css$/,
           //    use: ExtractTextPlugin.extract({
           //       fallback: "style-loader",
           //       use: "css-loader"
           //    })
           // },
           {
              test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                 fallback: "style-loader",
                 use: ["css-loader","sass-loader"]
              })
           },
           // {
           //    test: /\.scss$/,
           //    exclude: '/node_modules/',
           //    use: [
           //       'style-loader',
           //       'css-loader',
           //       'sass-loader'
           //    ]
           // },
           {
              test: /\.css$/,
              exclude: '/node_modules/',
              use: [
                  'style-loader',
                  'css-loader'
              ]
           }
     	]
      },
  	  plugins: [
  	    new ExtractTextPlugin("styles.css")
  	  ]
};

module.exports = (env, options) => {
	let production = options.mode === "production";
    conf.devtool = production
                    ? 'source-map'
                    : 'eval-sourcemap'; 
	return conf;
}
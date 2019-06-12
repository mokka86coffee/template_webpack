let path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let conf = {
     entry: ['babel-polyfill','./src/index.js'],
     output: {
          path: path.resolve(__dirname, './dist'),
          filename: 'main.js',
          publicPath: ''
     },
     devServer: {
     	overlay: true,
        contentBase: path.join(__dirname, 'dist')
     },
     module: {
     	rules: [
     	   {
     	   	  test: /\.(js|jsx)$/,
     	   	  exclude: '/node_modules/',
	          loader: "babel-loader"
           },
           // {
           //    test: /\.(gif|png|jpe?g|svg)$/i,
           //    use: [
           //      'file-loader',
           //      {
           //        loader: 'image-webpack-loader',
           //        options: {
           //          mozjpeg: {
           //            progressive: true,
           //            quality: 65
           //          },
           //          // optipng.enabled: false will disable optipng
           //          optipng: {
           //            enabled: true,
           //          },
           //          pngquant: {
           //            quality: '65-90',
           //            speed: 4
           //          },
           //          gifsicle: {
           //            interlaced: false,
           //          },
           //          // the webp option will enable WEBP
           //          webp: {
           //            quality: 75
           //          },
           //          name: '[path][name].[ext]',
           //        }
           //      }
           //    ]
           //  },
            {
              test: /\.(png|jpg|gif)$/,
              exclude: '/node_modules/',
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    context: '',
                    outputPath: 'imgs/'
                  }
                }
              ]
             },
             {
                 test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                 exclude: '/node_modules/',
                 use: [{
                     loader: 'file-loader',
                     options: {
                         name: '[name].[ext]',
                         outputPath: 'fonts/'
                     }
                 }]
             },
           {
              test: /\.scss$/,
              exclude: '/node_modules/',

              use: ExtractTextPlugin.extract({
                 fallback: "style-loader",
                 use: [
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                  ]
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

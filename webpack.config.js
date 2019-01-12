let path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const csswring = require("csswring");

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
                      outputPath: 'img/'
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
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['cover 99.5%']
                                }),
                                csswring({removeAllComments: true,preserveHacks: true})
                            ],
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
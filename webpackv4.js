const path = require('path');
var webpack = require('webpack');
var glob = require('glob');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


const debug = process.env.NODE_ENV !== 'production';




var entries = getEntry('src/js/page/**/**.js', 'src/js/page/');
var chunks = Object.keys(entries);
// 'publicPath': '/dist/',
var settings = {
    'publicPath': '/',
    'urlLoader': 'url-loader?limit=8192&name=./img/[name][hash].[ext]'
}

if (process.env.ENV == 'production') {
    console.log('production',debug)
    // settings.publicPath = '/ru/';
    settings.publicPath = '/';
} else {
    console.log('dev',debug)
}

function getEntry(globPath, pathDir) {

    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.normalize(path.join(dirname, basename));
        pathDir = path.normalize(pathDir);

        if (pathname.startsWith(pathDir)) {
            pathname = pathname.substring(pathDir.length);
        }

        pathname = pathname.replace(/\\/g, '/');

        entries[pathname] = ["babel-polyfill", './' + entry];
    }

    return entries;

}


var config = {
    entry: entries,
    mode: process.env.ENV || 'development',
    target: 'web',
    output: {
        
        path: path.join(__dirname, 'dist'),//生成文件的根目录
        publicPath: settings.publicPath,//针对浏览器的路径，开发环境和生产环境不一样
        filename: 'js/[name][hash].js',
        chunkFilename: 'js/[id][chunkhash].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    
                    'css-loader'
                ]
                //配置css的抽取器、加载器。'-loader'可以省去

            }, {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    
                    "css-loader",
                    "less-loader"
                ]
                //根据从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入

            }, {
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test: /\.html$/,
                use: "html?attrs=img:src img:data-src"
                //loader: "raw"
            }, {
                test: /\.ejs$/,
                use: 'ejs-loader'
            }, {
                //文件加载器，处理文件静态资源
                test: /iconfont\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader?name=./fonts/[name].[ext]'
            }, {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif|svg)$/,
                use: settings.urlLoader
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader',
            }, {
                test: /\.md$/,
                use: ['ejs-loader', 'markdown-loader'],
            }
            
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new webpack.DefinePlugin({
            'ENV': JSON.stringify(process.env.ENV)
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name][hash].css",
            chunkFilename: "[id].css"
        }),

        // debug ? function() {} : new UglifyJsPlugin({
        // 	compress: {
        // 		warnings: false
        // 	},
        // 	except: ['$super','$','exports','require']
        // })
        new CopyWebpackPlugin([
            { from: './copy', to: '' },
        ]),
        // new ManifestPlugin({
        //   fileName: 'manifest.json',
        //   basePath: settings.publicPath,
        //   seed: {
        //     name: 'Manifest'
        //   }
        // }),
        new webpack.HotModuleReplacementPlugin(),

    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9090,
        open: true
      }
};

var pages = Object.keys(getEntry('src/view/pages/**/**.js', 'src/view/pages/'));

pages.forEach(function (pathname) {
    var conf = {
        alwaysWriteToDisk: true,
        filename: '../dist/' + pathname + '.html',
        template: 'src/view/pages/' + pathname + '.js',
        inject: false,
        minify: {
            removeComments: true,
            collapseWhitespace: true
        }
    };

    if (pathname in config.entry) {
        conf.favicon = path.resolve(__dirname, 'src/img/favicon.ico');
        conf.inject = 'body';
        conf.chunks = ['vendors', pathname];
        conf.hash = true;


    }

    config.plugins.push(new HtmlWebpackPlugin(conf));
})

config.plugins.push(new HtmlWebpackHarddiskPlugin({
    outputPath: path.resolve(__dirname, 'dist')
}));
if(debug==false){
    config.plugins.push(new ImageminPlugin({
        pngquant: {
            quality: '70-100'
        }
    }),)
}






module.exports = config;
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = {
    entry: {
        main: './main.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    },
    module: {
        rules: [{
            test:/\.vue$/,
            loader:'vue-loader',
            options:{
                loaders:{
                    css:ExtractTextPlugin.extract({
                        use:'css-loader',
                        fallback:'vue-style-loader'
                    })
                }
            }
        },{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use:'css-loader',
                fallback:'style-loader'
            })
        },{
            test:/\.js$/,
            loader:'babel-loader',
            // exclude:[path.join(__dirname,'node_modules')]
            exclude:/node_modules/
        }
        ]
    },
    plugins:[
        new ExtractTextPlugin("main.css")
    ]
}
module.exports = config;
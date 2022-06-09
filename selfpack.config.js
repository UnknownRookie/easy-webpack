const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:path.resolve(__dirname,'./src/main.js'),
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:"bundle.js"
    },
module:{
    rules:[
        {
            test:/\.js$/,
            use:'./loader.js'
        }
    ]
}
}
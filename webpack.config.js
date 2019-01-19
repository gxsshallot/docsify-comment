const paths = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "dist/docsify-comment.min.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: paths.resolve(__dirname, "node_modules"),
                include: paths.resolve(__dirname, "src"),
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
            },
            {
                test: /\.(jpg|gif|png)$/,
                use:[{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    },
                }]
            },
        ]
    },
};
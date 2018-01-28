var path = require("path");
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    target: "web",
    entry: {
        registration: "./src/app.ts",
        apply: "./src/apply.tsx",
        manage: "./src/manage.tsx"
    },
    output: {
        filename: "src/[name].js",
        libraryTarget: "amd"
    },
    externals: [
        /^VSS\/.*/, /^TFS\/.*/, /^q$/
    ],
    resolve: {
        extensions: [
            ".webpack.js",
            ".web.js",
            ".ts",
            ".tsx",
            ".js"
        ],
        moduleExtensions: ["-loader"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.s?css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2|gif)(\?.+)?$/,
                use: "url-loader?limit=4096&name=[name].[ext]"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new CopyWebpackPlugin([
            { from: "./node_modules/vss-web-extension-sdk/lib/VSS.SDK.min.js", to: "libs/VSS.SDK.min.js" },
            { from: "./src/*.html", to: "./" },
            { from: "./marketplace", to: "marketplace" },
            { from: "./vss-extension.json", to: "vss-extension-release.json" }
        ])
    ]
}
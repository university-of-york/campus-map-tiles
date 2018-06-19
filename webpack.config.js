const webpack = require('webpack');

const path = require("path");

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const realFs = require('fs');
const gracefulFs = require('graceful-fs');

gracefulFs.gracefulify(realFs);


module.exports = {
    mode: 'production',
    entry: {
        map: './main.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            {
                from:'./tiles',
                to:'img'
            }
        ]),
        new ImageminPlugin(
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                pngquant: {
                    quality: '65-80',
                    speed: 4
                }
            }
        ),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ],
    output: {
        //filename: '[name].bundle.min.js',
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.(gif|png|jp(e*)g|svg)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-80',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }

                        },
                    }
                ]
            },
        ]
    },
};




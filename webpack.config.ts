import path from 'path';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import 'webpack-dev-server';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

interface WebpackConfig extends Configuration {
  devServer?: {
    static: string;
    compress: boolean;
    port: number;
    historyApiFallback: boolean;
  };
}

const commonConfig: WebpackConfig = {
  entry: './client/src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // Common plugins can be added here
  ],
};

const devConfig: WebpackConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
};

const prodConfig: WebpackConfig = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
  ],
};

const config = (env: { [key: string]: any }): Configuration => {
  switch (env.NODE_ENV) {
    case 'development':
      return merge(commonConfig, devConfig);
    case 'production':
      return merge(commonConfig, prodConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};

export default config;

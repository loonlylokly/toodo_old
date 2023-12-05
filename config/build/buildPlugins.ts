// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/types';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const isAnalyze = options.mode === 'analyzer';
  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: options.paths.html,
      favicon: options.paths.favicon,
      publicPath: '/',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash].css',
      chunkFilename: 'css/[name]-[contenthash].css',
    }),
    isAnalyze && new BundleAnalyzerPlugin(),
  ].filter(Boolean);

  return plugins;
}

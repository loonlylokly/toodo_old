// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === 'development';
  return {
    mode: options.mode === 'analyzer' ? 'production' : options.mode,
    entry: paths.entry,
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    plugins: buildPlugins(options),
    output: {
      path: paths.output,
      filename: '[name]-[contenthash].js',
      clean: true,
    },
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}

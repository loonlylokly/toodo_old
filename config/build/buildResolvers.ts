// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration } from 'webpack';
import { BuildOptions } from './types/types';

export function buildResolvers(
  options: BuildOptions
): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    alias: {
      utils: `${options.paths.src}/shared/utils/`,
      shared: `${options.paths.src}/shared/`,
      components: `${options.paths.src}/components/`,
      widgets: `${options.paths.src}/widgets/`,
      pages: `${options.paths.src}/pages/`,
      types: `${options.paths.src}/types/`,
      public: `${options.paths.src}/../public/`,
      src: options.paths.src,
    },
  };
}

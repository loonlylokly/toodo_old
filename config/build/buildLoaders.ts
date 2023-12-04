// eslint-disable-next-line import/no-extraneous-dependencies
import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const imgLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [{ loader: '@svgr/webpack', options: { icon: true } }],
  };

  const cssLoader = {
    test: /\.css$/i,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: isDev
              ? '[name]_[contenthash]'
              : '[path][name]__[local]',
          },
        },
      },
    ],
  };

  const tsLoader = {
    exclude: /node_modules/,
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          // getCustomTransformers: () => ({
          //   before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          // }),
        },
      },
    ],
  };

  return [imgLoader, fontsLoader, svgrLoader, cssLoader, tsLoader];
}

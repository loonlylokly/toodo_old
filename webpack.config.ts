// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
import path from 'path';
import { buildWebpack } from './config/build/buildWebpack';

interface EnvVariable {
  port?: number;
  mode?: 'development' | 'production';
}

export default (env: EnvVariable) => {
  const paths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
    output: path.resolve(__dirname, 'build'),
  };
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
  });
  return config;
};

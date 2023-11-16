export interface BuildPaths {
  entry: string;
  html: string;
  src: string;
  favicon: string;
  output: string;
}

export type BuildMode = 'development'|'production';

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
}
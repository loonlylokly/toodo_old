import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export function buildResolvers(options: BuildOptions): Configuration['resolve']{
  return {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    alias: {
      'Src': options.paths.src,
      'Public': `${options.paths.src}/../public/`,
      'Widgets': `${options.paths.src}/widgets/`,
      'Components': `${options.paths.src}/components/`,
      'Shared': `${options.paths.src}/shared/`,
    },
  };
}
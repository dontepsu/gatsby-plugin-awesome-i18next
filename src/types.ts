import { InitOptions } from 'i18next';

export type LocalizedPathConfig = Record<string, Record<string, string>>;
export type PathParameterLocalizations = Record<string, Record<string, Record<string, string>>>;

export type IgnorePathFn = (page: any) => Promise<boolean> | boolean;

export interface PluginOptions {
  i18nextOptions: InitOptions;
  fallbackLng: string;
  availableLngs: string[];
  siteUrl: string;
  localizedPaths: LocalizedPathConfig;
  pathParametersLocalizations: PathParameterLocalizations;
  ignorePaths: Set<string> | string[] | IgnorePathFn;
}

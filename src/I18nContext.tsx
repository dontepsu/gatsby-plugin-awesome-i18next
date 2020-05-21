import * as React from 'react';
import { LocalizedPathConfig, PathParameterLocalizations } from 'types';

export interface I18nContext {
  availableLngs: string[];
  fallbackLng: string;
  lng: string;
  originalPath: string;
  siteUrl: string;
  localizedPathsConfig: LocalizedPathConfig;
  pathParametersLocalizations: PathParameterLocalizations;
}

export const I18nContext = React.createContext<I18nContext>({} as any);

export function I18nProvider ({ children, ...rest }) {
  return (
    <I18nContext.Provider value={{ ...rest as any }}>{children}</I18nContext.Provider>
  );
}

export const I18nConsumer = I18nContext.Consumer;

import * as React from 'react';
import { useTranslation as _useTranslation, UseTranslationResponse } from 'react-i18next';
import { I18nContext } from './I18nContext';
import { resolveLocalizedPath } from './utils';
import { navigate } from 'gatsby';

export interface UseTranslation<AvailableLang> extends UseTranslationResponse {
  context: I18nContext;
  resolvePath (path: string, locale: string): string;
  resolveAllLanguageVersions (): { lang: string, url: string }[];
  changeLang (lang: AvailableLang): void;
}

export function useTranslation<AvailableLang = string> (namespaces: string[] = []): UseTranslation<AvailableLang> {
  const { t, i18n } = _useTranslation(namespaces);
  const context = React.useContext(I18nContext);
  const resolvePath = resolveLocalizedPath(context.localizedPathsConfig, context.pathParametersLocalizations);
  const resolveAllLanguageVersions = (): { lang: string, url: string }[] => (context.availableLngs || []).map(lang => ({
    lang,
    url: `${context.siteUrl || ''}/${resolvePath(context.originalPath, i18n.language)}`,
  }));
  const changeLang = (lang: AvailableLang): void => {
    navigate(`/${lang}${resolvePath(context.originalPath, lang as any)}`);
  };

  return { t, i18n, context, resolvePath, resolveAllLanguageVersions, changeLang } as any;
}

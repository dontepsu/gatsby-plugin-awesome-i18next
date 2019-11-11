import * as path from 'path';
import { InitOptions } from 'i18next';
import { resolveLocalizedPath, LocalizedPathConfig, resolveLocalizedMatchPath, PathParameterLocalizations } from '../utils';

export interface PluginOptions {
  i18nextOptions: InitOptions;
  fallbackLng: string;
  availableLngs: string[];
  siteUrl: string;
  localizedPaths: LocalizedPathConfig;
  pathParametersLocalizations: PathParameterLocalizations;
}

export async function onCreatePage ({ page, actions }, pluginOptions: PluginOptions) {
  const { createPage, deletePage } = actions;
  const { fallbackLng, availableLngs, siteUrl, i18nextOptions, localizedPaths = {}, pathParametersLocalizations = {} } = pluginOptions;

  if (page.path.includes('dev-404')) {
    return Promise.resolve();
  }

  const resolvePath = resolveLocalizedPath(localizedPaths, pathParametersLocalizations);
  const resolveMatchPath = resolveLocalizedMatchPath(localizedPaths);

  const pageContext = { ...page.context };

  return new Promise(resolve => {
    const redirect = path.resolve('./.cache/awesome-i18next/redirect.js');
    const redirectPage = {
      ...page,
      component: redirect,
      context: {
        ...pageContext,
        availableLngs,
        fallbackLng,
        lng: null,
        routed: false,
        redirectPage: page.path,
        siteUrl,
        i18nextOptions,
        localizedPaths: availableLngs.map(lng => resolvePath(page.path, lng)),
      },
    };

    deletePage(page);
    createPage(redirectPage);

    availableLngs.forEach(lng => {
      const localePage = {
        ...page,
        path: `/${lng}${resolvePath(page.path, lng)}`,
        context: {
          ...pageContext,
          availableLngs,
          fallbackLng,
          lng,
          routed: true,
          originalPath: page.path,
          siteUrl,
          i18nextOptions,
          localizedPathsConfig: localizedPaths,
          pathParametersLocalizations,
        },
      };

      if (page.matchPath) {
        localePage.matchPath = `/${lng}${resolveMatchPath(page.matchPath, lng)}`;
      }

      createPage(localePage);
    });

    resolve();
  });
}

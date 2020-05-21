import * as path from 'path';
import { resolveLocalizedPath } from '../utils';
import { PluginOptions } from 'types';

export async function onCreatePage ({ page, actions }, pluginOptions: PluginOptions) {
  const { createPage, deletePage } = actions;
  const {
    fallbackLng,
    availableLngs,
    siteUrl,
    i18nextOptions,
    localizedPaths = {},
    pathParametersLocalizations = {},
    ignorePaths,
  } = pluginOptions;

  if (ignorePaths) {
    if (Array.isArray(ignorePaths) && ignorePaths.includes(page.path)) {
      return Promise.resolve();
    }
    if (typeof ignorePaths === 'function' && (await ignorePaths(page))) {
      return Promise.resolve();
    }

    if ((ignorePaths as Set<string>).has && (ignorePaths as Set<string>).has(page.path)) {
      return Promise.resolve();
    }
  }

  if (page.path.includes('dev-404')) {
    return Promise.resolve();
  }

  const resolvePath = resolveLocalizedPath(localizedPaths, pathParametersLocalizations);

  const pageContext = { ...page.context };

  return new Promise(resolve => {
    const redirect = path.resolve(__dirname, '../Redirect.js');
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
        localePage.matchPath = `/${lng}${resolvePath(page.matchPath, lng)}`;
      }

      createPage(localePage);
    });

    resolve();
  });
}

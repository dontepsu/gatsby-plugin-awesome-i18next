import { get } from 'lodash';
import { LocalizedPathConfig, PathParameterLocalizations } from 'types';

// tslint:disable-next-line: strict-type-predicates
export const isBrowser = () => typeof window !== 'undefined';

const createRegex = (path: string): RegExp => {
  const r = path.replace(/(:(.*?)(\/|$))|\*/gi, '[^\/]*/?');
  const matcher = new RegExp(`^${r}$`, 'i');

  return matcher;
};

export interface Matcher {
  matcher: RegExp;
  key: string;
}

export const getMatchersFactory = () => {
  let matchers: Matcher[];

  return (config: LocalizedPathConfig): Matcher[] => {
    if (!matchers) {
      matchers = Object.keys(config)
        .map(key => ({ matcher: createRegex(key), key }));
    }

    return matchers;
  };
};

const getMatchers = getMatchersFactory();

type NewType = PathParameterLocalizations;

export const resolveLocalizedPath = (config: LocalizedPathConfig, pathParametersLocalizations: NewType = {}) => {
  const matchers = getMatchers(config);

  return (path: string, locale: string): string => {
    const localePathLink = matchers.find(m => m.matcher.test(path.split('?')[0])) || {} as any;
    const localePath = config[localePathLink.key];

    if (localePath && localePath[locale]) {
      const [p, search] = path.split('?');
      const localePathSplit = localePath[locale].split('/');
      const pathSplit = p.split('/');

      const localized = localePathSplit.reduce((acc: string[], c: string, index: number) => {
        if (c.startsWith(':')) {
          // try if path paramter can be localized
          const localizedParam = get(pathParametersLocalizations, `${c}.${pathSplit[index]}.${locale}`);
          if (localizedParam) {
            acc[index] = localizedParam;
          } else {
            acc[index] = pathSplit[index];

          }
        } else {
          acc[index] = localePathSplit[index];
        }

        return acc;
      }, []);

      let localizedPath = localized.join('/');

      if (search) {
        localizedPath += '?' + search;
      }

      return localizedPath;
    }

    return path;
  };
};

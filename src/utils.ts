// tslint:disable-next-line: strict-type-predicates
export const isBrowser = () => typeof window !== 'undefined';

export type LocalizedPathConfig = Record<string, Record<string, string>>;

const createRegex = (path: string): RegExp => {
  const r = path.replace(/(:(.*?)\/)|\*/gi, '[^\/]*/');
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

export const resolveLocalizedPath = (config: LocalizedPathConfig) => {
  const matchers = getMatchers(config);

  return (path: string, locale: string): string => {
    const localePathLink = matchers.find(m => m.matcher.test(path)) || {} as any;
    const localePath = config[localePathLink.key];

    if (localePath && localePath[locale]) {
      const localePathSplit = localePath[locale].split('/');
      const pathSplit = path.split('/');

      const localized = localePathSplit.reduce((acc: string[], c: string, index: number) => {
        if (c.startsWith(':')) {
          acc[index] = pathSplit[index];
        } else {
          acc[index] = localePathSplit[index];
        }

        return acc;
      }, []);

      return localized.join('/');
    }

    return path;
  };
};

export const resolveLocalizedMatchPath = (config: LocalizedPathConfig) => {
  return (path: string, locale: string): string => {
    const localPaths = config[path];
    if (localPaths && localPaths[locale]) {
      return localPaths[locale];
    }

    return path;
  };
};

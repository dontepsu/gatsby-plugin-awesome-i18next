import { resolveLocalizedPath, resolveLocalizedMatchPath } from './utils';

const localizedUrls = {
  '/products/': {
    fi: '/tuotteet/',
    es: '/productos/',
  },
  '/products/new-collection/': {
    fi: '/tuotteet/uutuudet/',
    es: '/productos/nueva-collection/',
  },
  '/products/:id/': {
    fi: '/tuotteet/:id/',
    es: '/productos/:id/',
  },
  '/products/:id/recommendations/': {
    fi: '/tuotteet/:id/suositukset/',
    es: '/productos/:id/recommendaciones/',
  },
  '/products/*': {
    fi: '/tuotteet/*',
    es: '/productos/*',
  },
  '/products/*/recommendations/': {
    fi: '/tuotteet/*/suositukset/',
    es: '/productos/*/recommendaciones/',
  },
};

const resolveUrl = resolveLocalizedPath(localizedUrls);

test('resolve url basic', () => {
  const path = '/products/';
  const fi = resolveUrl(path, 'fi');
  const es = resolveUrl(path, 'es');
  const en = resolveUrl(path, 'en');

  expect(fi).toEqual('/tuotteet/');
  expect(es).toEqual('/productos/');
  expect(en).toEqual('/products/');
});

test('resolve url basic 2', () => {
  const path = '/products/new-collection/';
  const fi = resolveUrl(path, 'fi');
  const es = resolveUrl(path, 'es');
  const en = resolveUrl(path, 'en');

  expect(fi).toEqual('/tuotteet/uutuudet/');
  expect(es).toEqual('/productos/nueva-collection/');
  expect(en).toEqual('/products/new-collection/');
});

test('resolve url wildcard 1', () => {
  const path = '/products/valor-chocolate/';
  const fi = resolveUrl(path, 'fi');
  const es = resolveUrl(path, 'es');
  const en = resolveUrl(path, 'en');

  expect(fi).toEqual('/tuotteet/valor-chocolate/');
  expect(es).toEqual('/productos/valor-chocolate/');
  expect(en).toEqual('/products/valor-chocolate/');
});

test('resolve url wildcard 2', () => {
  const path = '/products/valor-chocolate/recommendations/';
  const fi = resolveUrl(path, 'fi');
  const es = resolveUrl(path, 'es');
  const en = resolveUrl(path, 'en');

  expect(fi).toEqual('/tuotteet/valor-chocolate/suositukset/');
  expect(es).toEqual('/productos/valor-chocolate/recommendaciones/');
  expect(en).toEqual('/products/valor-chocolate/recommendations/');
});

const resolveMatchPath = resolveLocalizedMatchPath(localizedUrls);

test('resolve matchPath wildcard 1', () => {
  const path = '/products/:id/';
  const fi = resolveMatchPath(path, 'fi');
  const es = resolveMatchPath(path, 'es');
  const en = resolveMatchPath(path, 'en');

  expect(fi).toEqual('/tuotteet/:id/');
  expect(es).toEqual('/productos/:id/');
  expect(en).toEqual('/products/:id/');
});

test('resolve matchPath wildcard 2', () => {
  const path = '/products/:id/recommendations/';
  const fi = resolveMatchPath(path, 'fi');
  const es = resolveMatchPath(path, 'es');
  const en = resolveMatchPath(path, 'en');

  expect(fi).toEqual('/tuotteet/:id/suositukset/');
  expect(es).toEqual('/productos/:id/recommendaciones/');
  expect(en).toEqual('/products/:id/recommendations/');
});

test('resolve matchPath * 1', () => {
  const path = '/products/*';
  const fi = resolveMatchPath(path, 'fi');
  const es = resolveMatchPath(path, 'es');
  const en = resolveMatchPath(path, 'en');

  expect(fi).toEqual('/tuotteet/*');
  expect(es).toEqual('/productos/*');
  expect(en).toEqual('/products/*');
});

test('resolve matchPath * 2', () => {
  const path = '/products/*/recommendations/';
  const fi = resolveMatchPath(path, 'fi');
  const es = resolveMatchPath(path, 'es');
  const en = resolveMatchPath(path, 'en');

  expect(fi).toEqual('/tuotteet/*/suositukset/');
  expect(es).toEqual('/productos/*/recommendaciones/');
  expect(en).toEqual('/products/*/recommendations/');
});

import i18next from 'i18next';

export function setupI18next (fallbackLng, i18nextOptions): i18next.i18n {
  i18next.init({
    debug: false,
    defaultNS: 'messages',
    fallbackLng,
    react: {
      useSuspense: false,
    },
    ...i18nextOptions,
  });

  return i18next;
}

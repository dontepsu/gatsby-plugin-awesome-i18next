import React from 'react';
import { Helmet as ReactHelmet } from 'react-helmet';
import { useTranslation } from './useTranslation';

export interface HeadProps {
  hrefLang?: any;
}

export const Helmet: React.FC<HeadProps> = ({ children, hrefLang }) => {
  const { i18n, resolveAllLanguageVersions } = useTranslation();
  const allLanguageVersions = React.useMemo(() => {
    return resolveAllLanguageVersions()
      .map(v => <link
        key={v.lang}
        rel="alternate"
        href={v.url}
        hrefLang={v.lang === i18n.language ? 'x-default' : hrefLang}
      />);
  }, []);

  return (
    <ReactHelmet>
      <html lang={i18n.language} />
      {allLanguageVersions}
      {children}
    </ReactHelmet>
  );
};

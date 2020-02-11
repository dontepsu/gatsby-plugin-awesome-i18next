import * as React from 'react';
import { Helmet as ReactHelmet, HelmetProps } from 'react-helmet';
import { useTranslation } from './useTranslation';

export interface HeadProps extends HelmetProps {}

export const Helmet: React.FC<HeadProps> = ({ children, ...props }) => {
  const { i18n, resolveAllLanguageVersions } = useTranslation();
  const allLanguageVersions = React.useMemo(() => {
    return resolveAllLanguageVersions()
      .map(v => <link
        key={v.lang}
        rel="alternate"
        href={v.url}
        hrefLang={v.lang}
      />);
  }, []);

  return (
    <ReactHelmet {...props}>
      <html lang={i18n.language} />
      {allLanguageVersions}
      {children}
    </ReactHelmet>
  );
};

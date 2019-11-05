import React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import { I18nConsumer } from './I18nContext';

const LinkComponent: React.FC<any> = ({ to, lng, resolvePath, children, ...rest }) => {
  return (
    <GatsbyLink to={lng ? `/${lng}${resolvePath(to, lng)}` : `${to}`} {...rest}>
      {children}
    </GatsbyLink>
  );
};

export function Link<T> (props: GatsbyLinkProps<T>) {
  return (
    <I18nConsumer>{({ lng, resolvePath }) => <LinkComponent lng={lng} resolvePath={resolvePath} {...props} />}</I18nConsumer>
  );
}

import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { I18nProvider } from './I18nContext';
import { setupI18next } from './plugin/setupI18next';
import i18next from 'i18next';

export interface WithI18nextOptions {
  afterI18nInit? (i18next: i18next.i18n): void;
}

export function withI18next (Comp: any, options: WithI18nextOptions = {}): any {
  class I18n extends React.Component<{ data: any, pageContext: any }> {
    private i18n: i18next.i18n;

    constructor (props) {
      super(props);

      const { pageContext } = props;

      this.i18n = setupI18next(
        pageContext.fallbackLng,
        pageContext.i18nextOptions,
      );

      this.activateLng();
      if (options.afterI18nInit) {
        options.afterI18nInit(this.i18n);
      }
    }

    activateLng = () => {
      const { data, pageContext } = this.props;

      if (data.locales) {
        data.locales.edges.forEach(({ node }) => {
          const { lng, ns, data } = node;
          if (!this.i18n.hasResourceBundle(lng, ns)) {
            this.i18n.addResourceBundle(lng, ns, JSON.parse(data));
          }
        });
      }

      this.i18n.changeLanguage(pageContext.lng);
    }

    componentDidUpdate (prevProps) {
      if (this.props.pageContext.lng !== prevProps.pageContext.lng) {
        this.activateLng();
      }
    }

    render () {
      return (
        <I18nextProvider i18n={this.i18n}>
          <I18nProvider {...this.props.pageContext}>
            <Comp {...this.props} />
          </I18nProvider>
        </I18nextProvider>
      );
    }
  }

  return I18n;
}

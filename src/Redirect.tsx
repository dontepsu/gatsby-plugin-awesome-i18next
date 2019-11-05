import { PureComponent } from 'react';
import { navigate } from 'gatsby';
import { lookup, navigatorLanguages } from 'langtag-utils';

import { isBrowser } from './utils';

export class Redirect extends PureComponent<{ pageContext: any }> {
  componentDidMount () {
    if (isBrowser()) this.perform();
  }

  perform = () => {
    const { fallbackLng, availableLngs, localizedPaths, redirectPage } = this.props.pageContext;

    const detectedLng =
      window.localStorage.getItem('awesome-i18next-lang') ||
      lookup(availableLngs, navigatorLanguages(), fallbackLng);

    window.localStorage.setItem('awesome-i18next-lang', detectedLng);
    const goTo = localizedPaths[availableLngs.indexOf(detectedLng)] || redirectPage;
    const newUrl = `/${detectedLng}${goTo}`;
    navigate(newUrl, { replace: true });
  }

  render () {
    return null;
  }
}

export default Redirect;

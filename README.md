# Gatsby plugin for i18next
Gatsby plugin that wraps react-i18next and supports localized urls.

## Installation

```
npm i -S @dontepsu/gatsby-plugin-awesome-i18next i18next react-i18next
```

## Usage
To use to the plugin, you need to define the translations in a JSON file and add config object to `gatsby.config.js`.

### Gatsby config

In  gatsby-config define following configuration to the plugin.
```
{
  resolve: `gatsby-plugin-awesome-i18next`,
  options: {
    availableLngs: ['en', 'fi'],
    fallbackLng: 'en',
    siteUrl: 'https://www.example.com/',
},

```

### Locales
In the project root add the translations JSON files as follows:
```
root
- locales
  - en
    messages.json
    my-namespace.json
  - fi
    messages.json
    my-namespace.json
```

these translation will be available in the Gatsbys GraphQL.

### Add to pages

```
export const query = graphql`
  query($lng: String!) {
    locales: allLocale(filter: { lng: { eq: $lng }, ns: { regex: "/messages|my-namespace/i" } }) {
      ...LocaleFragment
    }
  }
`;

export default withI18next(MyPageComponent, {
  // optional hook
  afterI18nInit: (18next => doSomethingAfteInit(i18next),
});

```

### Usage in components

This plugin is designed to be used with `useTranslation`-hook. For more information please refer to React-i18next documentation.

This plugin exports an extended version of `useTranslation`-hook.
```
import { useTranslation } from 'gatsby-plugin-awesome-i18next';

const Component = () => {
  const {
    t,
    i18n, 
    context, 
    resolvePath, 
    resolveAllLanguageVersions,
    changeLang
  } = useTranslation([ 'my-namespace' ]);

  return <h1>{t('my-namespace:Component.hello')}</h1>;
}
```


## Localized URLS
Feature to enable url localization. URL localization will be done in gatsby-node.onCreatePage hook. Developer should not worry about hanlding the localzied url when creating linking within pages in Gatsby project.

The urls 

### Localized URL Example
```
{
  resolve: `gatsby-plugin-awesome-i18next`,
  options: {
    availableLngs: ['en', 'fi'],
    fallbackLng: 'en',
    siteUrl: 'https://www.example.com/',
    localizedPaths: {
      '/about/': {
        fi: '/tietoja/',
      },
      '/products/:slug/': {
        fi: '/tuotteet/:slug',
      },
      /products/:slug/subsite': {
        fi: '/tuotteet/:slug/subsite',
      },
    },
  },
},

```

### Localized URL with Localized Paths Example
```
{
  resolve: `gatsby-plugin-awesome-i18next`,
  options: {
    availableLngs: ['en', 'fi'],
    fallbackLng: 'en',
    siteUrl: 'https://www.example.com/',
    localizedPaths: {
      '/about/': {
        fi: '/tietoja/',
      },
      '/products/:slug/': {
        fi: '/tuotteet/:slug',
      },
      /products/:slug/subsite': {
        fi: '/tuotteet/:slug/subsite',
      },
    },
    pathParametersLocalizations: {
      ':slug': {
        'chocolates': {
          fi: 'suklaat',
        }
      }
    }
  },
},
```

### Ignore paths
Ignore paths that you don't want this plugin to process. You can use one of the following:
1. Set of strings
```
{
  resolve: `gatsby-plugin-awesome-i18next`,
  options: {
    availableLngs: ['en', 'fi'],
    fallbackLng: 'en',
    siteUrl: 'https://www.example.com/',
    ignorePaths: new Set([
      '/oauth-callback/',
    ])
  },
},
```
2. Array of string 
```
{
  resolve: `gatsby-plugin-awesome-i18next`,
  options: {
    availableLngs: ['en', 'fi'],
    fallbackLng: 'en',
    siteUrl: 'https://www.example.com/',
    ignorePaths: [
      '/oauth-callback/',
    ]
  },
},
```
3. function => boolean
```
{
  resolve: `gatsby-plugin-awesome-i18next`,
  options: {
    availableLngs: ['en', 'fi'],
    fallbackLng: 'en',
    siteUrl: 'https://www.example.com/',
    ignorePaths: page => page.path.substr(0, path.length - 1) === '/oauth-callback'
  },
},
```

### Linking to pages
Plugin exports a `<Link />` component that takes a non localized url as `props.to`

```
import { Link } from 'gatsby-plugin-awesome-i18next';

const LinkComponent = () => {
  return <Link to="/about/">{t('my-namespace:LinkComponent.about_link')}</Link>;
}
```

*If you use localized paths, the default language url will be automatically translated to localized url.*

## Contributors
* Kodit.io - Europes #1 real estate instant buyer

## Change log
### 1.7.0
* Ignore paths: Specify routes that you want this plugin to ignore

## License
MIT
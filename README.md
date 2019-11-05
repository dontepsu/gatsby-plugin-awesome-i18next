# Gatsby plugin for i18next

## Installation

```
npm i -D @dontepsu/gatsby-plugin-awesome-i18next
```

## Localized URLS
Feature to enable url localization. URL localization will be done in gatsby-node.onCreatePage hook. Developer should not worry about hanlding the localzied url when creating linking within pages in Gatsby project.

The urls 

### Feature list
* `<Link />` component that takes a non localized url as `props.to`, example `<Link to="/about/" />`
* The localized url paths may have some wildcards like `/products/:slug` and even `/products/:slug/subsite`


### Usage
In  gatsby-config define following configuration to the plugin. If localepath is not found, the plugin will use the key as default. Therefor localized path for locale `en` is not defined in the example below.
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

## License
MIT
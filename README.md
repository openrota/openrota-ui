# shareNwork

Welcome to the repository that hosts the UIs for shareNwork.

## Contributing

If you are contributing please check out the [Contributing Guidelines.](https://github.com/shareNwork/shareNwork-ui/blob/main/CONTRIBUTING.md)

## Quick-start

```bash
git clone https://github.com/shareNwork/shareNwork-ui
cd patternfly-react-seed
yarn install && yarn run start:dev
```
### Configuring hosts file to run on prod.foo.redhat.com

You will need to configure your hosts file to run on prod.foo.redhat.com. Type the following command in your terminal: 

```sh
sudo vi /etc/hosts
```
You can also choose to use any other terminal editor of your choice. 

And add the following to the hosts file:

```sh
127.0.0.1   prod.foo.redhat.com
127.0.0.1   stage.foo.redhat.com
127.0.0.1   qa.foo.redhat.com
127.0.0.1   ci.foo.redhat.com
```
Save and exit the terminal editor. Restart your system. [Start openrota](#starting-openrota) on your terminal.

This will ensure that openrota goes through the Red Hat SSO before opening.

## Development scripts
```sh
# Install development/build dependencies
yarn install

# Start the development server
yarn run start:dev

# Run a production build (outputs to "dist" dir)
yarn run build

# Run the test suite
yarn run test

# Run the test suite with coverage
yarn run test:coverage

# Run the linter
yarn run lint

# Run the code formatter
yarn run format

# Launch a tool to inspect the bundle size
yarn run bundle-profile:analyze

# Start the express server (run a production build first)
yarn run start

# Start storybook component explorer
yarn run storybook

# Build storybook component explorer as standalone app (outputs to "storybook-static" dir)
yarn run build:storybook
```

## Configurations
* [TypeScript Config](./tsconfig.json)
* [Webpack Config](./webpack.common.js)
* [Jest Config](./jest.config.js)
* [Editor Config](./.editorconfig)

## Raster image support

To use an image asset that's shipped with PatternFly core, you'll prefix the paths with "@assets". `@assets` is an alias for the PatternFly assets directory in node_modules.

For example:
```js
import imgSrc from '@assets/images/g_sizing.png';
<img src={imgSrc} alt="Some image" />
```

You can use a similar technique to import assets from your local app, just prefix the paths with "@app". `@app` is an alias for the main src/app directory.

```js
import loader from '@app/assets/images/loader.gif';
<img src={loader} alt="Content loading />
```

## Vector image support
Inlining SVG in the app's markup is also possible.

```js
import logo from '@app/assets/images/logo.svg';
<span dangerouslySetInnerHTML={{__html: logo}} />
```

You can also use SVG when applying background images with CSS. To do this, your SVG's must live under a `bgimages` directory (this directory name is configurable in [webpack.common.js](./webpack.common.js#L5)). This is necessary because you may need to use SVG's in several other context (inline images, fonts, icons, etc.) and so we need to be able to differentiate between these usages so the appropriate loader is invoked.
```css
body {
  background: url(./assets/bgimages/img_avatar.svg);
}
```

## Adding custom CSS
When importing CSS from a third-party package for the first time, you may encounter the error `Module parse failed: Unexpected token... You may need an appropriate loader to handle this file typ...`. You need to register the path to the stylesheet directory in [stylePaths.js](./stylePaths.js). We specify these explicity for performance reasons to avoid webpack needing to crawl through the entire node_modules directory when parsing CSS modules.

## Code quality tools
* For accessibility compliance, we use [react-axe](https://github.com/dequelabs/react-axe)
* To keep our bundle size in check, we use [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
* To keep our code formatting in check, we use [prettier](https://github.com/prettier/prettier)
* To keep our code logic and test coverage in check, we use [jest](https://github.com/facebook/jest)
* To ensure code styles remain consistent, we use [eslint](https://eslint.org/)
* To provide a place to showcase custom components, we integrate with [storybook](https://storybook.js.org/)

## Multi environment configuration
This project uses [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack) for exposing environment variables to your code. Either export them at the system level like `export MY_ENV_VAR=http://dev.myendpoint.com && npm run start:dev` or simply drop a `.env` file in the root that contains your key-value pairs like below:

```sh
ENV_1=http://1.myendpoint.com
ENV_2=http://2.myendpoint.com
```

With that in place, you can use the values in your code like `console.log(process.env.ENV_1);`

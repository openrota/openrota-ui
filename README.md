<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of content**

- [@openrota monorepo](#openrota-monorepo)
  - [Usage](#usage)
  - [Development workflow](#development-workflow)
    - [Starting openrota](#starting-openrota)
    - [Configuring hosts file to run on prod.foo.redhat.com](#configuring-hosts-file-to-run-on-prodfooredhatcom)
    - [Running Cypress](#running-cypress)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# @openrota monorepo

## Usage

This monorepo uses Lerna and Yarn Workspaces, npm CLI is not supported (only yarn).

```sh
yarn install
```

This will install all dependencies in each project, build them, and symlink them via Lerna

## Development workflow

In one terminal, run tsdx watch in parallel:

```sh
yarn start
```

This builds each package to `<packages>/<package>/dist` and runs the project in watch mode so any edits you save inside `<packages>/<package>/src` cause a rebuild to `<packages>/<package>/dist`. The results will stream to the terminal.

### Starting openrota

You can now start openrota simultaneously in another terminal using the following command:

```sh
yarn start:app:openrota
```

This will start the openrota on `https://prod.foo.redhat.com:1337/`. If you have lerna running watch in parallel mode in one terminal, and then you run parcel, your playground will hot reload when you make changes to any imported module whose source is inside of `packages/*/src/*`. Note that to accomplish this, each package's `start` command passes TDSX the `--noClean` flag. This prevents Parcel from exploding between rebuilds because of File Not Found errors.

Important Safety Tip: When adding/altering packages in the playground, use `alias` object in package.json. This will tell Parcel to resolve them to the filesystem instead of trying to install the package from NPM. It also fixes duplicate React errors you may run into.

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
### Running Cypress

```sh
yarn cypress
```

(In a third terminal) You can run Cypress and it will run your integration tests against openrota. 

```sh
yarn cypress: open
```

Opens the Cypress Test Runner.
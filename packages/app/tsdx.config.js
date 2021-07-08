const url = require('@rollup/plugin-url');
const svgr = require('@svgr/rollup').default;
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
module.exports = {
  rollup(config, options) {
    config.plugins = [
      url(),
      svgr({
        // configure however you like, this is just an example
        ref: true,
        memo: true,
        svgoConfig: {
          plugins: [{ removeViewBox: false }, { removeAttrs: { attrs: 'g:(stroke|fill):((?!^none$).)*' } }],
        },
      }),
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: true,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: !!options.writeMeta,
      }),
      ...config.plugins,
    ];

    return config;
  },
};

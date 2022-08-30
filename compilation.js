const { createUnplugin } = require('unplugin');
const swc = require('@swc/core');

const unplugin = createUnplugin(() => {
  return {
    name: 'compilation-plugin',
    transformInclude(id) {
      return id.endsWith('.jsx');
    },
    async transform(code, id) {
      const output = await swc.transform(code, {
        filename: id,
        sourceMaps: true,
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
            legacyDecorator: true,
          },
          parser: {
            jsx: true,
          },
          externalHelpers: false,
        },
        module: {
          type: 'es6',
          noInterop: false,
        },
        env: {
          loose: true,
        },
      });

      console.log('output===>', output);

      return {
        code: output.code,
        map: output.map,
      };
    },
  };
});

exports.webpackCompilationPlugin = unplugin.webpack;

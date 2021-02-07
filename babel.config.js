
const packageConfig = require('./package.json');

const config = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: "> 0.25%, not dead",
          node: "current"
        },
        useBuiltIns: "usage",
        corejs: {
          version: "3.8",
          proposals: true
        }
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "react-loadable/babel",
    [
      "import",
      {
        libraryName: "antd",
        style: true
      }
    ]
  ]
}

function isBabelRegister(caller) {
  // 'babel-loader'
  console.log('babel: ', caller.name);
  return !!(caller && caller.name === "@babel/register");
}

module.exports = function (api) {
  if (!api) return;
  const isProduction = api.env("production");
  // api.cache(true);

  const isRegister = api.caller(isBabelRegister);

  const res = config;
  if (!isProduction && !isRegister && !res.plugins.includes('react-refresh/babel')) {
    res.plugins.push('react-refresh/babel');
  }

  const { ssr } = packageConfig.config;
  const cssPlugin = [
    "css-modules-transform",
    {
      "camelCase": true,
      "extensions": [ ".css", ".less" ],
    },
  ];
  if (ssr) {
    res.plugins.push(cssPlugin);
  }

  return res;
}
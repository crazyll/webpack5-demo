const config = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": "> 0.25%, not dead",
          "node": "current"
        },
        "useBuiltIns": "usage",
        "corejs": {
          "version": "3.8",
          "proposals": true
        }
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "react-loadable/babel"
  ]
}

export default function (dev) {
  // if (!api) return;
  // const isProduction = api.env("production");
  const res = config;
  if (dev === true && !res.plugins.includes('react-refresh/babel')) {
    res.plugins.push('react-refresh/babel');
  }
  return res;
}
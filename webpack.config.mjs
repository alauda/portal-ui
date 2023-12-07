import path from "node:path";

import customWebpack from "@alauda/custom-webpack";

export default async (webpackConfig, options) => {
  const config = customWebpack(webpackConfig, options);

  Object.assign(config.resolve.alias, {
    dompurify$: "domiso",
    "compare-versions": false,
    "cron-parser": false,
    cronstrue: false,
    "cronstrue/locales/en": false,
    "cronstrue/locales/zh_CN": false,
    "crypto-js/aes": false,
    "crypto-js/enc-base64": false,
    "crypto-js/enc-hex": false,
    "crypto-js/enc-utf8": false,
    "crypto-js/format-hex": false,
    "crypto-js/hmac-sha256": false,
    "crypto-js/mode-ctr": false,
    "crypto-js/pad-nopadding": false,
    d3: false,
    "ng-resource-form-util": false,
    marked: false,
    pluralize: false,
    "ts-md5": false,
    xterm: false,
    "zz-chart": false,
    "xterm-addon-fit": false,
    "xterm-addon-search": false,
    "xterm-addon-web-links": false,
    "xterm-addon-canvas": false,
    "xterm-addon-webgl": false,
  });

  if (!config.resolve.fallback) {
    config.resolve.fallback = {};
  }

  Object.assign(config.resolve.fallback, { crypto: false });

  return config;
};

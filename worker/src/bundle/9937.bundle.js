"use strict";
(self["webpackChunkvideoapi"] = self["webpackChunkvideoapi"] || []).push([[9937],{

/***/ 39937:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fontFamily: () => (/* binding */ fontFamily),
/* harmony export */   getInfo: () => (/* binding */ getInfo),
/* harmony export */   loadFont: () => (/* binding */ loadFont)
/* harmony export */ });
/* harmony import */ var remotion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56517);
/* harmony import */ var remotion_no_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(53080);
// src/base.ts


var loadedFonts = {};
var loadFontFaceOrTimeoutAfter20Seconds = (fontFace) => {
  const timeout = Promise.withResolvers();
  const int = setTimeout(() => {
    timeout.reject(new Error("Timed out loading Google Font"));
  }, 18000);
  return Promise.race([
    fontFace.load().then(() => {
      clearTimeout(int);
    }),
    timeout.promise
  ]);
};
var loadFonts = (meta, style, options) => {
  const weightsAndSubsetsAreSpecified = Array.isArray(options?.weights) && Array.isArray(options?.subsets) && options.weights.length > 0 && options.subsets.length > 0;
  if (remotion_no_react__WEBPACK_IMPORTED_MODULE_1__.NoReactInternals.ENABLE_V5_BREAKING_CHANGES && !weightsAndSubsetsAreSpecified) {
    throw new Error("Loading Google Fonts without specifying weights and subsets is not supported in Remotion v5. Please specify the weights and subsets you need.");
  }
  const promises = [];
  const styles = style ? [style] : Object.keys(meta.fonts);
  let fontsLoaded = 0;
  for (const style2 of styles) {
    if (typeof FontFace === "undefined") {
      continue;
    }
    if (!meta.fonts[style2]) {
      throw new Error(`The font ${meta.fontFamily} does not have a style ${style2}`);
    }
    const weights = options?.weights ?? Object.keys(meta.fonts[style2]);
    for (const weight of weights) {
      if (!meta.fonts[style2][weight]) {
        throw new Error(`The font ${meta.fontFamily} does not  have a weight ${weight} in style ${style2}`);
      }
      const subsets = options?.subsets ?? Object.keys(meta.fonts[style2][weight]);
      for (const subset of subsets) {
        let font = meta.fonts[style2]?.[weight]?.[subset];
        if (!font) {
          throw new Error(`weight: ${weight} subset: ${subset} is not available for '${meta.fontFamily}'`);
        }
        let fontKey = `${meta.fontFamily}-${style2}-${weight}-${subset}`;
        const previousPromise = loadedFonts[fontKey];
        if (previousPromise) {
          promises.push(previousPromise);
          continue;
        }
        const baseLabel = `Fetching ${meta.fontFamily} font ${JSON.stringify({
          style: style2,
          weight,
          subset
        })}`;
        const label = weightsAndSubsetsAreSpecified ? baseLabel : `${baseLabel}. This might be caused by loading too many font variations. Read more: https://www.remotion.dev/docs/troubleshooting/font-loading-errors#render-timeout-when-loading-google-fonts`;
        const handle = (0,remotion__WEBPACK_IMPORTED_MODULE_0__.delayRender)(label, { timeoutInMilliseconds: 60000 });
        fontsLoaded++;
        const fontFace = new FontFace(meta.fontFamily, `url(${font}) format('woff2')`, {
          weight,
          style: style2,
          unicodeRange: meta.unicodeRanges[subset]
        });
        let attempts = 2;
        const tryToLoad = () => {
          if (fontFace.status === "loaded") {
            (0,remotion__WEBPACK_IMPORTED_MODULE_0__.continueRender)(handle);
            return;
          }
          const promise = loadFontFaceOrTimeoutAfter20Seconds(fontFace).then(() => {
            (options?.document ?? document).fonts.add(fontFace);
            (0,remotion__WEBPACK_IMPORTED_MODULE_0__.continueRender)(handle);
          }).catch((err) => {
            loadedFonts[fontKey] = undefined;
            if (attempts === 0) {
              throw err;
            } else {
              attempts--;
              tryToLoad();
            }
          });
          loadedFonts[fontKey] = promise;
          promises.push(promise);
        };
        tryToLoad();
      }
    }
    if (fontsLoaded > 20) {
      console.warn(`Made ${fontsLoaded} network requests to load fonts for ${meta.fontFamily}. Consider loading fewer weights and subsets by passing options to loadFont(). Disable this warning by passing "ignoreTooManyRequestsWarning: true" to "options".`);
    }
  }
  return {
    fontFamily: meta.fontFamily,
    fonts: meta.fonts,
    unicodeRanges: meta.unicodeRanges,
    waitUntilDone: () => Promise.all(promises).then(() => {
      return;
    })
  };
};

// src/Mukta.ts
var getInfo = () => ({
  fontFamily: "Mukta",
  importName: "Mukta",
  version: "v16",
  url: "https://fonts.googleapis.com/css2?family=Mukta:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800",
  unicodeRanges: {
    devanagari: "U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09",
    "latin-ext": "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    latin: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  },
  fonts: {
    normal: {
      "200": {
        devanagari: "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbEOjGmc8WDm7Q.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbEOjGmT8WDm7Q.woff2",
        latin: "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbEOjGmd8WA.woff2"
      },
      "300": {
        devanagari: "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbFqj2mc8WDm7Q.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbFqj2mT8WDm7Q.woff2",
        latin: "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbFqj2md8WA.woff2"
      },
      "400": {
        devanagari: "https://fonts.gstatic.com/s/mukta/v16/iJWKBXyXfDDVXbnArXyi0A.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/mukta/v16/iJWKBXyXfDDVXbnPrXyi0A.woff2",
        latin: "https://fonts.gstatic.com/s/mukta/v16/iJWKBXyXfDDVXbnBrXw.woff2"
      },
      "500": {
        devanagari: "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbEyjmmc8WDm7Q.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbEyjmmT8WDm7Q.woff2",
        latin: "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbEyjmmd8WA.woff2"
      },
      "600": {
        devanagari: "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbEeiWmc8WDm7Q.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbEeiWmT8WDm7Q.woff2",
        latin: "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbEeiWmd8WA.woff2"
      },
      "700": {
        devanagari: "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbF6iGmc8WDm7Q.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbF6iGmT8WDm7Q.woff2",
        latin: "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbF6iGmd8WA.woff2"
      },
      "800": {
        devanagari: "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbFmi2mc8WDm7Q.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbFmi2mT8WDm7Q.woff2",
        latin: "https://fonts.gstatic.com/s/mukta/v16/iJWHBXyXfDDVXbFmi2md8WA.woff2"
      }
    }
  },
  subsets: ["devanagari", "latin", "latin-ext"]
});
var fontFamily = "Mukta";
var loadFont = (style, options) => {
  return loadFonts(getInfo(), style, options);
};



/***/ })

}]);
//# sourceMappingURL=9937.bundle.js.map
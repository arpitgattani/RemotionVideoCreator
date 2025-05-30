"use strict";
(self["webpackChunkvideoapi"] = self["webpackChunkvideoapi"] || []).push([[4594],{

/***/ 54594:
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

// src/Rubik.ts
var getInfo = () => ({
  fontFamily: "Rubik",
  importName: "Rubik",
  version: "v28",
  url: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
  unicodeRanges: {
    arabic: "U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC, U+102E0-102FB, U+10E60-10E7E, U+10EC2-10EC4, U+10EFC-10EFF, U+1EE00-1EE03, U+1EE05-1EE1F, U+1EE21-1EE22, U+1EE24, U+1EE27, U+1EE29-1EE32, U+1EE34-1EE37, U+1EE39, U+1EE3B, U+1EE42, U+1EE47, U+1EE49, U+1EE4B, U+1EE4D-1EE4F, U+1EE51-1EE52, U+1EE54, U+1EE57, U+1EE59, U+1EE5B, U+1EE5D, U+1EE5F, U+1EE61-1EE62, U+1EE64, U+1EE67-1EE6A, U+1EE6C-1EE72, U+1EE74-1EE77, U+1EE79-1EE7C, U+1EE7E, U+1EE80-1EE89, U+1EE8B-1EE9B, U+1EEA1-1EEA3, U+1EEA5-1EEA9, U+1EEAB-1EEBB, U+1EEF0-1EEF1",
    "cyrillic-ext": "U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
    cyrillic: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
    hebrew: "U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F",
    "latin-ext": "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    latin: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  },
  fonts: {
    italic: {
      "300": {
        arabic: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXu61F3f.woff2",
        "cyrillic-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXO61F3f.woff2",
        cyrillic: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXq61F3f.woff2",
        hebrew: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXy61F3f.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXC61F3f.woff2",
        latin: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnX661A.woff2"
      },
      "400": {
        arabic: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXu61F3f.woff2",
        "cyrillic-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXO61F3f.woff2",
        cyrillic: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXq61F3f.woff2",
        hebrew: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXy61F3f.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXC61F3f.woff2",
        latin: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnX661A.woff2"
      },
      "500": {
        arabic: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXu61F3f.woff2",
        "cyrillic-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXO61F3f.woff2",
        cyrillic: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXq61F3f.woff2",
        hebrew: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXy61F3f.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXC61F3f.woff2",
        latin: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnX661A.woff2"
      },
      "600": {
        arabic: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXu61F3f.woff2",
        "cyrillic-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXO61F3f.woff2",
        cyrillic: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXq61F3f.woff2",
        hebrew: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXy61F3f.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXC61F3f.woff2",
        latin: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnX661A.woff2"
      },
      "700": {
        arabic: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXu61F3f.woff2",
        "cyrillic-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXO61F3f.woff2",
        cyrillic: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXq61F3f.woff2",
        hebrew: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXy61F3f.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXC61F3f.woff2",
        latin: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnX661A.woff2"
      },
      "800": {
        arabic: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXu61F3f.woff2",
        "cyrillic-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXO61F3f.woff2",
        cyrillic: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXq61F3f.woff2",
        hebrew: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXy61F3f.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXC61F3f.woff2",
        latin: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnX661A.woff2"
      },
      "900": {
        arabic: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXu61F3f.woff2",
        "cyrillic-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXO61F3f.woff2",
        cyrillic: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXq61F3f.woff2",
        hebrew: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXy61F3f.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnXC61F3f.woff2",
        latin: "https://fonts.gstatic.com/s/rubik/v28/iJWEBXyIfDnIV7nEnX661A.woff2"
      }
    },
    normal: {
      "300": {
        arabic: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nErXyi0A.woff2",
        "cyrillic-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nMrXyi0A.woff2",
        cyrillic: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nFrXyi0A.woff2",
        hebrew: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nDrXyi0A.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nPrXyi0A.woff2",
        latin: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nBrXw.woff2"
      },
      "400": {
        arabic: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nErXyi0A.woff2",
        "cyrillic-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nMrXyi0A.woff2",
        cyrillic: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nFrXyi0A.woff2",
        hebrew: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nDrXyi0A.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nPrXyi0A.woff2",
        latin: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nBrXw.woff2"
      },
      "500": {
        arabic: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nErXyi0A.woff2",
        "cyrillic-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nMrXyi0A.woff2",
        cyrillic: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nFrXyi0A.woff2",
        hebrew: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nDrXyi0A.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nPrXyi0A.woff2",
        latin: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nBrXw.woff2"
      },
      "600": {
        arabic: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nErXyi0A.woff2",
        "cyrillic-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nMrXyi0A.woff2",
        cyrillic: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nFrXyi0A.woff2",
        hebrew: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nDrXyi0A.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nPrXyi0A.woff2",
        latin: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nBrXw.woff2"
      },
      "700": {
        arabic: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nErXyi0A.woff2",
        "cyrillic-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nMrXyi0A.woff2",
        cyrillic: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nFrXyi0A.woff2",
        hebrew: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nDrXyi0A.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nPrXyi0A.woff2",
        latin: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nBrXw.woff2"
      },
      "800": {
        arabic: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nErXyi0A.woff2",
        "cyrillic-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nMrXyi0A.woff2",
        cyrillic: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nFrXyi0A.woff2",
        hebrew: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nDrXyi0A.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nPrXyi0A.woff2",
        latin: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nBrXw.woff2"
      },
      "900": {
        arabic: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nErXyi0A.woff2",
        "cyrillic-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nMrXyi0A.woff2",
        cyrillic: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nFrXyi0A.woff2",
        hebrew: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nDrXyi0A.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nPrXyi0A.woff2",
        latin: "https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nBrXw.woff2"
      }
    }
  },
  subsets: [
    "arabic",
    "cyrillic",
    "cyrillic-ext",
    "hebrew",
    "latin",
    "latin-ext"
  ]
});
var fontFamily = "Rubik";
var loadFont = (style, options) => {
  return loadFonts(getInfo(), style, options);
};



/***/ })

}]);
//# sourceMappingURL=4594.bundle.js.map
"use strict";
(self["webpackChunkvideoapi"] = self["webpackChunkvideoapi"] || []).push([[380],{

/***/ 30380:
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

// src/Kanit.ts
var getInfo = () => ({
  fontFamily: "Kanit",
  importName: "Kanit",
  version: "v15",
  url: "https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
  unicodeRanges: {
    thai: "U+02D7, U+0303, U+0331, U+0E01-0E5B, U+200C-200D, U+25CC",
    vietnamese: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB",
    "latin-ext": "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    latin: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  },
  fonts: {
    italic: {
      "100": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKV-Go6G5tXcraQI2GwZoREDFs.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKV-Go6G5tXcraQI2GwfYREDFs.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKV-Go6G5tXcraQI2GwfIREDFs.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKV-Go6G5tXcraQI2GwcoRE.woff2"
      },
      "200": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI82hZbdhMWJy.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI82hZaxhMWJy.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI82hZa1hMWJy.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI82hZaNhMQ.woff2"
      },
      "300": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI6miZbdhMWJy.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI6miZaxhMWJy.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI6miZa1hMWJy.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI6miZaNhMQ.woff2"
      },
      "400": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKX-Go6G5tXcraQKxaAcJxA.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKX-Go6G5tXcraQKw2AcJxA.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKX-Go6G5tXcraQKwyAcJxA.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKX-Go6G5tXcraQKwKAcA.woff2"
      },
      "500": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI_GjZbdhMWJy.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI_GjZaxhMWJy.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI_GjZa1hMWJy.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI_GjZaNhMQ.woff2"
      },
      "600": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI92kZbdhMWJy.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI92kZaxhMWJy.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI92kZa1hMWJy.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI92kZaNhMQ.woff2"
      },
      "700": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI7mlZbdhMWJy.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI7mlZaxhMWJy.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI7mlZa1hMWJy.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI7mlZaNhMQ.woff2"
      },
      "800": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI6WmZbdhMWJy.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI6WmZaxhMWJy.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI6WmZa1hMWJy.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI6WmZaNhMQ.woff2"
      },
      "900": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI4GnZbdhMWJy.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI4GnZaxhMWJy.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI4GnZa1hMWJy.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI4GnZaNhMQ.woff2"
      }
    },
    normal: {
      "100": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKX-Go6G5tXcr72KxaAcJxA.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKX-Go6G5tXcr72Kw2AcJxA.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKX-Go6G5tXcr72KwyAcJxA.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKX-Go6G5tXcr72KwKAcA.woff2"
      },
      "200": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5aOhWzVaF5NQ.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5aOhWoVaF5NQ.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5aOhWpVaF5NQ.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5aOhWnVaE.woff2"
      },
      "300": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4-ORWzVaF5NQ.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4-ORWoVaF5NQ.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4-ORWpVaF5NQ.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4-ORWnVaE.woff2"
      },
      "400": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKZ-Go6G5tXcraBGwCYdA.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKZ-Go6G5tXcraaGwCYdA.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKZ-Go6G5tXcrabGwCYdA.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKZ-Go6G5tXcraVGwA.woff2"
      },
      "500": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5mOBWzVaF5NQ.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5mOBWoVaF5NQ.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5mOBWpVaF5NQ.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5mOBWnVaE.woff2"
      },
      "600": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5KPxWzVaF5NQ.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5KPxWoVaF5NQ.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5KPxWpVaF5NQ.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5KPxWnVaE.woff2"
      },
      "700": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4uPhWzVaF5NQ.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4uPhWoVaF5NQ.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4uPhWpVaF5NQ.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4uPhWnVaE.woff2"
      },
      "800": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4yPRWzVaF5NQ.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4yPRWoVaF5NQ.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4yPRWpVaF5NQ.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4yPRWnVaE.woff2"
      },
      "900": {
        thai: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4WPBWzVaF5NQ.woff2",
        vietnamese: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4WPBWoVaF5NQ.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4WPBWpVaF5NQ.woff2",
        latin: "https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4WPBWnVaE.woff2"
      }
    }
  },
  subsets: ["latin", "latin-ext", "thai", "vietnamese"]
});
var fontFamily = "Kanit";
var loadFont = (style, options) => {
  return loadFonts(getInfo(), style, options);
};



/***/ })

}]);
//# sourceMappingURL=380.bundle.js.map
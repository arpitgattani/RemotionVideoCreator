"use strict";
(self["webpackChunkvideoapi"] = self["webpackChunkvideoapi"] || []).push([[369],{

/***/ 20369:
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

// src/Prompt.ts
var getInfo = () => ({
  fontFamily: "Prompt",
  importName: "Prompt",
  version: "v10",
  url: "https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
  unicodeRanges: {
    thai: "U+02D7, U+0303, U+0331, U+0E01-0E5B, U+200C-200D, U+25CC",
    vietnamese: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB",
    "latin-ext": "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    latin: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  },
  fonts: {
    italic: {
      "100": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_7XJnvUD7dzB2KZeJ8flALfq0k.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_7XJnvUD7dzB2KZeJ8fksLfq0k.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_7XJnvUD7dzB2KZeJ8fkoLfq0k.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_7XJnvUD7dzB2KZeJ8fkQLfg.woff2"
      },
      "200": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLQb1M4W5Addw.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLQb1MjW5Addw.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLQb1MiW5Addw.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLQb1MsW5A.woff2"
      },
      "300": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeK0bFM4W5Addw.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeK0bFMjW5Addw.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeK0bFMiW5Addw.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeK0bFMsW5A.woff2"
      },
      "400": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB2KZeoLTkYTeg.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB2KZeoQTkYTeg.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB2KZeoRTkYTeg.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB2KZeofTkY.woff2"
      },
      "500": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLsbVM4W5Addw.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLsbVMjW5Addw.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLsbVMiW5Addw.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLsbVMsW5A.woff2"
      },
      "600": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLAalM4W5Addw.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLAalMjW5Addw.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLAalMiW5Addw.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLAalMsW5A.woff2"
      },
      "700": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKka1M4W5Addw.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKka1MjW5Addw.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKka1MiW5Addw.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKka1MsW5A.woff2"
      },
      "800": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeK4aFM4W5Addw.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeK4aFMjW5Addw.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeK4aFMiW5Addw.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeK4aFMsW5A.woff2"
      },
      "900": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKcaVM4W5Addw.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKcaVMjW5Addw.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKcaVMiW5Addw.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKcaVMsW5A.woff2"
      }
    },
    normal: {
      "100": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB2CA-oLTkYTeg.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB2CA-oQTkYTeg.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB2CA-oRTkYTeg.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB2CA-ofTkY.woff2"
      },
      "200": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cr_sIfWMuQ5Q.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cr_sIZmMuQ5Q.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cr_sIZ2MuQ5Q.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cr_sIaWMu.woff2"
      },
      "300": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cy_gIfWMuQ5Q.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cy_gIZmMuQ5Q.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cy_gIZ2MuQ5Q.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cy_gIaWMu.woff2"
      },
      "400": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W__XJnvUD7dzB2KdNodVkI.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W__XJnvUD7dzB2Kb9odVkI.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W__XJnvUD7dzB2KbtodVkI.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W__XJnvUD7dzB2KYNod.woff2"
      },
      "500": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Ck_kIfWMuQ5Q.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Ck_kIZmMuQ5Q.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Ck_kIZ2MuQ5Q.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Ck_kIaWMu.woff2"
      },
      "600": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cv_4IfWMuQ5Q.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cv_4IZmMuQ5Q.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cv_4IZ2MuQ5Q.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cv_4IaWMu.woff2"
      },
      "700": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2C2_8IfWMuQ5Q.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2C2_8IZmMuQ5Q.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2C2_8IZ2MuQ5Q.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2C2_8IaWMu.woff2"
      },
      "800": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cx_wIfWMuQ5Q.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cx_wIZmMuQ5Q.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cx_wIZ2MuQ5Q.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cx_wIaWMu.woff2"
      },
      "900": {
        thai: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2C4_0IfWMuQ5Q.woff2",
        vietnamese: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2C4_0IZmMuQ5Q.woff2",
        "latin-ext": "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2C4_0IZ2MuQ5Q.woff2",
        latin: "https://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2C4_0IaWMu.woff2"
      }
    }
  },
  subsets: ["latin", "latin-ext", "thai", "vietnamese"]
});
var fontFamily = "Prompt";
var loadFont = (style, options) => {
  return loadFonts(getInfo(), style, options);
};



/***/ })

}]);
//# sourceMappingURL=369.bundle.js.map
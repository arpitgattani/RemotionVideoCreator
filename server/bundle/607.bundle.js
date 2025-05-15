"use strict";
(self["webpackChunkvideoapi"] = self["webpackChunkvideoapi"] || []).push([[607],{

/***/ 90695:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/extensions/Extensions.mjs
var Extensions = __webpack_require__(44642);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/app/ResizePlugin.mjs


"use strict";
class ResizePlugin {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(options) {
    Object.defineProperty(
      this,
      "resizeTo",
      /**
       * The HTML element or window to automatically resize the
       * renderer's view element to match width and height.
       * @member {Window|HTMLElement}
       * @name resizeTo
       * @memberof app.Application#
       */
      {
        set(dom) {
          globalThis.removeEventListener("resize", this.queueResize);
          this._resizeTo = dom;
          if (dom) {
            globalThis.addEventListener("resize", this.queueResize);
            this.resize();
          }
        },
        get() {
          return this._resizeTo;
        }
      }
    );
    this.queueResize = () => {
      if (!this._resizeTo) {
        return;
      }
      this._cancelResize();
      this._resizeId = requestAnimationFrame(() => this.resize());
    };
    this._cancelResize = () => {
      if (this._resizeId) {
        cancelAnimationFrame(this._resizeId);
        this._resizeId = null;
      }
    };
    this.resize = () => {
      if (!this._resizeTo) {
        return;
      }
      this._cancelResize();
      let width;
      let height;
      if (this._resizeTo === globalThis.window) {
        width = globalThis.innerWidth;
        height = globalThis.innerHeight;
      } else {
        const { clientWidth, clientHeight } = this._resizeTo;
        width = clientWidth;
        height = clientHeight;
      }
      this.renderer.resize(width, height);
      this.render();
    };
    this._resizeId = null;
    this._resizeTo = null;
    this.resizeTo = options.resizeTo || null;
  }
  /**
   * Clean up the ticker, scoped to application
   * @static
   * @private
   */
  static destroy() {
    globalThis.removeEventListener("resize", this.queueResize);
    this._cancelResize();
    this._cancelResize = null;
    this.queueResize = null;
    this.resizeTo = null;
    this.resize = null;
  }
}
/** @ignore */
ResizePlugin.extension = Extensions/* ExtensionType */.Ag.Application;


//# sourceMappingURL=ResizePlugin.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/ticker/const.mjs
var ticker_const = __webpack_require__(25817);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/ticker/Ticker.mjs + 1 modules
var Ticker = __webpack_require__(37051);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/app/TickerPlugin.mjs




"use strict";
class TickerPlugin {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(options) {
    options = Object.assign({
      autoStart: true,
      sharedTicker: false
    }, options);
    Object.defineProperty(
      this,
      "ticker",
      {
        set(ticker) {
          if (this._ticker) {
            this._ticker.remove(this.render, this);
          }
          this._ticker = ticker;
          if (ticker) {
            ticker.add(this.render, this, ticker_const/* UPDATE_PRIORITY */.d.LOW);
          }
        },
        get() {
          return this._ticker;
        }
      }
    );
    this.stop = () => {
      this._ticker.stop();
    };
    this.start = () => {
      this._ticker.start();
    };
    this._ticker = null;
    this.ticker = options.sharedTicker ? Ticker/* Ticker */.R.shared : new Ticker/* Ticker */.R();
    if (options.autoStart) {
      this.start();
    }
  }
  /**
   * Clean up the ticker, scoped to application.
   * @static
   * @private
   */
  static destroy() {
    if (this._ticker) {
      const oldTicker = this._ticker;
      this.ticker = null;
      oldTicker.destroy();
    }
  }
}
/** @ignore */
TickerPlugin.extension = Extensions/* ExtensionType */.Ag.Application;


//# sourceMappingURL=TickerPlugin.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/app/init.mjs




"use strict";
Extensions/* extensions */.XO.add(ResizePlugin);
Extensions/* extensions */.XO.add(TickerPlugin);
//# sourceMappingURL=init.mjs.map


/***/ }),

/***/ 80323:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/extensions/Extensions.mjs
var Extensions = __webpack_require__(44642);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/filters/FilterPipe.mjs


"use strict";
class FilterPipe {
  constructor(renderer) {
    this._renderer = renderer;
  }
  push(filterEffect, container, instructionSet) {
    const renderPipes = this._renderer.renderPipes;
    renderPipes.batch.break(instructionSet);
    instructionSet.add({
      renderPipeId: "filter",
      canBundle: false,
      action: "pushFilter",
      container,
      filterEffect
    });
  }
  pop(_filterEffect, _container, instructionSet) {
    this._renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add({
      renderPipeId: "filter",
      action: "popFilter",
      canBundle: false
    });
  }
  execute(instruction) {
    if (instruction.action === "pushFilter") {
      this._renderer.filter.push(instruction);
    } else if (instruction.action === "popFilter") {
      this._renderer.filter.pop();
    }
  }
  destroy() {
    this._renderer = null;
  }
}
FilterPipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "filter"
};


//# sourceMappingURL=FilterPipe.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/maths/matrix/Matrix.mjs
var Matrix = __webpack_require__(6736);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/maths/point/Point.mjs
var Point = __webpack_require__(17484);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/gpu/shader/BindGroup.mjs
var BindGroup = __webpack_require__(9562);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/geometry/Geometry.mjs + 2 modules
var Geometry = __webpack_require__(14616);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/shader/UniformGroup.mjs + 2 modules
var UniformGroup = __webpack_require__(7018);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.mjs + 2 modules
var Texture = __webpack_require__(80443);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/TexturePool.mjs
var TexturePool = __webpack_require__(52942);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/types.mjs
var types = __webpack_require__(61558);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/container/bounds/Bounds.mjs
var Bounds = __webpack_require__(53297);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/container/bounds/getRenderableBounds.mjs

function getGlobalRenderableBounds(renderables, bounds) {
  bounds.clear();
  const tempMatrix = bounds.matrix;
  for (let i = 0; i < renderables.length; i++) {
    const renderable = renderables[i];
    if (renderable.globalDisplayStatus < 7) {
      continue;
    }
    bounds.matrix = renderable.worldTransform;
    bounds.addBounds(renderable.bounds);
  }
  bounds.matrix = tempMatrix;
  return bounds;
}


//# sourceMappingURL=getRenderableBounds.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/logging/warn.mjs
var warn = __webpack_require__(55707);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/filters/FilterSystem.mjs













"use strict";
const quadGeometry = new Geometry/* Geometry */.V({
  attributes: {
    aPosition: {
      buffer: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      format: "float32x2",
      stride: 2 * 4,
      offset: 0
    }
  },
  indexBuffer: new Uint32Array([0, 1, 2, 0, 2, 3])
});
class FilterSystem {
  constructor(renderer) {
    this._filterStackIndex = 0;
    this._filterStack = [];
    this._filterGlobalUniforms = new UniformGroup/* UniformGroup */.k({
      uInputSize: { value: new Float32Array(4), type: "vec4<f32>" },
      uInputPixel: { value: new Float32Array(4), type: "vec4<f32>" },
      uInputClamp: { value: new Float32Array(4), type: "vec4<f32>" },
      uOutputFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      uGlobalFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      uOutputTexture: { value: new Float32Array(4), type: "vec4<f32>" }
    });
    this._globalFilterBindGroup = new BindGroup/* BindGroup */.T({});
    this.renderer = renderer;
  }
  /**
   * The back texture of the currently active filter. Requires the filter to have `blendRequired` set to true.
   * @readonly
   */
  get activeBackTexture() {
    return this._activeFilterData?.backTexture;
  }
  push(instruction) {
    const renderer = this.renderer;
    const filters = instruction.filterEffect.filters;
    if (!this._filterStack[this._filterStackIndex]) {
      this._filterStack[this._filterStackIndex] = this._getFilterData();
    }
    const filterData = this._filterStack[this._filterStackIndex];
    this._filterStackIndex++;
    if (filters.length === 0) {
      filterData.skip = true;
      return;
    }
    const bounds = filterData.bounds;
    if (instruction.renderables) {
      getGlobalRenderableBounds(instruction.renderables, bounds);
    } else if (instruction.filterEffect.filterArea) {
      bounds.clear();
      bounds.addRect(instruction.filterEffect.filterArea);
      bounds.applyMatrix(instruction.container.worldTransform);
    } else {
      instruction.container.getFastGlobalBounds(true, bounds);
    }
    if (instruction.container) {
      const renderGroup = instruction.container.renderGroup || instruction.container.parentRenderGroup;
      const filterFrameTransform = renderGroup.cacheToLocalTransform;
      if (filterFrameTransform) {
        bounds.applyMatrix(filterFrameTransform);
      }
    }
    const colorTextureSource = renderer.renderTarget.renderTarget.colorTexture.source;
    let resolution = Infinity;
    let padding = 0;
    let antialias = true;
    let blendRequired = false;
    let enabled = false;
    let clipToViewport = true;
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      resolution = Math.min(resolution, filter.resolution === "inherit" ? colorTextureSource._resolution : filter.resolution);
      padding += filter.padding;
      if (filter.antialias === "off") {
        antialias = false;
      } else if (filter.antialias === "inherit") {
        antialias && (antialias = colorTextureSource.antialias);
      }
      if (!filter.clipToViewport) {
        clipToViewport = false;
      }
      const isCompatible = !!(filter.compatibleRenderers & renderer.type);
      if (!isCompatible) {
        enabled = false;
        break;
      }
      if (filter.blendRequired && !(renderer.backBuffer?.useBackBuffer ?? true)) {
        (0,warn/* warn */.R)("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options.");
        enabled = false;
        break;
      }
      enabled = filter.enabled || enabled;
      blendRequired || (blendRequired = filter.blendRequired);
    }
    if (!enabled) {
      filterData.skip = true;
      return;
    }
    if (clipToViewport) {
      const viewPort = renderer.renderTarget.rootViewPort;
      const rootResolution = renderer.renderTarget.renderTarget.resolution;
      bounds.fitBounds(0, viewPort.width / rootResolution, 0, viewPort.height / rootResolution);
    }
    bounds.scale(resolution).ceil().scale(1 / resolution).pad(padding | 0);
    if (!bounds.isPositive) {
      filterData.skip = true;
      return;
    }
    filterData.skip = false;
    filterData.bounds = bounds;
    filterData.blendRequired = blendRequired;
    filterData.container = instruction.container;
    filterData.filterEffect = instruction.filterEffect;
    filterData.previousRenderSurface = renderer.renderTarget.renderSurface;
    filterData.inputTexture = TexturePool/* TexturePool */.W.getOptimalTexture(
      bounds.width,
      bounds.height,
      resolution,
      antialias
    );
    renderer.renderTarget.bind(filterData.inputTexture, true);
    renderer.globalUniforms.push({
      offset: bounds
    });
  }
  pop() {
    const renderer = this.renderer;
    this._filterStackIndex--;
    const filterData = this._filterStack[this._filterStackIndex];
    if (filterData.skip) {
      return;
    }
    this._activeFilterData = filterData;
    const inputTexture = filterData.inputTexture;
    const bounds = filterData.bounds;
    let backTexture = Texture/* Texture */.g.EMPTY;
    renderer.renderTarget.finishRenderPass();
    if (filterData.blendRequired) {
      const previousBounds = this._filterStackIndex > 0 ? this._filterStack[this._filterStackIndex - 1].bounds : null;
      const renderTarget = renderer.renderTarget.getRenderTarget(filterData.previousRenderSurface);
      backTexture = this.getBackTexture(renderTarget, bounds, previousBounds);
    }
    filterData.backTexture = backTexture;
    const filters = filterData.filterEffect.filters;
    this._globalFilterBindGroup.setResource(inputTexture.source.style, 2);
    this._globalFilterBindGroup.setResource(backTexture.source, 3);
    renderer.globalUniforms.pop();
    if (filters.length === 1) {
      filters[0].apply(this, inputTexture, filterData.previousRenderSurface, false);
      TexturePool/* TexturePool */.W.returnTexture(inputTexture);
    } else {
      let flip = filterData.inputTexture;
      let flop = TexturePool/* TexturePool */.W.getOptimalTexture(
        bounds.width,
        bounds.height,
        flip.source._resolution,
        false
      );
      let i = 0;
      for (i = 0; i < filters.length - 1; ++i) {
        const filter = filters[i];
        filter.apply(this, flip, flop, true);
        const t = flip;
        flip = flop;
        flop = t;
      }
      filters[i].apply(this, flip, filterData.previousRenderSurface, false);
      TexturePool/* TexturePool */.W.returnTexture(flip);
      TexturePool/* TexturePool */.W.returnTexture(flop);
    }
    if (filterData.blendRequired) {
      TexturePool/* TexturePool */.W.returnTexture(backTexture);
    }
  }
  getBackTexture(lastRenderSurface, bounds, previousBounds) {
    const backgroundResolution = lastRenderSurface.colorTexture.source._resolution;
    const backTexture = TexturePool/* TexturePool */.W.getOptimalTexture(
      bounds.width,
      bounds.height,
      backgroundResolution,
      false
    );
    let x = bounds.minX;
    let y = bounds.minY;
    if (previousBounds) {
      x -= previousBounds.minX;
      y -= previousBounds.minY;
    }
    x = Math.floor(x * backgroundResolution);
    y = Math.floor(y * backgroundResolution);
    const width = Math.ceil(bounds.width * backgroundResolution);
    const height = Math.ceil(bounds.height * backgroundResolution);
    this.renderer.renderTarget.copyToTexture(
      lastRenderSurface,
      backTexture,
      { x, y },
      { width, height },
      { x: 0, y: 0 }
    );
    return backTexture;
  }
  applyFilter(filter, input, output, clear) {
    const renderer = this.renderer;
    const filterData = this._filterStack[this._filterStackIndex];
    const bounds = filterData.bounds;
    const offset = Point/* Point */.b.shared;
    const previousRenderSurface = filterData.previousRenderSurface;
    const isFinalTarget = previousRenderSurface === output;
    let resolution = this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution;
    let currentIndex = this._filterStackIndex - 1;
    while (currentIndex > 0 && this._filterStack[currentIndex].skip) {
      --currentIndex;
    }
    if (currentIndex > 0) {
      resolution = this._filterStack[currentIndex].inputTexture.source._resolution;
    }
    const filterUniforms = this._filterGlobalUniforms;
    const uniforms = filterUniforms.uniforms;
    const outputFrame = uniforms.uOutputFrame;
    const inputSize = uniforms.uInputSize;
    const inputPixel = uniforms.uInputPixel;
    const inputClamp = uniforms.uInputClamp;
    const globalFrame = uniforms.uGlobalFrame;
    const outputTexture = uniforms.uOutputTexture;
    if (isFinalTarget) {
      let lastIndex = this._filterStackIndex;
      while (lastIndex > 0) {
        lastIndex--;
        const filterData2 = this._filterStack[this._filterStackIndex - 1];
        if (!filterData2.skip) {
          offset.x = filterData2.bounds.minX;
          offset.y = filterData2.bounds.minY;
          break;
        }
      }
      outputFrame[0] = bounds.minX - offset.x;
      outputFrame[1] = bounds.minY - offset.y;
    } else {
      outputFrame[0] = 0;
      outputFrame[1] = 0;
    }
    outputFrame[2] = input.frame.width;
    outputFrame[3] = input.frame.height;
    inputSize[0] = input.source.width;
    inputSize[1] = input.source.height;
    inputSize[2] = 1 / inputSize[0];
    inputSize[3] = 1 / inputSize[1];
    inputPixel[0] = input.source.pixelWidth;
    inputPixel[1] = input.source.pixelHeight;
    inputPixel[2] = 1 / inputPixel[0];
    inputPixel[3] = 1 / inputPixel[1];
    inputClamp[0] = 0.5 * inputPixel[2];
    inputClamp[1] = 0.5 * inputPixel[3];
    inputClamp[2] = input.frame.width * inputSize[2] - 0.5 * inputPixel[2];
    inputClamp[3] = input.frame.height * inputSize[3] - 0.5 * inputPixel[3];
    const rootTexture = this.renderer.renderTarget.rootRenderTarget.colorTexture;
    globalFrame[0] = offset.x * resolution;
    globalFrame[1] = offset.y * resolution;
    globalFrame[2] = rootTexture.source.width * resolution;
    globalFrame[3] = rootTexture.source.height * resolution;
    const renderTarget = this.renderer.renderTarget.getRenderTarget(output);
    renderer.renderTarget.bind(output, !!clear);
    if (output instanceof Texture/* Texture */.g) {
      outputTexture[0] = output.frame.width;
      outputTexture[1] = output.frame.height;
    } else {
      outputTexture[0] = renderTarget.width;
      outputTexture[1] = renderTarget.height;
    }
    outputTexture[2] = renderTarget.isRoot ? -1 : 1;
    filterUniforms.update();
    if (renderer.renderPipes.uniformBatch) {
      const batchUniforms = renderer.renderPipes.uniformBatch.getUboResource(filterUniforms);
      this._globalFilterBindGroup.setResource(batchUniforms, 0);
    } else {
      this._globalFilterBindGroup.setResource(filterUniforms, 0);
    }
    this._globalFilterBindGroup.setResource(input.source, 1);
    this._globalFilterBindGroup.setResource(input.source.style, 2);
    filter.groups[0] = this._globalFilterBindGroup;
    renderer.encoder.draw({
      geometry: quadGeometry,
      shader: filter,
      state: filter._state,
      topology: "triangle-list"
    });
    if (renderer.type === types/* RendererType */.W.WEBGL) {
      renderer.renderTarget.finishRenderPass();
    }
  }
  _getFilterData() {
    return {
      skip: false,
      inputTexture: null,
      bounds: new Bounds/* Bounds */.c(),
      container: null,
      filterEffect: null,
      blendRequired: false,
      previousRenderSurface: null
    };
  }
  /**
   * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
   *
   * Use `outputMatrix * vTextureCoord` in the shader.
   * @param outputMatrix - The matrix to output to.
   * @param {Sprite} sprite - The sprite to map to.
   * @returns The mapped matrix.
   */
  calculateSpriteMatrix(outputMatrix, sprite) {
    const data = this._activeFilterData;
    const mappedMatrix = outputMatrix.set(
      data.inputTexture._source.width,
      0,
      0,
      data.inputTexture._source.height,
      data.bounds.minX,
      data.bounds.minY
    );
    const worldTransform = sprite.worldTransform.copyTo(Matrix/* Matrix */.u.shared);
    const renderGroup = sprite.renderGroup || sprite.parentRenderGroup;
    if (renderGroup && renderGroup.cacheToLocalTransform) {
      worldTransform.prepend(renderGroup.cacheToLocalTransform);
    }
    worldTransform.invert();
    mappedMatrix.prepend(worldTransform);
    mappedMatrix.scale(
      1 / sprite.texture.frame.width,
      1 / sprite.texture.frame.height
    );
    mappedMatrix.translate(sprite.anchor.x, sprite.anchor.y);
    return mappedMatrix;
  }
}
/** @ignore */
FilterSystem.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLSystem,
    Extensions/* ExtensionType */.Ag.WebGPUSystem
  ],
  name: "filter"
};


//# sourceMappingURL=FilterSystem.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/filters/init.mjs




"use strict";
Extensions/* extensions */.XO.add(FilterSystem);
Extensions/* extensions */.XO.add(FilterPipe);
//# sourceMappingURL=init.mjs.map


/***/ }),

/***/ 82250:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ls: () => (/* binding */ localUniformBit),
/* harmony export */   _Q: () => (/* binding */ localUniformBitGroup2),
/* harmony export */   mA: () => (/* binding */ localUniformBitGl)
/* harmony export */ });

const localUniformBit = {
  name: "local-uniform-bit",
  vertex: {
    header: (
      /* wgsl */
      `

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `
    ),
    main: (
      /* wgsl */
      `
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `
    ),
    end: (
      /* wgsl */
      `
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `
    )
  }
};
const localUniformBitGroup2 = {
  ...localUniformBit,
  vertex: {
    ...localUniformBit.vertex,
    // replace the group!
    header: localUniformBit.vertex.header.replace("group(1)", "group(2)")
  }
};
const localUniformBitGl = {
  name: "local-uniform-bit",
  vertex: {
    header: (
      /* glsl */
      `

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `
    ),
    main: (
      /* glsl */
      `
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `
    ),
    end: (
      /* glsl */
      `
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `
    )
  }
};


//# sourceMappingURL=localUniformBit.mjs.map


/***/ }),

/***/ 17941:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ color32BitToUniform)
/* harmony export */ });
/* unused harmony export colorToUniform */

function colorToUniform(rgb, alpha, out, offset) {
  out[offset++] = (rgb >> 16 & 255) / 255;
  out[offset++] = (rgb >> 8 & 255) / 255;
  out[offset++] = (rgb & 255) / 255;
  out[offset++] = alpha;
}
function color32BitToUniform(abgr, out, offset) {
  const alpha = (abgr >> 24 & 255) / 255;
  out[offset++] = (abgr & 255) / 255 * alpha;
  out[offset++] = (abgr >> 8 & 255) / 255 * alpha;
  out[offset++] = (abgr >> 16 & 255) / 255 * alpha;
  out[offset++] = alpha;
}


//# sourceMappingURL=colorToUniform.mjs.map


/***/ }),

/***/ 71295:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/extensions/Extensions.mjs
var Extensions = __webpack_require__(44642);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/graphics/shared/GraphicsContextSystem.mjs + 13 modules
var GraphicsContextSystem = __webpack_require__(1743);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/state/State.mjs
var State = __webpack_require__(45572);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/pool/PoolGroup.mjs
var PoolGroup = __webpack_require__(70949);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/graphics/gpu/colorToUniform.mjs
var colorToUniform = __webpack_require__(17941);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/graphics/shared/BatchableGraphics.mjs
var BatchableGraphics = __webpack_require__(94183);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/graphics/shared/GraphicsPipe.mjs






"use strict";
class GraphicsPipe {
  constructor(renderer, adaptor) {
    this.state = State/* State */.U.for2d();
    // batchable graphics list, used to render batches
    this._graphicsBatchesHash = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this.renderer = renderer;
    this._adaptor = adaptor;
    this._adaptor.init();
    this.renderer.renderableGC.addManagedHash(this, "_graphicsBatchesHash");
  }
  validateRenderable(graphics) {
    const context = graphics.context;
    const wasBatched = !!this._graphicsBatchesHash[graphics.uid];
    const gpuContext = this.renderer.graphicsContext.updateGpuContext(context);
    if (gpuContext.isBatchable || wasBatched !== gpuContext.isBatchable) {
      return true;
    }
    return false;
  }
  addRenderable(graphics, instructionSet) {
    const gpuContext = this.renderer.graphicsContext.updateGpuContext(graphics.context);
    if (graphics.didViewUpdate) {
      this._rebuild(graphics);
    }
    if (gpuContext.isBatchable) {
      this._addToBatcher(graphics, instructionSet);
    } else {
      this.renderer.renderPipes.batch.break(instructionSet);
      instructionSet.add(graphics);
    }
  }
  updateRenderable(graphics) {
    const batches = this._graphicsBatchesHash[graphics.uid];
    if (batches) {
      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        batch._batcher.updateElement(batch);
      }
    }
  }
  destroyRenderable(graphics) {
    if (this._graphicsBatchesHash[graphics.uid]) {
      this._removeBatchForRenderable(graphics.uid);
    }
    graphics.off("destroyed", this._destroyRenderableBound);
  }
  execute(graphics) {
    if (!graphics.isRenderable)
      return;
    const renderer = this.renderer;
    const context = graphics.context;
    const contextSystem = renderer.graphicsContext;
    if (!contextSystem.getGpuContext(context).batches.length) {
      return;
    }
    const shader = context.customShader || this._adaptor.shader;
    this.state.blendMode = graphics.groupBlendMode;
    const localUniforms = shader.resources.localUniforms.uniforms;
    localUniforms.uTransformMatrix = graphics.groupTransform;
    localUniforms.uRound = renderer._roundPixels | graphics._roundPixels;
    (0,colorToUniform/* color32BitToUniform */.V)(
      graphics.groupColorAlpha,
      localUniforms.uColor,
      0
    );
    this._adaptor.execute(this, graphics);
  }
  _rebuild(graphics) {
    const wasBatched = !!this._graphicsBatchesHash[graphics.uid];
    const gpuContext = this.renderer.graphicsContext.updateGpuContext(graphics.context);
    if (wasBatched) {
      this._removeBatchForRenderable(graphics.uid);
    }
    if (gpuContext.isBatchable) {
      this._initBatchesForRenderable(graphics);
    }
    graphics.batched = gpuContext.isBatchable;
  }
  _addToBatcher(graphics, instructionSet) {
    const batchPipe = this.renderer.renderPipes.batch;
    const batches = this._getBatchesForRenderable(graphics);
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      batchPipe.addToBatch(batch, instructionSet);
    }
  }
  _getBatchesForRenderable(graphics) {
    return this._graphicsBatchesHash[graphics.uid] || this._initBatchesForRenderable(graphics);
  }
  _initBatchesForRenderable(graphics) {
    const context = graphics.context;
    const gpuContext = this.renderer.graphicsContext.getGpuContext(context);
    const roundPixels = this.renderer._roundPixels | graphics._roundPixels;
    const batches = gpuContext.batches.map((batch) => {
      const batchClone = PoolGroup/* BigPool */.Z.get(BatchableGraphics/* BatchableGraphics */.G);
      batch.copyTo(batchClone);
      batchClone.renderable = graphics;
      batchClone.roundPixels = roundPixels;
      return batchClone;
    });
    if (this._graphicsBatchesHash[graphics.uid] === void 0) {
      graphics.on("destroyed", this._destroyRenderableBound);
    }
    this._graphicsBatchesHash[graphics.uid] = batches;
    return batches;
  }
  _removeBatchForRenderable(graphicsUid) {
    this._graphicsBatchesHash[graphicsUid].forEach((batch) => {
      PoolGroup/* BigPool */.Z.return(batch);
    });
    this._graphicsBatchesHash[graphicsUid] = null;
  }
  destroy() {
    this.renderer = null;
    this._adaptor.destroy();
    this._adaptor = null;
    this.state = null;
    for (const i in this._graphicsBatchesHash) {
      this._removeBatchForRenderable(i);
    }
    this._graphicsBatchesHash = null;
  }
}
/** @ignore */
GraphicsPipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "graphics"
};


//# sourceMappingURL=GraphicsPipe.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/graphics/init.mjs




"use strict";
Extensions/* extensions */.XO.add(GraphicsPipe);
Extensions/* extensions */.XO.add(GraphicsContextSystem/* GraphicsContextSystem */.GH);
//# sourceMappingURL=init.mjs.map


/***/ }),

/***/ 69725:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/extensions/Extensions.mjs
var Extensions = __webpack_require__(44642);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/maths/matrix/Matrix.mjs
var Matrix = __webpack_require__(6736);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/gpu/shader/BindGroup.mjs
var BindGroup = __webpack_require__(9562);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/shader/UniformGroup.mjs + 2 modules
var UniformGroup = __webpack_require__(7018);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/state/getAdjustedBlendModeBlend.mjs
var getAdjustedBlendModeBlend = __webpack_require__(50476);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/pool/PoolGroup.mjs
var PoolGroup = __webpack_require__(70949);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/graphics/gpu/colorToUniform.mjs
var colorToUniform = __webpack_require__(17941);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/mesh/shared/BatchableMesh.mjs
var BatchableMesh = __webpack_require__(12711);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/mesh/shared/MeshPipe.mjs









"use strict";
class MeshPipe {
  constructor(renderer, adaptor) {
    this.localUniforms = new UniformGroup/* UniformGroup */.k({
      uTransformMatrix: { value: new Matrix/* Matrix */.u(), type: "mat3x3<f32>" },
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uRound: { value: 0, type: "f32" }
    });
    this.localUniformsBindGroup = new BindGroup/* BindGroup */.T({
      0: this.localUniforms
    });
    this._meshDataHash = /* @__PURE__ */ Object.create(null);
    this._gpuBatchableMeshHash = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this.renderer = renderer;
    this._adaptor = adaptor;
    this._adaptor.init();
    renderer.renderableGC.addManagedHash(this, "_gpuBatchableMeshHash");
    renderer.renderableGC.addManagedHash(this, "_meshDataHash");
  }
  validateRenderable(mesh) {
    const meshData = this._getMeshData(mesh);
    const wasBatched = meshData.batched;
    const isBatched = mesh.batched;
    meshData.batched = isBatched;
    if (wasBatched !== isBatched) {
      return true;
    } else if (isBatched) {
      const geometry = mesh._geometry;
      if (geometry.indices.length !== meshData.indexSize || geometry.positions.length !== meshData.vertexSize) {
        meshData.indexSize = geometry.indices.length;
        meshData.vertexSize = geometry.positions.length;
        return true;
      }
      const batchableMesh = this._getBatchableMesh(mesh);
      if (batchableMesh.texture.uid !== mesh._texture.uid) {
        batchableMesh._textureMatrixUpdateId = -1;
      }
      return !batchableMesh._batcher.checkAndUpdateTexture(
        batchableMesh,
        mesh._texture
      );
    }
    return false;
  }
  addRenderable(mesh, instructionSet) {
    const batcher = this.renderer.renderPipes.batch;
    const { batched } = this._getMeshData(mesh);
    if (batched) {
      const gpuBatchableMesh = this._getBatchableMesh(mesh);
      gpuBatchableMesh.setTexture(mesh._texture);
      gpuBatchableMesh.geometry = mesh._geometry;
      batcher.addToBatch(gpuBatchableMesh, instructionSet);
    } else {
      batcher.break(instructionSet);
      instructionSet.add(mesh);
    }
  }
  updateRenderable(mesh) {
    if (mesh.batched) {
      const gpuBatchableMesh = this._gpuBatchableMeshHash[mesh.uid];
      gpuBatchableMesh.setTexture(mesh._texture);
      gpuBatchableMesh.geometry = mesh._geometry;
      gpuBatchableMesh._batcher.updateElement(gpuBatchableMesh);
    }
  }
  destroyRenderable(mesh) {
    this._meshDataHash[mesh.uid] = null;
    const gpuMesh = this._gpuBatchableMeshHash[mesh.uid];
    if (gpuMesh) {
      PoolGroup/* BigPool */.Z.return(gpuMesh);
      this._gpuBatchableMeshHash[mesh.uid] = null;
    }
    mesh.off("destroyed", this._destroyRenderableBound);
  }
  execute(mesh) {
    if (!mesh.isRenderable)
      return;
    mesh.state.blendMode = (0,getAdjustedBlendModeBlend/* getAdjustedBlendModeBlend */.i)(mesh.groupBlendMode, mesh.texture._source);
    const localUniforms = this.localUniforms;
    localUniforms.uniforms.uTransformMatrix = mesh.groupTransform;
    localUniforms.uniforms.uRound = this.renderer._roundPixels | mesh._roundPixels;
    localUniforms.update();
    (0,colorToUniform/* color32BitToUniform */.V)(
      mesh.groupColorAlpha,
      localUniforms.uniforms.uColor,
      0
    );
    this._adaptor.execute(this, mesh);
  }
  _getMeshData(mesh) {
    return this._meshDataHash[mesh.uid] || this._initMeshData(mesh);
  }
  _initMeshData(mesh) {
    this._meshDataHash[mesh.uid] = {
      batched: mesh.batched,
      indexSize: mesh._geometry.indices?.length,
      vertexSize: mesh._geometry.positions?.length
    };
    mesh.on("destroyed", this._destroyRenderableBound);
    return this._meshDataHash[mesh.uid];
  }
  _getBatchableMesh(mesh) {
    return this._gpuBatchableMeshHash[mesh.uid] || this._initBatchableMesh(mesh);
  }
  _initBatchableMesh(mesh) {
    const gpuMesh = PoolGroup/* BigPool */.Z.get(BatchableMesh/* BatchableMesh */.U);
    gpuMesh.renderable = mesh;
    gpuMesh.setTexture(mesh._texture);
    gpuMesh.transform = mesh.groupTransform;
    gpuMesh.roundPixels = this.renderer._roundPixels | mesh._roundPixels;
    this._gpuBatchableMeshHash[mesh.uid] = gpuMesh;
    return gpuMesh;
  }
  destroy() {
    for (const i in this._gpuBatchableMeshHash) {
      if (this._gpuBatchableMeshHash[i]) {
        PoolGroup/* BigPool */.Z.return(this._gpuBatchableMeshHash[i]);
      }
    }
    this._gpuBatchableMeshHash = null;
    this._meshDataHash = null;
    this.localUniforms = null;
    this.localUniformsBindGroup = null;
    this._adaptor.destroy();
    this._adaptor = null;
    this.renderer = null;
  }
}
/** @ignore */
MeshPipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "mesh"
};


//# sourceMappingURL=MeshPipe.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/mesh/init.mjs



"use strict";
Extensions/* extensions */.XO.add(MeshPipe);
//# sourceMappingURL=init.mjs.map


/***/ }),

/***/ 12711:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ BatchableMesh)
/* harmony export */ });

class BatchableMesh {
  constructor() {
    this.batcherName = "default";
    this.packAsQuad = false;
    this.indexOffset = 0;
    this.attributeOffset = 0;
    this.roundPixels = 0;
    this._batcher = null;
    this._batch = null;
    this._textureMatrixUpdateId = -1;
    this._uvUpdateId = -1;
  }
  get blendMode() {
    return this.renderable.groupBlendMode;
  }
  get topology() {
    return this._topology || this.geometry.topology;
  }
  set topology(value) {
    this._topology = value;
  }
  reset() {
    this.renderable = null;
    this.texture = null;
    this._batcher = null;
    this._batch = null;
    this.geometry = null;
    this._uvUpdateId = -1;
    this._textureMatrixUpdateId = -1;
  }
  /**
   * Sets the texture for the batchable mesh.
   * As it does so, it resets the texture matrix update ID.
   * this is to ensure that the texture matrix is recalculated when the uvs are referenced
   * @param value - The texture to set.
   */
  setTexture(value) {
    if (this.texture === value)
      return;
    this.texture = value;
    this._textureMatrixUpdateId = -1;
  }
  get uvs() {
    const geometry = this.geometry;
    const uvBuffer = geometry.getBuffer("aUV");
    const uvs = uvBuffer.data;
    let transformedUvs = uvs;
    const textureMatrix = this.texture.textureMatrix;
    if (!textureMatrix.isSimple) {
      transformedUvs = this._transformedUvs;
      if (this._textureMatrixUpdateId !== textureMatrix._updateID || this._uvUpdateId !== uvBuffer._updateID) {
        if (!transformedUvs || transformedUvs.length < uvs.length) {
          transformedUvs = this._transformedUvs = new Float32Array(uvs.length);
        }
        this._textureMatrixUpdateId = textureMatrix._updateID;
        this._uvUpdateId = uvBuffer._updateID;
        textureMatrix.multiplyUvs(uvs, transformedUvs);
      }
    }
    return transformedUvs;
  }
  get positions() {
    return this.geometry.positions;
  }
  get indices() {
    return this.geometry.indices;
  }
  get color() {
    return this.renderable.groupColorAlpha;
  }
  get groupTransform() {
    return this.renderable.groupTransform;
  }
  get attributeSize() {
    return this.geometry.positions.length / 2;
  }
  get indexSize() {
    return this.geometry.indices.length;
  }
}


//# sourceMappingURL=BatchableMesh.mjs.map


/***/ }),

/***/ 18609:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/extensions/Extensions.mjs
var Extensions = __webpack_require__(44642);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/particle-container/gl/GlParticleContainerAdaptor.mjs

class GlParticleContainerAdaptor {
  execute(particleContainerPipe, container) {
    const state = particleContainerPipe.state;
    const renderer = particleContainerPipe.renderer;
    const shader = container.shader || particleContainerPipe.defaultShader;
    shader.resources.uTexture = container.texture._source;
    shader.resources.uniforms = particleContainerPipe.localUniforms;
    const gl = renderer.gl;
    const buffer = particleContainerPipe.getBuffers(container);
    renderer.shader.bind(shader);
    renderer.state.set(state);
    renderer.geometry.bind(buffer.geometry, shader.glProgram);
    const byteSize = buffer.geometry.indexBuffer.data.BYTES_PER_ELEMENT;
    const glType = byteSize === 2 ? gl.UNSIGNED_SHORT : gl.UNSIGNED_INT;
    gl.drawElements(gl.TRIANGLES, container.particleChildren.length * 6, glType, 0);
  }
}


//# sourceMappingURL=GlParticleContainerAdaptor.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/maths/matrix/Matrix.mjs
var Matrix = __webpack_require__(6736);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/shader/UniformGroup.mjs + 2 modules
var UniformGroup = __webpack_require__(7018);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/state/getAdjustedBlendModeBlend.mjs
var getAdjustedBlendModeBlend = __webpack_require__(50476);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/state/State.mjs
var State = __webpack_require__(45572);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/graphics/gpu/colorToUniform.mjs
var colorToUniform = __webpack_require__(17941);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/buffer/Buffer.mjs
var Buffer = __webpack_require__(75174);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/buffer/const.mjs
var buffer_const = __webpack_require__(48865);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/geometry/Geometry.mjs + 2 modules
var Geometry = __webpack_require__(14616);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/geometry/utils/getAttributeInfoFromFormat.mjs
var getAttributeInfoFromFormat = __webpack_require__(15045);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/data/ViewableBuffer.mjs
var ViewableBuffer = __webpack_require__(217);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/particle-container/shared/utils/createIndicesForQuads.mjs

function createIndicesForQuads(size, outBuffer = null) {
  const totalIndices = size * 6;
  if (totalIndices > 65535) {
    outBuffer || (outBuffer = new Uint32Array(totalIndices));
  } else {
    outBuffer || (outBuffer = new Uint16Array(totalIndices));
  }
  if (outBuffer.length !== totalIndices) {
    throw new Error(`Out buffer length is incorrect, got ${outBuffer.length} and expected ${totalIndices}`);
  }
  for (let i = 0, j = 0; i < totalIndices; i += 6, j += 4) {
    outBuffer[i + 0] = j + 0;
    outBuffer[i + 1] = j + 1;
    outBuffer[i + 2] = j + 2;
    outBuffer[i + 3] = j + 0;
    outBuffer[i + 4] = j + 2;
    outBuffer[i + 5] = j + 3;
  }
  return outBuffer;
}


//# sourceMappingURL=createIndicesForQuads.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/particle-container/shared/utils/generateParticleUpdateFunction.mjs


"use strict";
function generateParticleUpdateFunction(properties) {
  return {
    dynamicUpdate: generateUpdateFunction(properties, true),
    staticUpdate: generateUpdateFunction(properties, false)
  };
}
function generateUpdateFunction(properties, dynamic) {
  const funcFragments = [];
  funcFragments.push(`
      
        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);
  let offset = 0;
  for (const i in properties) {
    const property = properties[i];
    if (dynamic !== property.dynamic)
      continue;
    funcFragments.push(`offset = index + ${offset}`);
    funcFragments.push(property.code);
    const attributeInfo = (0,getAttributeInfoFromFormat/* getAttributeInfoFromFormat */.m)(property.format);
    offset += attributeInfo.stride / 4;
  }
  funcFragments.push(`
            index += stride * 4;
        }
    `);
  funcFragments.unshift(`
        var stride = ${offset};
    `);
  const functionSource = funcFragments.join("\n");
  return new Function("ps", "f32v", "u32v", functionSource);
}


//# sourceMappingURL=generateParticleUpdateFunction.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/particle-container/shared/ParticleBuffer.mjs








"use strict";
class ParticleBuffer {
  constructor(options) {
    this._size = 0;
    this._generateParticleUpdateCache = {};
    const size = this._size = options.size ?? 1e3;
    const properties = options.properties;
    let staticVertexSize = 0;
    let dynamicVertexSize = 0;
    for (const i in properties) {
      const property = properties[i];
      const attributeInfo = (0,getAttributeInfoFromFormat/* getAttributeInfoFromFormat */.m)(property.format);
      if (property.dynamic) {
        dynamicVertexSize += attributeInfo.stride;
      } else {
        staticVertexSize += attributeInfo.stride;
      }
    }
    this._dynamicStride = dynamicVertexSize / 4;
    this._staticStride = staticVertexSize / 4;
    this.staticAttributeBuffer = new ViewableBuffer/* ViewableBuffer */.u(size * 4 * staticVertexSize);
    this.dynamicAttributeBuffer = new ViewableBuffer/* ViewableBuffer */.u(size * 4 * dynamicVertexSize);
    this.indexBuffer = createIndicesForQuads(size);
    const geometry = new Geometry/* Geometry */.V();
    let dynamicOffset = 0;
    let staticOffset = 0;
    this._staticBuffer = new Buffer/* Buffer */.h({
      data: new Float32Array(1),
      label: "static-particle-buffer",
      shrinkToFit: false,
      usage: buffer_const/* BufferUsage */.S.VERTEX | buffer_const/* BufferUsage */.S.COPY_DST
    });
    this._dynamicBuffer = new Buffer/* Buffer */.h({
      data: new Float32Array(1),
      label: "dynamic-particle-buffer",
      shrinkToFit: false,
      usage: buffer_const/* BufferUsage */.S.VERTEX | buffer_const/* BufferUsage */.S.COPY_DST
    });
    for (const i in properties) {
      const property = properties[i];
      const attributeInfo = (0,getAttributeInfoFromFormat/* getAttributeInfoFromFormat */.m)(property.format);
      if (property.dynamic) {
        geometry.addAttribute(property.attributeName, {
          buffer: this._dynamicBuffer,
          stride: this._dynamicStride * 4,
          offset: dynamicOffset * 4,
          format: property.format
        });
        dynamicOffset += attributeInfo.size;
      } else {
        geometry.addAttribute(property.attributeName, {
          buffer: this._staticBuffer,
          stride: this._staticStride * 4,
          offset: staticOffset * 4,
          format: property.format
        });
        staticOffset += attributeInfo.size;
      }
    }
    geometry.addIndex(this.indexBuffer);
    const uploadFunction = this.getParticleUpdate(properties);
    this._dynamicUpload = uploadFunction.dynamicUpdate;
    this._staticUpload = uploadFunction.staticUpdate;
    this.geometry = geometry;
  }
  getParticleUpdate(properties) {
    const key = getParticleSyncKey(properties);
    if (this._generateParticleUpdateCache[key]) {
      return this._generateParticleUpdateCache[key];
    }
    this._generateParticleUpdateCache[key] = this.generateParticleUpdate(properties);
    return this._generateParticleUpdateCache[key];
  }
  generateParticleUpdate(properties) {
    return generateParticleUpdateFunction(properties);
  }
  update(particles, uploadStatic) {
    if (particles.length > this._size) {
      uploadStatic = true;
      this._size = Math.max(particles.length, this._size * 1.5 | 0);
      this.staticAttributeBuffer = new ViewableBuffer/* ViewableBuffer */.u(this._size * this._staticStride * 4 * 4);
      this.dynamicAttributeBuffer = new ViewableBuffer/* ViewableBuffer */.u(this._size * this._dynamicStride * 4 * 4);
      this.indexBuffer = createIndicesForQuads(this._size);
      this.geometry.indexBuffer.setDataWithSize(
        this.indexBuffer,
        this.indexBuffer.byteLength,
        true
      );
    }
    const dynamicAttributeBuffer = this.dynamicAttributeBuffer;
    this._dynamicUpload(particles, dynamicAttributeBuffer.float32View, dynamicAttributeBuffer.uint32View);
    this._dynamicBuffer.setDataWithSize(
      this.dynamicAttributeBuffer.float32View,
      particles.length * this._dynamicStride * 4,
      true
    );
    if (uploadStatic) {
      const staticAttributeBuffer = this.staticAttributeBuffer;
      this._staticUpload(particles, staticAttributeBuffer.float32View, staticAttributeBuffer.uint32View);
      this._staticBuffer.setDataWithSize(
        staticAttributeBuffer.float32View,
        particles.length * this._staticStride * 4,
        true
      );
    }
  }
  destroy() {
    this._staticBuffer.destroy();
    this._dynamicBuffer.destroy();
    this.geometry.destroy();
  }
}
function getParticleSyncKey(properties) {
  const keyGen = [];
  for (const key in properties) {
    const property = properties[key];
    keyGen.push(key, property.code, property.dynamic ? "d" : "s");
  }
  return keyGen.join("_");
}


//# sourceMappingURL=ParticleBuffer.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/color/Color.mjs + 2 modules
var Color = __webpack_require__(86363);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/gl/shader/GlProgram.mjs + 6 modules
var GlProgram = __webpack_require__(22075);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/gpu/shader/GpuProgram.mjs + 6 modules
var GpuProgram = __webpack_require__(2331);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/shader/Shader.mjs
var Shader = __webpack_require__(47032);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.mjs + 2 modules
var Texture = __webpack_require__(80443);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/TextureStyle.mjs
var TextureStyle = __webpack_require__(87379);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/particle-container/shared/shader/particles.frag.mjs
var fragment = "varying vec2 vUV;\nvarying vec4 vColor;\n\nuniform sampler2D uTexture;\n\nvoid main(void){\n    vec4 color = texture2D(uTexture, vUV) * vColor;\n    gl_FragColor = color;\n}";


//# sourceMappingURL=particles.frag.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/particle-container/shared/shader/particles.vert.mjs
var vertex = "attribute vec2 aVertex;\nattribute vec2 aUV;\nattribute vec4 aColor;\n\nattribute vec2 aPosition;\nattribute float aRotation;\n\nuniform mat3 uTranslationMatrix;\nuniform float uRound;\nuniform vec2 uResolution;\nuniform vec4 uColor;\n\nvarying vec2 vUV;\nvarying vec4 vColor;\n\nvec2 roundPixels(vec2 position, vec2 targetSize)\n{       \n    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;\n}\n\nvoid main(void){\n    float cosRotation = cos(aRotation);\n    float sinRotation = sin(aRotation);\n    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;\n    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;\n\n    vec2 v = vec2(x, y);\n    v = v + aPosition;\n\n    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n    if(uRound == 1.0)\n    {\n        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);\n    }\n\n    vUV = aUV;\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;\n}\n";


//# sourceMappingURL=particles.vert.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/particle-container/shared/shader/particles.wgsl.mjs
var wgsl = "\nstruct ParticleUniforms {\n  uProjectionMatrix:mat3x3<f32>,\n  uColor:vec4<f32>,\n  uResolution:vec2<f32>,\n  uRoundPixels:f32,\n};\n\n@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;\n\n@group(1) @binding(0) var uTexture: texture_2d<f32>;\n@group(1) @binding(1) var uSampler : sampler;\n\nstruct VSOutput {\n    @builtin(position) position: vec4<f32>,\n    @location(0) uv : vec2<f32>,\n    @location(1) color : vec4<f32>,\n  };\n@vertex\nfn mainVertex(\n  @location(0) aVertex: vec2<f32>,\n  @location(1) aPosition: vec2<f32>,\n  @location(2) aUV: vec2<f32>,\n  @location(3) aColor: vec4<f32>,\n  @location(4) aRotation: f32,\n) -> VSOutput {\n  \n   let v = vec2(\n       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),\n       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)\n   ) + aPosition;\n\n   let position = vec4((uniforms.uProjectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;\n\n  return VSOutput(\n   position,\n   aUV,\n   vColor,\n  );\n}\n\n@fragment\nfn mainFragment(\n  @location(0) uv: vec2<f32>,\n  @location(1) color: vec4<f32>,\n  @builtin(position) position: vec4<f32>,\n) -> @location(0) vec4<f32> {\n\n    var sample = textureSample(uTexture, uSampler, uv) * color;\n   \n    return sample;\n}";


//# sourceMappingURL=particles.wgsl.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/particle-container/shared/shader/ParticleShader.mjs











"use strict";
class ParticleShader extends Shader/* Shader */.M {
  constructor() {
    const glProgram = GlProgram/* GlProgram */.M.from({
      vertex: vertex,
      fragment: fragment
    });
    const gpuProgram = GpuProgram/* GpuProgram */.B.from({
      fragment: {
        source: wgsl,
        entryPoint: "mainFragment"
      },
      vertex: {
        source: wgsl,
        entryPoint: "mainVertex"
      }
    });
    super({
      glProgram,
      gpuProgram,
      resources: {
        // this will be replaced with the texture from the particle container
        uTexture: Texture/* Texture */.g.WHITE.source,
        // this will be replaced with the texture style from the particle container
        uSampler: new TextureStyle/* TextureStyle */.n({}),
        // this will be replaced with the local uniforms from the particle container
        uniforms: {
          uTranslationMatrix: { value: new Matrix/* Matrix */.u(), type: "mat3x3<f32>" },
          uColor: { value: new Color/* Color */.Q(16777215), type: "vec4<f32>" },
          uRound: { value: 1, type: "f32" },
          uResolution: { value: [0, 0], type: "vec2<f32>" }
        }
      }
    });
  }
}


//# sourceMappingURL=ParticleShader.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/particle-container/shared/ParticleContainerPipe.mjs








"use strict";
class ParticleContainerPipe {
  /**
   * @param renderer - The renderer this sprite batch works for.
   * @param adaptor
   */
  constructor(renderer, adaptor) {
    this.state = State/* State */.U.for2d();
    this._gpuBufferHash = /* @__PURE__ */ Object.create(null);
    // eslint-disable-next-line max-len
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this.localUniforms = new UniformGroup/* UniformGroup */.k({
      uTranslationMatrix: { value: new Matrix/* Matrix */.u(), type: "mat3x3<f32>" },
      uColor: { value: new Float32Array(4), type: "vec4<f32>" },
      uRound: { value: 1, type: "f32" },
      uResolution: { value: [0, 0], type: "vec2<f32>" }
    });
    this.renderer = renderer;
    this.adaptor = adaptor;
    this.defaultShader = new ParticleShader();
    this.state = State/* State */.U.for2d();
  }
  validateRenderable(_renderable) {
    return false;
  }
  addRenderable(renderable, instructionSet) {
    this.renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add(renderable);
  }
  getBuffers(renderable) {
    return this._gpuBufferHash[renderable.uid] || this._initBuffer(renderable);
  }
  _initBuffer(renderable) {
    this._gpuBufferHash[renderable.uid] = new ParticleBuffer({
      size: renderable.particleChildren.length,
      properties: renderable._properties
    });
    renderable.on("destroyed", this._destroyRenderableBound);
    return this._gpuBufferHash[renderable.uid];
  }
  updateRenderable(_renderable) {
  }
  destroyRenderable(renderable) {
    const buffer = this._gpuBufferHash[renderable.uid];
    buffer.destroy();
    this._gpuBufferHash[renderable.uid] = null;
    renderable.off("destroyed", this._destroyRenderableBound);
  }
  execute(container) {
    const children = container.particleChildren;
    if (children.length === 0) {
      return;
    }
    const renderer = this.renderer;
    const buffer = this.getBuffers(container);
    container.texture || (container.texture = children[0].texture);
    const state = this.state;
    buffer.update(children, container._childrenDirty);
    container._childrenDirty = false;
    state.blendMode = (0,getAdjustedBlendModeBlend/* getAdjustedBlendModeBlend */.i)(container.blendMode, container.texture._source);
    const uniforms = this.localUniforms.uniforms;
    const transformationMatrix = uniforms.uTranslationMatrix;
    container.worldTransform.copyTo(transformationMatrix);
    transformationMatrix.prepend(renderer.globalUniforms.globalUniformData.projectionMatrix);
    uniforms.uResolution = renderer.globalUniforms.globalUniformData.resolution;
    uniforms.uRound = renderer._roundPixels | container._roundPixels;
    (0,colorToUniform/* color32BitToUniform */.V)(
      container.groupColorAlpha,
      uniforms.uColor,
      0
    );
    this.adaptor.execute(this, container);
  }
  /** Destroys the ParticleRenderer. */
  destroy() {
    if (this.defaultShader) {
      this.defaultShader.destroy();
      this.defaultShader = null;
    }
  }
}


//# sourceMappingURL=ParticleContainerPipe.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/particle-container/shared/GlParticleContainerPipe.mjs




"use strict";
class GlParticleContainerPipe extends ParticleContainerPipe {
  constructor(renderer) {
    super(renderer, new GlParticleContainerAdaptor());
  }
}
/** @ignore */
GlParticleContainerPipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes
  ],
  name: "particle"
};


//# sourceMappingURL=GlParticleContainerPipe.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/particle-container/gpu/GpuParticleContainerAdaptor.mjs

class GpuParticleContainerAdaptor {
  execute(particleContainerPipe, container) {
    const renderer = particleContainerPipe.renderer;
    const shader = container.shader || particleContainerPipe.defaultShader;
    shader.groups[0] = renderer.renderPipes.uniformBatch.getUniformBindGroup(particleContainerPipe.localUniforms, true);
    shader.groups[1] = renderer.texture.getTextureBindGroup(container.texture);
    const state = particleContainerPipe.state;
    const buffer = particleContainerPipe.getBuffers(container);
    renderer.encoder.draw({
      geometry: buffer.geometry,
      shader: container.shader || particleContainerPipe.defaultShader,
      state,
      size: container.particleChildren.length * 6
    });
  }
}


//# sourceMappingURL=GpuParticleContainerAdaptor.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/particle-container/shared/GpuParticleContainerPipe.mjs




"use strict";
class GpuParticleContainerPipe extends ParticleContainerPipe {
  constructor(renderer) {
    super(renderer, new GpuParticleContainerAdaptor());
  }
}
/** @ignore */
GpuParticleContainerPipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGPUPipes
  ],
  name: "particle"
};


//# sourceMappingURL=GpuParticleContainerPipe.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/particle-container/init.mjs




"use strict";
Extensions/* extensions */.XO.add(GlParticleContainerPipe);
Extensions/* extensions */.XO.add(GpuParticleContainerPipe);
//# sourceMappingURL=init.mjs.map


/***/ }),

/***/ 53351:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/extensions/Extensions.mjs
var Extensions = __webpack_require__(44642);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/pool/PoolGroup.mjs
var PoolGroup = __webpack_require__(70949);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/mesh/shared/BatchableMesh.mjs
var BatchableMesh = __webpack_require__(12711);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/logging/deprecation.mjs
var deprecation = __webpack_require__(63735);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/mesh/shared/MeshGeometry.mjs
var MeshGeometry = __webpack_require__(78623);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/mesh-plane/PlaneGeometry.mjs



"use strict";
const _PlaneGeometry = class _PlaneGeometry extends MeshGeometry/* MeshGeometry */.u {
  constructor(...args) {
    super({});
    let options = args[0] ?? {};
    if (typeof options === "number") {
      (0,deprecation/* deprecation */.t6)(deprecation/* v8_0_0 */.lj, "PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead");
      options = {
        width: options,
        height: args[1],
        verticesX: args[2],
        verticesY: args[3]
      };
    }
    this.build(options);
  }
  /**
   * Refreshes plane coordinates
   * @param options - Options to be applied to plane geometry
   */
  build(options) {
    options = { ..._PlaneGeometry.defaultOptions, ...options };
    this.verticesX = this.verticesX ?? options.verticesX;
    this.verticesY = this.verticesY ?? options.verticesY;
    this.width = this.width ?? options.width;
    this.height = this.height ?? options.height;
    const total = this.verticesX * this.verticesY;
    const verts = [];
    const uvs = [];
    const indices = [];
    const verticesX = this.verticesX - 1;
    const verticesY = this.verticesY - 1;
    const sizeX = this.width / verticesX;
    const sizeY = this.height / verticesY;
    for (let i = 0; i < total; i++) {
      const x = i % this.verticesX;
      const y = i / this.verticesX | 0;
      verts.push(x * sizeX, y * sizeY);
      uvs.push(x / verticesX, y / verticesY);
    }
    const totalSub = verticesX * verticesY;
    for (let i = 0; i < totalSub; i++) {
      const xpos = i % verticesX;
      const ypos = i / verticesX | 0;
      const value = ypos * this.verticesX + xpos;
      const value2 = ypos * this.verticesX + xpos + 1;
      const value3 = (ypos + 1) * this.verticesX + xpos;
      const value4 = (ypos + 1) * this.verticesX + xpos + 1;
      indices.push(
        value,
        value2,
        value3,
        value2,
        value4,
        value3
      );
    }
    this.buffers[0].data = new Float32Array(verts);
    this.buffers[1].data = new Float32Array(uvs);
    this.indexBuffer.data = new Uint32Array(indices);
    this.buffers[0].update();
    this.buffers[1].update();
    this.indexBuffer.update();
  }
};
_PlaneGeometry.defaultOptions = {
  width: 100,
  height: 100,
  verticesX: 10,
  verticesY: 10
};
let PlaneGeometry = _PlaneGeometry;


//# sourceMappingURL=PlaneGeometry.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite-nine-slice/NineSliceGeometry.mjs


"use strict";
const _NineSliceGeometry = class _NineSliceGeometry extends PlaneGeometry {
  constructor(options = {}) {
    options = { ..._NineSliceGeometry.defaultOptions, ...options };
    super({
      width: options.width,
      height: options.height,
      verticesX: 4,
      verticesY: 4
    });
    this.update(options);
  }
  /**
   * Updates the NineSliceGeometry with the options.
   * @param options - The options of the NineSliceGeometry.
   */
  update(options) {
    this.width = options.width ?? this.width;
    this.height = options.height ?? this.height;
    this._originalWidth = options.originalWidth ?? this._originalWidth;
    this._originalHeight = options.originalHeight ?? this._originalHeight;
    this._leftWidth = options.leftWidth ?? this._leftWidth;
    this._rightWidth = options.rightWidth ?? this._rightWidth;
    this._topHeight = options.topHeight ?? this._topHeight;
    this._bottomHeight = options.bottomHeight ?? this._bottomHeight;
    this._anchorX = options.anchor?.x;
    this._anchorY = options.anchor?.y;
    this.updateUvs();
    this.updatePositions();
  }
  /** Updates the positions of the vertices. */
  updatePositions() {
    const p = this.positions;
    const {
      width,
      height,
      _leftWidth,
      _rightWidth,
      _topHeight,
      _bottomHeight,
      _anchorX,
      _anchorY
    } = this;
    const w = _leftWidth + _rightWidth;
    const scaleW = width > w ? 1 : width / w;
    const h = _topHeight + _bottomHeight;
    const scaleH = height > h ? 1 : height / h;
    const scale = Math.min(scaleW, scaleH);
    const anchorOffsetX = _anchorX * width;
    const anchorOffsetY = _anchorY * height;
    p[0] = p[8] = p[16] = p[24] = -anchorOffsetX;
    p[2] = p[10] = p[18] = p[26] = _leftWidth * scale - anchorOffsetX;
    p[4] = p[12] = p[20] = p[28] = width - _rightWidth * scale - anchorOffsetX;
    p[6] = p[14] = p[22] = p[30] = width - anchorOffsetX;
    p[1] = p[3] = p[5] = p[7] = -anchorOffsetY;
    p[9] = p[11] = p[13] = p[15] = _topHeight * scale - anchorOffsetY;
    p[17] = p[19] = p[21] = p[23] = height - _bottomHeight * scale - anchorOffsetY;
    p[25] = p[27] = p[29] = p[31] = height - anchorOffsetY;
    this.getBuffer("aPosition").update();
  }
  /** Updates the UVs of the vertices. */
  updateUvs() {
    const uvs = this.uvs;
    uvs[0] = uvs[8] = uvs[16] = uvs[24] = 0;
    uvs[1] = uvs[3] = uvs[5] = uvs[7] = 0;
    uvs[6] = uvs[14] = uvs[22] = uvs[30] = 1;
    uvs[25] = uvs[27] = uvs[29] = uvs[31] = 1;
    const _uvw = 1 / this._originalWidth;
    const _uvh = 1 / this._originalHeight;
    uvs[2] = uvs[10] = uvs[18] = uvs[26] = _uvw * this._leftWidth;
    uvs[9] = uvs[11] = uvs[13] = uvs[15] = _uvh * this._topHeight;
    uvs[4] = uvs[12] = uvs[20] = uvs[28] = 1 - _uvw * this._rightWidth;
    uvs[17] = uvs[19] = uvs[21] = uvs[23] = 1 - _uvh * this._bottomHeight;
    this.getBuffer("aUV").update();
  }
};
/** The default options for the NineSliceGeometry. */
_NineSliceGeometry.defaultOptions = {
  /** The width of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
  width: 100,
  /** The height of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
  height: 100,
  /** The width of the left column. */
  leftWidth: 10,
  /** The height of the top row. */
  topHeight: 10,
  /** The width of the right column. */
  rightWidth: 10,
  /** The height of the bottom row. */
  bottomHeight: 10,
  /** The original width of the texture */
  originalWidth: 100,
  /** The original height of the texture */
  originalHeight: 100
};
let NineSliceGeometry = _NineSliceGeometry;


//# sourceMappingURL=NineSliceGeometry.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite-nine-slice/NineSliceSpritePipe.mjs





"use strict";
class NineSliceSpritePipe {
  constructor(renderer) {
    this._gpuSpriteHash = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
    this._renderer.renderableGC.addManagedHash(this, "_gpuSpriteHash");
  }
  addRenderable(sprite, instructionSet) {
    const gpuSprite = this._getGpuSprite(sprite);
    if (sprite.didViewUpdate)
      this._updateBatchableSprite(sprite, gpuSprite);
    this._renderer.renderPipes.batch.addToBatch(gpuSprite, instructionSet);
  }
  updateRenderable(sprite) {
    const gpuSprite = this._gpuSpriteHash[sprite.uid];
    if (sprite.didViewUpdate)
      this._updateBatchableSprite(sprite, gpuSprite);
    gpuSprite._batcher.updateElement(gpuSprite);
  }
  validateRenderable(sprite) {
    const gpuSprite = this._getGpuSprite(sprite);
    return !gpuSprite._batcher.checkAndUpdateTexture(
      gpuSprite,
      sprite._texture
    );
  }
  destroyRenderable(sprite) {
    const batchableMesh = this._gpuSpriteHash[sprite.uid];
    PoolGroup/* BigPool */.Z.return(batchableMesh.geometry);
    PoolGroup/* BigPool */.Z.return(batchableMesh);
    this._gpuSpriteHash[sprite.uid] = null;
    sprite.off("destroyed", this._destroyRenderableBound);
  }
  _updateBatchableSprite(sprite, batchableSprite) {
    batchableSprite.geometry.update(sprite);
    batchableSprite.setTexture(sprite._texture);
  }
  _getGpuSprite(sprite) {
    return this._gpuSpriteHash[sprite.uid] || this._initGPUSprite(sprite);
  }
  _initGPUSprite(sprite) {
    const batchableMesh = PoolGroup/* BigPool */.Z.get(BatchableMesh/* BatchableMesh */.U);
    batchableMesh.geometry = PoolGroup/* BigPool */.Z.get(NineSliceGeometry);
    batchableMesh.renderable = sprite;
    batchableMesh.transform = sprite.groupTransform;
    batchableMesh.texture = sprite._texture;
    batchableMesh.roundPixels = this._renderer._roundPixels | sprite._roundPixels;
    this._gpuSpriteHash[sprite.uid] = batchableMesh;
    if (!sprite.didViewUpdate) {
      this._updateBatchableSprite(sprite, batchableMesh);
    }
    sprite.on("destroyed", this._destroyRenderableBound);
    return batchableMesh;
  }
  destroy() {
    for (const i in this._gpuSpriteHash) {
      const batchableMesh = this._gpuSpriteHash[i];
      batchableMesh.geometry.destroy();
    }
    this._gpuSpriteHash = null;
    this._renderer = null;
  }
}
/** @ignore */
NineSliceSpritePipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "nineSliceSprite"
};


//# sourceMappingURL=NineSliceSpritePipe.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite-nine-slice/init.mjs



"use strict";
Extensions/* extensions */.XO.add(NineSliceSpritePipe);
//# sourceMappingURL=init.mjs.map


/***/ }),

/***/ 15233:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/extensions/Extensions.mjs
var Extensions = __webpack_require__(44642);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/state/getAdjustedBlendModeBlend.mjs
var getAdjustedBlendModeBlend = __webpack_require__(50476);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/state/State.mjs
var State = __webpack_require__(45572);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/types.mjs
var types = __webpack_require__(61558);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/graphics/gpu/colorToUniform.mjs
var colorToUniform = __webpack_require__(17941);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/mesh/shared/BatchableMesh.mjs
var BatchableMesh = __webpack_require__(12711);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/mesh/shared/MeshGeometry.mjs
var MeshGeometry = __webpack_require__(78623);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/maths/matrix/Matrix.mjs
var Matrix = __webpack_require__(6736);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/high-shader/compileHighShaderToProgram.mjs + 8 modules
var compileHighShaderToProgram = __webpack_require__(55635);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/high-shader/shader-bits/localUniformBit.mjs
var localUniformBit = __webpack_require__(82250);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/high-shader/shader-bits/roundPixelsBit.mjs
var roundPixelsBit = __webpack_require__(90926);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/shader/Shader.mjs
var Shader = __webpack_require__(47032);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/shader/UniformGroup.mjs + 2 modules
var UniformGroup = __webpack_require__(7018);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.mjs + 2 modules
var Texture = __webpack_require__(80443);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite-tiling/shader/tilingBit.mjs

const tilingBit = {
  name: "tiling-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `
    ),
    main: (
      /* wgsl */
      `
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `
    )
  },
  fragment: {
    header: (
      /* wgsl */
      `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `
    ),
    main: (
      /* wgsl */
      `

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            } 

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `
    )
  }
};
const tilingBitGl = {
  name: "tiling-bit",
  vertex: {
    header: (
      /* glsl */
      `
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;
        
        `
    ),
    main: (
      /* glsl */
      `
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `
    )
  },
  fragment: {
    header: (
      /* glsl */
      `
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `
    ),
    main: (
      /* glsl */
      `

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);
        
        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0
    
        `
    )
  }
};


//# sourceMappingURL=tilingBit.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite-tiling/shader/TilingSpriteShader.mjs









"use strict";
let gpuProgram;
let glProgram;
class TilingSpriteShader extends Shader/* Shader */.M {
  constructor() {
    gpuProgram ?? (gpuProgram = (0,compileHighShaderToProgram/* compileHighShaderGpuProgram */.v)({
      name: "tiling-sprite-shader",
      bits: [
        localUniformBit/* localUniformBit */.Ls,
        tilingBit,
        roundPixelsBit/* roundPixelsBit */.b
      ]
    }));
    glProgram ?? (glProgram = (0,compileHighShaderToProgram/* compileHighShaderGlProgram */.I)({
      name: "tiling-sprite-shader",
      bits: [
        localUniformBit/* localUniformBitGl */.mA,
        tilingBitGl,
        roundPixelsBit/* roundPixelsBitGl */.m
      ]
    }));
    const tilingUniforms = new UniformGroup/* UniformGroup */.k({
      uMapCoord: { value: new Matrix/* Matrix */.u(), type: "mat3x3<f32>" },
      uClampFrame: { value: new Float32Array([0, 0, 1, 1]), type: "vec4<f32>" },
      uClampOffset: { value: new Float32Array([0, 0]), type: "vec2<f32>" },
      uTextureTransform: { value: new Matrix/* Matrix */.u(), type: "mat3x3<f32>" },
      uSizeAnchor: { value: new Float32Array([100, 100, 0.5, 0.5]), type: "vec4<f32>" }
    });
    super({
      glProgram,
      gpuProgram,
      resources: {
        localUniforms: new UniformGroup/* UniformGroup */.k({
          uTransformMatrix: { value: new Matrix/* Matrix */.u(), type: "mat3x3<f32>" },
          uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
          uRound: { value: 0, type: "f32" }
        }),
        tilingUniforms,
        uTexture: Texture/* Texture */.g.EMPTY.source,
        uSampler: Texture/* Texture */.g.EMPTY.source.style
      }
    });
  }
  updateUniforms(width, height, matrix, anchorX, anchorY, texture) {
    const tilingUniforms = this.resources.tilingUniforms;
    const textureWidth = texture.width;
    const textureHeight = texture.height;
    const textureMatrix = texture.textureMatrix;
    const uTextureTransform = tilingUniforms.uniforms.uTextureTransform;
    uTextureTransform.set(
      matrix.a * textureWidth / width,
      matrix.b * textureWidth / height,
      matrix.c * textureHeight / width,
      matrix.d * textureHeight / height,
      matrix.tx / width,
      matrix.ty / height
    );
    uTextureTransform.invert();
    tilingUniforms.uniforms.uMapCoord = textureMatrix.mapCoord;
    tilingUniforms.uniforms.uClampFrame = textureMatrix.uClampFrame;
    tilingUniforms.uniforms.uClampOffset = textureMatrix.uClampOffset;
    tilingUniforms.uniforms.uTextureTransform = uTextureTransform;
    tilingUniforms.uniforms.uSizeAnchor[0] = width;
    tilingUniforms.uniforms.uSizeAnchor[1] = height;
    tilingUniforms.uniforms.uSizeAnchor[2] = anchorX;
    tilingUniforms.uniforms.uSizeAnchor[3] = anchorY;
    if (texture) {
      this.resources.uTexture = texture.source;
      this.resources.uSampler = texture.source.style;
    }
  }
}


//# sourceMappingURL=TilingSpriteShader.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite-tiling/utils/QuadGeometry.mjs


"use strict";
class QuadGeometry extends MeshGeometry/* MeshGeometry */.u {
  constructor() {
    super({
      positions: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      indices: new Uint32Array([0, 1, 2, 0, 2, 3])
    });
  }
}


//# sourceMappingURL=QuadGeometry.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite-tiling/utils/setPositions.mjs

function setPositions(tilingSprite, positions) {
  const anchorX = tilingSprite.anchor.x;
  const anchorY = tilingSprite.anchor.y;
  positions[0] = -anchorX * tilingSprite.width;
  positions[1] = -anchorY * tilingSprite.height;
  positions[2] = (1 - anchorX) * tilingSprite.width;
  positions[3] = -anchorY * tilingSprite.height;
  positions[4] = (1 - anchorX) * tilingSprite.width;
  positions[5] = (1 - anchorY) * tilingSprite.height;
  positions[6] = -anchorX * tilingSprite.width;
  positions[7] = (1 - anchorY) * tilingSprite.height;
}


//# sourceMappingURL=setPositions.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite-tiling/utils/applyMatrix.mjs

function applyMatrix(array, stride, offset, matrix) {
  let index = 0;
  const size = array.length / (stride || 2);
  const a = matrix.a;
  const b = matrix.b;
  const c = matrix.c;
  const d = matrix.d;
  const tx = matrix.tx;
  const ty = matrix.ty;
  offset *= stride;
  while (index < size) {
    const x = array[offset];
    const y = array[offset + 1];
    array[offset] = a * x + c * y + tx;
    array[offset + 1] = b * x + d * y + ty;
    offset += stride;
    index++;
  }
}


//# sourceMappingURL=applyMatrix.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite-tiling/utils/setUvs.mjs



"use strict";
function setUvs(tilingSprite, uvs) {
  const texture = tilingSprite.texture;
  const width = texture.frame.width;
  const height = texture.frame.height;
  let anchorX = 0;
  let anchorY = 0;
  if (tilingSprite.applyAnchorToTexture) {
    anchorX = tilingSprite.anchor.x;
    anchorY = tilingSprite.anchor.y;
  }
  uvs[0] = uvs[6] = -anchorX;
  uvs[2] = uvs[4] = 1 - anchorX;
  uvs[1] = uvs[3] = -anchorY;
  uvs[5] = uvs[7] = 1 - anchorY;
  const textureMatrix = Matrix/* Matrix */.u.shared;
  textureMatrix.copyFrom(tilingSprite._tileTransform.matrix);
  textureMatrix.tx /= tilingSprite.width;
  textureMatrix.ty /= tilingSprite.height;
  textureMatrix.invert();
  textureMatrix.scale(tilingSprite.width / width, tilingSprite.height / height);
  applyMatrix(uvs, 2, 0, textureMatrix);
}


//# sourceMappingURL=setUvs.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite-tiling/TilingSpritePipe.mjs












"use strict";
const sharedQuad = new QuadGeometry();
class TilingSpritePipe {
  constructor(renderer) {
    this._state = State/* State */.U.default2d;
    this._tilingSpriteDataHash = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
    this._renderer.renderableGC.addManagedHash(this, "_tilingSpriteDataHash");
  }
  validateRenderable(renderable) {
    const tilingSpriteData = this._getTilingSpriteData(renderable);
    const couldBatch = tilingSpriteData.canBatch;
    this._updateCanBatch(renderable);
    const canBatch = tilingSpriteData.canBatch;
    if (canBatch && canBatch === couldBatch) {
      const { batchableMesh } = tilingSpriteData;
      return !batchableMesh._batcher.checkAndUpdateTexture(
        batchableMesh,
        renderable.texture
      );
    }
    return couldBatch !== canBatch;
  }
  addRenderable(tilingSprite, instructionSet) {
    const batcher = this._renderer.renderPipes.batch;
    this._updateCanBatch(tilingSprite);
    const tilingSpriteData = this._getTilingSpriteData(tilingSprite);
    const { geometry, canBatch } = tilingSpriteData;
    if (canBatch) {
      tilingSpriteData.batchableMesh || (tilingSpriteData.batchableMesh = new BatchableMesh/* BatchableMesh */.U());
      const batchableMesh = tilingSpriteData.batchableMesh;
      if (tilingSprite.didViewUpdate) {
        this._updateBatchableMesh(tilingSprite);
        batchableMesh.geometry = geometry;
        batchableMesh.renderable = tilingSprite;
        batchableMesh.transform = tilingSprite.groupTransform;
        batchableMesh.setTexture(tilingSprite._texture);
      }
      batchableMesh.roundPixels = this._renderer._roundPixels | tilingSprite._roundPixels;
      batcher.addToBatch(batchableMesh, instructionSet);
    } else {
      batcher.break(instructionSet);
      tilingSpriteData.shader || (tilingSpriteData.shader = new TilingSpriteShader());
      this.updateRenderable(tilingSprite);
      instructionSet.add(tilingSprite);
    }
  }
  execute(tilingSprite) {
    const { shader } = this._tilingSpriteDataHash[tilingSprite.uid];
    shader.groups[0] = this._renderer.globalUniforms.bindGroup;
    const localUniforms = shader.resources.localUniforms.uniforms;
    localUniforms.uTransformMatrix = tilingSprite.groupTransform;
    localUniforms.uRound = this._renderer._roundPixels | tilingSprite._roundPixels;
    (0,colorToUniform/* color32BitToUniform */.V)(
      tilingSprite.groupColorAlpha,
      localUniforms.uColor,
      0
    );
    this._state.blendMode = (0,getAdjustedBlendModeBlend/* getAdjustedBlendModeBlend */.i)(tilingSprite.groupBlendMode, tilingSprite.texture._source);
    this._renderer.encoder.draw({
      geometry: sharedQuad,
      shader,
      state: this._state
    });
  }
  updateRenderable(tilingSprite) {
    const tilingSpriteData = this._getTilingSpriteData(tilingSprite);
    const { canBatch } = tilingSpriteData;
    if (canBatch) {
      const { batchableMesh } = tilingSpriteData;
      if (tilingSprite.didViewUpdate)
        this._updateBatchableMesh(tilingSprite);
      batchableMesh._batcher.updateElement(batchableMesh);
    } else if (tilingSprite.didViewUpdate) {
      const { shader } = tilingSpriteData;
      shader.updateUniforms(
        tilingSprite.width,
        tilingSprite.height,
        tilingSprite._tileTransform.matrix,
        tilingSprite.anchor.x,
        tilingSprite.anchor.y,
        tilingSprite.texture
      );
    }
  }
  destroyRenderable(tilingSprite) {
    const tilingSpriteData = this._getTilingSpriteData(tilingSprite);
    tilingSpriteData.batchableMesh = null;
    tilingSpriteData.shader?.destroy();
    this._tilingSpriteDataHash[tilingSprite.uid] = null;
    tilingSprite.off("destroyed", this._destroyRenderableBound);
  }
  _getTilingSpriteData(renderable) {
    return this._tilingSpriteDataHash[renderable.uid] || this._initTilingSpriteData(renderable);
  }
  _initTilingSpriteData(tilingSprite) {
    const geometry = new MeshGeometry/* MeshGeometry */.u({
      indices: sharedQuad.indices,
      positions: sharedQuad.positions.slice(),
      uvs: sharedQuad.uvs.slice()
    });
    this._tilingSpriteDataHash[tilingSprite.uid] = {
      canBatch: true,
      renderable: tilingSprite,
      geometry
    };
    tilingSprite.on("destroyed", this._destroyRenderableBound);
    return this._tilingSpriteDataHash[tilingSprite.uid];
  }
  _updateBatchableMesh(tilingSprite) {
    const renderableData = this._getTilingSpriteData(tilingSprite);
    const { geometry } = renderableData;
    const style = tilingSprite.texture.source.style;
    if (style.addressMode !== "repeat") {
      style.addressMode = "repeat";
      style.update();
    }
    setUvs(tilingSprite, geometry.uvs);
    setPositions(tilingSprite, geometry.positions);
  }
  destroy() {
    for (const i in this._tilingSpriteDataHash) {
      this.destroyRenderable(this._tilingSpriteDataHash[i].renderable);
    }
    this._tilingSpriteDataHash = null;
    this._renderer = null;
  }
  _updateCanBatch(tilingSprite) {
    const renderableData = this._getTilingSpriteData(tilingSprite);
    const texture = tilingSprite.texture;
    let _nonPowOf2wrapping = true;
    if (this._renderer.type === types/* RendererType */.W.WEBGL) {
      _nonPowOf2wrapping = this._renderer.context.supports.nonPowOf2wrapping;
    }
    renderableData.canBatch = texture.textureMatrix.isSimple && (_nonPowOf2wrapping || texture.source.isPowerOfTwo);
    return renderableData.canBatch;
  }
}
/** @ignore */
TilingSpritePipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "tilingSprite"
};


//# sourceMappingURL=TilingSpritePipe.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite-tiling/init.mjs



"use strict";
Extensions/* extensions */.XO.add(TilingSpritePipe);
//# sourceMappingURL=init.mjs.map


/***/ }),

/***/ 673:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ BatchableSprite)
/* harmony export */ });

class BatchableSprite {
  constructor() {
    this.batcherName = "default";
    this.topology = "triangle-list";
    // batch specific..
    this.attributeSize = 4;
    this.indexSize = 6;
    this.packAsQuad = true;
    this.roundPixels = 0;
    this._attributeStart = 0;
    // location in the buffer
    this._batcher = null;
    this._batch = null;
  }
  get blendMode() {
    return this.renderable.groupBlendMode;
  }
  get color() {
    return this.renderable.groupColorAlpha;
  }
  reset() {
    this.renderable = null;
    this.texture = null;
    this._batcher = null;
    this._batch = null;
    this.bounds = null;
  }
}


//# sourceMappingURL=BatchableSprite.mjs.map


/***/ }),

/***/ 93122:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/extensions/Extensions.mjs
var Extensions = __webpack_require__(44642);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/assets/cache/Cache.mjs
var Cache = __webpack_require__(5980);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/pool/PoolGroup.mjs
var PoolGroup = __webpack_require__(70949);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/graphics/shared/Graphics.mjs
var Graphics = __webpack_require__(96519);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/maths/matrix/Matrix.mjs
var Matrix = __webpack_require__(6736);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/batcher/gl/utils/maxRecommendedTextures.mjs + 1 modules
var maxRecommendedTextures = __webpack_require__(11174);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/high-shader/compileHighShaderToProgram.mjs + 8 modules
var compileHighShaderToProgram = __webpack_require__(55635);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/high-shader/shader-bits/colorBit.mjs
var colorBit = __webpack_require__(51276);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/high-shader/shader-bits/generateTextureBatchBit.mjs
var generateTextureBatchBit = __webpack_require__(56701);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/high-shader/shader-bits/roundPixelsBit.mjs
var roundPixelsBit = __webpack_require__(90926);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/gl/shader/getBatchSamplersUniformGroup.mjs
var getBatchSamplersUniformGroup = __webpack_require__(10871);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/shader/Shader.mjs
var Shader = __webpack_require__(47032);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/shader/UniformGroup.mjs + 2 modules
var UniformGroup = __webpack_require__(7018);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/sdfShader/shader-bits/localUniformMSDFBit.mjs

const localUniformMSDFBit = {
  name: "local-uniform-msdf-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `
    ),
    main: (
      /* wgsl */
      `
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `
    ),
    end: (
      /* wgsl */
      `
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `
    )
  },
  fragment: {
    header: (
      /* wgsl */
      `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `
    ),
    main: (
      /* wgsl */
      ` 
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `
    )
  }
};
const localUniformMSDFBitGl = {
  name: "local-uniform-msdf-bit",
  vertex: {
    header: (
      /* glsl */
      `
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `
    ),
    main: (
      /* glsl */
      `
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `
    ),
    end: (
      /* glsl */
      `
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `
    )
  },
  fragment: {
    header: (
      /* glsl */
      `
            uniform float uDistance;
         `
    ),
    main: (
      /* glsl */
      ` 
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `
    )
  }
};


//# sourceMappingURL=localUniformMSDFBit.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/sdfShader/shader-bits/mSDFBit.mjs

const mSDFBit = {
  name: "msdf-bit",
  fragment: {
    header: (
      /* wgsl */
      `
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {
                
                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));
            
                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;
             
            }
        `
    )
  }
};
const mSDFBitGl = {
  name: "msdf-bit",
  fragment: {
    header: (
      /* glsl */
      `
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {
                
                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));
               
                // SDF
                median = min(median, msdfColor.a);
            
                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
           
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);  
              
                return coverage;
            }
        `
    )
  }
};


//# sourceMappingURL=mSDFBit.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/sdfShader/SdfShader.mjs












"use strict";
let gpuProgram;
let glProgram;
class SdfShader extends Shader/* Shader */.M {
  constructor() {
    const uniforms = new UniformGroup/* UniformGroup */.k({
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uTransformMatrix: { value: new Matrix/* Matrix */.u(), type: "mat3x3<f32>" },
      uDistance: { value: 4, type: "f32" },
      uRound: { value: 0, type: "f32" }
    });
    const maxTextures = (0,maxRecommendedTextures/* getMaxTexturesPerBatch */.a)();
    gpuProgram ?? (gpuProgram = (0,compileHighShaderToProgram/* compileHighShaderGpuProgram */.v)({
      name: "sdf-shader",
      bits: [
        colorBit/* colorBit */.F,
        (0,generateTextureBatchBit/* generateTextureBatchBit */._)(maxTextures),
        localUniformMSDFBit,
        mSDFBit,
        roundPixelsBit/* roundPixelsBit */.b
      ]
    }));
    glProgram ?? (glProgram = (0,compileHighShaderToProgram/* compileHighShaderGlProgram */.I)({
      name: "sdf-shader",
      bits: [
        colorBit/* colorBitGl */.a,
        (0,generateTextureBatchBit/* generateTextureBatchBitGl */.P)(maxTextures),
        localUniformMSDFBitGl,
        mSDFBitGl,
        roundPixelsBit/* roundPixelsBitGl */.m
      ]
    }));
    super({
      glProgram,
      gpuProgram,
      resources: {
        localUniforms: uniforms,
        batchSamplers: (0,getBatchSamplersUniformGroup/* getBatchSamplersUniformGroup */.n)(maxTextures)
      }
    });
  }
}


//# sourceMappingURL=SdfShader.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-bitmap/BitmapFontManager.mjs + 2 modules
var BitmapFontManager = __webpack_require__(22276);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-bitmap/utils/getBitmapTextLayout.mjs
var getBitmapTextLayout = __webpack_require__(25642);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-bitmap/BitmapTextPipe.mjs








"use strict";
class BitmapTextPipe {
  constructor(renderer) {
    this._gpuBitmapText = {};
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
    this._renderer.renderableGC.addManagedHash(this, "_gpuBitmapText");
  }
  validateRenderable(bitmapText) {
    const graphicsRenderable = this._getGpuBitmapText(bitmapText);
    if (bitmapText._didTextUpdate) {
      bitmapText._didTextUpdate = false;
      this._updateContext(bitmapText, graphicsRenderable);
    }
    return this._renderer.renderPipes.graphics.validateRenderable(graphicsRenderable);
  }
  addRenderable(bitmapText, instructionSet) {
    const graphicsRenderable = this._getGpuBitmapText(bitmapText);
    syncWithProxy(bitmapText, graphicsRenderable);
    if (bitmapText._didTextUpdate) {
      bitmapText._didTextUpdate = false;
      this._updateContext(bitmapText, graphicsRenderable);
    }
    this._renderer.renderPipes.graphics.addRenderable(graphicsRenderable, instructionSet);
    if (graphicsRenderable.context.customShader) {
      this._updateDistanceField(bitmapText);
    }
  }
  destroyRenderable(bitmapText) {
    bitmapText.off("destroyed", this._destroyRenderableBound);
    this._destroyRenderableByUid(bitmapText.uid);
  }
  _destroyRenderableByUid(renderableUid) {
    const context = this._gpuBitmapText[renderableUid].context;
    if (context.customShader) {
      PoolGroup/* BigPool */.Z.return(context.customShader);
      context.customShader = null;
    }
    PoolGroup/* BigPool */.Z.return(this._gpuBitmapText[renderableUid]);
    this._gpuBitmapText[renderableUid] = null;
  }
  updateRenderable(bitmapText) {
    const graphicsRenderable = this._getGpuBitmapText(bitmapText);
    syncWithProxy(bitmapText, graphicsRenderable);
    this._renderer.renderPipes.graphics.updateRenderable(graphicsRenderable);
    if (graphicsRenderable.context.customShader) {
      this._updateDistanceField(bitmapText);
    }
  }
  _updateContext(bitmapText, proxyGraphics) {
    const { context } = proxyGraphics;
    const bitmapFont = BitmapFontManager/* BitmapFontManager */.c.getFont(bitmapText.text, bitmapText._style);
    context.clear();
    if (bitmapFont.distanceField.type !== "none") {
      if (!context.customShader) {
        context.customShader = PoolGroup/* BigPool */.Z.get(SdfShader);
      }
    }
    const chars = Array.from(bitmapText.text);
    const style = bitmapText._style;
    let currentY = bitmapFont.baseLineOffset;
    const bitmapTextLayout = (0,getBitmapTextLayout/* getBitmapTextLayout */.Z)(chars, style, bitmapFont, true);
    let index = 0;
    const padding = style.padding;
    const scale = bitmapTextLayout.scale;
    let tx = bitmapTextLayout.width;
    let ty = bitmapTextLayout.height + bitmapTextLayout.offsetY;
    if (style._stroke) {
      tx += style._stroke.width / scale;
      ty += style._stroke.width / scale;
    }
    context.translate(-bitmapText._anchor._x * tx - padding, -bitmapText._anchor._y * ty - padding).scale(scale, scale);
    const tint = bitmapFont.applyFillAsTint ? style._fill.color : 16777215;
    for (let i = 0; i < bitmapTextLayout.lines.length; i++) {
      const line = bitmapTextLayout.lines[i];
      for (let j = 0; j < line.charPositions.length; j++) {
        const char = chars[index++];
        const charData = bitmapFont.chars[char];
        if (charData?.texture) {
          context.texture(
            charData.texture,
            tint ? tint : "black",
            Math.round(line.charPositions[j] + charData.xOffset),
            Math.round(currentY + charData.yOffset)
          );
        }
      }
      currentY += bitmapFont.lineHeight;
    }
  }
  _getGpuBitmapText(bitmapText) {
    return this._gpuBitmapText[bitmapText.uid] || this.initGpuText(bitmapText);
  }
  initGpuText(bitmapText) {
    const proxyRenderable = PoolGroup/* BigPool */.Z.get(Graphics/* Graphics */.A);
    this._gpuBitmapText[bitmapText.uid] = proxyRenderable;
    this._updateContext(bitmapText, proxyRenderable);
    bitmapText.on("destroyed", this._destroyRenderableBound);
    return this._gpuBitmapText[bitmapText.uid];
  }
  _updateDistanceField(bitmapText) {
    const context = this._getGpuBitmapText(bitmapText).context;
    const fontFamily = bitmapText._style.fontFamily;
    const dynamicFont = Cache/* Cache */.l.get(`${fontFamily}-bitmap`);
    const { a, b, c, d } = bitmapText.groupTransform;
    const dx = Math.sqrt(a * a + b * b);
    const dy = Math.sqrt(c * c + d * d);
    const worldScale = (Math.abs(dx) + Math.abs(dy)) / 2;
    const fontScale = dynamicFont.baseRenderedFontSize / bitmapText._style.fontSize;
    const distance = worldScale * dynamicFont.distanceField.range * (1 / fontScale);
    context.customShader.resources.localUniforms.uniforms.uDistance = distance;
  }
  destroy() {
    for (const uid in this._gpuBitmapText) {
      this._destroyRenderableByUid(uid);
    }
    this._gpuBitmapText = null;
    this._renderer = null;
  }
}
/** @ignore */
BitmapTextPipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "bitmapText"
};
function syncWithProxy(container, proxy) {
  proxy.groupTransform = container.groupTransform;
  proxy.groupColorAlpha = container.groupColorAlpha;
  proxy.groupColor = container.groupColor;
  proxy.groupBlendMode = container.groupBlendMode;
  proxy.globalDisplayStatus = container.globalDisplayStatus;
  proxy.groupTransform = container.groupTransform;
  proxy.localDisplayStatus = container.localDisplayStatus;
  proxy.groupAlpha = container.groupAlpha;
  proxy._roundPixels = container._roundPixels;
}


//# sourceMappingURL=BitmapTextPipe.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-bitmap/init.mjs



"use strict";
Extensions/* extensions */.XO.add(BitmapTextPipe);
//# sourceMappingURL=init.mjs.map


/***/ }),

/***/ 43216:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/extensions/Extensions.mjs
var Extensions = __webpack_require__(44642);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.mjs + 2 modules
var Texture = __webpack_require__(80443);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/pool/PoolGroup.mjs
var PoolGroup = __webpack_require__(70949);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite/BatchableSprite.mjs
var BatchableSprite = __webpack_require__(673);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/utils/updateTextBounds.mjs
var updateTextBounds = __webpack_require__(59679);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-html/HTMLTextPipe.mjs






"use strict";
class HTMLTextPipe {
  constructor(renderer) {
    this._gpuText = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
    this._renderer.runners.resolutionChange.add(this);
    this._renderer.renderableGC.addManagedHash(this, "_gpuText");
  }
  resolutionChange() {
    for (const i in this._gpuText) {
      const gpuText = this._gpuText[i];
      if (!gpuText)
        continue;
      const text = gpuText.batchableSprite.renderable;
      if (text._autoResolution) {
        text._resolution = this._renderer.resolution;
        text.onViewUpdate();
      }
    }
  }
  validateRenderable(htmlText) {
    const gpuText = this._getGpuText(htmlText);
    const newKey = htmlText._getKey();
    if (gpuText.textureNeedsUploading) {
      gpuText.textureNeedsUploading = false;
      return true;
    }
    if (gpuText.currentKey !== newKey) {
      return true;
    }
    return false;
  }
  addRenderable(htmlText, instructionSet) {
    const gpuText = this._getGpuText(htmlText);
    const batchableSprite = gpuText.batchableSprite;
    if (htmlText._didTextUpdate) {
      this._updateText(htmlText);
    }
    this._renderer.renderPipes.batch.addToBatch(batchableSprite, instructionSet);
  }
  updateRenderable(htmlText) {
    const gpuText = this._getGpuText(htmlText);
    const batchableSprite = gpuText.batchableSprite;
    if (htmlText._didTextUpdate) {
      this._updateText(htmlText);
    }
    batchableSprite._batcher.updateElement(batchableSprite);
  }
  destroyRenderable(htmlText) {
    htmlText.off("destroyed", this._destroyRenderableBound);
    this._destroyRenderableById(htmlText.uid);
  }
  _destroyRenderableById(htmlTextUid) {
    const gpuText = this._gpuText[htmlTextUid];
    this._renderer.htmlText.decreaseReferenceCount(gpuText.currentKey);
    PoolGroup/* BigPool */.Z.return(gpuText.batchableSprite);
    this._gpuText[htmlTextUid] = null;
  }
  _updateText(htmlText) {
    const newKey = htmlText._getKey();
    const gpuText = this._getGpuText(htmlText);
    const batchableSprite = gpuText.batchableSprite;
    if (gpuText.currentKey !== newKey) {
      this._updateGpuText(htmlText).catch((e) => {
        console.error(e);
      });
    }
    htmlText._didTextUpdate = false;
    (0,updateTextBounds/* updateTextBounds */.s)(batchableSprite, htmlText);
  }
  async _updateGpuText(htmlText) {
    htmlText._didTextUpdate = false;
    const gpuText = this._getGpuText(htmlText);
    if (gpuText.generatingTexture)
      return;
    const newKey = htmlText._getKey();
    this._renderer.htmlText.decreaseReferenceCount(gpuText.currentKey);
    gpuText.generatingTexture = true;
    gpuText.currentKey = newKey;
    const resolution = htmlText.resolution ?? this._renderer.resolution;
    const texture = await this._renderer.htmlText.getManagedTexture(
      htmlText.text,
      resolution,
      htmlText._style,
      htmlText._getKey()
    );
    const batchableSprite = gpuText.batchableSprite;
    batchableSprite.texture = gpuText.texture = texture;
    gpuText.generatingTexture = false;
    gpuText.textureNeedsUploading = true;
    htmlText.onViewUpdate();
    (0,updateTextBounds/* updateTextBounds */.s)(batchableSprite, htmlText);
  }
  _getGpuText(htmlText) {
    return this._gpuText[htmlText.uid] || this.initGpuText(htmlText);
  }
  initGpuText(htmlText) {
    const gpuTextData = {
      texture: Texture/* Texture */.g.EMPTY,
      currentKey: "--",
      batchableSprite: PoolGroup/* BigPool */.Z.get(BatchableSprite/* BatchableSprite */.K),
      textureNeedsUploading: false,
      generatingTexture: false
    };
    const batchableSprite = gpuTextData.batchableSprite;
    batchableSprite.renderable = htmlText;
    batchableSprite.transform = htmlText.groupTransform;
    batchableSprite.texture = Texture/* Texture */.g.EMPTY;
    batchableSprite.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 };
    batchableSprite.roundPixels = this._renderer._roundPixels | htmlText._roundPixels;
    htmlText._resolution = htmlText._autoResolution ? this._renderer.resolution : htmlText.resolution;
    this._gpuText[htmlText.uid] = gpuTextData;
    htmlText.on("destroyed", this._destroyRenderableBound);
    return gpuTextData;
  }
  destroy() {
    for (const i in this._gpuText) {
      this._destroyRenderableById(i);
    }
    this._gpuText = null;
    this._renderer = null;
  }
}
/** @ignore */
HTMLTextPipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "htmlText"
};


//# sourceMappingURL=HTMLTextPipe.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/CanvasPool.mjs
var CanvasPool = __webpack_require__(89569);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/TexturePool.mjs
var TexturePool = __webpack_require__(52942);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/types.mjs
var types = __webpack_require__(61558);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/environment/adapter.mjs + 1 modules
var adapter = __webpack_require__(91536);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/browser/isSafari.mjs


"use strict";
function isSafari() {
  const { userAgent } = adapter/* DOMAdapter */.e.get().getNavigator();
  return /^((?!chrome|android).)*safari/i.test(userAgent);
}


//# sourceMappingURL=isSafari.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/logging/warn.mjs
var warn = __webpack_require__(55707);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/utils/getPo2TextureFromSource.mjs
var getPo2TextureFromSource = __webpack_require__(47121);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-html/HTMLTextRenderData.mjs

const nssvg = "http://www.w3.org/2000/svg";
const nsxhtml = "http://www.w3.org/1999/xhtml";
class HTMLTextRenderData {
  constructor() {
    this.svgRoot = document.createElementNS(nssvg, "svg");
    this.foreignObject = document.createElementNS(nssvg, "foreignObject");
    this.domElement = document.createElementNS(nsxhtml, "div");
    this.styleElement = document.createElementNS(nsxhtml, "style");
    this.image = new Image();
    const { foreignObject, svgRoot, styleElement, domElement } = this;
    foreignObject.setAttribute("width", "10000");
    foreignObject.setAttribute("height", "10000");
    foreignObject.style.overflow = "hidden";
    svgRoot.appendChild(foreignObject);
    foreignObject.appendChild(styleElement);
    foreignObject.appendChild(domElement);
  }
}


//# sourceMappingURL=HTMLTextRenderData.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/TextStyle.mjs
var TextStyle = __webpack_require__(7904);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/utils/generateTextStyleKey.mjs
var generateTextStyleKey = __webpack_require__(83650);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/color/Color.mjs + 2 modules
var Color = __webpack_require__(86363);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-html/utils/textStyleToCSS.mjs


"use strict";
function textStyleToCSS(style) {
  const stroke = style._stroke;
  const fill = style._fill;
  const cssStyleString = [
    `color: ${Color/* Color */.Q.shared.setValue(fill.color).toHex()}`,
    `font-size: ${style.fontSize}px`,
    `font-family: ${style.fontFamily}`,
    `font-weight: ${style.fontWeight}`,
    `font-style: ${style.fontStyle}`,
    `font-variant: ${style.fontVariant}`,
    `letter-spacing: ${style.letterSpacing}px`,
    `text-align: ${style.align}`,
    `padding: ${style.padding}px`,
    `white-space: ${style.whiteSpace === "pre" && style.wordWrap ? "pre-wrap" : style.whiteSpace}`,
    ...style.lineHeight ? [`line-height: ${style.lineHeight}px`] : [],
    ...style.wordWrap ? [
      `word-wrap: ${style.breakWords ? "break-all" : "break-word"}`,
      `max-width: ${style.wordWrapWidth}px`
    ] : [],
    ...stroke ? [strokeToCSS(stroke)] : [],
    ...style.dropShadow ? [dropShadowToCSS(style.dropShadow)] : [],
    ...style.cssOverrides
  ].join(";");
  const cssStyles = [`div { ${cssStyleString} }`];
  tagStyleToCSS(style.tagStyles, cssStyles);
  return cssStyles.join(" ");
}
function dropShadowToCSS(dropShadowStyle) {
  const color = Color/* Color */.Q.shared.setValue(dropShadowStyle.color).setAlpha(dropShadowStyle.alpha).toHexa();
  const x = Math.round(Math.cos(dropShadowStyle.angle) * dropShadowStyle.distance);
  const y = Math.round(Math.sin(dropShadowStyle.angle) * dropShadowStyle.distance);
  const position = `${x}px ${y}px`;
  if (dropShadowStyle.blur > 0) {
    return `text-shadow: ${position} ${dropShadowStyle.blur}px ${color}`;
  }
  return `text-shadow: ${position} ${color}`;
}
function strokeToCSS(stroke) {
  return [
    `-webkit-text-stroke-width: ${stroke.width}px`,
    `-webkit-text-stroke-color: ${Color/* Color */.Q.shared.setValue(stroke.color).toHex()}`,
    `text-stroke-width: ${stroke.width}px`,
    `text-stroke-color: ${Color/* Color */.Q.shared.setValue(stroke.color).toHex()}`,
    "paint-order: stroke"
  ].join(";");
}
const templates = {
  fontSize: `font-size: {{VALUE}}px`,
  fontFamily: `font-family: {{VALUE}}`,
  fontWeight: `font-weight: {{VALUE}}`,
  fontStyle: `font-style: {{VALUE}}`,
  fontVariant: `font-variant: {{VALUE}}`,
  letterSpacing: `letter-spacing: {{VALUE}}px`,
  align: `text-align: {{VALUE}}`,
  padding: `padding: {{VALUE}}px`,
  whiteSpace: `white-space: {{VALUE}}`,
  lineHeight: `line-height: {{VALUE}}px`,
  wordWrapWidth: `max-width: {{VALUE}}px`
};
const transform = {
  fill: (value) => `color: ${Color/* Color */.Q.shared.setValue(value).toHex()}`,
  breakWords: (value) => `word-wrap: ${value ? "break-all" : "break-word"}`,
  stroke: strokeToCSS,
  dropShadow: dropShadowToCSS
};
function tagStyleToCSS(tagStyles, out) {
  for (const i in tagStyles) {
    const tagStyle = tagStyles[i];
    const cssTagStyle = [];
    for (const j in tagStyle) {
      if (transform[j]) {
        cssTagStyle.push(transform[j](tagStyle[j]));
      } else if (templates[j]) {
        cssTagStyle.push(templates[j].replace("{{VALUE}}", tagStyle[j]));
      }
    }
    out.push(`${i} { ${cssTagStyle.join(";")} }`);
  }
}


//# sourceMappingURL=textStyleToCSS.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-html/HTMLTextStyle.mjs





"use strict";
class HTMLTextStyle extends TextStyle/* TextStyle */.x {
  constructor(options = {}) {
    super(options);
    this._cssOverrides = [];
    this.cssOverrides ?? (this.cssOverrides = options.cssOverrides);
    this.tagStyles = options.tagStyles ?? {};
  }
  /** List of style overrides that will be applied to the HTML text. */
  set cssOverrides(value) {
    this._cssOverrides = value instanceof Array ? value : [value];
    this.update();
  }
  get cssOverrides() {
    return this._cssOverrides;
  }
  _generateKey() {
    this._styleKey = (0,generateTextStyleKey/* generateTextStyleKey */.V)(this) + this._cssOverrides.join("-");
    return this._styleKey;
  }
  update() {
    this._cssStyle = null;
    super.update();
  }
  /**
   * Creates a new HTMLTextStyle object with the same values as this one.
   * @returns New cloned HTMLTextStyle object
   */
  clone() {
    return new HTMLTextStyle({
      align: this.align,
      breakWords: this.breakWords,
      dropShadow: this.dropShadow ? { ...this.dropShadow } : null,
      fill: this._fill,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontVariant: this.fontVariant,
      fontWeight: this.fontWeight,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      padding: this.padding,
      stroke: this._stroke,
      whiteSpace: this.whiteSpace,
      wordWrap: this.wordWrap,
      wordWrapWidth: this.wordWrapWidth,
      cssOverrides: this.cssOverrides
    });
  }
  get cssStyle() {
    if (!this._cssStyle) {
      this._cssStyle = textStyleToCSS(this);
    }
    return this._cssStyle;
  }
  /**
   * Add a style override, this can be any CSS property
   * it will override any built-in style. This is the
   * property and the value as a string (e.g., `color: red`).
   * This will override any other internal style.
   * @param {string} value - CSS style(s) to add.
   * @example
   * style.addOverride('background-color: red');
   */
  addOverride(...value) {
    const toAdd = value.filter((v) => !this.cssOverrides.includes(v));
    if (toAdd.length > 0) {
      this.cssOverrides.push(...toAdd);
      this.update();
    }
  }
  /**
   * Remove any overrides that match the value.
   * @param {string} value - CSS style to remove.
   * @example
   * style.removeOverride('background-color: red');
   */
  removeOverride(...value) {
    const toRemove = value.filter((v) => this.cssOverrides.includes(v));
    if (toRemove.length > 0) {
      this.cssOverrides = this.cssOverrides.filter((v) => !toRemove.includes(v));
      this.update();
    }
  }
  set fill(value) {
    if (typeof value !== "string" && typeof value !== "number") {
      (0,warn/* warn */.R)("[HTMLTextStyle] only color fill is not supported by HTMLText");
    }
    super.fill = value;
  }
  set stroke(value) {
    if (value && typeof value !== "string" && typeof value !== "number") {
      (0,warn/* warn */.R)("[HTMLTextStyle] only color stroke is not supported by HTMLText");
    }
    super.stroke = value;
  }
}


//# sourceMappingURL=HTMLTextStyle.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-html/utils/extractFontFamilies.mjs

function extractFontFamilies(text, style) {
  const fontFamily = style.fontFamily;
  const fontFamilies = [];
  const dedupe = {};
  const regex = /font-family:([^;"\s]+)/g;
  const matches = text.match(regex);
  function addFontFamily(fontFamily2) {
    if (!dedupe[fontFamily2]) {
      fontFamilies.push(fontFamily2);
      dedupe[fontFamily2] = true;
    }
  }
  if (Array.isArray(fontFamily)) {
    for (let i = 0; i < fontFamily.length; i++) {
      addFontFamily(fontFamily[i]);
    }
  } else {
    addFontFamily(fontFamily);
  }
  if (matches) {
    matches.forEach((match) => {
      const fontFamily2 = match.split(":")[1].trim();
      addFontFamily(fontFamily2);
    });
  }
  for (const i in style.tagStyles) {
    const fontFamily2 = style.tagStyles[i].fontFamily;
    addFontFamily(fontFamily2);
  }
  return fontFamilies;
}


//# sourceMappingURL=extractFontFamilies.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/assets/cache/Cache.mjs
var Cache = __webpack_require__(5980);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-html/utils/loadFontAsBase64.mjs


"use strict";
async function loadFontAsBase64(url) {
  const response = await adapter/* DOMAdapter */.e.get().fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();
  const dataSrc = await new Promise((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  return dataSrc;
}


//# sourceMappingURL=loadFontAsBase64.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-html/utils/loadFontCSS.mjs


"use strict";
async function loadFontCSS(style, url) {
  const dataSrc = await loadFontAsBase64(url);
  return `@font-face {
        font-family: "${style.fontFamily}";
        src: url('${dataSrc}');
        font-weight: ${style.fontWeight};
        font-style: ${style.fontStyle};
    }`;
}


//# sourceMappingURL=loadFontCSS.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-html/utils/getFontCss.mjs



"use strict";
const FontStylePromiseCache = /* @__PURE__ */ new Map();
async function getFontCss(fontFamilies, style, defaultOptions) {
  const fontPromises = fontFamilies.filter((fontFamily) => Cache/* Cache */.l.has(`${fontFamily}-and-url`)).map((fontFamily, i) => {
    if (!FontStylePromiseCache.has(fontFamily)) {
      const { url } = Cache/* Cache */.l.get(`${fontFamily}-and-url`);
      if (i === 0) {
        FontStylePromiseCache.set(fontFamily, loadFontCSS({
          fontWeight: style.fontWeight,
          fontStyle: style.fontStyle,
          fontFamily
        }, url));
      } else {
        FontStylePromiseCache.set(fontFamily, loadFontCSS({
          fontWeight: defaultOptions.fontWeight,
          fontStyle: defaultOptions.fontStyle,
          fontFamily
        }, url));
      }
    }
    return FontStylePromiseCache.get(fontFamily);
  });
  return (await Promise.all(fontPromises)).join("\n");
}


//# sourceMappingURL=getFontCss.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-html/utils/getSVGUrl.mjs

function getSVGUrl(text, style, resolution, fontCSS, htmlTextData) {
  const { domElement, styleElement, svgRoot } = htmlTextData;
  domElement.innerHTML = `<style>${style.cssStyle}</style><div style='padding:0;'>${text}</div>`;
  domElement.setAttribute("style", `transform: scale(${resolution});transform-origin: top left; display: inline-block`);
  styleElement.textContent = fontCSS;
  const { width, height } = htmlTextData.image;
  svgRoot.setAttribute("width", width.toString());
  svgRoot.setAttribute("height", height.toString());
  return new XMLSerializer().serializeToString(svgRoot);
}


//# sourceMappingURL=getSVGUrl.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-html/utils/getTemporaryCanvasFromImage.mjs


"use strict";
function getTemporaryCanvasFromImage(image, resolution) {
  const canvasAndContext = CanvasPool/* CanvasPool */.N.getOptimalCanvasAndContext(
    image.width,
    image.height,
    resolution
  );
  const { context } = canvasAndContext;
  context.clearRect(0, 0, image.width, image.height);
  context.drawImage(image, 0, 0);
  return canvasAndContext;
}


//# sourceMappingURL=getTemporaryCanvasFromImage.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-html/utils/loadSVGImage.mjs

function loadSVGImage(image, url, delay) {
  return new Promise(async (resolve) => {
    if (delay) {
      await new Promise((resolve2) => setTimeout(resolve2, 100));
    }
    image.onload = () => {
      resolve();
    };
    image.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(url)}`;
    image.crossOrigin = "anonymous";
  });
}


//# sourceMappingURL=loadSVGImage.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-html/utils/measureHtmlText.mjs


"use strict";
let tempHTMLTextRenderData;
function measureHtmlText(text, style, fontStyleCSS, htmlTextRenderData) {
  htmlTextRenderData || (htmlTextRenderData = tempHTMLTextRenderData || (tempHTMLTextRenderData = new HTMLTextRenderData()));
  const { domElement, styleElement, svgRoot } = htmlTextRenderData;
  domElement.innerHTML = `<style>${style.cssStyle};</style><div style='padding:0'>${text}</div>`;
  domElement.setAttribute("style", "transform-origin: top left; display: inline-block");
  if (fontStyleCSS) {
    styleElement.textContent = fontStyleCSS;
  }
  document.body.appendChild(svgRoot);
  const contentBounds = domElement.getBoundingClientRect();
  svgRoot.remove();
  const doublePadding = style.padding * 2;
  return {
    width: contentBounds.width - doublePadding,
    height: contentBounds.height - doublePadding
  };
}


//# sourceMappingURL=measureHtmlText.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-html/HTMLTextSystem.mjs

















"use strict";
class HTMLTextSystem {
  constructor(renderer) {
    this._activeTextures = {};
    this._renderer = renderer;
    this._createCanvas = renderer.type === types/* RendererType */.W.WEBGPU;
  }
  getTexture(options) {
    return this._buildTexturePromise(
      options.text,
      options.resolution,
      options.style
    );
  }
  getManagedTexture(text, resolution, style, textKey) {
    if (this._activeTextures[textKey]) {
      this._increaseReferenceCount(textKey);
      return this._activeTextures[textKey].promise;
    }
    const promise = this._buildTexturePromise(text, resolution, style).then((texture) => {
      this._activeTextures[textKey].texture = texture;
      return texture;
    });
    this._activeTextures[textKey] = {
      texture: null,
      promise,
      usageCount: 1
    };
    return promise;
  }
  async _buildTexturePromise(text, resolution, style) {
    const htmlTextData = PoolGroup/* BigPool */.Z.get(HTMLTextRenderData);
    const fontFamilies = extractFontFamilies(text, style);
    const fontCSS = await getFontCss(
      fontFamilies,
      style,
      HTMLTextStyle.defaultTextStyle
    );
    const measured = measureHtmlText(text, style, fontCSS, htmlTextData);
    const width = Math.ceil(Math.ceil(Math.max(1, measured.width) + style.padding * 2) * resolution);
    const height = Math.ceil(Math.ceil(Math.max(1, measured.height) + style.padding * 2) * resolution);
    const image = htmlTextData.image;
    const uvSafeOffset = 2;
    image.width = (width | 0) + uvSafeOffset;
    image.height = (height | 0) + uvSafeOffset;
    const svgURL = getSVGUrl(text, style, resolution, fontCSS, htmlTextData);
    await loadSVGImage(image, svgURL, isSafari() && fontFamilies.length > 0);
    const resource = image;
    let canvasAndContext;
    if (this._createCanvas) {
      canvasAndContext = getTemporaryCanvasFromImage(image, resolution);
    }
    const texture = (0,getPo2TextureFromSource/* getPo2TextureFromSource */.M)(
      canvasAndContext ? canvasAndContext.canvas : resource,
      image.width - uvSafeOffset,
      image.height - uvSafeOffset,
      resolution
    );
    if (this._createCanvas) {
      this._renderer.texture.initSource(texture.source);
      CanvasPool/* CanvasPool */.N.returnCanvasAndContext(canvasAndContext);
    }
    PoolGroup/* BigPool */.Z.return(htmlTextData);
    return texture;
  }
  _increaseReferenceCount(textKey) {
    this._activeTextures[textKey].usageCount++;
  }
  decreaseReferenceCount(textKey) {
    const activeTexture = this._activeTextures[textKey];
    if (!activeTexture)
      return;
    activeTexture.usageCount--;
    if (activeTexture.usageCount === 0) {
      if (activeTexture.texture) {
        this._cleanUp(activeTexture);
      } else {
        activeTexture.promise.then((texture) => {
          activeTexture.texture = texture;
          this._cleanUp(activeTexture);
        }).catch(() => {
          (0,warn/* warn */.R)("HTMLTextSystem: Failed to clean texture");
        });
      }
      this._activeTextures[textKey] = null;
    }
  }
  _cleanUp(activeTexture) {
    TexturePool/* TexturePool */.W.returnTexture(activeTexture.texture);
    activeTexture.texture.source.resource = null;
    activeTexture.texture.source.uploadMethodId = "unknown";
  }
  getReferenceCount(textKey) {
    return this._activeTextures[textKey].usageCount;
  }
  destroy() {
    this._activeTextures = null;
  }
}
/** @ignore */
HTMLTextSystem.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLSystem,
    Extensions/* ExtensionType */.Ag.WebGPUSystem,
    Extensions/* ExtensionType */.Ag.CanvasSystem
  ],
  name: "htmlText"
};
HTMLTextSystem.defaultFontOptions = {
  fontFamily: "Arial",
  fontStyle: "normal",
  fontWeight: "normal"
};


//# sourceMappingURL=HTMLTextSystem.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text-html/init.mjs




"use strict";
Extensions/* extensions */.XO.add(HTMLTextSystem);
Extensions/* extensions */.XO.add(HTMLTextPipe);
//# sourceMappingURL=init.mjs.map


/***/ }),

/***/ 62211:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/extensions/Extensions.mjs
var Extensions = __webpack_require__(44642);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/pool/PoolGroup.mjs
var PoolGroup = __webpack_require__(70949);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite/BatchableSprite.mjs
var BatchableSprite = __webpack_require__(673);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/utils/updateTextBounds.mjs
var updateTextBounds = __webpack_require__(59679);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/canvas/CanvasTextPipe.mjs





"use strict";
class CanvasTextPipe {
  constructor(renderer) {
    this._gpuText = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
    this._renderer.runners.resolutionChange.add(this);
    this._renderer.renderableGC.addManagedHash(this, "_gpuText");
  }
  resolutionChange() {
    for (const i in this._gpuText) {
      const gpuText = this._gpuText[i];
      if (!gpuText)
        continue;
      const text = gpuText.batchableSprite.renderable;
      if (text._autoResolution) {
        text._resolution = this._renderer.resolution;
        text.onViewUpdate();
      }
    }
  }
  validateRenderable(text) {
    const gpuText = this._getGpuText(text);
    const newKey = text._getKey();
    if (gpuText.currentKey !== newKey) {
      return true;
    }
    return false;
  }
  addRenderable(text, instructionSet) {
    const gpuText = this._getGpuText(text);
    const batchableSprite = gpuText.batchableSprite;
    if (text._didTextUpdate) {
      this._updateText(text);
    }
    this._renderer.renderPipes.batch.addToBatch(batchableSprite, instructionSet);
  }
  updateRenderable(text) {
    const gpuText = this._getGpuText(text);
    const batchableSprite = gpuText.batchableSprite;
    if (text._didTextUpdate) {
      this._updateText(text);
    }
    batchableSprite._batcher.updateElement(batchableSprite);
  }
  destroyRenderable(text) {
    text.off("destroyed", this._destroyRenderableBound);
    this._destroyRenderableById(text.uid);
  }
  _destroyRenderableById(textUid) {
    const gpuText = this._gpuText[textUid];
    this._renderer.canvasText.decreaseReferenceCount(gpuText.currentKey);
    PoolGroup/* BigPool */.Z.return(gpuText.batchableSprite);
    this._gpuText[textUid] = null;
  }
  _updateText(text) {
    const newKey = text._getKey();
    const gpuText = this._getGpuText(text);
    const batchableSprite = gpuText.batchableSprite;
    if (gpuText.currentKey !== newKey) {
      this._updateGpuText(text);
    }
    text._didTextUpdate = false;
    (0,updateTextBounds/* updateTextBounds */.s)(batchableSprite, text);
  }
  _updateGpuText(text) {
    const gpuText = this._getGpuText(text);
    const batchableSprite = gpuText.batchableSprite;
    if (gpuText.texture) {
      this._renderer.canvasText.decreaseReferenceCount(gpuText.currentKey);
    }
    gpuText.texture = batchableSprite.texture = this._renderer.canvasText.getManagedTexture(text);
    gpuText.currentKey = text._getKey();
    batchableSprite.texture = gpuText.texture;
  }
  _getGpuText(text) {
    return this._gpuText[text.uid] || this.initGpuText(text);
  }
  initGpuText(text) {
    const gpuTextData = {
      texture: null,
      currentKey: "--",
      batchableSprite: PoolGroup/* BigPool */.Z.get(BatchableSprite/* BatchableSprite */.K)
    };
    gpuTextData.batchableSprite.renderable = text;
    gpuTextData.batchableSprite.transform = text.groupTransform;
    gpuTextData.batchableSprite.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 };
    gpuTextData.batchableSprite.roundPixels = this._renderer._roundPixels | text._roundPixels;
    this._gpuText[text.uid] = gpuTextData;
    text._resolution = text._autoResolution ? this._renderer.resolution : text.resolution;
    this._updateText(text);
    text.on("destroyed", this._destroyRenderableBound);
    return gpuTextData;
  }
  destroy() {
    for (const i in this._gpuText) {
      this._destroyRenderableById(i);
    }
    this._gpuText = null;
    this._renderer = null;
  }
}
/** @ignore */
CanvasTextPipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "text"
};


//# sourceMappingURL=CanvasTextPipe.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/color/Color.mjs + 2 modules
var Color = __webpack_require__(86363);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/maths/misc/pow2.mjs
var pow2 = __webpack_require__(67286);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/CanvasPool.mjs
var CanvasPool = __webpack_require__(89569);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/TexturePool.mjs
var TexturePool = __webpack_require__(52942);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/maths/shapes/Rectangle.mjs
var Rectangle = __webpack_require__(75639);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/canvas/getCanvasBoundingBox.mjs


"use strict";
function checkRow(data, width, y) {
  for (let x = 0, index = 4 * y * width; x < width; ++x, index += 4) {
    if (data[index + 3] !== 0)
      return false;
  }
  return true;
}
function checkColumn(data, width, x, top, bottom) {
  const stride = 4 * width;
  for (let y = top, index = top * stride + 4 * x; y <= bottom; ++y, index += stride) {
    if (data[index + 3] !== 0)
      return false;
  }
  return true;
}
function getCanvasBoundingBox(canvas, resolution = 1) {
  const { width, height } = canvas;
  const context = canvas.getContext("2d", {
    willReadFrequently: true
  });
  if (context === null) {
    throw new TypeError("Failed to get canvas 2D context");
  }
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  let left = 0;
  let top = 0;
  let right = width - 1;
  let bottom = height - 1;
  while (top < height && checkRow(data, width, top))
    ++top;
  if (top === height)
    return Rectangle/* Rectangle */.M.EMPTY;
  while (checkRow(data, width, bottom))
    --bottom;
  while (checkColumn(data, width, left, top, bottom))
    ++left;
  while (checkColumn(data, width, right, top, bottom))
    --right;
  ++right;
  ++bottom;
  return new Rectangle/* Rectangle */.M(left / resolution, top / resolution, (right - left) / resolution, (bottom - top) / resolution);
}


//# sourceMappingURL=getCanvasBoundingBox.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/logging/deprecation.mjs
var deprecation = __webpack_require__(63735);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/TextStyle.mjs
var TextStyle = __webpack_require__(7904);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/utils/getPo2TextureFromSource.mjs
var getPo2TextureFromSource = __webpack_require__(47121);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/canvas/CanvasTextMetrics.mjs
var CanvasTextMetrics = __webpack_require__(54265);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/canvas/utils/fontStringFromTextStyle.mjs
var fontStringFromTextStyle = __webpack_require__(19031);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/canvas/utils/getCanvasFillStyle.mjs
var getCanvasFillStyle = __webpack_require__(33495);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/canvas/CanvasTextSystem.mjs













"use strict";
class CanvasTextSystem {
  constructor(_renderer) {
    this._activeTextures = {};
    this._renderer = _renderer;
  }
  getTextureSize(text, resolution, style) {
    const measured = CanvasTextMetrics/* CanvasTextMetrics */.P.measureText(text || " ", style);
    let width = Math.ceil(Math.ceil(Math.max(1, measured.width) + style.padding * 2) * resolution);
    let height = Math.ceil(Math.ceil(Math.max(1, measured.height) + style.padding * 2) * resolution);
    width = Math.ceil(width - 1e-6);
    height = Math.ceil(height - 1e-6);
    width = (0,pow2/* nextPow2 */.U5)(width);
    height = (0,pow2/* nextPow2 */.U5)(height);
    return { width, height };
  }
  getTexture(options, resolution, style, _textKey) {
    if (typeof options === "string") {
      (0,deprecation/* deprecation */.t6)("8.0.0", "CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments");
      options = {
        text: options,
        style,
        resolution
      };
    }
    if (!(options.style instanceof TextStyle/* TextStyle */.x)) {
      options.style = new TextStyle/* TextStyle */.x(options.style);
    }
    const { texture, canvasAndContext } = this.createTextureAndCanvas(
      options
    );
    this._renderer.texture.initSource(texture._source);
    CanvasPool/* CanvasPool */.N.returnCanvasAndContext(canvasAndContext);
    return texture;
  }
  createTextureAndCanvas(options) {
    const { text, style } = options;
    const resolution = options.resolution ?? this._renderer.resolution;
    const measured = CanvasTextMetrics/* CanvasTextMetrics */.P.measureText(text || " ", style);
    const width = Math.ceil(Math.ceil(Math.max(1, measured.width) + style.padding * 2) * resolution);
    const height = Math.ceil(Math.ceil(Math.max(1, measured.height) + style.padding * 2) * resolution);
    const canvasAndContext = CanvasPool/* CanvasPool */.N.getOptimalCanvasAndContext(width, height);
    const { canvas } = canvasAndContext;
    this.renderTextToCanvas(text, style, resolution, canvasAndContext);
    const texture = (0,getPo2TextureFromSource/* getPo2TextureFromSource */.M)(canvas, width, height, resolution);
    if (style.trim) {
      const trimmed = getCanvasBoundingBox(canvas, resolution);
      texture.frame.copyFrom(trimmed);
      texture.updateUvs();
    }
    return { texture, canvasAndContext };
  }
  getManagedTexture(text) {
    text._resolution = text._autoResolution ? this._renderer.resolution : text.resolution;
    const textKey = text._getKey();
    if (this._activeTextures[textKey]) {
      this._increaseReferenceCount(textKey);
      return this._activeTextures[textKey].texture;
    }
    const { texture, canvasAndContext } = this.createTextureAndCanvas(text);
    this._activeTextures[textKey] = {
      canvasAndContext,
      texture,
      usageCount: 1
    };
    return texture;
  }
  _increaseReferenceCount(textKey) {
    this._activeTextures[textKey].usageCount++;
  }
  /**
   * Returns a texture that was created wit the above `getTexture` function.
   * Handy if you are done with a texture and want to return it to the pool.
   * @param texture - The texture to be returned.
   */
  returnTexture(texture) {
    const source = texture.source;
    source.resource = null;
    source.uploadMethodId = "unknown";
    source.alphaMode = "no-premultiply-alpha";
    TexturePool/* TexturePool */.W.returnTexture(texture);
  }
  decreaseReferenceCount(textKey) {
    const activeTexture = this._activeTextures[textKey];
    activeTexture.usageCount--;
    if (activeTexture.usageCount === 0) {
      CanvasPool/* CanvasPool */.N.returnCanvasAndContext(activeTexture.canvasAndContext);
      this.returnTexture(activeTexture.texture);
      this._activeTextures[textKey] = null;
    }
  }
  getReferenceCount(textKey) {
    return this._activeTextures[textKey].usageCount;
  }
  /**
   * Renders text to its canvas, and updates its texture.
   *
   * By default this is used internally to ensure the texture is correct before rendering,
   * but it can be used called externally, for example from this class to 'pre-generate' the texture from a piece of text,
   * and then shared across multiple Sprites.
   * @param text
   * @param style
   * @param resolution
   * @param canvasAndContext
   */
  renderTextToCanvas(text, style, resolution, canvasAndContext) {
    const { canvas, context } = canvasAndContext;
    const font = (0,fontStringFromTextStyle/* fontStringFromTextStyle */.Z)(style);
    const measured = CanvasTextMetrics/* CanvasTextMetrics */.P.measureText(text || " ", style);
    const lines = measured.lines;
    const lineHeight = measured.lineHeight;
    const lineWidths = measured.lineWidths;
    const maxLineWidth = measured.maxLineWidth;
    const fontProperties = measured.fontProperties;
    const height = canvas.height;
    context.resetTransform();
    context.scale(resolution, resolution);
    context.textBaseline = style.textBaseline;
    if (style._stroke?.width) {
      const strokeStyle = style._stroke;
      context.lineWidth = strokeStyle.width;
      context.miterLimit = strokeStyle.miterLimit;
      context.lineJoin = strokeStyle.join;
      context.lineCap = strokeStyle.cap;
    }
    context.font = font;
    let linePositionX;
    let linePositionY;
    const passesCount = style.dropShadow ? 2 : 1;
    for (let i = 0; i < passesCount; ++i) {
      const isShadowPass = style.dropShadow && i === 0;
      const dsOffsetText = isShadowPass ? Math.ceil(Math.max(1, height) + style.padding * 2) : 0;
      const dsOffsetShadow = dsOffsetText * resolution;
      if (isShadowPass) {
        context.fillStyle = "black";
        context.strokeStyle = "black";
        const shadowOptions = style.dropShadow;
        const dropShadowColor = shadowOptions.color;
        const dropShadowAlpha = shadowOptions.alpha;
        context.shadowColor = Color/* Color */.Q.shared.setValue(dropShadowColor).setAlpha(dropShadowAlpha).toRgbaString();
        const dropShadowBlur = shadowOptions.blur * resolution;
        const dropShadowDistance = shadowOptions.distance * resolution;
        context.shadowBlur = dropShadowBlur;
        context.shadowOffsetX = Math.cos(shadowOptions.angle) * dropShadowDistance;
        context.shadowOffsetY = Math.sin(shadowOptions.angle) * dropShadowDistance + dsOffsetShadow;
      } else {
        context.fillStyle = style._fill ? (0,getCanvasFillStyle/* getCanvasFillStyle */.r)(style._fill, context, measured) : null;
        if (style._stroke?.width) {
          const padding = style._stroke.width * style._stroke.alignment;
          context.strokeStyle = (0,getCanvasFillStyle/* getCanvasFillStyle */.r)(style._stroke, context, measured, padding);
        }
        context.shadowColor = "black";
      }
      let linePositionYShift = (lineHeight - fontProperties.fontSize) / 2;
      if (lineHeight - fontProperties.fontSize < 0) {
        linePositionYShift = 0;
      }
      const strokeWidth = style._stroke?.width ?? 0;
      for (let i2 = 0; i2 < lines.length; i2++) {
        linePositionX = strokeWidth / 2;
        linePositionY = strokeWidth / 2 + i2 * lineHeight + fontProperties.ascent + linePositionYShift;
        if (style.align === "right") {
          linePositionX += maxLineWidth - lineWidths[i2];
        } else if (style.align === "center") {
          linePositionX += (maxLineWidth - lineWidths[i2]) / 2;
        }
        if (style._stroke?.width) {
          this._drawLetterSpacing(
            lines[i2],
            style,
            canvasAndContext,
            linePositionX + style.padding,
            linePositionY + style.padding - dsOffsetText,
            true
          );
        }
        if (style._fill !== void 0) {
          this._drawLetterSpacing(
            lines[i2],
            style,
            canvasAndContext,
            linePositionX + style.padding,
            linePositionY + style.padding - dsOffsetText
          );
        }
      }
    }
  }
  /**
   * Render the text with letter-spacing.
   * @param text - The text to draw
   * @param style
   * @param canvasAndContext
   * @param x - Horizontal position to draw the text
   * @param y - Vertical position to draw the text
   * @param isStroke - Is this drawing for the outside stroke of the
   *  text? If not, it's for the inside fill
   */
  _drawLetterSpacing(text, style, canvasAndContext, x, y, isStroke = false) {
    const { context } = canvasAndContext;
    const letterSpacing = style.letterSpacing;
    let useExperimentalLetterSpacing = false;
    if (CanvasTextMetrics/* CanvasTextMetrics */.P.experimentalLetterSpacingSupported) {
      if (CanvasTextMetrics/* CanvasTextMetrics */.P.experimentalLetterSpacing) {
        context.letterSpacing = `${letterSpacing}px`;
        context.textLetterSpacing = `${letterSpacing}px`;
        useExperimentalLetterSpacing = true;
      } else {
        context.letterSpacing = "0px";
        context.textLetterSpacing = "0px";
      }
    }
    if (letterSpacing === 0 || useExperimentalLetterSpacing) {
      if (isStroke) {
        context.strokeText(text, x, y);
      } else {
        context.fillText(text, x, y);
      }
      return;
    }
    let currentPosition = x;
    const stringArray = CanvasTextMetrics/* CanvasTextMetrics */.P.graphemeSegmenter(text);
    let previousWidth = context.measureText(text).width;
    let currentWidth = 0;
    for (let i = 0; i < stringArray.length; ++i) {
      const currentChar = stringArray[i];
      if (isStroke) {
        context.strokeText(currentChar, currentPosition, y);
      } else {
        context.fillText(currentChar, currentPosition, y);
      }
      let textStr = "";
      for (let j = i + 1; j < stringArray.length; ++j) {
        textStr += stringArray[j];
      }
      currentWidth = context.measureText(textStr).width;
      currentPosition += previousWidth - currentWidth + letterSpacing;
      previousWidth = currentWidth;
    }
  }
  destroy() {
    this._activeTextures = null;
  }
}
/** @ignore */
CanvasTextSystem.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLSystem,
    Extensions/* ExtensionType */.Ag.WebGPUSystem,
    Extensions/* ExtensionType */.Ag.CanvasSystem
  ],
  name: "canvasText"
};


//# sourceMappingURL=CanvasTextSystem.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/text/init.mjs




"use strict";
Extensions/* extensions */.XO.add(CanvasTextSystem);
Extensions/* extensions */.XO.add(CanvasTextPipe);
//# sourceMappingURL=init.mjs.map


/***/ }),

/***/ 47121:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ getPo2TextureFromSource)
/* harmony export */ });
/* harmony import */ var _rendering_renderers_shared_texture_TexturePool_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52942);
/* harmony import */ var _container_bounds_Bounds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53297);



"use strict";
const tempBounds = new _container_bounds_Bounds_mjs__WEBPACK_IMPORTED_MODULE_0__/* .Bounds */ .c();
function getPo2TextureFromSource(image, width, height, resolution) {
  const bounds = tempBounds;
  bounds.minX = 0;
  bounds.minY = 0;
  bounds.maxX = image.width / resolution | 0;
  bounds.maxY = image.height / resolution | 0;
  const texture = _rendering_renderers_shared_texture_TexturePool_mjs__WEBPACK_IMPORTED_MODULE_1__/* .TexturePool */ .W.getOptimalTexture(
    bounds.width,
    bounds.height,
    resolution,
    false
  );
  texture.source.uploadMethodId = "image";
  texture.source.resource = image;
  texture.source.alphaMode = "premultiply-alpha-on-upload";
  texture.frame.width = width / resolution;
  texture.frame.height = height / resolution;
  texture.source.emit("update", texture.source);
  texture.updateUvs();
  return texture;
}


//# sourceMappingURL=getPo2TextureFromSource.mjs.map


/***/ }),

/***/ 59679:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ updateTextBounds)
/* harmony export */ });
/* harmony import */ var _utils_data_updateQuadBounds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30777);


"use strict";
function updateTextBounds(batchableSprite, text) {
  const { texture, bounds } = batchableSprite;
  (0,_utils_data_updateQuadBounds_mjs__WEBPACK_IMPORTED_MODULE_0__/* .updateQuadBounds */ .y)(bounds, text._anchor, texture);
  const padding = text._style.padding;
  bounds.minX -= padding;
  bounds.minY -= padding;
  bounds.maxX -= padding;
  bounds.maxY -= padding;
}


//# sourceMappingURL=updateTextBounds.mjs.map


/***/ })

}]);
//# sourceMappingURL=607.bundle.js.map
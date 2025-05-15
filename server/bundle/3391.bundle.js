"use strict";
(self["webpackChunkvideoapi"] = self["webpackChunkvideoapi"] || []).push([[3391],{

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

/***/ 61256:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ textureBit),
/* harmony export */   m: () => (/* binding */ textureBitGl)
/* harmony export */ });

const textureBit = {
  name: "texture-bit",
  vertex: {
    header: (
      /* wgsl */
      `

        struct TextureUniforms {
            uTextureMatrix:mat3x3<f32>,
        }

        @group(2) @binding(2) var<uniform> textureUniforms : TextureUniforms;
        `
    ),
    main: (
      /* wgsl */
      `
            uv = (textureUniforms.uTextureMatrix * vec3(uv, 1.0)).xy;
        `
    )
  },
  fragment: {
    header: (
      /* wgsl */
      `
            @group(2) @binding(0) var uTexture: texture_2d<f32>;
            @group(2) @binding(1) var uSampler: sampler;

         
        `
    ),
    main: (
      /* wgsl */
      `
            outColor = textureSample(uTexture, uSampler, vUV);
        `
    )
  }
};
const textureBitGl = {
  name: "texture-bit",
  vertex: {
    header: (
      /* glsl */
      `
            uniform mat3 uTextureMatrix;
        `
    ),
    main: (
      /* glsl */
      `
            uv = (uTextureMatrix * vec3(uv, 1.0)).xy;
        `
    )
  },
  fragment: {
    header: (
      /* glsl */
      `
        uniform sampler2D uTexture;

         
        `
    ),
    main: (
      /* glsl */
      `
            outColor = texture(uTexture, vUV);
        `
    )
  }
};


//# sourceMappingURL=textureBit.mjs.map


/***/ }),

/***/ 89947:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ ensureAttributes)
/* harmony export */ });
/* harmony import */ var _utils_logging_warn_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55707);
/* harmony import */ var _shared_geometry_utils_getAttributeInfoFromFormat_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15045);



"use strict";
function ensureAttributes(geometry, extractedData) {
  for (const i in geometry.attributes) {
    const attribute = geometry.attributes[i];
    const attributeData = extractedData[i];
    if (attributeData) {
      attribute.format ?? (attribute.format = attributeData.format);
      attribute.offset ?? (attribute.offset = attributeData.offset);
      attribute.instance ?? (attribute.instance = attributeData.instance);
    } else {
      (0,_utils_logging_warn_mjs__WEBPACK_IMPORTED_MODULE_0__/* .warn */ .R)(`Attribute ${i} is not present in the shader, but is present in the geometry. Unable to infer attribute details.`);
    }
  }
  ensureStartAndStride(geometry);
}
function ensureStartAndStride(geometry) {
  const { buffers, attributes } = geometry;
  const tempStride = {};
  const tempStart = {};
  for (const j in buffers) {
    const buffer = buffers[j];
    tempStride[buffer.uid] = 0;
    tempStart[buffer.uid] = 0;
  }
  for (const j in attributes) {
    const attribute = attributes[j];
    tempStride[attribute.buffer.uid] += (0,_shared_geometry_utils_getAttributeInfoFromFormat_mjs__WEBPACK_IMPORTED_MODULE_1__/* .getAttributeInfoFromFormat */ .m)(attribute.format).stride;
  }
  for (const j in attributes) {
    const attribute = attributes[j];
    attribute.stride ?? (attribute.stride = tempStride[attribute.buffer.uid]);
    attribute.start ?? (attribute.start = tempStart[attribute.buffer.uid]);
    tempStart[attribute.buffer.uid] += (0,_shared_geometry_utils_getAttributeInfoFromFormat_mjs__WEBPACK_IMPORTED_MODULE_1__/* .getAttributeInfoFromFormat */ .m)(attribute.format).stride;
  }
}


//# sourceMappingURL=ensureAttributes.mjs.map


/***/ }),

/***/ 29585:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ GpuStencilModesToPixi)
/* harmony export */ });
/* harmony import */ var _shared_state_const_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(99986);


"use strict";
const GpuStencilModesToPixi = [];
GpuStencilModesToPixi[_shared_state_const_mjs__WEBPACK_IMPORTED_MODULE_0__/* .STENCIL_MODES */ .K.NONE] = void 0;
GpuStencilModesToPixi[_shared_state_const_mjs__WEBPACK_IMPORTED_MODULE_0__/* .STENCIL_MODES */ .K.DISABLED] = {
  stencilWriteMask: 0,
  stencilReadMask: 0
};
GpuStencilModesToPixi[_shared_state_const_mjs__WEBPACK_IMPORTED_MODULE_0__/* .STENCIL_MODES */ .K.RENDERING_MASK_ADD] = {
  stencilFront: {
    compare: "equal",
    passOp: "increment-clamp"
  },
  stencilBack: {
    compare: "equal",
    passOp: "increment-clamp"
  }
};
GpuStencilModesToPixi[_shared_state_const_mjs__WEBPACK_IMPORTED_MODULE_0__/* .STENCIL_MODES */ .K.RENDERING_MASK_REMOVE] = {
  stencilFront: {
    compare: "equal",
    passOp: "decrement-clamp"
  },
  stencilBack: {
    compare: "equal",
    passOp: "decrement-clamp"
  }
};
GpuStencilModesToPixi[_shared_state_const_mjs__WEBPACK_IMPORTED_MODULE_0__/* .STENCIL_MODES */ .K.MASK_ACTIVE] = {
  stencilWriteMask: 0,
  stencilFront: {
    compare: "equal",
    passOp: "keep"
  },
  stencilBack: {
    compare: "equal",
    passOp: "keep"
  }
};
GpuStencilModesToPixi[_shared_state_const_mjs__WEBPACK_IMPORTED_MODULE_0__/* .STENCIL_MODES */ .K.INVERSE_MASK_ACTIVE] = {
  stencilWriteMask: 0,
  stencilFront: {
    compare: "not-equal",
    passOp: "replace"
  },
  stencilBack: {
    compare: "not-equal",
    passOp: "replace"
  }
};


//# sourceMappingURL=GpuStencilModesToPixi.mjs.map


/***/ }),

/***/ 28482:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ BufferResource)
/* harmony export */ });
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80413);
/* harmony import */ var _utils_data_uid_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74670);



"use strict";
class BufferResource extends eventemitter3__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A {
  /**
   * Create a new Buffer Resource.
   * @param options - The options for the buffer resource
   * @param options.buffer - The underlying buffer that this resource is using
   * @param options.offset - The offset of the buffer this resource is using.
   * If not provided, then it will use the offset of the buffer.
   * @param options.size - The size of the buffer this resource is using.
   * If not provided, then it will use the size of the buffer.
   */
  constructor({ buffer, offset, size }) {
    super();
    /**
     * emits when the underlying buffer has changed shape (i.e. resized)
     * letting the renderer know that it needs to discard the old buffer on the GPU and create a new one
     * @event change
     */
    /** a unique id for this uniform group used through the renderer */
    this.uid = (0,_utils_data_uid_mjs__WEBPACK_IMPORTED_MODULE_1__/* .uid */ .L)("buffer");
    /**
     * a resource type, used to identify how to handle it when its in a bind group / shader resource
     * @internal
     * @ignore
     */
    this._resourceType = "bufferResource";
    /**
     * used internally to know if a uniform group was used in the last render pass
     * @internal
     * @ignore
     */
    this._touched = 0;
    /**
     * the resource id used internally by the renderer to build bind group keys
     * @internal
     * @ignore
     */
    this._resourceId = (0,_utils_data_uid_mjs__WEBPACK_IMPORTED_MODULE_1__/* .uid */ .L)("resource");
    /**
     * A cheeky hint to the GL renderer to let it know this is a BufferResource
     * @internal
     * @ignore
     */
    this._bufferResource = true;
    /**
     * Has the Buffer resource been destroyed?
     * @readonly
     */
    this.destroyed = false;
    this.buffer = buffer;
    this.offset = offset | 0;
    this.size = size;
    this.buffer.on("change", this.onBufferChange, this);
  }
  onBufferChange() {
    this._resourceId = (0,_utils_data_uid_mjs__WEBPACK_IMPORTED_MODULE_1__/* .uid */ .L)("resource");
    this.emit("change", this);
  }
  /**
   * Destroys this resource. Make sure the underlying buffer is not used anywhere else
   * if you want to destroy it as well, or code will explode
   * @param destroyBuffer - Should the underlying buffer be destroyed as well?
   */
  destroy(destroyBuffer = false) {
    this.destroyed = true;
    if (destroyBuffer) {
      this.buffer.destroy();
    }
    this.emit("change", this);
    this.buffer = null;
  }
}


//# sourceMappingURL=BufferResource.mjs.map


/***/ }),

/***/ 47776:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ RenderTarget)
/* harmony export */ });
/* harmony import */ var _utils_data_uid_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74670);
/* harmony import */ var _texture_sources_TextureSource_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20068);
/* harmony import */ var _texture_Texture_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80443);




"use strict";
const _RenderTarget = class _RenderTarget {
  /**
   * @param [descriptor] - Options for creating a render target.
   */
  constructor(descriptor = {}) {
    /** unique id for this render target */
    this.uid = (0,_utils_data_uid_mjs__WEBPACK_IMPORTED_MODULE_0__/* .uid */ .L)("renderTarget");
    /**
     * An array of textures that can be written to by the GPU - mostly this has one texture in Pixi, but you could
     * write to multiple if required! (eg deferred lighting)
     */
    this.colorTextures = [];
    this.dirtyId = 0;
    this.isRoot = false;
    this._size = new Float32Array(2);
    /** if true, then when the render target is destroyed, it will destroy all the textures that were created for it. */
    this._managedColorTextures = false;
    descriptor = { ..._RenderTarget.defaultOptions, ...descriptor };
    this.stencil = descriptor.stencil;
    this.depth = descriptor.depth;
    this.isRoot = descriptor.isRoot;
    if (typeof descriptor.colorTextures === "number") {
      this._managedColorTextures = true;
      for (let i = 0; i < descriptor.colorTextures; i++) {
        this.colorTextures.push(
          new _texture_sources_TextureSource_mjs__WEBPACK_IMPORTED_MODULE_1__/* .TextureSource */ .v({
            width: descriptor.width,
            height: descriptor.height,
            resolution: descriptor.resolution,
            antialias: descriptor.antialias
          })
        );
      }
    } else {
      this.colorTextures = [...descriptor.colorTextures.map((texture) => texture.source)];
      const colorSource = this.colorTexture.source;
      this.resize(colorSource.width, colorSource.height, colorSource._resolution);
    }
    this.colorTexture.source.on("resize", this.onSourceResize, this);
    if (descriptor.depthStencilTexture || this.stencil) {
      if (descriptor.depthStencilTexture instanceof _texture_Texture_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Texture */ .g || descriptor.depthStencilTexture instanceof _texture_sources_TextureSource_mjs__WEBPACK_IMPORTED_MODULE_1__/* .TextureSource */ .v) {
        this.depthStencilTexture = descriptor.depthStencilTexture.source;
      } else {
        this.ensureDepthStencilTexture();
      }
    }
  }
  get size() {
    const _size = this._size;
    _size[0] = this.pixelWidth;
    _size[1] = this.pixelHeight;
    return _size;
  }
  get width() {
    return this.colorTexture.source.width;
  }
  get height() {
    return this.colorTexture.source.height;
  }
  get pixelWidth() {
    return this.colorTexture.source.pixelWidth;
  }
  get pixelHeight() {
    return this.colorTexture.source.pixelHeight;
  }
  get resolution() {
    return this.colorTexture.source._resolution;
  }
  get colorTexture() {
    return this.colorTextures[0];
  }
  onSourceResize(source) {
    this.resize(source.width, source.height, source._resolution, true);
  }
  /**
   * This will ensure a depthStencil texture is created for this render target.
   * Most likely called by the mask system to make sure we have stencil buffer added.
   * @internal
   * @ignore
   */
  ensureDepthStencilTexture() {
    if (!this.depthStencilTexture) {
      this.depthStencilTexture = new _texture_sources_TextureSource_mjs__WEBPACK_IMPORTED_MODULE_1__/* .TextureSource */ .v({
        width: this.width,
        height: this.height,
        resolution: this.resolution,
        format: "depth24plus-stencil8",
        autoGenerateMipmaps: false,
        antialias: false,
        mipLevelCount: 1
        // sampleCount: handled by the render target system..
      });
    }
  }
  resize(width, height, resolution = this.resolution, skipColorTexture = false) {
    this.dirtyId++;
    this.colorTextures.forEach((colorTexture, i) => {
      if (skipColorTexture && i === 0)
        return;
      colorTexture.source.resize(width, height, resolution);
    });
    if (this.depthStencilTexture) {
      this.depthStencilTexture.source.resize(width, height, resolution);
    }
  }
  destroy() {
    this.colorTexture.source.off("resize", this.onSourceResize, this);
    if (this._managedColorTextures) {
      this.colorTextures.forEach((texture) => {
        texture.destroy();
      });
    }
    if (this.depthStencilTexture) {
      this.depthStencilTexture.destroy();
      delete this.depthStencilTexture;
    }
  }
};
/** The default options for a render target */
_RenderTarget.defaultOptions = {
  /** the width of the RenderTarget */
  width: 0,
  /** the height of the RenderTarget */
  height: 0,
  /** the resolution of the RenderTarget */
  resolution: 1,
  /** an array of textures, or a number indicating how many color textures there should be */
  colorTextures: 1,
  /** should this render target have a stencil buffer? */
  stencil: false,
  /** should this render target have a depth buffer? */
  depth: false,
  /** should this render target be antialiased? */
  antialias: false,
  // save on perf by default!
  /** is this a root element, true if this is gl context owners render target */
  isRoot: false
};
let RenderTarget = _RenderTarget;


//# sourceMappingURL=RenderTarget.mjs.map


/***/ }),

/***/ 15225:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  l: () => (/* binding */ RenderTargetSystem)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/maths/matrix/Matrix.mjs
var Matrix = __webpack_require__(6736);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/maths/shapes/Rectangle.mjs
var Rectangle = __webpack_require__(75639);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/gl/const.mjs
var gl_const = __webpack_require__(57970);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/gpu/renderTarget/calculateProjection.mjs

function calculateProjection(pm, x, y, width, height, flipY) {
  const sign = flipY ? 1 : -1;
  pm.identity();
  pm.a = 1 / width * 2;
  pm.d = sign * (1 / height * 2);
  pm.tx = -1 - x * pm.a;
  pm.ty = -sign - y * pm.d;
  return pm;
}


//# sourceMappingURL=calculateProjection.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/system/SystemRunner.mjs
var SystemRunner = __webpack_require__(1626);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/CanvasSource.mjs
var CanvasSource = __webpack_require__(99933);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/TextureSource.mjs
var TextureSource = __webpack_require__(20068);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.mjs + 2 modules
var Texture = __webpack_require__(80443);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/utils/getCanvasTexture.mjs
var getCanvasTexture = __webpack_require__(33756);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/renderTarget/isRenderingToScreen.mjs

function isRenderingToScreen(renderTarget) {
  const resource = renderTarget.colorTexture.source.resource;
  return globalThis.HTMLCanvasElement && resource instanceof HTMLCanvasElement && document.body.contains(resource);
}


//# sourceMappingURL=isRenderingToScreen.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/renderTarget/RenderTarget.mjs
var RenderTarget = __webpack_require__(47776);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/renderTarget/RenderTargetSystem.mjs












"use strict";
class RenderTargetSystem {
  constructor(renderer) {
    /** This is the root viewport for the render pass*/
    this.rootViewPort = new Rectangle/* Rectangle */.M();
    /** the current viewport that the gpu is using */
    this.viewport = new Rectangle/* Rectangle */.M();
    /**
     * a runner that lets systems know if the active render target has changed.
     * Eg the Stencil System needs to know so it can manage the stencil buffer
     */
    this.onRenderTargetChange = new SystemRunner/* SystemRunner */.C("onRenderTargetChange");
    /** the projection matrix that is used by the shaders based on the active render target and the viewport */
    this.projectionMatrix = new Matrix/* Matrix */.u();
    /** the default clear color for render targets */
    this.defaultClearColor = [0, 0, 0, 0];
    /**
     * a hash that stores the render target for a given render surface. When you pass in a texture source,
     * a render target is created for it. This map stores and makes it easy to retrieve the render target
     */
    this._renderSurfaceToRenderTargetHash = /* @__PURE__ */ new Map();
    /** A hash that stores a gpu render target for a given render target. */
    this._gpuRenderTargetHash = /* @__PURE__ */ Object.create(null);
    /**
     * A stack that stores the render target and frame that is currently being rendered to.
     * When push is called, the current render target is stored in this stack.
     * When pop is called, the previous render target is restored.
     */
    this._renderTargetStack = [];
    this._renderer = renderer;
    renderer.renderableGC.addManagedHash(this, "_gpuRenderTargetHash");
  }
  /** called when dev wants to finish a render pass */
  finishRenderPass() {
    this.adaptor.finishRenderPass(this.renderTarget);
  }
  /**
   * called when the renderer starts to render a scene.
   * @param options
   * @param options.target - the render target to render to
   * @param options.clear - the clear mode to use. Can be true or a CLEAR number 'COLOR | DEPTH | STENCIL' 0b111
   * @param options.clearColor - the color to clear to
   * @param options.frame - the frame to render to
   */
  renderStart({
    target,
    clear,
    clearColor,
    frame
  }) {
    this._renderTargetStack.length = 0;
    this.push(
      target,
      clear,
      clearColor,
      frame
    );
    this.rootViewPort.copyFrom(this.viewport);
    this.rootRenderTarget = this.renderTarget;
    this.renderingToScreen = isRenderingToScreen(this.rootRenderTarget);
    this.adaptor.prerender?.(this.rootRenderTarget);
  }
  postrender() {
    this.adaptor.postrender?.(this.rootRenderTarget);
  }
  /**
   * Binding a render surface! This is the main function of the render target system.
   * It will take the RenderSurface (which can be a texture, canvas, or render target) and bind it to the renderer.
   * Once bound all draw calls will be rendered to the render surface.
   *
   * If a frame is not provide and the render surface is a texture, the frame of the texture will be used.
   * @param renderSurface - the render surface to bind
   * @param clear - the clear mode to use. Can be true or a CLEAR number 'COLOR | DEPTH | STENCIL' 0b111
   * @param clearColor - the color to clear to
   * @param frame - the frame to render to
   * @returns the render target that was bound
   */
  bind(renderSurface, clear = true, clearColor, frame) {
    const renderTarget = this.getRenderTarget(renderSurface);
    const didChange = this.renderTarget !== renderTarget;
    this.renderTarget = renderTarget;
    this.renderSurface = renderSurface;
    const gpuRenderTarget = this.getGpuRenderTarget(renderTarget);
    if (renderTarget.pixelWidth !== gpuRenderTarget.width || renderTarget.pixelHeight !== gpuRenderTarget.height) {
      this.adaptor.resizeGpuRenderTarget(renderTarget);
      gpuRenderTarget.width = renderTarget.pixelWidth;
      gpuRenderTarget.height = renderTarget.pixelHeight;
    }
    const source = renderTarget.colorTexture;
    const viewport = this.viewport;
    const pixelWidth = source.pixelWidth;
    const pixelHeight = source.pixelHeight;
    if (!frame && renderSurface instanceof Texture/* Texture */.g) {
      frame = renderSurface.frame;
    }
    if (frame) {
      const resolution = source._resolution;
      viewport.x = frame.x * resolution + 0.5 | 0;
      viewport.y = frame.y * resolution + 0.5 | 0;
      viewport.width = frame.width * resolution + 0.5 | 0;
      viewport.height = frame.height * resolution + 0.5 | 0;
    } else {
      viewport.x = 0;
      viewport.y = 0;
      viewport.width = pixelWidth;
      viewport.height = pixelHeight;
    }
    calculateProjection(
      this.projectionMatrix,
      0,
      0,
      viewport.width / source.resolution,
      viewport.height / source.resolution,
      !renderTarget.isRoot
    );
    this.adaptor.startRenderPass(renderTarget, clear, clearColor, viewport);
    if (didChange) {
      this.onRenderTargetChange.emit(renderTarget);
    }
    return renderTarget;
  }
  clear(target, clear = gl_const/* CLEAR */.u.ALL, clearColor) {
    if (!clear)
      return;
    if (target) {
      target = this.getRenderTarget(target);
    }
    this.adaptor.clear(
      target || this.renderTarget,
      clear,
      clearColor,
      this.viewport
    );
  }
  contextChange() {
    this._gpuRenderTargetHash = /* @__PURE__ */ Object.create(null);
  }
  /**
   * Push a render surface to the renderer. This will bind the render surface to the renderer,
   * @param renderSurface - the render surface to push
   * @param clear - the clear mode to use. Can be true or a CLEAR number 'COLOR | DEPTH | STENCIL' 0b111
   * @param clearColor - the color to clear to
   * @param frame - the frame to use when rendering to the render surface
   */
  push(renderSurface, clear = gl_const/* CLEAR */.u.ALL, clearColor, frame) {
    const renderTarget = this.bind(renderSurface, clear, clearColor, frame);
    this._renderTargetStack.push({
      renderTarget,
      frame
    });
    return renderTarget;
  }
  /** Pops the current render target from the renderer and restores the previous render target. */
  pop() {
    this._renderTargetStack.pop();
    const currentRenderTargetData = this._renderTargetStack[this._renderTargetStack.length - 1];
    this.bind(currentRenderTargetData.renderTarget, false, null, currentRenderTargetData.frame);
  }
  /**
   * Gets the render target from the provide render surface. Eg if its a texture,
   * it will return the render target for the texture.
   * If its a render target, it will return the same render target.
   * @param renderSurface - the render surface to get the render target for
   * @returns the render target for the render surface
   */
  getRenderTarget(renderSurface) {
    if (renderSurface.isTexture) {
      renderSurface = renderSurface.source;
    }
    return this._renderSurfaceToRenderTargetHash.get(renderSurface) ?? this._initRenderTarget(renderSurface);
  }
  /**
   * Copies a render surface to another texture.
   *
   * NOTE:
   * for sourceRenderSurfaceTexture, The render target must be something that is written too by the renderer
   *
   * The following is not valid:
   * @example
   * const canvas = document.createElement('canvas')
   * canvas.width = 200;
   * canvas.height = 200;
   *
   * const ctx = canvas2.getContext('2d')!
   * ctx.fillStyle = 'red'
   * ctx.fillRect(0, 0, 200, 200);
   *
   * const texture = RenderTexture.create({
   *   width: 200,
   *   height: 200,
   * })
   * const renderTarget = renderer.renderTarget.getRenderTarget(canvas2);
   *
   * renderer.renderTarget.copyToTexture(renderTarget,texture, {x:0,y:0},{width:200,height:200},{x:0,y:0});
   *
   * The best way to copy a canvas is to create a texture from it. Then render with that.
   *
   * Parsing in a RenderTarget canvas context (with a 2d context)
   * @param sourceRenderSurfaceTexture - the render surface to copy from
   * @param destinationTexture - the texture to copy to
   * @param originSrc - the origin of the copy
   * @param originSrc.x - the x origin of the copy
   * @param originSrc.y - the y origin of the copy
   * @param size - the size of the copy
   * @param size.width - the width of the copy
   * @param size.height - the height of the copy
   * @param originDest - the destination origin (top left to paste from!)
   * @param originDest.x - the x origin of the paste
   * @param originDest.y - the y origin of the paste
   */
  copyToTexture(sourceRenderSurfaceTexture, destinationTexture, originSrc, size, originDest) {
    if (originSrc.x < 0) {
      size.width += originSrc.x;
      originDest.x -= originSrc.x;
      originSrc.x = 0;
    }
    if (originSrc.y < 0) {
      size.height += originSrc.y;
      originDest.y -= originSrc.y;
      originSrc.y = 0;
    }
    const { pixelWidth, pixelHeight } = sourceRenderSurfaceTexture;
    size.width = Math.min(size.width, pixelWidth - originSrc.x);
    size.height = Math.min(size.height, pixelHeight - originSrc.y);
    return this.adaptor.copyToTexture(
      sourceRenderSurfaceTexture,
      destinationTexture,
      originSrc,
      size,
      originDest
    );
  }
  /**
   * ensures that we have a depth stencil buffer available to render to
   * This is used by the mask system to make sure we have a stencil buffer.
   */
  ensureDepthStencil() {
    if (!this.renderTarget.stencil) {
      this.renderTarget.stencil = true;
      this.adaptor.startRenderPass(this.renderTarget, false, null, this.viewport);
    }
  }
  /** nukes the render target system */
  destroy() {
    this._renderer = null;
    this._renderSurfaceToRenderTargetHash.forEach((renderTarget, key) => {
      if (renderTarget !== key) {
        renderTarget.destroy();
      }
    });
    this._renderSurfaceToRenderTargetHash.clear();
    this._gpuRenderTargetHash = /* @__PURE__ */ Object.create(null);
  }
  _initRenderTarget(renderSurface) {
    let renderTarget = null;
    if (CanvasSource/* CanvasSource */.q.test(renderSurface)) {
      renderSurface = (0,getCanvasTexture/* getCanvasTexture */.c)(renderSurface).source;
    }
    if (renderSurface instanceof RenderTarget/* RenderTarget */.O) {
      renderTarget = renderSurface;
    } else if (renderSurface instanceof TextureSource/* TextureSource */.v) {
      renderTarget = new RenderTarget/* RenderTarget */.O({
        colorTextures: [renderSurface]
      });
      if (CanvasSource/* CanvasSource */.q.test(renderSurface.source.resource)) {
        renderTarget.isRoot = true;
      }
      renderSurface.once("destroy", () => {
        renderTarget.destroy();
        this._renderSurfaceToRenderTargetHash.delete(renderSurface);
        const gpuRenderTarget = this._gpuRenderTargetHash[renderTarget.uid];
        if (gpuRenderTarget) {
          this._gpuRenderTargetHash[renderTarget.uid] = null;
          this.adaptor.destroyGpuRenderTarget(gpuRenderTarget);
        }
      });
    }
    this._renderSurfaceToRenderTargetHash.set(renderSurface, renderTarget);
    return renderTarget;
  }
  getGpuRenderTarget(renderTarget) {
    return this._gpuRenderTargetHash[renderTarget.uid] || (this._gpuRenderTargetHash[renderTarget.uid] = this.adaptor.initGpuRenderTarget(renderTarget));
  }
  resetState() {
    this.renderTarget = null;
    this.renderSurface = null;
  }
}


//# sourceMappingURL=RenderTargetSystem.mjs.map


/***/ }),

/***/ 33086:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ UboSystem)
/* harmony export */ });
/* harmony import */ var _utils_browser_unsafeEvalSupported_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61264);
/* harmony import */ var _buffer_Buffer_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(75174);
/* harmony import */ var _buffer_const_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48865);




"use strict";
class UboSystem {
  constructor(adaptor) {
    /** Cache of uniform buffer layouts and sync functions, so we don't have to re-create them */
    this._syncFunctionHash = /* @__PURE__ */ Object.create(null);
    this._adaptor = adaptor;
    this._systemCheck();
  }
  /**
   * Overridable function by `pixi.js/unsafe-eval` to silence
   * throwing an error if platform doesn't support unsafe-evals.
   * @private
   */
  _systemCheck() {
    if (!(0,_utils_browser_unsafeEvalSupported_mjs__WEBPACK_IMPORTED_MODULE_0__/* .unsafeEvalSupported */ .f)()) {
      throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.");
    }
  }
  ensureUniformGroup(uniformGroup) {
    const uniformData = this.getUniformGroupData(uniformGroup);
    uniformGroup.buffer || (uniformGroup.buffer = new _buffer_Buffer_mjs__WEBPACK_IMPORTED_MODULE_1__/* .Buffer */ .h({
      data: new Float32Array(uniformData.layout.size / 4),
      usage: _buffer_const_mjs__WEBPACK_IMPORTED_MODULE_2__/* .BufferUsage */ .S.UNIFORM | _buffer_const_mjs__WEBPACK_IMPORTED_MODULE_2__/* .BufferUsage */ .S.COPY_DST
    }));
  }
  getUniformGroupData(uniformGroup) {
    return this._syncFunctionHash[uniformGroup._signature] || this._initUniformGroup(uniformGroup);
  }
  _initUniformGroup(uniformGroup) {
    const uniformGroupSignature = uniformGroup._signature;
    let uniformData = this._syncFunctionHash[uniformGroupSignature];
    if (!uniformData) {
      const elements = Object.keys(uniformGroup.uniformStructures).map((i) => uniformGroup.uniformStructures[i]);
      const layout = this._adaptor.createUboElements(elements);
      const syncFunction = this._generateUboSync(layout.uboElements);
      uniformData = this._syncFunctionHash[uniformGroupSignature] = {
        layout,
        syncFunction
      };
    }
    return this._syncFunctionHash[uniformGroupSignature];
  }
  _generateUboSync(uboElements) {
    return this._adaptor.generateUboSync(uboElements);
  }
  syncUniformGroup(uniformGroup, data, offset) {
    const uniformGroupData = this.getUniformGroupData(uniformGroup);
    uniformGroup.buffer || (uniformGroup.buffer = new _buffer_Buffer_mjs__WEBPACK_IMPORTED_MODULE_1__/* .Buffer */ .h({
      data: new Float32Array(uniformGroupData.layout.size / 4),
      usage: _buffer_const_mjs__WEBPACK_IMPORTED_MODULE_2__/* .BufferUsage */ .S.UNIFORM | _buffer_const_mjs__WEBPACK_IMPORTED_MODULE_2__/* .BufferUsage */ .S.COPY_DST
    }));
    let dataInt32 = null;
    if (!data) {
      data = uniformGroup.buffer.data;
      dataInt32 = uniformGroup.buffer.dataInt32;
    }
    offset || (offset = 0);
    uniformGroupData.syncFunction(uniformGroup.uniforms, data, dataInt32, offset);
    return true;
  }
  updateUniformGroup(uniformGroup) {
    if (uniformGroup.isStatic && !uniformGroup._dirtyId)
      return false;
    uniformGroup._dirtyId = 0;
    const synced = this.syncUniformGroup(uniformGroup);
    uniformGroup.buffer.update();
    return synced;
  }
  destroy() {
    this._syncFunctionHash = null;
  }
}


//# sourceMappingURL=UboSystem.mjs.map


/***/ }),

/***/ 3954:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ createUboSyncFunction)
/* harmony export */ });
/* harmony import */ var _uniformParsers_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37849);


"use strict";
function createUboSyncFunction(uboElements, parserCode, arrayGenerationFunction, singleSettersMap) {
  const funcFragments = [`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
        var name = null;
        var arrayOffset = null;
    `];
  let prev = 0;
  for (let i = 0; i < uboElements.length; i++) {
    const uboElement = uboElements[i];
    const name = uboElement.data.name;
    let parsed = false;
    let offset = 0;
    for (let j = 0; j < _uniformParsers_mjs__WEBPACK_IMPORTED_MODULE_0__/* .uniformParsers */ .$.length; j++) {
      const uniformParser = _uniformParsers_mjs__WEBPACK_IMPORTED_MODULE_0__/* .uniformParsers */ .$[j];
      if (uniformParser.test(uboElement.data)) {
        offset = uboElement.offset / 4;
        funcFragments.push(
          `name = "${name}";`,
          `offset += ${offset - prev};`,
          _uniformParsers_mjs__WEBPACK_IMPORTED_MODULE_0__/* .uniformParsers */ .$[j][parserCode] || _uniformParsers_mjs__WEBPACK_IMPORTED_MODULE_0__/* .uniformParsers */ .$[j].ubo
        );
        parsed = true;
        break;
      }
    }
    if (!parsed) {
      if (uboElement.data.size > 1) {
        offset = uboElement.offset / 4;
        funcFragments.push(arrayGenerationFunction(uboElement, offset - prev));
      } else {
        const template = singleSettersMap[uboElement.data.type];
        offset = uboElement.offset / 4;
        funcFragments.push(
          /* wgsl */
          `
                    v = uv.${name};
                    offset += ${offset - prev};
                    ${template};
                `
        );
      }
    }
    prev = offset;
  }
  const fragmentSrc = funcFragments.join("\n");
  return new Function(
    "uv",
    "data",
    "dataInt32",
    "offset",
    fragmentSrc
  );
}


//# sourceMappingURL=createUboSyncFunction.mjs.map


/***/ }),

/***/ 14401:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ uboSyncFunctionsWGSL),
/* harmony export */   g: () => (/* binding */ uboSyncFunctionsSTD40)
/* harmony export */ });

function loopMatrix(col, row) {
  const total = col * row;
  return `
        for (let i = 0; i < ${total}; i++) {
            data[offset + (((i / ${col})|0) * 4) + (i % ${col})] = v[i];
        }
    `;
}
const uboSyncFunctionsSTD40 = {
  f32: `
        data[offset] = v;`,
  i32: `
        dataInt32[offset] = v;`,
  "vec2<f32>": `
        data[offset] = v[0];
        data[offset + 1] = v[1];`,
  "vec3<f32>": `
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];`,
  "vec4<f32>": `
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];`,
  "vec2<i32>": `
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];`,
  "vec3<i32>": `
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];`,
  "vec4<i32>": `
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];
        dataInt32[offset + 3] = v[3];`,
  "mat2x2<f32>": `
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 4] = v[2];
        data[offset + 5] = v[3];`,
  "mat3x3<f32>": `
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];
        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];`,
  "mat4x4<f32>": `
        for (let i = 0; i < 16; i++) {
            data[offset + i] = v[i];
        }`,
  "mat3x2<f32>": loopMatrix(3, 2),
  "mat4x2<f32>": loopMatrix(4, 2),
  "mat2x3<f32>": loopMatrix(2, 3),
  "mat4x3<f32>": loopMatrix(4, 3),
  "mat2x4<f32>": loopMatrix(2, 4),
  "mat3x4<f32>": loopMatrix(3, 4)
};
const uboSyncFunctionsWGSL = {
  ...uboSyncFunctionsSTD40,
  "mat2x2<f32>": `
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];
    `
};


//# sourceMappingURL=uboSyncFunctions.mjs.map


/***/ }),

/***/ 37849:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ uniformParsers)
/* harmony export */ });

const uniformParsers = [
  // uploading pixi matrix object to mat3
  {
    type: "mat3x3<f32>",
    test: (data) => {
      const value = data.value;
      return value.a !== void 0;
    },
    ubo: `
            var matrix = uv[name].toArray(true);
            data[offset] = matrix[0];
            data[offset + 1] = matrix[1];
            data[offset + 2] = matrix[2];
            data[offset + 4] = matrix[3];
            data[offset + 5] = matrix[4];
            data[offset + 6] = matrix[5];
            data[offset + 8] = matrix[6];
            data[offset + 9] = matrix[7];
            data[offset + 10] = matrix[8];
        `,
    uniform: `
            gl.uniformMatrix3fv(ud[name].location, false, uv[name].toArray(true));
        `
  },
  // uploading a pixi rectangle as a vec4
  {
    type: "vec4<f32>",
    test: (data) => data.type === "vec4<f32>" && data.size === 1 && data.value.width !== void 0,
    ubo: `
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
            data[offset + 2] = v.width;
            data[offset + 3] = v.height;
        `,
    uniform: `
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height) {
                cv[0] = v.x;
                cv[1] = v.y;
                cv[2] = v.width;
                cv[3] = v.height;
                gl.uniform4f(ud[name].location, v.x, v.y, v.width, v.height);
            }
        `
  },
  // uploading a pixi point as a vec2
  {
    type: "vec2<f32>",
    test: (data) => data.type === "vec2<f32>" && data.size === 1 && data.value.x !== void 0,
    ubo: `
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
        `,
    uniform: `
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y) {
                cv[0] = v.x;
                cv[1] = v.y;
                gl.uniform2f(ud[name].location, v.x, v.y);
            }
        `
  },
  // uploading a pixi color as a vec4
  {
    type: "vec4<f32>",
    test: (data) => data.type === "vec4<f32>" && data.size === 1 && data.value.red !== void 0,
    ubo: `
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
            data[offset + 3] = v.alpha;
        `,
    uniform: `
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                cv[3] = v.alpha;
                gl.uniform4f(ud[name].location, v.red, v.green, v.blue, v.alpha);
            }
        `
  },
  // uploading a pixi color as a vec3
  {
    type: "vec3<f32>",
    test: (data) => data.type === "vec3<f32>" && data.size === 1 && data.value.red !== void 0,
    ubo: `
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
        `,
    uniform: `
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                gl.uniform3f(ud[name].location, v.red, v.green, v.blue);
            }
        `
  }
];


//# sourceMappingURL=uniformParsers.mjs.map


/***/ }),

/***/ 25720:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  f: () => (/* binding */ SharedRenderPipes),
  i: () => (/* binding */ SharedSystems)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/extensions/Extensions.mjs
var Extensions = __webpack_require__(44642);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/container/CustomRenderPipe.mjs


"use strict";
class CustomRenderPipe {
  constructor(renderer) {
    this._renderer = renderer;
  }
  updateRenderable() {
  }
  destroyRenderable() {
  }
  validateRenderable() {
    return false;
  }
  addRenderable(container, instructionSet) {
    this._renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add(container);
  }
  execute(container) {
    if (!container.isRenderable)
      return;
    container.render(this._renderer);
  }
  destroy() {
    this._renderer = null;
  }
}
CustomRenderPipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "customRender"
};


//# sourceMappingURL=CustomRenderPipe.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/maths/matrix/Matrix.mjs
var Matrix = __webpack_require__(6736);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/pool/PoolGroup.mjs
var PoolGroup = __webpack_require__(70949);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite/BatchableSprite.mjs
var BatchableSprite = __webpack_require__(673);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/container/utils/executeInstructions.mjs

function executeInstructions(renderGroup, renderer) {
  const instructionSet = renderGroup.instructionSet;
  const instructions = instructionSet.instructions;
  for (let i = 0; i < instructionSet.instructionSize; i++) {
    const instruction = instructions[i];
    renderer[instruction.renderPipeId].execute(instruction);
  }
}


//# sourceMappingURL=executeInstructions.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/container/RenderGroupPipe.mjs






"use strict";
const tempMatrix = new Matrix/* Matrix */.u();
class RenderGroupPipe {
  constructor(renderer) {
    this._renderer = renderer;
  }
  addRenderGroup(renderGroup, instructionSet) {
    if (renderGroup.isCachedAsTexture) {
      this._addRenderableCacheAsTexture(renderGroup, instructionSet);
    } else {
      this._addRenderableDirect(renderGroup, instructionSet);
    }
  }
  execute(renderGroup) {
    if (!renderGroup.isRenderable)
      return;
    if (renderGroup.isCachedAsTexture) {
      this._executeCacheAsTexture(renderGroup);
    } else {
      this._executeDirect(renderGroup);
    }
  }
  destroy() {
    this._renderer = null;
  }
  _addRenderableDirect(renderGroup, instructionSet) {
    this._renderer.renderPipes.batch.break(instructionSet);
    if (renderGroup._batchableRenderGroup) {
      PoolGroup/* BigPool */.Z.return(renderGroup._batchableRenderGroup);
      renderGroup._batchableRenderGroup = null;
    }
    instructionSet.add(renderGroup);
  }
  _addRenderableCacheAsTexture(renderGroup, instructionSet) {
    const batchableRenderGroup = renderGroup._batchableRenderGroup ?? (renderGroup._batchableRenderGroup = PoolGroup/* BigPool */.Z.get(BatchableSprite/* BatchableSprite */.K));
    batchableRenderGroup.renderable = renderGroup.root;
    batchableRenderGroup.transform = renderGroup.root.relativeGroupTransform;
    batchableRenderGroup.texture = renderGroup.texture;
    batchableRenderGroup.bounds = renderGroup._textureBounds;
    instructionSet.add(renderGroup);
    this._renderer.renderPipes.batch.addToBatch(batchableRenderGroup, instructionSet);
  }
  _executeCacheAsTexture(renderGroup) {
    if (renderGroup.textureNeedsUpdate) {
      renderGroup.textureNeedsUpdate = false;
      const worldTransformMatrix = tempMatrix.identity().translate(
        -renderGroup._textureBounds.x,
        -renderGroup._textureBounds.y
      );
      this._renderer.renderTarget.push(renderGroup.texture, true, null, renderGroup.texture.frame);
      this._renderer.globalUniforms.push({
        worldTransformMatrix,
        worldColor: 4294967295
      });
      executeInstructions(renderGroup, this._renderer.renderPipes);
      this._renderer.renderTarget.finishRenderPass();
      this._renderer.renderTarget.pop();
      this._renderer.globalUniforms.pop();
    }
    renderGroup._batchableRenderGroup._batcher.updateElement(renderGroup._batchableRenderGroup);
    renderGroup._batchableRenderGroup._batcher.geometry.buffers[0].update();
  }
  _executeDirect(renderGroup) {
    this._renderer.globalUniforms.push({
      worldTransformMatrix: renderGroup.inverseParentTextureTransform,
      worldColor: renderGroup.worldColorAlpha
    });
    executeInstructions(renderGroup, this._renderer.renderPipes);
    this._renderer.globalUniforms.pop();
  }
}
RenderGroupPipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "renderGroup"
};


//# sourceMappingURL=RenderGroupPipe.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/TexturePool.mjs
var TexturePool = __webpack_require__(52942);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/container/bounds/Bounds.mjs
var Bounds = __webpack_require__(53297);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/container/utils/clearList.mjs

function clearList(list, index) {
  index || (index = 0);
  for (let j = index; j < list.length; j++) {
    if (list[j]) {
      list[j] = null;
    } else {
      break;
    }
  }
}


//# sourceMappingURL=clearList.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/container/Container.mjs + 16 modules
var Container = __webpack_require__(21306);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/container/utils/multiplyColors.mjs
var multiplyColors = __webpack_require__(73234);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/container/utils/updateRenderGroupTransforms.mjs




"use strict";
const tempContainer = new Container/* Container */.mc();
const UPDATE_BLEND_COLOR_VISIBLE = Container/* UPDATE_VISIBLE */.fR | Container/* UPDATE_COLOR */.ig | Container/* UPDATE_BLEND */.u;
function updateRenderGroupTransforms(renderGroup, updateChildRenderGroups = false) {
  updateRenderGroupTransform(renderGroup);
  const childrenToUpdate = renderGroup.childrenToUpdate;
  const updateTick = renderGroup.updateTick++;
  for (const j in childrenToUpdate) {
    const renderGroupDepth = Number(j);
    const childrenAtDepth = childrenToUpdate[j];
    const list = childrenAtDepth.list;
    const index = childrenAtDepth.index;
    for (let i = 0; i < index; i++) {
      const child = list[i];
      if (child.parentRenderGroup === renderGroup && child.relativeRenderGroupDepth === renderGroupDepth) {
        updateTransformAndChildren(child, updateTick, 0);
      }
    }
    clearList(list, index);
    childrenAtDepth.index = 0;
  }
  if (updateChildRenderGroups) {
    for (let i = 0; i < renderGroup.renderGroupChildren.length; i++) {
      updateRenderGroupTransforms(renderGroup.renderGroupChildren[i], updateChildRenderGroups);
    }
  }
}
function updateRenderGroupTransform(renderGroup) {
  const root = renderGroup.root;
  let worldAlpha;
  if (renderGroup.renderGroupParent) {
    const renderGroupParent = renderGroup.renderGroupParent;
    renderGroup.worldTransform.appendFrom(
      root.relativeGroupTransform,
      renderGroupParent.worldTransform
    );
    renderGroup.worldColor = (0,multiplyColors/* multiplyColors */.j)(
      root.groupColor,
      renderGroupParent.worldColor
    );
    worldAlpha = root.groupAlpha * renderGroupParent.worldAlpha;
  } else {
    renderGroup.worldTransform.copyFrom(root.localTransform);
    renderGroup.worldColor = root.localColor;
    worldAlpha = root.localAlpha;
  }
  worldAlpha = worldAlpha < 0 ? 0 : worldAlpha > 1 ? 1 : worldAlpha;
  renderGroup.worldAlpha = worldAlpha;
  renderGroup.worldColorAlpha = renderGroup.worldColor + ((worldAlpha * 255 | 0) << 24);
}
function updateTransformAndChildren(container, updateTick, updateFlags) {
  if (updateTick === container.updateTick)
    return;
  container.updateTick = updateTick;
  container.didChange = false;
  const localTransform = container.localTransform;
  container.updateLocalTransform();
  const parent = container.parent;
  if (parent && !parent.renderGroup) {
    updateFlags |= container._updateFlags;
    container.relativeGroupTransform.appendFrom(
      localTransform,
      parent.relativeGroupTransform
    );
    if (updateFlags & UPDATE_BLEND_COLOR_VISIBLE) {
      updateColorBlendVisibility(container, parent, updateFlags);
    }
  } else {
    updateFlags = container._updateFlags;
    container.relativeGroupTransform.copyFrom(localTransform);
    if (updateFlags & UPDATE_BLEND_COLOR_VISIBLE) {
      updateColorBlendVisibility(container, tempContainer, updateFlags);
    }
  }
  if (!container.renderGroup) {
    const children = container.children;
    const length = children.length;
    for (let i = 0; i < length; i++) {
      updateTransformAndChildren(children[i], updateTick, updateFlags);
    }
    const renderGroup = container.parentRenderGroup;
    const renderable = container;
    if (renderable.renderPipeId && !renderGroup.structureDidChange) {
      renderGroup.updateRenderable(renderable);
    }
  }
}
function updateColorBlendVisibility(container, parent, updateFlags) {
  if (updateFlags & Container/* UPDATE_COLOR */.ig) {
    container.groupColor = (0,multiplyColors/* multiplyColors */.j)(
      container.localColor,
      parent.groupColor
    );
    let groupAlpha = container.localAlpha * parent.groupAlpha;
    groupAlpha = groupAlpha < 0 ? 0 : groupAlpha > 1 ? 1 : groupAlpha;
    container.groupAlpha = groupAlpha;
    container.groupColorAlpha = container.groupColor + ((groupAlpha * 255 | 0) << 24);
  }
  if (updateFlags & Container/* UPDATE_BLEND */.u) {
    container.groupBlendMode = container.localBlendMode === "inherit" ? parent.groupBlendMode : container.localBlendMode;
  }
  if (updateFlags & Container/* UPDATE_VISIBLE */.fR) {
    container.globalDisplayStatus = container.localDisplayStatus & parent.globalDisplayStatus;
  }
  container._updateFlags = 0;
}


//# sourceMappingURL=updateRenderGroupTransforms.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/container/utils/validateRenderables.mjs

function validateRenderables(renderGroup, renderPipes) {
  const { list, index } = renderGroup.childrenRenderablesToUpdate;
  let rebuildRequired = false;
  for (let i = 0; i < index; i++) {
    const container = list[i];
    const renderable = container;
    const pipe = renderPipes[renderable.renderPipeId];
    rebuildRequired = pipe.validateRenderable(container);
    if (rebuildRequired) {
      break;
    }
  }
  renderGroup.structureDidChange = rebuildRequired;
  return rebuildRequired;
}


//# sourceMappingURL=validateRenderables.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/container/RenderGroupSystem.mjs









"use strict";
const RenderGroupSystem_tempMatrix = new Matrix/* Matrix */.u();
class RenderGroupSystem {
  constructor(renderer) {
    this._renderer = renderer;
  }
  render({ container, transform }) {
    const parent = container.parent;
    const renderGroupParent = container.renderGroup.renderGroupParent;
    container.parent = null;
    container.renderGroup.renderGroupParent = null;
    const renderer = this._renderer;
    let originalLocalTransform = RenderGroupSystem_tempMatrix;
    if (transform) {
      originalLocalTransform = originalLocalTransform.copyFrom(container.renderGroup.localTransform);
      container.renderGroup.localTransform.copyFrom(transform);
    }
    const renderPipes = renderer.renderPipes;
    this._updateCachedRenderGroups(container.renderGroup, null);
    this._updateRenderGroups(container.renderGroup);
    renderer.globalUniforms.start({
      worldTransformMatrix: transform ? container.renderGroup.localTransform : container.renderGroup.worldTransform,
      worldColor: container.renderGroup.worldColorAlpha
    });
    executeInstructions(container.renderGroup, renderPipes);
    if (renderPipes.uniformBatch) {
      renderPipes.uniformBatch.renderEnd();
    }
    if (transform) {
      container.renderGroup.localTransform.copyFrom(originalLocalTransform);
    }
    container.parent = parent;
    container.renderGroup.renderGroupParent = renderGroupParent;
  }
  destroy() {
    this._renderer = null;
  }
  _updateCachedRenderGroups(renderGroup, closestCacheAsTexture) {
    if (renderGroup.isCachedAsTexture) {
      if (!renderGroup.updateCacheTexture)
        return;
      closestCacheAsTexture = renderGroup;
    }
    renderGroup._parentCacheAsTextureRenderGroup = closestCacheAsTexture;
    for (let i = renderGroup.renderGroupChildren.length - 1; i >= 0; i--) {
      this._updateCachedRenderGroups(renderGroup.renderGroupChildren[i], closestCacheAsTexture);
    }
    renderGroup.invalidateMatrices();
    if (renderGroup.isCachedAsTexture) {
      if (renderGroup.textureNeedsUpdate) {
        const bounds = renderGroup.root.getLocalBounds();
        bounds.ceil();
        const lastTexture = renderGroup.texture;
        if (renderGroup.texture) {
          TexturePool/* TexturePool */.W.returnTexture(renderGroup.texture);
        }
        const renderer = this._renderer;
        const resolution = renderGroup.textureOptions.resolution || renderer.view.resolution;
        const antialias = renderGroup.textureOptions.antialias ?? renderer.view.antialias;
        renderGroup.texture = TexturePool/* TexturePool */.W.getOptimalTexture(
          bounds.width,
          bounds.height,
          resolution,
          antialias
        );
        renderGroup._textureBounds || (renderGroup._textureBounds = new Bounds/* Bounds */.c());
        renderGroup._textureBounds.copyFrom(bounds);
        if (lastTexture !== renderGroup.texture) {
          if (renderGroup.renderGroupParent) {
            renderGroup.renderGroupParent.structureDidChange = true;
          }
        }
      }
    } else if (renderGroup.texture) {
      TexturePool/* TexturePool */.W.returnTexture(renderGroup.texture);
      renderGroup.texture = null;
    }
  }
  _updateRenderGroups(renderGroup) {
    const renderer = this._renderer;
    const renderPipes = renderer.renderPipes;
    renderGroup.runOnRender(renderer);
    renderGroup.instructionSet.renderPipes = renderPipes;
    if (!renderGroup.structureDidChange) {
      validateRenderables(renderGroup, renderPipes);
    } else {
      clearList(renderGroup.childrenRenderablesToUpdate.list, 0);
    }
    updateRenderGroupTransforms(renderGroup);
    if (renderGroup.structureDidChange) {
      renderGroup.structureDidChange = false;
      this._buildInstructions(renderGroup, renderer);
    } else {
      this._updateRenderables(renderGroup);
    }
    renderGroup.childrenRenderablesToUpdate.index = 0;
    renderer.renderPipes.batch.upload(renderGroup.instructionSet);
    if (renderGroup.isCachedAsTexture && !renderGroup.textureNeedsUpdate)
      return;
    for (let i = 0; i < renderGroup.renderGroupChildren.length; i++) {
      this._updateRenderGroups(renderGroup.renderGroupChildren[i]);
    }
  }
  _updateRenderables(renderGroup) {
    const { list, index } = renderGroup.childrenRenderablesToUpdate;
    for (let i = 0; i < index; i++) {
      const container = list[i];
      if (container.didViewUpdate) {
        renderGroup.updateRenderable(container);
      }
    }
    clearList(list, index);
  }
  _buildInstructions(renderGroup, rendererOrPipes) {
    const root = renderGroup.root;
    const instructionSet = renderGroup.instructionSet;
    instructionSet.reset();
    const renderer = rendererOrPipes.renderPipes ? rendererOrPipes : rendererOrPipes.batch.renderer;
    const renderPipes = renderer.renderPipes;
    renderPipes.batch.buildStart(instructionSet);
    renderPipes.blendMode.buildStart();
    renderPipes.colorMask.buildStart();
    if (root.sortableChildren) {
      root.sortChildren();
    }
    root.collectRenderablesWithEffects(instructionSet, renderer, null);
    renderPipes.batch.buildEnd(instructionSet);
    renderPipes.blendMode.buildEnd(instructionSet);
  }
}
/** @ignore */
RenderGroupSystem.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLSystem,
    Extensions/* ExtensionType */.Ag.WebGPUSystem,
    Extensions/* ExtensionType */.Ag.CanvasSystem
  ],
  name: "renderGroup"
};


//# sourceMappingURL=RenderGroupSystem.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite/SpritePipe.mjs




"use strict";
class SpritePipe {
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
    const batchableSprite = this._gpuSpriteHash[sprite.uid];
    PoolGroup/* BigPool */.Z.return(batchableSprite);
    this._gpuSpriteHash[sprite.uid] = null;
    sprite.off("destroyed", this._destroyRenderableBound);
  }
  _updateBatchableSprite(sprite, batchableSprite) {
    batchableSprite.bounds = sprite.visualBounds;
    batchableSprite.texture = sprite._texture;
  }
  _getGpuSprite(sprite) {
    return this._gpuSpriteHash[sprite.uid] || this._initGPUSprite(sprite);
  }
  _initGPUSprite(sprite) {
    const batchableSprite = PoolGroup/* BigPool */.Z.get(BatchableSprite/* BatchableSprite */.K);
    batchableSprite.renderable = sprite;
    batchableSprite.transform = sprite.groupTransform;
    batchableSprite.texture = sprite._texture;
    batchableSprite.bounds = sprite.visualBounds;
    batchableSprite.roundPixels = this._renderer._roundPixels | sprite._roundPixels;
    this._gpuSpriteHash[sprite.uid] = batchableSprite;
    sprite.on("destroyed", this._destroyRenderableBound);
    return batchableSprite;
  }
  destroy() {
    for (const i in this._gpuSpriteHash) {
      PoolGroup/* BigPool */.Z.return(this._gpuSpriteHash[i]);
    }
    this._gpuSpriteHash = null;
    this._renderer = null;
  }
}
/** @ignore */
SpritePipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "sprite"
};


//# sourceMappingURL=SpritePipe.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/global/globalHooks.mjs
var globalHooks = __webpack_require__(76454);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/state/State.mjs
var State = __webpack_require__(45572);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/batcher/shared/DefaultBatcher.mjs + 4 modules
var DefaultBatcher = __webpack_require__(48612);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/batcher/shared/BatcherPipe.mjs




"use strict";
const _BatcherPipe = class _BatcherPipe {
  constructor(renderer, adaptor) {
    this.state = State/* State */.U.for2d();
    this._batchersByInstructionSet = /* @__PURE__ */ Object.create(null);
    /** A record of all active batchers, keyed by their names */
    this._activeBatches = /* @__PURE__ */ Object.create(null);
    this.renderer = renderer;
    this._adaptor = adaptor;
    this._adaptor.init?.(this);
  }
  static getBatcher(name) {
    return new this._availableBatchers[name]();
  }
  buildStart(instructionSet) {
    let batchers = this._batchersByInstructionSet[instructionSet.uid];
    if (!batchers) {
      batchers = this._batchersByInstructionSet[instructionSet.uid] = /* @__PURE__ */ Object.create(null);
      batchers.default || (batchers.default = new DefaultBatcher/* DefaultBatcher */.J());
    }
    this._activeBatches = batchers;
    this._activeBatch = this._activeBatches.default;
    for (const i in this._activeBatches) {
      this._activeBatches[i].begin();
    }
  }
  addToBatch(batchableObject, instructionSet) {
    if (this._activeBatch.name !== batchableObject.batcherName) {
      this._activeBatch.break(instructionSet);
      let batch = this._activeBatches[batchableObject.batcherName];
      if (!batch) {
        batch = this._activeBatches[batchableObject.batcherName] = _BatcherPipe.getBatcher(batchableObject.batcherName);
        batch.begin();
      }
      this._activeBatch = batch;
    }
    this._activeBatch.add(batchableObject);
  }
  break(instructionSet) {
    this._activeBatch.break(instructionSet);
  }
  buildEnd(instructionSet) {
    this._activeBatch.break(instructionSet);
    const batches = this._activeBatches;
    for (const i in batches) {
      const batch = batches[i];
      const geometry = batch.geometry;
      geometry.indexBuffer.setDataWithSize(batch.indexBuffer, batch.indexSize, true);
      geometry.buffers[0].setDataWithSize(batch.attributeBuffer.float32View, batch.attributeSize, false);
    }
  }
  upload(instructionSet) {
    const batchers = this._batchersByInstructionSet[instructionSet.uid];
    for (const i in batchers) {
      const batcher = batchers[i];
      const geometry = batcher.geometry;
      if (batcher.dirty) {
        batcher.dirty = false;
        geometry.buffers[0].update(batcher.attributeSize * 4);
      }
    }
  }
  execute(batch) {
    if (batch.action === "startBatch") {
      const batcher = batch.batcher;
      const geometry = batcher.geometry;
      const shader = batcher.shader;
      this._adaptor.start(this, geometry, shader);
    }
    this._adaptor.execute(this, batch);
  }
  destroy() {
    this.state = null;
    this.renderer = null;
    this._adaptor = null;
    for (const i in this._activeBatches) {
      this._activeBatches[i].destroy();
    }
    this._activeBatches = null;
  }
};
/** @ignore */
_BatcherPipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "batch"
};
_BatcherPipe._availableBatchers = /* @__PURE__ */ Object.create(null);
let BatcherPipe = _BatcherPipe;
Extensions/* extensions */.XO.handleByMap(Extensions/* ExtensionType */.Ag.Batcher, BatcherPipe._availableBatchers);
Extensions/* extensions */.XO.add(DefaultBatcher/* DefaultBatcher */.J);


//# sourceMappingURL=BatcherPipe.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/filters/FilterEffect.mjs
var FilterEffect = __webpack_require__(61214);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/gl/shader/GlProgram.mjs + 6 modules
var GlProgram = __webpack_require__(22075);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/gpu/shader/GpuProgram.mjs + 6 modules
var GpuProgram = __webpack_require__(2331);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/shader/UniformGroup.mjs + 2 modules
var UniformGroup = __webpack_require__(7018);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/TextureMatrix.mjs
var TextureMatrix = __webpack_require__(17915);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/filters/Filter.mjs
var Filter = __webpack_require__(65773);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/filters/mask/mask.frag.mjs
var fragment = "in vec2 vMaskCoord;\nin vec2 vTextureCoord;\n\nuniform sampler2D uTexture;\nuniform sampler2D uMaskTexture;\n\nuniform float uAlpha;\nuniform vec4 uMaskClamp;\nuniform float uInverse;\n\nout vec4 finalColor;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(uMaskClamp.x, vMaskCoord.x) +\n        step(uMaskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, uMaskClamp.z) +\n        step(vMaskCoord.y, uMaskClamp.w));\n\n    // TODO look into why this is needed\n    float npmAlpha = uAlpha;\n    vec4 original = texture(uTexture, vTextureCoord);\n    vec4 masky = texture(uMaskTexture, vMaskCoord);\n    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);\n\n    float a = alphaMul * masky.r * npmAlpha * clip;\n\n    if (uInverse == 1.0) {\n        a = 1.0 - a;\n    }\n\n    finalColor = original * a;\n}\n";


//# sourceMappingURL=mask.frag.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/filters/mask/mask.vert.mjs
var vertex = "in vec2 aPosition;\n\nout vec2 vTextureCoord;\nout vec2 vMaskCoord;\n\n\nuniform vec4 uInputSize;\nuniform vec4 uOutputFrame;\nuniform vec4 uOutputTexture;\nuniform mat3 uFilterMatrix;\n\nvec4 filterVertexPosition(  vec2 aPosition )\n{\n    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;\n       \n    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;\n    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;\n\n    return vec4(position, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord(  vec2 aPosition )\n{\n    return aPosition * (uOutputFrame.zw * uInputSize.zw);\n}\n\nvec2 getFilterCoord( vec2 aPosition )\n{\n    return  ( uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;\n}   \n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition(aPosition);\n    vTextureCoord = filterTextureCoord(aPosition);\n    vMaskCoord = getFilterCoord(aPosition);\n}\n";


//# sourceMappingURL=mask.vert.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/filters/mask/mask.wgsl.mjs
var source = "struct GlobalFilterUniforms {\n  uInputSize:vec4<f32>,\n  uInputPixel:vec4<f32>,\n  uInputClamp:vec4<f32>,\n  uOutputFrame:vec4<f32>,\n  uGlobalFrame:vec4<f32>,\n  uOutputTexture:vec4<f32>,\n};\n\nstruct MaskUniforms {\n  uFilterMatrix:mat3x3<f32>,\n  uMaskClamp:vec4<f32>,\n  uAlpha:f32,\n  uInverse:f32,\n};\n\n@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\n@group(0) @binding(1) var uTexture: texture_2d<f32>;\n@group(0) @binding(2) var uSampler : sampler;\n\n@group(1) @binding(0) var<uniform> filterUniforms : MaskUniforms;\n@group(1) @binding(1) var uMaskTexture: texture_2d<f32>;\n\nstruct VSOutput {\n    @builtin(position) position: vec4<f32>,\n    @location(0) uv : vec2<f32>,\n    @location(1) filterUv : vec2<f32>,\n};\n\nfn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>\n{\n    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;\n\n    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;\n    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;\n\n    return vec4(position, 0.0, 1.0);\n}\n\nfn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);\n}\n\nfn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);\n}\n\nfn getFilterCoord(aPosition:vec2<f32> ) -> vec2<f32>\n{\n  return ( filterUniforms.uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;\n}\n\nfn getSize() -> vec2<f32>\n{\n  return gfu.uGlobalFrame.zw;\n}\n\n@vertex\nfn mainVertex(\n  @location(0) aPosition : vec2<f32>,\n) -> VSOutput {\n  return VSOutput(\n   filterVertexPosition(aPosition),\n   filterTextureCoord(aPosition),\n   getFilterCoord(aPosition)\n  );\n}\n\n@fragment\nfn mainFragment(\n  @location(0) uv: vec2<f32>,\n  @location(1) filterUv: vec2<f32>,\n  @builtin(position) position: vec4<f32>\n) -> @location(0) vec4<f32> {\n\n    var maskClamp = filterUniforms.uMaskClamp;\n    var uAlpha = filterUniforms.uAlpha;\n\n    var clip = step(3.5,\n      step(maskClamp.x, filterUv.x) +\n      step(maskClamp.y, filterUv.y) +\n      step(filterUv.x, maskClamp.z) +\n      step(filterUv.y, maskClamp.w));\n\n    var mask = textureSample(uMaskTexture, uSampler, filterUv);\n    var source = textureSample(uTexture, uSampler, uv);\n    var alphaMul = 1.0 - uAlpha * (1.0 - mask.a);\n\n    var a: f32 = alphaMul * mask.r * uAlpha * clip;\n\n    if (filterUniforms.uInverse == 1.0) {\n        a = 1.0 - a;\n    }\n\n    return source * a;\n}\n";


//# sourceMappingURL=mask.wgsl.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/filters/mask/MaskFilter.mjs










"use strict";
class MaskFilter extends Filter/* Filter */.d {
  constructor(options) {
    const { sprite, ...rest } = options;
    const textureMatrix = new TextureMatrix/* TextureMatrix */.N(sprite.texture);
    const filterUniforms = new UniformGroup/* UniformGroup */.k({
      uFilterMatrix: { value: new Matrix/* Matrix */.u(), type: "mat3x3<f32>" },
      uMaskClamp: { value: textureMatrix.uClampFrame, type: "vec4<f32>" },
      uAlpha: { value: 1, type: "f32" },
      uInverse: { value: options.inverse ? 1 : 0, type: "f32" }
    });
    const gpuProgram = GpuProgram/* GpuProgram */.B.from({
      vertex: {
        source: source,
        entryPoint: "mainVertex"
      },
      fragment: {
        source: source,
        entryPoint: "mainFragment"
      }
    });
    const glProgram = GlProgram/* GlProgram */.M.from({
      vertex: vertex,
      fragment: fragment,
      name: "mask-filter"
    });
    super({
      ...rest,
      gpuProgram,
      glProgram,
      resources: {
        filterUniforms,
        uMaskTexture: sprite.texture.source
      }
    });
    this.sprite = sprite;
    this._textureMatrix = textureMatrix;
  }
  set inverse(value) {
    this.resources.filterUniforms.uniforms.uInverse = value ? 1 : 0;
  }
  get inverse() {
    return this.resources.filterUniforms.uniforms.uInverse === 1;
  }
  apply(filterManager, input, output, clearMode) {
    this._textureMatrix.texture = this.sprite.texture;
    filterManager.calculateSpriteMatrix(
      this.resources.filterUniforms.uniforms.uFilterMatrix,
      this.sprite
    ).prepend(this._textureMatrix.mapCoord);
    this.resources.uMaskTexture = this.sprite.texture.source;
    filterManager.applyFilter(this, input, output, clearMode);
  }
}


//# sourceMappingURL=MaskFilter.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/container/bounds/getGlobalBounds.mjs
var getGlobalBounds = __webpack_require__(976);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/sprite/Sprite.mjs
var Sprite = __webpack_require__(90721);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.mjs + 2 modules
var Texture = __webpack_require__(80443);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/types.mjs
var types = __webpack_require__(61558);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/mask/alpha/AlphaMaskPipe.mjs











"use strict";
const tempBounds = new Bounds/* Bounds */.c();
class AlphaMaskEffect extends FilterEffect/* FilterEffect */.a {
  constructor() {
    super();
    this.filters = [new MaskFilter({
      sprite: new Sprite/* Sprite */.k(Texture/* Texture */.g.EMPTY),
      inverse: false,
      resolution: "inherit",
      antialias: "inherit"
    })];
  }
  get sprite() {
    return this.filters[0].sprite;
  }
  set sprite(value) {
    this.filters[0].sprite = value;
  }
  get inverse() {
    return this.filters[0].inverse;
  }
  set inverse(value) {
    this.filters[0].inverse = value;
  }
}
class AlphaMaskPipe {
  constructor(renderer) {
    this._activeMaskStage = [];
    this._renderer = renderer;
  }
  push(mask, maskedContainer, instructionSet) {
    const renderer = this._renderer;
    renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add({
      renderPipeId: "alphaMask",
      action: "pushMaskBegin",
      mask,
      inverse: maskedContainer._maskOptions.inverse,
      canBundle: false,
      maskedContainer
    });
    mask.inverse = maskedContainer._maskOptions.inverse;
    if (mask.renderMaskToTexture) {
      const maskContainer = mask.mask;
      maskContainer.includeInBuild = true;
      maskContainer.collectRenderables(
        instructionSet,
        renderer,
        null
      );
      maskContainer.includeInBuild = false;
    }
    renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add({
      renderPipeId: "alphaMask",
      action: "pushMaskEnd",
      mask,
      maskedContainer,
      inverse: maskedContainer._maskOptions.inverse,
      canBundle: false
    });
  }
  pop(mask, _maskedContainer, instructionSet) {
    const renderer = this._renderer;
    renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add({
      renderPipeId: "alphaMask",
      action: "popMaskEnd",
      mask,
      inverse: _maskedContainer._maskOptions.inverse,
      canBundle: false
    });
  }
  execute(instruction) {
    const renderer = this._renderer;
    const renderMask = instruction.mask.renderMaskToTexture;
    if (instruction.action === "pushMaskBegin") {
      const filterEffect = PoolGroup/* BigPool */.Z.get(AlphaMaskEffect);
      filterEffect.inverse = instruction.inverse;
      if (renderMask) {
        instruction.mask.mask.measurable = true;
        const bounds = (0,getGlobalBounds/* getGlobalBounds */.fB)(instruction.mask.mask, true, tempBounds);
        instruction.mask.mask.measurable = false;
        bounds.ceil();
        const colorTextureSource = renderer.renderTarget.renderTarget.colorTexture.source;
        const filterTexture = TexturePool/* TexturePool */.W.getOptimalTexture(
          bounds.width,
          bounds.height,
          colorTextureSource._resolution,
          colorTextureSource.antialias
        );
        renderer.renderTarget.push(filterTexture, true);
        renderer.globalUniforms.push({
          offset: bounds,
          worldColor: 4294967295
        });
        const sprite = filterEffect.sprite;
        sprite.texture = filterTexture;
        sprite.worldTransform.tx = bounds.minX;
        sprite.worldTransform.ty = bounds.minY;
        this._activeMaskStage.push({
          filterEffect,
          maskedContainer: instruction.maskedContainer,
          filterTexture
        });
      } else {
        filterEffect.sprite = instruction.mask.mask;
        this._activeMaskStage.push({
          filterEffect,
          maskedContainer: instruction.maskedContainer
        });
      }
    } else if (instruction.action === "pushMaskEnd") {
      const maskData = this._activeMaskStage[this._activeMaskStage.length - 1];
      if (renderMask) {
        if (renderer.type === types/* RendererType */.W.WEBGL) {
          renderer.renderTarget.finishRenderPass();
        }
        renderer.renderTarget.pop();
        renderer.globalUniforms.pop();
      }
      renderer.filter.push({
        renderPipeId: "filter",
        action: "pushFilter",
        container: maskData.maskedContainer,
        filterEffect: maskData.filterEffect,
        canBundle: false
      });
    } else if (instruction.action === "popMaskEnd") {
      renderer.filter.pop();
      const maskData = this._activeMaskStage.pop();
      if (renderMask) {
        TexturePool/* TexturePool */.W.returnTexture(maskData.filterTexture);
      }
      PoolGroup/* BigPool */.Z.return(maskData.filterEffect);
    }
  }
  destroy() {
    this._renderer = null;
    this._activeMaskStage = null;
  }
}
/** @ignore */
AlphaMaskPipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "alphaMask"
};


//# sourceMappingURL=AlphaMaskPipe.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/mask/color/ColorMaskPipe.mjs


"use strict";
class ColorMaskPipe {
  constructor(renderer) {
    this._colorStack = [];
    this._colorStackIndex = 0;
    this._currentColor = 0;
    this._renderer = renderer;
  }
  buildStart() {
    this._colorStack[0] = 15;
    this._colorStackIndex = 1;
    this._currentColor = 15;
  }
  push(mask, _container, instructionSet) {
    const renderer = this._renderer;
    renderer.renderPipes.batch.break(instructionSet);
    const colorStack = this._colorStack;
    colorStack[this._colorStackIndex] = colorStack[this._colorStackIndex - 1] & mask.mask;
    const currentColor = this._colorStack[this._colorStackIndex];
    if (currentColor !== this._currentColor) {
      this._currentColor = currentColor;
      instructionSet.add({
        renderPipeId: "colorMask",
        colorMask: currentColor,
        canBundle: false
      });
    }
    this._colorStackIndex++;
  }
  pop(_mask, _container, instructionSet) {
    const renderer = this._renderer;
    renderer.renderPipes.batch.break(instructionSet);
    const colorStack = this._colorStack;
    this._colorStackIndex--;
    const currentColor = colorStack[this._colorStackIndex - 1];
    if (currentColor !== this._currentColor) {
      this._currentColor = currentColor;
      instructionSet.add({
        renderPipeId: "colorMask",
        colorMask: currentColor,
        canBundle: false
      });
    }
  }
  execute(instruction) {
    const renderer = this._renderer;
    renderer.colorMask.setMask(instruction.colorMask);
  }
  destroy() {
    this._colorStack = null;
  }
}
/** @ignore */
ColorMaskPipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "colorMask"
};


//# sourceMappingURL=ColorMaskPipe.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/gl/const.mjs
var gl_const = __webpack_require__(57970);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/state/const.mjs
var state_const = __webpack_require__(99986);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/mask/stencil/StencilMaskPipe.mjs




"use strict";
class StencilMaskPipe {
  constructor(renderer) {
    // used when building and also when executing..
    this._maskStackHash = {};
    this._maskHash = /* @__PURE__ */ new WeakMap();
    this._renderer = renderer;
  }
  push(mask, _container, instructionSet) {
    var _a;
    const effect = mask;
    const renderer = this._renderer;
    renderer.renderPipes.batch.break(instructionSet);
    renderer.renderPipes.blendMode.setBlendMode(effect.mask, "none", instructionSet);
    instructionSet.add({
      renderPipeId: "stencilMask",
      action: "pushMaskBegin",
      mask,
      inverse: _container._maskOptions.inverse,
      canBundle: false
    });
    const maskContainer = effect.mask;
    maskContainer.includeInBuild = true;
    if (!this._maskHash.has(effect)) {
      this._maskHash.set(effect, {
        instructionsStart: 0,
        instructionsLength: 0
      });
    }
    const maskData = this._maskHash.get(effect);
    maskData.instructionsStart = instructionSet.instructionSize;
    maskContainer.collectRenderables(
      instructionSet,
      renderer,
      null
    );
    maskContainer.includeInBuild = false;
    renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add({
      renderPipeId: "stencilMask",
      action: "pushMaskEnd",
      mask,
      inverse: _container._maskOptions.inverse,
      canBundle: false
    });
    const instructionsLength = instructionSet.instructionSize - maskData.instructionsStart - 1;
    maskData.instructionsLength = instructionsLength;
    const renderTargetUid = renderer.renderTarget.renderTarget.uid;
    (_a = this._maskStackHash)[renderTargetUid] ?? (_a[renderTargetUid] = 0);
  }
  pop(mask, _container, instructionSet) {
    const effect = mask;
    const renderer = this._renderer;
    renderer.renderPipes.batch.break(instructionSet);
    renderer.renderPipes.blendMode.setBlendMode(effect.mask, "none", instructionSet);
    instructionSet.add({
      renderPipeId: "stencilMask",
      action: "popMaskBegin",
      inverse: _container._maskOptions.inverse,
      canBundle: false
    });
    const maskData = this._maskHash.get(mask);
    for (let i = 0; i < maskData.instructionsLength; i++) {
      instructionSet.instructions[instructionSet.instructionSize++] = instructionSet.instructions[maskData.instructionsStart++];
    }
    instructionSet.add({
      renderPipeId: "stencilMask",
      action: "popMaskEnd",
      canBundle: false
    });
  }
  execute(instruction) {
    var _a;
    const renderer = this._renderer;
    const renderTargetUid = renderer.renderTarget.renderTarget.uid;
    let maskStackIndex = (_a = this._maskStackHash)[renderTargetUid] ?? (_a[renderTargetUid] = 0);
    if (instruction.action === "pushMaskBegin") {
      renderer.renderTarget.ensureDepthStencil();
      renderer.stencil.setStencilMode(state_const/* STENCIL_MODES */.K.RENDERING_MASK_ADD, maskStackIndex);
      maskStackIndex++;
      renderer.colorMask.setMask(0);
    } else if (instruction.action === "pushMaskEnd") {
      if (instruction.inverse) {
        renderer.stencil.setStencilMode(state_const/* STENCIL_MODES */.K.INVERSE_MASK_ACTIVE, maskStackIndex);
      } else {
        renderer.stencil.setStencilMode(state_const/* STENCIL_MODES */.K.MASK_ACTIVE, maskStackIndex);
      }
      renderer.colorMask.setMask(15);
    } else if (instruction.action === "popMaskBegin") {
      renderer.colorMask.setMask(0);
      if (maskStackIndex !== 0) {
        renderer.stencil.setStencilMode(state_const/* STENCIL_MODES */.K.RENDERING_MASK_REMOVE, maskStackIndex);
      } else {
        renderer.renderTarget.clear(null, gl_const/* CLEAR */.u.STENCIL);
        renderer.stencil.setStencilMode(state_const/* STENCIL_MODES */.K.DISABLED, maskStackIndex);
      }
      maskStackIndex--;
    } else if (instruction.action === "popMaskEnd") {
      if (instruction.inverse) {
        renderer.stencil.setStencilMode(state_const/* STENCIL_MODES */.K.INVERSE_MASK_ACTIVE, maskStackIndex);
      } else {
        renderer.stencil.setStencilMode(state_const/* STENCIL_MODES */.K.MASK_ACTIVE, maskStackIndex);
      }
      renderer.colorMask.setMask(15);
    }
    this._maskStackHash[renderTargetUid] = maskStackIndex;
  }
  destroy() {
    this._renderer = null;
    this._maskStackHash = null;
    this._maskHash = null;
  }
}
StencilMaskPipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "stencilMask"
};


//# sourceMappingURL=StencilMaskPipe.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/color/Color.mjs + 2 modules
var Color = __webpack_require__(86363);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/background/BackgroundSystem.mjs



"use strict";
const _BackgroundSystem = class _BackgroundSystem {
  constructor() {
    this.clearBeforeRender = true;
    this._backgroundColor = new Color/* Color */.Q(0);
    this.color = this._backgroundColor;
    this.alpha = 1;
  }
  /**
   * initiates the background system
   * @param options - the options for the background colors
   */
  init(options) {
    options = { ..._BackgroundSystem.defaultOptions, ...options };
    this.clearBeforeRender = options.clearBeforeRender;
    this.color = options.background || options.backgroundColor || this._backgroundColor;
    this.alpha = options.backgroundAlpha;
    this._backgroundColor.setAlpha(options.backgroundAlpha);
  }
  /** The background color to fill if not transparent */
  get color() {
    return this._backgroundColor;
  }
  set color(value) {
    this._backgroundColor.setValue(value);
  }
  /** The background color alpha. Setting this to 0 will make the canvas transparent. */
  get alpha() {
    return this._backgroundColor.alpha;
  }
  set alpha(value) {
    this._backgroundColor.setAlpha(value);
  }
  /** The background color as an [R, G, B, A] array. */
  get colorRgba() {
    return this._backgroundColor.toArray();
  }
  /**
   * destroys the background system
   * @internal
   * @ignore
   */
  destroy() {
  }
};
/** @ignore */
_BackgroundSystem.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLSystem,
    Extensions/* ExtensionType */.Ag.WebGPUSystem,
    Extensions/* ExtensionType */.Ag.CanvasSystem
  ],
  name: "background",
  priority: 0
};
/** default options used by the system */
_BackgroundSystem.defaultOptions = {
  /**
   * {@link WebGLOptions.backgroundAlpha}
   * @default 1
   */
  backgroundAlpha: 1,
  /**
   * {@link WebGLOptions.backgroundColor}
   * @default 0x000000
   */
  backgroundColor: 0,
  /**
   * {@link WebGLOptions.clearBeforeRender}
   * @default true
   */
  clearBeforeRender: true
};
let BackgroundSystem = _BackgroundSystem;


//# sourceMappingURL=BackgroundSystem.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/logging/warn.mjs
var warn = __webpack_require__(55707);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/blendModes/BlendModePipe.mjs




"use strict";
const BLEND_MODE_FILTERS = {};
Extensions/* extensions */.XO.handle(Extensions/* ExtensionType */.Ag.BlendMode, (value) => {
  if (!value.name) {
    throw new Error("BlendMode extension must have a name property");
  }
  BLEND_MODE_FILTERS[value.name] = value.ref;
}, (value) => {
  delete BLEND_MODE_FILTERS[value.name];
});
class BlendModePipe {
  constructor(renderer) {
    this._isAdvanced = false;
    this._filterHash = /* @__PURE__ */ Object.create(null);
    this._renderer = renderer;
    this._renderer.runners.prerender.add(this);
  }
  prerender() {
    this._activeBlendMode = "normal";
    this._isAdvanced = false;
  }
  /**
   * This ensures that a blendMode switch is added to the instruction set if the blend mode has changed.
   * @param renderable - The renderable we are adding to the instruction set
   * @param blendMode - The blend mode of the renderable
   * @param instructionSet - The instruction set we are adding to
   */
  setBlendMode(renderable, blendMode, instructionSet) {
    if (this._activeBlendMode === blendMode) {
      if (this._isAdvanced)
        this._renderableList.push(renderable);
      return;
    }
    this._activeBlendMode = blendMode;
    if (this._isAdvanced) {
      this._endAdvancedBlendMode(instructionSet);
    }
    this._isAdvanced = !!BLEND_MODE_FILTERS[blendMode];
    if (this._isAdvanced) {
      this._beginAdvancedBlendMode(instructionSet);
      this._renderableList.push(renderable);
    }
  }
  _beginAdvancedBlendMode(instructionSet) {
    this._renderer.renderPipes.batch.break(instructionSet);
    const blendMode = this._activeBlendMode;
    if (!BLEND_MODE_FILTERS[blendMode]) {
      (0,warn/* warn */.R)(`Unable to assign BlendMode: '${blendMode}'. You may want to include: import 'pixi.js/advanced-blend-modes'`);
      return;
    }
    let filterEffect = this._filterHash[blendMode];
    if (!filterEffect) {
      filterEffect = this._filterHash[blendMode] = new FilterEffect/* FilterEffect */.a();
      filterEffect.filters = [new BLEND_MODE_FILTERS[blendMode]()];
    }
    const instruction = {
      renderPipeId: "filter",
      action: "pushFilter",
      renderables: [],
      filterEffect,
      canBundle: false
    };
    this._renderableList = instruction.renderables;
    instructionSet.add(instruction);
  }
  _endAdvancedBlendMode(instructionSet) {
    this._renderableList = null;
    this._renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add({
      renderPipeId: "filter",
      action: "popFilter",
      canBundle: false
    });
  }
  /**
   * called when the instruction build process is starting this will reset internally to the default blend mode
   * @internal
   * @ignore
   */
  buildStart() {
    this._isAdvanced = false;
  }
  /**
   * called when the instruction build process is finished, ensuring that if there is an advanced blend mode
   * active, we add the final render instructions added to the instruction set
   * @param instructionSet - The instruction set we are adding to
   * @internal
   * @ignore
   */
  buildEnd(instructionSet) {
    if (this._isAdvanced) {
      this._endAdvancedBlendMode(instructionSet);
    }
  }
  /**
   * @internal
   * @ignore
   */
  destroy() {
    this._renderer = null;
    this._renderableList = null;
    for (const i in this._filterHash) {
      this._filterHash[i].destroy();
    }
    this._filterHash = null;
  }
}
/** @ignore */
BlendModePipe.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLPipes,
    Extensions/* ExtensionType */.Ag.WebGPUPipes,
    Extensions/* ExtensionType */.Ag.CanvasPipes
  ],
  name: "blendMode"
};


//# sourceMappingURL=BlendModePipe.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/extract/ExtractSystem.mjs




"use strict";
const imageTypes = {
  png: "image/png",
  jpg: "image/jpeg",
  webp: "image/webp"
};
const _ExtractSystem = class _ExtractSystem {
  /** @param renderer - The renderer this System works for. */
  constructor(renderer) {
    this._renderer = renderer;
  }
  _normalizeOptions(options, defaults = {}) {
    if (options instanceof Container/* Container */.mc || options instanceof Texture/* Texture */.g) {
      return {
        target: options,
        ...defaults
      };
    }
    return {
      ...defaults,
      ...options
    };
  }
  /**
   * Will return a HTML Image of the target
   * @param options - The options for creating the image, or the target to extract
   * @returns - HTML Image of the target
   */
  async image(options) {
    const image = new Image();
    image.src = await this.base64(options);
    return image;
  }
  /**
   * Will return a base64 encoded string of this target. It works by calling
   * `Extract.canvas` and then running toDataURL on that.
   * @param options - The options for creating the image, or the target to extract
   */
  async base64(options) {
    options = this._normalizeOptions(
      options,
      _ExtractSystem.defaultImageOptions
    );
    const { format, quality } = options;
    const canvas = this.canvas(options);
    if (canvas.toBlob !== void 0) {
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("ICanvas.toBlob failed!"));
            return;
          }
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }, imageTypes[format], quality);
      });
    }
    if (canvas.toDataURL !== void 0) {
      return canvas.toDataURL(imageTypes[format], quality);
    }
    if (canvas.convertToBlob !== void 0) {
      const blob = await canvas.convertToBlob({ type: imageTypes[format], quality });
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }
    throw new Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented");
  }
  /**
   * Creates a Canvas element, renders this target to it and then returns it.
   * @param options - The options for creating the canvas, or the target to extract
   * @returns - A Canvas element with the texture rendered on.
   */
  canvas(options) {
    options = this._normalizeOptions(options);
    const target = options.target;
    const renderer = this._renderer;
    if (target instanceof Texture/* Texture */.g) {
      return renderer.texture.generateCanvas(target);
    }
    const texture = renderer.textureGenerator.generateTexture(options);
    const canvas = renderer.texture.generateCanvas(texture);
    texture.destroy(true);
    return canvas;
  }
  /**
   * Will return a one-dimensional array containing the pixel data of the entire texture in RGBA
   * order, with integer values between 0 and 255 (included).
   * @param options - The options for extracting the image, or the target to extract
   * @returns - One-dimensional array containing the pixel data of the entire texture
   */
  pixels(options) {
    options = this._normalizeOptions(options);
    const target = options.target;
    const renderer = this._renderer;
    const texture = target instanceof Texture/* Texture */.g ? target : renderer.textureGenerator.generateTexture(options);
    const pixelInfo = renderer.texture.getPixels(texture);
    if (target instanceof Container/* Container */.mc) {
      texture.destroy(true);
    }
    return pixelInfo;
  }
  /**
   * Will return a texture of the target
   * @param options - The options for creating the texture, or the target to extract
   * @returns - A texture of the target
   */
  texture(options) {
    options = this._normalizeOptions(options);
    if (options.target instanceof Texture/* Texture */.g)
      return options.target;
    return this._renderer.textureGenerator.generateTexture(options);
  }
  /**
   * Will extract a HTMLImage of the target and download it
   * @param options - The options for downloading and extracting the image, or the target to extract
   */
  download(options) {
    options = this._normalizeOptions(options);
    const canvas = this.canvas(options);
    const link = document.createElement("a");
    link.download = options.filename ?? "image.png";
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  /**
   * Logs the target to the console as an image. This is a useful way to debug what's happening in the renderer.
   * @param options - The options for logging the image, or the target to log
   */
  log(options) {
    const width = options.width ?? 200;
    options = this._normalizeOptions(options);
    const canvas = this.canvas(options);
    const base64 = canvas.toDataURL();
    console.log(`[Pixi Texture] ${canvas.width}px ${canvas.height}px`);
    const style = [
      "font-size: 1px;",
      `padding: ${width}px ${300}px;`,
      `background: url(${base64}) no-repeat;`,
      "background-size: contain;"
    ].join(" ");
    console.log("%c ", style);
  }
  destroy() {
    this._renderer = null;
  }
};
/** @ignore */
_ExtractSystem.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLSystem,
    Extensions/* ExtensionType */.Ag.WebGPUSystem
  ],
  name: "extract"
};
/** Default options for creating an image. */
_ExtractSystem.defaultImageOptions = {
  /** The format of the image. */
  format: "png",
  /** The quality of the image. */
  quality: 1
};
let ExtractSystem = _ExtractSystem;


//# sourceMappingURL=ExtractSystem.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/maths/shapes/Rectangle.mjs
var Rectangle = __webpack_require__(75639);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/container/bounds/getLocalBounds.mjs
var getLocalBounds = __webpack_require__(64972);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/TextureSource.mjs
var TextureSource = __webpack_require__(20068);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/RenderTexture.mjs



"use strict";
class RenderTexture extends Texture/* Texture */.g {
  static create(options) {
    return new RenderTexture({
      source: new TextureSource/* TextureSource */.v(options)
    });
  }
  /**
   * Resizes the render texture.
   * @param width - The new width of the render texture.
   * @param height - The new height of the render texture.
   * @param resolution - The new resolution of the render texture.
   * @returns This texture.
   */
  resize(width, height, resolution) {
    this.source.resize(width, height, resolution);
    return this;
  }
}


//# sourceMappingURL=RenderTexture.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/extract/GenerateTextureSystem.mjs









"use strict";
const tempRect = new Rectangle/* Rectangle */.M();
const GenerateTextureSystem_tempBounds = new Bounds/* Bounds */.c();
const noColor = [0, 0, 0, 0];
class GenerateTextureSystem {
  constructor(renderer) {
    this._renderer = renderer;
  }
  /**
   * A Useful function that returns a texture of the display object that can then be used to create sprites
   * This can be quite useful if your container is complicated and needs to be reused multiple times.
   * @param {GenerateTextureOptions | Container} options - Generate texture options.
   * @param {Container} [options.container] - If not given, the renderer's resolution is used.
   * @param {Rectangle} options.region - The region of the container, that shall be rendered,
   * @param {number} [options.resolution] - The resolution of the texture being generated.
   *        if no region is specified, defaults to the local bounds of the container.
   * @param {GenerateTextureSourceOptions} [options.textureSourceOptions] - Texture options for GPU.
   * @returns a shiny new texture of the container passed in
   */
  generateTexture(options) {
    if (options instanceof Container/* Container */.mc) {
      options = {
        target: options,
        frame: void 0,
        textureSourceOptions: {},
        resolution: void 0
      };
    }
    const resolution = options.resolution || this._renderer.resolution;
    const antialias = options.antialias || this._renderer.view.antialias;
    const container = options.target;
    let clearColor = options.clearColor;
    if (clearColor) {
      const isRGBAArray = Array.isArray(clearColor) && clearColor.length === 4;
      clearColor = isRGBAArray ? clearColor : Color/* Color */.Q.shared.setValue(clearColor).toArray();
    } else {
      clearColor = noColor;
    }
    const region = options.frame?.copyTo(tempRect) || (0,getLocalBounds/* getLocalBounds */.n)(container, GenerateTextureSystem_tempBounds).rectangle;
    region.width = Math.max(region.width, 1 / resolution) | 0;
    region.height = Math.max(region.height, 1 / resolution) | 0;
    const target = RenderTexture.create({
      ...options.textureSourceOptions,
      width: region.width,
      height: region.height,
      resolution,
      antialias
    });
    const transform = Matrix/* Matrix */.u.shared.translate(-region.x, -region.y);
    this._renderer.render({
      container,
      transform,
      target,
      clearColor
    });
    target.source.updateMipmaps();
    return target;
  }
  destroy() {
    this._renderer = null;
  }
}
/** @ignore */
GenerateTextureSystem.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLSystem,
    Extensions/* ExtensionType */.Ag.WebGPUSystem
  ],
  name: "textureGenerator"
};


//# sourceMappingURL=GenerateTextureSystem.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/maths/point/Point.mjs
var Point = __webpack_require__(17484);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/scene/graphics/gpu/colorToUniform.mjs
var colorToUniform = __webpack_require__(17941);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/gpu/shader/BindGroup.mjs
var BindGroup = __webpack_require__(9562);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/renderTarget/GlobalUniformSystem.mjs








"use strict";
class GlobalUniformSystem {
  constructor(renderer) {
    this._stackIndex = 0;
    this._globalUniformDataStack = [];
    this._uniformsPool = [];
    this._activeUniforms = [];
    this._bindGroupPool = [];
    this._activeBindGroups = [];
    this._renderer = renderer;
  }
  reset() {
    this._stackIndex = 0;
    for (let i = 0; i < this._activeUniforms.length; i++) {
      this._uniformsPool.push(this._activeUniforms[i]);
    }
    for (let i = 0; i < this._activeBindGroups.length; i++) {
      this._bindGroupPool.push(this._activeBindGroups[i]);
    }
    this._activeUniforms.length = 0;
    this._activeBindGroups.length = 0;
  }
  start(options) {
    this.reset();
    this.push(options);
  }
  bind({
    size,
    projectionMatrix,
    worldTransformMatrix,
    worldColor,
    offset
  }) {
    const renderTarget = this._renderer.renderTarget.renderTarget;
    const currentGlobalUniformData = this._stackIndex ? this._globalUniformDataStack[this._stackIndex - 1] : {
      projectionData: renderTarget,
      worldTransformMatrix: new Matrix/* Matrix */.u(),
      worldColor: 4294967295,
      offset: new Point/* Point */.b()
    };
    const globalUniformData = {
      projectionMatrix: projectionMatrix || this._renderer.renderTarget.projectionMatrix,
      resolution: size || renderTarget.size,
      worldTransformMatrix: worldTransformMatrix || currentGlobalUniformData.worldTransformMatrix,
      worldColor: worldColor || currentGlobalUniformData.worldColor,
      offset: offset || currentGlobalUniformData.offset,
      bindGroup: null
    };
    const uniformGroup = this._uniformsPool.pop() || this._createUniforms();
    this._activeUniforms.push(uniformGroup);
    const uniforms = uniformGroup.uniforms;
    uniforms.uProjectionMatrix = globalUniformData.projectionMatrix;
    uniforms.uResolution = globalUniformData.resolution;
    uniforms.uWorldTransformMatrix.copyFrom(globalUniformData.worldTransformMatrix);
    uniforms.uWorldTransformMatrix.tx -= globalUniformData.offset.x;
    uniforms.uWorldTransformMatrix.ty -= globalUniformData.offset.y;
    (0,colorToUniform/* color32BitToUniform */.V)(
      globalUniformData.worldColor,
      uniforms.uWorldColorAlpha,
      0
    );
    uniformGroup.update();
    let bindGroup;
    if (this._renderer.renderPipes.uniformBatch) {
      bindGroup = this._renderer.renderPipes.uniformBatch.getUniformBindGroup(uniformGroup, false);
    } else {
      bindGroup = this._bindGroupPool.pop() || new BindGroup/* BindGroup */.T();
      this._activeBindGroups.push(bindGroup);
      bindGroup.setResource(uniformGroup, 0);
    }
    globalUniformData.bindGroup = bindGroup;
    this._currentGlobalUniformData = globalUniformData;
  }
  push(options) {
    this.bind(options);
    this._globalUniformDataStack[this._stackIndex++] = this._currentGlobalUniformData;
  }
  pop() {
    this._currentGlobalUniformData = this._globalUniformDataStack[--this._stackIndex - 1];
    if (this._renderer.type === types/* RendererType */.W.WEBGL) {
      this._currentGlobalUniformData.bindGroup.resources[0].update();
    }
  }
  get bindGroup() {
    return this._currentGlobalUniformData.bindGroup;
  }
  get globalUniformData() {
    return this._currentGlobalUniformData;
  }
  get uniformGroup() {
    return this._currentGlobalUniformData.bindGroup.resources[0];
  }
  _createUniforms() {
    const globalUniforms = new UniformGroup/* UniformGroup */.k({
      uProjectionMatrix: { value: new Matrix/* Matrix */.u(), type: "mat3x3<f32>" },
      uWorldTransformMatrix: { value: new Matrix/* Matrix */.u(), type: "mat3x3<f32>" },
      // TODO - someone smart - set this to be a unorm8x4 rather than a vec4<f32>
      uWorldColorAlpha: { value: new Float32Array(4), type: "vec4<f32>" },
      uResolution: { value: [0, 0], type: "vec2<f32>" }
    }, {
      isStatic: true
    });
    return globalUniforms;
  }
  destroy() {
    this._renderer = null;
  }
}
/** @ignore */
GlobalUniformSystem.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLSystem,
    Extensions/* ExtensionType */.Ag.WebGPUSystem,
    Extensions/* ExtensionType */.Ag.CanvasSystem
  ],
  name: "globalUniforms"
};


//# sourceMappingURL=GlobalUniformSystem.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/ticker/Ticker.mjs + 1 modules
var Ticker = __webpack_require__(37051);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/SchedulerSystem.mjs



"use strict";
let uid = 1;
class SchedulerSystem {
  constructor() {
    this._tasks = [];
    /** a small off set to apply to the repeat schedules. This is just to make sure they run at slightly different times */
    this._offset = 0;
  }
  /** Initializes the scheduler system and starts the ticker. */
  init() {
    Ticker/* Ticker */.R.system.add(this._update, this);
  }
  /**
   * Schedules a repeating task.
   * @param func - The function to execute.
   * @param duration - The interval duration in milliseconds.
   * @param useOffset - this will spread out tasks so that they do not all run at the same time
   * @returns The unique identifier for the scheduled task.
   */
  repeat(func, duration, useOffset = true) {
    const id = uid++;
    let offset = 0;
    if (useOffset) {
      this._offset += 1e3;
      offset = this._offset;
    }
    this._tasks.push({
      func,
      duration,
      start: performance.now(),
      offset,
      last: performance.now(),
      repeat: true,
      id
    });
    return id;
  }
  /**
   * Cancels a scheduled task.
   * @param id - The unique identifier of the task to cancel.
   */
  cancel(id) {
    for (let i = 0; i < this._tasks.length; i++) {
      if (this._tasks[i].id === id) {
        this._tasks.splice(i, 1);
        return;
      }
    }
  }
  /**
   * Updates and executes the scheduled tasks.
   * @private
   */
  _update() {
    const now = performance.now();
    for (let i = 0; i < this._tasks.length; i++) {
      const task = this._tasks[i];
      if (now - task.offset - task.last >= task.duration) {
        const elapsed = now - task.start;
        task.func(elapsed);
        task.last = now;
      }
    }
  }
  /**
   * Destroys the scheduler system and removes all tasks.
   * @internal
   * @ignore
   */
  destroy() {
    Ticker/* Ticker */.R.system.remove(this._update, this);
    this._tasks.length = 0;
  }
}
/** @ignore */
SchedulerSystem.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLSystem,
    Extensions/* ExtensionType */.Ag.WebGPUSystem,
    Extensions/* ExtensionType */.Ag.CanvasSystem
  ],
  name: "scheduler",
  priority: 0
};


//# sourceMappingURL=SchedulerSystem.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/environment/adapter.mjs + 1 modules
var adapter = __webpack_require__(91536);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/const.mjs
var utils_const = __webpack_require__(7750);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/sayHello.mjs



"use strict";
let saidHello = false;
function sayHello(type) {
  if (saidHello) {
    return;
  }
  if (adapter/* DOMAdapter */.e.get().getNavigator().userAgent.toLowerCase().indexOf("chrome") > -1) {
    const args = [
      `%c  %c  %c  %c  %c PixiJS %c v${utils_const/* VERSION */.xv} (${type}) http://www.pixijs.com/

`,
      "background: #E72264; padding:5px 0;",
      "background: #6CA2EA; padding:5px 0;",
      "background: #B5D33D; padding:5px 0;",
      "background: #FED23F; padding:5px 0;",
      "color: #FFFFFF; background: #E72264; padding:5px 0;",
      "color: #E72264; background: #FFFFFF; padding:5px 0;"
    ];
    globalThis.console.log(...args);
  } else if (globalThis.console) {
    globalThis.console.log(`PixiJS ${utils_const/* VERSION */.xv} - ${type} - http://www.pixijs.com/`);
  }
  saidHello = true;
}


//# sourceMappingURL=sayHello.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/startup/HelloSystem.mjs




"use strict";
class HelloSystem {
  constructor(renderer) {
    this._renderer = renderer;
  }
  /**
   * It all starts here! This initiates every system, passing in the options for any system by name.
   * @param options - the config for the renderer and all its systems
   */
  init(options) {
    if (options.hello) {
      let name = this._renderer.name;
      if (this._renderer.type === types/* RendererType */.W.WEBGL) {
        name += ` ${this._renderer.context.webGLVersion}`;
      }
      sayHello(name);
    }
  }
}
/** @ignore */
HelloSystem.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLSystem,
    Extensions/* ExtensionType */.Ag.WebGPUSystem,
    Extensions/* ExtensionType */.Ag.CanvasSystem
  ],
  name: "hello",
  priority: -2
};
/** The default options for the system. */
HelloSystem.defaultOptions = {
  /** {@link WebGLOptions.hello} */
  hello: false
};


//# sourceMappingURL=HelloSystem.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/data/clean.mjs

function cleanHash(hash) {
  let clean = false;
  for (const i in hash) {
    if (hash[i] == void 0) {
      clean = true;
      break;
    }
  }
  if (!clean)
    return hash;
  const cleanHash2 = /* @__PURE__ */ Object.create(null);
  for (const i in hash) {
    const value = hash[i];
    if (value) {
      cleanHash2[i] = value;
    }
  }
  return cleanHash2;
}
function cleanArray(arr) {
  let offset = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == void 0) {
      offset++;
    } else {
      arr[i - offset] = arr[i];
    }
  }
  arr.length -= offset;
  return arr;
}


//# sourceMappingURL=clean.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/RenderableGCSystem.mjs



"use strict";
let renderableGCTick = 0;
const _RenderableGCSystem = class _RenderableGCSystem {
  /**
   * Creates a new RenderableGCSystem instance.
   * @param renderer - The renderer this garbage collection system works for
   */
  constructor(renderer) {
    /** Array of renderables being tracked for garbage collection */
    this._managedRenderables = [];
    /** Array of hash objects being tracked for cleanup */
    this._managedHashes = [];
    /** Array of arrays being tracked for cleanup */
    this._managedArrays = [];
    this._renderer = renderer;
  }
  /**
   * Initializes the garbage collection system with the provided options.
   * @param options - Configuration options for the renderer
   */
  init(options) {
    options = { ..._RenderableGCSystem.defaultOptions, ...options };
    this.maxUnusedTime = options.renderableGCMaxUnusedTime;
    this._frequency = options.renderableGCFrequency;
    this.enabled = options.renderableGCActive;
  }
  /**
   * Gets whether the garbage collection system is currently enabled.
   * @returns True if GC is enabled, false otherwise
   */
  get enabled() {
    return !!this._handler;
  }
  /**
   * Enables or disables the garbage collection system.
   * When enabled, schedules periodic cleanup of resources.
   * When disabled, cancels all scheduled cleanups.
   */
  set enabled(value) {
    if (this.enabled === value)
      return;
    if (value) {
      this._handler = this._renderer.scheduler.repeat(
        () => this.run(),
        this._frequency,
        false
      );
      this._hashHandler = this._renderer.scheduler.repeat(
        () => {
          for (const hash of this._managedHashes) {
            hash.context[hash.hash] = cleanHash(hash.context[hash.hash]);
          }
        },
        this._frequency
      );
      this._arrayHandler = this._renderer.scheduler.repeat(
        () => {
          for (const array of this._managedArrays) {
            cleanArray(array.context[array.hash]);
          }
        },
        this._frequency
      );
    } else {
      this._renderer.scheduler.cancel(this._handler);
      this._renderer.scheduler.cancel(this._hashHandler);
      this._renderer.scheduler.cancel(this._arrayHandler);
    }
  }
  /**
   * Adds a hash table to be managed by the garbage collector.
   * @param context - The object containing the hash table
   * @param hash - The property name of the hash table
   */
  addManagedHash(context, hash) {
    this._managedHashes.push({ context, hash });
  }
  /**
   * Adds an array to be managed by the garbage collector.
   * @param context - The object containing the array
   * @param hash - The property name of the array
   */
  addManagedArray(context, hash) {
    this._managedArrays.push({ context, hash });
  }
  /**
   * Updates the GC timestamp and tracking before rendering.
   * @param options - The render options
   * @param options.container - The container to render
   */
  prerender({
    container
  }) {
    this._now = performance.now();
    container.renderGroup.gcTick = renderableGCTick++;
    this._updateInstructionGCTick(container.renderGroup, container.renderGroup.gcTick);
  }
  /**
   * Starts tracking a renderable for garbage collection.
   * @param renderable - The renderable to track
   */
  addRenderable(renderable) {
    if (!this.enabled)
      return;
    if (renderable._lastUsed === -1) {
      this._managedRenderables.push(renderable);
      renderable.once("destroyed", this._removeRenderable, this);
    }
    renderable._lastUsed = this._now;
  }
  /**
   * Performs garbage collection by cleaning up unused renderables.
   * Removes renderables that haven't been used for longer than maxUnusedTime.
   */
  run() {
    const now = this._now;
    const managedRenderables = this._managedRenderables;
    const renderPipes = this._renderer.renderPipes;
    let offset = 0;
    for (let i = 0; i < managedRenderables.length; i++) {
      const renderable = managedRenderables[i];
      if (renderable === null) {
        offset++;
        continue;
      }
      const renderGroup = renderable.renderGroup ?? renderable.parentRenderGroup;
      const currentTick = renderGroup?.instructionSet?.gcTick ?? -1;
      if ((renderGroup?.gcTick ?? 0) === currentTick) {
        renderable._lastUsed = now;
      }
      if (now - renderable._lastUsed > this.maxUnusedTime) {
        if (!renderable.destroyed) {
          const rp = renderPipes;
          if (renderGroup)
            renderGroup.structureDidChange = true;
          rp[renderable.renderPipeId].destroyRenderable(renderable);
        }
        renderable._lastUsed = -1;
        offset++;
        renderable.off("destroyed", this._removeRenderable, this);
      } else {
        managedRenderables[i - offset] = renderable;
      }
    }
    managedRenderables.length -= offset;
  }
  /** Cleans up the garbage collection system. Disables GC and removes all tracked resources. */
  destroy() {
    this.enabled = false;
    this._renderer = null;
    this._managedRenderables.length = 0;
    this._managedHashes.length = 0;
    this._managedArrays.length = 0;
  }
  /**
   * Removes a renderable from being tracked when it's destroyed.
   * @param renderable - The renderable to stop tracking
   */
  _removeRenderable(renderable) {
    const index = this._managedRenderables.indexOf(renderable);
    if (index >= 0) {
      renderable.off("destroyed", this._removeRenderable, this);
      this._managedRenderables[index] = null;
    }
  }
  /**
   * Updates the GC tick counter for a render group and its children.
   * @param renderGroup - The render group to update
   * @param gcTick - The new tick value
   */
  _updateInstructionGCTick(renderGroup, gcTick) {
    renderGroup.instructionSet.gcTick = gcTick;
    for (const child of renderGroup.renderGroupChildren) {
      this._updateInstructionGCTick(child, gcTick);
    }
  }
};
/**
 * Extension metadata for registering this system with the renderer.
 * @ignore
 */
_RenderableGCSystem.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLSystem,
    Extensions/* ExtensionType */.Ag.WebGPUSystem
  ],
  name: "renderableGC",
  priority: 0
};
/**
 * Default configuration options for the garbage collection system.
 * These can be overridden when initializing the renderer.
 */
_RenderableGCSystem.defaultOptions = {
  /** Enable/disable the garbage collector */
  renderableGCActive: true,
  /** Time in ms before an unused resource is collected (default 1 minute) */
  renderableGCMaxUnusedTime: 6e4,
  /** How often to run garbage collection in ms (default 30 seconds) */
  renderableGCFrequency: 3e4
};
let RenderableGCSystem = _RenderableGCSystem;


//# sourceMappingURL=RenderableGCSystem.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/TextureGCSystem.mjs


"use strict";
const _TextureGCSystem = class _TextureGCSystem {
  /** @param renderer - The renderer this System works for. */
  constructor(renderer) {
    this._renderer = renderer;
    this.count = 0;
    this.checkCount = 0;
  }
  init(options) {
    options = { ..._TextureGCSystem.defaultOptions, ...options };
    this.checkCountMax = options.textureGCCheckCountMax;
    this.maxIdle = options.textureGCAMaxIdle ?? options.textureGCMaxIdle;
    this.active = options.textureGCActive;
  }
  /**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   */
  postrender() {
    if (!this._renderer.renderingToScreen) {
      return;
    }
    this.count++;
    if (!this.active)
      return;
    this.checkCount++;
    if (this.checkCount > this.checkCountMax) {
      this.checkCount = 0;
      this.run();
    }
  }
  /**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   */
  run() {
    const managedTextures = this._renderer.texture.managedTextures;
    for (let i = 0; i < managedTextures.length; i++) {
      const texture = managedTextures[i];
      if (texture.autoGarbageCollect && texture.resource && texture._touched > -1 && this.count - texture._touched > this.maxIdle) {
        texture._touched = -1;
        texture.unload();
      }
    }
  }
  destroy() {
    this._renderer = null;
  }
};
/** @ignore */
_TextureGCSystem.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLSystem,
    Extensions/* ExtensionType */.Ag.WebGPUSystem
  ],
  name: "textureGC"
};
/** default options for the TextureGCSystem */
_TextureGCSystem.defaultOptions = {
  /**
   * If set to true, this will enable the garbage collector on the GPU.
   * @default true
   */
  textureGCActive: true,
  /**
   * @deprecated since 8.3.0
   * @see {@link TextureGCSystem.textureGCMaxIdle}
   */
  textureGCAMaxIdle: null,
  /**
   * The maximum idle frames before a texture is destroyed by garbage collection.
   * @default 60 * 60
   */
  textureGCMaxIdle: 60 * 60,
  /**
   * Frames between two garbage collections.
   * @default 600
   */
  textureGCCheckCountMax: 600
};
let TextureGCSystem = _TextureGCSystem;


//# sourceMappingURL=TextureGCSystem.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/utils/logging/deprecation.mjs
var deprecation = __webpack_require__(63735);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/renderTarget/RenderTarget.mjs
var RenderTarget = __webpack_require__(47776);
// EXTERNAL MODULE: ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/texture/utils/getCanvasTexture.mjs
var getCanvasTexture = __webpack_require__(33756);
;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/view/ViewSystem.mjs







"use strict";
const _ViewSystem = class _ViewSystem {
  /**
   * Whether CSS dimensions of canvas view should be resized to screen dimensions automatically.
   * This is only supported for HTMLCanvasElement and will be ignored if the canvas is an OffscreenCanvas.
   * @member {boolean}
   */
  get autoDensity() {
    return this.texture.source.autoDensity;
  }
  set autoDensity(value) {
    this.texture.source.autoDensity = value;
  }
  /** The resolution / device pixel ratio of the renderer. */
  get resolution() {
    return this.texture.source._resolution;
  }
  set resolution(value) {
    this.texture.source.resize(
      this.texture.source.width,
      this.texture.source.height,
      value
    );
  }
  /**
   * initiates the view system
   * @param options - the options for the view
   */
  init(options) {
    options = {
      ..._ViewSystem.defaultOptions,
      ...options
    };
    if (options.view) {
      (0,deprecation/* deprecation */.t6)(deprecation/* v8_0_0 */.lj, "ViewSystem.view has been renamed to ViewSystem.canvas");
      options.canvas = options.view;
    }
    this.screen = new Rectangle/* Rectangle */.M(0, 0, options.width, options.height);
    this.canvas = options.canvas || adapter/* DOMAdapter */.e.get().createCanvas();
    this.antialias = !!options.antialias;
    this.texture = (0,getCanvasTexture/* getCanvasTexture */.c)(this.canvas, options);
    this.renderTarget = new RenderTarget/* RenderTarget */.O({
      colorTextures: [this.texture],
      depth: !!options.depth,
      isRoot: true
    });
    this.texture.source.transparent = options.backgroundAlpha < 1;
    this.resolution = options.resolution;
  }
  /**
   * Resizes the screen and canvas to the specified dimensions.
   * @param desiredScreenWidth - The new width of the screen.
   * @param desiredScreenHeight - The new height of the screen.
   * @param resolution
   */
  resize(desiredScreenWidth, desiredScreenHeight, resolution) {
    this.texture.source.resize(desiredScreenWidth, desiredScreenHeight, resolution);
    this.screen.width = this.texture.frame.width;
    this.screen.height = this.texture.frame.height;
  }
  /**
   * Destroys this System and optionally removes the canvas from the dom.
   * @param {options | false} options - The options for destroying the view, or "false".
   * @param options.removeView - Whether to remove the view element from the DOM. Defaults to `false`.
   */
  destroy(options = false) {
    const removeView = typeof options === "boolean" ? options : !!options?.removeView;
    if (removeView && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
};
/** @ignore */
_ViewSystem.extension = {
  type: [
    Extensions/* ExtensionType */.Ag.WebGLSystem,
    Extensions/* ExtensionType */.Ag.WebGPUSystem,
    Extensions/* ExtensionType */.Ag.CanvasSystem
  ],
  name: "view",
  priority: 0
};
/** The default options for the view system. */
_ViewSystem.defaultOptions = {
  /**
   * {@link WebGLOptions.width}
   * @default 800
   */
  width: 800,
  /**
   * {@link WebGLOptions.height}
   * @default 600
   */
  height: 600,
  /**
   * {@link WebGLOptions.autoDensity}
   * @default false
   */
  autoDensity: false,
  /**
   * {@link WebGLOptions.antialias}
   * @default false
   */
  antialias: false
};
let ViewSystem = _ViewSystem;


//# sourceMappingURL=ViewSystem.mjs.map

;// ./node_modules/.pnpm/pixi.js@8.9.1/node_modules/pixi.js/lib/rendering/renderers/shared/system/SharedSystems.mjs




















"use strict";
const SharedSystems = [
  BackgroundSystem,
  GlobalUniformSystem,
  HelloSystem,
  ViewSystem,
  RenderGroupSystem,
  TextureGCSystem,
  GenerateTextureSystem,
  ExtractSystem,
  globalHooks/* RendererInitHook */.d,
  RenderableGCSystem,
  SchedulerSystem
];
const SharedRenderPipes = [
  BlendModePipe,
  BatcherPipe,
  SpritePipe,
  RenderGroupPipe,
  AlphaMaskPipe,
  StencilMaskPipe,
  ColorMaskPipe,
  CustomRenderPipe
];


//# sourceMappingURL=SharedSystems.mjs.map


/***/ }),

/***/ 33756:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ getCanvasTexture)
/* harmony export */ });
/* unused harmony export hasCachedCanvasTexture */
/* harmony import */ var _sources_CanvasSource_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(99933);
/* harmony import */ var _Texture_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80443);



"use strict";
const canvasCache = /* @__PURE__ */ new Map();
function getCanvasTexture(canvas, options) {
  if (!canvasCache.has(canvas)) {
    const texture = new _Texture_mjs__WEBPACK_IMPORTED_MODULE_0__/* .Texture */ .g({
      source: new _sources_CanvasSource_mjs__WEBPACK_IMPORTED_MODULE_1__/* .CanvasSource */ .q({
        resource: canvas,
        ...options
      })
    });
    const onDestroy = () => {
      if (canvasCache.get(canvas) === texture) {
        canvasCache.delete(canvas);
      }
    };
    texture.once("destroy", onDestroy);
    texture.source.once("destroy", onDestroy);
    canvasCache.set(canvas, texture);
  }
  return canvasCache.get(canvas);
}
function hasCachedCanvasTexture(canvas) {
  return canvasCache.has(canvas);
}


//# sourceMappingURL=getCanvasTexture.mjs.map


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


/***/ })

}]);
//# sourceMappingURL=3391.bundle.js.map
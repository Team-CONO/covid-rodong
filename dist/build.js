/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(12)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_aos__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_aos___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_aos__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_tilt_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_aos_dist_aos_css__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_aos_dist_aos_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_aos_dist_aos_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__growthbunker_vuedarkmode__ = __webpack_require__(38);







__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_5__growthbunker_vuedarkmode__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_3_vue_tilt_js__["a" /* default */]);

new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  created() {
    __WEBPACK_IMPORTED_MODULE_2_aos___default.a.init({ duration: 1500 });
  },
  render: h => h(__WEBPACK_IMPORTED_MODULE_1__App_vue__["a" /* default */])
}).$mount('#app');

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (false) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (false) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (false) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (false
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (false
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (false) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "production" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "production" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (false) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "production" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (false) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (false) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (false) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (false) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    false
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (false) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (false) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (false) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (false) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (false) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (false) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (false) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "production" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (false) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (false) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (false) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "production" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (false
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if (false) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (false) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (false) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 false
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (false) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (false) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (false) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (false) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (false) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (false) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  false
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      "production" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (false) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (false) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "production" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (false) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (false) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (false) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (false) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (false) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (false) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (false
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (false) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (false) {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (false) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "production" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (false) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (false) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (false) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (false) {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (false) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (false
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (false
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (false) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */



/* eslint-disable no-unused-vars */
function baseWarn (msg, range) {
  console.error(("[Vue compiler]: " + msg));
}
/* eslint-enable no-unused-vars */

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

function addAttr (el, name, value, range, dynamic) {
  var attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []));
  attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  isDynamicArg,
  modifiers,
  range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker (symbol, name, dynamic) {
  return dynamic
    ? ("_p(" + name + ",\"" + symbol + "\")")
    : symbol + name // mark the event as captured
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn,
  range,
  dynamic
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    false
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    );
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr (
  el,
  name
) {
  return el.rawAttrsMap[':' + name] ||
    el.rawAttrsMap['v-bind:' + name] ||
    el.rawAttrsMap[name]
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

function getAndRemoveAttrByRegex (
  el,
  name
) {
  var list = el.attrsList;
  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr
    }
  }
}

function rangeSetItem (
  item,
  range
) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }
    if (range.end != null) {
      item.end = range.end;
    }
  }
  return item
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: JSON.stringify(value),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (false) {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead.",
        el.rawAttrsMap['v-model']
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (false) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.',
      el.rawAttrsMap['v-model']
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (false) {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally',
        el.rawAttrsMap[binding]
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecesarry `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (false) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (false) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "production" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (false) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (false
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (false) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        false
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (false
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (false) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.',
        el.rawAttrsMap['class']
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (false) {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.',
          el.rawAttrsMap['style']
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being passed as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (false) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
      if (false) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (false
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag."),
            { start: stack[i].start, end: stack[i].end }
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:|^#/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;

var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

var slotRE = /^v-slot(:|$)|^#/;

var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;

var invalidAttributeRE = /[\s"'<>\/=]/;

var decodeHTMLCached = cached(he.decode);

var emptySlotScopeToken = "_empty_";

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;
  maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg, range) {
    if (!warned) {
      warned = true;
      warn$2(msg, range);
    }
  }

  function closeElement (element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    // tree management
    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        if (false) {
          checkRootConstraints(element);
        }
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else if (false) {
        warnOnce(
          "Component template should contain exactly one root element. " +
          "If you are using v-if on multiple elements, " +
          "use v-else-if to chain them instead.",
          { start: element.start }
        );
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }

    // final children cleanup
    // filter out scoped slots
    element.children = element.children.filter(function (c) { return !(c).slotScope; });
    // remove trailing whitespace node again
    trimEndingWhitespace(element);

    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace (el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;
      while (
        (lastNode = el.children[el.children.length - 1]) &&
        lastNode.type === 3 &&
        lastNode.text === ' '
      ) {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints (el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce(
        "Cannot use <" + (el.tag) + "> as component root element because it may " +
        'contain multiple nodes.',
        { start: el.start }
      );
    }
    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce(
        'Cannot use v-for on stateful component root element because ' +
        'it renders multiple elements.',
        el.rawAttrsMap['v-for']
      );
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start (tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (false) {
        if (options.outputSourceRange) {
          element.start = start$1;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
            cumulated[attr.name] = attr;
            return cumulated
          }, {});
        }
        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn$2(
              "Invalid dynamic argument expression: attribute names cannot contain " +
              "spaces, quotes, <, >, / or =.",
              {
                start: attr.start + attr.name.indexOf("["),
                end: attr.start + attr.name.length
              }
            );
          }
        });
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "production" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.',
          { start: element.start }
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;
        if (false) {
          checkRootConstraints(root);
        }
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end (tag, start, end$1) {
      var element = stack[stack.length - 1];
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (false) {
        element.end = end$1;
      }
      closeElement(element);
    },

    chars: function chars (text, start, end) {
      if (!currentParent) {
        if (false) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.',
              { start: start }
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored."),
              { start: start }
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }
        var res;
        var child;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }
        if (child) {
          if (false) {
            child.start = start;
            child.end = end;
          }
          children.push(child);
        }
      }
    },
    comment: function comment (text, start, end) {
      // adding anyting as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };
        if (false) {
          child.start = start;
          child.end = end;
        }
        currentParent.children.push(child);
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var list = el.attrsList;
  var len = list.length;
  if (len) {
    var attrs = el.attrs = new Array(len);
    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };
      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (
  element,
  options
) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  );

  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (false) {
      if (el.tag === 'template') {
        warn$2(
          "<template> cannot be keyed. Place the key on real elements instead.",
          getRawBindingAttr(el, 'key')
        );
      }
      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2(
            "Do not use v-for index as key on <transition-group> children, " +
            "this is the same as not using keys.",
            getRawBindingAttr(el, 'key'),
            true /* tip */
          );
        }
      }
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (false) {
      warn$2(
        ("Invalid v-for expression: " + exp),
        el.rawAttrsMap['v-for']
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (false) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if.",
      el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (false) {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored.",
          children[i]
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent (el) {
  var slotScope;
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */
    if (false) {
      warn$2(
        "the \"scope\" attribute for scoped slots have been deprecated and " +
        "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
        "can also be used on plain elements in addition to <template> to " +
        "denote scoped slots.",
        el.rawAttrsMap['scope'],
        true
      );
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (false) {
      warn$2(
        "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
        "(v-for takes higher priority). Use a wrapper <template> for the " +
        "scoped slot to make it clearer.",
        el.rawAttrsMap['slot-scope'],
        true
      );
    }
    el.slotScope = slotScope;
  }

  // slot="xxx"
  var slotTarget = getBindingAttr(el, 'slot');
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  }

  // 2.6 v-slot syntax
  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        if (false) {
          if (el.slotTarget || el.slotScope) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn$2(
              "<template v-slot> can only appear at the root level inside " +
              "the receiving component",
              el
            );
          }
        }
        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding$1) {
        if (false) {
          if (!maybeComponent(el)) {
            warn$2(
              "v-slot can only be used on components or <template>.",
              slotBinding$1
            );
          }
          if (el.slotScope || el.slotTarget) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.scopedSlots) {
            warn$2(
              "To avoid scope ambiguity, the default slot should also use " +
              "<template> syntax when there are other named slots.",
              slotBinding$1
            );
          }
        }
        // add the component's children to its default slot
        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
        // remove children as they are returned from scopedSlots now
        el.children = [];
        // mark el non-plain so data gets generated
        el.plain = false;
      }
    }
  }
}

function getSlotName (binding) {
  var name = binding.name.replace(slotRE, '');
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else if (false) {
      warn$2(
        "v-slot shorthand syntax requires a slot name.",
        binding
      );
    }
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: ("\"" + name + "\""), dynamic: false }
}

// handle <slot/> outlets
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (false) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead.",
        getRawBindingAttr(el, 'key')
      );
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, ''));
      // support .foo shorthand syntax for the .prop modifier
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (
          false
        ) {
          warn$2(
            ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
          );
        }
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");
            if (!isDynamic) {
              addHandler(
                el,
                ("update:" + (camelize(name))),
                syncGen,
                null,
                false,
                warn$2,
                list[i]
              );
              if (hyphenate(name) !== camelize(name)) {
                addHandler(
                  el,
                  ("update:" + (hyphenate(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
              }
            } else {
              // handler w/ dynamic event name
              addHandler(
                el,
                ("\"update:\"+(" + name + ")"),
                syncGen,
                null,
                false,
                warn$2,
                list[i],
                true // dynamic
              );
            }
          }
        }
        if ((modifiers && modifiers.prop) || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
        if (false) {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (false) {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.',
            list[i]
          );
        }
      }
      addAttr(el, name, JSON.stringify(value), list[i]);
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      false
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead.",
        el.rawAttrsMap['v-model']
      );
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative
) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";
  for (var name in events) {
    var handlerCode = genHandler(events[name]);
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }
  staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
  } else {
    return prefix + staticHandlers
  }
}

function genHandler (handler) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : isFunctionInvocation
          ? ("return " + (handler.value))
          : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return (
    // make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" +
    (keys.map(genFilterCode).join('&&')) + ")return null;"
  )
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (false) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */





var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  state.pre = originalPreState;
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "production" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. ",
        el.rawAttrsMap['v-once']
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (false
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      el.rawAttrsMap['v-for'],
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:" + (genProps(el.attrs)) + ",";
  }
  // DOM props
  if (el.props) {
    data += "domProps:" + (genProps(el.props)) + ",";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.
  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
  }
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (false) {
    state.warn(
      'Inline-template components must have exactly one child element.',
      { start: el.start }
    );
  }
  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  el,
  slots,
  state
) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  });

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  var needsKey = !!el.if;

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    var parent = el.parent;
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true;
        break
      }
      if (parent.if) {
        needsKey = true;
      }
      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots)
    .map(function (key) { return genScopedSlot(slots[key], state); })
    .join(',');

  return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
}

function hash(str) {
  var hash = 5381;
  var i = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0
}

function containsSlotChild (el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true
    }
    return el.children.some(containsSlotChild)
  }
  return false
}

function genScopedSlot (
  el,
  state
) {
  var isLegacySyntax = el.attrsMap['slot-scope'];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null")
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot)
  }
  var slotScope = el.slotScope === emptySlotScopeToken
    ? ""
    : String(el.slotScope);
  var fn = "function(" + slotScope + "){" +
    "return " + (el.tag === 'template'
      ? el.if && isLegacySyntax
        ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  // reverse proxy v-slot without scope on this.$slots
  var reverseProxy = slotScope ? "" : ",proxy:true";
  return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      var normalizationType = checkSkip
        ? state.maybeComponent(el$1) ? ",1" : ",0"
        : "";
      return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
    }
    var normalizationType$1 = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      }); }))
    : null;
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var staticProps = "";
  var dynamicProps = "";
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += (prop.name) + "," + value + ",";
    } else {
      staticProps += "\"" + (prop.name) + "\":" + value + ",";
    }
  }
  staticProps = "{" + (staticProps.slice(0, -1)) + "}";
  if (dynamicProps) {
    return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
  } else {
    return staticProps
  }
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */



// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode (node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          var range = node.rawAttrsMap[name];
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), warn, range);
          } else if (name === 'v-slot' || name[0] === '#') {
            checkFunctionParameterExpression(value, (name + "=\"" + value + "\""), warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), warn, range);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), warn, range);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent (exp, text, warn, range) {
  var stripped = exp.replace(stripStringRE, '');
  var keywordMatch = stripped.match(unaryOperatorsRE);
  if (keywordMatch && stripped.charAt(keywordMatch.index - 1) !== '$') {
    warn(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
      range
    );
  }
  checkExpression(exp, text, warn, range);
}

function checkFor (node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier (
  ident,
  type,
  text,
  warn,
  range
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
    }
  }
}

function checkExpression (exp, text, warn, range) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      warn(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
        range
      );
    } else {
      warn(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n",
        range
      );
    }
  }
}

function checkFunctionParameterExpression (exp, text, warn, range) {
  try {
    new Function(exp, '');
  } catch (e) {
    warn(
      "invalid function parameter expression: " + (e.message) + " in\n\n" +
      "    " + exp + "\n\n" +
      "  Raw expression: " + (text.trim()) + "\n",
      range
    );
  }
}

/*  */

var range = 2;

function generateCodeFrame (
  source,
  start,
  end
) {
  if ( start === void 0 ) start = 0;
  if ( end === void 0 ) end = source.length;

  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];
  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) { continue }
        res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
        var lineLength = lines[j].length;
        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }
          count += lineLength + 1;
        }
      }
      break
    }
  }
  return res.join('\n')
}

function repeat$1 (str, n) {
  var result = '';
  if (n > 0) {
    while (true) { // eslint-disable-line
      if (n & 1) { result += str; }
      n >>>= 1;
      if (n <= 0) { break }
      str += str;
    }
  }
  return result
}

/*  */



function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (false) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (false) {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn$$1(
              "Error compiling template:\n\n" + (e.msg) + "\n\n" +
              generateCodeFrame(template, e.start, e.end),
              vm
            );
          });
        } else {
          warn$$1(
            "Error compiling template:\n\n" + template + "\n\n" +
            compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
            vm
          );
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
        } else {
          compiled.tips.forEach(function (msg) { return tip(msg, vm); });
        }
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (false) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if (false) {
          // $flow-disable-line
          var leadingSpaceLength = template.match(/^\s*/)[0].length;

          warn = function (msg, range, tip) {
            var data = { msg: msg };
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength;
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength;
              }
            }
            (tip ? tips : errors).push(data);
          };
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;

      var compiled = baseCompile(template.trim(), finalOptions);
      if (false) {
        detectErrors(compiled.ast, warn);
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "production" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (false) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (false) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (false) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        outputSourceRange: "production" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (false) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["a"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0), __webpack_require__(6).setImmediate))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(7);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(8)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b8105c84_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(30);
function injectStyle (ssrContext) {
  __webpack_require__(10)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b8105c84_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("679c40f3", content, true, {});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "#app{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50;margin-top:60px}body{background-color:#171e29}", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VirusIntro_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_VirusSymptoms_vue__ = __webpack_require__(20);
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'App',
  components: {
    VirusIntro: __WEBPACK_IMPORTED_MODULE_0__components_VirusIntro_vue__["a" /* default */],
    VirusSymptoms: __WEBPACK_IMPORTED_MODULE_1__components_VirusSymptoms_vue__["a" /* default */]
  }
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VirusIntro_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_14d52725_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_VirusIntro_vue__ = __webpack_require__(19);
function injectStyle (ssrContext) {
  __webpack_require__(15)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VirusIntro_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_14d52725_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_VirusIntro_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("930295e8", content, true, {});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "span.focus{color:red;font-weight:700}div.info{text-align:center;color:#fff;margin-top:50px}div.intro{background-image:url(" + __webpack_require__(17) + ");height:500px;background-repeat:no-repeat;background-size:contain;background-position:50%;vertical-align:middle;line-height:500px}div.intro h2{text-align:center}", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "covid.png?7d628c594db4737ca6cc5078ca7fefc6";

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'VirusIntro',
  props: {
    msg: String
  },
  mounted() {}
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"covid",attrs:{"id":"app"}},[_c('div',{staticStyle:{"text-align":"center","width":"100%"}},[_c('div',{directives:[{name:"tilt",rawName:"v-tilt"}],staticClass:"intro",staticStyle:{"display":"inline-block","width":"50%"},attrs:{"data-aos":"zoom-out"}},[_vm._m(0)])]),_vm._v(" "),_vm._m(1),_vm._v(" "),_vm._m(2),_vm._v(" "),_vm._m(3)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h2',[_c('span',{staticClass:"focus"},[_vm._v("코로나")]),_vm._v(" 바이러스란?")])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"info",attrs:{"data-aos":"fade-up"}},[_vm._v("코로나바이러스과에 속하는 "),_c('span',{staticClass:"focus"},[_vm._v("RNA 바이러스")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"info",attrs:{"data-aos":"fade-up","data-aos-delay":"50"}},[_vm._v("사람과 동물의 "),_c('span',{staticClass:"focus"},[_vm._v("호흡기")]),_vm._v("와 "),_c('span',{staticClass:"focus"},[_vm._v("소화기계")]),_vm._v(" 감염을 유발하며")])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"info",attrs:{"data-aos":"fade-up","data-aos-delay":"100"}},[_c('span',{staticClass:"focus"},[_vm._v("점막전염")]),_vm._v(" 혹은 "),_c('span',{staticClass:"focus"},[_vm._v("비말전파")]),_vm._v("로 쉽게 전파된다")])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d9493d7e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_VirusSymptoms_vue__ = __webpack_require__(23);
function injectStyle (ssrContext) {
  __webpack_require__(21)
}
var normalizeComponent = __webpack_require__(3)
/* script */
var __vue_script__ = null
/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d9493d7e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_VirusSymptoms_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(22);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("dfbb712e", content, true, {});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "#left{float:left;margin-left:6rem}#left .text{margin:10px;visibility:hidden;font-size:3rem;color:#fff}#left .img{width:500px;height:500px;opacity:.5}#left:hover .img{opacity:1}#left:hover .text{visibility:visible}", ""]);

// exports


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',[_c('section',{attrs:{"id":"left","data-aos":"fade-down"}},[_c('img',{staticClass:"img",attrs:{"src":__webpack_require__(24),"alt":"a img"}}),_vm._v(" "),_c('p',{staticClass:"text"},[_vm._v("기침, 마른기침")])]),_vm._v(" "),_c('section',{attrs:{"id":"left","data-aos":"fade-down"}},[_c('img',{staticClass:"img",attrs:{"src":__webpack_require__(25),"alt":"b img"}}),_vm._v(" "),_c('p',{staticClass:"text"},[_vm._v("발열 또는 오한")])]),_vm._v(" "),_c('section',{attrs:{"id":"left","data-aos":"fade-down"}},[_c('img',{staticClass:"img",attrs:{"src":__webpack_require__(26),"alt":"c img"}}),_vm._v(" "),_c('p',{staticClass:"text"},[_vm._v("두통")])]),_vm._v(" "),_c('section',{attrs:{"id":"left","data-aos":"fade-up"}},[_c('img',{staticClass:"img",attrs:{"src":__webpack_require__(27),"alt":"d img"}}),_vm._v(" "),_c('p',{staticClass:"text"},[_vm._v("근육통 또는 몸살")])]),_vm._v(" "),_c('section',{attrs:{"id":"left","data-aos":"fade-up"}},[_c('img',{staticClass:"img",attrs:{"src":__webpack_require__(28),"alt":"e img"}}),_vm._v(" "),_c('p',{staticClass:"text"},[_vm._v("미각 또는 후각 상실")])]),_vm._v(" "),_c('section',{attrs:{"id":"left","data-aos":"fade-up"}},[_c('img',{staticClass:"img",attrs:{"src":__webpack_require__(29),"alt":"f img"}}),_vm._v(" "),_c('p',{staticClass:"text"},[_vm._v("목 아픔")])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "icon-screening-cough.png?e20ecbabeaae3649348eecfb31505f6e";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "icon-screening-fever-chills.png?d1da47e201c70d7a002599ca2a4ff7a3";

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "icon-screening-headache.png?887665972f622d877719754a1f8fad2f";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "icon-screening-musclepain.png?c4e586cd3285653a49a119722e982d4c";

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "icon-screening-senses.png?1d2d433e3a3b514639c33c5291e37b1f";

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "icon-screening-sorethroat.png?fe7003d92c948ea1bc556c13d8f6d0b6";

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('VirusIntro'),_vm._v(" "),_c('VirusSymptoms')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):e.AOS=t()}(this,function(){"use strict";var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t="Expected a function",n=NaN,o="[object Symbol]",i=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,r=/^0b[01]+$/i,c=/^0o[0-7]+$/i,s=parseInt,u="object"==typeof e&&e&&e.Object===Object&&e,d="object"==typeof self&&self&&self.Object===Object&&self,l=u||d||Function("return this")(),f=Object.prototype.toString,m=Math.max,p=Math.min,b=function(){return l.Date.now()};function v(e,n,o){var i,a,r,c,s,u,d=0,l=!1,f=!1,v=!0;if("function"!=typeof e)throw new TypeError(t);function y(t){var n=i,o=a;return i=a=void 0,d=t,c=e.apply(o,n)}function h(e){var t=e-u;return void 0===u||t>=n||t<0||f&&e-d>=r}function k(){var e=b();if(h(e))return x(e);s=setTimeout(k,function(e){var t=n-(e-u);return f?p(t,r-(e-d)):t}(e))}function x(e){return s=void 0,v&&i?y(e):(i=a=void 0,c)}function O(){var e=b(),t=h(e);if(i=arguments,a=this,u=e,t){if(void 0===s)return function(e){return d=e,s=setTimeout(k,n),l?y(e):c}(u);if(f)return s=setTimeout(k,n),y(u)}return void 0===s&&(s=setTimeout(k,n)),c}return n=w(n)||0,g(o)&&(l=!!o.leading,r=(f="maxWait"in o)?m(w(o.maxWait)||0,n):r,v="trailing"in o?!!o.trailing:v),O.cancel=function(){void 0!==s&&clearTimeout(s),d=0,i=u=a=s=void 0},O.flush=function(){return void 0===s?c:x(b())},O}function g(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function w(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&f.call(e)==o}(e))return n;if(g(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=g(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(i,"");var u=r.test(e);return u||c.test(e)?s(e.slice(2),u?2:8):a.test(e)?n:+e}var y=function(e,n,o){var i=!0,a=!0;if("function"!=typeof e)throw new TypeError(t);return g(o)&&(i="leading"in o?!!o.leading:i,a="trailing"in o?!!o.trailing:a),v(e,n,{leading:i,maxWait:n,trailing:a})},h="Expected a function",k=NaN,x="[object Symbol]",O=/^\s+|\s+$/g,j=/^[-+]0x[0-9a-f]+$/i,E=/^0b[01]+$/i,N=/^0o[0-7]+$/i,z=parseInt,C="object"==typeof e&&e&&e.Object===Object&&e,A="object"==typeof self&&self&&self.Object===Object&&self,q=C||A||Function("return this")(),L=Object.prototype.toString,T=Math.max,M=Math.min,S=function(){return q.Date.now()};function D(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function H(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&L.call(e)==x}(e))return k;if(D(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=D(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(O,"");var n=E.test(e);return n||N.test(e)?z(e.slice(2),n?2:8):j.test(e)?k:+e}var $=function(e,t,n){var o,i,a,r,c,s,u=0,d=!1,l=!1,f=!0;if("function"!=typeof e)throw new TypeError(h);function m(t){var n=o,a=i;return o=i=void 0,u=t,r=e.apply(a,n)}function p(e){var n=e-s;return void 0===s||n>=t||n<0||l&&e-u>=a}function b(){var e=S();if(p(e))return v(e);c=setTimeout(b,function(e){var n=t-(e-s);return l?M(n,a-(e-u)):n}(e))}function v(e){return c=void 0,f&&o?m(e):(o=i=void 0,r)}function g(){var e=S(),n=p(e);if(o=arguments,i=this,s=e,n){if(void 0===c)return function(e){return u=e,c=setTimeout(b,t),d?m(e):r}(s);if(l)return c=setTimeout(b,t),m(s)}return void 0===c&&(c=setTimeout(b,t)),r}return t=H(t)||0,D(n)&&(d=!!n.leading,a=(l="maxWait"in n)?T(H(n.maxWait)||0,t):a,f="trailing"in n?!!n.trailing:f),g.cancel=function(){void 0!==c&&clearTimeout(c),u=0,o=s=i=c=void 0},g.flush=function(){return void 0===c?r:v(S())},g},W=function(){};function P(e){e&&e.forEach(function(e){var t=Array.prototype.slice.call(e.addedNodes),n=Array.prototype.slice.call(e.removedNodes);if(function e(t){var n=void 0,o=void 0;for(n=0;n<t.length;n+=1){if((o=t[n]).dataset&&o.dataset.aos)return!0;if(o.children&&e(o.children))return!0}return!1}(t.concat(n)))return W()})}function Y(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}var _={isSupported:function(){return!!Y()},ready:function(e,t){var n=window.document,o=new(Y())(P);W=t,o.observe(n.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}},B=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},F=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},K=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,G=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,J=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,Q=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;function R(){return navigator.userAgent||navigator.vendor||window.opera||""}var U=new(function(){function e(){B(this,e)}return F(e,[{key:"phone",value:function(){var e=R();return!(!K.test(e)&&!G.test(e.substr(0,4)))}},{key:"mobile",value:function(){var e=R();return!(!J.test(e)&&!Q.test(e.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}},{key:"ie11",value:function(){return"-ms-scroll-limit"in document.documentElement.style&&"-ms-ime-align"in document.documentElement.style}}]),e}()),V=function(e,t){var n=void 0;return U.ie11()?(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,{detail:t}):n=new CustomEvent(e,{detail:t}),document.dispatchEvent(n)},X=function(e){return e.forEach(function(e,t){return function(e,t){var n=e.options,o=e.position,i=e.node,a=(e.data,function(){e.animated&&(function(e,t){t&&t.forEach(function(t){return e.classList.remove(t)})}(i,n.animatedClassNames),V("aos:out",i),e.options.id&&V("aos:in:"+e.options.id,i),e.animated=!1)});n.mirror&&t>=o.out&&!n.once?a():t>=o.in?e.animated||(function(e,t){t&&t.forEach(function(t){return e.classList.add(t)})}(i,n.animatedClassNames),V("aos:in",i),e.options.id&&V("aos:in:"+e.options.id,i),e.animated=!0):e.animated&&!n.once&&a()}(e,window.pageYOffset)})},Z=function(e){for(var t=0,n=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),n+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:n,left:t}},ee=function(e,t,n){var o=e.getAttribute("data-aos-"+t);if(void 0!==o){if("true"===o)return!0;if("false"===o)return!1}return o||n},te=function(e,t){return e.forEach(function(e,n){var o=ee(e.node,"mirror",t.mirror),i=ee(e.node,"once",t.once),a=ee(e.node,"id"),r=t.useClassNames&&e.node.getAttribute("data-aos"),c=[t.animatedClassName].concat(r?r.split(" "):[]).filter(function(e){return"string"==typeof e});t.initClassName&&e.node.classList.add(t.initClassName),e.position={in:function(e,t,n){var o=window.innerHeight,i=ee(e,"anchor"),a=ee(e,"anchor-placement"),r=Number(ee(e,"offset",a?0:t)),c=a||n,s=e;i&&document.querySelectorAll(i)&&(s=document.querySelectorAll(i)[0]);var u=Z(s).top-o;switch(c){case"top-bottom":break;case"center-bottom":u+=s.offsetHeight/2;break;case"bottom-bottom":u+=s.offsetHeight;break;case"top-center":u+=o/2;break;case"center-center":u+=o/2+s.offsetHeight/2;break;case"bottom-center":u+=o/2+s.offsetHeight;break;case"top-top":u+=o;break;case"bottom-top":u+=o+s.offsetHeight;break;case"center-top":u+=o+s.offsetHeight/2}return u+r}(e.node,t.offset,t.anchorPlacement),out:o&&function(e,t){window.innerHeight;var n=ee(e,"anchor"),o=ee(e,"offset",t),i=e;return n&&document.querySelectorAll(n)&&(i=document.querySelectorAll(n)[0]),Z(i).top+i.offsetHeight-o}(e.node,t.offset)},e.options={once:i,mirror:o,animatedClassNames:c,id:a}}),e},ne=function(){var e=document.querySelectorAll("[data-aos]");return Array.prototype.map.call(e,function(e){return{node:e}})},oe=[],ie=!1,ae={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,mirror:!1,anchorPlacement:"top-bottom",startEvent:"DOMContentLoaded",animatedClassName:"aos-animate",initClassName:"aos-init",useClassNames:!1,disableMutationObserver:!1,throttleDelay:99,debounceDelay:50},re=function(){return document.all&&!window.atob},ce=function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]&&(ie=!0),ie&&(oe=te(oe,ae),X(oe),window.addEventListener("scroll",y(function(){X(oe,ae.once)},ae.throttleDelay)))},se=function(){if(oe=ne(),de(ae.disable)||re())return ue();ce()},ue=function(){oe.forEach(function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay"),ae.initClassName&&e.node.classList.remove(ae.initClassName),ae.animatedClassName&&e.node.classList.remove(ae.animatedClassName)})},de=function(e){return!0===e||"mobile"===e&&U.mobile()||"phone"===e&&U.phone()||"tablet"===e&&U.tablet()||"function"==typeof e&&!0===e()};return{init:function(e){return ae=I(ae,e),oe=ne(),ae.disableMutationObserver||_.isSupported()||(console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '),ae.disableMutationObserver=!0),ae.disableMutationObserver||_.ready("[data-aos]",se),de(ae.disable)||re()?ue():(document.querySelector("body").setAttribute("data-aos-easing",ae.easing),document.querySelector("body").setAttribute("data-aos-duration",ae.duration),document.querySelector("body").setAttribute("data-aos-delay",ae.delay),-1===["DOMContentLoaded","load"].indexOf(ae.startEvent)?document.addEventListener(ae.startEvent,function(){ce(!0)}):window.addEventListener("load",function(){ce(!0)}),"DOMContentLoaded"===ae.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1&&ce(!0),window.addEventListener("resize",$(ce,ae.debounceDelay,!0)),window.addEventListener("orientationchange",$(ce,ae.debounceDelay,!0)),oe)},refresh:ce,refreshHard:se}});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vanilla_tilt__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vanilla_tilt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vanilla_tilt__);


/*!
 * ------------------------------
 * Vue-Tilt.js - Based on Vanilla-Tilt ()
 * https://github.com/frogbob/vue-tilt.js
 * license: MIT license (http://opensource.org/licenses/MIT)
 * ------------------------------
 */

// Define VueTilt-Directive
var VueTilt = {
    install: function (Vue) {
        Vue.directive('tilt', function (el, binding) {
            __WEBPACK_IMPORTED_MODULE_0_vanilla_tilt___default.a.init(el, Object.assign({}, binding.value));
        });
    }
};

var GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.vue;
}

if (GlobalVue) {
    GlobalVue.use(plugin);
}

/* harmony default export */ __webpack_exports__["a"] = (VueTilt);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/**
 * Created by Sergiu Șandor (micku7zu) on 1/27/2017.
 * Original idea: https://github.com/gijsroge/tilt.js
 * MIT License.
 * Version 1.7.0
 */

var VanillaTilt = function () {
  function VanillaTilt(element) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, VanillaTilt);

    if (!(element instanceof Node)) {
      throw "Can't initialize VanillaTilt because " + element + " is not a Node.";
    }

    this.width = null;
    this.height = null;
    this.clientWidth = null;
    this.clientHeight = null;
    this.left = null;
    this.top = null;

    // for Gyroscope sampling
    this.gammazero = null;
    this.betazero = null;
    this.lastgammazero = null;
    this.lastbetazero = null;

    this.transitionTimeout = null;
    this.updateCall = null;
    this.event = null;

    this.updateBind = this.update.bind(this);
    this.resetBind = this.reset.bind(this);

    this.element = element;
    this.settings = this.extendSettings(settings);

    this.reverse = this.settings.reverse ? -1 : 1;
    this.glare = VanillaTilt.isSettingTrue(this.settings.glare);
    this.glarePrerender = VanillaTilt.isSettingTrue(this.settings["glare-prerender"]);
    this.fullPageListening = VanillaTilt.isSettingTrue(this.settings["full-page-listening"]);
    this.gyroscope = VanillaTilt.isSettingTrue(this.settings.gyroscope);
    this.gyroscopeSamples = this.settings.gyroscopeSamples;

    this.elementListener = this.getElementListener();

    if (this.glare) {
      this.prepareGlare();
    }

    if (this.fullPageListening) {
      this.updateClientSize();
    }

    this.addEventListeners();
    this.updateInitialPosition();
  }

  VanillaTilt.isSettingTrue = function isSettingTrue(setting) {
    return setting === "" || setting === true || setting === 1;
  };

  /**
   * Method returns element what will be listen mouse events
   * @return {Node}
   */


  VanillaTilt.prototype.getElementListener = function getElementListener() {
    if (this.fullPageListening) {
      return window.document;
    }

    if (typeof this.settings["mouse-event-element"] === "string") {
      var mouseEventElement = document.querySelector(this.settings["mouse-event-element"]);

      if (mouseEventElement) {
        return mouseEventElement;
      }
    }

    if (this.settings["mouse-event-element"] instanceof Node) {
      return this.settings["mouse-event-element"];
    }

    return this.element;
  };

  /**
   * Method set listen methods for this.elementListener
   * @return {Node}
   */


  VanillaTilt.prototype.addEventListeners = function addEventListeners() {
    this.onMouseEnterBind = this.onMouseEnter.bind(this);
    this.onMouseMoveBind = this.onMouseMove.bind(this);
    this.onMouseLeaveBind = this.onMouseLeave.bind(this);
    this.onWindowResizeBind = this.onWindowResize.bind(this);
    this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this);

    this.elementListener.addEventListener("mouseenter", this.onMouseEnterBind);
    this.elementListener.addEventListener("mouseleave", this.onMouseLeaveBind);
    this.elementListener.addEventListener("mousemove", this.onMouseMoveBind);

    if (this.glare || this.fullPageListening) {
      window.addEventListener("resize", this.onWindowResizeBind);
    }

    if (this.gyroscope) {
      window.addEventListener("deviceorientation", this.onDeviceOrientationBind);
    }
  };

  /**
   * Method remove event listeners from current this.elementListener
   */


  VanillaTilt.prototype.removeEventListeners = function removeEventListeners() {
    this.elementListener.removeEventListener("mouseenter", this.onMouseEnterBind);
    this.elementListener.removeEventListener("mouseleave", this.onMouseLeaveBind);
    this.elementListener.removeEventListener("mousemove", this.onMouseMoveBind);

    if (this.gyroscope) {
      window.removeEventListener("deviceorientation", this.onDeviceOrientationBind);
    }

    if (this.glare || this.fullPageListening) {
      window.removeEventListener("resize", this.onWindowResizeBind);
    }
  };

  VanillaTilt.prototype.destroy = function destroy() {
    clearTimeout(this.transitionTimeout);
    if (this.updateCall !== null) {
      cancelAnimationFrame(this.updateCall);
    }

    this.reset();

    this.removeEventListeners();
    this.element.vanillaTilt = null;
    delete this.element.vanillaTilt;

    this.element = null;
  };

  VanillaTilt.prototype.onDeviceOrientation = function onDeviceOrientation(event) {
    if (event.gamma === null || event.beta === null) {
      return;
    }

    this.updateElementPosition();

    if (this.gyroscopeSamples > 0) {
      this.lastgammazero = this.gammazero;
      this.lastbetazero = this.betazero;

      if (this.gammazero === null) {
        this.gammazero = event.gamma;
        this.betazero = event.beta;
      } else {
        this.gammazero = (event.gamma + this.lastgammazero) / 2;
        this.betazero = (event.beta + this.lastbetazero) / 2;
      }

      this.gyroscopeSamples -= 1;
    }

    var totalAngleX = this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;
    var totalAngleY = this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;

    var degreesPerPixelX = totalAngleX / this.width;
    var degreesPerPixelY = totalAngleY / this.height;

    var angleX = event.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero);
    var angleY = event.beta - (this.settings.gyroscopeMinAngleY + this.betazero);

    var posX = angleX / degreesPerPixelX;
    var posY = angleY / degreesPerPixelY;

    if (this.updateCall !== null) {
      cancelAnimationFrame(this.updateCall);
    }

    this.event = {
      clientX: posX + this.left,
      clientY: posY + this.top
    };

    this.updateCall = requestAnimationFrame(this.updateBind);
  };

  VanillaTilt.prototype.onMouseEnter = function onMouseEnter() {
    this.updateElementPosition();
    this.element.style.willChange = "transform";
    this.setTransition();
  };

  VanillaTilt.prototype.onMouseMove = function onMouseMove(event) {
    if (this.updateCall !== null) {
      cancelAnimationFrame(this.updateCall);
    }

    this.event = event;
    this.updateCall = requestAnimationFrame(this.updateBind);
  };

  VanillaTilt.prototype.onMouseLeave = function onMouseLeave() {
    this.setTransition();

    if (this.settings.reset) {
      requestAnimationFrame(this.resetBind);
    }
  };

  VanillaTilt.prototype.reset = function reset() {
    this.event = {
      clientX: this.left + this.width / 2,
      clientY: this.top + this.height / 2
    };

    if (this.element && this.element.style) {
      this.element.style.transform = "perspective(" + this.settings.perspective + "px) " + "rotateX(0deg) " + "rotateY(0deg) " + "scale3d(1, 1, 1)";
    }

    this.resetGlare();
  };

  VanillaTilt.prototype.resetGlare = function resetGlare() {
    if (this.glare) {
      this.glareElement.style.transform = "rotate(180deg) translate(-50%, -50%)";
      this.glareElement.style.opacity = "0";
    }
  };

  VanillaTilt.prototype.updateInitialPosition = function updateInitialPosition() {
    if (this.settings.startX === 0 && this.settings.startY === 0) {
      return;
    }

    this.onMouseEnter();

    if (this.fullPageListening) {
      this.event = {
        clientX: (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.clientWidth,
        clientY: (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.clientHeight
      };
    } else {
      this.event = {
        clientX: this.left + (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.width,
        clientY: this.top + (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.height
      };
    }

    var backupScale = this.settings.scale;
    this.settings.scale = 1;
    this.update();
    this.settings.scale = backupScale;
    this.resetGlare();
  };

  VanillaTilt.prototype.getValues = function getValues() {
    var x = void 0,
        y = void 0;

    if (this.fullPageListening) {
      x = this.event.clientX / this.clientWidth;
      y = this.event.clientY / this.clientHeight;
    } else {
      x = (this.event.clientX - this.left) / this.width;
      y = (this.event.clientY - this.top) / this.height;
    }

    x = Math.min(Math.max(x, 0), 1);
    y = Math.min(Math.max(y, 0), 1);

    var tiltX = (this.reverse * (this.settings.max - x * this.settings.max * 2)).toFixed(2);
    var tiltY = (this.reverse * (y * this.settings.max * 2 - this.settings.max)).toFixed(2);
    var angle = Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI);

    return {
      tiltX: tiltX,
      tiltY: tiltY,
      percentageX: x * 100,
      percentageY: y * 100,
      angle: angle
    };
  };

  VanillaTilt.prototype.updateElementPosition = function updateElementPosition() {
    var rect = this.element.getBoundingClientRect();

    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.left = rect.left;
    this.top = rect.top;
  };

  VanillaTilt.prototype.update = function update() {
    var values = this.getValues();

    this.element.style.transform = "perspective(" + this.settings.perspective + "px) " + "rotateX(" + (this.settings.axis === "x" ? 0 : values.tiltY) + "deg) " + "rotateY(" + (this.settings.axis === "y" ? 0 : values.tiltX) + "deg) " + "scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")";

    if (this.glare) {
      this.glareElement.style.transform = "rotate(" + values.angle + "deg) translate(-50%, -50%)";
      this.glareElement.style.opacity = "" + values.percentageY * this.settings["max-glare"] / 100;
    }

    this.element.dispatchEvent(new CustomEvent("tiltChange", {
      "detail": values
    }));

    this.updateCall = null;
  };

  /**
   * Appends the glare element (if glarePrerender equals false)
   * and sets the default style
   */


  VanillaTilt.prototype.prepareGlare = function prepareGlare() {
    // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
    if (!this.glarePrerender) {
      // Create glare element
      var jsTiltGlare = document.createElement("div");
      jsTiltGlare.classList.add("js-tilt-glare");

      var jsTiltGlareInner = document.createElement("div");
      jsTiltGlareInner.classList.add("js-tilt-glare-inner");

      jsTiltGlare.appendChild(jsTiltGlareInner);
      this.element.appendChild(jsTiltGlare);
    }

    this.glareElementWrapper = this.element.querySelector(".js-tilt-glare");
    this.glareElement = this.element.querySelector(".js-tilt-glare-inner");

    if (this.glarePrerender) {
      return;
    }

    Object.assign(this.glareElementWrapper.style, {
      "position": "absolute",
      "top": "0",
      "left": "0",
      "width": "100%",
      "height": "100%",
      "overflow": "hidden",
      "pointer-events": "none"
    });

    Object.assign(this.glareElement.style, {
      "position": "absolute",
      "top": "50%",
      "left": "50%",
      "pointer-events": "none",
      "background-image": "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
      "width": this.element.offsetWidth * 2 + "px",
      "height": this.element.offsetWidth * 2 + "px",
      "transform": "rotate(180deg) translate(-50%, -50%)",
      "transform-origin": "0% 0%",
      "opacity": "0"
    });
  };

  VanillaTilt.prototype.updateGlareSize = function updateGlareSize() {
    if (this.glare) {
      Object.assign(this.glareElement.style, {
        "width": "" + this.element.offsetWidth * 2,
        "height": "" + this.element.offsetWidth * 2
      });
    }
  };

  VanillaTilt.prototype.updateClientSize = function updateClientSize() {
    this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  };

  VanillaTilt.prototype.onWindowResize = function onWindowResize() {
    this.updateGlareSize();
    this.updateClientSize();
  };

  VanillaTilt.prototype.setTransition = function setTransition() {
    var _this = this;

    clearTimeout(this.transitionTimeout);
    this.element.style.transition = this.settings.speed + "ms " + this.settings.easing;
    if (this.glare) this.glareElement.style.transition = "opacity " + this.settings.speed + "ms " + this.settings.easing;

    this.transitionTimeout = setTimeout(function () {
      _this.element.style.transition = "";
      if (_this.glare) {
        _this.glareElement.style.transition = "";
      }
    }, this.settings.speed);
  };

  /**
   * Method return patched settings of instance
   * @param {boolean} settings.reverse - reverse the tilt direction
   * @param {number} settings.max - max tilt rotation (degrees)
   * @param {startX} settings.startX - the starting tilt on the X axis, in degrees. Default: 0
   * @param {startY} settings.startY - the starting tilt on the Y axis, in degrees. Default: 0
   * @param {number} settings.perspective - Transform perspective, the lower the more extreme the tilt gets
   * @param {string} settings.easing - Easing on enter/exit
   * @param {number} settings.scale - 2 = 200%, 1.5 = 150%, etc..
   * @param {number} settings.speed - Speed of the enter/exit transition
   * @param {boolean} settings.transition - Set a transition on enter/exit
   * @param {string|null} settings.axis - What axis should be disabled. Can be X or Y
   * @param {boolean} settings.glare - What axis should be disabled. Can be X or Y
   * @param {number} settings.max-glare - the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
   * @param {boolean} settings.glare-prerender - false = VanillaTilt creates the glare elements for you, otherwise
   * @param {boolean} settings.full-page-listening - If true, parallax effect will listen to mouse move events on the whole document, not only the selected element
   * @param {string|object} settings.mouse-event-element - String selector or link to HTML-element what will be listen mouse events
   * @param {boolean} settings.reset - false = If the tilt effect has to be reset on exit
   * @param {gyroscope} settings.gyroscope - Enable tilting by deviceorientation events
   * @param {gyroscopeSensitivity} settings.gyroscopeSensitivity - Between 0 and 1 - The angle at which max tilt position is reached. 1 = 90deg, 0.5 = 45deg, etc..
   * @param {gyroscopeSamples} settings.gyroscopeSamples - How many gyroscope moves to decide the starting position.
   */


  VanillaTilt.prototype.extendSettings = function extendSettings(settings) {
    var defaultSettings = {
      reverse: false,
      max: 15,
      startX: 0,
      startY: 0,
      perspective: 1000,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      scale: 1,
      speed: 300,
      transition: true,
      axis: null,
      glare: false,
      "max-glare": 1,
      "glare-prerender": false,
      "full-page-listening": false,
      "mouse-event-element": null,
      reset: true,
      gyroscope: true,
      gyroscopeMinAngleX: -45,
      gyroscopeMaxAngleX: 45,
      gyroscopeMinAngleY: -45,
      gyroscopeMaxAngleY: 45,
      gyroscopeSamples: 10
    };

    var newSettings = {};
    for (var property in defaultSettings) {
      if (property in settings) {
        newSettings[property] = settings[property];
      } else if (this.element.hasAttribute("data-tilt-" + property)) {
        var attribute = this.element.getAttribute("data-tilt-" + property);
        try {
          newSettings[property] = JSON.parse(attribute);
        } catch (e) {
          newSettings[property] = attribute;
        }
      } else {
        newSettings[property] = defaultSettings[property];
      }
    }

    return newSettings;
  };

  VanillaTilt.init = function init(elements, settings) {
    if (elements instanceof Node) {
      elements = [elements];
    }

    if (elements instanceof NodeList) {
      elements = [].slice.call(elements);
    }

    if (!(elements instanceof Array)) {
      return;
    }

    elements.forEach(function (element) {
      if (!("vanillaTilt" in element)) {
        element.vanillaTilt = new VanillaTilt(element, settings);
      }
    });
  };

  return VanillaTilt;
}();

if (typeof document !== "undefined") {
  /* expose the class to window */
  window.VanillaTilt = VanillaTilt;

  /**
   * Auto load
   */
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
}

module.exports = VanillaTilt;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(36).default
var update = add("5c8293eb", content, true, {});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "[data-aos][data-aos][data-aos-duration=\"50\"],body[data-aos-duration=\"50\"] [data-aos]{transition-duration:50ms}[data-aos][data-aos][data-aos-delay=\"50\"],body[data-aos-delay=\"50\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"50\"].aos-animate,body[data-aos-delay=\"50\"] [data-aos].aos-animate{transition-delay:50ms}[data-aos][data-aos][data-aos-duration=\"100\"],body[data-aos-duration=\"100\"] [data-aos]{transition-duration:.1s}[data-aos][data-aos][data-aos-delay=\"100\"],body[data-aos-delay=\"100\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"100\"].aos-animate,body[data-aos-delay=\"100\"] [data-aos].aos-animate{transition-delay:.1s}[data-aos][data-aos][data-aos-duration=\"150\"],body[data-aos-duration=\"150\"] [data-aos]{transition-duration:.15s}[data-aos][data-aos][data-aos-delay=\"150\"],body[data-aos-delay=\"150\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"150\"].aos-animate,body[data-aos-delay=\"150\"] [data-aos].aos-animate{transition-delay:.15s}[data-aos][data-aos][data-aos-duration=\"200\"],body[data-aos-duration=\"200\"] [data-aos]{transition-duration:.2s}[data-aos][data-aos][data-aos-delay=\"200\"],body[data-aos-delay=\"200\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"200\"].aos-animate,body[data-aos-delay=\"200\"] [data-aos].aos-animate{transition-delay:.2s}[data-aos][data-aos][data-aos-duration=\"250\"],body[data-aos-duration=\"250\"] [data-aos]{transition-duration:.25s}[data-aos][data-aos][data-aos-delay=\"250\"],body[data-aos-delay=\"250\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"250\"].aos-animate,body[data-aos-delay=\"250\"] [data-aos].aos-animate{transition-delay:.25s}[data-aos][data-aos][data-aos-duration=\"300\"],body[data-aos-duration=\"300\"] [data-aos]{transition-duration:.3s}[data-aos][data-aos][data-aos-delay=\"300\"],body[data-aos-delay=\"300\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"300\"].aos-animate,body[data-aos-delay=\"300\"] [data-aos].aos-animate{transition-delay:.3s}[data-aos][data-aos][data-aos-duration=\"350\"],body[data-aos-duration=\"350\"] [data-aos]{transition-duration:.35s}[data-aos][data-aos][data-aos-delay=\"350\"],body[data-aos-delay=\"350\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"350\"].aos-animate,body[data-aos-delay=\"350\"] [data-aos].aos-animate{transition-delay:.35s}[data-aos][data-aos][data-aos-duration=\"400\"],body[data-aos-duration=\"400\"] [data-aos]{transition-duration:.4s}[data-aos][data-aos][data-aos-delay=\"400\"],body[data-aos-delay=\"400\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"400\"].aos-animate,body[data-aos-delay=\"400\"] [data-aos].aos-animate{transition-delay:.4s}[data-aos][data-aos][data-aos-duration=\"450\"],body[data-aos-duration=\"450\"] [data-aos]{transition-duration:.45s}[data-aos][data-aos][data-aos-delay=\"450\"],body[data-aos-delay=\"450\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"450\"].aos-animate,body[data-aos-delay=\"450\"] [data-aos].aos-animate{transition-delay:.45s}[data-aos][data-aos][data-aos-duration=\"500\"],body[data-aos-duration=\"500\"] [data-aos]{transition-duration:.5s}[data-aos][data-aos][data-aos-delay=\"500\"],body[data-aos-delay=\"500\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"500\"].aos-animate,body[data-aos-delay=\"500\"] [data-aos].aos-animate{transition-delay:.5s}[data-aos][data-aos][data-aos-duration=\"550\"],body[data-aos-duration=\"550\"] [data-aos]{transition-duration:.55s}[data-aos][data-aos][data-aos-delay=\"550\"],body[data-aos-delay=\"550\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"550\"].aos-animate,body[data-aos-delay=\"550\"] [data-aos].aos-animate{transition-delay:.55s}[data-aos][data-aos][data-aos-duration=\"600\"],body[data-aos-duration=\"600\"] [data-aos]{transition-duration:.6s}[data-aos][data-aos][data-aos-delay=\"600\"],body[data-aos-delay=\"600\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"600\"].aos-animate,body[data-aos-delay=\"600\"] [data-aos].aos-animate{transition-delay:.6s}[data-aos][data-aos][data-aos-duration=\"650\"],body[data-aos-duration=\"650\"] [data-aos]{transition-duration:.65s}[data-aos][data-aos][data-aos-delay=\"650\"],body[data-aos-delay=\"650\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"650\"].aos-animate,body[data-aos-delay=\"650\"] [data-aos].aos-animate{transition-delay:.65s}[data-aos][data-aos][data-aos-duration=\"700\"],body[data-aos-duration=\"700\"] [data-aos]{transition-duration:.7s}[data-aos][data-aos][data-aos-delay=\"700\"],body[data-aos-delay=\"700\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"700\"].aos-animate,body[data-aos-delay=\"700\"] [data-aos].aos-animate{transition-delay:.7s}[data-aos][data-aos][data-aos-duration=\"750\"],body[data-aos-duration=\"750\"] [data-aos]{transition-duration:.75s}[data-aos][data-aos][data-aos-delay=\"750\"],body[data-aos-delay=\"750\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"750\"].aos-animate,body[data-aos-delay=\"750\"] [data-aos].aos-animate{transition-delay:.75s}[data-aos][data-aos][data-aos-duration=\"800\"],body[data-aos-duration=\"800\"] [data-aos]{transition-duration:.8s}[data-aos][data-aos][data-aos-delay=\"800\"],body[data-aos-delay=\"800\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"800\"].aos-animate,body[data-aos-delay=\"800\"] [data-aos].aos-animate{transition-delay:.8s}[data-aos][data-aos][data-aos-duration=\"850\"],body[data-aos-duration=\"850\"] [data-aos]{transition-duration:.85s}[data-aos][data-aos][data-aos-delay=\"850\"],body[data-aos-delay=\"850\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"850\"].aos-animate,body[data-aos-delay=\"850\"] [data-aos].aos-animate{transition-delay:.85s}[data-aos][data-aos][data-aos-duration=\"900\"],body[data-aos-duration=\"900\"] [data-aos]{transition-duration:.9s}[data-aos][data-aos][data-aos-delay=\"900\"],body[data-aos-delay=\"900\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"900\"].aos-animate,body[data-aos-delay=\"900\"] [data-aos].aos-animate{transition-delay:.9s}[data-aos][data-aos][data-aos-duration=\"950\"],body[data-aos-duration=\"950\"] [data-aos]{transition-duration:.95s}[data-aos][data-aos][data-aos-delay=\"950\"],body[data-aos-delay=\"950\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"950\"].aos-animate,body[data-aos-delay=\"950\"] [data-aos].aos-animate{transition-delay:.95s}[data-aos][data-aos][data-aos-duration=\"1000\"],body[data-aos-duration=\"1000\"] [data-aos]{transition-duration:1s}[data-aos][data-aos][data-aos-delay=\"1000\"],body[data-aos-delay=\"1000\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1000\"].aos-animate,body[data-aos-delay=\"1000\"] [data-aos].aos-animate{transition-delay:1s}[data-aos][data-aos][data-aos-duration=\"1050\"],body[data-aos-duration=\"1050\"] [data-aos]{transition-duration:1.05s}[data-aos][data-aos][data-aos-delay=\"1050\"],body[data-aos-delay=\"1050\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1050\"].aos-animate,body[data-aos-delay=\"1050\"] [data-aos].aos-animate{transition-delay:1.05s}[data-aos][data-aos][data-aos-duration=\"1100\"],body[data-aos-duration=\"1100\"] [data-aos]{transition-duration:1.1s}[data-aos][data-aos][data-aos-delay=\"1100\"],body[data-aos-delay=\"1100\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1100\"].aos-animate,body[data-aos-delay=\"1100\"] [data-aos].aos-animate{transition-delay:1.1s}[data-aos][data-aos][data-aos-duration=\"1150\"],body[data-aos-duration=\"1150\"] [data-aos]{transition-duration:1.15s}[data-aos][data-aos][data-aos-delay=\"1150\"],body[data-aos-delay=\"1150\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1150\"].aos-animate,body[data-aos-delay=\"1150\"] [data-aos].aos-animate{transition-delay:1.15s}[data-aos][data-aos][data-aos-duration=\"1200\"],body[data-aos-duration=\"1200\"] [data-aos]{transition-duration:1.2s}[data-aos][data-aos][data-aos-delay=\"1200\"],body[data-aos-delay=\"1200\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1200\"].aos-animate,body[data-aos-delay=\"1200\"] [data-aos].aos-animate{transition-delay:1.2s}[data-aos][data-aos][data-aos-duration=\"1250\"],body[data-aos-duration=\"1250\"] [data-aos]{transition-duration:1.25s}[data-aos][data-aos][data-aos-delay=\"1250\"],body[data-aos-delay=\"1250\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1250\"].aos-animate,body[data-aos-delay=\"1250\"] [data-aos].aos-animate{transition-delay:1.25s}[data-aos][data-aos][data-aos-duration=\"1300\"],body[data-aos-duration=\"1300\"] [data-aos]{transition-duration:1.3s}[data-aos][data-aos][data-aos-delay=\"1300\"],body[data-aos-delay=\"1300\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1300\"].aos-animate,body[data-aos-delay=\"1300\"] [data-aos].aos-animate{transition-delay:1.3s}[data-aos][data-aos][data-aos-duration=\"1350\"],body[data-aos-duration=\"1350\"] [data-aos]{transition-duration:1.35s}[data-aos][data-aos][data-aos-delay=\"1350\"],body[data-aos-delay=\"1350\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1350\"].aos-animate,body[data-aos-delay=\"1350\"] [data-aos].aos-animate{transition-delay:1.35s}[data-aos][data-aos][data-aos-duration=\"1400\"],body[data-aos-duration=\"1400\"] [data-aos]{transition-duration:1.4s}[data-aos][data-aos][data-aos-delay=\"1400\"],body[data-aos-delay=\"1400\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1400\"].aos-animate,body[data-aos-delay=\"1400\"] [data-aos].aos-animate{transition-delay:1.4s}[data-aos][data-aos][data-aos-duration=\"1450\"],body[data-aos-duration=\"1450\"] [data-aos]{transition-duration:1.45s}[data-aos][data-aos][data-aos-delay=\"1450\"],body[data-aos-delay=\"1450\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1450\"].aos-animate,body[data-aos-delay=\"1450\"] [data-aos].aos-animate{transition-delay:1.45s}[data-aos][data-aos][data-aos-duration=\"1500\"],body[data-aos-duration=\"1500\"] [data-aos]{transition-duration:1.5s}[data-aos][data-aos][data-aos-delay=\"1500\"],body[data-aos-delay=\"1500\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1500\"].aos-animate,body[data-aos-delay=\"1500\"] [data-aos].aos-animate{transition-delay:1.5s}[data-aos][data-aos][data-aos-duration=\"1550\"],body[data-aos-duration=\"1550\"] [data-aos]{transition-duration:1.55s}[data-aos][data-aos][data-aos-delay=\"1550\"],body[data-aos-delay=\"1550\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1550\"].aos-animate,body[data-aos-delay=\"1550\"] [data-aos].aos-animate{transition-delay:1.55s}[data-aos][data-aos][data-aos-duration=\"1600\"],body[data-aos-duration=\"1600\"] [data-aos]{transition-duration:1.6s}[data-aos][data-aos][data-aos-delay=\"1600\"],body[data-aos-delay=\"1600\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1600\"].aos-animate,body[data-aos-delay=\"1600\"] [data-aos].aos-animate{transition-delay:1.6s}[data-aos][data-aos][data-aos-duration=\"1650\"],body[data-aos-duration=\"1650\"] [data-aos]{transition-duration:1.65s}[data-aos][data-aos][data-aos-delay=\"1650\"],body[data-aos-delay=\"1650\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1650\"].aos-animate,body[data-aos-delay=\"1650\"] [data-aos].aos-animate{transition-delay:1.65s}[data-aos][data-aos][data-aos-duration=\"1700\"],body[data-aos-duration=\"1700\"] [data-aos]{transition-duration:1.7s}[data-aos][data-aos][data-aos-delay=\"1700\"],body[data-aos-delay=\"1700\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1700\"].aos-animate,body[data-aos-delay=\"1700\"] [data-aos].aos-animate{transition-delay:1.7s}[data-aos][data-aos][data-aos-duration=\"1750\"],body[data-aos-duration=\"1750\"] [data-aos]{transition-duration:1.75s}[data-aos][data-aos][data-aos-delay=\"1750\"],body[data-aos-delay=\"1750\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1750\"].aos-animate,body[data-aos-delay=\"1750\"] [data-aos].aos-animate{transition-delay:1.75s}[data-aos][data-aos][data-aos-duration=\"1800\"],body[data-aos-duration=\"1800\"] [data-aos]{transition-duration:1.8s}[data-aos][data-aos][data-aos-delay=\"1800\"],body[data-aos-delay=\"1800\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1800\"].aos-animate,body[data-aos-delay=\"1800\"] [data-aos].aos-animate{transition-delay:1.8s}[data-aos][data-aos][data-aos-duration=\"1850\"],body[data-aos-duration=\"1850\"] [data-aos]{transition-duration:1.85s}[data-aos][data-aos][data-aos-delay=\"1850\"],body[data-aos-delay=\"1850\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1850\"].aos-animate,body[data-aos-delay=\"1850\"] [data-aos].aos-animate{transition-delay:1.85s}[data-aos][data-aos][data-aos-duration=\"1900\"],body[data-aos-duration=\"1900\"] [data-aos]{transition-duration:1.9s}[data-aos][data-aos][data-aos-delay=\"1900\"],body[data-aos-delay=\"1900\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1900\"].aos-animate,body[data-aos-delay=\"1900\"] [data-aos].aos-animate{transition-delay:1.9s}[data-aos][data-aos][data-aos-duration=\"1950\"],body[data-aos-duration=\"1950\"] [data-aos]{transition-duration:1.95s}[data-aos][data-aos][data-aos-delay=\"1950\"],body[data-aos-delay=\"1950\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1950\"].aos-animate,body[data-aos-delay=\"1950\"] [data-aos].aos-animate{transition-delay:1.95s}[data-aos][data-aos][data-aos-duration=\"2000\"],body[data-aos-duration=\"2000\"] [data-aos]{transition-duration:2s}[data-aos][data-aos][data-aos-delay=\"2000\"],body[data-aos-delay=\"2000\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2000\"].aos-animate,body[data-aos-delay=\"2000\"] [data-aos].aos-animate{transition-delay:2s}[data-aos][data-aos][data-aos-duration=\"2050\"],body[data-aos-duration=\"2050\"] [data-aos]{transition-duration:2.05s}[data-aos][data-aos][data-aos-delay=\"2050\"],body[data-aos-delay=\"2050\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2050\"].aos-animate,body[data-aos-delay=\"2050\"] [data-aos].aos-animate{transition-delay:2.05s}[data-aos][data-aos][data-aos-duration=\"2100\"],body[data-aos-duration=\"2100\"] [data-aos]{transition-duration:2.1s}[data-aos][data-aos][data-aos-delay=\"2100\"],body[data-aos-delay=\"2100\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2100\"].aos-animate,body[data-aos-delay=\"2100\"] [data-aos].aos-animate{transition-delay:2.1s}[data-aos][data-aos][data-aos-duration=\"2150\"],body[data-aos-duration=\"2150\"] [data-aos]{transition-duration:2.15s}[data-aos][data-aos][data-aos-delay=\"2150\"],body[data-aos-delay=\"2150\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2150\"].aos-animate,body[data-aos-delay=\"2150\"] [data-aos].aos-animate{transition-delay:2.15s}[data-aos][data-aos][data-aos-duration=\"2200\"],body[data-aos-duration=\"2200\"] [data-aos]{transition-duration:2.2s}[data-aos][data-aos][data-aos-delay=\"2200\"],body[data-aos-delay=\"2200\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2200\"].aos-animate,body[data-aos-delay=\"2200\"] [data-aos].aos-animate{transition-delay:2.2s}[data-aos][data-aos][data-aos-duration=\"2250\"],body[data-aos-duration=\"2250\"] [data-aos]{transition-duration:2.25s}[data-aos][data-aos][data-aos-delay=\"2250\"],body[data-aos-delay=\"2250\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2250\"].aos-animate,body[data-aos-delay=\"2250\"] [data-aos].aos-animate{transition-delay:2.25s}[data-aos][data-aos][data-aos-duration=\"2300\"],body[data-aos-duration=\"2300\"] [data-aos]{transition-duration:2.3s}[data-aos][data-aos][data-aos-delay=\"2300\"],body[data-aos-delay=\"2300\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2300\"].aos-animate,body[data-aos-delay=\"2300\"] [data-aos].aos-animate{transition-delay:2.3s}[data-aos][data-aos][data-aos-duration=\"2350\"],body[data-aos-duration=\"2350\"] [data-aos]{transition-duration:2.35s}[data-aos][data-aos][data-aos-delay=\"2350\"],body[data-aos-delay=\"2350\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2350\"].aos-animate,body[data-aos-delay=\"2350\"] [data-aos].aos-animate{transition-delay:2.35s}[data-aos][data-aos][data-aos-duration=\"2400\"],body[data-aos-duration=\"2400\"] [data-aos]{transition-duration:2.4s}[data-aos][data-aos][data-aos-delay=\"2400\"],body[data-aos-delay=\"2400\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2400\"].aos-animate,body[data-aos-delay=\"2400\"] [data-aos].aos-animate{transition-delay:2.4s}[data-aos][data-aos][data-aos-duration=\"2450\"],body[data-aos-duration=\"2450\"] [data-aos]{transition-duration:2.45s}[data-aos][data-aos][data-aos-delay=\"2450\"],body[data-aos-delay=\"2450\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2450\"].aos-animate,body[data-aos-delay=\"2450\"] [data-aos].aos-animate{transition-delay:2.45s}[data-aos][data-aos][data-aos-duration=\"2500\"],body[data-aos-duration=\"2500\"] [data-aos]{transition-duration:2.5s}[data-aos][data-aos][data-aos-delay=\"2500\"],body[data-aos-delay=\"2500\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2500\"].aos-animate,body[data-aos-delay=\"2500\"] [data-aos].aos-animate{transition-delay:2.5s}[data-aos][data-aos][data-aos-duration=\"2550\"],body[data-aos-duration=\"2550\"] [data-aos]{transition-duration:2.55s}[data-aos][data-aos][data-aos-delay=\"2550\"],body[data-aos-delay=\"2550\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2550\"].aos-animate,body[data-aos-delay=\"2550\"] [data-aos].aos-animate{transition-delay:2.55s}[data-aos][data-aos][data-aos-duration=\"2600\"],body[data-aos-duration=\"2600\"] [data-aos]{transition-duration:2.6s}[data-aos][data-aos][data-aos-delay=\"2600\"],body[data-aos-delay=\"2600\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2600\"].aos-animate,body[data-aos-delay=\"2600\"] [data-aos].aos-animate{transition-delay:2.6s}[data-aos][data-aos][data-aos-duration=\"2650\"],body[data-aos-duration=\"2650\"] [data-aos]{transition-duration:2.65s}[data-aos][data-aos][data-aos-delay=\"2650\"],body[data-aos-delay=\"2650\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2650\"].aos-animate,body[data-aos-delay=\"2650\"] [data-aos].aos-animate{transition-delay:2.65s}[data-aos][data-aos][data-aos-duration=\"2700\"],body[data-aos-duration=\"2700\"] [data-aos]{transition-duration:2.7s}[data-aos][data-aos][data-aos-delay=\"2700\"],body[data-aos-delay=\"2700\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2700\"].aos-animate,body[data-aos-delay=\"2700\"] [data-aos].aos-animate{transition-delay:2.7s}[data-aos][data-aos][data-aos-duration=\"2750\"],body[data-aos-duration=\"2750\"] [data-aos]{transition-duration:2.75s}[data-aos][data-aos][data-aos-delay=\"2750\"],body[data-aos-delay=\"2750\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2750\"].aos-animate,body[data-aos-delay=\"2750\"] [data-aos].aos-animate{transition-delay:2.75s}[data-aos][data-aos][data-aos-duration=\"2800\"],body[data-aos-duration=\"2800\"] [data-aos]{transition-duration:2.8s}[data-aos][data-aos][data-aos-delay=\"2800\"],body[data-aos-delay=\"2800\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2800\"].aos-animate,body[data-aos-delay=\"2800\"] [data-aos].aos-animate{transition-delay:2.8s}[data-aos][data-aos][data-aos-duration=\"2850\"],body[data-aos-duration=\"2850\"] [data-aos]{transition-duration:2.85s}[data-aos][data-aos][data-aos-delay=\"2850\"],body[data-aos-delay=\"2850\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2850\"].aos-animate,body[data-aos-delay=\"2850\"] [data-aos].aos-animate{transition-delay:2.85s}[data-aos][data-aos][data-aos-duration=\"2900\"],body[data-aos-duration=\"2900\"] [data-aos]{transition-duration:2.9s}[data-aos][data-aos][data-aos-delay=\"2900\"],body[data-aos-delay=\"2900\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2900\"].aos-animate,body[data-aos-delay=\"2900\"] [data-aos].aos-animate{transition-delay:2.9s}[data-aos][data-aos][data-aos-duration=\"2950\"],body[data-aos-duration=\"2950\"] [data-aos]{transition-duration:2.95s}[data-aos][data-aos][data-aos-delay=\"2950\"],body[data-aos-delay=\"2950\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2950\"].aos-animate,body[data-aos-delay=\"2950\"] [data-aos].aos-animate{transition-delay:2.95s}[data-aos][data-aos][data-aos-duration=\"3000\"],body[data-aos-duration=\"3000\"] [data-aos]{transition-duration:3s}[data-aos][data-aos][data-aos-delay=\"3000\"],body[data-aos-delay=\"3000\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"3000\"].aos-animate,body[data-aos-delay=\"3000\"] [data-aos].aos-animate{transition-delay:3s}[data-aos]{pointer-events:none}[data-aos].aos-animate{pointer-events:auto}[data-aos][data-aos][data-aos-easing=linear],body[data-aos-easing=linear] [data-aos]{transition-timing-function:cubic-bezier(.25,.25,.75,.75)}[data-aos][data-aos][data-aos-easing=ease],body[data-aos-easing=ease] [data-aos]{transition-timing-function:ease}[data-aos][data-aos][data-aos-easing=ease-in],body[data-aos-easing=ease-in] [data-aos]{transition-timing-function:ease-in}[data-aos][data-aos][data-aos-easing=ease-out],body[data-aos-easing=ease-out] [data-aos]{transition-timing-function:ease-out}[data-aos][data-aos][data-aos-easing=ease-in-out],body[data-aos-easing=ease-in-out] [data-aos]{transition-timing-function:ease-in-out}[data-aos][data-aos][data-aos-easing=ease-in-back],body[data-aos-easing=ease-in-back] [data-aos]{transition-timing-function:cubic-bezier(.6,-.28,.735,.045)}[data-aos][data-aos][data-aos-easing=ease-out-back],body[data-aos-easing=ease-out-back] [data-aos]{transition-timing-function:cubic-bezier(.175,.885,.32,1.275)}[data-aos][data-aos][data-aos-easing=ease-in-out-back],body[data-aos-easing=ease-in-out-back] [data-aos]{transition-timing-function:cubic-bezier(.68,-.55,.265,1.55)}[data-aos][data-aos][data-aos-easing=ease-in-sine],body[data-aos-easing=ease-in-sine] [data-aos]{transition-timing-function:cubic-bezier(.47,0,.745,.715)}[data-aos][data-aos][data-aos-easing=ease-out-sine],body[data-aos-easing=ease-out-sine] [data-aos]{transition-timing-function:cubic-bezier(.39,.575,.565,1)}[data-aos][data-aos][data-aos-easing=ease-in-out-sine],body[data-aos-easing=ease-in-out-sine] [data-aos]{transition-timing-function:cubic-bezier(.445,.05,.55,.95)}[data-aos][data-aos][data-aos-easing=ease-in-quad],body[data-aos-easing=ease-in-quad] [data-aos]{transition-timing-function:cubic-bezier(.55,.085,.68,.53)}[data-aos][data-aos][data-aos-easing=ease-out-quad],body[data-aos-easing=ease-out-quad] [data-aos]{transition-timing-function:cubic-bezier(.25,.46,.45,.94)}[data-aos][data-aos][data-aos-easing=ease-in-out-quad],body[data-aos-easing=ease-in-out-quad] [data-aos]{transition-timing-function:cubic-bezier(.455,.03,.515,.955)}[data-aos][data-aos][data-aos-easing=ease-in-cubic],body[data-aos-easing=ease-in-cubic] [data-aos]{transition-timing-function:cubic-bezier(.55,.085,.68,.53)}[data-aos][data-aos][data-aos-easing=ease-out-cubic],body[data-aos-easing=ease-out-cubic] [data-aos]{transition-timing-function:cubic-bezier(.25,.46,.45,.94)}[data-aos][data-aos][data-aos-easing=ease-in-out-cubic],body[data-aos-easing=ease-in-out-cubic] [data-aos]{transition-timing-function:cubic-bezier(.455,.03,.515,.955)}[data-aos][data-aos][data-aos-easing=ease-in-quart],body[data-aos-easing=ease-in-quart] [data-aos]{transition-timing-function:cubic-bezier(.55,.085,.68,.53)}[data-aos][data-aos][data-aos-easing=ease-out-quart],body[data-aos-easing=ease-out-quart] [data-aos]{transition-timing-function:cubic-bezier(.25,.46,.45,.94)}[data-aos][data-aos][data-aos-easing=ease-in-out-quart],body[data-aos-easing=ease-in-out-quart] [data-aos]{transition-timing-function:cubic-bezier(.455,.03,.515,.955)}@media screen{html:not(.no-js) [data-aos^=fade][data-aos^=fade]{opacity:0;transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform}html:not(.no-js) [data-aos^=fade][data-aos^=fade].aos-animate{opacity:1;-webkit-transform:none;transform:none}html:not(.no-js) [data-aos=fade-up]{-webkit-transform:translate3d(0,100px,0);transform:translate3d(0,100px,0)}html:not(.no-js) [data-aos=fade-down]{-webkit-transform:translate3d(0,-100px,0);transform:translate3d(0,-100px,0)}html:not(.no-js) [data-aos=fade-right]{-webkit-transform:translate3d(-100px,0,0);transform:translate3d(-100px,0,0)}html:not(.no-js) [data-aos=fade-left]{-webkit-transform:translate3d(100px,0,0);transform:translate3d(100px,0,0)}html:not(.no-js) [data-aos=fade-up-right]{-webkit-transform:translate3d(-100px,100px,0);transform:translate3d(-100px,100px,0)}html:not(.no-js) [data-aos=fade-up-left]{-webkit-transform:translate3d(100px,100px,0);transform:translate3d(100px,100px,0)}html:not(.no-js) [data-aos=fade-down-right]{-webkit-transform:translate3d(-100px,-100px,0);transform:translate3d(-100px,-100px,0)}html:not(.no-js) [data-aos=fade-down-left]{-webkit-transform:translate3d(100px,-100px,0);transform:translate3d(100px,-100px,0)}html:not(.no-js) [data-aos^=zoom][data-aos^=zoom]{opacity:0;transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform}html:not(.no-js) [data-aos^=zoom][data-aos^=zoom].aos-animate{opacity:1;-webkit-transform:translateZ(0) scale(1);transform:translateZ(0) scale(1)}html:not(.no-js) [data-aos=zoom-in]{-webkit-transform:scale(.6);transform:scale(.6)}html:not(.no-js) [data-aos=zoom-in-up]{-webkit-transform:translate3d(0,100px,0) scale(.6);transform:translate3d(0,100px,0) scale(.6)}html:not(.no-js) [data-aos=zoom-in-down]{-webkit-transform:translate3d(0,-100px,0) scale(.6);transform:translate3d(0,-100px,0) scale(.6)}html:not(.no-js) [data-aos=zoom-in-right]{-webkit-transform:translate3d(-100px,0,0) scale(.6);transform:translate3d(-100px,0,0) scale(.6)}html:not(.no-js) [data-aos=zoom-in-left]{-webkit-transform:translate3d(100px,0,0) scale(.6);transform:translate3d(100px,0,0) scale(.6)}html:not(.no-js) [data-aos=zoom-out]{-webkit-transform:scale(1.2);transform:scale(1.2)}html:not(.no-js) [data-aos=zoom-out-up]{-webkit-transform:translate3d(0,100px,0) scale(1.2);transform:translate3d(0,100px,0) scale(1.2)}html:not(.no-js) [data-aos=zoom-out-down]{-webkit-transform:translate3d(0,-100px,0) scale(1.2);transform:translate3d(0,-100px,0) scale(1.2)}html:not(.no-js) [data-aos=zoom-out-right]{-webkit-transform:translate3d(-100px,0,0) scale(1.2);transform:translate3d(-100px,0,0) scale(1.2)}html:not(.no-js) [data-aos=zoom-out-left]{-webkit-transform:translate3d(100px,0,0) scale(1.2);transform:translate3d(100px,0,0) scale(1.2)}html:not(.no-js) [data-aos^=slide][data-aos^=slide]{transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;visibility:hidden}html:not(.no-js) [data-aos^=slide][data-aos^=slide].aos-animate{visibility:visible;-webkit-transform:translateZ(0);transform:translateZ(0)}html:not(.no-js) [data-aos=slide-up]{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}html:not(.no-js) [data-aos=slide-down]{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}html:not(.no-js) [data-aos=slide-right]{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}html:not(.no-js) [data-aos=slide-left]{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}html:not(.no-js) [data-aos^=flip][data-aos^=flip]{-webkit-backface-visibility:hidden;backface-visibility:hidden;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform}html:not(.no-js) [data-aos=flip-left]{-webkit-transform:perspective(2500px) rotateY(-100deg);transform:perspective(2500px) rotateY(-100deg)}html:not(.no-js) [data-aos=flip-left].aos-animate{-webkit-transform:perspective(2500px) rotateY(0);transform:perspective(2500px) rotateY(0)}html:not(.no-js) [data-aos=flip-right]{-webkit-transform:perspective(2500px) rotateY(100deg);transform:perspective(2500px) rotateY(100deg)}html:not(.no-js) [data-aos=flip-right].aos-animate{-webkit-transform:perspective(2500px) rotateY(0);transform:perspective(2500px) rotateY(0)}html:not(.no-js) [data-aos=flip-up]{-webkit-transform:perspective(2500px) rotateX(-100deg);transform:perspective(2500px) rotateX(-100deg)}html:not(.no-js) [data-aos=flip-up].aos-animate{-webkit-transform:perspective(2500px) rotateX(0);transform:perspective(2500px) rotateX(0)}html:not(.no-js) [data-aos=flip-down]{-webkit-transform:perspective(2500px) rotateX(100deg);transform:perspective(2500px) rotateX(100deg)}html:not(.no-js) [data-aos=flip-down].aos-animate{-webkit-transform:perspective(2500px) rotateX(0);transform:perspective(2500px) rotateX(0)}}", ""]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(37);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export BaseAlert */
/* unused harmony export BaseAvatar */
/* unused harmony export BaseBadge */
/* unused harmony export BaseButton */
/* unused harmony export BaseDivider */
/* unused harmony export BaseHeading */
/* unused harmony export BaseIcon */
/* unused harmony export BaseNumber */
/* unused harmony export BaseProgressBar */
/* unused harmony export BaseSpinner */
/* unused harmony export BaseToast */
/* unused harmony export FieldCheckbox */
/* unused harmony export FieldImageUploader */
/* unused harmony export FieldInput */
/* unused harmony export FieldLabel */
/* unused harmony export FieldMessage */
/* unused harmony export FieldRadios */
/* unused harmony export FieldSelect */
/* unused harmony export FieldTabs */
/* unused harmony export FieldTextarea */
/* unused harmony export FieldToggle */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_v_click_outside__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_v_click_outside___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_v_click_outside__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_v_hotkey__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_v_hotkey___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_v_hotkey__);
var t={props:{color:{type:String,default:null},id:{type:String,default:null},name:{type:String,required:!0},outlined:{type:Boolean,default:!1},size:{type:String,default:"24px"}},methods:{onClick(e){this.$emit("click",this.id,e)},onDoubleClick(e){this.$emit("dblclick",this.id,e)},onKeypress(e){"Space"===e.code&&(e.preventDefault(),e.target.click()),this.$emit("keypress",this.id,e)},onMouseDown(e){this.$emit("mousedown",this.id,e)},onMouseEnter(e){this.$emit("mouseenter",this.id,e)},onMouseLeave(e){this.$emit("mouseleave",this.id,e)},onMouseMove(e){this.$emit("mousemove",this.id,e)},onMouseOut(e){this.$emit("mouseout",this.id,e)},onMouseOver(e){this.$emit("mouseover",this.id,e)},onMouseUp(e){this.$emit("mouseup",this.id,e)}}};function a(e,i,t,a,o,b,l,r,d,g){"boolean"!=typeof l&&(d=r,r=l,l=!1);const n="function"==typeof t?t.options:t;let s;if(e&&e.render&&(n.render=e.render,n.staticRenderFns=e.staticRenderFns,n._compiled=!0,o&&(n.functional=!0)),a&&(n._scopeId=a),b?(s=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,d(e)),e&&e._registeredComponents&&e._registeredComponents.add(b)},n._ssrRegister=s):i&&(s=l?function(e){i.call(this,g(e,this.$root.$options.shadowRoot))}:function(e){i.call(this,r(e))}),s)if(n.functional){const e=n.render;n.render=function(i,t){return s.call(t),e(i,t)}}else{const e=n.beforeCreate;n.beforeCreate=e?[].concat(e,s):[s]}return t}const o="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());function b(e){return(e,i)=>(function(e,i){const t=o?i.media||"default":e,a=r[t]||(r[t]={ids:new Set,styles:[]});if(!a.ids.has(e)){a.ids.add(e);let t=i.source;if(i.map&&(t+="\n/*# sourceURL="+i.map.sources[0]+" */",t+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i.map))))+" */"),a.element||(a.element=document.createElement("style"),a.element.type="text/css",i.media&&a.element.setAttribute("media",i.media),void 0===l&&(l=document.head||document.getElementsByTagName("head")[0]),l.appendChild(a.element)),"styleSheet"in a.element)a.styles.push(t),a.element.styleSheet.cssText=a.styles.filter(Boolean).join("\n");else{const e=a.ids.size-1,i=document.createTextNode(t),o=a.element.childNodes;o[e]&&a.element.removeChild(o[e]),o.length?a.element.insertBefore(i,o[e]):a.element.appendChild(i)}}})(e,i)}let l;const r={};const d=a({render:function(){var e=this,i=e.$createElement;return(e._self._c||i)("i",{class:["gb-base-icon",{"gb-base-icon--clickable":e.$listeners.click,"gb-base-icon--outlined":e.outlined}],style:{color:e.color,fontSize:e.size},attrs:{tabindex:e.$listeners.click?"0":null,"aria-hidden":"true"},on:{click:e.onClick,dblclick:e.onDoubleClick,keypress:e.onKeypress,mousedown:e.onMouseDown,mouseenter:e.onMouseEnter,mouseleave:e.onMouseLeave,mousemove:e.onMouseMove,mouseout:e.onMouseOut,mouseover:e.onMouseOver,mouseup:e.onMouseUp}},[e._v(e._s(e.name))])},staticRenderFns:[]},(function(e){e&&e("data-v-1b6821fc_0",{source:'.gb-base-icon{display:inline-block;outline:0;border-radius:2px;color:inherit;text-transform:none;text-rendering:optimizeLegibility;white-space:nowrap;word-wrap:normal;letter-spacing:normal;font-weight:400;font-style:normal;font-family:"Material Icons";font-feature-settings:"liga";line-height:1;direction:ltr;user-select:none;-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent}.gb-base-icon--clickable{cursor:pointer}.gb-base-icon--outlined{font-family:"Material Icons Outlined"}@font-face{font-weight:400;font-style:normal;font-family:"Material Icons";src:url(https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format("woff2")}',map:void 0,media:void 0})}),t,void 0,!1,void 0,!1,b,void 0,void 0);var g={props:{theme:{type:String,default:"dark",validator:e=>["dark","light"].includes(e)}},computed:{computedTheme(){return this.theme?this.theme:this.$gb&&this.$gb.vuedarkmode&&this.$gb.vuedarkmode.theme?this.$gb.vuedarkmode.theme:"dark"}}};const n=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{class:["gb-base-alert","gb-base-alert--"+e.color,"gb-base-alert--"+e.computedTheme]},[e.icon?t("base-icon",{staticClass:"gb-base-alert__icon gb-base-alert__icon--left",attrs:{name:e.icon,size:"20px"}}):e._e(),e.$slots.default&&e.$slots.default[0].text.trim()?t("span",{staticClass:"gb-base-alert__slot"},[e._t("default")],2):e._e(),e.closable?t("base-icon",{staticClass:"gb-base-alert__icon gb-base-alert__icon--right",attrs:{name:"close",size:"20px",tabindex:"0"},on:{click:e.onClose,keypress:e.onTabKeypress}}):e._e()],1)},staticRenderFns:[]},(function(e){e&&e("data-v-0e869d3c_0",{source:'.gb-base-alert{display:flex;align-items:center;padding:14px 20px;text-align:left;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif;transition:all 250ms linear;-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent}.gb-base-alert .gb-base-alert__icon{flex:0 0 auto}.gb-base-alert .gb-base-alert__icon--left{margin-right:20px}.gb-base-alert .gb-base-alert__icon--right{margin-left:20px;outline:0;border-radius:100%;transition:all 250ms linear}.gb-base-alert .gb-base-alert__slot{flex:1;font-size:16px;line-height:22px}.gb-base-alert--dark{color:#fff;box-shadow:0 1px 5px 0 #171e29}.gb-base-alert--dark.gb-base-alert--black{background-color:#25374f}.gb-base-alert--dark.gb-base-alert--black .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--black .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #25374f,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--blue{background-color:#0093ee}.gb-base-alert--dark.gb-base-alert--blue .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--blue .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #0093ee,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--green{background-color:#96bf47}.gb-base-alert--dark.gb-base-alert--green .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--green .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #96bf47,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--grey{background-color:#a9c7df}.gb-base-alert--dark.gb-base-alert--grey .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--grey .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #a9c7df,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--orange{background-color:#ffb610}.gb-base-alert--dark.gb-base-alert--orange .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--orange .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #ffb610,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--purple{background-color:#ab7ef6}.gb-base-alert--dark.gb-base-alert--purple .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--purple .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #ab7ef6,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--red{background-color:#e0102b}.gb-base-alert--dark.gb-base-alert--red .gb-base-alert__icon--right:hover{color:#25374f!important}.gb-base-alert--dark.gb-base-alert--red .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #e0102b,0 0 0 3px #25374f;color:#25374f!important}.gb-base-alert--dark.gb-base-alert--turquoise{background-color:#26c1c9}.gb-base-alert--dark.gb-base-alert--turquoise .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--turquoise .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #26c1c9,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--white{background-color:#fff;color:#25374f}.gb-base-alert--dark.gb-base-alert--white .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--white .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #fff,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--yellow{background-color:#ffc02a}.gb-base-alert--dark.gb-base-alert--yellow .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--dark.gb-base-alert--yellow .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #ffc02a,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--light{color:#fff;box-shadow:0 1px 5px 0 #eaf6ff}.gb-base-alert--light.gb-base-alert--black{background-color:#2c405a}.gb-base-alert--light.gb-base-alert--black .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--light.gb-base-alert--black .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #2c405a,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--light.gb-base-alert--blue{background-color:#0079c4}.gb-base-alert--light.gb-base-alert--blue .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--light.gb-base-alert--blue .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #0079c4,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--light.gb-base-alert--green{background-color:#81c926}.gb-base-alert--light.gb-base-alert--green .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--light.gb-base-alert--green .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #81c926,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--light.gb-base-alert--grey{background-color:#8eacc5}.gb-base-alert--light.gb-base-alert--grey .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--light.gb-base-alert--grey .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #8eacc5,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--light.gb-base-alert--orange{background-color:#fd7b1f}.gb-base-alert--light.gb-base-alert--orange .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--light.gb-base-alert--orange .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #fd7b1f,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--light.gb-base-alert--purple{background-color:#ab7ef6}.gb-base-alert--light.gb-base-alert--purple .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--light.gb-base-alert--purple .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #ab7ef6,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--light.gb-base-alert--red{background-color:#e0102b}.gb-base-alert--light.gb-base-alert--red .gb-base-alert__icon--right:hover{color:#2c405a!important}.gb-base-alert--light.gb-base-alert--red .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #e0102b,0 0 0 3px #2c405a;color:#2c405a!important}.gb-base-alert--light.gb-base-alert--turquoise{background-color:#26c1c9}.gb-base-alert--light.gb-base-alert--turquoise .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--light.gb-base-alert--turquoise .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #26c1c9,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--light.gb-base-alert--white{background-color:#fff;color:#2c405a}.gb-base-alert--light.gb-base-alert--white .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--light.gb-base-alert--white .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #fff,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-alert--light.gb-base-alert--yellow{background-color:#faca00}.gb-base-alert--light.gb-base-alert--yellow .gb-base-alert__icon--right:hover{color:#e0102b!important}.gb-base-alert--light.gb-base-alert--yellow .gb-base-alert__icon--right:focus{box-shadow:0 0 0 2px #faca00,0 0 0 3px #e0102b;color:#e0102b!important}',map:void 0,media:void 0})}),{components:{BaseIcon:d},mixins:[g],props:{closable:{type:Boolean,default:!0},color:{type:String,default:"blue",validator:e=>["black","blue","green","grey","orange","purple","red","turquoise","white","yellow"].includes(e)},icon:{type:String,default:null}},methods:{onClose(e){this.$emit("close",e)},onTabKeypress(e,i){i.preventDefault(),"Space"===i.code&&i.target.click()}}},void 0,!1,void 0,!1,b,void 0,void 0);const s=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{class:["gb-base-avatar","gb-base-avatar--"+e.size,"gb-base-avatar--"+e.computedTheme,{"gb-base-avatar--animated":e.animated,"gb-base-avatar--bordered":e.bordered,"gb-base-avatar--circular":e.circular,"gb-base-avatar--clickable":e.$listeners.click&&!1!==e.clickable,"gb-base-avatar--secondaries":e.secondaries,"gb-base-avatar--shadow":e.shadow}],on:{click:e.onClick}},[t("span",{staticClass:"gb-base-avatar__image",style:{backgroundImage:"url("+e.src+")"},attrs:{tabindex:e.$listeners.click?"0":null},on:{keypress:function(i){return i.preventDefault(),e.onKeypress(i)}}},[t("span",{staticClass:"gb-base-avatar__focuser"}),e.secondaries?t("div",{staticClass:"gb-base-avatar__secondaries"},e._l(e.secondaries,(function(e){return t("span",{key:e.src,staticClass:"gb-base-avatar__image gb-base-avatar__secondary",style:{backgroundImage:"url("+e.src+")"}})})),0):e._e()]),e.description?t("span",{staticClass:"gb-base-avatar__description"},[e._v(e._s(e.description))]):e._e()])},staticRenderFns:[]},(function(e){e&&e("data-v-09c3f718_0",{source:'.gb-base-avatar{display:flex;align-items:center;flex-direction:column;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif;-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent}.gb-base-avatar .gb-base-avatar__image{position:relative;display:inline-block;box-sizing:border-box;outline:0;background-size:cover;transition:all linear 0s;user-select:none}.gb-base-avatar .gb-base-avatar__image .gb-base-avatar__focuser{position:absolute;top:-3px;right:-3px;bottom:-3px;left:-3px;border-width:1px;border-style:solid;border-color:transparent;opacity:0;transition:all linear 250ms}.gb-base-avatar .gb-base-avatar__image .gb-base-avatar__secondaries{display:flex;justify-content:flex-end}.gb-base-avatar .gb-base-avatar__image .gb-base-avatar__secondaries .gb-base-avatar__secondary{margin-right:4px;width:30px;height:30px;border-width:1px;border-style:solid;border-radius:4px;box-shadow:none}.gb-base-avatar .gb-base-avatar__image .gb-base-avatar__secondaries .gb-base-avatar__secondary:last-of-type{margin-right:0}.gb-base-avatar .gb-base-avatar__description{text-align:center;text-transform:uppercase}.gb-base-avatar--nano .gb-base-avatar__image{width:20px;height:20px;border-radius:2px}.gb-base-avatar--nano .gb-base-avatar__image .gb-base-avatar__focuser{border-radius:4px}.gb-base-avatar--nano .gb-base-avatar__description{padding-top:3px;font-size:8px;line-height:12px}.gb-base-avatar--micro .gb-base-avatar__image{width:24px;height:24px;border-radius:2px}.gb-base-avatar--micro .gb-base-avatar__image .gb-base-avatar__focuser{border-radius:4px}.gb-base-avatar--micro .gb-base-avatar__description{padding-top:3px;font-size:10px;line-height:14px}.gb-base-avatar--mini .gb-base-avatar__image{width:30px;height:30px;border-radius:4px}.gb-base-avatar--mini .gb-base-avatar__image .gb-base-avatar__focuser{border-radius:6px}.gb-base-avatar--mini .gb-base-avatar__description{padding-top:3px;font-size:12px;line-height:16px}.gb-base-avatar--small .gb-base-avatar__image{width:40px;height:40px;border-radius:4px}.gb-base-avatar--small .gb-base-avatar__image .gb-base-avatar__focuser{border-radius:6px}.gb-base-avatar--small .gb-base-avatar__description{padding-top:6px;font-size:10px;line-height:14px}.gb-base-avatar--default .gb-base-avatar__image{width:60px;height:60px;border-radius:6px}.gb-base-avatar--default .gb-base-avatar__image .gb-base-avatar__focuser{border-radius:8px}.gb-base-avatar--default .gb-base-avatar__description{padding-top:7px;font-size:12px;line-height:16px}.gb-base-avatar--medium .gb-base-avatar__image{width:80px;height:80px;border-radius:8px}.gb-base-avatar--medium .gb-base-avatar__image .gb-base-avatar__focuser{border-radius:10px}.gb-base-avatar--medium .gb-base-avatar__description{padding-top:8px;font-size:14px;line-height:18px}.gb-base-avatar--large .gb-base-avatar__image{width:100px;height:100px;border-radius:10px}.gb-base-avatar--large .gb-base-avatar__image .gb-base-avatar__focuser{border-radius:12px}.gb-base-avatar--large .gb-base-avatar__description{padding-top:9px;font-size:16px;line-height:20px}.gb-base-avatar--huge .gb-base-avatar__image{width:120px;height:120px;border-radius:12px}.gb-base-avatar--huge .gb-base-avatar__image .gb-base-avatar__focuser{border-radius:14px}.gb-base-avatar--huge .gb-base-avatar__description{padding-top:10px;font-size:18px;line-height:22px}.gb-base-avatar--animated .gb-base-avatar__image{transition:transform 250ms linear}.gb-base-avatar--animated .gb-base-avatar__image:hover{transform:scale(1.05)}.gb-base-avatar--bordered .gb-base-avatar__image{border-width:1px;border-style:solid}.gb-base-avatar--circular .gb-base-avatar__image{border-radius:100%}.gb-base-avatar--circular .gb-base-avatar__image .gb-base-avatar__focuser{border-radius:100%}.gb-base-avatar--clickable{cursor:pointer}.gb-base-avatar--secondaries>.gb-base-avatar__image{position:relative}.gb-base-avatar--secondaries>.gb-base-avatar__image .gb-base-avatar__secondaries{position:absolute;right:5px;bottom:5px}.gb-base-avatar--dark .gb-base-avatar__image .gb-base-avatar__secondaries .gb-base-avatar__secondary{border-color:#fff}.gb-base-avatar--dark.gb-base-avatar--bordered .gb-base-avatar__image{border-color:#fff}.gb-base-avatar--dark.gb-base-avatar--clickable .gb-base-avatar__image:focus .gb-base-avatar__focuser{border-color:#0093ee}.gb-base-avatar--dark.gb-base-avatar--shadow .gb-base-avatar__image{box-shadow:0 1px 3px 0 #171e29}.gb-base-avatar--light .gb-base-avatar__image .gb-base-avatar__secondaries .gb-base-avatar__secondary{border-color:#3f536e}.gb-base-avatar--light.gb-base-avatar--bordered .gb-base-avatar__image{border-color:#3f536e}.gb-base-avatar--light.gb-base-avatar--clickable .gb-base-avatar__image:focus .gb-base-avatar__focuser{border-color:#0079c4}.gb-base-avatar--light.gb-base-avatar--shadow .gb-base-avatar__image{box-shadow:0 1px 3px 0 #eaf6ff}.gb-base-avatar--clickable .gb-base-avatar__image:focus .gb-base-avatar__focuser{opacity:1}',map:void 0,media:void 0})}),{mixins:[g],props:{animated:{type:Boolean,default:!1},bordered:{type:Boolean,default:!1},circular:{type:Boolean,default:!0},clickable:{type:Boolean,default:null},description:{type:String,default:null},id:{type:[String,Number],default:null},secondaries:{type:Array,default:null},size:{type:String,default:"default",validator:e=>["nano","micro","mini","small","default","medium","large","huge"].includes(e)},shadow:{type:Boolean,default:!0},src:{type:String,required:!0}},methods:{onClick(e){this.$emit("click",this.id,e)},onKeypress(e){"Space"===e.code&&e.target.click()}}},void 0,!1,void 0,!1,b,void 0,void 0);const c=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("span",{class:["gb-base-badge","gb-base-badge--"+e.color,"gb-base-badge--"+e.size,"gb-base-badge--"+e.computedTheme,{"gb-base-badge--clickable":e.$listeners.click,"gb-base-badge--filled":e.filled,"gb-base-badge--not-filled":!e.filled}],attrs:{tabindex:e.$listeners.click?"0":null},on:{click:function(i){return e.onClick(e.id,i)},keypress:function(i){return i.preventDefault(),e.onKeypress(i)}}},[t("span",{staticClass:"gb-base-badge__focuser"}),e._t("default")],2)},staticRenderFns:[]},(function(e){e&&e("data-v-108fe8cf_0",{source:'.gb-base-badge{position:relative;display:inline-block;outline:0;border-width:1px;border-style:solid;border-radius:100px;text-transform:uppercase;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif;user-select:none;-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent}.gb-base-badge .gb-base-badge__focuser{position:absolute;top:-4px;right:-4px;bottom:-4px;left:-4px;border-width:1px;border-style:solid;border-color:transparent;border-radius:100px;opacity:0;transition:all linear 250ms}.gb-base-badge--micro{padding:0 10px;font-size:10px;line-height:18px}.gb-base-badge--mini{padding:0 11px;font-size:11px;line-height:19px}.gb-base-badge--small{padding:0 12px;font-size:12px;line-height:22px}.gb-base-badge--default{padding:0 13px;font-size:13px;line-height:23px}.gb-base-badge--medium{padding:0 14px;font-size:14px;line-height:25px}.gb-base-badge--large{padding:0 15px;font-size:15px;line-height:30px}.gb-base-badge--clickable{cursor:pointer}.gb-base-badge--dark{box-shadow:0 1px 5px 0 #171e29;color:#fff}.gb-base-badge--dark.gb-base-badge--black{border-color:#25374f}.gb-base-badge--dark.gb-base-badge--black .gb-base-badge__focuser{border-color:#25374f}.gb-base-badge--dark.gb-base-badge--black.gb-base-badge--filled{background-color:#25374f}.gb-base-badge--dark.gb-base-badge--blue{border-color:#0093ee}.gb-base-badge--dark.gb-base-badge--blue .gb-base-badge__focuser{border-color:#0093ee}.gb-base-badge--dark.gb-base-badge--blue.gb-base-badge--filled{background-color:#0093ee}.gb-base-badge--dark.gb-base-badge--green{border-color:#96bf47}.gb-base-badge--dark.gb-base-badge--green .gb-base-badge__focuser{border-color:#96bf47}.gb-base-badge--dark.gb-base-badge--green.gb-base-badge--filled{background-color:#96bf47}.gb-base-badge--dark.gb-base-badge--grey{border-color:#a9c7df}.gb-base-badge--dark.gb-base-badge--grey .gb-base-badge__focuser{border-color:#a9c7df}.gb-base-badge--dark.gb-base-badge--grey.gb-base-badge--filled{background-color:#a9c7df}.gb-base-badge--dark.gb-base-badge--orange{border-color:#ffb610}.gb-base-badge--dark.gb-base-badge--orange .gb-base-badge__focuser{border-color:#ffb610}.gb-base-badge--dark.gb-base-badge--orange.gb-base-badge--filled{background-color:#ffb610}.gb-base-badge--dark.gb-base-badge--purple{border-color:#ab7ef6}.gb-base-badge--dark.gb-base-badge--purple .gb-base-badge__focuser{border-color:#ab7ef6}.gb-base-badge--dark.gb-base-badge--purple.gb-base-badge--filled{background-color:#ab7ef6}.gb-base-badge--dark.gb-base-badge--red{border-color:#e0102b}.gb-base-badge--dark.gb-base-badge--red .gb-base-badge__focuser{border-color:#e0102b}.gb-base-badge--dark.gb-base-badge--red.gb-base-badge--filled{background-color:#e0102b}.gb-base-badge--dark.gb-base-badge--turquoise{border-color:#26c1c9}.gb-base-badge--dark.gb-base-badge--turquoise .gb-base-badge__focuser{border-color:#26c1c9}.gb-base-badge--dark.gb-base-badge--turquoise.gb-base-badge--filled{background-color:#26c1c9}.gb-base-badge--dark.gb-base-badge--white{border-color:#fff}.gb-base-badge--dark.gb-base-badge--white .gb-base-badge__focuser{border-color:#fff}.gb-base-badge--dark.gb-base-badge--white.gb-base-badge--filled{background-color:#fff;color:#25374f}.gb-base-badge--dark.gb-base-badge--yellow{border-color:#ffc02a}.gb-base-badge--dark.gb-base-badge--yellow .gb-base-badge__focuser{border-color:#ffc02a}.gb-base-badge--dark.gb-base-badge--yellow.gb-base-badge--filled{background-color:#ffc02a}.gb-base-badge--light{box-shadow:0 1px 5px 0 #eaf6ff;color:#fff}.gb-base-badge--light.gb-base-badge--black{border-color:#2c405a}.gb-base-badge--light.gb-base-badge--black .gb-base-badge__focuser{border-color:#2c405a}.gb-base-badge--light.gb-base-badge--black.gb-base-badge--filled{background-color:#2c405a}.gb-base-badge--light.gb-base-badge--black.gb-base-badge--not-filled{color:#2c405a}.gb-base-badge--light.gb-base-badge--blue{border-color:#0079c4}.gb-base-badge--light.gb-base-badge--blue .gb-base-badge__focuser{border-color:#0079c4}.gb-base-badge--light.gb-base-badge--blue.gb-base-badge--filled{background-color:#0079c4}.gb-base-badge--light.gb-base-badge--blue.gb-base-badge--not-filled{color:#0079c4}.gb-base-badge--light.gb-base-badge--green{border-color:#81c926}.gb-base-badge--light.gb-base-badge--green .gb-base-badge__focuser{border-color:#81c926}.gb-base-badge--light.gb-base-badge--green.gb-base-badge--filled{background-color:#81c926}.gb-base-badge--light.gb-base-badge--green.gb-base-badge--not-filled{color:#81c926}.gb-base-badge--light.gb-base-badge--grey{border-color:#8eacc5}.gb-base-badge--light.gb-base-badge--grey .gb-base-badge__focuser{border-color:#8eacc5}.gb-base-badge--light.gb-base-badge--grey.gb-base-badge--filled{background-color:#8eacc5}.gb-base-badge--light.gb-base-badge--grey.gb-base-badge--not-filled{color:#8eacc5}.gb-base-badge--light.gb-base-badge--orange{border-color:#fd7b1f}.gb-base-badge--light.gb-base-badge--orange .gb-base-badge__focuser{border-color:#fd7b1f}.gb-base-badge--light.gb-base-badge--orange.gb-base-badge--filled{background-color:#fd7b1f}.gb-base-badge--light.gb-base-badge--orange.gb-base-badge--not-filled{color:#fd7b1f}.gb-base-badge--light.gb-base-badge--purple{border-color:#ab7ef6}.gb-base-badge--light.gb-base-badge--purple .gb-base-badge__focuser{border-color:#ab7ef6}.gb-base-badge--light.gb-base-badge--purple.gb-base-badge--filled{background-color:#ab7ef6}.gb-base-badge--light.gb-base-badge--purple.gb-base-badge--not-filled{color:#ab7ef6}.gb-base-badge--light.gb-base-badge--red{border-color:#e0102b}.gb-base-badge--light.gb-base-badge--red .gb-base-badge__focuser{border-color:#e0102b}.gb-base-badge--light.gb-base-badge--red.gb-base-badge--filled{background-color:#e0102b}.gb-base-badge--light.gb-base-badge--red.gb-base-badge--not-filled{color:#e0102b}.gb-base-badge--light.gb-base-badge--turquoise{border-color:#26c1c9}.gb-base-badge--light.gb-base-badge--turquoise .gb-base-badge__focuser{border-color:#26c1c9}.gb-base-badge--light.gb-base-badge--turquoise.gb-base-badge--filled{background-color:#26c1c9}.gb-base-badge--light.gb-base-badge--turquoise.gb-base-badge--not-filled{color:#26c1c9}.gb-base-badge--light.gb-base-badge--white{border-color:#fff}.gb-base-badge--light.gb-base-badge--white .gb-base-badge__focuser{border-color:#fff}.gb-base-badge--light.gb-base-badge--white.gb-base-badge--filled{background-color:#fff;color:#2c405a}.gb-base-badge--light.gb-base-badge--white.gb-base-badge--not-filled{color:#fff}.gb-base-badge--light.gb-base-badge--yellow{border-color:#faca00}.gb-base-badge--light.gb-base-badge--yellow .gb-base-badge__focuser{border-color:#faca00}.gb-base-badge--light.gb-base-badge--yellow.gb-base-badge--filled{background-color:#faca00}.gb-base-badge--light.gb-base-badge--yellow.gb-base-badge--not-filled{color:#faca00}.gb-base-badge:focus .gb-base-badge__focuser{opacity:1}',map:void 0,media:void 0})}),{mixins:[g],props:{color:{type:String,default:"blue",validator:e=>["black","blue","green","grey","orange","purple","red","turquoise","white","yellow"].includes(e)},filled:{type:Boolean,default:!1},id:{type:String,default:null},size:{type:String,default:"default",validator:e=>["micro","mini","small","default","medium","large"].includes(e)}},methods:{onClick(e,i){this.$emit("click",e,i)},onKeypress(e){"Space"===e.code&&e.target.click()}}},void 0,!1,void 0,!1,b,void 0,void 0);const f=a({render:function(){var e=this.$createElement,i=this._self._c||e;return i("div",{class:["gb-base-spinner","gb-base-spinner--"+this.color,"gb-base-spinner--"+this.size,"gb-base-spinner--"+this.computedTheme],on:{click:this.onClick}},[i("div",{staticClass:"gb-base-spinner__wave gb-base-spinner__wave--first"}),i("div",{staticClass:"gb-base-spinner__wave gb-base-spinner__wave--second"})])},staticRenderFns:[]},(function(e){e&&e("data-v-279c724f_0",{source:".gb-base-spinner{position:relative;display:inline-block;cursor:wait}.gb-base-spinner .gb-base-spinner__wave{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:50%;opacity:.6;animation:bounce 2s infinite linear}.gb-base-spinner .gb-base-spinner__wave--second{animation-delay:-1s}.gb-base-spinner--nano{width:14px;height:14px}.gb-base-spinner--micro{width:16px;height:16px}.gb-base-spinner--mini{width:20px;height:20px}.gb-base-spinner--small{width:30px;height:30px}.gb-base-spinner--default{width:40px;height:40px}.gb-base-spinner--medium{width:50px;height:50px}.gb-base-spinner--large{width:60px;height:60px}.gb-base-spinner--dark.gb-base-spinner--black .gb-base-spinner__wave{background-color:#25374f}.gb-base-spinner--dark.gb-base-spinner--blue .gb-base-spinner__wave{background-color:#0093ee}.gb-base-spinner--dark.gb-base-spinner--green .gb-base-spinner__wave{background-color:#96bf47}.gb-base-spinner--dark.gb-base-spinner--grey .gb-base-spinner__wave{background-color:#a9c7df}.gb-base-spinner--dark.gb-base-spinner--orange .gb-base-spinner__wave{background-color:#ffb610}.gb-base-spinner--dark.gb-base-spinner--purple .gb-base-spinner__wave{background-color:#ab7ef6}.gb-base-spinner--dark.gb-base-spinner--red .gb-base-spinner__wave{background-color:#e0102b}.gb-base-spinner--dark.gb-base-spinner--turquoise .gb-base-spinner__wave{background-color:#26c1c9}.gb-base-spinner--dark.gb-base-spinner--white .gb-base-spinner__wave{background-color:#fff}.gb-base-spinner--dark.gb-base-spinner--yellow .gb-base-spinner__wave{background-color:#ffc02a}.gb-base-spinner--light.gb-base-spinner--black .gb-base-spinner__wave{background-color:#2c405a}.gb-base-spinner--light.gb-base-spinner--blue .gb-base-spinner__wave{background-color:#0079c4}.gb-base-spinner--light.gb-base-spinner--green .gb-base-spinner__wave{background-color:#81c926}.gb-base-spinner--light.gb-base-spinner--grey .gb-base-spinner__wave{background-color:#8eacc5}.gb-base-spinner--light.gb-base-spinner--orange .gb-base-spinner__wave{background-color:#fd7b1f}.gb-base-spinner--light.gb-base-spinner--purple .gb-base-spinner__wave{background-color:#ab7ef6}.gb-base-spinner--light.gb-base-spinner--red .gb-base-spinner__wave{background-color:#e0102b}.gb-base-spinner--light.gb-base-spinner--turquoise .gb-base-spinner__wave{background-color:#26c1c9}.gb-base-spinner--light.gb-base-spinner--white .gb-base-spinner__wave{background-color:#fff}.gb-base-spinner--light.gb-base-spinner--yellow .gb-base-spinner__wave{background-color:#faca00}@keyframes bounce{0%,100%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}",map:void 0,media:void 0})}),{mixins:[g],props:{color:{type:String,default:"blue",validator:e=>["black","blue","green","grey","orange","purple","red","turquoise","white","yellow"].includes(e)},size:{type:String,default:"default",validator:e=>["nano","micro","mini","small","default","medium","large"].includes(e)}},methods:{onClick(e){this.$emit("click",e)}}},void 0,!1,void 0,!1,b,void 0,void 0);const _=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t(e.href?"a":"button",{tag:"component",class:["gb-base-button","gb-base-button--"+e.color,"gb-base-button--"+e.size,"gb-base-button--"+e.computedTheme,{"gb-base-button--circular":e.circular,"gb-base-button--disabled":e.disabled||e.loading,"gb-base-button--full-width":e.fullWidth,"gb-base-button--link":e.link,"gb-base-button--loading":e.loading,"gb-base-button--reverse":e.reverse,"gb-base-button--rounded":e.rounded,"gb-base-button--uppercase":e.uppercase}],attrs:{disabled:e.disabled,href:e.href,type:e.href?null:e.type},on:{click:e.onClick,dblclick:e.onDoubleClick,mousedown:e.onMouseDown,mouseenter:e.onMouseEnter,mouseleave:e.onMouseLeave,mousemove:e.onMouseMove,mouseout:e.onMouseOut,mouseover:e.onMouseOver,mouseup:e.onMouseUp}},[t("span",{staticClass:"gb-base-button__focuser"}),t("span",{staticClass:"gb-base-button__inner"},[e.leftIcon?t("base-icon",{staticClass:"gb-base-button__left-icon",attrs:{color:e.leftIconColor,name:e.leftIcon,outlined:e.leftIconOutlined,size:e.computedIconSize}}):e._e(),e.$slots.default&&e.$slots.default[0].text.trim()&&!e.circular?t("span",{staticClass:"gb-base-button__label"},[e.confirming?[e._v("Click to confirm")]:e._t("default")],2):e._e(),e.computedRightIcon?t("base-icon",{staticClass:"gb-base-button__right-icon",attrs:{color:e.rightIconColor,name:e.computedRightIcon,outlined:e.rightIconOutlined,size:e.computedIconSize}}):e._e()],1),e.loading?t("base-spinner",{staticClass:"gb-base-button__spinner",attrs:{color:e.computedSpinnerColor,theme:e.theme,size:"mini"}}):e._e(),e.list&&e.listOpened&&!e.loading?t("transition",{attrs:{"enter-active-class":"animated fade-in","leave-active-class":"animated fade-out"}},[t("div",{staticClass:"gb-base-button__list"},e._l(e.list,(function(i){return t("span",{key:i.id,staticClass:"gb-base-button__item",on:{click:function(t){return e.onItemClick(i.id,t)}}},[e._v(e._s(i.label))])})),0)]):e._e()],1)},staticRenderFns:[]},(function(e){e&&e("data-v-0b23d66c_0",{source:'.gb-base-button{position:relative;display:inline-block;outline:0;border:1px solid rgba(0,0,0,.1);background-position:center;font-weight:500;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif;transition:all 250ms linear;user-select:none;cursor:pointer;-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent}.gb-base-button .gb-base-button__focuser{position:absolute;top:-4px;right:-4px;bottom:-4px;left:-4px;border-width:1px;border-style:solid;border-color:transparent;opacity:0;transition:all linear 250ms}.gb-base-button .gb-base-button__inner{display:flex;align-items:center;justify-content:center}.gb-base-button .gb-base-button__list{position:absolute;bottom:0;left:50%;z-index:100;display:block;padding-top:10px;min-width:100%;transform:translate(-50%,100%)}.gb-base-button .gb-base-button__list .gb-base-button__item{display:block;padding:10px 14px;border-width:1px;border-style:solid;border-top:none;white-space:nowrap;transition:all 250ms linear}.gb-base-button .gb-base-button__list .gb-base-button__item:first-of-type{border-top-width:1px;border-top-style:solid;border-top-left-radius:4px;border-top-right-radius:4px}.gb-base-button .gb-base-button__list .gb-base-button__item:last-of-type{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.gb-base-button--nano{padding:3px 6px;border-radius:2px;font-size:10px;line-height:10px}.gb-base-button--nano .gb-base-button__focuser{border-radius:4px}.gb-base-button--nano .gb-base-button__inner .gb-base-button__left-icon{margin-right:2px}.gb-base-button--nano .gb-base-button__inner .gb-base-button__right-icon{margin-left:2px}.gb-base-button--nano .gb-base-button__list{border-radius:2px}.gb-base-button--micro{padding:5px 8px;border-radius:3px;font-size:11px;line-height:11px}.gb-base-button--micro .gb-base-button__focuser{border-radius:5px}.gb-base-button--micro .gb-base-button__inner .gb-base-button__left-icon{margin-right:3px}.gb-base-button--micro .gb-base-button__inner .gb-base-button__right-icon{margin-left:3px}.gb-base-button--micro .gb-base-button__list{border-radius:3px}.gb-base-button--mini{padding:7px 10px;border-radius:4px;font-size:12px;line-height:12px}.gb-base-button--mini .gb-base-button__focuser{border-radius:6px}.gb-base-button--mini .gb-base-button__inner .gb-base-button__left-icon{margin-right:4px}.gb-base-button--mini .gb-base-button__inner .gb-base-button__right-icon{margin-left:4px}.gb-base-button--mini .gb-base-button__list{border-radius:4px}.gb-base-button--small{padding:9px 12px;border-radius:5px;font-size:13px;line-height:13px}.gb-base-button--small .gb-base-button__focuser{border-radius:7px}.gb-base-button--small .gb-base-button__inner .gb-base-button__left-icon{margin-right:5px}.gb-base-button--small .gb-base-button__inner .gb-base-button__right-icon{margin-left:5px}.gb-base-button--small .gb-base-button__list{border-radius:5px}.gb-base-button--default{padding:11px 14px;border-radius:6px;font-size:14px;line-height:14px}.gb-base-button--default .gb-base-button__focuser{border-radius:8px}.gb-base-button--default .gb-base-button__inner .gb-base-button__left-icon{margin-right:6px}.gb-base-button--default .gb-base-button__inner .gb-base-button__right-icon{margin-left:6px}.gb-base-button--default .gb-base-button__list{border-radius:6px}.gb-base-button--medium{padding:13px 16px;border-radius:7px;font-size:15px;line-height:15px}.gb-base-button--medium .gb-base-button__focuser{border-radius:9px}.gb-base-button--medium .gb-base-button__inner .gb-base-button__left-icon{margin-right:7px}.gb-base-button--medium .gb-base-button__inner .gb-base-button__right-icon{margin-left:7px}.gb-base-button--medium .gb-base-button__list{border-radius:7px}.gb-base-button--large{padding:15px 18px;border-radius:8px;font-size:16px;line-height:16px}.gb-base-button--large .gb-base-button__focuser{border-radius:10px}.gb-base-button--large .gb-base-button__inner .gb-base-button__left-icon{margin-right:8px}.gb-base-button--large .gb-base-button__inner .gb-base-button__right-icon{margin-left:8px}.gb-base-button--large .gb-base-button__list{border-radius:8px}.gb-base-button--circular{border-radius:100px}.gb-base-button--circular .gb-base-button__focuser{border-radius:100px}.gb-base-button--circular .gb-base-button__inner .gb-base-button__left-icon{margin-right:0}.gb-base-button--circular .gb-base-button__inner .gb-base-button__right-icon{margin-left:0}.gb-base-button--circular.gb-base-button--nano{padding:6px}.gb-base-button--circular.gb-base-button--micro{padding:7px}.gb-base-button--circular.gb-base-button--mini{padding:8px}.gb-base-button--circular.gb-base-button--small{padding:9px}.gb-base-button--circular.gb-base-button--default{padding:10px}.gb-base-button--circular.gb-base-button--medium{padding:11px}.gb-base-button--circular.gb-base-button--large{padding:12px}.gb-base-button--disabled{opacity:.5;cursor:not-allowed}.gb-base-button--disabled .gb-base-button__inner{pointer-events:none}.gb-base-button--full-width{width:100%}.gb-base-button--link{border-color:transparent!important;background:0 0!important;text-decoration:underline}.gb-base-button--link:focus{text-decoration:none}.gb-base-button--loading{position:relative;opacity:1;cursor:wait}.gb-base-button--loading .gb-base-button__inner{opacity:0}.gb-base-button--loading .gb-base-button__spinner{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.gb-base-button--reverse{background-color:transparent}.gb-base-button--reverse:active,.gb-base-button--reverse:hover{transform:initial}.gb-base-button--rounded{border-radius:100px}.gb-base-button--rounded .gb-base-button__focuser{border-radius:100px}.gb-base-button--uppercase{text-transform:uppercase}.gb-base-button--dark{color:#fff}.gb-base-button--dark .gb-base-button__list .gb-base-button__item{border-color:#313d4f;background:#222c3c;color:#a9c7df}.gb-base-button--dark .gb-base-button__list .gb-base-button__item:first-of-type{border-top-color:#313d4f}.gb-base-button--dark .gb-base-button__list .gb-base-button__item:hover{background-color:#273142;color:#fff}.gb-base-button--dark.gb-base-button--black .gb-base-button__focuser{border-color:#25374f}.gb-base-button--dark.gb-base-button--black:not(.gb-base-button--reverse){background:#25374f radial-gradient(circle,transparent 1%,#25374f 1%) center/15000%}.gb-base-button--dark.gb-base-button--black:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#25374f}.gb-base-button--dark.gb-base-button--black:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#25374f}.gb-base-button--dark.gb-base-button--blue .gb-base-button__focuser{border-color:#0093ee}.gb-base-button--dark.gb-base-button--blue:not(.gb-base-button--reverse){background:#0093ee radial-gradient(circle,transparent 1%,#0093ee 1%) center/15000%}.gb-base-button--dark.gb-base-button--blue:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#22abff}.gb-base-button--dark.gb-base-button--blue:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#3cb4ff}.gb-base-button--dark.gb-base-button--green .gb-base-button__focuser{border-color:#96bf47}.gb-base-button--dark.gb-base-button--green:not(.gb-base-button--reverse){background:#96bf47 radial-gradient(circle,transparent 1%,#96bf47 1%) center/15000%}.gb-base-button--dark.gb-base-button--green:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#a1c65a}.gb-base-button--dark.gb-base-button--green:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#a1c65a}.gb-base-button--dark.gb-base-button--grey .gb-base-button__focuser{border-color:#a9c7df}.gb-base-button--dark.gb-base-button--grey:not(.gb-base-button--reverse){background:#a9c7df radial-gradient(circle,transparent 1%,#a9c7df 1%) center/15000%}.gb-base-button--dark.gb-base-button--grey:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#cedfed}.gb-base-button--dark.gb-base-button--grey:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#e1ebf4}.gb-base-button--dark.gb-base-button--orange .gb-base-button__focuser{border-color:#ffb610}.gb-base-button--dark.gb-base-button--orange:not(.gb-base-button--reverse){background:#ffb610 radial-gradient(circle,transparent 1%,#ffb610 1%) center/15000%}.gb-base-button--dark.gb-base-button--orange:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#ffc643}.gb-base-button--dark.gb-base-button--orange:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#ffcd5d}.gb-base-button--dark.gb-base-button--purple .gb-base-button__focuser{border-color:#ab7ef6}.gb-base-button--dark.gb-base-button--purple:not(.gb-base-button--reverse){background:#ab7ef6 radial-gradient(circle,transparent 1%,#ab7ef6 1%) center/15000%}.gb-base-button--dark.gb-base-button--purple:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#caaef9}.gb-base-button--dark.gb-base-button--purple:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#dac6fb}.gb-base-button--dark.gb-base-button--red .gb-base-button__focuser{border-color:#e0102b}.gb-base-button--dark.gb-base-button--red:not(.gb-base-button--reverse){background:#e0102b radial-gradient(circle,transparent 1%,#e0102b 1%) center/15000%}.gb-base-button--dark.gb-base-button--red:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#f0334b}.gb-base-button--dark.gb-base-button--red:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#f24a60}.gb-base-button--dark.gb-base-button--turquoise .gb-base-button__focuser{border-color:#26c1c9}.gb-base-button--dark.gb-base-button--turquoise:not(.gb-base-button--reverse){background:#26c1c9 radial-gradient(circle,transparent 1%,#26c1c9 1%) center/15000%}.gb-base-button--dark.gb-base-button--turquoise:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#46d5dc}.gb-base-button--dark.gb-base-button--turquoise:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#5bdae0}.gb-base-button--dark.gb-base-button--white .gb-base-button__focuser{border-color:#fff}.gb-base-button--dark.gb-base-button--white:not(.gb-base-button--reverse){background:#fff radial-gradient(circle,transparent 1%,#fff 1%) center/15000%;color:#25374f}.gb-base-button--dark.gb-base-button--white:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#e6e6e6}.gb-base-button--dark.gb-base-button--white:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#d9d9d9}.gb-base-button--dark.gb-base-button--yellow .gb-base-button__focuser{border-color:#ffc02a}.gb-base-button--dark.gb-base-button--yellow:not(.gb-base-button--reverse){background:#ffc02a radial-gradient(circle,transparent 1%,#ffc02a 1%) center/15000%}.gb-base-button--dark.gb-base-button--yellow:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#ffcf5d}.gb-base-button--dark.gb-base-button--yellow:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#ffd777}.gb-base-button--dark.gb-base-button--link.gb-base-button--black{color:#25374f}.gb-base-button--dark.gb-base-button--link.gb-base-button--blue{color:#0093ee}.gb-base-button--dark.gb-base-button--link.gb-base-button--green{color:#96bf47}.gb-base-button--dark.gb-base-button--link.gb-base-button--grey{color:#a9c7df}.gb-base-button--dark.gb-base-button--link.gb-base-button--orange{color:#ffb610}.gb-base-button--dark.gb-base-button--link.gb-base-button--purple{color:#ab7ef6}.gb-base-button--dark.gb-base-button--link.gb-base-button--red{color:#e0102b}.gb-base-button--dark.gb-base-button--link.gb-base-button--turquoise{color:#26c1c9}.gb-base-button--dark.gb-base-button--link.gb-base-button--white{color:#fff}.gb-base-button--dark.gb-base-button--link.gb-base-button--yellow{color:#ffc02a}.gb-base-button--dark.gb-base-button--reverse{color:#fff}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--black{border-color:#25374f}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--black:hover:not(.gb-base-button--disabled){border-color:#354f72}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--black:active:not(.gb-base-button--disabled){border-color:#151f2c}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--blue{border-color:#0093ee}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--blue:hover:not(.gb-base-button--disabled){border-color:#22abff}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--blue:active:not(.gb-base-button--disabled){border-color:#0074bb}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--green{border-color:#96bf47}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--green:hover:not(.gb-base-button--disabled){border-color:#accc6d}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--green:active:not(.gb-base-button--disabled){border-color:#7a9d36}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--grey{border-color:#a9c7df}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--grey:hover:not(.gb-base-button--disabled){border-color:#cedfed}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--grey:active:not(.gb-base-button--disabled){border-color:#84afd1}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--orange{border-color:#ffb610}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--orange:hover:not(.gb-base-button--disabled){border-color:#ffc643}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--orange:active:not(.gb-base-button--disabled){border-color:#dc9900}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--purple{border-color:#ab7ef6}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--purple:hover:not(.gb-base-button--disabled){border-color:#caaef9}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--purple:active:not(.gb-base-button--disabled){border-color:#8c4ef3}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--red{border-color:#e0102b}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--red:hover:not(.gb-base-button--disabled){border-color:#f0334b}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--red:active:not(.gb-base-button--disabled){border-color:#b00d22}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--turquoise{border-color:#26c1c9}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--turquoise:hover:not(.gb-base-button--disabled){border-color:#46d5dc}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--turquoise:active:not(.gb-base-button--disabled){border-color:#1e989e}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--white{border-color:#fff}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--white:hover:not(.gb-base-button--disabled){border-color:#fff}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--white:active:not(.gb-base-button--disabled){border-color:#e6e6e6}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--yellow{border-color:#ffc02a}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--yellow:hover:not(.gb-base-button--disabled){border-color:#ffcf5d}.gb-base-button--dark.gb-base-button--reverse.gb-base-button--yellow:active:not(.gb-base-button--disabled){border-color:#f6ad00}.gb-base-button--light{color:#fff}.gb-base-button--light .gb-base-button__list .gb-base-button__item{border-color:#c5d9e8;background:#fff;color:#434a54}.gb-base-button--light .gb-base-button__list .gb-base-button__item:first-of-type{border-top-color:#c5d9e8}.gb-base-button--light .gb-base-button__list .gb-base-button__item:hover{background-color:#fafbfc;color:#171e29}.gb-base-button--light.gb-base-button--black .gb-base-button__focuser{border-color:#2c405a}.gb-base-button--light.gb-base-button--black:not(.gb-base-button--reverse){background:#2c405a radial-gradient(circle,transparent 1%,#2c405a 1%) center/15000%}.gb-base-button--light.gb-base-button--black:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#2c405a}.gb-base-button--light.gb-base-button--black:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#2c405a}.gb-base-button--light.gb-base-button--blue .gb-base-button__focuser{border-color:#0079c4}.gb-base-button--light.gb-base-button--blue:not(.gb-base-button--reverse){background:#0079c4 radial-gradient(circle,transparent 1%,#0079c4 1%) center/15000%}.gb-base-button--light.gb-base-button--blue:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#0098f7}.gb-base-button--light.gb-base-button--blue:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#12a4ff}.gb-base-button--light.gb-base-button--green .gb-base-button__focuser{border-color:#81c926}.gb-base-button--light.gb-base-button--green:not(.gb-base-button--reverse){background:#81c926 radial-gradient(circle,transparent 1%,#81c926 1%) center/15000%}.gb-base-button--light.gb-base-button--green:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#8ed831}.gb-base-button--light.gb-base-button--green:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#8ed831}.gb-base-button--light.gb-base-button--grey .gb-base-button__focuser{border-color:#8eacc5}.gb-base-button--light.gb-base-button--grey:not(.gb-base-button--reverse){background:#8eacc5 radial-gradient(circle,transparent 1%,#8eacc5 1%) center/15000%}.gb-base-button--light.gb-base-button--grey:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#b0c5d6}.gb-base-button--light.gb-base-button--grey:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#c1d1df}.gb-base-button--light.gb-base-button--orange .gb-base-button__focuser{border-color:#fd7b1f}.gb-base-button--light.gb-base-button--orange:not(.gb-base-button--reverse){background:#fd7b1f radial-gradient(circle,transparent 1%,#fd7b1f 1%) center/15000%}.gb-base-button--light.gb-base-button--orange:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#fd9952}.gb-base-button--light.gb-base-button--orange:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#fea86b}.gb-base-button--light.gb-base-button--purple .gb-base-button__focuser{border-color:#ab7ef6}.gb-base-button--light.gb-base-button--purple:not(.gb-base-button--reverse){background:#ab7ef6 radial-gradient(circle,transparent 1%,#ab7ef6 1%) center/15000%}.gb-base-button--light.gb-base-button--purple:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#caaef9}.gb-base-button--light.gb-base-button--purple:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#dac6fb}.gb-base-button--light.gb-base-button--red .gb-base-button__focuser{border-color:#e0102b}.gb-base-button--light.gb-base-button--red:not(.gb-base-button--reverse){background:#e0102b radial-gradient(circle,transparent 1%,#e0102b 1%) center/15000%}.gb-base-button--light.gb-base-button--red:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#f0334b}.gb-base-button--light.gb-base-button--red:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#f24a60}.gb-base-button--light.gb-base-button--turquoise .gb-base-button__focuser{border-color:#26c1c9}.gb-base-button--light.gb-base-button--turquoise:not(.gb-base-button--reverse){background:#26c1c9 radial-gradient(circle,transparent 1%,#26c1c9 1%) center/15000%}.gb-base-button--light.gb-base-button--turquoise:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#46d5dc}.gb-base-button--light.gb-base-button--turquoise:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#5bdae0}.gb-base-button--light.gb-base-button--white .gb-base-button__focuser{border-color:#fff}.gb-base-button--light.gb-base-button--white:not(.gb-base-button--reverse){background:#fff radial-gradient(circle,transparent 1%,#fff 1%) center/15000%;color:#2c405a}.gb-base-button--light.gb-base-button--white:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#e6e6e6}.gb-base-button--light.gb-base-button--white:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#d9d9d9}.gb-base-button--light.gb-base-button--yellow .gb-base-button__focuser{border-color:#faca00}.gb-base-button--light.gb-base-button--yellow:not(.gb-base-button--reverse){background:#faca00 radial-gradient(circle,transparent 1%,#faca00 1%) center/15000%}.gb-base-button--light.gb-base-button--yellow:not(.gb-base-button--reverse):hover:not(.gb-base-button--disabled){background-color:#ffd72e}.gb-base-button--light.gb-base-button--yellow:not(.gb-base-button--reverse):active:not(.gb-base-button--disabled){background-color:#ffdc48}.gb-base-button--light.gb-base-button--link.gb-base-button--black{color:#2c405a}.gb-base-button--light.gb-base-button--link.gb-base-button--blue{color:#0079c4}.gb-base-button--light.gb-base-button--link.gb-base-button--green{color:#81c926}.gb-base-button--light.gb-base-button--link.gb-base-button--grey{color:#8eacc5}.gb-base-button--light.gb-base-button--link.gb-base-button--orange{color:#fd7b1f}.gb-base-button--light.gb-base-button--link.gb-base-button--purple{color:#ab7ef6}.gb-base-button--light.gb-base-button--link.gb-base-button--red{color:#e0102b}.gb-base-button--light.gb-base-button--link.gb-base-button--turquoise{color:#26c1c9}.gb-base-button--light.gb-base-button--link.gb-base-button--white{color:#fff}.gb-base-button--light.gb-base-button--link.gb-base-button--yellow{color:#faca00}.gb-base-button--light.gb-base-button--reverse{color:#171e29}.gb-base-button--light.gb-base-button--reverse.gb-base-button--black{border-color:#2c405a}.gb-base-button--light.gb-base-button--reverse.gb-base-button--black:hover:not(.gb-base-button--disabled){border-color:#3d587c}.gb-base-button--light.gb-base-button--reverse.gb-base-button--black:active:not(.gb-base-button--disabled){border-color:#1b2838}.gb-base-button--light.gb-base-button--reverse.gb-base-button--blue{border-color:#0079c4}.gb-base-button--light.gb-base-button--reverse.gb-base-button--blue:hover:not(.gb-base-button--disabled){border-color:#0098f7}.gb-base-button--light.gb-base-button--reverse.gb-base-button--blue:active:not(.gb-base-button--disabled){border-color:#005a91}.gb-base-button--light.gb-base-button--reverse.gb-base-button--green{border-color:#81c926}.gb-base-button--light.gb-base-button--reverse.gb-base-button--green:hover:not(.gb-base-button--disabled){border-color:#9adc46}.gb-base-button--light.gb-base-button--reverse.gb-base-button--green:active:not(.gb-base-button--disabled){border-color:#659e1e}.gb-base-button--light.gb-base-button--reverse.gb-base-button--grey{border-color:#8eacc5}.gb-base-button--light.gb-base-button--reverse.gb-base-button--grey:hover:not(.gb-base-button--disabled){border-color:#b0c5d6}.gb-base-button--light.gb-base-button--reverse.gb-base-button--grey:active:not(.gb-base-button--disabled){border-color:#6c93b4}.gb-base-button--light.gb-base-button--reverse.gb-base-button--orange{border-color:#fd7b1f}.gb-base-button--light.gb-base-button--reverse.gb-base-button--orange:hover:not(.gb-base-button--disabled){border-color:#fd9952}.gb-base-button--light.gb-base-button--reverse.gb-base-button--orange:active:not(.gb-base-button--disabled){border-color:#e76102}.gb-base-button--light.gb-base-button--reverse.gb-base-button--purple{border-color:#ab7ef6}.gb-base-button--light.gb-base-button--reverse.gb-base-button--purple:hover:not(.gb-base-button--disabled){border-color:#caaef9}.gb-base-button--light.gb-base-button--reverse.gb-base-button--purple:active:not(.gb-base-button--disabled){border-color:#8c4ef3}.gb-base-button--light.gb-base-button--reverse.gb-base-button--red{border-color:#e0102b}.gb-base-button--light.gb-base-button--reverse.gb-base-button--red:hover:not(.gb-base-button--disabled){border-color:#f0334b}.gb-base-button--light.gb-base-button--reverse.gb-base-button--red:active:not(.gb-base-button--disabled){border-color:#b00d22}.gb-base-button--light.gb-base-button--reverse.gb-base-button--turquoise{border-color:#26c1c9}.gb-base-button--light.gb-base-button--reverse.gb-base-button--turquoise:hover:not(.gb-base-button--disabled){border-color:#46d5dc}.gb-base-button--light.gb-base-button--reverse.gb-base-button--turquoise:active:not(.gb-base-button--disabled){border-color:#1e989e}.gb-base-button--light.gb-base-button--reverse.gb-base-button--white{border-color:#fff}.gb-base-button--light.gb-base-button--reverse.gb-base-button--white:hover:not(.gb-base-button--disabled){border-color:#fff}.gb-base-button--light.gb-base-button--reverse.gb-base-button--white:active:not(.gb-base-button--disabled){border-color:#e6e6e6}.gb-base-button--light.gb-base-button--reverse.gb-base-button--yellow{border-color:#faca00}.gb-base-button--light.gb-base-button--reverse.gb-base-button--yellow:hover:not(.gb-base-button--disabled){border-color:#ffd72e}.gb-base-button--light.gb-base-button--reverse.gb-base-button--yellow:active:not(.gb-base-button--disabled){border-color:#c7a100}.gb-base-button:active:not(.gb-base-button--disabled){background-size:100%;transition:background 0s}.gb-base-button:focus{outline:0}.gb-base-button:focus:not(.gb-base-button--disabled) .gb-base-button__focuser{opacity:1}.fade-in{animation-name:fadeIn;animation-duration:250ms;animation-fill-mode:both}.fade-out{animation-name:fadeOut;animation-duration:250ms;animation-fill-mode:both}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{from{opacity:1}to{opacity:0}}',map:void 0,media:void 0})}),{components:{BaseIcon:d,BaseSpinner:f},mixins:[g],props:{circular:{type:Boolean,default:!1},color:{type:String,default:"blue",validator:e=>["black","blue","green","grey","orange","purple","red","turquoise","white","yellow"].includes(e)},confirmation:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},fullWidth:{type:Boolean,default:!1},href:{type:String,default:null},id:{type:String,default:null},leftIcon:{type:String,default:null},leftIconColor:{type:String,default:null},leftIconOutlined:{type:Boolean,default:!1},link:{type:Boolean,default:!1},list:{type:Array,default:null,validator:e=>e.length>0},loading:{type:Boolean,default:!1},reverse:{type:Boolean,default:!1},rightIcon:{type:String,default:null},rightIconColor:{type:String,default:null},rightIconOutlined:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},size:{type:String,default:"default",validator:e=>["nano","micro","mini","small","default","medium","large"].includes(e)},type:{type:String,default:"button",validator:e=>["button","reset","submit"].includes(e)},uppercase:{type:Boolean,default:!1}},data:()=>({confirming:!1,listOpened:!1}),computed:{computedIconSize(){return"nano"===this.size?"10px":"micro"===this.size?"12px":"mini"===this.size?"14px":"small"===this.size?"16px":"default"===this.size?"18px":"medium"===this.size?"20px":"large"===this.size?"22px":null},computedRightIcon(){return this.list&&!this.circular?this.listOpened?"arrow_drop_up":"arrow_drop_down":this.rightIcon},computedSpinnerColor(){return"white"===this.color?"black":"white"}},methods:{onClick(e){this.confirmation&&(this.confirming&&this.$emit("confirm",this.id,e),this.confirming=!this.confirming),this.list&&(this.listOpened=!this.listOpened),this.$emit("click",this.id,e)},onDoubleClick(e){this.$emit("dblclick",this.id,e)},onItemClick(e,i){this.$emit("itemclick",this.id,e,i)},onMouseDown(e){this.$emit("mousedown",this.id,e)},onMouseEnter(e){this.$emit("mouseenter",this.id,e)},onMouseLeave(e){this.$emit("mouseleave",this.id,e)},onMouseMove(e){this.$emit("mousemove",this.id,e)},onMouseOut(e){this.$emit("mouseout",this.id,e)},onMouseOver(e){this.$emit("mouseover",this.id,e)},onMouseUp(e){this.$emit("mouseup",this.id,e)}}},void 0,!1,void 0,!1,b,void 0,void 0);const u=a({render:function(){var e,i=this.$createElement;return(this._self._c||i)("hr",{class:["gb-base-divider","gb-base-divider--"+this.size,"gb-base-divider--"+this.computedTheme,(e={},e["gb-base-divider--"+this.color]=this.color,e)],style:{margin:this.margin}})},staticRenderFns:[]},(function(e){e&&e("data-v-764d3f16_0",{source:".gb-base-divider{display:block;border:0;border-top-style:solid}.gb-base-divider--small{margin:20px auto;width:60px;height:4px;border-top-width:4px}.gb-base-divider--large{margin:40px auto;width:100%;height:1px;border-top-width:1px}.gb-base-divider--dark{border-top-color:#313d4f}.gb-base-divider--dark.gb-base-divider--black{border-top-color:#25374f}.gb-base-divider--dark.gb-base-divider--blue{border-top-color:#0093ee}.gb-base-divider--dark.gb-base-divider--green{border-top-color:#96bf47}.gb-base-divider--dark.gb-base-divider--grey{border-top-color:#a9c7df}.gb-base-divider--dark.gb-base-divider--orange{border-top-color:#ffb610}.gb-base-divider--dark.gb-base-divider--purple{border-top-color:#ab7ef6}.gb-base-divider--dark.gb-base-divider--red{border-top-color:#e0102b}.gb-base-divider--dark.gb-base-divider--turquoise{border-top-color:#26c1c9}.gb-base-divider--dark.gb-base-divider--white{border-top-color:#fff}.gb-base-divider--dark.gb-base-divider--yellow{border-top-color:#ffc02a}.gb-base-divider--light{border-top-color:#c5d9e8}.gb-base-divider--light.gb-base-divider--black{border-top-color:#2c405a}.gb-base-divider--light.gb-base-divider--blue{border-top-color:#0079c4}.gb-base-divider--light.gb-base-divider--green{border-top-color:#81c926}.gb-base-divider--light.gb-base-divider--grey{border-top-color:#8eacc5}.gb-base-divider--light.gb-base-divider--orange{border-top-color:#fd7b1f}.gb-base-divider--light.gb-base-divider--purple{border-top-color:#ab7ef6}.gb-base-divider--light.gb-base-divider--red{border-top-color:#e0102b}.gb-base-divider--light.gb-base-divider--turquoise{border-top-color:#26c1c9}.gb-base-divider--light.gb-base-divider--white{border-top-color:#fff}.gb-base-divider--light.gb-base-divider--yellow{border-top-color:#faca00}",map:void 0,media:void 0})}),{mixins:[g],props:{color:{type:String,default:null,validator:e=>["black","blue","green","grey","orange","purple","red","turquoise","white","yellow"].includes(e)},margin:{type:String,default:null},size:{type:String,default:"large",validator:e=>["small","large"].includes(e)}}},void 0,!1,void 0,!1,b,void 0,void 0);const p=a({render:function(){var e,i=this,t=i.$createElement;return(i._self._c||t)(i.tag,{tag:"component",class:["gb-base-heading","gb-base-heading--"+i.tag,"gb-base-heading--"+i.computedTheme,(e={},e["gb-base-heading--"+i.color]=i.color,e["gb-base-heading--weight-"+i.weight]=i.weight,e["gb-base-heading--uppercase"]=i.uppercase,e)],on:{click:i.onClick}},[i._t("default")],2)},staticRenderFns:[]},(function(e){e&&e("data-v-9bdb73f4_0",{source:'.gb-base-heading{margin:0;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif}.gb-base-heading--h1{font-weight:700;font-size:26px;line-height:36px}.gb-base-heading--h2{font-weight:500;font-size:24px;line-height:34px}.gb-base-heading--h3{font-weight:500;font-size:22px;line-height:32px}.gb-base-heading--h4{font-weight:500;font-size:20px;line-height:30px}.gb-base-heading--h5{font-weight:500;font-size:18px;line-height:28px}.gb-base-heading--h6{font-weight:500;font-size:16px;line-height:26px}.gb-base-heading--p{margin-bottom:20px;font-weight:400;font-size:16px;line-height:26px}.gb-base-heading--small{margin-bottom:20px;font-weight:400;font-size:14px;line-height:24px}.gb-base-heading--weight-thin{font-weight:100}.gb-base-heading--weight-light{font-weight:300}.gb-base-heading--weight-regular{font-weight:400}.gb-base-heading--weight-medium{font-weight:500}.gb-base-heading--weight-bold{font-weight:700}.gb-base-heading--weight-extrabold{font-weight:800}.gb-base-heading--weight-black{font-weight:900}.gb-base-heading--uppercase{text-transform:uppercase}.gb-base-heading--dark{color:#fff}.gb-base-heading--dark.gb-base-heading--h1,.gb-base-heading--dark.gb-base-heading--h2,.gb-base-heading--dark.gb-base-heading--p,.gb-base-heading--dark.gb-base-heading--small{color:#fff}.gb-base-heading--dark.gb-base-heading--h3,.gb-base-heading--dark.gb-base-heading--h4,.gb-base-heading--dark.gb-base-heading--h5,.gb-base-heading--dark.gb-base-heading--h6{color:#a9c7df}.gb-base-heading--dark.gb-base-heading--black{color:#25374f}.gb-base-heading--dark.gb-base-heading--blue{color:#0093ee}.gb-base-heading--dark.gb-base-heading--green{color:#96bf47}.gb-base-heading--dark.gb-base-heading--grey{color:#a9c7df}.gb-base-heading--dark.gb-base-heading--orange{color:#ffb610}.gb-base-heading--dark.gb-base-heading--red{color:#e0102b}.gb-base-heading--dark.gb-base-heading--white{color:#fff}.gb-base-heading--light{color:#171e29}.gb-base-heading--light.gb-base-heading--h1,.gb-base-heading--light.gb-base-heading--h2,.gb-base-heading--light.gb-base-heading--p,.gb-base-heading--light.gb-base-heading--small{color:#171e29}.gb-base-heading--light.gb-base-heading--h3,.gb-base-heading--light.gb-base-heading--h4,.gb-base-heading--light.gb-base-heading--h5,.gb-base-heading--light.gb-base-heading--h6{color:#434a54}.gb-base-heading--light.gb-base-heading--black{color:#2c405a}.gb-base-heading--light.gb-base-heading--blue{color:#0079c4}.gb-base-heading--light.gb-base-heading--green{color:#81c926}.gb-base-heading--light.gb-base-heading--grey{color:#8eacc5}.gb-base-heading--light.gb-base-heading--orange{color:#fd7b1f}.gb-base-heading--light.gb-base-heading--red{color:#e0102b}.gb-base-heading--light.gb-base-heading--white{color:#fff}',map:void 0,media:void 0})}),{mixins:[g],props:{color:{type:String,default:null,validator:e=>["black","blue","green","grey","orange","red","white"].includes(e)},tag:{type:String,required:!0,validator:e=>["h1","h2","h3","h4","h5","h6","p","small"].includes(e)},uppercase:{type:Boolean,default:!1},weight:{type:String,default:null,validator:e=>["thin","light","regular","medium","bold","extrabold","black"].includes(e)}},methods:{onClick(){this.$emit("click")}}},void 0,!1,void 0,!1,b,void 0,void 0);const h=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("span",{class:["gb-base-number","gb-base-number--"+e.color,"gb-base-number--"+e.size,"gb-base-number--"+e.computedTheme],style:{backgroundImage:e.image?"url("+e.image+")":null,borderColor:e.colorHex}},[e.icon?t("base-icon",{staticClass:"gb-base-number__icon",attrs:{color:e.iconColor,name:e.icon,size:e.iconSize}}):e.number?t("span",{staticClass:"gb-base-number__number"},[e._v(e._s(e.number))]):e._e()],1)},staticRenderFns:[]},(function(e){e&&e("data-v-1f134a1a_0",{source:".gb-base-number{display:flex;align-items:center;justify-content:center;box-sizing:border-box;border-width:3px;border-style:solid;border-radius:100%;background-size:cover;user-select:none}.gb-base-number .gb-base-number__number{font-weight:800}.gb-base-number--small{width:32px;height:32px;font-size:14px}.gb-base-number--default{width:40px;height:40px;font-size:16px}.gb-base-number--dark{box-shadow:0 1px 5px 0 #171e29;color:#fff}.gb-base-number--dark.gb-base-number--black{border-color:#25374f}.gb-base-number--dark.gb-base-number--blue{border-color:#0093ee}.gb-base-number--dark.gb-base-number--green{border-color:#96bf47}.gb-base-number--dark.gb-base-number--orange{border-color:#ffb610}.gb-base-number--dark.gb-base-number--purple{border-color:#ab7ef6}.gb-base-number--dark.gb-base-number--red{border-color:#e0102b}.gb-base-number--dark.gb-base-number--turquoise{border-color:#26c1c9}.gb-base-number--dark.gb-base-number--white{border-color:#fff}.gb-base-number--light{box-shadow:0 1px 5px 0 #eaf6ff;color:#171e29}.gb-base-number--light.gb-base-number--black{border-color:#2c405a}.gb-base-number--light.gb-base-number--blue{border-color:#0079c4}.gb-base-number--light.gb-base-number--green{border-color:#81c926}.gb-base-number--light.gb-base-number--orange{border-color:#fd7b1f}.gb-base-number--light.gb-base-number--purple{border-color:#ab7ef6}.gb-base-number--light.gb-base-number--red{border-color:#e0102b}.gb-base-number--light.gb-base-number--turquoise{border-color:#26c1c9}.gb-base-number--light.gb-base-number--white{border-color:#fff}",map:void 0,media:void 0})}),{components:{BaseIcon:d},mixins:[g],props:{color:{type:String,default:"blue",validator:e=>["black","blue","green","orange","purple","red","turquoise","white"].includes(e)},colorHex:{type:String,default:null},icon:{type:String,default:null},iconColor:{type:String,default:null},iconSize:{type:String,default:"22px"},image:{type:String,default:null},number:{type:Number,default:null},size:{type:String,default:"default",validator:e=>["small","default"].includes(e)}}},void 0,!1,void 0,!1,b,void 0,void 0);const m=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{class:["gb-base-progress-bar","gb-base-progress-bar--"+e.color,"gb-base-progress-bar--"+e.computedTheme,{"gb-base-progress-bar--with-details-hover":e.detailsHover}]},[e.title||e.details?t("span",{staticClass:"gb-base-progress-bar__content"},[e.title?t("span",{staticClass:"gb-base-progress-bar__title"},[e._v(e._s(e.title))]):e._e(),e.details?t("span",{staticClass:"gb-base-progress-bar__details"},[e._v(e._s(e.details))]):e._e(),e.detailsHover?t("span",{staticClass:"gb-base-progress-bar__details-hover"},[e._v(e._s(e.detailsHover))]):e._e()]):e._e(),t("div",{staticClass:"gb-base-progress-bar__bar"},[t("div",{staticClass:"gb-base-progress-bar__progress",style:{width:e.safeProgress+"%"}})])])},staticRenderFns:[]},(function(e){e&&e("data-v-15590613_0",{source:'.gb-base-progress-bar{text-align:left;font-size:14px;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif;user-select:none}.gb-base-progress-bar .gb-base-progress-bar__content{display:flex;margin-bottom:10px}.gb-base-progress-bar .gb-base-progress-bar__content .gb-base-progress-bar__details,.gb-base-progress-bar .gb-base-progress-bar__content .gb-base-progress-bar__details-hover,.gb-base-progress-bar .gb-base-progress-bar__content .gb-base-progress-bar__title{flex:1;line-height:22px}.gb-base-progress-bar .gb-base-progress-bar__content .gb-base-progress-bar__title{text-transform:uppercase;font-weight:700}.gb-base-progress-bar .gb-base-progress-bar__content .gb-base-progress-bar__details,.gb-base-progress-bar .gb-base-progress-bar__content .gb-base-progress-bar__details-hover{text-align:right}.gb-base-progress-bar .gb-base-progress-bar__bar{overflow:hidden;height:6px;border-radius:10px}.gb-base-progress-bar .gb-base-progress-bar__bar .gb-base-progress-bar__progress{width:0;height:100%;border-radius:10px;transition:width .5s linear;animation:fillUp .5s linear 0s 1}.gb-base-progress-bar--with-details-hover .gb-base-progress-bar__content .gb-base-progress-bar__details-hover{display:none}.gb-base-progress-bar--with-details-hover:hover .gb-base-progress-bar__content .gb-base-progress-bar__details{display:none}.gb-base-progress-bar--with-details-hover:hover .gb-base-progress-bar__content .gb-base-progress-bar__details-hover{display:block}.gb-base-progress-bar--dark .gb-base-progress-bar__content{color:#fff}.gb-base-progress-bar--dark .gb-base-progress-bar__bar .gb-base-progress-bar__progress{box-shadow:0 1px 5px 0 #171e29}.gb-base-progress-bar--dark.gb-base-progress-bar--black .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#25374f}.gb-base-progress-bar--dark.gb-base-progress-bar--blue .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#0093ee}.gb-base-progress-bar--dark.gb-base-progress-bar--green .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#96bf47}.gb-base-progress-bar--dark.gb-base-progress-bar--grey .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#a9c7df}.gb-base-progress-bar--dark.gb-base-progress-bar--orange .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#ffb610}.gb-base-progress-bar--dark.gb-base-progress-bar--purple .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#ab7ef6}.gb-base-progress-bar--dark.gb-base-progress-bar--red .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#e0102b}.gb-base-progress-bar--dark.gb-base-progress-bar--turquoise .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#26c1c9}.gb-base-progress-bar--dark.gb-base-progress-bar--white .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#fff}.gb-base-progress-bar--dark.gb-base-progress-bar--yellow .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#ffc02a}.gb-base-progress-bar--light .gb-base-progress-bar__content{color:#171e29}.gb-base-progress-bar--light .gb-base-progress-bar__bar .gb-base-progress-bar__progress{box-shadow:0 1px 5px 0 #eaf6ff}.gb-base-progress-bar--light.gb-base-progress-bar--black .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#2c405a}.gb-base-progress-bar--light.gb-base-progress-bar--blue .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#0079c4}.gb-base-progress-bar--light.gb-base-progress-bar--green .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#81c926}.gb-base-progress-bar--light.gb-base-progress-bar--grey .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#8eacc5}.gb-base-progress-bar--light.gb-base-progress-bar--orange .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#fd7b1f}.gb-base-progress-bar--light.gb-base-progress-bar--purple .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#ab7ef6}.gb-base-progress-bar--light.gb-base-progress-bar--red .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#e0102b}.gb-base-progress-bar--light.gb-base-progress-bar--turquoise .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#26c1c9}.gb-base-progress-bar--light.gb-base-progress-bar--white .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#fff}.gb-base-progress-bar--light.gb-base-progress-bar--yellow .gb-base-progress-bar__bar .gb-base-progress-bar__progress{background-color:#faca00}@keyframes fillUp{0%{transform:translateX(-100%)}100%{transform:translateX(0)}}',map:void 0,media:void 0})}),{mixins:[g],props:{color:{type:String,default:"blue",validator:e=>["black","blue","green","grey","orange","purple","red","turquoise","white","yellow"].includes(e)},details:{type:String,default:null},detailsHover:{type:String,default:null},title:{type:String,default:null},progress:{type:Number,default:0,validator:e=>e>=0&&e<=100}},computed:{safeProgress(){return this.progress<0?0:this.progress<=100?this.progress:100}}},void 0,!1,void 0,!1,b,void 0,void 0);const k=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{class:["gb-base-toast","gb-base-toast--"+e.color,"gb-base-toast--"+e.computedTheme],style:{width:e.width}},[e.$slots.default&&e.$slots.default[0].text.trim()?t("span",{staticClass:"gb-base-toast__slot"},[e._t("default")],2):e._e(),e.closable?t("base-icon",{staticClass:"gb-base-toast__icon",attrs:{name:"close",size:"20px",tabindex:"0"},on:{click:e.onClose,keypress:e.onTabKeypress}}):e._e()],1)},staticRenderFns:[]},(function(e){e&&e("data-v-136c0c10_0",{source:'.gb-base-toast{display:flex;align-items:center;padding:14px 20px;border-radius:3px;text-align:left;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif;transition:all 250ms linear;-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent}.gb-base-toast .gb-base-toast__icon{flex:0 0 auto;margin-left:20px;outline:0;border-radius:100%;transition:all 250ms linear}.gb-base-toast .gb-base-toast__slot{flex:1;font-size:16px;line-height:22px}.gb-base-toast--dark{color:#fff;box-shadow:0 1px 5px 0 #171e29}.gb-base-toast--dark.gb-base-toast--black{background-color:#25374f}.gb-base-toast--dark.gb-base-toast--black .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--black .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #25374f,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--blue{background-color:#0093ee}.gb-base-toast--dark.gb-base-toast--blue .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--blue .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #0093ee,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--green{background-color:#96bf47}.gb-base-toast--dark.gb-base-toast--green .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--green .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #96bf47,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--grey{background-color:#a9c7df}.gb-base-toast--dark.gb-base-toast--grey .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--grey .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #a9c7df,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--orange{background-color:#ffb610}.gb-base-toast--dark.gb-base-toast--orange .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--orange .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #ffb610,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--purple{background-color:#ab7ef6}.gb-base-toast--dark.gb-base-toast--purple .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--purple .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #ab7ef6,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--red{background-color:#e0102b}.gb-base-toast--dark.gb-base-toast--red .gb-base-toast__icon:hover{color:#25374f!important}.gb-base-toast--dark.gb-base-toast--red .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #e0102b,0 0 0 3px #25374f;color:#25374f!important}.gb-base-toast--dark.gb-base-toast--turquoise{background-color:#26c1c9}.gb-base-toast--dark.gb-base-toast--turquoise .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--turquoise .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #26c1c9,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--white{background-color:#fff;color:#25374f}.gb-base-toast--dark.gb-base-toast--white .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--white .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #fff,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--yellow{background-color:#ffc02a}.gb-base-toast--dark.gb-base-toast--yellow .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--dark.gb-base-toast--yellow .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #ffc02a,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--light{color:#fff;box-shadow:0 1px 5px 0 #eaf6ff}.gb-base-toast--light.gb-base-toast--black{background-color:#2c405a}.gb-base-toast--light.gb-base-toast--black .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--light.gb-base-toast--black .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #2c405a,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--light.gb-base-toast--blue{background-color:#0079c4}.gb-base-toast--light.gb-base-toast--blue .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--light.gb-base-toast--blue .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #0079c4,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--light.gb-base-toast--green{background-color:#81c926}.gb-base-toast--light.gb-base-toast--green .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--light.gb-base-toast--green .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #81c926,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--light.gb-base-toast--grey{background-color:#8eacc5}.gb-base-toast--light.gb-base-toast--grey .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--light.gb-base-toast--grey .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #8eacc5,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--light.gb-base-toast--orange{background-color:#fd7b1f}.gb-base-toast--light.gb-base-toast--orange .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--light.gb-base-toast--orange .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #fd7b1f,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--light.gb-base-toast--purple{background-color:#ab7ef6}.gb-base-toast--light.gb-base-toast--purple .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--light.gb-base-toast--purple .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #ab7ef6,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--light.gb-base-toast--red{background-color:#e0102b}.gb-base-toast--light.gb-base-toast--red .gb-base-toast__icon:hover{color:#2c405a!important}.gb-base-toast--light.gb-base-toast--red .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #e0102b,0 0 0 3px #2c405a;color:#2c405a!important}.gb-base-toast--light.gb-base-toast--turquoise{background-color:#26c1c9}.gb-base-toast--light.gb-base-toast--turquoise .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--light.gb-base-toast--turquoise .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #26c1c9,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--light.gb-base-toast--white{background-color:#fff;color:#2c405a}.gb-base-toast--light.gb-base-toast--white .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--light.gb-base-toast--white .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #fff,0 0 0 3px #e0102b;color:#e0102b!important}.gb-base-toast--light.gb-base-toast--yellow{background-color:#faca00}.gb-base-toast--light.gb-base-toast--yellow .gb-base-toast__icon:hover{color:#e0102b!important}.gb-base-toast--light.gb-base-toast--yellow .gb-base-toast__icon:focus{box-shadow:0 0 0 2px #faca00,0 0 0 3px #e0102b;color:#e0102b!important}',map:void 0,media:void 0})}),{components:{BaseIcon:d},mixins:[g],props:{closable:{type:Boolean,default:!0},color:{type:String,default:"blue",validator:e=>["black","blue","green","grey","orange","purple","red","turquoise","white","yellow"].includes(e)},width:{type:String,default:"225px"}},methods:{onClose(e){this.$emit("close",e)},onTabKeypress(e,i){i.preventDefault(),"Space"===i.code&&i.target.click()}}},void 0,!1,void 0,!1,b,void 0,void 0);var x={props:{size:{type:String,default:"default",validator:e=>["mini","small","default","medium","large"].includes(e)}}};const v=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("label",{class:["gb-field-label","gb-field-label--"+e.size,"gb-field-label--"+e.computedTheme,{"gb-field-label--clickable":e.$listeners.click||e.forField,"gb-field-label--uppercase":e.uppercase}],attrs:{for:e.forField},on:{click:e.onClick}},[e._t("default"),e.required?t("span",{staticClass:"gb-field-label__required"},[e._v("*")]):e._e()],2)},staticRenderFns:[]},(function(e){e&&e("data-v-31ced116_0",{source:'.gb-field-label{display:block;margin-bottom:10px;font-weight:500;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif;user-select:none;-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent}.gb-field-label .gb-field-label__required{margin-left:5px}.gb-field-label--mini{font-size:12px;line-height:14px}.gb-field-label--small{font-size:13px;line-height:16px}.gb-field-label--default{font-size:14px;line-height:18px}.gb-field-label--medium{font-size:15px;line-height:20px}.gb-field-label--large{font-size:16px;line-height:22px}.gb-field-label--clickable{cursor:pointer}.gb-field-label--uppercase{text-transform:uppercase}.gb-field-label--dark{color:#a9c7df}.gb-field-label--dark .gb-field-label__required{color:#e0102b}.gb-field-label--light{color:#434a54}.gb-field-label--light .gb-field-label__required{color:#e0102b}',map:void 0,media:void 0})}),{mixins:[x,g],props:{forField:{type:String,default:null},required:{type:Boolean,default:!1},uppercase:{type:Boolean,default:!0}},methods:{onClick(e){this.$emit("click",e)}}},void 0,!1,void 0,!1,b,void 0,void 0);const w=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("p",{class:["gb-field-message","gb-field-message--"+e.size,"gb-field-message--"+e.status,"gb-field-message--"+e.computedTheme]},[e.computedIconName?t("base-icon",{staticClass:"gb-field-message__icon",attrs:{name:e.computedIconName,size:e.computedIconSize}}):e._e(),t("span",{staticClass:"gb-field-message__message",domProps:{innerHTML:e._s(e.message)}})],1)},staticRenderFns:[]},(function(e){e&&e("data-v-fd40b654_0",{source:'.gb-field-message{display:flex;align-items:center;margin:0;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif}.gb-field-message .gb-field-message__icon{margin-top:-2px;margin-right:5px}.gb-field-message--mini{margin-top:8px}.gb-field-message--mini .gb-field-message__message{font-size:12px;line-height:16px}.gb-field-message--small{margin-top:9px}.gb-field-message--small .gb-field-message__message{font-size:13px;line-height:18px}.gb-field-message--default{margin-top:10px}.gb-field-message--default .gb-field-message__message{font-size:14px;line-height:20px}.gb-field-message--medium{margin-top:11px}.gb-field-message--medium .gb-field-message__message{font-size:15px;line-height:22px}.gb-field-message--large{margin-top:12px}.gb-field-message--large .gb-field-message__message{font-size:16px;line-height:24px}.gb-field-message--dark.gb-field-message--description{color:#8eacc5}.gb-field-message--dark.gb-field-message--error{color:#e0102b}.gb-field-message--dark.gb-field-message--info{color:#0093ee}.gb-field-message--dark.gb-field-message--success{color:#96bf47}.gb-field-message--dark.gb-field-message--warning{color:#ffc02a}.gb-field-message--light.gb-field-message--description{color:#8eacc5}.gb-field-message--light.gb-field-message--error{color:#e0102b}.gb-field-message--light.gb-field-message--info{color:#0079c4}.gb-field-message--light.gb-field-message--success{color:#81c926}.gb-field-message--light.gb-field-message--warning{color:#fd7b1f}',map:void 0,media:void 0})}),{components:{BaseIcon:d},mixins:[x,g],props:{message:{type:String,default:null},status:{type:String,default:"description",validator:e=>["description","error","info","success","warning"].includes(e)}},computed:{computedIconName(){return"error"===this.status?"error":"info"===this.status?"info":"success"===this.status?"check_circle":"warning"===this.status?"warning":null},computedIconSize(){return"mini"===this.size?"15px":"small"===this.size?"16px":"default"===this.size?"17px":"medium"===this.size?"18px":"large"===this.size?"19px":null}}},void 0,!1,void 0,!1,b,void 0,void 0);var y={components:{BaseIcon:d,FieldLabel:v,FieldMessage:w},props:{autofocus:{type:Boolean,default:!1},description:{type:String,default:null},disabled:{type:Boolean,default:!1},error:{type:String,default:null},fullWidth:{type:Boolean,default:!1},info:{type:String,default:null},label:{type:String,default:null},name:{type:String,default:null},required:{type:Boolean,default:!1},status:{type:String,default:"normal",validator:e=>["error","normal","success","warning"].includes(e)},success:{type:String,default:null},validation:{type:Object,default:null},warning:{type:String,default:null}},data:()=>({innerValue:null,uuid:""}),computed:{computedStatus(){return this.error||this.validationMessage?"error":this.success?"success":this.warning?"warning":this.status},fieldMessageContent(){return this.validationMessage?this.validationMessage:this.error?this.error:this.success?this.success:this.warning?this.warning:this.info?this.info:this.description?this.description:void 0},fieldMessageStatus(){return this.error||this.validationMessage?"error":this.success?"success":this.warning?"warning":this.info?"info":this.description?"description":void 0},validationMessage(){let e="";if(this.validation&&this.validation.$dirty)if(!1===this.validation.required||!1===this.validation.requiredIf||!1===this.validation.requiredUnless)e="A value is required.";else if(!1===this.validation.minLength){e=`The value is too short (min: ${this.validation.$params.minLength.min}).`}else if(!1===this.validation.maxLength){e=`This value is too long (max ${this.validation.$params.maxLength.max}).`}else if(!1===this.validation.minValue){e=`Minimum value allowed: ${this.validation.$params.minValue.min}.`}else if(!1===this.validation.maxValue){e=`Maximum value allowed: ${this.validation.$params.maxValue.max}.`}else if(!1===this.validation.between){const i=this.validation.$params.between.max;e=`Value should be between ${this.validation.$params.between.min} and ${i}.`}else if(!1===this.validation.alpha)e="The value accepts only alphabet characters.";else if(!1===this.validation.alphaNum)e="The value accepts only alphanumerics.";else if(!1===this.validation.numeric)e="The value accepts only numerics.";else if(!1===this.validation.integer)e="The value accepts only positive and negative integers.";else if(!1===this.validation.decimal)e="The value accepts only positive and negative decimal numbers.";else if(!1===this.validation.email)e="The value is not a valid email.";else if(!1===this.validation.ipAddress)e="The value accepts only valid IPv4 addresses.";else if(!1===this.validation.macAddress)e="The value accepts only valid MAC addresses.";else if(!1===this.validation.sameAs){e=`The value does not match: ${this.validation.$params.sameAs.eq}.`}else!1===this.validation.url?e="The value is not a valid url.":!0===this.validation.$invalid&&(e="The value is invalid.");return e}},watch:{value:{immediate:!0,handler(e){this.innerValue=this.value}}},mounted(){const e=function(){let e=!1;return(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))&&(e=!0),e}();this.uuid=function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}(),this.autofocus&&!e&&this.focus()},methods:{focus(){this.$el.querySelector(".js-tag-for-autofocus").focus()}}};const z=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{class:["gb-field-checkbox","gb-field-checkbox--"+e.size,"gb-field-checkbox--"+e.computedTheme,"gb-field-checkbox--"+e.computedStatus,{"gb-field-checkbox--disabled":e.disabled,"gb-field-checkbox--full-width":e.fullWidth}]},[t("div",{class:["gb-field-checkbox__container","js-tag-for-autofocus",{"gb-field-checkbox__container--active":e.innerValue}],attrs:{tabindex:"0"},on:{keypress:function(i){return i.preventDefault(),e.onKeypress(i)}}},[t("div",{staticClass:"gb-field-checkbox__field",on:{click:e.onClick}},[t("span",{staticClass:"gb-field-checkbox__focuser"}),t("span",{staticClass:"gb-field-checkbox__tick"})]),e.label?t("field-label",{staticClass:"gb-field-checkbox__label",attrs:{required:e.required,size:e.size,theme:e.theme,uppercase:!1},on:{click:e.onClick}},[e._v(e._s(e.label))]):e._e()],1),e.fieldMessageStatus?t("field-message",{attrs:{message:e.fieldMessageContent,size:e.size,status:e.fieldMessageStatus,theme:e.theme}}):e._e()],1)},staticRenderFns:[]},(function(e){e&&e("data-v-6eee7c1e_0",{source:'.gb-field-checkbox{display:inline-block;text-align:left;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif}.gb-field-checkbox .gb-field-checkbox__container{display:flex;align-items:center;outline:0}.gb-field-checkbox .gb-field-checkbox__container .gb-field-checkbox__field{position:relative;display:flex;align-items:center;justify-content:center;border-width:1px;border-style:solid;border-radius:3px;transition:all linear 250ms;cursor:pointer}.gb-field-checkbox .gb-field-checkbox__container .gb-field-checkbox__field .gb-field-checkbox__focuser{position:absolute;top:-4px;right:-4px;bottom:-4px;left:-4px;border-width:1px;border-style:solid;border-color:transparent;border-radius:5px;opacity:0;transition:all linear 250ms}.gb-field-checkbox .gb-field-checkbox__container .gb-field-checkbox__field .gb-field-checkbox__tick{flex:0 0 auto;margin-top:-2px;border-width:2px;border-style:solid;border-top:none;border-left:none;transition:all linear 250ms;transform:rotate(45deg)}.gb-field-checkbox .gb-field-checkbox__container .gb-field-checkbox__label{flex:1;margin-top:2px;margin-bottom:0;font-weight:400}.gb-field-checkbox .gb-field-checkbox__container:focus .gb-field-checkbox__field .gb-field-checkbox__focuser{opacity:1}.gb-field-checkbox--mini .gb-field-checkbox__container .gb-field-checkbox__field{margin-right:6px;width:12px;height:12px}.gb-field-checkbox--mini .gb-field-checkbox__container .gb-field-checkbox__field .gb-field-checkbox__tick{width:3px;height:6px}.gb-field-checkbox--small .gb-field-checkbox__container .gb-field-checkbox__field{margin-right:7px;width:14px;height:14px}.gb-field-checkbox--small .gb-field-checkbox__container .gb-field-checkbox__field .gb-field-checkbox__tick{width:4px;height:8px}.gb-field-checkbox--default .gb-field-checkbox__container .gb-field-checkbox__field{margin-right:8px;width:16px;height:16px}.gb-field-checkbox--default .gb-field-checkbox__container .gb-field-checkbox__field .gb-field-checkbox__tick{width:4px;height:8px}.gb-field-checkbox--medium .gb-field-checkbox__container .gb-field-checkbox__field{margin-right:9px;width:18px;height:18px}.gb-field-checkbox--medium .gb-field-checkbox__container .gb-field-checkbox__field .gb-field-checkbox__tick{width:5px;height:10px}.gb-field-checkbox--large .gb-field-checkbox__container .gb-field-checkbox__field{margin-right:10px;width:20px;height:20px}.gb-field-checkbox--large .gb-field-checkbox__container .gb-field-checkbox__field .gb-field-checkbox__tick{width:5px;height:10px}.gb-field-checkbox--disabled{opacity:.7}.gb-field-checkbox--disabled .gb-field-checkbox__container .gb-field-checkbox__field,.gb-field-checkbox--disabled .gb-field-checkbox__container .gb-field-checkbox__label{pointer-events:none;cursor:not-allowed}.gb-field-checkbox--full-width{width:100%}.gb-field-checkbox--dark .gb-field-checkbox__container .gb-field-checkbox__field{background-color:#222c3c}.gb-field-checkbox--dark .gb-field-checkbox__container .gb-field-checkbox__field .gb-field-checkbox__tick{border-color:#222c3c}.gb-field-checkbox--dark .gb-field-checkbox__container .gb-field-checkbox__label{color:#fff}.gb-field-checkbox--dark .gb-field-checkbox__container--active .gb-field-checkbox__field .gb-field-checkbox__tick{border-color:#fff}.gb-field-checkbox--dark.gb-field-checkbox--error .gb-field-checkbox__container .gb-field-checkbox__field{border-color:#e0102b}.gb-field-checkbox--dark.gb-field-checkbox--error .gb-field-checkbox__container:hover .gb-field-checkbox__field{border-color:#f0334b}.gb-field-checkbox--dark.gb-field-checkbox--error .gb-field-checkbox__container:active .gb-field-checkbox__field{border-color:#e0102b}.gb-field-checkbox--dark.gb-field-checkbox--error .gb-field-checkbox__container:focus .gb-field-checkbox__field .gb-field-checkbox__focuser{border-color:#e0102b}.gb-field-checkbox--dark.gb-field-checkbox--error .gb-field-checkbox__container--active .gb-field-checkbox__field{border-color:#e0102b;background-color:rgba(224,16,43,.4)}.gb-field-checkbox--dark.gb-field-checkbox--normal .gb-field-checkbox__container .gb-field-checkbox__field{border-color:#313d4f}.gb-field-checkbox--dark.gb-field-checkbox--normal .gb-field-checkbox__container:hover .gb-field-checkbox__field{border-color:#45556e}.gb-field-checkbox--dark.gb-field-checkbox--normal .gb-field-checkbox__container:active .gb-field-checkbox__field{border-color:#313d4f}.gb-field-checkbox--dark.gb-field-checkbox--normal .gb-field-checkbox__container:focus .gb-field-checkbox__field .gb-field-checkbox__focuser{border-color:#313d4f}.gb-field-checkbox--dark.gb-field-checkbox--normal .gb-field-checkbox__container--active .gb-field-checkbox__field{border-color:#0093ee;background-color:rgba(0,147,238,.4)}.gb-field-checkbox--dark.gb-field-checkbox--normal .gb-field-checkbox__container--active:hover .gb-field-checkbox__field{border-color:#22abff}.gb-field-checkbox--dark.gb-field-checkbox--normal .gb-field-checkbox__container--active:focus .gb-field-checkbox__field .gb-field-checkbox__focuser{border-color:#0093ee}.gb-field-checkbox--dark.gb-field-checkbox--success .gb-field-checkbox__container .gb-field-checkbox__field{border-color:#96bf47}.gb-field-checkbox--dark.gb-field-checkbox--success .gb-field-checkbox__container:hover .gb-field-checkbox__field{border-color:#accc6d}.gb-field-checkbox--dark.gb-field-checkbox--success .gb-field-checkbox__container:active .gb-field-checkbox__field{border-color:#96bf47}.gb-field-checkbox--dark.gb-field-checkbox--success .gb-field-checkbox__container:focus .gb-field-checkbox__field .gb-field-checkbox__focuser{border-color:#96bf47}.gb-field-checkbox--dark.gb-field-checkbox--success .gb-field-checkbox__container--active .gb-field-checkbox__field{border-color:#96bf47;background-color:rgba(150,191,71,.4)}.gb-field-checkbox--dark.gb-field-checkbox--warning .gb-field-checkbox__container .gb-field-checkbox__field{border-color:#ffc02a}.gb-field-checkbox--dark.gb-field-checkbox--warning .gb-field-checkbox__container:hover .gb-field-checkbox__field{border-color:#ffcf5d}.gb-field-checkbox--dark.gb-field-checkbox--warning .gb-field-checkbox__container:active .gb-field-checkbox__field{border-color:#ffc02a}.gb-field-checkbox--dark.gb-field-checkbox--warning .gb-field-checkbox__container:focus .gb-field-checkbox__field .gb-field-checkbox__focuser{border-color:#ffc02a}.gb-field-checkbox--dark.gb-field-checkbox--warning .gb-field-checkbox__container--active .gb-field-checkbox__field{border-color:#ffc02a;background-color:rgba(255,192,42,.4)}.gb-field-checkbox--light .gb-field-checkbox__container .gb-field-checkbox__field{background-color:#fff}.gb-field-checkbox--light .gb-field-checkbox__container .gb-field-checkbox__field .gb-field-checkbox__tick{border-color:#fff}.gb-field-checkbox--light .gb-field-checkbox__container .gb-field-checkbox__label{color:#171e29}.gb-field-checkbox--light .gb-field-checkbox__container--active .gb-field-checkbox__field .gb-field-checkbox__tick{border-color:#fff}.gb-field-checkbox--light.gb-field-checkbox--error .gb-field-checkbox__container .gb-field-checkbox__field{border-color:#e0102b}.gb-field-checkbox--light.gb-field-checkbox--error .gb-field-checkbox__container:hover .gb-field-checkbox__field{border-color:#b00d22}.gb-field-checkbox--light.gb-field-checkbox--error .gb-field-checkbox__container:active .gb-field-checkbox__field{border-color:#e0102b}.gb-field-checkbox--light.gb-field-checkbox--error .gb-field-checkbox__container:focus .gb-field-checkbox__field .gb-field-checkbox__focuser{border-color:#e0102b}.gb-field-checkbox--light.gb-field-checkbox--error .gb-field-checkbox__container--active .gb-field-checkbox__field{border-color:#e0102b;background-color:rgba(224,16,43,.9)}.gb-field-checkbox--light.gb-field-checkbox--normal .gb-field-checkbox__container .gb-field-checkbox__field{border-color:#c5d9e8}.gb-field-checkbox--light.gb-field-checkbox--normal .gb-field-checkbox__container:hover .gb-field-checkbox__field{border-color:#a0c1da}.gb-field-checkbox--light.gb-field-checkbox--normal .gb-field-checkbox__container:active .gb-field-checkbox__field{border-color:#c5d9e8}.gb-field-checkbox--light.gb-field-checkbox--normal .gb-field-checkbox__container:focus .gb-field-checkbox__field .gb-field-checkbox__focuser{border-color:#c5d9e8}.gb-field-checkbox--light.gb-field-checkbox--normal .gb-field-checkbox__container--active .gb-field-checkbox__field{border-color:#0079c4;background-color:rgba(0,121,196,.9)}.gb-field-checkbox--light.gb-field-checkbox--normal .gb-field-checkbox__container--active:hover .gb-field-checkbox__field{border-color:#005a91}.gb-field-checkbox--light.gb-field-checkbox--normal .gb-field-checkbox__container--active:focus .gb-field-checkbox__field .gb-field-checkbox__focuser{border-color:#0079c4}.gb-field-checkbox--light.gb-field-checkbox--success .gb-field-checkbox__container .gb-field-checkbox__field{border-color:#81c926}.gb-field-checkbox--light.gb-field-checkbox--success .gb-field-checkbox__container:hover .gb-field-checkbox__field{border-color:#659e1e}.gb-field-checkbox--light.gb-field-checkbox--success .gb-field-checkbox__container:active .gb-field-checkbox__field{border-color:#81c926}.gb-field-checkbox--light.gb-field-checkbox--success .gb-field-checkbox__container:focus .gb-field-checkbox__field .gb-field-checkbox__focuser{border-color:#81c926}.gb-field-checkbox--light.gb-field-checkbox--success .gb-field-checkbox__container--active .gb-field-checkbox__field{border-color:#81c926;background-color:rgba(129,201,38,.9)}.gb-field-checkbox--light.gb-field-checkbox--warning .gb-field-checkbox__container .gb-field-checkbox__field{border-color:#fd7b1f}.gb-field-checkbox--light.gb-field-checkbox--warning .gb-field-checkbox__container:hover .gb-field-checkbox__field{border-color:#e76102}.gb-field-checkbox--light.gb-field-checkbox--warning .gb-field-checkbox__container:active .gb-field-checkbox__field{border-color:#fd7b1f}.gb-field-checkbox--light.gb-field-checkbox--warning .gb-field-checkbox__container:focus .gb-field-checkbox__field .gb-field-checkbox__focuser{border-color:#fd7b1f}.gb-field-checkbox--light.gb-field-checkbox--warning .gb-field-checkbox__container--active .gb-field-checkbox__field{border-color:#fd7b1f;background-color:rgba(253,123,31,.9)}',map:void 0,media:void 0})}),{mixins:[y,x,g],props:{value:{type:Boolean,default:!1}},methods:{onClick(e){const i=!this.innerValue;this.innerValue=i,this.$emit("change",i,this.name,e),this.$emit("input",i)},onKeypress(e){"Space"===e.code&&this.onClick(e)}}},void 0,!1,void 0,!1,b,void 0,void 0);const C=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{class:["gb-field-image-uploader","gb-field-image-uploader--"+e.size,"gb-field-image-uploader--"+e.computedTheme,"gb-field-image-uploader--"+e.computedStatus,{"gb-field-image-uploader--disabled":e.disabled,"gb-field-image-uploader--dragging":e.dragging||e.dragError,"gb-field-image-uploader--full-width":e.fullWidth}],on:{dragenter:e.onDragEnter}},[t("div",{staticClass:"gb-field-image-uploader__container"},[e.label?t("div",{staticClass:"gb-field-image-uploader__information"},[t("field-label",{staticClass:"gb-field-image-uploader__label",attrs:{"for-field":e.uuid,required:e.required,size:e.size,theme:e.theme}},[e._v(e._s(e.label))]),e.fieldMessageStatus?t("field-message",{staticClass:"gb-field-image-uploader__message",attrs:{message:e.fieldMessageContent,size:e.size,status:e.fieldMessageStatus,theme:e.theme}}):e._e()],1):e._e(),t("label",{staticClass:"gb-field-image-uploader__upload js-tag-for-autofocus",attrs:{for:e.uuid,tabindex:"0"},on:{keypress:function(i){return i.preventDefault(),e.onLabelKeypress(i)}}},[t("span",{staticClass:"gb-field-image-uploader__focuser"}),t("base-icon",{staticClass:"gb-field-image-uploader__icon",attrs:{name:"cloud_upload"}})],1),t("input",{staticClass:"gb-field-image-uploader__field",attrs:{disabled:e.disabled,id:e.uuid,name:e.name,accept:"image/*",type:"file"},on:{change:e.onFieldChange}})]),e.hasPreview&&e.innerValue?t("div",{staticClass:"gb-field-image-uploader__preview"},[t("div",{staticClass:"gb-field-image-uploader__image",style:{backgroundImage:e.innerValue?"url("+e.innerValue+")":null}}),e.clearable?t("base-button",{staticClass:"gb-field-image-uploader__remove",attrs:{color:"dark"===e.theme?"white":"black",confirmation:!0,"full-width":!0,reverse:!0,"left-icon":"delete_outline",size:"mini"},on:{confirm:e.onRemoveImage}},[e._v("Remove image")]):e._e()],1):e._e(),e.dragging||e.dragError?t("div",{class:["gb-field-image-uploader__dropzone",{"gb-field-image-uploader__dropzone--invalid":e.dragError}],on:{dragenter:e.onDragEnter,dragleave:e.onDragLeave,dragover:e.onDragOver,drop:e.onDrop}},[t("base-icon",{staticClass:"gb-field-image-uploader__icon",attrs:{name:e.dragError?"cloud_off":"cloud_upload"}}),e.dragError?t("span",{staticClass:"gb-field-image-uploader__error"},[e._v("The file is not an image")]):e._e()],1):e._e()])},staticRenderFns:[]},(function(e){e&&e("data-v-51d0c290_0",{source:'.gb-field-image-uploader{display:inline-block;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif;-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent}.gb-field-image-uploader .gb-field-image-uploader__container{display:flex;align-items:center}.gb-field-image-uploader .gb-field-image-uploader__container .gb-field-image-uploader__information{display:flex;flex:1;flex-direction:column;margin-right:20px;text-align:left}.gb-field-image-uploader .gb-field-image-uploader__container .gb-field-image-uploader__information .gb-field-image-uploader__label{margin-bottom:0}.gb-field-image-uploader .gb-field-image-uploader__container .gb-field-image-uploader__information .gb-field-image-uploader__message{margin-top:6px;user-select:none}.gb-field-image-uploader .gb-field-image-uploader__container .gb-field-image-uploader__upload{position:relative;flex:0 0 auto;box-sizing:border-box;outline:0;border-width:2px;border-style:solid;border-radius:100%;transition:all linear 250ms;cursor:pointer}.gb-field-image-uploader .gb-field-image-uploader__container .gb-field-image-uploader__upload .gb-field-image-uploader__focuser{position:absolute;top:-4px;right:-4px;bottom:-4px;left:-4px;border-width:1px;border-style:solid;border-color:transparent;border-radius:100%;opacity:0;transition:all linear 250ms}.gb-field-image-uploader .gb-field-image-uploader__container .gb-field-image-uploader__upload .gb-field-image-uploader__icon{position:absolute;top:50%;left:50%;margin-top:-1px;transform:translate(-50%,-50%)}.gb-field-image-uploader .gb-field-image-uploader__container .gb-field-image-uploader__upload:focus .gb-field-image-uploader__focuser{opacity:1}.gb-field-image-uploader .gb-field-image-uploader__container .gb-field-image-uploader__field{display:none}.gb-field-image-uploader .gb-field-image-uploader__preview{margin-top:10px}.gb-field-image-uploader .gb-field-image-uploader__preview .gb-field-image-uploader__image{width:100%;border-width:1px;border-style:solid;border-radius:4px;background-position:center;background-size:cover;background-repeat:no-repeat}.gb-field-image-uploader .gb-field-image-uploader__preview .gb-field-image-uploader__remove{margin-top:10px}.gb-field-image-uploader .gb-field-image-uploader__dropzone{display:none;align-items:center;flex-direction:column;justify-content:center;padding:20px;border-width:2px;border-style:dashed;border-radius:4px}.gb-field-image-uploader .gb-field-image-uploader__dropzone .gb-field-image-uploader__error,.gb-field-image-uploader .gb-field-image-uploader__dropzone .gb-field-image-uploader__icon{flex:0 0 auto;pointer-events:none}.gb-field-image-uploader .gb-field-image-uploader__dropzone .gb-field-image-uploader__error{margin-top:4px}.gb-field-image-uploader--mini .gb-field-image-uploader__container .gb-field-image-uploader__information .gb-field-image-uploader__message{font-size:10px}.gb-field-image-uploader--mini .gb-field-image-uploader__container .gb-field-image-uploader__upload{width:40px;height:40px}.gb-field-image-uploader--mini .gb-field-image-uploader__container .gb-field-image-uploader__upload .gb-field-image-uploader__icon{font-size:18px!important}.gb-field-image-uploader--mini .gb-field-image-uploader__preview .gb-field-image-uploader__image{height:80px}.gb-field-image-uploader--mini .gb-field-image-uploader__dropzone{height:170px}.gb-field-image-uploader--mini .gb-field-image-uploader__dropzone .gb-field-image-uploader__icon{font-size:24px!important}.gb-field-image-uploader--mini .gb-field-image-uploader__dropzone .gb-field-image-uploader__error{font-size:14px}.gb-field-image-uploader--small .gb-field-image-uploader__container .gb-field-image-uploader__information .gb-field-image-uploader__message{font-size:11px}.gb-field-image-uploader--small .gb-field-image-uploader__container .gb-field-image-uploader__upload{width:45px;height:45px}.gb-field-image-uploader--small .gb-field-image-uploader__container .gb-field-image-uploader__upload .gb-field-image-uploader__icon{font-size:20px!important}.gb-field-image-uploader--small .gb-field-image-uploader__preview .gb-field-image-uploader__image{height:90px}.gb-field-image-uploader--small .gb-field-image-uploader__dropzone{height:185px}.gb-field-image-uploader--small .gb-field-image-uploader__dropzone .gb-field-image-uploader__icon{font-size:30px!important}.gb-field-image-uploader--small .gb-field-image-uploader__dropzone .gb-field-image-uploader__error{font-size:15px}.gb-field-image-uploader--default .gb-field-image-uploader__container .gb-field-image-uploader__information .gb-field-image-uploader__message{font-size:12px}.gb-field-image-uploader--default .gb-field-image-uploader__container .gb-field-image-uploader__upload{width:50px;height:50px}.gb-field-image-uploader--default .gb-field-image-uploader__container .gb-field-image-uploader__upload .gb-field-image-uploader__icon{font-size:22px!important}.gb-field-image-uploader--default .gb-field-image-uploader__preview .gb-field-image-uploader__image{height:100px}.gb-field-image-uploader--default .gb-field-image-uploader__dropzone{height:200px}.gb-field-image-uploader--default .gb-field-image-uploader__dropzone .gb-field-image-uploader__icon{font-size:36px!important}.gb-field-image-uploader--default .gb-field-image-uploader__dropzone .gb-field-image-uploader__error{font-size:16px}.gb-field-image-uploader--medium .gb-field-image-uploader__container .gb-field-image-uploader__information .gb-field-image-uploader__message{font-size:13px}.gb-field-image-uploader--medium .gb-field-image-uploader__container .gb-field-image-uploader__upload{width:55px;height:55px}.gb-field-image-uploader--medium .gb-field-image-uploader__container .gb-field-image-uploader__upload .gb-field-image-uploader__icon{font-size:24px!important}.gb-field-image-uploader--medium .gb-field-image-uploader__preview .gb-field-image-uploader__image{height:110px}.gb-field-image-uploader--medium .gb-field-image-uploader__dropzone{height:215px}.gb-field-image-uploader--medium .gb-field-image-uploader__dropzone .gb-field-image-uploader__icon{font-size:42px!important}.gb-field-image-uploader--medium .gb-field-image-uploader__dropzone .gb-field-image-uploader__error{font-size:17px}.gb-field-image-uploader--large .gb-field-image-uploader__container .gb-field-image-uploader__information .gb-field-image-uploader__message{font-size:14px}.gb-field-image-uploader--large .gb-field-image-uploader__container .gb-field-image-uploader__upload{width:60px;height:60px}.gb-field-image-uploader--large .gb-field-image-uploader__container .gb-field-image-uploader__upload .gb-field-image-uploader__icon{font-size:26px!important}.gb-field-image-uploader--large .gb-field-image-uploader__preview .gb-field-image-uploader__image{height:120px}.gb-field-image-uploader--large .gb-field-image-uploader__dropzone{height:230px}.gb-field-image-uploader--large .gb-field-image-uploader__dropzone .gb-field-image-uploader__icon{font-size:48px!important}.gb-field-image-uploader--large .gb-field-image-uploader__dropzone .gb-field-image-uploader__error{font-size:18px}.gb-field-image-uploader--disabled{opacity:.7}.gb-field-image-uploader--disabled .gb-field-image-uploader__container .gb-field-image-uploader__upload{pointer-events:none;cursor:not-allowed}.gb-field-image-uploader--dragging .gb-field-image-uploader__container,.gb-field-image-uploader--dragging .gb-field-image-uploader__preview{display:none}.gb-field-image-uploader--dragging .gb-field-image-uploader__dropzone{display:flex}.gb-field-image-uploader--full-width{width:100%}.gb-field-image-uploader--dark .gb-field-image-uploader__container .gb-field-image-uploader__information .gb-field-image-uploader__label{color:#fff}.gb-field-image-uploader--dark .gb-field-image-uploader__container .gb-field-image-uploader__information .gb-field-image-uploader__message{color:#a9c7df}.gb-field-image-uploader--dark .gb-field-image-uploader__container .gb-field-image-uploader__upload{background-color:#222c3c}.gb-field-image-uploader--dark .gb-field-image-uploader__preview .gb-field-image-uploader__image{border-color:#313d4f}.gb-field-image-uploader--dark .gb-field-image-uploader__dropzone{border-color:#313d4f;color:#fff}.gb-field-image-uploader--dark .gb-field-image-uploader__dropzone--invalid{border-color:#e0102b;color:#e0102b}.gb-field-image-uploader--dark.gb-field-image-uploader--error .gb-field-image-uploader__container .gb-field-image-uploader__upload{border-color:#e0102b}.gb-field-image-uploader--dark.gb-field-image-uploader--error .gb-field-image-uploader__container .gb-field-image-uploader__upload:hover{border-color:#f0334b}.gb-field-image-uploader--dark.gb-field-image-uploader--error .gb-field-image-uploader__container .gb-field-image-uploader__upload:active{border-color:#e0102b}.gb-field-image-uploader--dark.gb-field-image-uploader--error .gb-field-image-uploader__container .gb-field-image-uploader__upload:focus .gb-field-image-uploader__focuser{border-color:#e0102b}.gb-field-image-uploader--dark.gb-field-image-uploader--normal .gb-field-image-uploader__container .gb-field-image-uploader__upload{border-color:#313d4f}.gb-field-image-uploader--dark.gb-field-image-uploader--normal .gb-field-image-uploader__container .gb-field-image-uploader__upload:hover{border-color:#45556e}.gb-field-image-uploader--dark.gb-field-image-uploader--normal .gb-field-image-uploader__container .gb-field-image-uploader__upload:active{border-color:#313d4f}.gb-field-image-uploader--dark.gb-field-image-uploader--normal .gb-field-image-uploader__container .gb-field-image-uploader__upload:focus .gb-field-image-uploader__focuser{border-color:#313d4f}.gb-field-image-uploader--dark.gb-field-image-uploader--success .gb-field-image-uploader__container .gb-field-image-uploader__upload{border-color:#96bf47}.gb-field-image-uploader--dark.gb-field-image-uploader--success .gb-field-image-uploader__container .gb-field-image-uploader__upload:hover{border-color:#accc6d}.gb-field-image-uploader--dark.gb-field-image-uploader--success .gb-field-image-uploader__container .gb-field-image-uploader__upload:active{border-color:#96bf47}.gb-field-image-uploader--dark.gb-field-image-uploader--success .gb-field-image-uploader__container .gb-field-image-uploader__upload:focus .gb-field-image-uploader__focuser{border-color:#96bf47}.gb-field-image-uploader--dark.gb-field-image-uploader--warning .gb-field-image-uploader__container .gb-field-image-uploader__upload{border-color:#ffc02a}.gb-field-image-uploader--dark.gb-field-image-uploader--warning .gb-field-image-uploader__container .gb-field-image-uploader__upload:hover{border-color:#ffcf5d}.gb-field-image-uploader--dark.gb-field-image-uploader--warning .gb-field-image-uploader__container .gb-field-image-uploader__upload:active{border-color:#ffc02a}.gb-field-image-uploader--dark.gb-field-image-uploader--warning .gb-field-image-uploader__container .gb-field-image-uploader__upload:focus .gb-field-image-uploader__focuser{border-color:#ffc02a}.gb-field-image-uploader--dark.gb-field-image-uploader--disabled .gb-field-image-uploader__container .gb-field-image-uploader__upload:hover{border-color:#e0102b}.gb-field-image-uploader--light .gb-field-image-uploader__container .gb-field-image-uploader__information .gb-field-image-uploader__label{color:#171e29}.gb-field-image-uploader--light .gb-field-image-uploader__container .gb-field-image-uploader__information .gb-field-image-uploader__message{color:#434a54}.gb-field-image-uploader--light .gb-field-image-uploader__container .gb-field-image-uploader__upload{background-color:#fff}.gb-field-image-uploader--light .gb-field-image-uploader__preview .gb-field-image-uploader__image{border-color:#c5d9e8}.gb-field-image-uploader--light .gb-field-image-uploader__dropzone{border-color:#c5d9e8;color:#171e29}.gb-field-image-uploader--light .gb-field-image-uploader__dropzone--invalid{border-color:#e0102b;color:#e0102b}.gb-field-image-uploader--light.gb-field-image-uploader--error .gb-field-image-uploader__container .gb-field-image-uploader__upload{border-color:#e0102b}.gb-field-image-uploader--light.gb-field-image-uploader--error .gb-field-image-uploader__container .gb-field-image-uploader__upload:hover{border-color:#b00d22}.gb-field-image-uploader--light.gb-field-image-uploader--error .gb-field-image-uploader__container .gb-field-image-uploader__upload:active{border-color:#e0102b}.gb-field-image-uploader--light.gb-field-image-uploader--error .gb-field-image-uploader__container .gb-field-image-uploader__upload:focus .gb-field-image-uploader__focuser{border-color:#e0102b}.gb-field-image-uploader--light.gb-field-image-uploader--normal .gb-field-image-uploader__container .gb-field-image-uploader__upload{border-color:#c5d9e8}.gb-field-image-uploader--light.gb-field-image-uploader--normal .gb-field-image-uploader__container .gb-field-image-uploader__upload:hover{border-color:#a0c1da}.gb-field-image-uploader--light.gb-field-image-uploader--normal .gb-field-image-uploader__container .gb-field-image-uploader__upload:active{border-color:#c5d9e8}.gb-field-image-uploader--light.gb-field-image-uploader--normal .gb-field-image-uploader__container .gb-field-image-uploader__upload:focus .gb-field-image-uploader__focuser{border-color:#c5d9e8}.gb-field-image-uploader--light.gb-field-image-uploader--success .gb-field-image-uploader__container .gb-field-image-uploader__upload{border-color:#81c926}.gb-field-image-uploader--light.gb-field-image-uploader--success .gb-field-image-uploader__container .gb-field-image-uploader__upload:hover{border-color:#659e1e}.gb-field-image-uploader--light.gb-field-image-uploader--success .gb-field-image-uploader__container .gb-field-image-uploader__upload:active{border-color:#81c926}.gb-field-image-uploader--light.gb-field-image-uploader--success .gb-field-image-uploader__container .gb-field-image-uploader__upload:focus .gb-field-image-uploader__focuser{border-color:#81c926}.gb-field-image-uploader--light.gb-field-image-uploader--warning .gb-field-image-uploader__container .gb-field-image-uploader__upload{border-color:#fd7b1f}.gb-field-image-uploader--light.gb-field-image-uploader--warning .gb-field-image-uploader__container .gb-field-image-uploader__upload:hover{border-color:#e76102}.gb-field-image-uploader--light.gb-field-image-uploader--warning .gb-field-image-uploader__container .gb-field-image-uploader__upload:active{border-color:#fd7b1f}.gb-field-image-uploader--light.gb-field-image-uploader--warning .gb-field-image-uploader__container .gb-field-image-uploader__upload:focus .gb-field-image-uploader__focuser{border-color:#fd7b1f}.gb-field-image-uploader--light.gb-field-image-uploader--disabled .gb-field-image-uploader__container .gb-field-image-uploader__upload:hover{border-color:#e0102b}',map:void 0,media:void 0})}),{components:{BaseButton:_,BaseIcon:d},mixins:[y,x,g],props:{clearable:{type:Boolean,default:!0},hasPreview:{type:Boolean,default:!0},value:{type:String,default:null}},data:()=>({dragging:!1,dragError:!1}),methods:{convertToBase64:e=>new Promise((i,t)=>{const a=new FileReader;a.readAsDataURL(e),a.addEventListener("load",()=>i(a.result)),a.addEventListener("error",e=>t(e))}),async processFile(e){const i=await this.convertToBase64(e);this.innerValue=i,this.$emit("change",this.name,i,event),this.$emit("input",i)},onDragEnter(e){e.preventDefault(),this.dragging=!0},onDragLeave(e){e.preventDefault(),this.dragging=!1},onDragOver(e){e.preventDefault()},onDrop(e){if(e.preventDefault(),e.dataTransfer&&e.dataTransfer.files.length>0){const i=e.dataTransfer.files[0];this.dragError=!i.type.includes("image/"),this.dragError||(this.processFile(i),this.$emit("drop",this.name,i,e))}this.dragging=!1},onFieldChange(e){if(e.target&&e.target.files.length>0){const i=e.target.files[0];this.processFile(i)}},onLabelKeypress(e){"Space"===e.code&&this.$el.querySelector("input[type='file']").click()},onRemoveImage(){this.innerValue=null,this.$emit("change",this.name,null,event),this.$emit("remove",this.name,event),this.$emit("input",null)}}},void 0,!1,void 0,!1,b,void 0,void 0);const S=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{class:["gb-field-input","gb-field-input--"+e.size,"gb-field-input--"+e.computedTheme,"gb-field-input--"+e.computedStatus,{"gb-field-input--borders":e.borders,"gb-field-input--clearable":e.clearable,"gb-field-input--disabled":e.disabled,"gb-field-input--focused":e.focused,"gb-field-input--full-width":e.fullWidth,"gb-field-input--readonly":e.readonly,"gb-field-input--rounded":e.rounded,"gb-field-input--with-icon":e.leftIcon||e.rightIcon}]},[e.label?t("field-label",{staticClass:"gb-field-input__label",attrs:{forField:e.uuid,required:e.required,size:e.size,theme:e.theme}},[e._v(e._s(e.label))]):e._e(),t("div",{staticClass:"gb-field-input__container",on:{click:e.onContainerClick}},[e.prepend?t("span",{class:["gb-field-input__block","gb-field-input__block--prepend",{"gb-field-input__block--clickable":e.$listeners.prependClick}],on:{click:e.onPrependClick}},[e._v(e._s(e.prepend))]):e._e(),e.leftIcon?t("base-icon",{staticClass:"gb-field-input__icon gb-field-input__icon--left",attrs:{name:e.leftIcon}}):e._e(),t("input",{staticClass:"gb-field-input__field js-tag-for-autofocus",attrs:{autocomplete:e.autocomplete?"on":"off",disabled:e.disabled,id:e.uuid,max:e.max,min:e.min,name:e.name,placeholder:e.placeholder,spellcheck:e.spellcheck,readonly:e.readonly,type:e.type},domProps:{value:e.innerValue},on:{blur:e.onFieldBlur,change:e.onFieldChange,focus:e.onFieldFocus,input:e.onFieldInput,keydown:e.onFieldKeyDown,keyup:e.onFieldKeyUp}}),e.computedRightIcon?t("base-icon",{staticClass:"gb-field-input__icon gb-field-input__icon--right",attrs:{name:e.computedRightIcon},on:{click:e.onRightIconClick}}):e._e(),e.append?t("span",{class:["gb-field-input__block","gb-field-input__block--append",{"gb-field-input__block--clickable":e.$listeners.appendClick}],on:{click:e.onAppendClick}},[e._v(e._s(e.append))]):e._e()],1),e.fieldMessageStatus?t("field-message",{attrs:{message:e.fieldMessageContent,size:e.size,status:e.fieldMessageStatus,theme:e.theme}}):e._e()],1)},staticRenderFns:[]},(function(e){e&&e("data-v-5957aef8_0",{source:'.gb-field-input{display:flex;flex-direction:column;text-align:left;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif}.gb-field-input .gb-field-input__container{display:flex;overflow:hidden;align-items:center;transition:border-color linear 250ms;user-select:none}.gb-field-input .gb-field-input__container .gb-field-input__block{display:flex;align-items:center;flex:0 0 auto;height:100%;transition:color linear 250ms;user-select:none;cursor:default}.gb-field-input .gb-field-input__container .gb-field-input__block--append{border-left-width:1px;border-left-style:solid}.gb-field-input .gb-field-input__container .gb-field-input__block--prepend{border-right-width:1px;border-right-style:solid}.gb-field-input .gb-field-input__container .gb-field-input__block--clickable{cursor:pointer}.gb-field-input .gb-field-input__container .gb-field-input__icon{flex:0 0 auto;pointer-events:none}.gb-field-input .gb-field-input__container .gb-field-input__icon--left{margin-right:5px;margin-left:9px}.gb-field-input .gb-field-input__container .gb-field-input__icon--right{margin-right:9px;margin-left:5px}.gb-field-input .gb-field-input__container .gb-field-input__field{flex:1;width:0;height:100%;outline:0;border:none;line-height:initial}.gb-field-input .gb-field-input__container .gb-field-input__field:disabled{cursor:not-allowed}.gb-field-input .gb-field-input__container:hover{cursor:text}.gb-field-input--mini .gb-field-input__container{height:34px}.gb-field-input--mini .gb-field-input__container .gb-field-input__icon{font-size:16px!important}.gb-field-input--mini .gb-field-input__container .gb-field-input__block,.gb-field-input--mini .gb-field-input__container .gb-field-input__field{padding:0 12px;font-size:12px}.gb-field-input--small .gb-field-input__container{height:38px}.gb-field-input--small .gb-field-input__container .gb-field-input__icon{font-size:17px!important}.gb-field-input--small .gb-field-input__container .gb-field-input__block,.gb-field-input--small .gb-field-input__container .gb-field-input__field{padding:0 14px;font-size:13px}.gb-field-input--default .gb-field-input__container{height:42px}.gb-field-input--default .gb-field-input__container .gb-field-input__icon{font-size:18px!important}.gb-field-input--default .gb-field-input__container .gb-field-input__block,.gb-field-input--default .gb-field-input__container .gb-field-input__field{padding:0 16px;font-size:14px}.gb-field-input--medium .gb-field-input__container{height:46px}.gb-field-input--medium .gb-field-input__container .gb-field-input__icon{font-size:19px!important}.gb-field-input--medium .gb-field-input__container .gb-field-input__block,.gb-field-input--medium .gb-field-input__container .gb-field-input__field{padding:0 18px;font-size:15px}.gb-field-input--large .gb-field-input__container{height:50px}.gb-field-input--large .gb-field-input__container .gb-field-input__icon{font-size:20px!important}.gb-field-input--large .gb-field-input__container .gb-field-input__block,.gb-field-input--large .gb-field-input__container .gb-field-input__field{padding:0 20px;font-size:16px}.gb-field-input--borders .gb-field-input__container{box-sizing:border-box;border-width:1px;border-style:solid;border-radius:4px}.gb-field-input--clearable .gb-field-input__container .gb-field-input__icon--right{opacity:.8;transition:opacity 250ms linear;pointer-events:auto}.gb-field-input--clearable .gb-field-input__container .gb-field-input__icon--right:hover{opacity:1}.gb-field-input--disabled{opacity:.7;cursor:not-allowed}.gb-field-input--disabled .gb-field-input__container,.gb-field-input--disabled .gb-field-input__label{pointer-events:none}.gb-field-input--full-width{width:100%}.gb-field-input--readonly .gb-field-input__container .gb-field-input__field{cursor:default}.gb-field-input--rounded .gb-field-input__container{border-radius:40px}.gb-field-input--with-icon .gb-field-input__container .gb-field-input__field{padding:0}.gb-field-input--dark .gb-field-input__container{background-color:#222c3c}.gb-field-input--dark .gb-field-input__container .gb-field-input__block{background-color:#273142;color:#fff}.gb-field-input--dark .gb-field-input__container .gb-field-input__block--append{border-left-color:#313d4f}.gb-field-input--dark .gb-field-input__container .gb-field-input__block--prepend{border-right-color:#313d4f}.gb-field-input--dark .gb-field-input__container .gb-field-input__block--clickable:hover{color:#a9c7df}.gb-field-input--dark .gb-field-input__container .gb-field-input__block--clickable:active{color:#fff}.gb-field-input--dark .gb-field-input__container .gb-field-input__field{background-color:#222c3c;color:#fff}.gb-field-input--dark .gb-field-input__container .gb-field-input__field::placeholder{color:#8eacc5;opacity:1}.gb-field-input--dark .gb-field-input__container .gb-field-input__field:-webkit-autofill{box-shadow:0 0 0 30px #222c3c inset!important;-webkit-text-fill-color:#fff!important}.gb-field-input--dark.gb-field-input--error .gb-field-input__container{border-color:#e0102b}.gb-field-input--dark.gb-field-input--error .gb-field-input__container .gb-field-input__icon{color:#e0102b}.gb-field-input--dark.gb-field-input--error .gb-field-input__container:hover{border-color:#f0334b}.gb-field-input--dark.gb-field-input--error .gb-field-input__container:active{border-color:#e0102b}.gb-field-input--dark.gb-field-input--normal .gb-field-input__container{border-color:#313d4f}.gb-field-input--dark.gb-field-input--normal .gb-field-input__container .gb-field-input__icon{color:#8eacc5}.gb-field-input--dark.gb-field-input--normal .gb-field-input__container:hover{border-color:#45556e}.gb-field-input--dark.gb-field-input--normal .gb-field-input__container:active{border-color:#313d4f}.gb-field-input--dark.gb-field-input--success .gb-field-input__container{border-color:#96bf47}.gb-field-input--dark.gb-field-input--success .gb-field-input__container .gb-field-input__icon{color:#96bf47}.gb-field-input--dark.gb-field-input--success .gb-field-input__container:hover{border-color:#accc6d}.gb-field-input--dark.gb-field-input--success .gb-field-input__container:active{border-color:#96bf47}.gb-field-input--dark.gb-field-input--warning .gb-field-input__container{border-color:#ffc02a}.gb-field-input--dark.gb-field-input--warning .gb-field-input__container .gb-field-input__icon{color:#ffc02a}.gb-field-input--dark.gb-field-input--warning .gb-field-input__container:hover{border-color:#ffcf5d}.gb-field-input--dark.gb-field-input--warning .gb-field-input__container:active{border-color:#ffc02a}.gb-field-input--dark.gb-field-input--clearable .gb-field-input__container .gb-field-input__icon--right{color:#fff}.gb-field-input--dark.gb-field-input--focused .gb-field-input__container{border-color:#0093ee!important}.gb-field-input--dark.gb-field-input--focused .gb-field-input__container .gb-field-input__icon{color:#0093ee!important}.gb-field-input--light .gb-field-input__container{background-color:#fff}.gb-field-input--light .gb-field-input__container .gb-field-input__block{background-color:#fafbfc;color:#171e29}.gb-field-input--light .gb-field-input__container .gb-field-input__block--append{border-left-color:#c5d9e8}.gb-field-input--light .gb-field-input__container .gb-field-input__block--prepend{border-right-color:#c5d9e8}.gb-field-input--light .gb-field-input__container .gb-field-input__block--clickable:hover{color:#434a54}.gb-field-input--light .gb-field-input__container .gb-field-input__block--clickable:active{color:#171e29}.gb-field-input--light .gb-field-input__container .gb-field-input__field{background-color:#fff;color:#171e29}.gb-field-input--light .gb-field-input__container .gb-field-input__field::placeholder{color:#5a5a5a;opacity:1}.gb-field-input--light .gb-field-input__container .gb-field-input__field:-webkit-autofill{box-shadow:0 0 0 30px #fff inset!important;-webkit-text-fill-color:#171e29!important}.gb-field-input--light.gb-field-input--error .gb-field-input__container{border-color:#e0102b}.gb-field-input--light.gb-field-input--error .gb-field-input__container .gb-field-input__icon{color:#e0102b}.gb-field-input--light.gb-field-input--error .gb-field-input__container:hover{border-color:#b00d22}.gb-field-input--light.gb-field-input--error .gb-field-input__container:active{border-color:#e0102b}.gb-field-input--light.gb-field-input--normal .gb-field-input__container{border-color:#c5d9e8}.gb-field-input--light.gb-field-input--normal .gb-field-input__container .gb-field-input__icon{color:#5a5a5a}.gb-field-input--light.gb-field-input--normal .gb-field-input__container:hover{border-color:#a0c1da}.gb-field-input--light.gb-field-input--normal .gb-field-input__container:active{border-color:#c5d9e8}.gb-field-input--light.gb-field-input--success .gb-field-input__container{border-color:#81c926}.gb-field-input--light.gb-field-input--success .gb-field-input__container .gb-field-input__icon{color:#81c926}.gb-field-input--light.gb-field-input--success .gb-field-input__container:hover{border-color:#659e1e}.gb-field-input--light.gb-field-input--success .gb-field-input__container:active{border-color:#81c926}.gb-field-input--light.gb-field-input--warning .gb-field-input__container{border-color:#fd7b1f}.gb-field-input--light.gb-field-input--warning .gb-field-input__container .gb-field-input__icon{color:#fd7b1f}.gb-field-input--light.gb-field-input--warning .gb-field-input__container:hover{border-color:#e76102}.gb-field-input--light.gb-field-input--warning .gb-field-input__container:active{border-color:#fd7b1f}.gb-field-input--light.gb-field-input--clearable .gb-field-input__container .gb-field-input__icon--right{color:#fff}.gb-field-input--light.gb-field-input--focused .gb-field-input__container{border-color:#0079c4!important}.gb-field-input--light.gb-field-input--focused .gb-field-input__container .gb-field-input__icon{color:#0079c4!important}',map:void 0,media:void 0})}),{mixins:[y,x,g],props:{append:{type:String,default:null},autocomplete:{type:Boolean,default:!1},borders:{type:Boolean,default:!0},clearable:{type:Boolean,default:!1},leftIcon:{type:String,default:null},max:{type:Number,default:null},min:{type:Number,default:null},placeholder:{type:String,default:null},prepend:{type:String,default:null},readonly:{type:Boolean,default:!1},rightIcon:{type:String,default:null},rounded:{type:Boolean,default:!1},spellcheck:{type:Boolean,default:!1},type:{type:String,default:"text",validator:e=>["currency","email","date","datetime-local","month","number","password","search","tel","text","time","url","week"].includes(e)},value:{type:[String,Number],default:null}},data:()=>({focused:!1}),computed:{computedRightIcon(){return this.clearable&&this.innerValue?"cancel":this.rightIcon}},methods:{getInputValue(){let e="";return this.$el&&(e=this.$el.querySelector("input").value||"")&&"number"===this.type&&(e=parseInt(e)),e},onAppendClick(e){e.stopPropagation(),this.$emit("appendClick",this.getInputValue(),this.name,e)},onContainerClick(e){this.$el.querySelector("input").focus(),this.$emit("click",this.getInputValue(),this.name,e)},onFieldBlur(e){this.focused=!1,this.$emit("blur",this.getInputValue(),this.name,e)},onFieldChange(e){this.$emit("change",this.getInputValue(),this.name,e)},onFieldFocus(e){this.focused=!0,this.$emit("focus",this.getInputValue(),this.name,e)},onFieldInput(e){const i=this.getInputValue();this.innerValue=i,this.$emit("input",i,this.name,e)},onFieldKeyDown(e){this.$emit("keydown",this.getInputValue(),this.name,e)},onFieldKeyUp(e){const i=this.getInputValue();this.$emit("keyup",i,this.name,e),"Enter"===e.key&&this.$emit("submit",i,this.name,e)},onPrependClick(e){e.stopPropagation(),this.$emit("prependClick",this.getInputValue(),this.name,e)},onRightIconClick(){this.clearable&&this.$emit("input","")}}},void 0,!1,void 0,!1,b,void 0,void 0);const $=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{class:["gb-field-input-numeric","gb-field-input-numeric--"+e.size,"gb-field-input-numeric--"+e.computedTheme,"gb-field-input-numeric--"+e.computedStatus,{"gb-field-input-numeric--borders":e.borders,"gb-field-input-numeric--disabled":e.disabled,"gb-field-input-numeric--focused":e.focused,"gb-field-input-numeric--full-width":e.fullWidth,"gb-field-input-numeric--readonly":e.readonly,"gb-field-input-numeric--rounded":e.rounded,"gb-field-input-numeric--with-icon":e.leftIcon||e.rightIcon}]},[e.label?t("field-label",{staticClass:"gb-field-input-numeric__label",attrs:{forField:e.uuid,required:e.required,size:e.size,theme:e.theme}},[e._v(e._s(e.label))]):e._e(),t("div",{staticClass:"gb-field-input-numeric__container",on:{click:e.onContainerClick}},[t("span",{staticClass:"gb-field-input-numeric__block gb-field-input-numeric__block--decrement gb-field-input-numeric__block--clickable",on:{click:e.onDecrement}},[e._v("-")]),t("span",{staticClass:"gb-field-input-numeric__block gb-field-input-numeric__block--increment gb-field-input-numeric__block--clickable",on:{click:e.onIncrement}},[e._v("+")]),e.leftIcon?t("base-icon",{staticClass:"gb-field-input-numeric__icon gb-field-input-numeric__icon--left",attrs:{name:e.leftIcon}}):e._e(),t("input",{staticClass:"gb-field-input-numeric__field js-tag-for-autofocus",attrs:{disabled:e.disabled,id:e.uuid,max:e.max,min:e.min,name:e.name,placeholder:e.placeholder,readonly:e.readonly,type:"text"},domProps:{value:e.innerValue},on:{blur:e.onFieldBlur,change:e.onFieldChange,focus:e.onFieldFocus,input:e.onFieldInput,keydown:e.onFieldKeyDown,keyup:e.onFieldKeyUp}}),e.rightIcon?t("base-icon",{staticClass:"gb-field-input-numeric__icon gb-field-input-numeric__icon--right",attrs:{name:e.rightIcon}}):e._e(),e.append?t("span",{class:["gb-field-input-numeric__block","gb-field-input-numeric__block--append",{"gb-field-input-numeric__block--clickable":e.$listeners.appendClick}],on:{click:e.onAppendClick}},[e._v(e._s(e.append))]):e._e()],1),e.fieldMessageStatus?t("field-message",{attrs:{message:e.fieldMessageContent,size:e.size,status:e.fieldMessageStatus,theme:e.theme}}):e._e()],1)},staticRenderFns:[]},(function(e){e&&e("data-v-c3a22ed0_0",{source:'@charset "UTF-8";.gb-field-input-numeric{display:flex;flex-direction:column;text-align:left;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif}.gb-field-input-numeric .gb-field-input-numeric__container{display:flex;overflow:hidden;align-items:center;transition:border-color linear 250ms;user-select:none}.gb-field-input-numeric .gb-field-input-numeric__container .gb-field-input-numeric__block{display:flex;align-items:center;flex:0 0 auto;height:100%;transition:all linear 250ms;user-select:none;cursor:default}.gb-field-input-numeric .gb-field-input-numeric__container .gb-field-input-numeric__block--decrement,.gb-field-input-numeric .gb-field-input-numeric__container .gb-field-input-numeric__block--increment{border-right-width:1px;border-right-style:solid}.gb-field-input-numeric .gb-field-input-numeric__container .gb-field-input-numeric__block--append{border-left-width:1px;border-left-style:solid}.gb-field-input-numeric .gb-field-input-numeric__container .gb-field-input-numeric__block--clickable{cursor:pointer}.gb-field-input-numeric .gb-field-input-numeric__container .gb-field-input-numeric__icon{flex:0 0 auto;pointer-events:none}.gb-field-input-numeric .gb-field-input-numeric__container .gb-field-input-numeric__icon--left{margin-right:5px;margin-left:9px}.gb-field-input-numeric .gb-field-input-numeric__container .gb-field-input-numeric__icon--right{margin-right:9px;margin-left:5px}.gb-field-input-numeric .gb-field-input-numeric__container .gb-field-input-numeric__field{flex:1;width:0;height:100%;outline:0;border:none;text-align:right;line-height:initial}.gb-field-input-numeric .gb-field-input-numeric__container .gb-field-input-numeric__field:disabled{cursor:not-allowed}.gb-field-input-numeric .gb-field-input-numeric__container .gb-field-input-numeric__field::-webkit-inner-spin-button,.gb-field-input-numeric .gb-field-input-numeric__container .gb-field-input-numeric__field::-webkit-outer-spin-button{display:none;margin:0;-webkit-appearance:none}.gb-field-input-numeric .gb-field-input-numeric__container .gb-field-input-numeric__field[type=number]{-moz-appearance:textfield}.gb-field-input-numeric .gb-field-input-numeric__container:hover{cursor:text}.gb-field-input-numeric--mini .gb-field-input-numeric__container{height:34px}.gb-field-input-numeric--mini .gb-field-input-numeric__container .gb-field-input-numeric__icon{font-size:16px!important}.gb-field-input-numeric--mini .gb-field-input-numeric__container .gb-field-input-numeric__block,.gb-field-input-numeric--mini .gb-field-input-numeric__container .gb-field-input-numeric__field{padding:0 12px;font-size:12px}.gb-field-input-numeric--small .gb-field-input-numeric__container{height:38px}.gb-field-input-numeric--small .gb-field-input-numeric__container .gb-field-input-numeric__icon{font-size:17px!important}.gb-field-input-numeric--small .gb-field-input-numeric__container .gb-field-input-numeric__block,.gb-field-input-numeric--small .gb-field-input-numeric__container .gb-field-input-numeric__field{padding:0 14px;font-size:13px}.gb-field-input-numeric--default .gb-field-input-numeric__container{height:42px}.gb-field-input-numeric--default .gb-field-input-numeric__container .gb-field-input-numeric__icon{font-size:18px!important}.gb-field-input-numeric--default .gb-field-input-numeric__container .gb-field-input-numeric__block,.gb-field-input-numeric--default .gb-field-input-numeric__container .gb-field-input-numeric__field{padding:0 16px;font-size:14px}.gb-field-input-numeric--medium .gb-field-input-numeric__container{height:46px}.gb-field-input-numeric--medium .gb-field-input-numeric__container .gb-field-input-numeric__icon{font-size:19px!important}.gb-field-input-numeric--medium .gb-field-input-numeric__container .gb-field-input-numeric__block,.gb-field-input-numeric--medium .gb-field-input-numeric__container .gb-field-input-numeric__field{padding:0 18px;font-size:15px}.gb-field-input-numeric--large .gb-field-input-numeric__container{height:50px}.gb-field-input-numeric--large .gb-field-input-numeric__container .gb-field-input-numeric__icon{font-size:20px!important}.gb-field-input-numeric--large .gb-field-input-numeric__container .gb-field-input-numeric__block,.gb-field-input-numeric--large .gb-field-input-numeric__container .gb-field-input-numeric__field{padding:0 20px;font-size:16px}.gb-field-input-numeric--borders .gb-field-input-numeric__container{box-sizing:border-box;border-width:1px;border-style:solid;border-radius:4px}.gb-field-input-numeric--disabled{opacity:.7;cursor:not-allowed}.gb-field-input-numeric--disabled .gb-field-input-numeric__container,.gb-field-input-numeric--disabled .gb-field-input-numeric__label{pointer-events:none}.gb-field-input-numeric--full-width{width:100%}.gb-field-input-numeric--readonly .gb-field-input-numeric__container .gb-field-input-numeric__field{cursor:default}.gb-field-input-numeric--rounded .gb-field-input-numeric__container{border-radius:40px}.gb-field-input-numeric--with-icon .gb-field-input-numeric__container .gb-field-input-numeric__field{padding:0}.gb-field-input-numeric--dark .gb-field-input-numeric__container{background-color:#222c3c}.gb-field-input-numeric--dark .gb-field-input-numeric__container .gb-field-input-numeric__block{background-color:#273142;color:#a9c7df}.gb-field-input-numeric--dark .gb-field-input-numeric__container .gb-field-input-numeric__block--decrement,.gb-field-input-numeric--dark .gb-field-input-numeric__container .gb-field-input-numeric__block--increment{border-right-color:#313d4f}.gb-field-input-numeric--dark .gb-field-input-numeric__container .gb-field-input-numeric__block--append{border-left-color:#313d4f}.gb-field-input-numeric--dark .gb-field-input-numeric__container .gb-field-input-numeric__block--clickable:hover{background-color:#222c3c;color:#fff}.gb-field-input-numeric--dark .gb-field-input-numeric__container .gb-field-input-numeric__block--clickable:active{background-color:#1b2431}.gb-field-input-numeric--dark .gb-field-input-numeric__container .gb-field-input-numeric__field{background-color:#222c3c;color:#fff}.gb-field-input-numeric--dark .gb-field-input-numeric__container .gb-field-input-numeric__field::placeholder{color:#8eacc5;opacity:1}.gb-field-input-numeric--dark .gb-field-input-numeric__container .gb-field-input-numeric__field:-webkit-autofill{box-shadow:0 0 0 30px #222c3c inset!important;-webkit-text-fill-color:#fff!important}.gb-field-input-numeric--dark .gb-field-input-numeric__container .gb-field-input-numeric__field::selection{background:0 0}.gb-field-input-numeric--dark.gb-field-input-numeric--error .gb-field-input-numeric__container{border-color:#e0102b}.gb-field-input-numeric--dark.gb-field-input-numeric--error .gb-field-input-numeric__container .gb-field-input-numeric__icon{color:#e0102b}.gb-field-input-numeric--dark.gb-field-input-numeric--error .gb-field-input-numeric__container:hover{border-color:#f0334b}.gb-field-input-numeric--dark.gb-field-input-numeric--error .gb-field-input-numeric__container:active{border-color:#e0102b}.gb-field-input-numeric--dark.gb-field-input-numeric--normal .gb-field-input-numeric__container{border-color:#313d4f}.gb-field-input-numeric--dark.gb-field-input-numeric--normal .gb-field-input-numeric__container .gb-field-input-numeric__icon{color:#8eacc5}.gb-field-input-numeric--dark.gb-field-input-numeric--normal .gb-field-input-numeric__container:hover{border-color:#45556e}.gb-field-input-numeric--dark.gb-field-input-numeric--normal .gb-field-input-numeric__container:active{border-color:#313d4f}.gb-field-input-numeric--dark.gb-field-input-numeric--success .gb-field-input-numeric__container{border-color:#96bf47}.gb-field-input-numeric--dark.gb-field-input-numeric--success .gb-field-input-numeric__container .gb-field-input-numeric__icon{color:#96bf47}.gb-field-input-numeric--dark.gb-field-input-numeric--success .gb-field-input-numeric__container:hover{border-color:#accc6d}.gb-field-input-numeric--dark.gb-field-input-numeric--success .gb-field-input-numeric__container:active{border-color:#96bf47}.gb-field-input-numeric--dark.gb-field-input-numeric--warning .gb-field-input-numeric__container{border-color:#ffc02a}.gb-field-input-numeric--dark.gb-field-input-numeric--warning .gb-field-input-numeric__container .gb-field-input-numeric__icon{color:#ffc02a}.gb-field-input-numeric--dark.gb-field-input-numeric--warning .gb-field-input-numeric__container:hover{border-color:#ffcf5d}.gb-field-input-numeric--dark.gb-field-input-numeric--warning .gb-field-input-numeric__container:active{border-color:#ffc02a}.gb-field-input-numeric--dark.gb-field-input-numeric--focused .gb-field-input-numeric__container{border-color:#0093ee!important}.gb-field-input-numeric--dark.gb-field-input-numeric--focused .gb-field-input-numeric__container .gb-field-input-numeric__icon{color:#0093ee!important}.gb-field-input-numeric--light .gb-field-input-numeric__container{background-color:#fff}.gb-field-input-numeric--light .gb-field-input-numeric__container .gb-field-input-numeric__block{background-color:#fafbfc;color:#434a54}.gb-field-input-numeric--light .gb-field-input-numeric__container .gb-field-input-numeric__block--decrement,.gb-field-input-numeric--light .gb-field-input-numeric__container .gb-field-input-numeric__block--increment{border-right-color:#c5d9e8}.gb-field-input-numeric--light .gb-field-input-numeric__container .gb-field-input-numeric__block--append{border-left-color:#c5d9e8}.gb-field-input-numeric--light .gb-field-input-numeric__container .gb-field-input-numeric__block--clickable:hover{background-color:#fff;color:#171e29}.gb-field-input-numeric--light .gb-field-input-numeric__container .gb-field-input-numeric__block--clickable:active{background-color:#ecf5fd}.gb-field-input-numeric--light .gb-field-input-numeric__container .gb-field-input-numeric__field{background-color:#fff;color:#171e29}.gb-field-input-numeric--light .gb-field-input-numeric__container .gb-field-input-numeric__field::placeholder{color:#5a5a5a;opacity:1}.gb-field-input-numeric--light .gb-field-input-numeric__container .gb-field-input-numeric__field:-webkit-autofill{box-shadow:0 0 0 30px #fff inset!important;-webkit-text-fill-color:#171e29!important}.gb-field-input-numeric--light .gb-field-input-numeric__container .gb-field-input-numeric__field::selection{background:0 0}.gb-field-input-numeric--light.gb-field-input-numeric--error .gb-field-input-numeric__container{border-color:#e0102b}.gb-field-input-numeric--light.gb-field-input-numeric--error .gb-field-input-numeric__container .gb-field-input-numeric__icon{color:#e0102b}.gb-field-input-numeric--light.gb-field-input-numeric--error .gb-field-input-numeric__container:hover{border-color:#b00d22}.gb-field-input-numeric--light.gb-field-input-numeric--error .gb-field-input-numeric__container:active{border-color:#e0102b}.gb-field-input-numeric--light.gb-field-input-numeric--normal .gb-field-input-numeric__container{border-color:#c5d9e8}.gb-field-input-numeric--light.gb-field-input-numeric--normal .gb-field-input-numeric__container .gb-field-input-numeric__icon{color:#5a5a5a}.gb-field-input-numeric--light.gb-field-input-numeric--normal .gb-field-input-numeric__container:hover{border-color:#a0c1da}.gb-field-input-numeric--light.gb-field-input-numeric--normal .gb-field-input-numeric__container:active{border-color:#c5d9e8}.gb-field-input-numeric--light.gb-field-input-numeric--success .gb-field-input-numeric__container{border-color:#81c926}.gb-field-input-numeric--light.gb-field-input-numeric--success .gb-field-input-numeric__container .gb-field-input-numeric__icon{color:#81c926}.gb-field-input-numeric--light.gb-field-input-numeric--success .gb-field-input-numeric__container:hover{border-color:#659e1e}.gb-field-input-numeric--light.gb-field-input-numeric--success .gb-field-input-numeric__container:active{border-color:#81c926}.gb-field-input-numeric--light.gb-field-input-numeric--warning .gb-field-input-numeric__container{border-color:#fd7b1f}.gb-field-input-numeric--light.gb-field-input-numeric--warning .gb-field-input-numeric__container .gb-field-input-numeric__icon{color:#fd7b1f}.gb-field-input-numeric--light.gb-field-input-numeric--warning .gb-field-input-numeric__container:hover{border-color:#e76102}.gb-field-input-numeric--light.gb-field-input-numeric--warning .gb-field-input-numeric__container:active{border-color:#fd7b1f}.gb-field-input-numeric--light.gb-field-input-numeric--focused .gb-field-input-numeric__container{border-color:#0079c4!important}.gb-field-input-numeric--light.gb-field-input-numeric--focused .gb-field-input-numeric__container .gb-field-input-numeric__icon{color:#0079c4!important}',map:void 0,media:void 0})}),{mixins:[y,x,g],props:{append:{type:String,default:null},borders:{type:Boolean,default:!0},leftIcon:{type:String,default:null},max:{type:Number,default:null},min:{type:Number,default:null},placeholder:{type:String,default:null},readonly:{type:Boolean,default:!1},rightIcon:{type:String,default:null},rounded:{type:Boolean,default:!1},value:{type:Number,default:0}},data:()=>({focused:!1}),methods:{getInputValue(){let e=0;return this.$el&&(e=this.$el.querySelector("input").value||0,e=parseInt(e)),e},onAppendClick(e){e.stopPropagation(),this.$emit("appendClick",this.getInputValue(),this.name,e)},onContainerClick(e){this.$el.querySelector("input").focus(),this.$emit("click",this.getInputValue(),this.name,e)},onDecrement(){this.innerValue-=1,this.$emit("input",this.innerValue)},onIncrement(){this.innerValue+=1,this.$emit("input",this.innerValue)},onFieldBlur(e){this.focused=!1,this.$emit("blur",this.getInputValue(),this.name,e)},onFieldChange(e){this.$emit("change",this.getInputValue(),this.name,e)},onFieldFocus(e){this.focused=!0,this.$emit("focus",this.getInputValue(),this.name,e)},onFieldInput(e){const i=this.getInputValue();this.innerValue=i,this.$emit("input",i,this.name,e)},onFieldKeyDown(e){if(!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Backspace","Delete"].includes(e.key)&&!["1","2","3","4","5","6","7","8","9"].includes(e.key))return e.preventDefault();if(["ArrowDown","ArrowUp"].includes(e.key)){const i=e.shiftKey?10:1;"ArrowDown"===e.key?null!==this.min?this.innerValue=this.innerValue-i<this.min?this.min:this.innerValue-i:this.innerValue-=i:"ArrowUp"===e.key&&(null!==this.max?this.innerValue=this.innerValue+i>this.max?this.max:this.innerValue+i:this.innerValue+=i),this.$emit("input",this.innerValue)}this.$emit("keydown",this.getInputValue(),this.name,e)},onFieldKeyUp(e){const i=this.getInputValue();this.$emit("keyup",i,this.name,e),"Enter"===e.key&&this.$emit("submit",i,this.name,e)}}},void 0,!1,void 0,!1,b,void 0,void 0);const I=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{class:["gb-field-radios","gb-field-radios--"+e.size,"gb-field-radios--"+e.computedTheme,"gb-field-radios--"+e.computedStatus,{"gb-field-radios--disabled":e.disabled,"gb-field-radios--full-width":e.fullWidth}]},[t("div",{staticClass:"gb-field-radios__container"},e._l(e.radios,(function(i,a){return t("div",{key:i.value,class:["gb-field-radios__radio",{"js-tag-for-autofocus":0===a,"gb-field-radios__radio--active":i.value===e.innerValue}],attrs:{tabindex:"0"},on:{keypress:function(t){return t.preventDefault(),e.onKeypress(i,t)}}},[t("div",{staticClass:"gb-field-radios__field",on:{click:function(t){return e.onClick(i,t)}}},[t("span",{staticClass:"gb-field-radios__focuser"}),t("span",{staticClass:"gb-field-radios__dot"})]),i.label?t("field-label",{staticClass:"gb-field-radios__label",attrs:{required:e.required,size:e.size,theme:e.theme,uppercase:!1},on:{click:function(t){return e.onClick(i,t)}}},[e._v(e._s(i.label))]):e._e()],1)})),0),e.fieldMessageStatus?t("field-message",{attrs:{message:e.fieldMessageContent,size:e.size,status:e.fieldMessageStatus,theme:e.theme}}):e._e()],1)},staticRenderFns:[]},(function(e){e&&e("data-v-36cf25a7_0",{source:'.gb-field-radios{display:inline-block;text-align:left;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif}.gb-field-radios .gb-field-radios__container{margin-bottom:20px}.gb-field-radios .gb-field-radios__container .gb-field-radios__radio{display:flex;outline:0}.gb-field-radios .gb-field-radios__container .gb-field-radios__radio:last-of-type{margin-bottom:0}.gb-field-radios .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{position:relative;border-width:1px;border-style:solid;border-radius:100%;transition:all linear 250ms;cursor:pointer}.gb-field-radios .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field .gb-field-radios__focuser{position:absolute;top:-4px;right:-4px;bottom:-4px;left:-4px;border-width:1px;border-style:solid;border-color:transparent;border-radius:100%;opacity:0;transition:all linear 250ms}.gb-field-radios .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field .gb-field-radios__dot{position:absolute;top:50%;left:50%;display:inline-block;border-radius:100%;transition:all linear 250ms;transform:translate(-50%,-50%)}.gb-field-radios .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__label{flex:1;margin-top:2px;margin-bottom:0;font-weight:400}.gb-field-radios .gb-field-radios__container .gb-field-radios__radio:focus .gb-field-radios__field .gb-field-radios__focuser{opacity:1}.gb-field-radios--mini .gb-field-radios__container .gb-field-radios__radio{margin-bottom:16px}.gb-field-radios--mini .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{margin-right:6px;width:12px;height:12px}.gb-field-radios--mini .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field .gb-field-radios__dot{width:4px;height:4px}.gb-field-radios--small .gb-field-radios__container .gb-field-radios__radio{margin-bottom:17px}.gb-field-radios--small .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{margin-right:7px;width:14px;height:14px}.gb-field-radios--small .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field .gb-field-radios__dot{width:5px;height:5px}.gb-field-radios--default .gb-field-radios__container .gb-field-radios__radio{margin-bottom:18px}.gb-field-radios--default .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{margin-right:8px;width:16px;height:16px}.gb-field-radios--default .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field .gb-field-radios__dot{width:5px;height:5px}.gb-field-radios--medium .gb-field-radios__container .gb-field-radios__radio{margin-bottom:19px}.gb-field-radios--medium .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{margin-right:9px;width:18px;height:18px}.gb-field-radios--medium .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field .gb-field-radios__dot{width:6px;height:6px}.gb-field-radios--large .gb-field-radios__container .gb-field-radios__radio{margin-bottom:20px}.gb-field-radios--large .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{margin-right:10px;width:20px;height:20px}.gb-field-radios--large .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field .gb-field-radios__dot{width:6px;height:6px}.gb-field-radios--disabled{opacity:.7}.gb-field-radios--disabled .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field,.gb-field-radios--disabled .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__label{pointer-events:none;cursor:not-allowed}.gb-field-radios--full-width{width:100%}.gb-field-radios--dark .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{background-color:#222c3c}.gb-field-radios--dark .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field .gb-field-radios__dot{background-color:#222c3c}.gb-field-radios--dark .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__label{color:#fff}.gb-field-radios--dark .gb-field-radios__container .gb-field-radios__radio--active .gb-field-radios__field .gb-field-radios__dot{background-color:#fff}.gb-field-radios--dark.gb-field-radios--error .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{border-color:#e0102b}.gb-field-radios--dark.gb-field-radios--error .gb-field-radios__container .gb-field-radios__radio:hover .gb-field-radios__field{border-color:#f0334b}.gb-field-radios--dark.gb-field-radios--error .gb-field-radios__container .gb-field-radios__radio:active .gb-field-radios__field{border-color:#e0102b}.gb-field-radios--dark.gb-field-radios--error .gb-field-radios__container .gb-field-radios__radio:focus .gb-field-radios__field .gb-field-radios__focuser{border-color:#e0102b}.gb-field-radios--dark.gb-field-radios--error .gb-field-radios__container .gb-field-radios__radio--active .gb-field-radios__field{border-color:#e0102b;background-color:rgba(224,16,43,.4)}.gb-field-radios--dark.gb-field-radios--normal .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{border-color:#313d4f}.gb-field-radios--dark.gb-field-radios--normal .gb-field-radios__container .gb-field-radios__radio:hover .gb-field-radios__field{border-color:#45556e}.gb-field-radios--dark.gb-field-radios--normal .gb-field-radios__container .gb-field-radios__radio:active .gb-field-radios__field{border-color:#313d4f}.gb-field-radios--dark.gb-field-radios--normal .gb-field-radios__container .gb-field-radios__radio:focus .gb-field-radios__field .gb-field-radios__focuser{border-color:#313d4f}.gb-field-radios--dark.gb-field-radios--normal .gb-field-radios__container .gb-field-radios__radio--active .gb-field-radios__field{border-color:#0093ee;background-color:rgba(0,147,238,.4)}.gb-field-radios--dark.gb-field-radios--normal .gb-field-radios__container .gb-field-radios__radio--active:hover .gb-field-radios__field{border-color:#22abff}.gb-field-radios--dark.gb-field-radios--normal .gb-field-radios__container .gb-field-radios__radio--active:focus .gb-field-radios__field .gb-field-radios__focuser{border-color:#0093ee}.gb-field-radios--dark.gb-field-radios--success .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{border-color:#96bf47}.gb-field-radios--dark.gb-field-radios--success .gb-field-radios__container .gb-field-radios__radio:hover .gb-field-radios__field{border-color:#accc6d}.gb-field-radios--dark.gb-field-radios--success .gb-field-radios__container .gb-field-radios__radio:active .gb-field-radios__field{border-color:#96bf47}.gb-field-radios--dark.gb-field-radios--success .gb-field-radios__container .gb-field-radios__radio:focus .gb-field-radios__field .gb-field-radios__focuser{border-color:#96bf47}.gb-field-radios--dark.gb-field-radios--success .gb-field-radios__container .gb-field-radios__radio--active .gb-field-radios__field{border-color:#96bf47;background-color:rgba(150,191,71,.4)}.gb-field-radios--dark.gb-field-radios--warning .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{border-color:#ffc02a}.gb-field-radios--dark.gb-field-radios--warning .gb-field-radios__container .gb-field-radios__radio:hover .gb-field-radios__field{border-color:#ffcf5d}.gb-field-radios--dark.gb-field-radios--warning .gb-field-radios__container .gb-field-radios__radio:active .gb-field-radios__field{border-color:#ffc02a}.gb-field-radios--dark.gb-field-radios--warning .gb-field-radios__container .gb-field-radios__radio:focus .gb-field-radios__field .gb-field-radios__focuser{border-color:#ffc02a}.gb-field-radios--dark.gb-field-radios--warning .gb-field-radios__container .gb-field-radios__radio--active .gb-field-radios__field{border-color:#ffc02a;background-color:rgba(255,192,42,.4)}.gb-field-radios--light .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{background-color:#fff}.gb-field-radios--light .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field .gb-field-radios__dot{background-color:#fff}.gb-field-radios--light .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__label{color:#171e29}.gb-field-radios--light .gb-field-radios__container .gb-field-radios__radio--active .gb-field-radios__field .gb-field-radios__dot{background-color:#fff}.gb-field-radios--light.gb-field-radios--error .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{border-color:#e0102b}.gb-field-radios--light.gb-field-radios--error .gb-field-radios__container .gb-field-radios__radio:hover .gb-field-radios__field{border-color:#b00d22}.gb-field-radios--light.gb-field-radios--error .gb-field-radios__container .gb-field-radios__radio:active .gb-field-radios__field{border-color:#e0102b}.gb-field-radios--light.gb-field-radios--error .gb-field-radios__container .gb-field-radios__radio:focus .gb-field-radios__field .gb-field-radios__focuser{border-color:#e0102b}.gb-field-radios--light.gb-field-radios--error .gb-field-radios__container .gb-field-radios__radio--active .gb-field-radios__field{border-color:#e0102b;background-color:rgba(224,16,43,.9)}.gb-field-radios--light.gb-field-radios--normal .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{border-color:#c5d9e8}.gb-field-radios--light.gb-field-radios--normal .gb-field-radios__container .gb-field-radios__radio:hover .gb-field-radios__field{border-color:#a0c1da}.gb-field-radios--light.gb-field-radios--normal .gb-field-radios__container .gb-field-radios__radio:active .gb-field-radios__field{border-color:#c5d9e8}.gb-field-radios--light.gb-field-radios--normal .gb-field-radios__container .gb-field-radios__radio:focus .gb-field-radios__field .gb-field-radios__focuser{border-color:#c5d9e8}.gb-field-radios--light.gb-field-radios--normal .gb-field-radios__container .gb-field-radios__radio--active .gb-field-radios__field{border-color:#0079c4;background-color:rgba(0,121,196,.9)}.gb-field-radios--light.gb-field-radios--normal .gb-field-radios__container .gb-field-radios__radio--active:hover .gb-field-radios__field{border-color:#005a91}.gb-field-radios--light.gb-field-radios--normal .gb-field-radios__container .gb-field-radios__radio--active:focus .gb-field-radios__field .gb-field-radios__focuser{border-color:#0079c4}.gb-field-radios--light.gb-field-radios--success .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{border-color:#81c926}.gb-field-radios--light.gb-field-radios--success .gb-field-radios__container .gb-field-radios__radio:hover .gb-field-radios__field{border-color:#659e1e}.gb-field-radios--light.gb-field-radios--success .gb-field-radios__container .gb-field-radios__radio:active .gb-field-radios__field{border-color:#81c926}.gb-field-radios--light.gb-field-radios--success .gb-field-radios__container .gb-field-radios__radio:focus .gb-field-radios__field .gb-field-radios__focuser{border-color:#81c926}.gb-field-radios--light.gb-field-radios--success .gb-field-radios__container .gb-field-radios__radio--active .gb-field-radios__field{border-color:#81c926;background-color:rgba(129,201,38,.9)}.gb-field-radios--light.gb-field-radios--warning .gb-field-radios__container .gb-field-radios__radio .gb-field-radios__field{border-color:#fd7b1f}.gb-field-radios--light.gb-field-radios--warning .gb-field-radios__container .gb-field-radios__radio:hover .gb-field-radios__field{border-color:#e76102}.gb-field-radios--light.gb-field-radios--warning .gb-field-radios__container .gb-field-radios__radio:active .gb-field-radios__field{border-color:#fd7b1f}.gb-field-radios--light.gb-field-radios--warning .gb-field-radios__container .gb-field-radios__radio:focus .gb-field-radios__field .gb-field-radios__focuser{border-color:#fd7b1f}.gb-field-radios--light.gb-field-radios--warning .gb-field-radios__container .gb-field-radios__radio--active .gb-field-radios__field{border-color:#fd7b1f;background-color:rgba(253,123,31,.9)}',map:void 0,media:void 0})}),{mixins:[y,x,g],props:{radios:{type:Array,required:!0,validator:e=>e.length>0},value:{type:[Number,String],default:null}},methods:{onClick(e,i){const t=e.value;t!==this.innerValue&&(this.innerValue=t,this.$emit("change",t,this.name,i),this.$emit("input",t))},onKeypress(e,i){"Space"===i.code&&this.onClick(e,i)}}},void 0,!1,void 0,!1,b,void 0,void 0);const q=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.onClose,expression:"onClose"},{name:"hotkey",rawName:"v-hotkey",value:e.hotkeys,expression:"hotkeys"}],class:["gb-field-select","gb-field-select--"+e.direction,"gb-field-select--"+e.size,"gb-field-select--"+e.computedTheme,"gb-field-select--"+e.computedStatus,{"gb-field-select--clearable":e.clearable,"gb-field-select--disabled":e.disabled,"gb-field-select--opened":e.opened,"gb-field-select--full-width":e.fullWidth,"gb-field-select--with-left-icon":e.computedLeftIcon&&(!e.$scopedSlots["option-left"]||!e.selectedOption)}]},[e.label?t("field-label",{staticClass:"gb-field-select__label",attrs:{forField:e.uuid,required:e.required,size:e.size,theme:e.theme},on:{click:e.onLabelClick}},[e._v(e._s(e.label))]):e._e(),t("div",{staticClass:"gb-field-select__container"},[t("div",{staticClass:"gb-field-select__field js-tag-for-autofocus",attrs:{tabindex:"0"},on:{click:e.onContainerClick,keypress:function(i){return i.preventDefault(),e.onContainerKeypress(i)}}},[!e.computedLeftIcon||e.$scopedSlots["option-left"]&&e.selectedOption?e._e():t("base-icon",{staticClass:"gb-field-select__icon gb-field-select__icon--left",attrs:{name:e.computedLeftIcon}}),e.selectedOption?t("span",{staticClass:"gb-field-select__option gb-field-select__option--selected"},[e.$scopedSlots["option-left"]?t("span",{staticClass:"gb-field-select__option-left"},[e._t("option-left",null,{option:e.selectedOption})],2):e._e(),t("span",{staticClass:"gb-field-select__option-label"},[e._v(e._s(e.selectedOption.label))]),e.$scopedSlots["option-right"]?t("span",{staticClass:"gb-field-select__option-right"},[e._t("option-right",null,{option:e.selectedOption})],2):e._e()]):e.placeholder?t("div",{staticClass:"gb-field-select__option gb-field-select__option--placeholder"},[e._v(e._s(e.placeholder))]):e._e(),e.clearable&&e.selectedOption?t("base-icon",{staticClass:"gb-field-select__icon gb-field-select__icon--clear",attrs:{name:"cancel"},on:{click:e.onClear}}):e._e(),t("base-icon",{staticClass:"gb-field-select__icon gb-field-select__icon--arrow",attrs:{name:"arrow_drop_down"}})],1),t("div",{directives:[{name:"show",rawName:"v-show",value:e.opened&&!e.disabled,expression:"opened && !disabled"}],staticClass:"gb-field-select__options"},[e.searchable&&e.opened?t("field-input",{staticClass:"gb-field-select__search",attrs:{autofocus:!0,borders:!1,size:e.size,placeholder:"Search...","left-icon":"search"},on:{input:e.onSearchInput}}):e._e(),e._l(e.computedOptions,(function(i,a){return t("div",{key:i.value,class:["gb-field-select__option",{"js-keyboard-focused-option":e.keyboardIndex===a,"gb-field-select__option--keyboard-focused":e.keyboardIndex===a,"gb-field-select__option--selected":e.selectedOption&&i.value===e.selectedOption.value}],attrs:{tabindex:"0"},on:{click:function(t){return e.onOptionClick(i,t)},keypress:function(t){return t.preventDefault(),e.onOptionKeypress(i,t)}}},[e.$scopedSlots["option-left"]?t("span",{staticClass:"gb-field-select__option-left"},[e._t("option-left",null,{option:i})],2):e._e(),t("span",{staticClass:"gb-field-select__option-label"},[e._v(e._s(i.label))]),e.$scopedSlots["option-right"]?t("span",{staticClass:"gb-field-select__option-right"},[e._t("option-right",null,{option:i})],2):e._e()])}))],2)]),e.fieldMessageStatus?t("field-message",{attrs:{message:e.fieldMessageContent,size:e.size,status:e.fieldMessageStatus,theme:e.theme}}):e._e()],1)},staticRenderFns:[]},(function(e){e&&e("data-v-2546fe39_0",{source:'.gb-field-select{display:flex;flex-direction:column;text-align:left;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif}.gb-field-select .gb-field-select__container{position:relative}.gb-field-select .gb-field-select__container .gb-field-select__field,.gb-field-select .gb-field-select__container .gb-field-select__options{display:flex;overflow:hidden;box-sizing:border-box;border-width:1px;border-style:solid;transition:border-color linear 250ms;user-select:none;cursor:pointer}.gb-field-select .gb-field-select__container .gb-field-select__field .gb-field-select__option,.gb-field-select .gb-field-select__container .gb-field-select__options .gb-field-select__option{display:flex;overflow:hidden;align-items:center;flex:1;text-overflow:ellipsis;white-space:nowrap}.gb-field-select .gb-field-select__container .gb-field-select__field .gb-field-select__option .gb-field-select__option-left,.gb-field-select .gb-field-select__container .gb-field-select__field .gb-field-select__option .gb-field-select__option-right,.gb-field-select .gb-field-select__container .gb-field-select__options .gb-field-select__option .gb-field-select__option-left,.gb-field-select .gb-field-select__container .gb-field-select__options .gb-field-select__option .gb-field-select__option-right{flex:0 0 auto}.gb-field-select .gb-field-select__container .gb-field-select__field .gb-field-select__option .gb-field-select__option-left,.gb-field-select .gb-field-select__container .gb-field-select__options .gb-field-select__option .gb-field-select__option-left{margin-right:6px}.gb-field-select .gb-field-select__container .gb-field-select__field .gb-field-select__option .gb-field-select__option-label,.gb-field-select .gb-field-select__container .gb-field-select__options .gb-field-select__option .gb-field-select__option-label{flex:1}.gb-field-select .gb-field-select__container .gb-field-select__field .gb-field-select__option .gb-field-select__option-right,.gb-field-select .gb-field-select__container .gb-field-select__options .gb-field-select__option .gb-field-select__option-right{margin-left:6px}.gb-field-select .gb-field-select__container .gb-field-select__field .gb-field-select__option:focus,.gb-field-select .gb-field-select__container .gb-field-select__field .gb-field-select__option:hover,.gb-field-select .gb-field-select__container .gb-field-select__options .gb-field-select__option:focus,.gb-field-select .gb-field-select__container .gb-field-select__options .gb-field-select__option:hover{outline:0}.gb-field-select .gb-field-select__container .gb-field-select__field{position:relative;align-items:center}.gb-field-select .gb-field-select__container .gb-field-select__field:focus{outline:0}.gb-field-select .gb-field-select__container .gb-field-select__field .gb-field-select__icon{position:absolute;flex:0 0 auto}.gb-field-select .gb-field-select__container .gb-field-select__field .gb-field-select__icon--left{left:9px}.gb-field-select .gb-field-select__container .gb-field-select__field .gb-field-select__icon--clear{right:30px;opacity:.8;transition:opacity 250ms linear}.gb-field-select .gb-field-select__container .gb-field-select__field .gb-field-select__icon--clear:hover{opacity:1}.gb-field-select .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow{right:9px;transition:transform 250ms linear}.gb-field-select .gb-field-select__container .gb-field-select__options{position:absolute;right:0;left:0;z-index:1;overflow-y:auto;flex-direction:column;max-height:180px;user-select:none}.gb-field-select .gb-field-select__container .gb-field-select__options .gb-field-select__search{border-bottom-width:1px;border-bottom-style:solid}.gb-field-select .gb-field-select__container .gb-field-select__options .gb-field-select__option{flex:0 0 auto;border-bottom-width:1px;border-bottom-style:solid}.gb-field-select .gb-field-select__container .gb-field-select__options .gb-field-select__option:last-of-type{border-bottom:none}.gb-field-select .gb-field-select__container .gb-field-select__options .gb-field-select__option--selected .gb-field-select__option-label{text-decoration:underline}.gb-field-select--bottom .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow{transform:rotate(0)}.gb-field-select--bottom .gb-field-select__container .gb-field-select__options{top:100%}.gb-field-select--bottom .gb-field-select__container .gb-field-select__options .gb-field-select__option:last-of-type{border-bottom:none}.gb-field-select--bottom.gb-field-select--opened .gb-field-select__container .gb-field-select__field{border-bottom-right-radius:0;border-bottom-left-radius:0}.gb-field-select--bottom.gb-field-select--opened .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow{transform:rotate(180deg)}.gb-field-select--bottom.gb-field-select--opened .gb-field-select__container .gb-field-select__options{border-top:none;border-top-left-radius:0;border-top-right-radius:0}.gb-field-select--top .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow{transform:rotate(180deg)}.gb-field-select--top .gb-field-select__container .gb-field-select__options{bottom:100%}.gb-field-select--top.gb-field-select--opened .gb-field-select__container .gb-field-select__field{border-top-left-radius:0;border-top-right-radius:0}.gb-field-select--top.gb-field-select--opened .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow{transform:rotate(0)}.gb-field-select--top.gb-field-select--opened .gb-field-select__container .gb-field-select__options{border-bottom:none;border-bottom-right-radius:0;border-bottom-left-radius:0}.gb-field-select--mini .gb-field-select__container .gb-field-select__field,.gb-field-select--mini .gb-field-select__container .gb-field-select__options{border-radius:3px}.gb-field-select--mini .gb-field-select__container .gb-field-select__field .gb-field-select__option,.gb-field-select--mini .gb-field-select__container .gb-field-select__options .gb-field-select__option{padding:0 35px 0 10px;font-size:12px}.gb-field-select--mini .gb-field-select__container .gb-field-select__field{height:32px}.gb-field-select--mini .gb-field-select__container .gb-field-select__field .gb-field-select__icon{font-size:16px!important}.gb-field-select--mini .gb-field-select__container .gb-field-select__options .gb-field-select__option{height:32px}.gb-field-select--small .gb-field-select__container .gb-field-select__field,.gb-field-select--small .gb-field-select__container .gb-field-select__options{border-radius:4px}.gb-field-select--small .gb-field-select__container .gb-field-select__field .gb-field-select__option,.gb-field-select--small .gb-field-select__container .gb-field-select__options .gb-field-select__option{padding:0 35px 0 11px;font-size:13px}.gb-field-select--small .gb-field-select__container .gb-field-select__field{height:36px}.gb-field-select--small .gb-field-select__container .gb-field-select__field .gb-field-select__icon{font-size:17px!important}.gb-field-select--small .gb-field-select__container .gb-field-select__options .gb-field-select__option{height:36px}.gb-field-select--default .gb-field-select__container .gb-field-select__field,.gb-field-select--default .gb-field-select__container .gb-field-select__options{border-radius:5px}.gb-field-select--default .gb-field-select__container .gb-field-select__field .gb-field-select__option,.gb-field-select--default .gb-field-select__container .gb-field-select__options .gb-field-select__option{padding:0 35px 0 12px;font-size:14px}.gb-field-select--default .gb-field-select__container .gb-field-select__field{height:40px}.gb-field-select--default .gb-field-select__container .gb-field-select__field .gb-field-select__icon{font-size:18px!important}.gb-field-select--default .gb-field-select__container .gb-field-select__options .gb-field-select__option{height:40px}.gb-field-select--medium .gb-field-select__container .gb-field-select__field,.gb-field-select--medium .gb-field-select__container .gb-field-select__options{border-radius:6px}.gb-field-select--medium .gb-field-select__container .gb-field-select__field .gb-field-select__option,.gb-field-select--medium .gb-field-select__container .gb-field-select__options .gb-field-select__option{padding:0 35px 0 13px;font-size:15px}.gb-field-select--medium .gb-field-select__container .gb-field-select__field{height:44px}.gb-field-select--medium .gb-field-select__container .gb-field-select__field .gb-field-select__icon{font-size:19px!important}.gb-field-select--medium .gb-field-select__container .gb-field-select__options .gb-field-select__option{height:44px}.gb-field-select--large .gb-field-select__container .gb-field-select__field,.gb-field-select--large .gb-field-select__container .gb-field-select__options{border-radius:7px}.gb-field-select--large .gb-field-select__container .gb-field-select__field .gb-field-select__option,.gb-field-select--large .gb-field-select__container .gb-field-select__options .gb-field-select__option{padding:0 35px 0 14px;font-size:16px}.gb-field-select--large .gb-field-select__container .gb-field-select__field{height:48px}.gb-field-select--large .gb-field-select__container .gb-field-select__field .gb-field-select__icon{font-size:20px!important}.gb-field-select--large .gb-field-select__container .gb-field-select__options .gb-field-select__option{height:48px}.gb-field-select--clearable .gb-field-select__container .gb-field-select__field .gb-field-select__option,.gb-field-select--clearable .gb-field-select__container .gb-field-select__options .gb-field-select__option{padding-right:60px}.gb-field-select--disabled{opacity:.7}.gb-field-select--disabled .gb-field-select__field,.gb-field-select--disabled .gb-field-select__label{pointer-events:none;cursor:not-allowed}.gb-field-select--full-width{width:100%}.gb-field-select--with-left-icon .gb-field-select__container .gb-field-select__field .gb-field-select__option{padding-left:35px}.gb-field-select--dark .gb-field-select__container .gb-field-select__field,.gb-field-select--dark .gb-field-select__container .gb-field-select__options{background-color:#222c3c}.gb-field-select--dark .gb-field-select__container .gb-field-select__field .gb-field-select__option,.gb-field-select--dark .gb-field-select__container .gb-field-select__options .gb-field-select__option{color:#a9c7df}.gb-field-select--dark .gb-field-select__container .gb-field-select__field .gb-field-select__option--placeholder,.gb-field-select--dark .gb-field-select__container .gb-field-select__options .gb-field-select__option--placeholder{color:#8eacc5}.gb-field-select--dark .gb-field-select__container .gb-field-select__field .gb-field-select__option--selected,.gb-field-select--dark .gb-field-select__container .gb-field-select__options .gb-field-select__option--selected{color:#fff}.gb-field-select--dark .gb-field-select__container .gb-field-select__field .gb-field-select__option:focus,.gb-field-select--dark .gb-field-select__container .gb-field-select__options .gb-field-select__option:focus{color:#fff}.gb-field-select--dark .gb-field-select__container .gb-field-select__options .gb-field-select__search{border-bottom-color:#313d4f}.gb-field-select--dark .gb-field-select__container .gb-field-select__options .gb-field-select__option{border-bottom-color:#313d4f}.gb-field-select--dark .gb-field-select__container .gb-field-select__options .gb-field-select__option:focus,.gb-field-select--dark .gb-field-select__container .gb-field-select__options .gb-field-select__option:hover{background-color:#273142}.gb-field-select--dark.gb-field-select--error .gb-field-select__container .gb-field-select__field{border-color:#e0102b}.gb-field-select--dark.gb-field-select--error .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow,.gb-field-select--dark.gb-field-select--error .gb-field-select__container .gb-field-select__field .gb-field-select__icon--left{color:#e0102b}.gb-field-select--dark.gb-field-select--error .gb-field-select__container .gb-field-select__field:hover{border-color:#f0334b}.gb-field-select--dark.gb-field-select--error .gb-field-select__container .gb-field-select__field:focus{border-color:#0093ee}.gb-field-select--dark.gb-field-select--error .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--arrow,.gb-field-select--dark.gb-field-select--error .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--left{color:#0093ee}.gb-field-select--dark.gb-field-select--error .gb-field-select__container .gb-field-select__field:active{border-color:#e0102b}.gb-field-select--dark.gb-field-select--normal .gb-field-select__container .gb-field-select__field{border-color:#313d4f}.gb-field-select--dark.gb-field-select--normal .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow,.gb-field-select--dark.gb-field-select--normal .gb-field-select__container .gb-field-select__field .gb-field-select__icon--left{color:#8eacc5}.gb-field-select--dark.gb-field-select--normal .gb-field-select__container .gb-field-select__field:hover{border-color:#45556e}.gb-field-select--dark.gb-field-select--normal .gb-field-select__container .gb-field-select__field:focus{border-color:#0093ee}.gb-field-select--dark.gb-field-select--normal .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--arrow,.gb-field-select--dark.gb-field-select--normal .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--left{color:#0093ee}.gb-field-select--dark.gb-field-select--normal .gb-field-select__container .gb-field-select__field:active{border-color:#313d4f}.gb-field-select--dark.gb-field-select--success .gb-field-select__container .gb-field-select__field{border-color:#96bf47}.gb-field-select--dark.gb-field-select--success .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow,.gb-field-select--dark.gb-field-select--success .gb-field-select__container .gb-field-select__field .gb-field-select__icon--left{color:#96bf47}.gb-field-select--dark.gb-field-select--success .gb-field-select__container .gb-field-select__field:hover{border-color:#accc6d}.gb-field-select--dark.gb-field-select--success .gb-field-select__container .gb-field-select__field:focus{border-color:#0093ee}.gb-field-select--dark.gb-field-select--success .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--arrow,.gb-field-select--dark.gb-field-select--success .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--left{color:#0093ee}.gb-field-select--dark.gb-field-select--success .gb-field-select__container .gb-field-select__field:active{border-color:#96bf47}.gb-field-select--dark.gb-field-select--warning .gb-field-select__container .gb-field-select__field{border-color:#ffc02a}.gb-field-select--dark.gb-field-select--warning .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow,.gb-field-select--dark.gb-field-select--warning .gb-field-select__container .gb-field-select__field .gb-field-select__icon--left{color:#ffc02a}.gb-field-select--dark.gb-field-select--warning .gb-field-select__container .gb-field-select__field:hover{border-color:#ffcf5d}.gb-field-select--dark.gb-field-select--warning .gb-field-select__container .gb-field-select__field:focus{border-color:#0093ee}.gb-field-select--dark.gb-field-select--warning .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--arrow,.gb-field-select--dark.gb-field-select--warning .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--left{color:#0093ee}.gb-field-select--dark.gb-field-select--warning .gb-field-select__container .gb-field-select__field:active{border-color:#ffc02a}.gb-field-select--dark.gb-field-select--opened .gb-field-select__container .gb-field-select__field,.gb-field-select--dark.gb-field-select--opened .gb-field-select__container .gb-field-select__options{border-color:#0093ee!important}.gb-field-select--dark.gb-field-select--opened .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow,.gb-field-select--dark.gb-field-select--opened .gb-field-select__container .gb-field-select__field .gb-field-select__icon--left{color:#0093ee!important}.gb-field-select--dark.gb-field-select--opened .gb-field-select__container .gb-field-select__options .gb-field-select__option--keyboard-focused{border-bottom-color:#0093ee;background-color:#0093ee;color:#fff}.gb-field-select--light .gb-field-select__container .gb-field-select__field,.gb-field-select--light .gb-field-select__container .gb-field-select__options{background-color:#fff}.gb-field-select--light .gb-field-select__container .gb-field-select__field .gb-field-select__option,.gb-field-select--light .gb-field-select__container .gb-field-select__options .gb-field-select__option{color:#434a54}.gb-field-select--light .gb-field-select__container .gb-field-select__field .gb-field-select__option--placeholder,.gb-field-select--light .gb-field-select__container .gb-field-select__options .gb-field-select__option--placeholder{color:#5a5a5a}.gb-field-select--light .gb-field-select__container .gb-field-select__field .gb-field-select__option--selected,.gb-field-select--light .gb-field-select__container .gb-field-select__options .gb-field-select__option--selected{color:#171e29}.gb-field-select--light .gb-field-select__container .gb-field-select__field .gb-field-select__option:focus,.gb-field-select--light .gb-field-select__container .gb-field-select__options .gb-field-select__option:focus{color:#171e29}.gb-field-select--light .gb-field-select__container .gb-field-select__options .gb-field-select__search{border-bottom-color:#c5d9e8}.gb-field-select--light .gb-field-select__container .gb-field-select__options .gb-field-select__option{border-bottom-color:#c5d9e8}.gb-field-select--light .gb-field-select__container .gb-field-select__options .gb-field-select__option:focus,.gb-field-select--light .gb-field-select__container .gb-field-select__options .gb-field-select__option:hover{background-color:#fafbfc}.gb-field-select--light.gb-field-select--error .gb-field-select__container .gb-field-select__field{border-color:#e0102b}.gb-field-select--light.gb-field-select--error .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow,.gb-field-select--light.gb-field-select--error .gb-field-select__container .gb-field-select__field .gb-field-select__icon--left{color:#e0102b}.gb-field-select--light.gb-field-select--error .gb-field-select__container .gb-field-select__field:hover{border-color:#b00d22}.gb-field-select--light.gb-field-select--error .gb-field-select__container .gb-field-select__field:focus{border-color:#0079c4}.gb-field-select--light.gb-field-select--error .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--arrow,.gb-field-select--light.gb-field-select--error .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--left{color:#0079c4}.gb-field-select--light.gb-field-select--error .gb-field-select__container .gb-field-select__field:active{border-color:#e0102b}.gb-field-select--light.gb-field-select--normal .gb-field-select__container .gb-field-select__field{border-color:#c5d9e8}.gb-field-select--light.gb-field-select--normal .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow,.gb-field-select--light.gb-field-select--normal .gb-field-select__container .gb-field-select__field .gb-field-select__icon--left{color:#5a5a5a}.gb-field-select--light.gb-field-select--normal .gb-field-select__container .gb-field-select__field:hover{border-color:#a0c1da}.gb-field-select--light.gb-field-select--normal .gb-field-select__container .gb-field-select__field:focus{border-color:#0079c4}.gb-field-select--light.gb-field-select--normal .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--arrow,.gb-field-select--light.gb-field-select--normal .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--left{color:#0079c4}.gb-field-select--light.gb-field-select--normal .gb-field-select__container .gb-field-select__field:active{border-color:#c5d9e8}.gb-field-select--light.gb-field-select--success .gb-field-select__container .gb-field-select__field{border-color:#81c926}.gb-field-select--light.gb-field-select--success .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow,.gb-field-select--light.gb-field-select--success .gb-field-select__container .gb-field-select__field .gb-field-select__icon--left{color:#81c926}.gb-field-select--light.gb-field-select--success .gb-field-select__container .gb-field-select__field:hover{border-color:#659e1e}.gb-field-select--light.gb-field-select--success .gb-field-select__container .gb-field-select__field:focus{border-color:#0079c4}.gb-field-select--light.gb-field-select--success .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--arrow,.gb-field-select--light.gb-field-select--success .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--left{color:#0079c4}.gb-field-select--light.gb-field-select--success .gb-field-select__container .gb-field-select__field:active{border-color:#81c926}.gb-field-select--light.gb-field-select--warning .gb-field-select__container .gb-field-select__field{border-color:#fd7b1f}.gb-field-select--light.gb-field-select--warning .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow,.gb-field-select--light.gb-field-select--warning .gb-field-select__container .gb-field-select__field .gb-field-select__icon--left{color:#fd7b1f}.gb-field-select--light.gb-field-select--warning .gb-field-select__container .gb-field-select__field:hover{border-color:#e76102}.gb-field-select--light.gb-field-select--warning .gb-field-select__container .gb-field-select__field:focus{border-color:#0079c4}.gb-field-select--light.gb-field-select--warning .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--arrow,.gb-field-select--light.gb-field-select--warning .gb-field-select__container .gb-field-select__field:focus .gb-field-select__icon--left{color:#0079c4}.gb-field-select--light.gb-field-select--warning .gb-field-select__container .gb-field-select__field:active{border-color:#fd7b1f}.gb-field-select--light.gb-field-select--opened .gb-field-select__container .gb-field-select__field,.gb-field-select--light.gb-field-select--opened .gb-field-select__container .gb-field-select__options{border-color:#0079c4!important}.gb-field-select--light.gb-field-select--opened .gb-field-select__container .gb-field-select__field .gb-field-select__icon--arrow,.gb-field-select--light.gb-field-select--opened .gb-field-select__container .gb-field-select__field .gb-field-select__icon--left{color:#0079c4!important}.gb-field-select--light.gb-field-select--opened .gb-field-select__container .gb-field-select__options .gb-field-select__option--keyboard-focused{border-bottom-color:#0079c4;background-color:#0079c4;color:#fff}',map:void 0,media:void 0})}),{directives:{clickOutside:__WEBPACK_IMPORTED_MODULE_0_v_click_outside___default.a.directive,hotkey:__WEBPACK_IMPORTED_MODULE_1_v_hotkey___default.a.directive},components:{FieldInput:S},mixins:[y,x,g],props:{clearable:{type:Boolean,default:!1},direction:{type:String,default:"bottom",validator:e=>["bottom","top"].includes(e)},leftIcon:{type:String,default:null},options:{type:Array,default:()=>[]},placeholder:{type:String,default:null},searchable:{type:Boolean,default:!1},value:{type:[Number,String],default:null}},data:()=>({opened:!1,keyboardIndex:null,searchQuery:""}),computed:{computedLeftIcon(){return"error"===this.computedStatus?"close":"success"===this.computedStatus?"check":"warning"===this.computedStatus?"warning":this.leftIcon},computedOptions(){return this.searchQuery?this.options.filter(e=>e.label.toLowerCase().includes(this.searchQuery.toLowerCase())):this.options},hotkeys(){return{esc:this.onClose,down:this.onNavigateWithKeyboard,enter:this.onNavigateWithKeyboard,up:this.onNavigateWithKeyboard}},selectedOption(){return this.options.find(e=>e.value===this.innerValue)}},methods:{reset(){this.opened=!1,this.keyboardIndex=null,this.searchQuery=""},selectOption(e){this.innerValue=e,this.$emit("change",e,this.name,event),this.$emit("input",e),this.reset(),this.focus()},onClear(e,i){i.stopPropagation(),this.$emit("change",null,null,i),this.$emit("input",null),this.$emit("clear")},onClose(){this.reset()},onContainerClick(e){this.disabled||(this.opened=!this.opened,this.$emit("click",(this.selectedOption||{}).value,this.name,e))},onContainerKeypress(e){"Space"===e.code&&e.target.click()},onLabelClick(){this.disabled||(this.opened=!this.opened)},onNavigateWithKeyboard(e){if(this.opened){e.preventDefault();const i=e.code;["ArrowDown","ArrowUp"].includes(i)?("ArrowDown"===i?this.keyboardIndex<this.computedOptions.length-1&&null!==this.keyboardIndex?this.keyboardIndex+=1:this.keyboardIndex=0:"ArrowUp"===i&&(0!==this.keyboardIndex&&null!==this.keyboardIndex?this.keyboardIndex-=1:this.keyboardIndex=this.computedOptions.length-1),this.$nextTick(()=>{const e=this.$el.querySelector(".js-keyboard-focused-option");e&&e.scrollIntoView({behavior:"auto",block:"nearest"})})):"Enter"===i&&this.selectOption(this.computedOptions[this.keyboardIndex].value)}},onOptionClick(e,i){(this.selectedOption||{}).value!==e.value&&this.selectOption(e.value)},onOptionKeypress(e,i){"Space"===i.code&&i.target.click()},onSearchInput(e){this.searchQuery=e,this.keyboardIndex=0}}},void 0,!1,void 0,!1,b,void 0,void 0);const F=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{class:["gb-field-tabs","gb-field-tabs--"+e.size,"gb-field-tabs--"+e.computedTheme,"gb-field-tabs--"+e.computedStatus,{"gb-field-tabs--disabled":e.disabled,"gb-field-tabs--full-width":e.fullWidth,"gb-field-tabs--multiple":e.multiple}]},[e.label?t("field-label",{staticClass:"gb-field-tabs__label",attrs:{required:e.required,size:e.size,theme:e.theme},on:{click:e.onLabelClick}},[e._v(e._s(e.label))]):e._e(),t("div",{staticClass:"gb-field-tabs__container"},e._l(e.tabs,(function(i,a){return t("span",{class:["gb-field-tabs__tab","js-field-tab",{"gb-field-tabs__tab--active":e.innerValue===i.value||Array.isArray(e.innerValue)&&e.innerValue.includes(i.value),"gb-field-tabs__tab--active-next":e.checkActiveBrother("asc",a+1),"gb-field-tabs__tab--active-previous":e.checkActiveBrother("desc",a-1),"gb-field-tabs__tab--with-label":i.label}],attrs:{tabindex:"0"},on:{click:function(t){return e.onTabClick(i.value,t)},keypress:function(i){return i.preventDefault(),e.onTabKeypress(i)}}},[e.$scopedSlots["tab-left"]?t("span",{staticClass:"gb-field-tabs__tab-left"},[e._t("tab-left",null,{tab:i})],2):e._e(),i.label?t("span",{staticClass:"gb-field-tabs__label"},[e._v(e._s(i.label))]):i.icon?t("base-icon",{staticClass:"gb-field-tabs__label",attrs:{name:i.icon,size:i.iconSize||e.computedIconSize}}):e._e(),e.$scopedSlots["tab-right"]?t("span",{staticClass:"gb-field-tabs__tab-right"},[e._t("tab-right",null,{tab:i})],2):e._e()],1)})),0),e.fieldMessageStatus?t("field-message",{attrs:{message:e.fieldMessageContent,size:e.size,status:e.fieldMessageStatus,theme:e.theme}}):e._e()],1)},staticRenderFns:[]},(function(e){e&&e("data-v-114ab473_0",{source:'.gb-field-tabs{display:inline-block;-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent}.gb-field-tabs .gb-field-tabs__container{display:inline-flex;align-items:center;border-radius:4px;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif;cursor:pointer}.gb-field-tabs .gb-field-tabs__container .gb-field-tabs__tab{display:flex;align-items:center;flex:0 0 auto;box-sizing:border-box;outline:0;border-width:1px;border-style:solid;border-color:transparent;font-weight:500;transition-timing-function:linear;transition-duration:250ms;transition-property:color,background-color;user-select:none}.gb-field-tabs .gb-field-tabs__container .gb-field-tabs__tab:first-of-type{border-top-left-radius:4px;border-bottom-left-radius:4px}.gb-field-tabs .gb-field-tabs__container .gb-field-tabs__tab:last-of-type{border-top-right-radius:4px;border-bottom-right-radius:4px}.gb-field-tabs .gb-field-tabs__container .gb-field-tabs__tab .gb-field-tabs__icon,.gb-field-tabs .gb-field-tabs__container .gb-field-tabs__tab .gb-field-tabs__label,.gb-field-tabs .gb-field-tabs__container .gb-field-tabs__tab .gb-field-tabs__tab-left,.gb-field-tabs .gb-field-tabs__container .gb-field-tabs__tab .gb-field-tabs__tab-right{display:flex;flex:0 0 auto}.gb-field-tabs .gb-field-tabs__container .gb-field-tabs__tab--active:focus .gb-field-tabs__label{text-decoration:underline}.gb-field-tabs .gb-field-tabs__container .gb-field-tabs__tab--with-label:focus .gb-field-tabs__label{text-decoration:underline}.gb-field-tabs--mini .gb-field-tabs__container .gb-field-tabs__tab{padding:0 10px;height:32px;font-size:11px;line-height:17px}.gb-field-tabs--small .gb-field-tabs__container .gb-field-tabs__tab{padding:0 12px;height:36px;font-size:12px;line-height:18px}.gb-field-tabs--default .gb-field-tabs__container .gb-field-tabs__tab{padding:0 14px;height:40px;font-size:13px;line-height:19px}.gb-field-tabs--medium .gb-field-tabs__container .gb-field-tabs__tab{padding:0 16px;height:44px;font-size:14px;line-height:20px}.gb-field-tabs--large .gb-field-tabs__container .gb-field-tabs__tab{padding:0 18px;height:48px;font-size:15px;line-height:21px}.gb-field-tabs--disabled{opacity:.7}.gb-field-tabs--disabled .gb-field-tabs__container,.gb-field-tabs--disabled .gb-field-tabs__label{cursor:not-allowed}.gb-field-tabs--disabled .gb-field-tabs__container .gb-field-tabs__tab,.gb-field-tabs--disabled .gb-field-tabs__label .gb-field-tabs__tab{pointer-events:none}.gb-field-tabs--full-width{width:100%}.gb-field-tabs--full-width .gb-field-tabs__container{display:flex}.gb-field-tabs--full-width .gb-field-tabs__container .gb-field-tabs__tab{flex:1;justify-content:center}.gb-field-tabs--dark .gb-field-tabs__container .gb-field-tabs__tab{border-top-color:#313d4f;border-bottom-color:#313d4f;background:#222c3c;color:#8eacc5}.gb-field-tabs--dark .gb-field-tabs__container .gb-field-tabs__tab:first-of-type{border-left-color:#313d4f}.gb-field-tabs--dark .gb-field-tabs__container .gb-field-tabs__tab:last-of-type{border-right-color:#313d4f}.gb-field-tabs--dark .gb-field-tabs__container .gb-field-tabs__tab--active{color:#fff!important}.gb-field-tabs--dark .gb-field-tabs__container .gb-field-tabs__tab:hover{color:#fff}.gb-field-tabs--dark .gb-field-tabs__container .gb-field-tabs__tab:focus{color:#fff}.gb-field-tabs--dark.gb-field-tabs--error .gb-field-tabs__container .gb-field-tabs__tab--active{border-color:#e0102b!important;background-color:rgba(224,16,43,.4)}.gb-field-tabs--dark.gb-field-tabs--error .gb-field-tabs__container .gb-field-tabs__tab--active-previous{border-left-color:rgba(224,16,43,.25)!important}.gb-field-tabs--dark.gb-field-tabs--error .gb-field-tabs__container .gb-field-tabs__tab--active-next{border-right-color:rgba(224,16,43,.25)!important}.gb-field-tabs--dark.gb-field-tabs--normal .gb-field-tabs__container .gb-field-tabs__tab--active{border-color:#0093ee!important;background-color:rgba(0,147,238,.4)}.gb-field-tabs--dark.gb-field-tabs--normal .gb-field-tabs__container .gb-field-tabs__tab--active-previous{border-left-color:rgba(49,61,79,.25)!important}.gb-field-tabs--dark.gb-field-tabs--normal .gb-field-tabs__container .gb-field-tabs__tab--active-next{border-right-color:rgba(49,61,79,.25)!important}.gb-field-tabs--dark.gb-field-tabs--success .gb-field-tabs__container .gb-field-tabs__tab--active{border-color:#96bf47!important;background-color:rgba(150,191,71,.4)}.gb-field-tabs--dark.gb-field-tabs--success .gb-field-tabs__container .gb-field-tabs__tab--active-previous{border-left-color:rgba(150,191,71,.25)!important}.gb-field-tabs--dark.gb-field-tabs--success .gb-field-tabs__container .gb-field-tabs__tab--active-next{border-right-color:rgba(150,191,71,.25)!important}.gb-field-tabs--dark.gb-field-tabs--warning .gb-field-tabs__container .gb-field-tabs__tab--active{border-color:#ffc02a!important;background-color:rgba(255,192,42,.4)}.gb-field-tabs--dark.gb-field-tabs--warning .gb-field-tabs__container .gb-field-tabs__tab--active-previous{border-left-color:rgba(255,192,42,.25)!important}.gb-field-tabs--dark.gb-field-tabs--warning .gb-field-tabs__container .gb-field-tabs__tab--active-next{border-right-color:rgba(255,192,42,.25)!important}.gb-field-tabs--light .gb-field-tabs__container .gb-field-tabs__tab{border-top-color:#c5d9e8;border-bottom-color:#c5d9e8;background:#fff;color:#5a5a5a}.gb-field-tabs--light .gb-field-tabs__container .gb-field-tabs__tab:first-of-type{border-left-color:#c5d9e8}.gb-field-tabs--light .gb-field-tabs__container .gb-field-tabs__tab:last-of-type{border-right-color:#c5d9e8}.gb-field-tabs--light .gb-field-tabs__container .gb-field-tabs__tab--active{color:#fff!important}.gb-field-tabs--light .gb-field-tabs__container .gb-field-tabs__tab:hover{color:#171e29}.gb-field-tabs--light .gb-field-tabs__container .gb-field-tabs__tab:focus{color:#171e29}.gb-field-tabs--light.gb-field-tabs--error .gb-field-tabs__container .gb-field-tabs__tab--active{border-color:#e0102b!important;background-color:rgba(224,16,43,.9)}.gb-field-tabs--light.gb-field-tabs--error .gb-field-tabs__container .gb-field-tabs__tab--active-previous{border-left-color:rgba(224,16,43,.25)!important}.gb-field-tabs--light.gb-field-tabs--error .gb-field-tabs__container .gb-field-tabs__tab--active-next{border-right-color:rgba(224,16,43,.25)!important}.gb-field-tabs--light.gb-field-tabs--normal .gb-field-tabs__container .gb-field-tabs__tab--active{border-color:#0079c4!important;background-color:rgba(0,121,196,.9)}.gb-field-tabs--light.gb-field-tabs--normal .gb-field-tabs__container .gb-field-tabs__tab--active-previous{border-left-color:rgba(197,217,232,.25)!important}.gb-field-tabs--light.gb-field-tabs--normal .gb-field-tabs__container .gb-field-tabs__tab--active-next{border-right-color:rgba(197,217,232,.25)!important}.gb-field-tabs--light.gb-field-tabs--success .gb-field-tabs__container .gb-field-tabs__tab--active{border-color:#81c926!important;background-color:rgba(129,201,38,.9)}.gb-field-tabs--light.gb-field-tabs--success .gb-field-tabs__container .gb-field-tabs__tab--active-previous{border-left-color:rgba(129,201,38,.25)!important}.gb-field-tabs--light.gb-field-tabs--success .gb-field-tabs__container .gb-field-tabs__tab--active-next{border-right-color:rgba(129,201,38,.25)!important}.gb-field-tabs--light.gb-field-tabs--warning .gb-field-tabs__container .gb-field-tabs__tab--active{border-color:#fd7b1f!important;background-color:rgba(253,123,31,.9)}.gb-field-tabs--light.gb-field-tabs--warning .gb-field-tabs__container .gb-field-tabs__tab--active-previous{border-left-color:rgba(253,123,31,.25)!important}.gb-field-tabs--light.gb-field-tabs--warning .gb-field-tabs__container .gb-field-tabs__tab--active-next{border-right-color:rgba(253,123,31,.25)!important}',map:void 0,media:void 0})}),{mixins:[y,x,g],props:{multiple:{type:Boolean,default:!1},tabs:{type:Array,required:!0,validator:e=>e.length>0},value:{type:[Array,Number,String],default:null}},computed:{computedIconSize(){switch(this.size){case"mini":return"14px";case"small":return"16px";case"default":return"18px";case"medium":return"20px";case"large":return"22px"}return null}},methods:{checkActiveBrother(e,i){if(this.multiple&&this.tabs[i]&&Array.isArray(this.innerValue))return this.innerValue.includes(this.tabs[i].value)},focusFirstTab(){this.$el.querySelector(".js-field-tab:first-child").focus()},onLabelClick(e){this.onTabClick(this.tabs[0].value,e),this.focusFirstTab()},onTabClick(e,i){let t=e;this.multiple||this.innerValue===e||this.$emit("change",e,"added",t,this.name,i),this.multiple&&(Array.isArray(this.innerValue)&&this.innerValue.includes(e)?(t=this.innerValue.filter(i=>i!==e),this.$emit("change",e,"removed",t,this.name,i)):(t=Array.isArray(this.innerValue)?[...this.innerValue,e]:[e],this.$emit("change",e,"added",t,this.name,i))),this.innerValue=t,this.$emit("click",e,t,this.name,i),this.$emit("input",t)},onTabKeypress(e){"Space"===e.code&&e.target.click()}}},void 0,!1,void 0,!1,b,void 0,void 0);const V=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{class:["gb-field-textarea","gb-field-textarea--"+e.size,"gb-field-textarea--"+e.computedTheme,"gb-field-textarea--"+e.computedStatus,{"gb-field-textarea--borders":e.borders,"gb-field-textarea--disabled":e.disabled,"gb-field-textarea--focused":e.focused,"gb-field-textarea--full-width":e.fullWidth,"gb-field-textarea--readonly":e.readonly}]},[e.label?t("field-label",{staticClass:"gb-field-textarea__label",attrs:{forField:e.uuid,required:e.required,size:e.size,theme:e.theme}},[e._v(e._s(e.label))]):e._e(),t("div",{staticClass:"gb-field-textarea__container",on:{click:e.onContainerClick}},[t("textarea",{staticClass:"gb-field-textarea__field js-tag-for-autofocus",style:{resize:e.resize},attrs:{cols:e.cols,disabled:e.disabled,id:e.uuid,name:e.name,placeholder:e.placeholder,readonly:e.readonly,rows:e.rows,spellcheck:e.spellcheck},on:{blur:e.onFieldBlur,change:e.onFieldChange,focus:e.onFieldFocus,input:e.onFieldInput,keydown:e.onFieldKeyDown,keyup:e.onFieldKeyUp}},[e._v(e._s(e.innerValue))]),e.icon?t("base-icon",{staticClass:"gb-field-textarea__icon",attrs:{name:e.icon}}):e._e()],1),e.fieldMessageStatus?t("field-message",{attrs:{message:e.fieldMessageContent,size:e.size,status:e.fieldMessageStatus,theme:e.theme}}):e._e()],1)},staticRenderFns:[]},(function(e){e&&e("data-v-2a1560f7_0",{source:'.gb-field-textarea{display:flex;flex-direction:column;text-align:left;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif}.gb-field-textarea .gb-field-textarea__container{position:relative;display:flex;overflow:hidden;transition:all linear 250ms}.gb-field-textarea .gb-field-textarea__container .gb-field-textarea__icon{position:absolute;right:7px;bottom:7px;pointer-events:none}.gb-field-textarea .gb-field-textarea__container .gb-field-textarea__field{width:100%;height:100%;outline:0;border:none}.gb-field-textarea .gb-field-textarea__container .gb-field-textarea__field:disabled{cursor:not-allowed}.gb-field-textarea--mini .gb-field-textarea__field{padding:10px;font-size:12px;line-height:18px}.gb-field-textarea--small .gb-field-textarea__field{padding:11px;font-size:13px;line-height:19px}.gb-field-textarea--default .gb-field-textarea__field{padding:12px;font-size:14px;line-height:20px}.gb-field-textarea--medium .gb-field-textarea__field{padding:13px;font-size:15px;line-height:21px}.gb-field-textarea--large .gb-field-textarea__field{padding:14px;font-size:16px;line-height:22px}.gb-field-textarea--borders .gb-field-textarea__container{box-sizing:border-box;border-width:1px;border-style:solid;border-radius:4px}.gb-field-textarea--disabled{opacity:.7}.gb-field-textarea--disabled .gb-field-textarea__container,.gb-field-textarea--disabled .gb-field-textarea__label{pointer-events:none;cursor:not-allowed}.gb-field-textarea--full-width{width:100%}.gb-field-textarea--readonly .gb-field-textarea__container .gb-field-textarea__field{cursor:default}.gb-field-textarea--dark .gb-field-textarea__container .gb-field-textarea__field{background-color:#222c3c;color:#fff}.gb-field-textarea--dark .gb-field-textarea__container .gb-field-textarea__field::placeholder{color:#8eacc5;opacity:1}.gb-field-textarea--dark.gb-field-textarea--error .gb-field-textarea__container{border-color:#e0102b}.gb-field-textarea--dark.gb-field-textarea--error .gb-field-textarea__container .gb-field-textarea__icon{color:#e0102b}.gb-field-textarea--dark.gb-field-textarea--error .gb-field-textarea__container:hover{border-color:#f0334b}.gb-field-textarea--dark.gb-field-textarea--error .gb-field-textarea__container:active{border-color:#e0102b}.gb-field-textarea--dark.gb-field-textarea--normal .gb-field-textarea__container{border-color:#313d4f}.gb-field-textarea--dark.gb-field-textarea--normal .gb-field-textarea__container .gb-field-textarea__icon{color:#8eacc5}.gb-field-textarea--dark.gb-field-textarea--normal .gb-field-textarea__container:hover{border-color:#45556e}.gb-field-textarea--dark.gb-field-textarea--normal .gb-field-textarea__container:active{border-color:#313d4f}.gb-field-textarea--dark.gb-field-textarea--success .gb-field-textarea__container{border-color:#96bf47}.gb-field-textarea--dark.gb-field-textarea--success .gb-field-textarea__container .gb-field-textarea__icon{color:#96bf47}.gb-field-textarea--dark.gb-field-textarea--success .gb-field-textarea__container:hover{border-color:#accc6d}.gb-field-textarea--dark.gb-field-textarea--success .gb-field-textarea__container:active{border-color:#96bf47}.gb-field-textarea--dark.gb-field-textarea--warning .gb-field-textarea__container{border-color:#ffc02a}.gb-field-textarea--dark.gb-field-textarea--warning .gb-field-textarea__container .gb-field-textarea__icon{color:#ffc02a}.gb-field-textarea--dark.gb-field-textarea--warning .gb-field-textarea__container:hover{border-color:#ffcf5d}.gb-field-textarea--dark.gb-field-textarea--warning .gb-field-textarea__container:active{border-color:#ffc02a}.gb-field-textarea--dark.gb-field-textarea--focused .gb-field-textarea__container{border-color:#0093ee!important}.gb-field-textarea--dark.gb-field-textarea--focused .gb-field-textarea__container .gb-field-textarea__icon{color:#0093ee!important}.gb-field-textarea--light .gb-field-textarea__container .gb-field-textarea__field{background-color:#fff;color:#171e29}.gb-field-textarea--light .gb-field-textarea__container .gb-field-textarea__field::placeholder{color:#5a5a5a;opacity:1}.gb-field-textarea--light.gb-field-textarea--error .gb-field-textarea__container{border-color:#e0102b}.gb-field-textarea--light.gb-field-textarea--error .gb-field-textarea__container .gb-field-textarea__icon{color:#e0102b}.gb-field-textarea--light.gb-field-textarea--error .gb-field-textarea__container:hover{border-color:#b00d22}.gb-field-textarea--light.gb-field-textarea--error .gb-field-textarea__container:active{border-color:#e0102b}.gb-field-textarea--light.gb-field-textarea--normal .gb-field-textarea__container{border-color:#c5d9e8}.gb-field-textarea--light.gb-field-textarea--normal .gb-field-textarea__container .gb-field-textarea__icon{color:#5a5a5a}.gb-field-textarea--light.gb-field-textarea--normal .gb-field-textarea__container:hover{border-color:#a0c1da}.gb-field-textarea--light.gb-field-textarea--normal .gb-field-textarea__container:active{border-color:#c5d9e8}.gb-field-textarea--light.gb-field-textarea--success .gb-field-textarea__container{border-color:#81c926}.gb-field-textarea--light.gb-field-textarea--success .gb-field-textarea__container .gb-field-textarea__icon{color:#81c926}.gb-field-textarea--light.gb-field-textarea--success .gb-field-textarea__container:hover{border-color:#659e1e}.gb-field-textarea--light.gb-field-textarea--success .gb-field-textarea__container:active{border-color:#81c926}.gb-field-textarea--light.gb-field-textarea--warning .gb-field-textarea__container{border-color:#fd7b1f}.gb-field-textarea--light.gb-field-textarea--warning .gb-field-textarea__container .gb-field-textarea__icon{color:#fd7b1f}.gb-field-textarea--light.gb-field-textarea--warning .gb-field-textarea__container:hover{border-color:#e76102}.gb-field-textarea--light.gb-field-textarea--warning .gb-field-textarea__container:active{border-color:#fd7b1f}.gb-field-textarea--light.gb-field-textarea--focused .gb-field-textarea__container{border-color:#0079c4!important}.gb-field-textarea--light.gb-field-textarea--focused .gb-field-textarea__container .gb-field-textarea__icon{color:#0079c4!important}',map:void 0,media:void 0})}),{mixins:[y,x,g],props:{borders:{type:Boolean,default:!0},cols:{type:Number,default:null},icon:{type:String,default:null},placeholder:{type:String,default:null},readonly:{type:Boolean,default:!1},resize:{type:String,default:"none",validator:e=>["none","both","horizontal","vertical","initial","inherit"].includes(e)},rows:{type:Number,default:6},spellcheck:{type:Boolean,default:!1},value:{type:String,default:null}},data:()=>({focused:!1}),methods:{getTextareaValue(){return this.$el.querySelector("textarea").value||""},onContainerClick(e){this.$el.querySelector("textarea").focus(),this.$emit("click",this.getTextareaValue(),this.name,e)},onFieldBlur(e){this.focused=!1,this.$emit("blur",this.getTextareaValue(),this.name,e)},onFieldChange(e){this.$emit("change",this.getTextareaValue(),this.name,e)},onFieldFocus(e){this.focused=!0,this.$emit("focus",this.getTextareaValue(),this.name,e)},onFieldInput(e){const i=this.getTextareaValue();this.innerValue=i,this.$emit("input",i,this.name,e)},onFieldKeyDown(e){this.$emit("keydown",this.getTextareaValue(),this.name,e)},onFieldKeyUp(e){this.$emit("keyup",this.getTextareaValue(),this.name,e)}}},void 0,!1,void 0,!1,b,void 0,void 0);const B=a({render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{class:["gb-field-toggle","gb-field-toggle--"+e.size,"gb-field-toggle--"+e.computedTheme,"gb-field-toggle--"+e.computedStatus,"gb-field-toggle--label-"+e.labelPosition,{"gb-field-toggle--active":e.innerValue,"gb-field-toggle--disabled":e.disabled,"gb-field-toggle--full-width":e.fullWidth,"gb-field-toggle--inactive":!e.innerValue}]},[t("div",{staticClass:"gb-field-toggle__container js-tag-for-autofocus",attrs:{tabindex:"0"},on:{keypress:function(i){return i.preventDefault(),e.onKeypress(i)}}},[t("div",{staticClass:"gb-field-toggle__field",on:{click:e.onClick}},[t("span",{staticClass:"gb-field-toggle__focuser"}),t("span",{staticClass:"gb-field-toggle__handle"})]),e.label?t("field-label",{staticClass:"gb-field-toggle__label",attrs:{required:e.required,size:e.size,theme:e.theme,uppercase:"top"===e.labelPosition},on:{click:e.onClick}},[e._v(e._s(e.label))]):e._e()],1),e.fieldMessageStatus?t("field-message",{attrs:{message:e.fieldMessageContent,size:e.size,status:e.fieldMessageStatus,theme:e.theme}}):e._e()],1)},staticRenderFns:[]},(function(e){e&&e("data-v-0d3c4cec_0",{source:'.gb-field-toggle{display:inline-block;text-align:left;font-family:Heebo,"Helvetica Neue",Helvetica,Arial,sans-serif}.gb-field-toggle .gb-field-toggle__container{display:flex;outline:0}.gb-field-toggle .gb-field-toggle__container .gb-field-toggle__field{position:relative;display:flex;align-items:center;justify-content:center;margin-bottom:0;border-width:1px;border-style:solid;border-radius:20px;transition:all linear 250ms;cursor:pointer}.gb-field-toggle .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__focuser{position:absolute;top:-4px;right:-4px;bottom:-4px;left:-4px;border-width:1px;border-style:solid;border-color:transparent;border-radius:20px;opacity:0;transition:all linear 250ms}.gb-field-toggle .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{flex:0 0 auto;border-radius:100%;transition:all linear 250ms}.gb-field-toggle .gb-field-toggle__container:focus .gb-field-toggle__field .gb-field-toggle__focuser{opacity:1}.gb-field-toggle--label-right .gb-field-toggle__container .gb-field-toggle__label{flex:1;margin-top:4px;margin-bottom:0;font-weight:400;opacity:.8;transition:opacity 250ms linear}.gb-field-toggle--label-right.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__label{opacity:1}.gb-field-toggle--label-top .gb-field-toggle__container{flex-direction:column}.gb-field-toggle--label-top .gb-field-toggle__container .gb-field-toggle__field{order:1}.gb-field-toggle--label-top .gb-field-toggle__container .gb-field-toggle__label{order:0}.gb-field-toggle--mini .gb-field-toggle__container .gb-field-toggle__field{width:40px;height:20px}.gb-field-toggle--mini .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{width:12px;height:12px}.gb-field-toggle--mini.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{box-shadow:none!important;transform:translateX(10px)}.gb-field-toggle--mini.gb-field-toggle--inactive .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{transform:translateX(-10px)}.gb-field-toggle--mini.gb-field-toggle--label-right .gb-field-toggle__container .gb-field-toggle__label{margin-left:8px}.gb-field-toggle--small .gb-field-toggle__container .gb-field-toggle__field{width:44px;height:22px}.gb-field-toggle--small .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{width:13px;height:13px}.gb-field-toggle--small.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{box-shadow:none!important;transform:translateX(11px)}.gb-field-toggle--small.gb-field-toggle--inactive .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{transform:translateX(-11px)}.gb-field-toggle--small.gb-field-toggle--label-right .gb-field-toggle__container .gb-field-toggle__label{margin-left:9px}.gb-field-toggle--default .gb-field-toggle__container .gb-field-toggle__field{width:48px;height:24px}.gb-field-toggle--default .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{width:14px;height:14px}.gb-field-toggle--default.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{box-shadow:none!important;transform:translateX(12px)}.gb-field-toggle--default.gb-field-toggle--inactive .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{transform:translateX(-12px)}.gb-field-toggle--default.gb-field-toggle--label-right .gb-field-toggle__container .gb-field-toggle__label{margin-left:10px}.gb-field-toggle--medium .gb-field-toggle__container .gb-field-toggle__field{width:52px;height:26px}.gb-field-toggle--medium .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{width:15px;height:15px}.gb-field-toggle--medium.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{box-shadow:none!important;transform:translateX(13px)}.gb-field-toggle--medium.gb-field-toggle--inactive .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{transform:translateX(-13px)}.gb-field-toggle--medium.gb-field-toggle--label-right .gb-field-toggle__container .gb-field-toggle__label{margin-left:11px}.gb-field-toggle--large .gb-field-toggle__container .gb-field-toggle__field{width:56px;height:28px}.gb-field-toggle--large .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{width:16px;height:16px}.gb-field-toggle--large.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{box-shadow:none!important;transform:translateX(14px)}.gb-field-toggle--large.gb-field-toggle--inactive .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{transform:translateX(-14px)}.gb-field-toggle--large.gb-field-toggle--label-right .gb-field-toggle__container .gb-field-toggle__label{margin-left:12px}.gb-field-toggle--disabled{opacity:.7}.gb-field-toggle--disabled .gb-field-toggle__container .gb-field-toggle__field,.gb-field-toggle--disabled .gb-field-toggle__container .gb-field-toggle__label{pointer-events:none;cursor:not-allowed}.gb-field-toggle--full-width{width:100%}.gb-field-toggle--dark .gb-field-toggle__container .gb-field-toggle__field{background-color:rgba(39,49,66,.4)}.gb-field-toggle--dark .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{background:#fff;box-shadow:0 1px 5px 0 #171e29}.gb-field-toggle--dark.gb-field-toggle--label-right .gb-field-toggle__container .gb-field-toggle__label{color:#fff}.gb-field-toggle--dark.gb-field-toggle--error .gb-field-toggle__container .gb-field-toggle__field{border-color:#e0102b}.gb-field-toggle--dark.gb-field-toggle--error .gb-field-toggle__container:hover .gb-field-toggle__field{border-color:#f0334b}.gb-field-toggle--dark.gb-field-toggle--error .gb-field-toggle__container:active .gb-field-toggle__field{border-color:#e0102b}.gb-field-toggle--dark.gb-field-toggle--error .gb-field-toggle__container:focus .gb-field-toggle__field .gb-field-toggle__focuser{border-color:#e0102b}.gb-field-toggle--dark.gb-field-toggle--error.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field{border-color:#e0102b;background-color:rgba(224,16,43,.4)}.gb-field-toggle--dark.gb-field-toggle--normal .gb-field-toggle__container .gb-field-toggle__field{border-color:#313d4f}.gb-field-toggle--dark.gb-field-toggle--normal .gb-field-toggle__container:hover .gb-field-toggle__field{border-color:#45556e}.gb-field-toggle--dark.gb-field-toggle--normal .gb-field-toggle__container:active .gb-field-toggle__field{border-color:#313d4f}.gb-field-toggle--dark.gb-field-toggle--normal .gb-field-toggle__container:focus .gb-field-toggle__field .gb-field-toggle__focuser{border-color:#313d4f}.gb-field-toggle--dark.gb-field-toggle--normal.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field{border-color:#0093ee;background-color:rgba(0,147,238,.4)}.gb-field-toggle--dark.gb-field-toggle--normal.gb-field-toggle--active .gb-field-toggle__container:hover .gb-field-toggle__field{border-color:#22abff}.gb-field-toggle--dark.gb-field-toggle--normal.gb-field-toggle--active .gb-field-toggle__container:focus .gb-field-toggle__field .gb-field-toggle__focuser{border-color:#0093ee}.gb-field-toggle--dark.gb-field-toggle--success .gb-field-toggle__container .gb-field-toggle__field{border-color:#96bf47}.gb-field-toggle--dark.gb-field-toggle--success .gb-field-toggle__container:hover .gb-field-toggle__field{border-color:#accc6d}.gb-field-toggle--dark.gb-field-toggle--success .gb-field-toggle__container:active .gb-field-toggle__field{border-color:#96bf47}.gb-field-toggle--dark.gb-field-toggle--success .gb-field-toggle__container:focus .gb-field-toggle__field .gb-field-toggle__focuser{border-color:#96bf47}.gb-field-toggle--dark.gb-field-toggle--success.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field{border-color:#96bf47;background-color:rgba(150,191,71,.4)}.gb-field-toggle--dark.gb-field-toggle--warning .gb-field-toggle__container .gb-field-toggle__field{border-color:#ffc02a}.gb-field-toggle--dark.gb-field-toggle--warning .gb-field-toggle__container:hover .gb-field-toggle__field{border-color:#ffcf5d}.gb-field-toggle--dark.gb-field-toggle--warning .gb-field-toggle__container:active .gb-field-toggle__field{border-color:#ffc02a}.gb-field-toggle--dark.gb-field-toggle--warning .gb-field-toggle__container:focus .gb-field-toggle__field .gb-field-toggle__focuser{border-color:#ffc02a}.gb-field-toggle--dark.gb-field-toggle--warning.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field{border-color:#ffc02a;background-color:rgba(255,192,42,.4)}.gb-field-toggle--dark.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{background:#fff}.gb-field-toggle--light .gb-field-toggle__container .gb-field-toggle__field{background-color:rgba(250,251,252,.9)}.gb-field-toggle--light .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{background:#fff;box-shadow:0 1px 5px 0 #eaf6ff}.gb-field-toggle--light.gb-field-toggle--label-right .gb-field-toggle__container .gb-field-toggle__label{color:#171e29}.gb-field-toggle--light.gb-field-toggle--error .gb-field-toggle__container .gb-field-toggle__field{border-color:#e0102b}.gb-field-toggle--light.gb-field-toggle--error .gb-field-toggle__container:hover .gb-field-toggle__field{border-color:#b00d22}.gb-field-toggle--light.gb-field-toggle--error .gb-field-toggle__container:active .gb-field-toggle__field{border-color:#e0102b}.gb-field-toggle--light.gb-field-toggle--error .gb-field-toggle__container:focus .gb-field-toggle__field .gb-field-toggle__focuser{border-color:#e0102b}.gb-field-toggle--light.gb-field-toggle--error.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field{border-color:#e0102b;background-color:rgba(224,16,43,.9)}.gb-field-toggle--light.gb-field-toggle--normal .gb-field-toggle__container .gb-field-toggle__field{border-color:#c5d9e8}.gb-field-toggle--light.gb-field-toggle--normal .gb-field-toggle__container:hover .gb-field-toggle__field{border-color:#a0c1da}.gb-field-toggle--light.gb-field-toggle--normal .gb-field-toggle__container:active .gb-field-toggle__field{border-color:#c5d9e8}.gb-field-toggle--light.gb-field-toggle--normal .gb-field-toggle__container:focus .gb-field-toggle__field .gb-field-toggle__focuser{border-color:#c5d9e8}.gb-field-toggle--light.gb-field-toggle--normal.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field{border-color:#0079c4;background-color:rgba(0,121,196,.9)}.gb-field-toggle--light.gb-field-toggle--normal.gb-field-toggle--active .gb-field-toggle__container:hover .gb-field-toggle__field{border-color:#005a91}.gb-field-toggle--light.gb-field-toggle--normal.gb-field-toggle--active .gb-field-toggle__container:focus .gb-field-toggle__field .gb-field-toggle__focuser{border-color:#0079c4}.gb-field-toggle--light.gb-field-toggle--success .gb-field-toggle__container .gb-field-toggle__field{border-color:#81c926}.gb-field-toggle--light.gb-field-toggle--success .gb-field-toggle__container:hover .gb-field-toggle__field{border-color:#659e1e}.gb-field-toggle--light.gb-field-toggle--success .gb-field-toggle__container:active .gb-field-toggle__field{border-color:#81c926}.gb-field-toggle--light.gb-field-toggle--success .gb-field-toggle__container:focus .gb-field-toggle__field .gb-field-toggle__focuser{border-color:#81c926}.gb-field-toggle--light.gb-field-toggle--success.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field{border-color:#81c926;background-color:rgba(129,201,38,.9)}.gb-field-toggle--light.gb-field-toggle--warning .gb-field-toggle__container .gb-field-toggle__field{border-color:#fd7b1f}.gb-field-toggle--light.gb-field-toggle--warning .gb-field-toggle__container:hover .gb-field-toggle__field{border-color:#e76102}.gb-field-toggle--light.gb-field-toggle--warning .gb-field-toggle__container:active .gb-field-toggle__field{border-color:#fd7b1f}.gb-field-toggle--light.gb-field-toggle--warning .gb-field-toggle__container:focus .gb-field-toggle__field .gb-field-toggle__focuser{border-color:#fd7b1f}.gb-field-toggle--light.gb-field-toggle--warning.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field{border-color:#fd7b1f;background-color:rgba(253,123,31,.9)}.gb-field-toggle--light.gb-field-toggle--active .gb-field-toggle__container .gb-field-toggle__field .gb-field-toggle__handle{background:#fff}',map:void 0,media:void 0})}),{mixins:[y,x,g],props:{labelPosition:{type:String,default:"right",validator:e=>["right","top"].includes(e)},value:{type:Boolean,default:!1}},methods:{onClick(e){const i=!this.innerValue;this.innerValue=i,this.$emit("change",i,this.name,e),this.$emit("input",i)},onKeypress(e){"Space"===e.code&&this.onClick(e)}}},void 0,!1,void 0,!1,b,void 0,void 0);const M={install:function e(i,t){if(e.installed)return;e.installed=!0;const a={alert:n,avatar:s,badge:c,button:_,divider:u,heading:p,icon:d,number:h,"progress-bar":m,spinner:f,toast:k,checkbox:z,"image-uploader":C,input:S,"input-numeric":$,label:v,message:w,radios:I,select:q,tabs:F,textarea:V,toggle:B};for(let e in a)t&&t.components&&0!==t.components.length&&!t.components.includes(e)||i.component("gb-"+e,a[e]);i.prototype.$gb||(i.prototype.$gb={}),i.prototype.$gb.vuedarkmode={},i.prototype.$gb.vuedarkmode.theme=(t||{}).theme||"dark"}};let T=null;"undefined"!=typeof window?T=window.Vue:"undefined"!=typeof global&&(T=global.Vue),T&&T.use(M);/* harmony default export */ __webpack_exports__["a"] = (M);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,n){ true?module.exports=n():"function"==typeof define&&define.amd?define(n):e["v-click-outside"]=n()}(this,function(){var e="undefined"!=typeof window,n="undefined"!=typeof navigator,t=e&&("ontouchstart"in window||n&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"],r=function(e){return e},i={instances:[]};function a(e){var n="function"==typeof e;if(!n&&"object"!=typeof e)throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:n?e:e.handler,middleware:e.middleware||r,events:e.events||t,isActive:!(!1===e.isActive)}}function d(e){var n=e.el,t=e.event,r=e.handler,i=e.middleware;t.target!==n&&!n.contains(t.target)&&i(t,n)&&r(t,n)}function o(e){var n=e.el,t=e.handler,r=e.middleware;return{el:n,eventHandlers:e.events.map(function(e){return{event:e,handler:function(e){return d({event:e,el:n,handler:t,middleware:r})}}})}}function u(e){var n=i.instances.findIndex(function(n){return n.el===e});-1!==n&&(i.instances[n].eventHandlers.forEach(function(e){return document.removeEventListener(e.event,e.handler)}),i.instances.splice(n,1))}return i.bind=function(e,n){var t=a(n.value);if(t.isActive){var r=o({el:e,events:t.events,handler:t.handler,middleware:t.middleware});r.eventHandlers.forEach(function(e){var n=e.event,t=e.handler;return setTimeout(function(){return document.addEventListener(n,t)},0)}),i.instances.push(r)}},i.update=function(e,n){var t=n.value,r=n.oldValue;if(JSON.stringify(t)!==JSON.stringify(r)){var c=a(t),l=c.events,s=c.handler,v=c.middleware;if(c.isActive){var f=i.instances.find(function(n){return n.el===e});f?(f.eventHandlers.forEach(function(e){return document.removeEventListener(e.event,e.handler)}),f.eventHandlers=l.map(function(n){return{event:n,handler:function(n){return d({event:n,el:e,handler:s,middleware:v})}}})):(f=o({el:e,events:l,handler:s,middleware:v}),i.instances.push(f)),f.eventHandlers.forEach(function(e){var n=e.event,t=e.handler;return setTimeout(function(){return document.addEventListener(n,t)},0)})}else u(e)}},i.unbind=u,{install:function(e){e.directive("click-outside",i)},directive:i}});
//# sourceMappingURL=v-click-outside.min.min.umd.js.map


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./src/keycodes/aliases.js
/* harmony default export */ var aliases = ({
  windows: 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  ctl: 17,
  control: 17,
  option: 18,
  pause: 19,
  "break": 19,
  caps: 20,
  "return": 13,
  escape: 27,
  spc: 32,
  pgup: 33,
  pgdn: 34,
  ins: 45,
  del: 46,
  cmd: 91
});
// CONCATENATED MODULE: ./src/keycodes/functionkeys.js
/* harmony default export */ var functionkeys = ({
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123
});
// CONCATENATED MODULE: ./src/keycodes/numpad.js
/* harmony default export */ var numpad = ({
  'numpad *': 106,
  // 'numpad +': 107,
  'numpad +': 43,
  'numpad add': 43,
  // as a trick
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'numpad 0': 96,
  'numpad 1': 97,
  'numpad 2': 98,
  'numpad 3': 99,
  'numpad 4': 100,
  'numpad 5': 101,
  'numpad 6': 102,
  'numpad 7': 103,
  'numpad 8': 104,
  'numpad 9': 105
});
// CONCATENATED MODULE: ./src/keycodes/lowercase.js
/* harmony default export */ var lowercase = ({
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90
});
// CONCATENATED MODULE: ./src/keycodes/codes.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/* harmony default export */ var codes = (_objectSpread({
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  'pause/break': 19,
  'caps lock': 20,
  esc: 27,
  space: 32,
  'page up': 33,
  'page down': 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  // 'add': 43,
  insert: 45,
  "delete": 46,
  command: 91,
  'left command': 91,
  'right command': 93,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
}, lowercase, {}, numpad, {}, functionkeys));
// CONCATENATED MODULE: ./src/keycodes/index.js



var noop = function noop() {};

var getKeyMap = function getKeyMap(keymap, alias) {
  return Object.keys(keymap).map(function (input) {
    var result = {};
    var _keymap$input = keymap[input],
        keyup = _keymap$input.keyup,
        keydown = _keymap$input.keydown;
    input.replace('numpad +', 'numpad add').split('+').forEach(function (keyName) {
      switch (keyName.toLowerCase()) {
        case 'ctrl':
        case 'alt':
        case 'shift':
        case 'meta':
          result[keyName] = true;
          break;

        default:
          result.keyCode = alias[keyName] || keycodes_searchKeyCode(keyName);
      }
    });
    result.callback = {
      keydown: keydown || (keyup ? noop : keymap[input]),
      keyup: keyup || noop
    };
    return result;
  });
};

var keycodes_searchKeyCode = function searchKeyCode(key) {
  if (!key) return; // Keyboard Events

  key = hasKeyCode(key) || String(key);
  return codes[key.toLowerCase()] || aliases[key.toLowerCase()] || returnCharCode(key);
};

var returnCharCode = function returnCharCode(key) {
  return key.length === 1 ? key.charCodeAt(0) : undefined;
};

var isPlainObject = function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

var hasKeyCode = function hasKeyCode(key) {
  return !isPlainObject(key) ? key : key.which || key.keyCode || key.charCode || false;
};


// CONCATENATED MODULE: ./src/main.js


function bindEvent(el, _ref, alias) {
  var value = _ref.value,
      modifiers = _ref.modifiers;
  el._keymap = getKeyMap(value, alias);

  el._keyHandler = function (e) {
    if (modifiers.prevent) e.preventDefault();

    if (modifiers.stop) {
      var _document$activeEleme = document.activeElement,
          nodeName = _document$activeEleme.nodeName,
          isContentEditable = _document$activeEleme.isContentEditable;
      if (isContentEditable) return;

      switch (nodeName) {
        case 'INPUT':
        case 'TEXTAREA':
        case 'SELECT':
          return;
      }
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = el._keymap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var hotkey = _step.value;
        var callback = hotkey.keyCode === e.keyCode && !!hotkey.ctrl === e.ctrlKey && !!hotkey.alt === e.altKey && !!hotkey.shift === e.shiftKey && !!hotkey.meta === e.metaKey && hotkey.callback[e.type];
        callback && callback(e);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  document.addEventListener('keydown', el._keyHandler);
  document.addEventListener('keyup', el._keyHandler);
}

function unbindEvent(el) {
  document.removeEventListener('keydown', el._keyHandler);
  document.removeEventListener('keyup', el._keyHandler);
}


// CONCATENATED MODULE: ./src/index.js


var src_buildDirective = function buildDirective() {
  var alias = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    bind: function bind(el, binding) {
      bindEvent(el, binding, alias);
    },
    componentUpdated: function componentUpdated(el, binding) {
      if (binding.value !== binding.oldValue) {
        unbindEvent(el);
        bindEvent(el, binding, alias);
      }
    },
    unbind: unbindEvent
  };
};

var src_plugin = {
  install: function install(Vue) {
    var alias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Vue.directive('hotkey', src_buildDirective(alias));
  },
  directive: src_buildDirective()
};
/* harmony default export */ var src = (src_plugin);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ })

/******/ });
//# sourceMappingURL=v-hotkey.common.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map
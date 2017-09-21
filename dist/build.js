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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
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

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
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

var listToStyles = __webpack_require__(29)

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

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

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
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

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
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(20);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {function concat(){return Array.prototype.concat.apply([],arguments)}function readonlyDescriptor(){return{enumerable:!0,configurable:!1,writable:!1}}function identity(t){return t}function copyProps(t,e){if(void 0===e&&(e=identity),isArray(t))return t.map(e);var n={};for(var i in t)t.hasOwnProperty(i)&&(n[e(i)]="object"==typeof i?assign({},t[i]):t[i]);return n}function lowerFirst(t){return"string"!=typeof t&&(t=String(t)),t.charAt(0).toLowerCase()+t.slice(1)}function concat$1(){return Array.prototype.concat.apply([],arguments)}function mergeData(){for(var t=arguments,e=__assign({},arguments[0]),n=1;n<arguments.length;n++)for(var i=0,r=keys$1(arguments[n]);i<r.length;i++){var o=r[i];if(void 0!==e[o])switch(o){case"class":case"style":case"directives":e[o]=concat$1(e[o],t[n][o]);break;case"staticClass":e[o]&&(e[o]=e[o].trim()+" "),e[o]+=t[n][o].trim();break;case"on":case"nativeOn":for(var s=0,a=keys$1(arguments[n][o]);s<a.length;s++){var l=a[s];e[o][l]?e[o][l]=concat$1(t[n][o][l],e[o][l]):e[o][l]=t[n][o][l]}break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":e[o]=__assign({},e[o],t[n][o]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:e[o]=t[n][o]}else e[o]=t[n][o]}return e}function memoize(t){var e=create(null);return function(){var n=JSON.stringify(arguments);return e[n]=e[n]||t.apply(null,arguments)}}function observeDOM(t,e,n){var i=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,r=window.addEventListener;i?new i(function(t){(t[0].addedNodes.length>0||t[0].removedNodes.length>0)&&e()}).observe(t,assign({childList:!0,subtree:!0},n)):r&&(t.addEventListener("DOMNodeInserted",e,!1),t.addEventListener("DOMNodeRemoved",e,!1))}function pluckProps(t,e,n){return void 0===n&&(n=identity),(isArray(t)?t.slice():keys(t)).reduce(function(t,i){return t[n(i)]=e[i],t},{})}function upperFirst(t){return"string"!=typeof t&&(t=String(t)),t.charAt(0).toUpperCase()+t.slice(1)}function prefixPropName(t,e){return t+upperFirst(e)}function suffixPropName(t,e){return e+(t?upperFirst(t):"")}function unPrefixPropName(t,e){return lowerFirst(e.replace(t,""))}function warn(t){console.warn("[Bootstrap-Vue warn]: "+t)}function propsFactory(){return{href:{type:String,default:null},rel:{type:String,default:null},target:{type:String,default:"_self"},active:{type:Boolean,default:!1},activeClass:{type:String,default:"active"},append:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},event:{type:[String,Array],default:"click"},exact:{type:Boolean,default:!1},exactActiveClass:{type:String,default:"active"},replace:{type:Boolean,default:!1},routerTag:{type:String,default:"a"},to:{type:[String,Object],default:null}}}function computeTag(t){return t.to&&!t.disabled?"router-link":"a"}function computeHref(t){var e=t.disabled,n=t.href,i=t.to;return e?"#":n||(i&&"string"==typeof i?i:"#")}function computeRel(t){var e=t.target,n=t.rel;return"_blank"===e&&null===n?"noopener":n||null}function clickHandlerFactory(t){var e=t.disabled,n=t.tag,i=t.href,r=t.suppliedHandler,o=t.parent,s="router-link"===n;return function(t){e&&t instanceof Event?(t.stopPropagation(),t.stopImmediatePropagation()):(o.$root.$emit("clicked::link",t),s&&t.target.__vue__&&t.target.__vue__.$emit("click",t),"function"==typeof r&&r.apply(void 0,arguments)),(!s&&"#"===i||e)&&t.preventDefault()}}function handleFocus(t){"focusin"===t.type?t.target.classList.add("focus"):"focusout"===t.type&&t.target.classList.remove("focus")}function isVisible(t){return t&&(t.offsetWidth>0||t.offsetHeight>0)}function microtaskDebounce(t){var e=!1,n=0,i=document.createElement("span");return new MutationObserver(function(){t(),e=!1}).observe(i,{attributes:!0}),function(){e||(e=!0,i.setAttribute("x-index",n),n+=1)}}function taskDebounce(t){var e=!1;return function(){e||(e=!0,setTimeout(function(){e=!1,t()},timeoutDuration))}}function isFunction(t){var e={};return t&&"[object Function]"===e.toString.call(t)}function getStyleComputedProperty(t,e){if(1!==t.nodeType)return[];var n=window.getComputedStyle(t,null);return e?n[e]:n}function getParentNode(t){return"HTML"===t.nodeName?t:t.parentNode||t.host}function getScrollParent(t){if(!t||-1!==["HTML","BODY","#document"].indexOf(t.nodeName))return window.document.body;var e=getStyleComputedProperty(t),n=e.overflow,i=e.overflowX,r=e.overflowY;return/(auto|scroll)/.test(n+r+i)?t:getScrollParent(getParentNode(t))}function getOffsetParent(t){var e=t&&t.offsetParent,n=e&&e.nodeName;return n&&"BODY"!==n&&"HTML"!==n?-1!==["TD","TABLE"].indexOf(e.nodeName)&&"static"===getStyleComputedProperty(e,"position")?getOffsetParent(e):e:window.document.documentElement}function isOffsetContainer(t){var e=t.nodeName;return"BODY"!==e&&("HTML"===e||getOffsetParent(t.firstElementChild)===t)}function getRoot(t){return null!==t.parentNode?getRoot(t.parentNode):t}function findCommonOffsetParent(t,e){if(!(t&&t.nodeType&&e&&e.nodeType))return window.document.documentElement;var n=t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING,i=n?t:e,r=n?e:t,o=document.createRange();o.setStart(i,0),o.setEnd(r,0);var s=o.commonAncestorContainer;if(t!==s&&e!==s||i.contains(r))return isOffsetContainer(s)?s:getOffsetParent(s);var a=getRoot(t);return a.host?findCommonOffsetParent(a.host,e):findCommonOffsetParent(t,getRoot(e).host)}function getScroll(t){var e="top"===(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top")?"scrollTop":"scrollLeft",n=t.nodeName;if("BODY"===n||"HTML"===n){var i=window.document.documentElement;return(window.document.scrollingElement||i)[e]}return t[e]}function includeScroll(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=getScroll(e,"top"),r=getScroll(e,"left"),o=n?-1:1;return t.top+=i*o,t.bottom+=i*o,t.left+=r*o,t.right+=r*o,t}function getBordersSize(t,e){var n="x"===e?"Left":"Top",i="Left"===n?"Right":"Bottom";return+t["border"+n+"Width"].split("px")[0]+ +t["border"+i+"Width"].split("px")[0]}function getSize(t,e,n,i){return Math.max(e["offset"+t],e["scroll"+t],n["client"+t],n["offset"+t],n["scroll"+t],isIE10$1()?n["offset"+t]+i["margin"+("Height"===t?"Top":"Left")]+i["margin"+("Height"===t?"Bottom":"Right")]:0)}function getWindowSizes(){var t=window.document.body,e=window.document.documentElement,n=isIE10$1()&&window.getComputedStyle(e);return{height:getSize("Height",t,e,n),width:getSize("Width",t,e,n)}}function getClientRect(t){return _extends({},t,{right:t.left+t.width,bottom:t.top+t.height})}function getBoundingClientRect(t){var e={};if(isIE10$1())try{e=t.getBoundingClientRect();var n=getScroll(t,"top"),i=getScroll(t,"left");e.top+=n,e.left+=i,e.bottom+=n,e.right+=i}catch(t){}else e=t.getBoundingClientRect();var r={left:e.left,top:e.top,width:e.right-e.left,height:e.bottom-e.top},o="HTML"===t.nodeName?getWindowSizes():{},s=o.width||t.clientWidth||r.right-r.left,a=o.height||t.clientHeight||r.bottom-r.top,l=t.offsetWidth-s,u=t.offsetHeight-a;if(l||u){var d=getStyleComputedProperty(t);l-=getBordersSize(d,"x"),u-=getBordersSize(d,"y"),r.width-=l,r.height-=u}return getClientRect(r)}function getOffsetRectRelativeToArbitraryNode(t,e){var n=isIE10$1(),i="HTML"===e.nodeName,r=getBoundingClientRect(t),o=getBoundingClientRect(e),s=getScrollParent(t),a=getStyleComputedProperty(e),l=+a.borderTopWidth.split("px")[0],u=+a.borderLeftWidth.split("px")[0],d=getClientRect({top:r.top-o.top-l,left:r.left-o.left-u,width:r.width,height:r.height});if(d.marginTop=0,d.marginLeft=0,!n&&i){var c=+a.marginTop.split("px")[0],p=+a.marginLeft.split("px")[0];d.top-=l-c,d.bottom-=l-c,d.left-=u-p,d.right-=u-p,d.marginTop=c,d.marginLeft=p}return(n?e.contains(s):e===s&&"BODY"!==s.nodeName)&&(d=includeScroll(d,e)),d}function getViewportOffsetRectRelativeToArtbitraryNode(t){var e=window.document.documentElement,n=getOffsetRectRelativeToArbitraryNode(t,e),i=Math.max(e.clientWidth,window.innerWidth||0),r=Math.max(e.clientHeight,window.innerHeight||0),o=getScroll(e),s=getScroll(e,"left");return getClientRect({top:o-n.top+n.marginTop,left:s-n.left+n.marginLeft,width:i,height:r})}function isFixed(t){var e=t.nodeName;return"BODY"!==e&&"HTML"!==e&&("fixed"===getStyleComputedProperty(t,"position")||isFixed(getParentNode(t)))}function getBoundaries(t,e,n,i){var r={top:0,left:0},o=findCommonOffsetParent(t,e);if("viewport"===i)r=getViewportOffsetRectRelativeToArtbitraryNode(o);else{var s=void 0;"scrollParent"===i?"BODY"===(s=getScrollParent(getParentNode(t))).nodeName&&(s=window.document.documentElement):s="window"===i?window.document.documentElement:i;var a=getOffsetRectRelativeToArbitraryNode(s,o);if("HTML"!==s.nodeName||isFixed(o))r=a;else{var l=getWindowSizes(),u=l.height,d=l.width;r.top+=a.top-a.marginTop,r.bottom=u+a.top,r.left+=a.left-a.marginLeft,r.right=d+a.left}}return r.left+=n,r.top+=n,r.right-=n,r.bottom-=n,r}function getArea(t){return t.width*t.height}function computeAutoPlacement(t,e,n,i,r){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===t.indexOf("auto"))return t;var s=getBoundaries(n,i,o,r),a={top:{width:s.width,height:e.top-s.top},right:{width:s.right-e.right,height:s.height},bottom:{width:s.width,height:s.bottom-e.bottom},left:{width:e.left-s.left,height:s.height}},l=Object.keys(a).map(function(t){return _extends({key:t},a[t],{area:getArea(a[t])})}).sort(function(t,e){return e.area-t.area}),u=l.filter(function(t){var e=t.width,i=t.height;return e>=n.clientWidth&&i>=n.clientHeight}),d=u.length>0?u[0].key:l[0].key,c=t.split("-")[1];return d+(c?"-"+c:"")}function getReferenceOffsets(t,e,n){return getOffsetRectRelativeToArbitraryNode(n,findCommonOffsetParent(e,n))}function getOuterSizes(t){var e=window.getComputedStyle(t),n=parseFloat(e.marginTop)+parseFloat(e.marginBottom),i=parseFloat(e.marginLeft)+parseFloat(e.marginRight);return{width:t.offsetWidth+i,height:t.offsetHeight+n}}function getOppositePlacement(t){var e={left:"right",right:"left",bottom:"top",top:"bottom"};return t.replace(/left|right|bottom|top/g,function(t){return e[t]})}function getPopperOffsets(t,e,n){n=n.split("-")[0];var i=getOuterSizes(t),r={width:i.width,height:i.height},o=-1!==["right","left"].indexOf(n),s=o?"top":"left",a=o?"left":"top",l=o?"height":"width",u=o?"width":"height";return r[s]=e[s]+e[l]/2-i[l]/2,r[a]=n===a?e[a]-i[u]:e[getOppositePlacement(a)],r}function find(t,e){return Array.prototype.find?t.find(e):t.filter(e)[0]}function findIndex(t,e,n){if(Array.prototype.findIndex)return t.findIndex(function(t){return t[e]===n});var i=find(t,function(t){return t[e]===n});return t.indexOf(i)}function runModifiers(t,e,n){return(void 0===n?t:t.slice(0,findIndex(t,"name",n))).forEach(function(t){t.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var n=t.function||t.fn;t.enabled&&isFunction(n)&&(e.offsets.popper=getClientRect(e.offsets.popper),e.offsets.reference=getClientRect(e.offsets.reference),e=n(e,t))}),e}function update(){if(!this.state.isDestroyed){var t={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};t.offsets.reference=getReferenceOffsets(this.state,this.popper,this.reference),t.placement=computeAutoPlacement(this.options.placement,t.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),t.originalPlacement=t.placement,t.offsets.popper=getPopperOffsets(this.popper,t.offsets.reference,t.placement),t.offsets.popper.position="absolute",t=runModifiers(this.modifiers,t),this.state.isCreated?this.options.onUpdate(t):(this.state.isCreated=!0,this.options.onCreate(t))}}function isModifierEnabled(t,e){return t.some(function(t){var n=t.name;return t.enabled&&n===e})}function getSupportedPropertyName(t){for(var e=[!1,"ms","Webkit","Moz","O"],n=t.charAt(0).toUpperCase()+t.slice(1),i=0;i<e.length-1;i++){var r=e[i],o=r?""+r+n:t;if(void 0!==window.document.body.style[o])return o}return null}function destroy(){return this.state.isDestroyed=!0,isModifierEnabled(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.left="",this.popper.style.position="",this.popper.style.top="",this.popper.style[getSupportedPropertyName("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function attachToScrollParents(t,e,n,i){var r="BODY"===t.nodeName,o=r?window:t;o.addEventListener(e,n,{passive:!0}),r||attachToScrollParents(getScrollParent(o.parentNode),e,n,i),i.push(o)}function setupEventListeners(t,e,n,i){n.updateBound=i,window.addEventListener("resize",n.updateBound,{passive:!0});var r=getScrollParent(t);return attachToScrollParents(r,"scroll",n.updateBound,n.scrollParents),n.scrollElement=r,n.eventsEnabled=!0,n}function enableEventListeners(){this.state.eventsEnabled||(this.state=setupEventListeners(this.reference,this.options,this.state,this.scheduleUpdate))}function removeEventListeners(t,e){return window.removeEventListener("resize",e.updateBound),e.scrollParents.forEach(function(t){t.removeEventListener("scroll",e.updateBound)}),e.updateBound=null,e.scrollParents=[],e.scrollElement=null,e.eventsEnabled=!1,e}function disableEventListeners(){this.state.eventsEnabled&&(window.cancelAnimationFrame(this.scheduleUpdate),this.state=removeEventListeners(this.reference,this.state))}function isNumeric(t){return""!==t&&!isNaN(parseFloat(t))&&isFinite(t)}function setStyles(t,e){Object.keys(e).forEach(function(n){var i="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&isNumeric(e[n])&&(i="px"),t.style[n]=e[n]+i})}function setAttributes(t,e){Object.keys(e).forEach(function(n){!1!==e[n]?t.setAttribute(n,e[n]):t.removeAttribute(n)})}function applyStyle(t){return setStyles(t.instance.popper,t.styles),setAttributes(t.instance.popper,t.attributes),t.arrowElement&&Object.keys(t.arrowStyles).length&&setStyles(t.arrowElement,t.arrowStyles),t}function applyStyleOnLoad(t,e,n,i,r){var o=getReferenceOffsets(r,e,t),s=computeAutoPlacement(n.placement,o,e,t,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return e.setAttribute("x-placement",s),setStyles(e,{position:"absolute"}),n}function computeStyle(t,e){var n=e.x,i=e.y,r=t.offsets.popper,o=find(t.instance.modifiers,function(t){return"applyStyle"===t.name}).gpuAcceleration;void 0!==o&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var s=void 0!==o?o:e.gpuAcceleration,a=getBoundingClientRect(getOffsetParent(t.instance.popper)),l={position:r.position},u={left:Math.floor(r.left),top:Math.floor(r.top),bottom:Math.floor(r.bottom),right:Math.floor(r.right)},d="bottom"===n?"top":"bottom",c="right"===i?"left":"right",p=getSupportedPropertyName("transform"),f=void 0,h=void 0;if(h="bottom"===d?-a.height+u.bottom:u.top,f="right"===c?-a.width+u.right:u.left,s&&p)l[p]="translate3d("+f+"px, "+h+"px, 0)",l[d]=0,l[c]=0,l.willChange="transform";else{var m="bottom"===d?-1:1,g="right"===c?-1:1;l[d]=h*m,l[c]=f*g,l.willChange=d+", "+c}var b={"x-placement":t.placement};return t.attributes=_extends({},b,t.attributes),t.styles=_extends({},l,t.styles),t.arrowStyles=_extends({},t.offsets.arrow,t.arrowStyles),t}function isModifierRequired(t,e,n){var i=find(t,function(t){return t.name===e}),r=!!i&&t.some(function(t){return t.name===n&&t.enabled&&t.order<i.order});if(!r){var o="`"+e+"`",s="`"+n+"`";console.warn(s+" modifier is required by "+o+" modifier in order to work, be sure to include it before "+o+"!")}return r}function arrow(t,e){if(!isModifierRequired(t.instance.modifiers,"arrow","keepTogether"))return t;var n=e.element;if("string"==typeof n){if(!(n=t.instance.popper.querySelector(n)))return t}else if(!t.instance.popper.contains(n))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),t;var i=t.placement.split("-")[0],r=t.offsets,o=r.popper,s=r.reference,a=-1!==["left","right"].indexOf(i),l=a?"height":"width",u=a?"Top":"Left",d=u.toLowerCase(),c=a?"left":"top",p=a?"bottom":"right",f=getOuterSizes(n)[l];s[p]-f<o[d]&&(t.offsets.popper[d]-=o[d]-(s[p]-f)),s[d]+f>o[p]&&(t.offsets.popper[d]+=s[d]+f-o[p]);var h=s[d]+s[l]/2-f/2,m=getStyleComputedProperty(t.instance.popper,"margin"+u).replace("px",""),g=h-getClientRect(t.offsets.popper)[d]-m;return g=Math.max(Math.min(o[l]-f,g),0),t.arrowElement=n,t.offsets.arrow={},t.offsets.arrow[d]=Math.round(g),t.offsets.arrow[c]="",t}function getOppositeVariation(t){return"end"===t?"start":"start"===t?"end":t}function clockwise(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=validPlacements.indexOf(t),i=validPlacements.slice(n+1).concat(validPlacements.slice(0,n));return e?i.reverse():i}function flip(t,e){if(isModifierEnabled(t.instance.modifiers,"inner"))return t;if(t.flipped&&t.placement===t.originalPlacement)return t;var n=getBoundaries(t.instance.popper,t.instance.reference,e.padding,e.boundariesElement),i=t.placement.split("-")[0],r=getOppositePlacement(i),o=t.placement.split("-")[1]||"",s=[];switch(e.behavior){case BEHAVIORS.FLIP:s=[i,r];break;case BEHAVIORS.CLOCKWISE:s=clockwise(i);break;case BEHAVIORS.COUNTERCLOCKWISE:s=clockwise(i,!0);break;default:s=e.behavior}return s.forEach(function(a,l){if(i!==a||s.length===l+1)return t;i=t.placement.split("-")[0],r=getOppositePlacement(i);var u=t.offsets.popper,d=t.offsets.reference,c=Math.floor,p="left"===i&&c(u.right)>c(d.left)||"right"===i&&c(u.left)<c(d.right)||"top"===i&&c(u.bottom)>c(d.top)||"bottom"===i&&c(u.top)<c(d.bottom),f=c(u.left)<c(n.left),h=c(u.right)>c(n.right),m=c(u.top)<c(n.top),g=c(u.bottom)>c(n.bottom),b="left"===i&&f||"right"===i&&h||"top"===i&&m||"bottom"===i&&g,v=-1!==["top","bottom"].indexOf(i),y=!!e.flipVariations&&(v&&"start"===o&&f||v&&"end"===o&&h||!v&&"start"===o&&m||!v&&"end"===o&&g);(p||b||y)&&(t.flipped=!0,(p||b)&&(i=s[l+1]),y&&(o=getOppositeVariation(o)),t.placement=i+(o?"-"+o:""),t.offsets.popper=_extends({},t.offsets.popper,getPopperOffsets(t.instance.popper,t.offsets.reference,t.placement)),t=runModifiers(t.instance.modifiers,t,"flip"))}),t}function keepTogether(t){var e=t.offsets,n=e.popper,i=e.reference,r=t.placement.split("-")[0],o=Math.floor,s=-1!==["top","bottom"].indexOf(r),a=s?"right":"bottom",l=s?"left":"top",u=s?"width":"height";return n[a]<o(i[l])&&(t.offsets.popper[l]=o(i[l])-n[u]),n[l]>o(i[a])&&(t.offsets.popper[l]=o(i[a])),t}function toValue(t,e,n,i){var r=t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),o=+r[1],s=r[2];if(!o)return t;if(0===s.indexOf("%")){var a=void 0;switch(s){case"%p":a=n;break;case"%":case"%r":default:a=i}return getClientRect(a)[e]/100*o}if("vh"===s||"vw"===s){return("vh"===s?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*o}return o}function parseOffset(t,e,n,i){var r=[0,0],o=-1!==["right","left"].indexOf(i),s=t.split(/(\+|\-)/).map(function(t){return t.trim()}),a=s.indexOf(find(s,function(t){return-1!==t.search(/,|\s/)}));s[a]&&-1===s[a].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var l=/\s*,\s*|\s+/,u=-1!==a?[s.slice(0,a).concat([s[a].split(l)[0]]),[s[a].split(l)[1]].concat(s.slice(a+1))]:[s];return(u=u.map(function(t,i){var r=(1===i?!o:o)?"height":"width",s=!1;return t.reduce(function(t,e){return""===t[t.length-1]&&-1!==["+","-"].indexOf(e)?(t[t.length-1]=e,s=!0,t):s?(t[t.length-1]+=e,s=!1,t):t.concat(e)},[]).map(function(t){return toValue(t,r,e,n)})})).forEach(function(t,e){t.forEach(function(n,i){isNumeric(n)&&(r[e]+=n*("-"===t[i-1]?-1:1))})}),r}function offset(t,e){var n=e.offset,i=t.placement,r=t.offsets,o=r.popper,s=r.reference,a=i.split("-")[0],l=void 0;return l=isNumeric(+n)?[+n,0]:parseOffset(n,o,s,a),"left"===a?(o.top+=l[0],o.left-=l[1]):"right"===a?(o.top+=l[0],o.left+=l[1]):"top"===a?(o.left+=l[0],o.top-=l[1]):"bottom"===a&&(o.left+=l[0],o.top+=l[1]),t.popper=o,t}function preventOverflow(t,e){var n=e.boundariesElement||getOffsetParent(t.instance.popper);t.instance.reference===n&&(n=getOffsetParent(n));var i=getBoundaries(t.instance.popper,t.instance.reference,e.padding,n);e.boundaries=i;var r=e.priority,o=t.offsets.popper,s={primary:function(t){var n=o[t];return o[t]<i[t]&&!e.escapeWithReference&&(n=Math.max(o[t],i[t])),defineProperty$1({},t,n)},secondary:function(t){var n="right"===t?"left":"top",r=o[n];return o[t]>i[t]&&!e.escapeWithReference&&(r=Math.min(o[n],i[t]-("right"===t?o.width:o.height))),defineProperty$1({},n,r)}};return r.forEach(function(t){var e=-1!==["left","top"].indexOf(t)?"primary":"secondary";o=_extends({},o,s[e](t))}),t.offsets.popper=o,t}function shift(t){var e=t.placement,n=e.split("-")[0],i=e.split("-")[1];if(i){var r=t.offsets,o=r.reference,s=r.popper,a=-1!==["bottom","top"].indexOf(n),l=a?"left":"top",u=a?"width":"height",d={start:defineProperty$1({},l,o[l]),end:defineProperty$1({},l,o[l]+o[u]-s[u])};t.offsets.popper=_extends({},s,d[i])}return t}function hide(t){if(!isModifierRequired(t.instance.modifiers,"hide","preventOverflow"))return t;var e=t.offsets.reference,n=find(t.instance.modifiers,function(t){return"preventOverflow"===t.name}).boundaries;if(e.bottom<n.top||e.left>n.right||e.top>n.bottom||e.right<n.left){if(!0===t.hide)return t;t.hide=!0,t.attributes["x-out-of-boundaries"]=""}else{if(!1===t.hide)return t;t.hide=!1,t.attributes["x-out-of-boundaries"]=!1}return t}function inner(t){var e=t.placement,n=e.split("-")[0],i=t.offsets,r=i.popper,o=i.reference,s=-1!==["left","right"].indexOf(n),a=-1===["top","left"].indexOf(n);return r[s?"left":"top"]=o[n]-(a?r[s?"width":"height"]:0),t.placement=getOppositePlacement(e),t.offsets.popper=getClientRect(r),t}function isVisible$1(t){return t&&(t.offsetWidth>0||t.offsetHeight>0)}function filterVisible(t){return(t||[]).filter(isVisible$1)}function pickLinkProps(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return keys(props$10).reduce(function(e,n){return arrayIncludes(t,n)&&(e[n]=props$10[n]),e},{})}function getTransisionEndEvent(t){for(var e in TransitionEndEvents)if(void 0!==t.style[e])return TransitionEndEvents[e];return null}function makeBlankImgSrc(t,e,n){return"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(BLANK_TEMPLATE.replace("%{w}",String(t)).replace("%{h}",String(e)).replace("%{f}",n))}function boolStrNum(){return{type:[Boolean,String,Number],default:!1}}function strNum(){return{type:[String,Number],default:null}}function isVisible$2(t){return t&&(t.offsetWidth>0||t.offsetHeight>0)}function findFirstVisible(t,e){if(!t||!t.querySelectorAll||!e)return null;for(var n=from(t.querySelectorAll(e)),i=n.find?n.find(function(t){return isVisible$2(t)}):null,r=0;!i&&r<n.length;r++)isVisible$2(n[r])&&(i=n[r]);return i}function isVisible$3(t){return t&&(t.offsetWidth>0||t.offsetHeight>0)}function makePageArray(t,e){return range(e).map(function(e,n){return{number:n+t,className:null}})}function isVisible$4(t){return t&&(t.offsetWidth>0||t.offsetHeight>0)}function makePageArray$1(t,e){return range(e).map(function(e,n){return{number:n+t,className:null}})}function generateId(t){return"__BV_"+t+"_"+NEXTID+++"__"}function elVisible(t){return t&&(null!==t.offsetParent||!(t.offsetWidth>0||t.offsetHeight>0))}function elDisabled(t){return!t||t.disabled||t.classList.contains("disabled")||Boolean(t.getAttribute("disabled"))}function arrayReduce(t,e,n,i){var r=-1,o=t?t.length:0;for(i&&o&&(n=t[++r]);++r<o;)n=e(n,t[r],r,t);return n}function asciiToArray(t){return t.split("")}function asciiWords(t){return t.match(reAsciiWord)||[]}function basePropertyOf(t){return function(e){return null==t?void 0:t[e]}}function hasUnicode(t){return reHasUnicode.test(t)}function hasUnicodeWord(t){return reHasUnicodeWord.test(t)}function stringToArray(t){return hasUnicode(t)?unicodeToArray(t):asciiToArray(t)}function unicodeToArray(t){return t.match(reUnicode)||[]}function unicodeWords(t){return t.match(reUnicodeWord)||[]}function baseSlice(t,e,n){var i=-1,r=t.length;e<0&&(e=-e>r?0:r+e),(n=n>r?r:n)<0&&(n+=r),r=e>n?0:n-e>>>0,e>>>=0;for(var o=Array(r);++i<r;)o[i]=t[i+e];return o}function baseToString(t){if("string"==typeof t)return t;if(isSymbol(t))return symbolToString?symbolToString.call(t):"";var e=t+"";return"0"==e&&1/t==-INFINITY?"-0":e}function castSlice(t,e,n){var i=t.length;return n=void 0===n?i:n,!e&&n>=i?t:baseSlice(t,e,n)}function createCaseFirst(t){return function(e){var n=hasUnicode(e=toString$1(e))?stringToArray(e):void 0,i=n?n[0]:e.charAt(0),r=n?castSlice(n,1).join(""):e.slice(1);return i[t]()+r}}function createCompounder(t){return function(e){return arrayReduce(words(deburr(e).replace(reApos,"")),t,"")}}function isObjectLike(t){return!!t&&"object"==typeof t}function isSymbol(t){return"symbol"==typeof t||isObjectLike(t)&&objectToString.call(t)==symbolTag}function toString$1(t){return null==t?"":baseToString(t)}function deburr(t){return(t=toString$1(t))&&t.replace(reLatin,deburrLetter).replace(reComboMark,"")}function words(t,e,n){return t=toString$1(t),void 0===(e=n?void 0:e)?hasUnicodeWord(t)?unicodeWords(t):asciiWords(t):t.match(e)||[]}function targets(t,e,n,i){var r=keys(e.modifiers||{}).filter(function(t){return!all_listen_types[t]});e.value&&r.push(e.value);var o=function(){i({targets:r,vnode:t})};return keys(all_listen_types).forEach(function(i){(n[i]||e.modifiers[i])&&t.elm.addEventListener(i,o)}),r}function isElement(t){return t.nodeType}function closest(t,e){var n=t.closest(e);return n===t?null:n}function $QSA(t,e){return e||(e=document),isElement(e)?from(e.querySelectorAll(t)):[]}function $QS(t,e){return e||(e=document),isElement(e)?e.querySelector(t)||null:null}function getVm(t){return t?t.__vue__:null}function toType(t){return{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function typeCheckConfig(t,e,n){for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){var r=n[i],o=e[i],s=o&&isElement(o)?"element":toType(o);new RegExp(r).test(s)||console.error(t+': Option "'+i+'" provided type "'+s+'" but expected type "'+r+'"')}}function ScrollSpy(t,e,n){this._$el=t,this._selector=[Selector$2.NAV_LINKS,Selector$2.LIST_ITEMS,Selector$2.DROPDOWN_ITEMS].join(","),this._config=assign({},Default),this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,this._$root=n.context.$root||null,this._resizeTimeout=null,this.updateConfig(e)}function addBVSS(t,e,n){return t[BVSS]?t[BVSS].updateConfig(e).listen():(t[BVSS]=new ScrollSpy(t,e,n),t[BVSS].listen()),t[BVSS]}function removeBVSS(t){t[BVSS]&&(t[BVSS].unListen().dispose(),t[BVSS]=null)}function parseBindings(t){var e={};"string"==typeof t.value?e.title=t.value:"function"==typeof t.value?e.title=t.value:"object"==typeof t.value&&(e=assign(t.value)),t.arg&&(e.container="#"+t.arg),keys(t.modifiers).forEach(function(t){if(/^html$/.test(t))e.html=!0;else if(/^nofade$/.test(t))e.animation=!1;else if(/^(auto|top|bottom|left|right)$/.test(t))e.placement=t;else if(/^d\d+$/.test(t)){var n=parseInt(t.slice(1),10)||0;n&&(e.delay=n)}else if(/^o-?\d+$/.test(t)){var i=parseInt(t.slice(1),10)||0;i&&(e.offset=i)}});var n={};return("string"==typeof e.trigger?e.trigger.trim().split(/\s+/):[]).forEach(function(t){validTriggers[t]&&(n[t]=!0)}),keys(validTriggers).forEach(function(e){t.modifiers[e]&&(n[e]=!0)}),e.trigger=keys(n).join(" "),"blur"===e.trigger&&(e.trigger="focus"),e.trigger||delete e.trigger,e}function applyBVTT(t,e,n){inBrowser$3&&(Popper?t[BVTT]?t[BVTT].updateConfig(parseBindings(e)):t[BVTT]=new ToolTip(t,parseBindings(e),n.context.$root):warn("v-b-tooltip: Popper.js is required for tooltips to work"))}function removeBVTT(t){inBrowser$3&&t[BVTT]&&(t[BVTT].destroy(),t[BVTT]=null,delete t[BVTT])}function parseBindings$1(t){var e={};"string"==typeof t.value?e.content=t.value:"function"==typeof t.value?e.content=t.value:"object"==typeof t.value&&(e=assign(t.value)),t.arg&&(e.container="#"+t.arg),keys(t.modifiers).forEach(function(t){if(/^html$/.test(t))e.html=!0;else if(/^nofade$/.test(t))e.animation=!1;else if(/^(auto|top|bottom|left|right)$/.test(t))e.placement=t;else if(/^d\d+$/.test(t)){var n=parseInt(t.slice(1),10)||0;n&&(e.delay=n)}else if(/^o-?\d+$/.test(t)){var i=parseInt(t.slice(1),10)||0;i&&(e.offset=i)}});var n={};return("string"==typeof e.trigger?e.trigger.trim().split(/\s+/):[]).forEach(function(t){validTriggers$1[t]&&(n[t]=!0)}),keys(validTriggers$1).forEach(function(e){t.modifiers[e]&&(n[e]=!0)}),e.trigger=keys(n).join(" "),"blur"===e.trigger&&(e.trigger="focus"),e.trigger||delete e.trigger,e}function applyBVPO(t,e,n){inBrowser$4&&(Popper?t[BVPO]?t[BVPO].updateConfig(parseBindings$1(e)):t[BVPO]=new PopOver(t,parseBindings$1(e),n.context.$root):warn("v-b-popover: Popper.js is required for popovers to work"))}function removeBVPO(t){inBrowser$4&&t[BVPO]&&(t[BVPO].destroy(),t[BVPO]=null,delete t[BVPO])}Array.from||(Array.from=function(){var t=Object.prototype.toString,e=function(e){return"function"==typeof e||"[object Function]"===t.call(e)},n=function(t){var e=Number(t);return isNaN(e)?0:0!==e&&isFinite(e)?(e>0?1:-1)*Math.floor(Math.abs(e)):e},i=Math.pow(2,53)-1,r=function(t){return Math.min(Math.max(n(t),0),i)};return function(t){var n=this,i=Object(t);if(null==t)throw new TypeError("Array.from requires an array-like object - not null or undefined");var o,s=arguments.length>1?arguments[1]:void 0;if(void 0!==s){if(!e(s))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(o=arguments[2])}for(var a,l=r(i.length),u=e(n)?Object(new n(l)):new Array(l),d=0;d<l;)a=i[d],u[d]=s?void 0===o?s(a,d):s.call(o,a,d):a,d+=1;return u.length=l,u}}()),Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)});var from=Array.from,isArray=Array.isArray,arrayIncludes=function(t,e){return-1!==t.indexOf(e)};"function"!=typeof Object.assign&&(Object.assign=function(t,e){var n=arguments;if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var i=Object(t),r=1;r<arguments.length;r++){var o=n[r];if(null!=o)for(var s in o)Object.prototype.hasOwnProperty.call(o,s)&&(i[s]=o[s])}return i});var assign=Object.assign,keys=Object.keys,defineProperties=Object.defineProperties,defineProperty=Object.defineProperty,create=Object.create,__assign=Object.assign||function(t){for(var e,n=arguments,i=1,r=arguments.length;i<r;i++){e=n[i];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},keys$1=Object.keys,lib_common=mergeData,alert={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.localShow?n("div",{class:t.classObject,attrs:{role:"alert","aria-live":"polite","aria-atomic":"true"}},[t.dismissible?n("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert","aria-label":t.dismissLabel},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.dismiss(e)}}},[n("span",{staticClass:"d-inline-block",attrs:{"aria-hidden":"true"}},[t._t("dismiss",[t._v("×")])],2)]):t._e(),t._t("default")],2):t._e()},staticRenderFns:[],model:{prop:"show",event:"input"},data:function(){return{countDownTimerId:null,dismissed:!1}},computed:{classObject:function(){return["alert",this.alertVariant,this.dismissible?"alert-dismissible":""]},alertVariant:function(){return"alert-"+this.variant},localShow:function(){return!this.dismissed&&(this.countDownTimerId||this.show)}},props:{variant:{type:String,default:"info"},dismissible:{type:Boolean,default:!1},dismissLabel:{type:String,default:"Close"},show:{type:[Boolean,Number],default:!1}},watch:{show:function(){this.showChanged()}},mounted:function(){this.showChanged()},destroyed:function(){this.clearCounter()},methods:{dismiss:function(){this.clearCounter(),this.dismissed=!0,this.$emit("dismissed"),this.$emit("input",!1),"number"==typeof this.show?(this.$emit("dismiss-count-down",0),this.$emit("input",0)):this.$emit("input",!1)},clearCounter:function(){this.countDownTimerId&&(clearInterval(this.countDownTimerId),this.countDownTimerId=null)},showChanged:function(){var t=this;if(this.clearCounter(),this.dismissed=!1,!0!==this.show&&!1!==this.show&&null!==this.show&&0!==this.show){var e=this.show;this.countDownTimerId=setInterval(function(){e<1?t.dismiss():(e--,t.$emit("dismiss-count-down",e),t.$emit("input",e))},1e3)}}}},props={tag:{type:String,default:"span"},variant:{type:String,default:"secondary"},pill:{type:Boolean,default:!1}},badge={functional:!0,props:props,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(n.tag,lib_common(i,{staticClass:"badge",class:[n.variant?"badge-"+n.variant:"badge-secondary",{"badge-pill":Boolean(n.pill)}]}),r)}},props$4=propsFactory(),bLink={functional:!0,props:propsFactory(),render:function(t,e){var n=e.props,i=e.data,r=e.parent,o=e.children,s=computeTag(n),a=computeRel(n),l=computeHref(n),u="router-link"===s?"nativeOn":"on",d=(i[u]||{}).click,c={click:clickHandlerFactory({tag:s,href:l,disabled:n.disabled,suppliedHandler:d,parent:r})},p=lib_common(i,{class:[n.active?n.exact?n.exactActiveClass:n.activeClass:null,{disabled:n.disabled}],attrs:{rel:a,href:l,target:n.target,"aria-disabled":"a"===s?n.disabled?"true":"false":null},props:assign(n,{tag:n.routerTag})});return p[u]=assign(p[u]||{},c),t(s,p,o)}},props$3=assign(propsFactory(),{text:{type:String,default:null},active:{type:Boolean,default:!1},href:{type:String,default:"#"},ariaCurrent:{type:String,default:"location"}}),BreadcrumbLink={functional:!0,props:props$3,render:function(t,e){var n=e.props,i=e.data,r=e.children,o=n.active?"span":bLink,s={props:pluckProps(props$3,n),domProps:{innerHTML:n.text}};return n.active?s.attrs={"aria-current":n.ariaCurrent}:s.attrs={href:n.href},t(o,lib_common(i,s),r)}},props$2=assign({},props$3,{text:{type:String,default:null},href:{type:String,default:null}}),BreadcrumbItem={functional:!0,props:props$2,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t("li",lib_common(i,{staticClass:"breadcrumb-item",class:{active:n.active},attrs:{role:"presentation"}}),[t(BreadcrumbLink,{props:n},r)])}},props$1={items:{type:Array,default:null}},breadcrumb={functional:!0,props:props$1,render:function(t,e){var n=e.props,i=e.data,r=e.children;if(isArray(n.items)){var o=!1;r=n.items.map(function(e,i){"object"!=typeof e&&(e={text:e});var r=e.active;return r&&(o=!0),r||o||(r=i+1===n.items.length),t(BreadcrumbItem,{props:assign({},e,{active:r})})})}return t("ol",lib_common(i,{staticClass:"breadcrumb"}),r)}},btnProps={block:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},size:{type:String,default:null,validator:function(t){return arrayIncludes(["sm","","lg"],t)}},variant:{type:String,default:null},type:{type:String,default:"button"},pressed:{type:Boolean,default:null}},linkProps=propsFactory();delete linkProps.href.default,delete linkProps.to.default;for(var linkPropKeys=keys(linkProps),props$5=assign(linkProps,btnProps),bBtn={functional:!0,props:props$5,render:function(t,e){var n=e.props,i=e.data,r=e.listeners,o=e.children,s=Boolean(n.href||n.to),a="boolean"==typeof n.pressed,l={click:function(t){n.disabled&&t instanceof Event?(t.stopPropagation(),t.preventDefault()):a&&concat(r["update:pressed"]).forEach(function(t){"function"==typeof t&&t(!n.pressed)})}};a&&(l.focusin=handleFocus,l.focusout=handleFocus);var u,d={staticClass:"btn",class:[n.variant?"btn-"+n.variant:"btn-secondary",(u={"btn-block":n.block,disabled:n.disabled,active:n.pressed},u["btn-"+n.size]=Boolean(n.size),u)],props:s?pluckProps(linkPropKeys,n):null,attrs:{type:s?null:n.type,disabled:s?null:n.disabled,"data-toggle":a?"button":null,"aria-pressed":a?String(n.pressed):null,tabindex:n.disabled&&s?"-1":null},on:l};return t(s?bLink:"button",lib_common(i,d),o)}},ITEM_SELECTOR=[".btn:not(.disabled):not([disabled])",".form-control:not(.disabled):not([disabled])","select:not(.disabled):not([disabled])",'input[type="checkbox"]:not(.disabled)','input[type="radio"]:not(.disabled)'].join(","),buttonToolbar={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{class:t.classObject,attrs:{role:"toolbar",tabindex:t.keyNav?"0":null},on:{focusin:function(e){if(e.target!==e.currentTarget)return null;t.focusFirst(e)},keydown:[function(e){return"button"in e||!t._k(e.keyCode,"left",37)?"button"in e&&0!==e.button?null:void t.focusNext(e,!0):null},function(e){if(!("button"in e)&&t._k(e.keyCode,"up",38))return null;t.focusNext(e,!0)},function(e){return"button"in e||!t._k(e.keyCode,"right",39)?"button"in e&&2!==e.button?null:void t.focusNext(e,!1):null},function(e){if(!("button"in e)&&t._k(e.keyCode,"down",40))return null;t.focusNext(e,!1)},function(e){return("button"in e||!t._k(e.keyCode,"left",37))&&e.shiftKey?"button"in e&&0!==e.button?null:void t.focusFirst(e):null},function(e){return("button"in e||!t._k(e.keyCode,"up",38))&&e.shiftKey?void t.focusFirst(e):null},function(e){return("button"in e||!t._k(e.keyCode,"right",39))&&e.shiftKey?"button"in e&&2!==e.button?null:void t.focusLast(e):null},function(e){return("button"in e||!t._k(e.keyCode,"down",40))&&e.shiftKey?void t.focusLast(e):null}]}},[t._t("default")],2)},staticRenderFns:[],computed:{classObject:function(){return["btn-toolbar",this.justify&&!this.vertical?"justify-content-between":""]}},props:{justify:{type:Boolean,default:!1},keyNav:{type:Boolean,default:!1}},methods:{setItemFocus:function(t){this.$nextTick(function(){t.focus()})},focusNext:function(t,e){if(this.keyNav){t.preventDefault(),t.stopPropagation();var n=this.getItems();if(!(n.length<1)){var i=n.indexOf(t.target);e&&i>0?i--:!e&&i<n.length-1&&i++,i<0&&(i=0),this.setItemFocus(n[i])}}},focusFirst:function(t){if(this.keyNav){t.preventDefault(),t.stopPropagation();var e=this.getItems();e.length>0&&this.setItemFocus(e[0])}},focusLast:function(t){if(this.keyNav){t.preventDefault(),t.stopPropagation();var e=this.getItems();e.length>0&&this.setItemFocus([e.length-1])}},getItems:function(){var t=from(this.$el.querySelectorAll(ITEM_SELECTOR));return t.forEach(function(t){t.tabIndex=-1}),t.filter(function(t){return isVisible(t)})}},mounted:function(){this.keyNav&&this.getItems()}},props$6={vertical:{type:Boolean,default:!1},size:{type:String,default:null,validator:function(t){return arrayIncludes(["sm","","lg"],t)}},tag:{type:String,default:"div"},ariaRole:{type:String,default:"group"}},buttonGroup={functional:!0,props:props$6,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(n.tag,lib_common(i,{staticClass:"btn-group",class:(o={"btn-group-vertical":n.vertical},o["btn-group-"+n.size]=Boolean(n.size),o),attrs:{role:n.ariaRole}}),r);var o}},props$7={id:{type:String,default:null},tag:{type:String,default:"div"}},bInputGroupAddon={functional:!0,props:props$7,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(n.tag,lib_common(i,{staticClass:"input-group-addon",attrs:{id:n.id}}),r)}},inputGroup={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(t.tag,{tag:"component",class:t.classObject,attrs:{id:t.id||null,role:"group"}},[t._t("left",[t.left?n("b-input-group-addon",{attrs:{id:t.id?t.id+"_BV_addon_left_":null},domProps:{innerHTML:t._s(t.left)}}):t._e()]),t._t("default"),t._t("right",[t.right?n("b-input-group-addon",{attrs:{id:t.id?t.id+"_BV_addon_right_":null},domProps:{innerHTML:t._s(t.right)}}):t._e()])],2)},staticRenderFns:[],components:{bInputGroupAddon:bInputGroupAddon},computed:{classObject:function(){return["input-group",this.size?"input-group-"+this.size:"",this.state?"has-"+this.state:""]}},props:{id:{type:String,defualt:null},size:{type:String,default:null},state:{type:String,default:null},left:{type:String,default:null},right:{type:String,default:null},tag:{type:String,default:"div"}}},props$8={id:{type:String,default:null},tag:{type:String,default:"div"}},inputGroupButton={functional:!0,props:props$8,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(n.tag,lib_common(i,{staticClass:"input-group-btn",attrs:{id:n.id}}),r)}},cardMixin={props:{tag:{type:String,default:"div"},bgVariant:{type:String,default:null},borderVariant:{type:String,default:null},textVariant:{type:String,default:null}}},clickoutMixin={mounted:function(){"undefined"!=typeof document&&document.documentElement.addEventListener("click",this._clickOutListener)},destroyed:function(){"undefined"!=typeof document&&document.removeEventListener("click",this._clickOutListener)},methods:{_clickOutListener:function(t){this.$el.contains(t.target)||this.clickOutListener&&this.clickOutListener()}}},nativeHints=["native code","[object MutationObserverConstructor]"],isNative=function(t){return nativeHints.some(function(e){return(t||"").toString().indexOf(e)>-1})},isBrowser="undefined"!=typeof window,longerTimeoutBrowsers=["Edge","Trident","Firefox"],timeoutDuration=0,i=0;i<longerTimeoutBrowsers.length;i+=1)if(isBrowser&&navigator.userAgent.indexOf(longerTimeoutBrowsers[i])>=0){timeoutDuration=1;break}var supportsNativeMutationObserver=isBrowser&&isNative(window.MutationObserver),debounce=supportsNativeMutationObserver?microtaskDebounce:taskDebounce,isIE10=void 0,isIE10$1=function(){return void 0===isIE10&&(isIE10=-1!==navigator.appVersion.indexOf("MSIE 10")),isIE10},classCallCheck=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),defineProperty$1=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},_extends=Object.assign||function(t){for(var e=arguments,n=1;n<arguments.length;n++){var i=e[n];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r])}return t},placements=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],validPlacements=placements.slice(3),BEHAVIORS={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"},modifiers={shift:{order:100,enabled:!0,fn:shift},offset:{order:200,enabled:!0,fn:offset,offset:0},preventOverflow:{order:300,enabled:!0,fn:preventOverflow,priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:keepTogether},arrow:{order:500,enabled:!0,fn:arrow,element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:flip,behavior:"flip",padding:5,boundariesElement:"viewport"},inner:{order:700,enabled:!1,fn:inner},hide:{order:800,enabled:!0,fn:hide},computeStyle:{order:850,enabled:!0,fn:computeStyle,gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:applyStyle,onLoad:applyStyleOnLoad,gpuAcceleration:void 0}},Defaults={placement:"bottom",eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:modifiers},Popper=function(){function t(e,n){var i=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};classCallCheck(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(i.update)},this.update=debounce(this.update.bind(this)),this.options=_extends({},t.Defaults,r),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e.jquery?e[0]:e,this.popper=n.jquery?n[0]:n,this.options.modifiers={},Object.keys(_extends({},t.Defaults.modifiers,r.modifiers)).forEach(function(e){i.options.modifiers[e]=_extends({},t.Defaults.modifiers[e]||{},r.modifiers?r.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(t){return _extends({name:t},i.options.modifiers[t])}).sort(function(t,e){return t.order-e.order}),this.modifiers.forEach(function(t){t.enabled&&isFunction(t.onLoad)&&t.onLoad(i.reference,i.popper,i.options,t,i.state)}),this.update();var o=this.options.eventsEnabled;o&&this.enableEventListeners(),this.state.eventsEnabled=o}return createClass(t,[{key:"update",value:function(){return update.call(this)}},{key:"destroy",value:function(){return destroy.call(this)}},{key:"enableEventListeners",value:function(){return enableEventListeners.call(this)}},{key:"disableEventListeners",value:function(){return disableEventListeners.call(this)}}]),t}();Popper.Utils=("undefined"!=typeof window?window:global).PopperUtils,Popper.placements=placements,Popper.Defaults=Defaults;var BVRL="__BV_root_listeners__",listenOnRootMixin={methods:{listenOnRoot:function(t,e){return this[BVRL]&&isArray(this[BVRL])||(this[BVRL]=[]),this[BVRL].push({event:t,callback:e}),this.$root.$on(t,e),this},emitOnRoot:function(t){for(var e=[],n=arguments.length-1;n-- >0;)e[n]=arguments[n+1];return(i=this.$root).$emit.apply(i,[t].concat(e)),this;var i}},destroyed:function(){var t=this;if(this[BVRL]&&isArray(this[BVRL]))for(;this[BVRL].length>0;){var e=t[BVRL].shift(),n=e.event,i=e.callback;t.$root.$off(n,i)}}};"undefined"!=typeof document&&window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(t){var e,n=(this.document||this.ownerDocument).querySelectorAll(t),i=this;do{for(e=n.length;--e>=0&&n.item(e)!==i;);}while(e<0&&(i=i.parentElement));return i});var ITEM_SELECTOR$1=".dropdown-item:not(.disabled):not([disabled])",AttachmentMap={TOP:"top-start",TOPEND:"top-end",BOTTOM:"bottom-start",BOTTOMEND:"bottom-end"},dropdownMixin={mixins:[clickoutMixin,listenOnRootMixin],props:{disabled:{type:Boolean,default:!1},text:{type:String,default:""},dropup:{type:Boolean,default:!1},right:{type:Boolean,default:!1},offset:{type:[Number,String],default:0},noFlip:{type:Boolean,default:!1},popperOpts:{type:Object,default:function(){}}},data:function(){return{visible:!1,_popper:null,inNavbar:null}},created:function(){var t=this,e=function(e){e!==t&&(t.visible=!1)};this.listenOnRoot("bv::dropdown::shown",e),this.listenOnRoot("clicked::link",e),this.listenOnRoot("bv::link::clicked",e)},watch:{visible:function(t,e){t!==e&&(t?this.showMenu():this.hideMenu())}},computed:{toggler:function(){return this.$refs.toggle.$el||this.$refs.toggle}},destroyed:function(){this._popper&&this._popper.destroy(),this._popper=null,this.setTouchStart(!1)},methods:{showMenu:function(){if(!this.disabled){if(this.$emit("show"),this.emitOnRoot("bv::dropdown::shown",this),"function"==typeof Popper){null===this.inNavbar&&this.isNav&&(this.inNavbar=Boolean(this.$el.closest(".navbar")));var t=this.dropup&&this.right||this.split||this.inNavbar?this.$el:this.$refs.toggle;t=t.$el||t,this._popper=new Popper(t,this.$refs.menu,this.getPopperConfig())}this.setTouchStart(!0),this.$emit("shown"),this.$nextTick(this.focusFirstItem)}},hideMenu:function(){this.$emit("hide"),this._popper&&this._popper.destroy(),this._popper=null,this.setTouchStart(!1),this.emitOnRoot("bv::dropdown::hidden",this),this.$emit("hidden")},getPopperConfig:function(){var t=AttachmentMap.BOTTOM;this.dropup&&this.right?t=AttachmentMap.TOPEND:this.dropup?t=AttachmentMap.TOP:this.right&&(t=AttachmentMap.BOTTOMEND);var e={placement:t,modifiers:{offset:{offset:this.offset||0},flip:{enabled:!this.noFlip},applyStyle:{enabled:!this.inNavbar}}};return assign(e,this.popperOpts||{})},setTouchStart:function(t){var e=this;"ontouchstart"in document.documentElement&&from(document.body.children).forEach(function(n){t?n.addEventListener("mouseover",e.noop):n.removeEventListener("mouseover",e.noop)})},noop:function(){},clickOutListener:function(){this.visible=!1},click:function(t){this.disabled?this.visible=!1:this.$emit("click",t)},toggle:function(){this.disabled?this.visible=!1:this.visible=!this.visible},onTab:function(){this.visible&&(this.visible=!1)},onEsc:function(t){this.visible&&(this.visible=!1,t.preventDefault(),t.stopPropagation(),this.$nextTick(this.focusToggler))},onFocusOut:function(t){this.$refs.menu.contains(t.relatedTarget)||(this.visible=!1)},onMouseOver:function(t){var e=t.target;e.classList.contains("dropdown-item")&&!e.disabled&&!e.classList.contains("disabled")&&e.focus&&e.focus()},focusNext:function(t,e){var n=this;this.visible&&(t.preventDefault(),t.stopPropagation(),this.$nextTick(function(){var i=n.getItems();if(!(i.length<1)){var r=i.indexOf(t.target);e&&r>0?r--:!e&&r<i.length-1&&r++,r<0&&(r=0),n.focusItem(r,i)}}))},focusItem:function(t,e){var n=e.find(function(e,n){return n===t});n&&"-1"!==n.getAttribute("tabindex")&&n.focus()},getItems:function(){return filterVisible(from(this.$refs.menu.querySelectorAll(ITEM_SELECTOR$1)))},getFirstItem:function(){return this.getItems()[0]||null},focusFirstItem:function(){var t=this.getFirstItem();t&&this.focusItem(0,[t])},focusToggler:function(){var t=this.toggler;t&&t.focus&&t.focus()}}},formMixin={props:{name:{type:String},id:{type:String},disabled:{type:Boolean},required:{type:Boolean,default:!1}}},formCheckBoxMixin={computed:{checkboxClass:function(){return{"custom-control":this.custom,"form-check-inline":this.inline}}}},formCustomMixin={computed:{custom:function(){return!this.plain}},props:{plain:{type:Boolean,default:!1}}},formOptionsMixin={computed:{formOptions:function(){var t=this,e=this.options||{};return e=isArray(e)?e.map(function(e){return"object"==typeof e?{value:e[t.valueField],text:e[t.textField],disabled:e.disabled||!1}:{text:String(e),value:e||{}}}):keys(e).map(function(n){var i=e[n]||{};return"object"!=typeof i&&(i={text:String(i)}),i.value=i[t.valueField]||n,i.text=i[t.textField]||n,i})},selectedValue:function(){var t=this,e=this.formOptions;if(this.returnObject&&!this.multiple){for(var n=0;n<e.length;n++)if(e[n].value===t.localValue)return e[n];return null}return this.localValue}},props:{valueField:{type:String,default:"value"},textField:{type:String,default:"text"}},watch:{localValue:function(t,e){t!==e&&this.$emit("input",this.selectedValue)},value:function(t,e){t!==e&&(this.localValue=t)}}},formSizeMixin={props:{size:{type:String,default:null}},computed:{sizeFormClass:function(){return[this.size?"form-control-"+this.size:null]},sizeBtnClass:function(){return[this.size?"btn-"+this.size:null]}}},formStateMixin={props:{state:{type:[Boolean,String],default:null}},computed:{computedState:function(){var t=this.state;return!0===t||"valid"===t||!1!==t&&"invalid"!==t&&null},stateClass:function(){var t=this.computedState;return!0===t?"is-valid":!1===t?"is-invalid":null}}},idMixin={props:{id:{typ:String,default:null}},data:function(){return{localId_:null}},mounted:function(){this.$isServer||this.id||!this._uid||(this.localId_="__BVID__"+this._uid+"_")},methods:{safeId:function(t){void 0===t&&(t="");var e=this.id||this.localId_||null;return e?(t=String(t).replace(/\s+/g,"_"),Boolean(t)?e+"_"+t:e):null}}},props$10=propsFactory(),props$11=assign({},copyProps(cardMixin.props,prefixPropName.bind(null,"body")),{title:{type:String,default:null},titleTag:{type:String,default:"h4"},subTitle:{type:String,default:null},subTitleTag:{type:String,default:"h6"},overlay:{type:Boolean,default:!1}}),CardBody={functional:!0,props:props$11,render:function(t,e){var n=e.props,i=e.data,r=e.slots,o=[];return n.title&&o.push(t(n.titleTag,{staticClass:"card-title",domProps:{innerHTML:n.title}})),n.subTitle&&o.push(t(n.subTitleTag,{staticClass:"card-subtitle mb-2 text-muted",domProps:{innerHTML:n.subTitle}})),o.push(r().default),t(n.bodyTag,lib_common(i,{staticClass:"card-body",class:(s={"card-img-overlay":n.overlay},s["bg-"+n.bodyBgVariant]=Boolean(n.bodyBgVariant),s["border-"+n.bodyBorderVariant]=Boolean(n.bodyBorderVariant),s["text-"+n.bodyTextVariant]=Boolean(n.bodyTextVariant),s)}),o);var s}},props$12=assign({},copyProps(cardMixin.props,prefixPropName.bind(null,"header")),{header:{type:String,default:null},headerClass:{type:[String,Object,Array],default:null}}),CardHeader={functional:!0,props:props$12,render:function(t,e){var n=e.props,i=e.data,r=e.slots;return t(n.headerTag,lib_common(i,{staticClass:"card-header",class:[n.headerClass,(o={},o["bg-"+n.headerBgVariant]=Boolean(n.headerBgVariant),o["border-"+n.headerBorderVariant]=Boolean(n.headerBorderVariant),o["text-"+n.headerTextVariant]=Boolean(n.headerTextVariant),o)]}),r().default||[t("div",{domProps:{innerHTML:n.header}})]);var o}},props$13=assign({},copyProps(cardMixin.props,prefixPropName.bind(null,"footer")),{footer:{type:String,default:null},footerClass:{type:[String,Object,Array],default:null}}),CardFooter={functional:!0,props:props$13,render:function(t,e){var n=e.props,i=e.data,r=e.slots;return t(n.footerTag,lib_common(i,{staticClass:"card-footer",class:[n.footerClass,(o={},o["bg-"+n.footerBgVariant]=Boolean(n.footerBgVariant),o["border-"+n.footerBorderVariant]=Boolean(n.footerBorderVariant),o["text-"+n.footerTextVariant]=Boolean(n.footerTextVariant),o)]}),r().default||[t("div",{domProps:{innerHTML:n.footer}})]);var o}},props$14={src:{type:String,default:null,required:!0},alt:{type:String,default:null},top:{type:Boolean,default:!1},bottom:{type:Boolean,default:!1},fluid:{type:Boolean,default:!1}},CardImg={functional:!0,props:props$14,render:function(t,e){var n=e.props,i=e.data,r="card-img";return n.top?r+="-top":n.bottom&&(r+="-bottom"),t("img",lib_common(i,{staticClass:r,class:{"img-fluid":n.fluid},attrs:{src:n.src,alt:n.alt}}))}},cardImgProps=copyProps(props$14,prefixPropName.bind(null,"img"));cardImgProps.imgSrc.required=!1;var props$9=assign({},props$11,props$12,props$13,cardImgProps,copyProps(cardMixin.props),{align:{type:String,default:null},noBody:{type:Boolean,default:!1}}),card={functional:!0,props:props$9,render:function(t,e){var n=e.props,i=e.data,r=e.slots,o=[],s=n.imgSrc?t(CardImg,{props:pluckProps(cardImgProps,n,unPrefixPropName.bind(null,"img"))}):null;return s&&(!n.imgTop&&n.imgBottom||o.push(s)),(n.header||r().header)&&o.push(t(CardHeader,{props:pluckProps(props$12,n)},r().header)),n.noBody?o.push(r().default):o.push(t(CardBody,{props:pluckProps(props$11,n)},r().default)),(n.footer||r().footer)&&o.push(t(CardFooter,{props:pluckProps(props$13,n)},r().footer)),s&&n.imgBottom&&o.push(s),t(n.tag,lib_common(i,{staticClass:"card",class:(a={},a["text-"+n.align]=Boolean(n.align),a["bg-"+n.bgVariant]=Boolean(n.bgVariant),a["border-"+n.borderVariant]=Boolean(n.borderVariant),a["text-"+n.textVariant]=Boolean(n.textVariant),a)}),o);var a}},props$15={tag:{type:String,default:"div"},deck:{type:Boolean,default:!1},columns:{type:Boolean,default:!1}},cardGroup={functional:!0,props:props$15,render:function(t,e){var n=e.props,i=e.data,r=e.children,o="card-group";return n.columns&&(o="card-columns"),n.deck&&(o="card-deck"),t(n.tag,lib_common(i,{staticClass:o}),r)}},DIRECTION={next:{dirClass:"carousel-item-left",overlayClass:"carousel-item-next"},prev:{dirClass:"carousel-item-right",overlayClass:"carousel-item-prev"}},TRANS_DURATION=650,TransitionEndEvents={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend oTransitionEnd",transition:"transitionend"},carousel={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"carousel slide",style:{background:t.background},attrs:{role:"region",id:t.safeId(),"aria-busy":t.isSliding?"true":"false"},on:{mouseenter:t.pause,mouseleave:t.start,focusin:t.pause,focusout:t.restart,keydown:[function(e){return"button"in e||!t._k(e.keyCode,"left",37)?"button"in e&&0!==e.button?null:(e.stopPropagation(),e.preventDefault(),void t.prev(e)):null},function(e){return"button"in e||!t._k(e.keyCode,"right",39)?"button"in e&&2!==e.button?null:(e.stopPropagation(),e.preventDefault(),void t.next(e)):null}]}},[n("div",{ref:"inner",staticClass:"carousel-inner",attrs:{role:"list",id:t.safeId("__BV_inner_")}},[t._t("default")],2),t.controls?[n("a",{staticClass:"carousel-control-prev",attrs:{href:"#",role:"button","aria-controls":t.safeId("__BV_inner_")},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.prev(e)},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;e.stopPropagation(),e.preventDefault(),t.prev(e)},function(e){if(!("button"in e)&&t._k(e.keyCode,"space",32))return null;e.stopPropagation(),e.preventDefault(),t.prev(e)}]}},[n("span",{staticClass:"carousel-control-prev-icon",attrs:{"aria-hidden":"true"}}),t._v(" "),n("span",{staticClass:"sr-only"},[t._v(t._s(t.labelPrev))])]),n("a",{staticClass:"carousel-control-next",attrs:{href:"#",role:"button","aria-controls":t.safeId("__BV_inner_")},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.next(e)},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;e.stopPropagation(),e.preventDefault(),t.next(e)},function(e){if(!("button"in e)&&t._k(e.keyCode,"space",32))return null;e.stopPropagation(),e.preventDefault(),t.next(e)}]}},[n("span",{staticClass:"carousel-control-next-icon",attrs:{"aria-hidden":"true"}}),t._v(" "),n("span",{staticClass:"sr-only"},[t._v(t._s(t.labelNext))])])]:t._e(),n("ol",{directives:[{name:"show",rawName:"v-show",value:t.indicators,expression:"indicators"}],staticClass:"carousel-indicators",attrs:{role:"group",id:t.indicators?t.safeId("__BV_indicators_"):null,"aria-hidden":t.indicators?"false":"true","aria-label":t.indicators&&t.labelIndicators?t.labelIndicators:null,"aria-owns":t.indicators?t.safeId("__BV_inner_"):null}},t._l(t.slides.length,function(e){return n("li",{key:"slide_"+e,class:{active:e-1===t.index},attrs:{role:"button",id:t.safeId("__BV_indicator_"+e+"_"),tabindex:t.indicators?"0":"-1","aria-current":e-1===t.index?"true":"false","aria-label":t.labelGotoSlide+" "+e,"aria-describedby":t.slides[e-1].id||null,"aria-controls":t.safeId("__BV_inner_")},on:{click:function(n){t.setSlide(e-1)},keydown:[function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13))return null;n.stopPropagation(),n.preventDefault(),t.setSlide(e-1)},function(n){if(!("button"in n)&&t._k(n.keyCode,"space",32))return null;n.stopPropagation(),n.preventDefault(),t.setSlide(e-1)}]}})}))],2)},staticRenderFns:[],mixins:[idMixin],data:function(){return{index:this.value||0,isSliding:!1,intervalId:null,transitionEndEvent:null,slides:[]}},props:{labelPrev:{type:String,default:"Previous Slide"},labelNext:{type:String,default:"Next Slide"},labelGotoSlide:{type:String,default:"Goto Slide"},labelIndicators:{type:String,default:"Select a slide to display"},interval:{type:Number,default:5e3},indicators:{type:Boolean,default:!1},controls:{type:Boolean,default:!1},imgWidth:{type:[Number,String]},imgHeight:{type:[Number,String]},background:{type:String},value:{type:Number,default:0}},computed:{isCycling:function(){return Boolean(this.intervalId)}},methods:{setSlide:function(t){var e=this;if("undefined"==typeof document||!document.visibilityState||!document.hidden){var n=this.slides.length;0!==n&&(this.isSliding?this.$once("sliding-end",function(){return e.setSlide(t)}):(t=Math.floor(t),this.index=t>=n?0:t>=0?t:n-1))}},prev:function(){this.setSlide(this.index-1)},next:function(){this.setSlide(this.index+1)},pause:function(){this.isCycling&&(clearInterval(this.intervalId),this.intervalId=null,this.slides[this.index].tabIndex=0)},start:function(){var t=this;Boolean(this.interval)&&!this.isCycling&&(this.slides.forEach(function(t){t.tabIndex=-1}),this.intervalId=setInterval(function(){t.next()},Math.max(1e3,this.interval)))},restart:function(t){t.relatedTarget&&this.$el.contains(t.relatedTarget)||this.start()},updateSlides:function(){var t=this;this.pause(),this.slides=from(this.$refs.inner.querySelectorAll(".carousel-item"));var e=this.slides.length,n=Math.max(0,Math.min(Math.floor(this.index),e-1));this.slides.forEach(function(i,r){var o=r+1,s=t.safeId("__BV_indicator_"+o+"_");i.classList[r===n?"add":"remove"]("active"),i.setAttribute("aria-current",r===n?"true":"false"),i.setAttribute("aria-posinset",String(o)),i.setAttribute("aria-setsize",String(e)),i.tabIndex=-1,s&&i.setAttribute("aria-controlledby",s)}),this.setSlide(n),this.start()}},watch:{value:function(t,e){t!==e&&this.setSlide(t)},interval:function(t,e){t!==e&&(Boolean(t)?(this.pause(),this.start()):this.pause())},index:function(t,e){var n=this;if(t!==e&&!this.isSliding){var i=t>e?DIRECTION.next:DIRECTION.prev;0===e&&t===this.slides.length-1?i=DIRECTION.prev:e===this.slides.length-1&&0===t&&(i=DIRECTION.next);var r=this.slides[e],o=this.slides[t];if(r&&o){this.isSliding=!0,this.$emit("sliding-start",t),this.$emit("input",this.index),o.classList.add(i.overlayClass),r.classList.add(i.dirClass),o.classList.add(i.dirClass);var s=!1,a=function(e){s||(s=!0,n.transitionEndEvent&&n.transitionEndEvent.split(/\s+/).forEach(function(t){r.removeEventListener(t,a)}),n._animationTimeout=null,o.classList.remove(i.dirClass),o.classList.remove(i.overlayClass),o.classList.add("active"),r.classList.remove("active"),r.classList.remove(i.dirClass),r.classList.remove(i.overlayClass),r.setAttribute("aria-current","false"),o.setAttribute("aria-current","true"),r.setAttribute("aria-hidden","true"),o.setAttribute("aria-hidden","false"),r.tabIndex=-1,o.tabIndex=-1,n.isCycling||(o.tabIndex=0,n.$nextTick(function(){o.focus()})),n.isSliding=!1,n.$nextTick(function(){return n.$emit("sliding-end",t)}))};this.transitionEndEvent&&this.transitionEndEvent.split(/\s+/).forEach(function(t){r.addEventListener(t,a)}),this._animationTimeout=setTimeout(a,TRANS_DURATION)}}}},created:function(){this._animationTimeout=null},mounted:function(){this.transitionEndEvent=getTransisionEndEvent(this.$el)||null,this.updateSlides(),observeDOM(this.$refs.inner,this.updateSlides.bind(this),{subtree:!1,childList:!0,attributes:!0,attributeFilter:["id"]})},destroyed:function(){clearInterval(this.intervalId),clearTimeout(this._animationTimeout),this._animationTimeout=null}},BLANK_TEMPLATE='<svg width="%{w}" height="%{h}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %{w} %{h}" preserveAspectRatio="none"><rect width="100%" height="100%" style="fill:%{f};"></rect></svg>',props$16={src:{type:String,default:null},alt:{type:String,default:null},width:{type:[Number,String],default:null},height:{type:[Number,String],default:null},block:{type:Boolean,default:!1},fluid:{type:Boolean,default:!1},fluidGrow:{type:Boolean,default:!1},rounded:{type:[Boolean,String],default:!1},thumbnail:{type:Boolean,default:!1},left:{type:Boolean,default:!1},right:{type:Boolean,default:!1},center:{type:Boolean,default:!1},blank:{type:Boolean,default:!1},blankColor:{type:String,default:"transparent"}},bImg={functional:!0,props:props$16,render:function(t,e){var n=e.props,i=e.data,r=n.src,o=Boolean(parseInt(n.width,10))?parseInt(n.width,10):null,s=Boolean(parseInt(n.height,10))?parseInt(n.height,10):null,a=null,l=n.block;return n.blank&&(!s&&Boolean(o)?s=o:!o&&Boolean(s)&&(o=s),o||s||(o=1,s=1),r=makeBlankImgSrc(o,s,n.blankColor||"transparent")),n.left?a="float-left":n.right?a="float-right":n.center&&(a="mx-auto",l=!0),t("img",lib_common(i,{attrs:{src:r,alt:n.alt,width:o?String(o):null,height:s?String(s):null},class:(u={"img-thumbnail":n.thumbnail,"img-fluid":n.fluid||n.fluidGrow,"w-100":n.fluidGrow,rounded:""===n.rounded||!0===n.rounded,"d-block":l},u["rounded-"+n.rounded]="string"==typeof n.rounded&&""!==n.rounded,u[a]=Boolean(a),u)}));var u}},carouselSlide={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"carousel-item",style:{background:t.background},attrs:{role:"listitem",id:t.safeId()}},[t._t("img",[t.imgSrc||t.imgBlank?n("b-img",{attrs:{"fluid-grow":"",block:"",blank:t.imgBlank,"blank-color":t.imgBlankColor,src:t.imgSrc,width:t.computedWidth,height:t.computedHeight,alt:t.imgAlt}}):t._e()]),n(t.contentTag,{tag:"div",class:t.contentClasses},[t.caption?n(t.captionTag,{tag:"h3",domProps:{innerHTML:t._s(t.caption)}}):t._e(),t.text?n(t.textTag,{tag:"p",domProps:{innerHTML:t._s(t.text)}}):t._e(),t._t("default")],2)],2)},staticRenderFns:[],components:{bImg:bImg},mixins:[idMixin],props:{imgSrc:{type:String,default:function(){return this&&this.src?(warn("b-carousel-slide: prop 'src' has been deprecated. Use 'img-src' instead"),this.src):null}},src:{type:String},imgAlt:{type:String},imgWidth:{type:[Number,String]},imgHeight:{type:[Number,String]},imgBlank:{type:Boolean,default:!1},imgBlankColor:{type:String,default:"transparent"},contentVisibleUp:{type:String},contentTag:{type:String,default:"div"},caption:{type:String},captionTag:{type:String,default:"h3"},text:{type:String},textTag:{type:String,default:"p"},background:{type:String}},computed:{contentClasses:function(){return["carousel-caption",this.contentVisibleUp?"d-none":"",this.contentVisibleUp?"d-"+this.contentVisibleUp+"-block":""]},computedWidth:function(){return this.imgWidth||this.$parent.imgWidth},computedHeight:function(){return this.imgHeight||this.$parent.imgHeight}}},computeBkPtClass=memoize(function(t,e,n){var i=t;return e&&(i+="-"+e),!0===n?i.toLowerCase():(i+="-"+n).toLowerCase()}),BREAKPOINTS=["sm","md","lg","xl"],breakpointCol=BREAKPOINTS.reduce(function(t,e){return t[e]=boolStrNum(),t},create(null)),breakpointOffset=BREAKPOINTS.reduce(function(t,e){return t[suffixPropName(e,"offset")]=strNum(),t},create(null)),breakpointOrder=BREAKPOINTS.reduce(function(t,e){return t[suffixPropName(e,"order")]=strNum(),t},create(null)),breakpointPropMap=assign(create(null),{col:keys(breakpointCol),offset:keys(breakpointOffset),order:keys(breakpointOrder)}),props$17=assign({},breakpointCol,breakpointOffset,breakpointOrder,{tag:{type:String,default:"div"},col:{type:Boolean,default:!1},cols:strNum(),offset:strNum(),order:strNum(),alignSelf:{type:String,default:null,validator:function(t){return arrayIncludes(["auto","start","end","center","baseline","stretch"],t)}}}),col={functional:!0,props:props$17,render:function(t,e){var n=e.props,i=e.data,r=e.children,o=[];for(var s in breakpointPropMap)for(var a=breakpointPropMap[s],l=0;l<a.length;l++)n[a[l]]&&o.push(computeBkPtClass(s,a[l].replace(s,""),n[a[l]]));o.push((u={col:n.col||0===o.length&&!n.cols},u["col-"+n.cols]=n.cols,u["offset-"+n.offset]=n.offset,u["order-"+n.order]=n.order,u["align-self-"+n.alignSelf]=n.alignSelf,u));var u;return t(n.tag,lib_common(i,{class:o}),r)}},collapse={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{"enter-class":"","enter-active-class":"collapsing","enter-to-class":"","leave-class":"","leave-active-class":"collapsing","leave-to-class":""},on:{enter:t.onEnter,"after-enter":t.onAfterEnter,leave:t.onLeave,"after-leave":t.onAfterLeave}},[n(t.tag,{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],tag:"component",class:t.classObject,attrs:{id:t.id||null},on:{click:t.clickHandler}},[t._t("default")],2)],1)},staticRenderFns:[],mixins:[listenOnRootMixin],data:function(){return{show:this.visible,transitioning:!1}},model:{prop:"visible",event:"input"},props:{id:{type:String,required:!0},isNav:{type:Boolean,default:!1},accordion:{type:String,default:null},visible:{type:Boolean,default:!1},tag:{type:String,default:"div"}},watch:{visible:function(t){t!==this.show&&(this.show=t)},show:function(t,e){t!==e&&this.emitState()}},computed:{classObject:function(){return{"navbar-collapse":this.isNav,collapse:!this.transitioning,show:this.show&&!this.transitioning}}},methods:{toggle:function(){this.show=!this.show},onEnter:function(t){t.style.height=0,this.reflow(t),t.style.height=t.scrollHeight+"px",this.transitioning=!0,this.$emit("show")},onAfterEnter:function(t){t.style.height=null,this.transitioning=!1,this.$emit("shown")},onLeave:function(t){t.style.height="auto",t.style.display="block",t.style.height=t.getBoundingClientRect().height+"px",this.reflow(t),this.transitioning=!0,t.style.height=0,this.$emit("hide")},onAfterLeave:function(t){t.style.height=null,this.transitioning=!1,this.$emit("hidden")},reflow:function(t){t.offsetHeight},emitState:function(){this.$emit("input",this.show),this.$root.$emit("collapse::toggle::state",this.id,this.show),this.accordion&&this.show&&this.$root.$emit("accordion::toggle",this.id,this.accordion)},clickHandler:function(t){var e=t.target;this.isNav&&e&&"block"===getComputedStyle(this.$el).display&&(e.classList.contains("nav-link")||e.classList.contains("dropdown-item"))&&(this.show=!1)},handleToggleEvt:function(t){t===this.id&&this.toggle()},handleAccordionEvt:function(t,e){this.accordion&&e===this.accordion&&(t===this.id?this.show||this.toggle():this.show&&this.toggle())},handleResize:function(){this.show="block"===getComputedStyle(this.$el).display}},created:function(){this.listenOnRoot("collapse::toggle",this.handleToggleEvt),this.listenOnRoot("accordion::toggle",this.handleAccordionEvt)},mounted:function(){this.isNav&&"undefined"!=typeof document&&(window.addEventListener("resize",this.handleResize,!1),window.addEventListener("orientationchange",this.handleResize,!1),this.handleResize()),this.emitState()},destroyed:function(){this.isNav&&"undefined"!=typeof document&&(window.removeEventListener("resize",this.handleResize,!1),window.removeEventListener("orientationchange",this.handleResize,!1))}},props$18={tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},Container={functional:!0,props:props$18,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(n.tag,lib_common(i,{class:{container:!n.fluid,"container-fluid":n.fluid}}),r)}},dropdown={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.dropdownClasses,attrs:{id:t.safeId()}},[t.split?n("b-button",{ref:"button",attrs:{id:t.safeId("_BV_button_"),"aria-haspopup":t.split?"true":null,"aria-expanded":t.split?t.visible?"true":"false":null,variant:t.variant,size:t.size,disabled:t.disabled},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.click(e)}}},[t._t("button-content",[t._t("text",[t._v(t._s(t.text))])])],2):t._e(),n("b-button",{ref:"toggle",class:["dropdown-toggle",{"dropdown-toggle-split":t.split}],attrs:{id:t.safeId("_BV_toggle_"),"aria-haspopup":t.split?null:"true","aria-expanded":t.split?null:t.visible?"true":"false",variant:t.variant,size:t.size,disabled:t.disabled},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.toggle(e)}}},[t.split?n("span",{staticClass:"sr-only"},[t._v(t._s(t.toggleText))]):t._t("button-content",[t._t("text",[t._v(t._s(t.text))])])],2),n("div",{ref:"menu",class:t.menuClasses,attrs:{role:t.role,"aria-labelledby":t.safeId(t.split?"_BV_toggle_":"_BV_button_")},on:{mouseover:t.onMouseOver,keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27))return null;t.onEsc(e)},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"tab",9))return null;t.onTab(e)},function(e){if(!("button"in e)&&t._k(e.keyCode,"up",38))return null;t.focusNext(e,!0)},function(e){if(!("button"in e)&&t._k(e.keyCode,"down",40))return null;t.focusNext(e,!1)}]}},[t._t("default")],2)],1)},staticRenderFns:[],mixins:[idMixin,dropdownMixin],components:{bButton:bBtn},props:{split:{type:Boolean,default:!1},toggleText:{type:String,default:"Toggle Dropdown"},size:{type:String,default:null},variant:{type:String,default:null},role:{type:String,default:"menu"}},computed:{dropdownClasses:function(){return["btn-group","b-dropdown","dropdown",this.dropup?"dropup":"",this.visible?"show":""]},menuClasses:function(){return["dropdown-menu",this.right?"dropdown-menu-right":"",this.visible?"show":""]}}},props$19=propsFactory(),dropdownItem={functional:!0,props:props$19,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(bLink,lib_common(i,{props:n,staticClass:"dropdown-item",attrs:{role:"menuitem"}}),r)}},props$20={disabled:{type:Boolean,default:!1}},dropdownItemButton={functional:!0,props:props$20,render:function(t,e){var n=e.props,i=e.data,r=e.parent,o=e.children;return t("button",lib_common(i,{props:n,staticClass:"dropdown-item",attrs:{role:"menuitem",type:"button",disabled:n.disabled},on:{click:function(t){r.$root.$emit("clicked::link",t)}}}),o)}},props$21={tag:{type:String,default:"div"}},dropdownDivider={functional:!0,props:props$21,render:function(t,e){var n=e.props,i=e.data;return t(n.tag,lib_common(i,{staticClass:"dropdown-divider",attrs:{role:"separator"}}))}},props$22={id:{type:String,default:null},tag:{type:String,default:"h6"}},dropdownHeader={functional:!0,props:props$22,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(n.tag,lib_common(i,{staticClass:"dropdown-header",attrs:{id:n.id||null}}),r)}},props$23={id:{type:String,default:null},inline:{type:Boolean,default:!1},novalidate:{type:Boolean,default:!1},validated:{type:Boolean,default:!1}},Form={functional:!0,props:props$23,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t("form",lib_common(i,{class:{"form-inline":n.inline,"was-validated":n.validated},attrs:{id:n.id,novalidate:n.novalidate}}),r)}},props$24={tag:{type:String,default:"div"}},bFormRow={functional:!0,props:props$24,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(n.tag,lib_common(i,{staticClass:"form-row"}),r)}},props$25={id:{type:String,default:null},tag:{type:String,default:"small"},textVariant:{type:String,default:"muted"},inline:{type:Boolean,default:!1}},bFormText={functional:!0,props:props$25,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(n.tag,lib_common(i,{class:(o={"form-text":!Boolean(n.inline)},o["text-"+n.textVariant]=Boolean(n.textVariant),o),attrs:{id:n.id}}),r);var o}},props$26={id:{type:String,default:null},tag:{type:String,default:"div"}},bFormFeedback={functional:!0,props:props$26,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(n.tag,lib_common(i,{staticClass:"invalid-feedback",attrs:{id:n.id}}),r)}},INPUT_SELECTOR=['[role="radiogroup"][id]',"input[id]","select[id]","textarea[id]",".form-control[id]",".form-control-plaintext[id]",".dropdown[id]",".dropup[id]"].join(","),formGroup={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-form-row",{class:t.groupClasses,attrs:{id:t.safeId(),role:"group","aria-describedby":t.describedByIds}},[t.label||t.$slots.label||t.horizontal?n("label",{class:t.labelClasses,attrs:{for:t.targetId,id:t.labelId}},[t._t("label",[n("span",{domProps:{innerHTML:t._s(t.label)}})])],2):t._e(),n("div",{ref:"content",class:t.inputLayoutClasses},[t._t("default"),n("b-form-feedback",{directives:[{name:"show",rawName:"v-show",value:t.feedback||t.$slots.feedback,expression:"feedback || $slots['feedback']"}],attrs:{id:t.feedbackId,role:"alert","aria-live":"assertive","aria-atomic":"true"}},[t._t("feedback",[n("span",{domProps:{innerHTML:t._s(t.feedback)}})])],2),t.description||t.$slots.description?n("b-form-text",{attrs:{id:t.descriptionId}},[t._t("description",[n("span",{domProps:{innerHTML:t._s(t.description)}})])],2):t._e()],2)])},staticRenderFns:[],mixins:[idMixin,formStateMixin],components:{bFormRow:bFormRow,bFormText:bFormText,bFormFeedback:bFormFeedback},data:function(){return{targetId:null}},props:{labelFor:{type:String,default:null},validated:{type:Boolean,value:!1},horizontal:{type:Boolean,default:!1},labelCols:{type:Number,default:3,validator:function(t){return t>=1&&t<=11||(warn("b-form-group: label-cols must be a value between 1 and 11"),!1)}},breakpoint:{type:String,default:"sm"},labelTextAlign:{type:String,default:null},label:{type:String,default:null},labelSrOnly:{type:Boolean,default:!1},description:{type:String,default:null},feedback:{type:String,default:null}},computed:{inputState:function(){return this.stateClass},groupClasses:function(){return["b-form-group","form-group",this.validated?"was-validated":null,this.inputState]},labelClasses:function(){return[this.labelSrOnly?"sr-only":"col-form-label",this.labelLayout,this.labelAlignClass]},labelLayout:function(){return this.labelSrOnly?null:this.horizontal?"col-"+this.breakpoint+"-"+this.labelCols:"col-12"},labelAlignClass:function(){return this.labelSrOnly?null:this.labelTextAlign?"text-"+this.labelTextAlign:null},inputLayoutClasses:function(){return[this.horizontal?"col-"+this.breakpoint+"-"+(12-this.labelCols):"col-12"]},labelId:function(){return this.label||this.$slots.label?this.safeId("_BV_label_"):null},descriptionId:function(){return this.description||this.$slots.description?this.safeId("_BV_description_"):null},feedbackId:function(){return this.feedback||this.$slots.feedback?this.safeId("_BV_feedback_"):null},describedByIds:function(){return this.id?[this.labelId,this.descriptionId,this.feedbackId].filter(function(t){return t}).join(" "):null}},methods:{updateTargetId:function(){if(this.labelFor)return this.labelFor;var t=this.$refs.content;if(!t)return null;var e=t.querySelector(INPUT_SELECTOR);this.targetId=e&&e.id?e.id:null}},mounted:function(){var t=this;this.$nextTick(function(){return t.updateTargetId()})},updated:function(){var t=this;this.$nextTick(function(){return t.updateTargetId()})}},formCheckbox={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{class:t.button?t.btnLabelClasses:t.labelClasses,attrs:{"aria-pressed":t.button?t.isChecked?"true":"false":null}},[n("input",{ref:"check",class:t.checkClasses,attrs:{type:"checkbox",id:t.safeId(),name:t.name,disabled:t.disabled,required:t.required,autocomplete:"off","aria-required":t.required?"true":null},domProps:{value:t.value,checked:t.isChecked},on:{focus:t.handleFocus,blur:t.handleFocus,change:t.handleChange}}),t._v(" "),t.custom&&!t.button?n("span",{staticClass:"custom-control-indicator",attrs:{"aria-hidden":"true"}}):t._e(),t._v(" "),n("span",{class:t.custom&&!t.button?"custom-control-description":null},[t._t("default")],2)])},staticRenderFns:[],mixins:[idMixin,formMixin,formSizeMixin,formStateMixin,formCustomMixin,formCheckBoxMixin],model:{prop:"checked",event:"change"},props:{value:{default:!0},uncheckedValue:{default:!1},checked:{default:!0},indeterminate:{type:Boolean,default:!1},button:{type:Boolean,default:!1},buttonVariant:{type:String,default:"secondary"}},computed:{labelClasses:function(){return[this.sizeFormClass,this.custom?"custom-checkbox":"",this.checkboxClass]},btnLabelClasses:function(){return["btn","btn-"+this.buttonVariant,this.sizeBtnClass,this.isChecked?"active":"",this.disabled?"disabled":""]},checkClasses:function(){return[this.custom&&!this.button?"custom-control-input":null,this.stateClass]},isChecked:function(){return isArray(this.checked)?arrayIncludes(this.checked,this.value):this.checked===this.value}},watch:{indeterminate:function(t,e){this.setIndeterminate(t)}},methods:{handleChange:function(t){var e=this,n=t.target.checked;isArray(this.checked)?this.isChecked?this.$emit("change",this.checked.filter(function(t){return t!==e.value})):this.$emit("change",this.checked.concat([this.value])):this.$emit("change",n?this.value:this.uncheckedValue),this.$emit("update:indeterminate",this.$refs.check.indeterminate)},setIndeterminate:function(t){this.$refs.check.indeterminate=t,this.$emit("update:indeterminate",this.$refs.check.indeterminate)},handleFocus:function(t){if(this.button&&t.target&&t.target.parentElement){var e=t.target.parentElement;"focus"===t.type?e.classList.add("focus"):"blur"===t.type&&e.classList.remove("focus")}}},mounted:function(){this.setIndeterminate(this.indeterminate)}},formRadio={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.buttons?t.btnGroupClasses:t.radioGroupClasses,attrs:{id:t.safeId(),role:"radiogroup",tabindex:"-1","data-toggle":t.buttons?"buttons":null,"aria-required":t.required?"true":null,"aria-invalid":t.computedAriaInvalid}},t._l(t.formOptions,function(e,i){return n("label",{key:"radio_"+i,class:t.buttons?t.btnLabelClasses(e,i):t.labelClasses,attrs:{"aria-pressed":t.buttons?e.value===t.localValue?"true":"false":null}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.localValue,expression:"localValue"}],ref:"inputs",refInFor:!0,class:t.radioClasses,attrs:{id:t.safeId("_BV_radio_"+i),type:"radio",autocomplete:"off",name:t.name,required:t.name&&t.required,disabled:e.disabled||t.disabled},domProps:{value:e.value,checked:t._q(t.localValue,e.value)},on:{focus:t.handleFocus,blur:t.handleFocus,change:function(n){t.$emit("change",t.returnObject?e:e.value)},__c:function(n){t.localValue=e.value}}}),t._v(" "),t.custom&&!t.buttons?n("span",{staticClass:"custom-control-indicator",attrs:{"aria-hidden":"true"}}):t._e(),t._v(" "),n("span",{class:t.custom&&!t.buttons?"custom-control-description":null,domProps:{innerHTML:t._s(e.text)}})])}))},staticRenderFns:[],mixins:[idMixin,formMixin,formSizeMixin,formStateMixin,formCustomMixin,formCheckBoxMixin,formOptionsMixin],data:function(){return{localValue:this.value,localState:this.state}},props:{value:{},options:{type:[Array,Object],default:null,required:!0},validated:{type:Boolean,default:!1},ariaInvalid:{type:[Boolean,String],default:!1},stacked:{type:Boolean,default:!1},buttons:{type:Boolean,default:!1},buttonVariant:{type:String,default:"secondary"}},computed:{radioGroupClasses:function(){return[this.validated?"was-validated":"",this.sizeFormClass,this.stacked?"custom-controls-stacked":""]},btnGroupClasses:function(){return["btn-group",this.validated?"was-validated":"",this.sizeBtnClass,this.stacked?"btn-group-vertical":""]},radioClasses:function(){return[this.custom&&!this.buttons?"custom-control-input":null,this.stateClass]},labelClasses:function(){return[this.checkboxClass,this.custom?"custom-radio":null]},computedAriaInvalid:function(){return!0===this.ariaInvalid||"true"===this.AriaInvalid?"true":!1===this.computedState?"true":null},inline:function(){return!this.stacked}},methods:{btnLabelClasses:function(t,e){return["btn","btn-"+this.buttonVariant,t.disabled||this.disabled?"disabled":"",t.value===this.localValue?"active":null,this.stacked&&e===this.formOptions.length-1?"":"mb-0"]},handleFocus:function(t){if(this.buttons&&t.target&&t.target.parentElement){var e=t.target.parentElement;"focus"===t.type?e.classList.add("focus"):"blur"===t.type&&e.classList.remove("focus")}}}},formInput={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("input",{class:t.inputClass,attrs:{id:t.safeId(),name:t.name,type:t.localType,disabled:t.disabled,required:t.required,readonly:t.readonly||t.plaintext,placeholder:t.placeholder,autocomplete:t.autocomplete||null,"aria-required":t.required?"true":null,"aria-invalid":t.computedAriaInvalid},domProps:{value:t.localValue},on:{input:function(e){t.onInput(e.target.value,e)},change:function(e){t.onChange(e.target.value,e)}}})},staticRenderFns:[],mixins:[idMixin,formMixin,formSizeMixin,formStateMixin],data:function(){return{localValue:this.value}},props:{value:{default:null},type:{type:String,default:"text"},ariaInvalid:{type:[Boolean,String],default:!1},readonly:{type:Boolean,default:!1},plaintext:{type:Boolean,default:!1},autocomplete:{type:String,default:null},placeholder:{type:String,default:null},formatter:{type:Function},lazyFormatter:{type:Boolean,default:!1}},computed:{localType:function(){return"radio"===this.type||"checkbox"===this.type?"text":this.type||"text"},inputClass:function(){return[this.plaintext?"form-control-plaintext":"form-control",this.sizeFormClass,this.stateClass]},computedAriaInvalid:function(){return Boolean(this.ariaInvalid)&&"false"!==this.ariaInvalid?!0===this.ariaInvalid?"true":this.ariaInvalid:!1===this.computedState?"true":null}},watch:{value:function(t,e){t!==e&&(this.localValue=t)},localValue:function(t,e){t!==e&&this.$emit("input",t)}},methods:{format:function(t,e){if(this.formatter){var n=this.formatter(t,e);if(n!==t)return n}return t},onInput:function(t,e){this.lazyFormatter||(this.localValue=this.format(t,e))},onChange:function(t,e){this.localValue=this.format(t,e),this.$emit("change",this.localValue)},focus:function(){this.disabled||this.$el.focus()}}},formTextarea={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("textarea",{directives:[{name:"model",rawName:"v-model",value:t.localValue,expression:"localValue"}],class:t.inputClass,attrs:{id:t.safeId(),name:t.name,disabled:t.disabled,placeholder:t.placeholder,required:t.required,autocomplete:t.autocomplete||null,readonly:t.readonly||t.plaintext,rows:t.rowsCount,wrap:t.wrap||null,"aria-required":t.required?"true":null,"aria-invalid":t.computedAriaInvalid},domProps:{value:t.localValue},on:{input:function(e){e.target.composing||(t.localValue=e.target.value)}}})},staticRenderFns:[],mixins:[idMixin,formMixin,formSizeMixin,formStateMixin],data:function(){return{localValue:this.value}},props:{value:{type:String,default:""},ariaInvalid:{type:[Boolean,String],default:!1},readonly:{type:Boolean,default:!1},plaintext:{type:Boolean,default:!1},autocomplete:{type:String,default:null},placeholder:{type:String,default:null},rows:{type:Number,default:null},maxRows:{type:Number,default:null},wrap:{type:String,default:"soft"}},computed:{rowsCount:function(){var t=this.rows||1,e=(this.value||"").toString().split("\n").length;return this.maxRows?Math.min(this.maxRows,Math.max(t,e)):Math.max(t,e)},inputClass:function(){return[this.plaintext?"form-control-plaintext":"form-control",this.sizeFormClass,this.stateClass]},computedAriaInvalid:function(){return Boolean(this.ariaInvalid)&&"false"!==this.ariaInvalid?!0===this.ariaInvalid?"true":this.ariaInvalid:!1===this.computedState?"true":null}},watch:{value:function(t,e){t!==e&&(this.localValue=t)},localValue:function(t,e){t!==e&&this.$emit("input",t)}},methods:{focus:function(){this.disabled||this.$el.focus()}}},formFile={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:[t.custom?"custom-file":null,t.state?"is-"+t.state:null],attrs:{id:t.safeId("_BV_file_outer_")},on:{dragover:function(e){e.stopPropagation(),e.preventDefault(),t.dragover(e)}}},[t.dragging&&t.custom?n("span",{staticClass:"drop-here",attrs:{"data-drop":t.dropLabel},on:{dragover:function(e){e.stopPropagation(),e.preventDefault(),t.dragover(e)},drop:function(e){e.stopPropagation(),e.preventDefault(),t.drop(e)},dragleave:function(e){e.stopPropagation(),e.preventDefault(),t.dragging=!1}}}):t._e(),n("input",{ref:"input",class:[t.custom?"custom-file-input":"form-control-file",t.stateClass],attrs:{type:"file",id:t.safeId(),name:t.name,disabled:t.disabled,required:t.required,capture:t.capture||null,"aria-required":t.required?"true":null,accept:t.accept||null,multiple:t.multiple,webkitdirectory:t.directory,"aria-describedby":t.custom?t.safeId("_BV_file_control_"):null},on:{change:t.onFileChange}}),t._v(" "),t.custom?n("span",{class:["custom-file-control",t.dragging?"dragging":null],attrs:{id:t.safeId("_BV_file_control_"),"data-choose":t.computedChooseLabel,"data-selected":t.selectedLabel}}):t._e()])},staticRenderFns:[],_scopeId:"data-v-c68bd5f8",mixins:[idMixin,formMixin,formStateMixin,formCustomMixin],data:function(){return{selectedFile:null,dragging:!1}},props:{accept:{type:String,default:""},capture:{type:Boolean,default:!1},placeholder:{type:String,default:null},chooseLabel:{type:String,default:null},multiple:{type:Boolean,default:!1},directory:{type:Boolean,default:!1},noTraverse:{type:Boolean,default:!1},selectedFormat:{type:String,default:":count Files"},noDrop:{type:Boolean,default:!1},dropLabel:{type:String,default:"Drop files here"}},computed:{selectedLabel:function(){return this.selectedFile&&0!==this.selectedFile.length?this.multiple?1===this.selectedFile.length?this.selectedFile[0].name:this.selectedFormat.replace(":names",this.selectedFile.map(function(t){return t.name}).join(",")).replace(":count",this.selectedFile.length):this.selectedFile.name:this.placeholder||"No file chosen"},computedChooseLabel:function(){return this.chooseLabel||(this.multiple?"Choose Files":"Choose File")}},watch:{selectedFile:function(t,e){t!==e&&(!t&&this.multiple?this.$emit("input",[]):this.$emit("input",t))}},methods:{reset:function(){try{this.$refs.input.value=""}catch(t){}this.$refs.input.type="",this.$refs.input.type="file",this.selectedFile=this.multiple?[]:null},onFileChange:function(t){var e=this;this.$emit("change",t);var n=t.dataTransfer&&t.dataTransfer.items;if(!n||this.noTraverse)this.setFiles(t.target.files||t.dataTransfer.files);else{for(var i=[],r=0;r<n.length;r++){var o=n[r].webkitGetAsEntry();o&&i.push(e.traverseFileTree(o))}Promise.all(i).then(function(t){e.setFiles(from(t))})}},setFiles:function(t){var e=this;if(t)if(this.multiple){for(var n=[],i=0;i<t.length;i++)t[i].type.match(e.accept)&&n.push(t[i]);this.selectedFile=n}else this.selectedFile=t[0];else this.selectedFile=null},dragover:function(t){!this.noDrop&&this.custom&&(this.dragging=!0,t.dataTransfer.dropEffect="copy")},drop:function(t){this.noDrop||(this.dragging=!1,t.dataTransfer.files&&t.dataTransfer.files.length>0&&this.onFileChange(t))},traverseFileTree:function(t,e){var n=this;return new Promise(function(i){e=e||"",t.isFile?t.file(function(t){t.$path=e,i(t)}):t.isDirectory&&t.createReader().readEntries(function(r){for(var o=[],s=0;s<r.length;s++)o.push(n.traverseFileTree(r[s],e+t.name+"/"));Promise.all(o).then(function(t){i(from(t))})})})}}},formSelect={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("select",{directives:[{name:"model",rawName:"v-model",value:t.localValue,expression:"localValue"}],ref:"input",class:t.inputClass,attrs:{name:t.name,id:t.safeId(),multiple:t.multiple||null,size:t.multiple||t.selectSize>1?t.selectSize:null,disabled:t.disabled,required:t.required,"aria-required":t.required?"true":null,"aria-invalid":t.computedAriaInvalid},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.localValue=e.target.multiple?n:n[0]}}},[t._l(t.formOptions,function(e){return n("option",{key:e.value||e.text,attrs:{disabled:e.disabled},domProps:{value:e.value,innerHTML:t._s(e.text)}})}),t._t("default")],2)},staticRenderFns:[],mixins:[idMixin,formMixin,formSizeMixin,formStateMixin,formCustomMixin,formOptionsMixin],data:function(){return{localValue:this.multiple?this.value||[]:this.value}},props:{value:{},options:{type:[Array,Object],required:!0},multiple:{type:Boolean,default:!1},selectSize:{type:Number,default:0},ariaInvalid:{type:[Boolean,String],default:!1}},computed:{inputClass:function(){return["form-control",this.stateClass,this.sizeFormClass,this.plain||this.multiple||this.selectSize>1?null:"custom-select"]},computedAriaInvalid:function(){return!0===this.ariaInvalid||"true"===this.ariaInvalid?"true":!1===this.computedState?"true":null}}},THROTTLE=100,imgLazy={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("b-img",{attrs:{src:t.computedSrc,blank:t.computedBlank,"blank-color":t.blankColor,width:t.computedWidth,height:t.computedHeight,fluid:t.fluid,"fluid-grow":t.fluidGrow,block:t.block,thumbnail:t.thumbnail,rounded:t.rounded,left:t.left,right:t.right,center:t.center}})},staticRenderFns:[],components:{bImg:bImg},data:function(){return{isShown:!1,scrollTimeout:null}},props:{src:{type:String,default:null,rqeuired:!0},width:{type:[Number,String],default:null},height:{type:[Number,String],default:null},blankSrc:{type:String,default:null},blankColor:{type:String,default:"transparent"},blankWidth:{type:[Number,String],default:null},blankHeight:{type:[Number,String],default:null},fluid:{type:Boolean,default:!1},fluidGrow:{type:Boolean,default:!1},block:{type:Boolean,default:!1},thumbnail:{type:Boolean,default:!1},rounded:{type:[Boolean,String],default:!1},left:{type:Boolean,default:!1},right:{type:Boolean,default:!1},center:{type:Boolean,default:!1},offset:{type:[Number,String],default:360},throttle:{type:[Number,String],default:THROTTLE}},computed:{computedSrc:function(){return!this.blankSrc||this.isShown?this.src:this.blankSrc},computedBlank:function(){return!this.isShown&&!this.blankSrc},computedWidth:function(){return this.isShown?this.width:this.blankWidth||this.width},computedHeight:function(){return this.isShown?this.height:this.blankHeight||this.height}},mounted:function(){this.setListeners(!0),this.checkView()},beforeDdestroy:function(){this.setListeners(flase)},methods:{setListeners:function(t){var e=window;t?(e.addEventListener("scroll",this.onScroll),e.addEventListener("resize",this.onScroll),e.addEventListener("orientationchange",this.onScroll)):(e.removeEventListener("scroll",this.onScroll),e.removeEventListener("resize",this.onScroll),e.removeEventListener("orientationchange",this.onScroll),clearTimeout(this.scrollTimer),this.scrollTimout=null)},checkView:function(){if(null!==this.$el.offsetParent&&(this.$el.offsetWidth>0||this.$el.offsetHeight>0)){var t=parseInt(this.offset,10)||0,e={left:0-t,top:0-t,bottom:document.documentElement.clientHeight+t,right:document.documentElement.clientWidth+t},n=this.$el.getBoundingClientRect();n.right>=e.left&&n.bottom>=e.top&&n.left<=e.right&&n.top<=e.bottom&&(this.isShown=!0,this.setListeners(!1))}},onScroll:function(){this.isShown?this.setListeners(!1):(clearTimeout(this.scrollTimeout),this.scrollTimeout=setTimeout(this.checkView,parseInt(this.throttle,10)||THROTTLE))}}},props$27={fluid:{type:Boolean,default:!1},containerFluid:{type:Boolean,default:!1},header:{type:String,default:null},headerTag:{type:String,default:"h1"},headerLevel:{type:Number,default:3},lead:{type:String,default:null},leadTag:{type:String,default:"p"},tag:{type:String,default:"div"},bgVariant:{type:String,default:null},borderVariant:{type:String,default:null},textVariant:{type:String,default:null}},jumbotron={functional:!0,props:props$27,render:function(t,e){var n=e.props,i=e.data,r=e.slots,o=[];if(n.header||r().header){o.push(t(n.headerTag,{class:(s={},s["display-"+n.headerLevel]=Boolean(n.headerLevel),s)},r().header||n.header));var s}return(n.lead||r().lead)&&o.push(t(n.leadTag,{staticClass:"lead"},r().lead||n.lead)),r().default&&o.push(r().default),n.fluid&&(o=[t(Container,{props:{fluid:n.containerFluid}},o)]),t(n.tag,lib_common(i,{staticClass:"jumbotron",class:(a={"jumbotron-fluid":n.fluid,border:Boolean(n.borderVariant)},a["text-"+n.textVariant]=Boolean(n.textVariant),a["bg-"+n.bgVariant]=Boolean(n.bgVariant),a["border-"+n.borderVariant]=Boolean(n.borderVariant),a)}),o);var a}},props$28={tag:{type:String,default:"div"},flush:{type:Boolean,default:!1}},listGroup={functional:!0,props:props$28,render:function(t,e){var n=e.props,i=e.data,r=e.children,o={staticClass:"list-group",class:{"list-group-flush":n.flush}};return t(n.tag,lib_common(i,o),r)}},actionTags=["a","router-link","button","b-link"],linkProps$1=propsFactory();delete linkProps$1.href.default,delete linkProps$1.to.default;var props$29=assign(linkProps$1,{tag:{type:String,default:"div"},action:{type:Boolean,default:null},variant:{type:String,default:null}}),listGroupItem={functional:!0,props:props$29,render:function(t,e){var n,i=e.props,r=e.data,o=e.children,s=i.href||i.to?bLink:i.tag,a={staticClass:"list-group-item",class:(n={"list-group-flush":i.flush,active:i.active,disabled:i.disabled,"list-group-item-action":Boolean(i.href||i.to||i.action||arrayIncludes(actionTags,i.tag))},n["list-group-item-"+i.variant]=Boolean(i.variant),n),props:pluckProps(linkProps$1,i)};return t(s,lib_common(r,a),o)}},props$31={tag:{type:String,default:"div"}},MediaBody={functional:!0,props:props$31,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(n.tag,lib_common(i,{staticClass:"media-body"}),r)}},props$32={tag:{type:String,default:"div"},verticalAlign:{type:String,default:"top"}},MediaAside={functional:!0,props:props$32,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(n.tag,lib_common(i,{staticClass:"d-flex",class:(o={},o["align-self-"+n.verticalAlign]=n.verticalAlign,o)}),r);var o}},props$30={tag:{type:String,default:"div"},rightAlign:{type:Boolean,default:!1},verticalAlign:{type:String,default:"top"},noBody:{type:Boolean,default:!1}},media={functional:!0,props:props$30,render:function(t,e){var n=e.props,i=e.data,r=e.slots,o=e.children,s=n.noBody?o:[];return n.noBody||(r().aside&&!n.rightAlign&&s.push(t(MediaAside,{staticClass:"mr-3",props:{verticalAlign:n.verticalAlign}},r().aside)),s.push(t(MediaBody,r().default)),r().aside&&n.rightAlign&&s.push(t(MediaAside,{staticClass:"ml-3",props:{verticalAlign:n.verticalAlign}},r().aside))),t(n.tag,lib_common(i,{staticClass:"media"}),s)}},FOCUS_SELECTOR=["button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","a:not([disabled]):not(.disabled)","[tabindex]:not([disabled]):not(.disabled)"].join(","),modal={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("transition-group",{attrs:{"enter-class":"hidden","enter-to-class":"","enter-active-class":"","leave-class":"show","leave-active-class":"","leave-to-class":"hidden"},on:{"after-enter":t.focusFirst}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.is_visible,expression:"is_visible"}],key:"modal",ref:"modal",class:["modal",{fade:!t.noFade,show:t.is_visible}],attrs:{id:t.id||null,role:"dialog"},on:{click:function(e){t.onClickOut()},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27))return null;t.onEsc()}}},[n("div",{class:["modal-dialog","modal-"+t.size]},[n("div",{ref:"content",staticClass:"modal-content",attrs:{tabindex:"-1",role:"document","aria-labelledby":t.hideHeader||!t.id?null:t.id+"__BV_header_","aria-describedby":t.id?t.id+"__BV_body_":null},on:{click:function(t){t.stopPropagation()}}},[t.hideHeader?t._e():n("header",{ref:"header",staticClass:"modal-header",attrs:{id:t.id?t.id+"__BV_header_":null}},[t._t("modal-header",[n(t.titleTag,{tag:"h5",staticClass:"modal-title"},[t._t("modal-title",[t._v(t._s(t.title))])],2),t.hideHeaderClose?t._e():n("button",{staticClass:"close",attrs:{type:"button","aria-label":t.headerCloseLabel},on:{click:t.hide}},[n("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])],2),n("div",{ref:"body",staticClass:"modal-body",attrs:{id:t.id?t.id+"__BV_body_":null}},[t._t("default")],2),t.hideFooter?t._e():n("footer",{ref:"footer",staticClass:"modal-footer"},[t._t("modal-footer",[t.okOnly?t._e():n("b-btn",{attrs:{variant:"secondary",size:t.buttonSize},on:{click:function(e){t.hide(!1)}}},[t._t("modal-cancel",[t._v(t._s(t.closeTitle))])],2),n("b-btn",{attrs:{variant:"primary",size:t.buttonSize,disabled:t.okDisabled},on:{click:function(e){t.hide(!0)}}},[t._t("modal-ok",[t._v(t._s(t.okTitle))])],2)])],2)])])]),t.is_visible?n("div",{key:"modal-backdrop",class:["modal-backdrop",{fade:!t.noFade,show:t.is_visible}]}):t._e()])],1)},staticRenderFns:[],_scopeId:"data-v-1b4cbb68",mixins:[listenOnRootMixin],components:{bBtn:bBtn},data:function(){return{is_visible:!1,return_focus:this.returnFocus||null}},model:{prop:"visible",event:"change"},computed:{body:function(){if("undefined"!=typeof document)return document.querySelector("body")}},watch:{visible:function(t,e){t!==e&&(t?this.show():this.hide())}},props:{id:{type:String,default:null},title:{type:String,default:""},titleTag:{type:String,default:"h5"},size:{type:String,default:"md"},buttonSize:{type:String,default:""},noFade:{type:Boolean,default:!1},noCloseOnBackdrop:{type:Boolean,default:!1},noCloseOnEsc:{type:Boolean,default:!1},noAutoFocus:{type:Boolean,default:!1},noEnforceFocus:{type:Boolean,default:!1},hideHeader:{type:Boolean,default:!1},hideFooter:{type:Boolean,default:!1},hideHeaderClose:{type:Boolean,default:!1},okOnly:{type:Boolean,default:!1},okDisabled:{type:Boolean,default:!1},visible:{type:Boolean,default:!1},returnFocus:{default:null},headerCloseLabel:{type:String,default:"Close"},closeTitle:{type:String,default:"Close"},okTitle:{type:String,default:"OK"}},methods:{show:function(){this.is_visible||(this.$emit("show"),this.is_visible=!0,this.$root.$emit("shown::modal",this.id),this.body.classList.add("modal-open"),this.$emit("shown"),this.$emit("change",!0),"undefined"!=typeof document&&(document.removeEventListener("focusin",this.enforceFocus,!1),document.addEventListener("focusin",this.enforceFocus,!1)))},hide:function(t){if(this.is_visible){var e=!1,n={isOK:t,cancel:function(){e=!0}};this.$emit("change",!1),this.$emit("hide",n),!0===t?this.$emit("ok",n):!1===t&&this.$emit("cancel",n),e||("undefined"!=typeof document&&(document.removeEventListener("focusin",this.enforceFocus,!1),this.returnFocusTo()),this.is_visible=!1,this.$root.$emit("hidden::modal",this.id),this.$emit("hidden",n),this.body.classList.remove("modal-open"))}},onClickOut:function(){this.is_visible&&!this.noCloseOnBackdrop&&this.hide()},onEsc:function(){this.is_visible&&!this.noCloseOnEsc&&this.hide()},focusFirst:function(){var t=this;"undefined"!=typeof document&&this.$nextTick(function(){if(!document.activeElement||!t.$refs.content.contains(document.activeElement)){var e;t.noAutoFocus||(t.$refs.body&&(e=findFirstVisible(t.$refs.body,FOCUS_SELECTOR)),!e&&t.$refs.footer&&(e=findFirstVisible(t.$refs.footer,FOCUS_SELECTOR)),!e&&t.$refs.header&&(e=findFirstVisible(t.$refs.header,FOCUS_SELECTOR))),e||(e=t.$refs.content),e&&e.focus&&e.focus()}})},returnFocusTo:function(){var t=this.returnFocus||this.return_focus||null;t&&("string"==typeof t&&(t=document.querySelector(t)),t&&t.$el&&"function"==typeof t.$el.focus?t.$el.focus():t&&"function"==typeof t.focus&&t.focus())},enforceFocus:function(t){!this.noEnforceFocus&&this.is_visible&&document!==t.target&&this.$refs.content&&this.$refs.content!==t.target&&!this.$refs.content.contains(t.target)&&this.$refs.content.focus()},showHandler:function(t,e){t===this.id&&(this.return_focus=e||null,this.show())},hideHandler:function(t){t===this.id&&this.hide()}},created:function(){this.listenOnRoot("show::modal",this.showHandler),this.listenOnRoot("hide::modal",this.hideHandler)},mounted:function(){!0===this.visible&&this.show()},destroyed:function(){"undefined"!=typeof document&&document.removeEventListener("focusin",this.enforceFocus,!1)}},props$33={tag:{type:String,default:"ul"},fill:{type:Boolean,default:!1},justified:{type:Boolean,default:!1},tabs:{type:Boolean,default:!1},pills:{type:Boolean,default:!1},vertical:{type:Boolean,default:!1},isNavBar:{type:Boolean,default:!1}},nav={functional:!0,props:props$33,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(n.tag,lib_common(i,{staticClass:"nav",class:{"navbar-nav":n.isNavBar,"nav-tabs":n.tabs,"nav-pills":n.pills,"flex-column":n.vertical,"nav-fill":n.fill,"nav-justified":n.justified}}),r)}},props$34=propsFactory(),navItem={functional:!0,props:props$34,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t("li",lib_common(i,{staticClass:"nav-item"}),[t(bLink,{staticClass:"nav-link",props:n},r)])}},navItemDropdown={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{class:t.dropdownClasses,attrs:{id:t.safeId()}},[n("a",{ref:"toggle",class:t.toggleClasses,attrs:{href:"#",id:t.safeId("_BV_button_"),"aria-haspopup":"true","aria-expanded":t.visible?"true":"false",disabled:t.disabled},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.toggle(e)},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;e.stopPropagation(),e.preventDefault(),t.toggle(e)},function(e){if(!("button"in e)&&t._k(e.keyCode,"space",32))return null;e.stopPropagation(),e.preventDefault(),t.toggle(e)}]}},[t._t("button-content",[t._t("text",[n("span",{domProps:{innerHTML:t._s(t.text)}})])])],2),n("div",{ref:"menu",class:t.menuClasses,attrs:{role:t.role,"aria-labelledby":t.safeId("_BV_button_")},on:{mouseover:t.onMouseOver,keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27))return null;t.onEsc(e)},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"tab",9))return null;t.onTab(e)},function(e){if(!("button"in e)&&t._k(e.keyCode,"up",38))return null;t.focusNext(e,!0)},function(e){if(!("button"in e)&&t._k(e.keyCode,"down",40))return null;t.focusNext(e,!1)}]}},[t._t("default")],2)])},staticRenderFns:[],mixins:[idMixin,dropdownMixin],computed:{isNav:function(){return!0},dropdownClasses:function(){return["nav-item","b-nav-dropdown","dropdown",this.dropup?"dropup":"",this.visible?"show":""]},toggleClasses:function(){return["nav-link",this.noCaret?"":"dropdown-toggle",this.disabled?disabled:""]},menuClasses:function(){return["dropdown-menu",this.right?"dropdown-menu-right":"dropdown-menu-left",this.visible?"show":""]}},props:{noCaret:{type:Boolean,default:!1},role:{type:String,default:"menu"}}},navToggle={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{class:t.classObject,attrs:{type:"button","aria-label":t.label,"aria-controls":t.target.id?t.target.id:t.target,"aria-expanded":t.toggleState?"true":"false"},on:{click:t.onclick}},[t._t("default",[n("span",{staticClass:"navbar-toggler-icon"})])],2)},staticRenderFns:[],mixins:[listenOnRootMixin],computed:{classObject:function(){return["navbar-toggler","navbar-toggler-"+this.position]}},data:function(){return{toggleState:!1}},props:{label:{type:String,default:"Toggle navigation"},position:{type:String,default:"right"},target:{required:!0}},methods:{onclick:function(){var t=this.target;t.toggle&&t.toggle(),this.$root.$emit("collapse::toggle",this.target)},handleStateEvt:function(t,e){t!==this.target&&t!==this.target.id||(this.toggleState=e)}},created:function(){this.listenOnRoot("collapse::toggle::state",this.handleStateEvt)}},props$35={tag:{type:String,default:"nav"},type:{type:String,default:"light"},variant:{type:String},toggleable:{type:[Boolean,String],default:!1},toggleBreakpoint:{type:String,default:null},fixed:{type:String},sticky:{type:Boolean,default:!1}},navbar={functional:!0,props:props$35,render:function(t,e){var n=e.props,i=e.data,r=e.children,o=n.toggleBreakpoint||(!0===n.toggleable?"sm":n.toggleable)||"sm";return t(n.tag,lib_common(i,{staticClass:"navbar",class:(s={"sticky-top":n.sticky},s["navbar-"+n.type]=Boolean(n.type),s["bg-"+n.variant]=Boolean(n.variant),s["fixed-"+n.fixed]=Boolean(n.fixed),s["navbar-expand-"+o]=!1!==n.toggleable,s)}),r);var s}},linkProps$2=propsFactory();linkProps$2.href.default=void 0,linkProps$2.to.default=void 0;var props$36=assign(linkProps$2,{tag:{type:String,default:"div"}}),navbarBrand={functional:!0,props:props$36,render:function(t,e){var n=e.props,i=e.data,r=e.children,o=Boolean(n.to||n.href);return t(o?bLink:n.tag,lib_common(i,{staticClass:"navbar-brand",props:o?pluckProps(linkProps$2,n):{}}),r)}},props$37={tag:{type:String,default:"span"}},navText={functional:!0,props:props$37,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(n.tag,lib_common(i,{staticClass:"navbar-text"}),r)}},navForm={functional:!0,props:{id:{type:String,default:null}},render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(Form,lib_common(i,{attrs:{id:n.id},props:{inline:!0}}),r)}},COMMON_ALIGNMENT=["start","end","center"],props$38={tag:{type:String,default:"div"},noGutters:{type:Boolean,default:!1},alignV:{type:String,default:null,validator:function(t){return arrayIncludes(COMMON_ALIGNMENT.concat(["baseline","stretch"]),t)}},alignH:{type:String,default:null,validator:function(t){return arrayIncludes(COMMON_ALIGNMENT.concat(["between","around"]),t)}},alignContent:{type:String,default:null,validator:function(t){return arrayIncludes(COMMON_ALIGNMENT.concat(["between","around","stretch"]),t)}}},row={functional:!0,props:props$38,render:function(t,e){var n=e.props,i=e.data,r=e.children;return t(n.tag,lib_common(i,{staticClass:"row",class:(o={"no-gutters":n.noGutters},o["align-items-"+n.alignV]=n.alignV,o["justify-content-"+n.alignH]=n.alignH,o["align-content-"+n.alignContent]=n.alignContent,o)}),r);var o}},range=function(t){return Array.apply(null,{length:t})},ELLIPSIS_THRESHOLD=3,pagination={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{class:["pagination",t.btnSize,t.alignment],attrs:{"aria-disabled":t.disabled?"true":"false","aria-label":t.ariaLabel?t.ariaLabel:null,role:"menubar"},on:{focusin:function(e){if(e.target!==e.currentTarget)return null;t.focusCurrent(e)},keydown:[function(e){return"button"in e||!t._k(e.keyCode,"left",37)?"button"in e&&0!==e.button?null:(e.preventDefault(),void t.focusPrev(e)):null},function(e){return"button"in e||!t._k(e.keyCode,"right",39)?"button"in e&&2!==e.button?null:(e.preventDefault(),void t.focusNext(e)):null},function(e){return("button"in e||!t._k(e.keyCode,"left",37))&&e.shiftKey?"button"in e&&0!==e.button?null:(e.preventDefault(),void t.focusFirst(e)):null},function(e){return("button"in e||!t._k(e.keyCode,"right",39))&&e.shiftKey?"button"in e&&2!==e.button?null:(e.preventDefault(),void t.focusLast(e)):null}]}},[t.hideGotoEndButtons?t._e():[t.isActive(1)||t.disabled?n("li",{staticClass:"page-item disabled",attrs:{role:"none presentation","aria-hidden":"true"}},[n("span",{staticClass:"page-link",domProps:{innerHTML:t._s(t.firstText)}})]):n("li",{staticClass:"page-item",attrs:{role:"none presentation"}},[n("a",{staticClass:"page-link",attrs:{"aria-label":t.labelFirstPage,"aria-controls":t.ariaControls||null,role:"menuitem",href:"#",tabindex:"-1"},on:{click:function(e){e.preventDefault(),t.setPage(e,1)},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;e.preventDefault(),t.setPage(e,1)},function(e){if(!("button"in e)&&t._k(e.keyCode,"space",32))return null;e.preventDefault(),t.setPage(e,1)}]}},[n("span",{attrs:{"aria-hidden":"true"},domProps:{innerHTML:t._s(t.firstText)}})])])],t.isActive(1)||t.disabled?n("li",{staticClass:"page-item disabled",attrs:{role:"none presentation","aria-hidden":"true"}},[n("span",{staticClass:"page-link",domProps:{innerHTML:t._s(t.prevText)}})]):n("li",{staticClass:"page-item",attrs:{role:"none presentation"}},[n("a",{staticClass:"page-link",attrs:{"aria-label":t.labelPrevPage,"aria-controls":t.ariaControls||null,role:"menuitem",href:"#",tabindex:"-1"},on:{click:function(e){e.preventDefault(),t.setPage(e,t.currentPage-1)},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;e.preventDefault(),t.setPage(e,t.currentPage-1)},function(e){if(!("button"in e)&&t._k(e.keyCode,"space",32))return null;e.preventDefault(),t.setPage(e,t.currentPage-1)}]}},[n("span",{attrs:{"aria-hidden":"true"},domProps:{innerHTML:t._s(t.prevText)}})])]),t.showFirstDots?n("li",{staticClass:"page-item disabled d-none d-sm-flex",attrs:{role:"separator"}},[n("span",{staticClass:"page-link",domProps:{innerHTML:t._s(t.ellipsisText)}})]):t._e(),t._l(t.pageList,function(e){return n("li",{key:e.number,class:t.pageItemClasses(e),attrs:{role:"none presentation"}},[n("a",{class:t.pageLinkClasses(e),attrs:{disabled:t.disabled,"aria-disabled":t.disabled?"true":null,"aria-label":t.labelPage+" "+e.number,"aria-checked":t.isActive(e.number)?"true":"false","aria-controls":t.ariaControls||null,"aria-posinset":e.number,"aria-setsize":t.numberOfPages,role:"menuitemradio",href:"#",tabindex:"-1"},on:{click:function(n){n.preventDefault(),t.setPage(n,e.number)},keydown:[function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13))return null;n.preventDefault(),t.setPage(n,e.number)},function(n){if(!("button"in n)&&t._k(n.keyCode,"space",32))return null;n.preventDefault(),t.setPage(n,e.number)}]}},[t._v(t._s(e.number))])])}),t.showLastDots?n("li",{staticClass:"page-item disabled d-none d-sm-flex",attrs:{role:"separator"}},[n("span",{staticClass:"page-link",domProps:{innerHTML:t._s(t.ellipsisText)}})]):t._e(),t.isActive(t.numberOfPages)||t.disabled?n("li",{staticClass:"page-item disabled",attrs:{role:"none presentation","aria-hidden":"true"}},[n("span",{staticClass:"page-link",domProps:{innerHTML:t._s(t.nextText)}})]):n("li",{staticClass:"page-item",attrs:{role:"none presentation"}},[n("a",{staticClass:"page-link",attrs:{"aria-label":t.labelNextPage,"aria-controls":t.ariaControls||null,role:"menuitem",href:"#",tabindex:"-1"},on:{click:function(e){e.preventDefault(),t.setPage(e,t.currentPage+1)},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;e.preventDefault(),t.setPage(e,t.currentPage+1)},function(e){if(!("button"in e)&&t._k(e.keyCode,"space",32))return null;e.preventDefault(),t.setPage(e,t.currentPage+1)}]}},[n("span",{attrs:{"aria-hidden":"true"},domProps:{innerHTML:t._s(t.nextText)}})])]),t.hideGotoEndButtons?t._e():[t.isActive(t.numberOfPages)||t.disabled?n("li",{staticClass:"page-item disabled",attrs:{role:"none presentation","aria-hidden":"true"}},[n("span",{staticClass:"page-link",domProps:{innerHTML:t._s(t.lastText)}})]):n("li",{staticClass:"page-item",attrs:{role:"none presentation"}},[n("a",{staticClass:"page-link",attrs:{"aria-label":t.labelLastPage,"aria-controls":t.ariaControls||null,role:"menuitem",href:"#",tabindex:"-1"},on:{click:function(e){e.preventDefault(),t.setPage(e,t.numberOfPages)},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;e.preventDefault(),t.setPage(e,t.numberOfPages)},function(e){if(!("button"in e)&&t._k(e.keyCode,"space",32))return null;e.preventDefault(),t.setPage(e,t.numberOfPages)}]}},[n("span",{attrs:{"aria-hidden":"true"},domProps:{innerHTML:t._s(t.lastText)}})])])]],2)},staticRenderFns:[],_scopeId:"data-v-2792960b",data:function(){return{showFirstDots:!1,showLastDots:!1,currentPage:this.value}},computed:{numberOfPages:function(){var t=Math.ceil(this.totalRows/this.perPage);return t<1?1:t},btnSize:function(){return this.size?"pagination-"+this.size:""},alignment:function(){return"center"===this.align?"justify-content-center":"end"===this.align||"right"===this.align?"justify-content-end":""},pageList:function(){this.currentPage>this.numberOfPages?this.currentPage=this.numberOfPages:this.currentPage<1&&(this.currentPage=1),this.showFirstDots=!1,this.showLastDots=!1;var t=this.limit,e=1;this.numberOfPages<=this.limit?t=this.numberOfPages:this.currentPage<this.limit-1&&this.limit>ELLIPSIS_THRESHOLD?this.hideEllipsis||(t=this.limit-1,this.showLastDots=!0):this.numberOfPages-this.currentPage+2<this.limit&&this.limit>ELLIPSIS_THRESHOLD?(this.hideEllipsis||(this.showFirstDots=!0,t=this.limit-1),e=this.numberOfPages-t+1):(this.limit>ELLIPSIS_THRESHOLD&&!this.hideEllipsis&&(this.showFirstDots=!0,this.showLastDots=!0,t=this.limit-2),e=this.currentPage-Math.floor(t/2)),e<1?e=1:e>this.numberOfPages-t&&(e=this.numberOfPages-t+1);var n=makePageArray(e,t);if(n.length>3){var i=this.currentPage-e;if(0===i)for(var r=3;r<n.length;r++)n[r].className="d-none d-sm-flex";else if(i===n.length-1)for(var o=0;o<n.length-3;o++)n[o].className="d-none d-sm-flex";else{for(var s=0;s<i-1;s++)n[s].className="d-none d-sm-flex";for(var a=n.length-1;a>i+1;a--)n[a].className="d-none d-sm-flex"}}return n}},methods:{isActive:function(t){return t===this.currentPage},pageItemClasses:function(t){var e=this.isActive(t.number);return["page-item",this.disabled?"disabled":"",e?"active":"",t.className]},pageLinkClasses:function(t){var e=this.isActive(t.number);return["page-link",this.disabled?"disabled":"",e?"active":""]},setPage:function(t,e){var n=this;if(this.disabled)return t.preventDefault(),void t.stopPropagation();e>this.numberOfPages?this.currentPage=this.numberOfPages:e<1?this.currentpage=1:this.currentPage=e,this.$nextTick(function(){isVisible$3(t.target)&&t.target.focus?t.target.focus():n.focusCurrent()}),this.$emit("change",this.currentPage)},getButtons:function(){return from(this.$el.querySelectorAll("a.page-link")).filter(function(t){return isVisible$3(t)})},setBtnFocus:function(t){this.$nextTick(function(){t.focus()})},focusFirst:function(){var t=this.getButtons().find(function(t){return!t.disabled});t&&t.focus&&t!==document.activeElement&&this.setBtnFocus(t)},focusLast:function(){var t=this.getButtons().reverse().find(function(t){return!t.disabled});t&&t.focus&&t!==document.activeElement&&this.setBtnFocus(t)},focusCurrent:function(){var t=this,e=this.getButtons().find(function(e){return parseInt(e.getAttribute("aria-posinset"),10)===t.currentPage});e&&e.focus?this.setBtnFocus(e):this.focusFirst()},focusPrev:function(){var t=this.getButtons(),e=t.indexOf(document.activeElement);e>0&&!t[e-1].disabled&&t[e-1].focus&&this.setBtnFocus(t[e-1])},focusNext:function(){var t=this.getButtons(),e=t.indexOf(document.activeElement);e<t.length-1&&!t[e+1].disabled&&t[e+1].focus&&this.setBtnFocus(t[e+1])}},watch:{currentPage:function(t,e){t!==e&&this.$emit("input",t)},value:function(t,e){t!==e&&(this.currentPage=t)}},props:{disabled:{type:Boolean,default:!1},value:{type:Number,default:1},limit:{type:Number,default:5},perPage:{type:Number,default:20},totalRows:{type:Number,default:20},size:{type:String,default:"md"},align:{type:String,default:"left"},hideGotoEndButtons:{type:Boolean,default:!1},ariaLabel:{type:String,default:"Pagination"},labelFirstPage:{type:String,default:"Goto first page"},firstText:{type:String,default:"&laquo;"},labelPrevPage:{type:String,default:"Goto previous page"},prevText:{type:String,default:"&lsaquo;"},labelNextPage:{type:String,default:"Goto next page"},nextText:{type:String,default:"&rsaquo;"},labelLastPage:{type:String,default:"Goto last page"},lastText:{type:String,default:"&raquo;"},labelPage:{type:String,default:"Goto page"},hideEllipsis:{type:Boolean,default:!1},ellipsisText:{type:String,default:"&hellip;"},ariaControls:{type:String,default:null}}},ELLIPSIS_THRESHOLD$1=3,routerProps=pickLinkProps("activeClass","exactActiveClass","append","exact","replace","target","rel"),props$39=assign({numberOfPages:{type:Number,default:1},baseUrl:{type:String,default:"/"},useRouter:{type:Boolean,default:!1},linkGen:{type:Function,default:null},pageGen:{type:Function,default:null}},{disabled:{type:Boolean,default:!1},value:{type:Number,default:1},limit:{type:Number,default:5},size:{type:String,default:"md"},align:{type:String,default:"left"},hideGotoEndButtons:{type:Boolean,default:!1},ariaLabel:{type:String,default:"Pagination"},labelFirstPage:{type:String,default:"Goto first page"},firstText:{type:String,default:"&laquo;"},labelPrevPage:{type:String,default:"Goto previous page"},prevText:{type:String,default:"&lsaquo;"},labelNextPage:{type:String,default:"Goto next page"},nextText:{type:String,default:"&rsaquo;"},labelLastPage:{type:String,default:"Goto last page"},lastText:{type:String,default:"&raquo;"},labelPage:{type:String,default:"Goto page"},hideEllipsis:{type:Boolean,default:!1},ellipsisText:{type:String,default:"&hellip;"}},routerProps),paginationNav={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",[n("ul",{class:["pagination",t.btnSize,t.alignment],attrs:{"aria-disabled":t.disabled?"true":"false","aria-label":t.ariaLabel?t.ariaLabel:null,role:"menubar"},on:{focusin:function(e){if(e.target!==e.currentTarget)return null;t.focusCurrent(e)},keydown:[function(e){return"button"in e||!t._k(e.keyCode,"left",37)?"button"in e&&0!==e.button?null:(e.preventDefault(),void t.focusPrev(e)):null},function(e){return"button"in e||!t._k(e.keyCode,"right",39)?"button"in e&&2!==e.button?null:(e.preventDefault(),void t.focusNext(e)):null},function(e){return("button"in e||!t._k(e.keyCode,"left",37))&&e.shiftKey?"button"in e&&0!==e.button?null:(e.preventDefault(),void t.focusFirst(e)):null},function(e){return("button"in e||!t._k(e.keyCode,"right",39))&&e.shiftKey?"button"in e&&2!==e.button?null:(e.preventDefault(),void t.focusLast(e)):null}]}},[t.hideGotoEndButtons?t._e():[t.isActive(1)||t.disabled?n("li",{staticClass:"page-item disabled",attrs:{role:"none presentation","aria-hidden":"true"}},[n("span",{staticClass:"page-link",domProps:{innerHTML:t._s(t.firstText)}})]):n("li",{staticClass:"page-item",attrs:{role:"none presentation"}},[n("b-link",t._b({staticClass:"page-link",attrs:{"aria-label":t.labelFirstPage,role:"menuitem",tabindex:"-1"},on:{click:function(e){t.onClick(1)}}},"b-link",t.linkProps(1),!1),[n("span",{attrs:{"aria-hidden":"true"},domProps:{innerHTML:t._s(t.firstText)}})])],1)],t.isActive(1)||t.disabled?n("li",{staticClass:"page-item disabled",attrs:{role:"none presentation","aria-hidden":"true"}},[n("span",{staticClass:"page-link",domProps:{innerHTML:t._s(t.prevText)}})]):n("li",{staticClass:"page-item",attrs:{role:"none presentation"}},[n("b-link",t._b({staticClass:"page-link",attrs:{"aria-label":t.labelPrevPage,role:"menuitem",tabindex:"-1"},on:{click:function(e){t.onClick(t.currentPage-1)}}},"b-link",t.linkProps(t.currentPage-1),!1),[n("span",{attrs:{"aria-hidden":"true"},domProps:{innerHTML:t._s(t.prevText)}})])],1),t.showFirstDots?n("li",{staticClass:"page-item disabled d-none d-sm-flex",attrs:{role:"separator"}},[n("span",{staticClass:"page-link",domProps:{innerHTML:t._s(t.ellipsisText)}})]):t._e(),t._l(t.pageList,function(e){return n("li",{key:e.number,class:t.pageItemClasses(e),attrs:{role:"none presentation"}},[t.disabled?n("span",{staticClass:"page-link"},[t._v(t._s(e.number))]):n("b-link",t._b({class:t.pageLinkClasses(e),attrs:{disabled:t.disabled,"aria-disabled":t.disabled?"true":null,"aria-label":t.labelPage+" "+e.number,"aria-checked":t.isActive(e.number)?"true":"false","aria-posinset":e.number,"aria-setsize":t.numberOfPages,role:"menuitemradio",tabindex:"-1"},domProps:{innerHTML:t._s(t.makePage(e.number))},on:{click:function(n){t.onClick(e.number)}}},"b-link",t.linkProps(e.number),!1))],1)}),t.showLastDots?n("li",{staticClass:"page-item disabled d-none d-sm-flex",attrs:{role:"separator"}},[n("span",{staticClass:"page-link",domProps:{innerHTML:t._s(t.ellipsisText)}})]):t._e(),t.isActive(t.numberOfPages)||t.disabled?n("li",{staticClass:"page-item disabled",attrs:{role:"none presentation","aria-hidden":"true"}},[n("span",{staticClass:"page-link",domProps:{innerHTML:t._s(t.nextText)}})]):n("li",{staticClass:"page-item",attrs:{role:"none presentation"}},[n("b-link",t._b({staticClass:"page-link",attrs:{"aria-label":t.labelNextPage,role:"menuitem",tabindex:"-1"},on:{click:function(e){t.onClick(t.currentPage+1)}}},"b-link",t.linkProps(t.currentPage+1),!1),[n("span",{attrs:{"aria-hidden":"true"},domProps:{innerHTML:t._s(t.nextText)}})])],1),t.hideGotoEndButtons?t._e():[t.isActive(t.numberOfPages)||t.disabled?n("li",{staticClass:"page-item disabled",attrs:{role:"none presentation","aria-hidden":"true"}},[n("span",{staticClass:"page-link",domProps:{innerHTML:t._s(t.lastText)}})]):n("li",{staticClass:"page-item",attrs:{role:"none presentation"}},[n("b-link",t._b({staticClass:"page-link",attrs:{"aria-label":t.labelLastPage,role:"menuitem"},on:{click:function(e){t.onClick(t.numberOfPages)}}},"b-link",t.linkProps(t.numberOfPages),!1),[n("span",{attrs:{"aria-hidden":"true"},domProps:{innerHTML:t._s(t.lastText)}})])],1)]],2)])},staticRenderFns:[],_scopeId:"data-v-20c4e761",components:{bLink:bLink},data:function(){return{showFirstDots:!1,showLastDots:!1,currentPage:this.value}},props:props$39,watch:{currentPage:function(t,e){t!==e&&this.$emit("input",t)},value:function(t,e){t!==e&&(this.currentPage=t)}},computed:{btnSize:function(){return this.size?"pagination-"+this.size:""},alignment:function(){return"center"===this.align?"justify-content-center":"end"===this.align||"right"===this.align?"justify-content-end":""},pageList:function(){this.currentPage>this.numberOfPages?this.currentPage=this.numberOfPages:this.currentPage<1&&(this.currentPage=1),this.showFirstDots=!1,this.showLastDots=!1;var t=this.limit,e=1;this.numberOfPages<=this.limit?t=this.numberOfPages:this.currentPage<this.limit-1&&this.limit>ELLIPSIS_THRESHOLD$1?this.hideEllipsis||(t=this.limit-1,this.showLastDots=!0):this.numberOfPages-this.currentPage+2<this.limit&&this.limit>ELLIPSIS_THRESHOLD$1?(this.hideEllipsis||(this.showFirstDots=!0,t=this.limit-1),e=this.numberOfPages-t+1):(this.limit>ELLIPSIS_THRESHOLD$1&&!this.hideEllipsis&&(this.showFirstDots=!0,this.showLastDots=!0,t=this.limit-2),e=this.currentPage-Math.floor(t/2)),e<1?e=1:e>this.numberOfPages-t&&(e=this.numberOfPages-t+1);var n=makePageArray$1(e,t);if(n.length>3){var i=this.currentPage-e;if(0===i)for(var r=3;r<n.length;r++)n[r].className="d-none d-sm-flex";else if(i===n.length-1)for(var o=0;o<n.length-3;o++)n[o].className="d-none d-sm-flex";else{for(var s=0;s<i-1;s++)n[s].className="d-none d-sm-flex";for(var a=n.length-1;a>i+1;a--)n[a].className="d-none d-sm-flex"}}return n}},methods:{onClick:function(t){this.currentPage=t},makeLink:function(t){if(this.linkGen&&"function"==typeof this.linkGen)return this.linkGen(t);var e=""+this.baseUrl+t;return this.useRouter?{path:e}:e},makePage:function(t){return this.pageGen&&"function"==typeof this.pageGen?this.pageGen(t):t},linkProps:function(t){var e=this.makeLink(t),n={href:"string"==typeof e?e:null,target:this.target||null,rel:this.rel||null,disabled:this.disabled};return(this.useRouter||"object"==typeof e)&&(n=assign(n,{to:e,exact:this.exact,activeClass:this.activeClass,exactActiveClass:this.exactActiveClass,append:this.append,replace:this.replace})),n},isActive:function(t){return t===this.currentPage},pageItemClasses:function(t){return["page-item",this.disabled?"disabled":"",this.isActive(t.number)?"active":"",t.className]},pageLinkClasses:function(t){return["page-link",this.disabled?"disabled":"",this.isActive(t.number)?"active":""]},getButtons:function(){return from(this.$el.querySelectorAll("a.page-link")).filter(function(t){return isVisible$4(t)})},setBtnFocus:function(t){this.$nextTick(function(){t.focus()})},focusFirst:function(){var t=this.getButtons().find(function(t){return!t.disabled});t&&t.focus&&t!==document.activeElement&&this.setBtnFocus(t)},focusLast:function(){var t=this.getButtons().reverse().find(function(t){return!t.disabled});t&&t.focus&&t!==document.activeElement&&this.setBtnFocus(t)},focusCurrent:function(){var t=this,e=this.getButtons().find(function(e){return parseInt(e.getAttribute("aria-posinset"),10)===t.currentPage});e&&e.focus?this.setBtnFocus(e):this.focusFirst()},focusPrev:function(){var t=this.getButtons(),e=t.indexOf(document.activeElement);e>0&&!t[e-1].disabled&&t[e-1].focus&&this.setBtnFocus(t[e-1])},focusNext:function(){var t=this.getButtons(),e=t.indexOf(document.activeElement);e<t.length-1&&!t[e+1].disabled&&t[e+1].focus&&this.setBtnFocus(t[e+1])}}},inBrowser="undefined"!=typeof window&&"undefined"!=typeof document,NAME$1="tooltp",CLASS_PREFIX$1="bs-tooltip",BSCLS_PREFIX_REGEX$1=new RegExp("\\b"+CLASS_PREFIX$1+"\\S+","g"),TRANSITION_DURATION=150,MODAL_CLOSE_EVENT=["bv::modal::hidden","hidden::modal"],MODAL_CLASS=".modal",AttachmentMap$1={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},HoverState={SHOW:"show",OUT:"out"},ClassName$1={FADE:"fade",SHOW:"show"},Selector$1={TOOLTIP:".tooltip",TOOLTIP_INNER:".tooltip-inner",ARROW:".arrow"},Defaults$2={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",callbacks:{}},TransitionEndEvents$1={WebkitTransition:["webkitTransitionEnd"],MozTransition:["transitionend"],OTransition:["otransitionend","oTransitionEnd"],transition:["transitionend"]},NEXTID=1;inBrowser&&window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(t){var e,n=(this.document||this.ownerDocument).querySelectorAll(t),i=this;do{for(e=n.length;--e>=0&&n.item(e)!==i;);}while(e<0&&(i=i.parentElement));return i});var ToolTip=function(t,e,n){this.$fadeTimeout=null,this.$hoverTimeout=null,this.$visibleInterval=null,this.$hoverState="",this.$activeTrigger={},this.$popper=null,this.$element=t,this.$tip=null,this.$id=generateId(this.constructor.NAME),this.$root=n||null,this.$routeWatcher=null,this.updateConfig(e)},staticAccessors={Default:{},NAME:{}};staticAccessors.Default.get=function(){return Defaults$2},staticAccessors.NAME.get=function(){return NAME$1},ToolTip.prototype.updateConfig=function(t){var e=assign({},this.constructor.Default,t);t.delay&&"number"==typeof t.delay&&(e.delay={show:t.delay,hide:t.delay}),t.title&&"number"==typeof t.title&&(e.title=t.title.toString()),t.content&&"number"==typeof t.content&&(e.content=t.content.toString()),this.fixTitle(),this.$config=e,this.unListen(),this.listen()},ToolTip.prototype.destroy=function(){clearInterval(this.$visibleInterval),this.$visibleInterval=null,clearTimeout(this.$hoverTimeout),this.$hoverTimeout=null,clearTimeout(this.$fadeTimeout),this.$fadeTimeout=null,this.unListen(),this.setOnTouchStartListener(!1),this.$popper&&this.$popper.destroy(),this.$popper=null,this.$tip&&this.$tip.parentElement&&this.$tip.parentElement.removeChild(this.$tip),this.$tip=null,this.$id=null,this.$root=null,this.$element=null,this.$config=null,this.$hoverState=null,this.$activeTrigger=null},ToolTip.prototype.toggle=function(t){t?(this.$activeTrigger.click=!this.$activeTrigger.click,this.isWithActiveTrigger()?this.enter(null):this.leave(null)):this.getTipElement().classList.contains(ClassName$1.SHOW)?this.leave(null):this.enter(null)},ToolTip.prototype.show=function(){var t=this;if(document.body.contains(this.$element)){var e=this.getTipElement();if(this.fixTitle(),this.setContent(e),this.isWithContent(e)){e.setAttribute("id",this.$id),this.addAriaDescribedby(),e.classList[this.$config.animation?"add":"remove"](ClassName$1.FADE);var n=this.getPlacement(),i=this.constructor.getAttachment(n);this.addAttachmentClass(this.constructor.getAttachment(i));var r=new BvEvent("show",{cancelable:!0,target:this.$element,relatedTarget:e});if(this.emitEvent(r),!r.defaultPrevented){var o=this.getContainer();document.body.contains(e)||o.appendChild(e),this.removePopper(),this.$popper=new Popper(this.$element,e,this.getPopperConfig(i));e.classList.add(ClassName$1.SHOW),this.setOnTouchStartListener(!0),this.$visibleInterval=setInterval(function(){t.$tip&&!elVisible(t.$element)&&t.$tip.classList.contains(ClassName$1.SHOW)&&t.forceHide()},1e3),this.transitionOnce(e,function(){t.$config.animation&&t.fixTransition(e);var n=t.$hoverState;t.$hoverState=null,n===HoverState.OUT&&t.leave(null);var i=new BvEvent("shown",{cancelable:!1,target:t.$element,relatedTarget:e});t.emitEvent(i)})}}else this.$tip=null}},ToolTip.prototype.forceHide=function(){this.getTipElement();this.$tip.classList.remove(ClassName$1.FADE),clearTimeout(this.$hoverTimeout),this.$hoverTimeout=null,this.$hoverState="",this.hide(null,!0)},ToolTip.prototype.hide=function(t,e){var n=this,i=this.getTipElement(),r=new BvEvent("hide",{cancelable:!Boolean(e),target:this.$element,relatedTarget:i});if(this.emitEvent(r),!r.defaultPrevented){clearInterval(this.$visibleInterval),this.$visibleInterval=null;this.setOnTouchStartListener(!1),i.classList.remove(ClassName$1.SHOW),this.$activeTrigger.click=!1,this.$activeTrigger.focus=!1,this.$activeTrigger.hover=!1,this.transitionOnce(i,function(){n.$hoverState!==HoverState.SHOW&&i.parentNode&&i.parentNode.removeChild(i),n.removeAriaDescribedby(),n.removePopper(),n.$tip=null,t&&t();var e=new BvEvent("hidden",{cancelable:!1,target:n.$element,relatedTarget:i});n.emitEvent(e)}),this.$hoverState=""}},ToolTip.prototype.emitEvent=function(t){var e=t.type;this.$root&&this.$root.$emit&&this.$root.$emit("bv::"+this.constructor.NAME+"::"+e,t);var n=this.$config.callbacks||{};"function"==typeof n[e]&&n[e](t)},ToolTip.prototype.getContainer=function(){var t=this.$config.container,e=document.body;return!1===t?e:e.querySelector(t)||e},ToolTip.prototype.addAriaDescribedby=function(){var t=this.$element.getAttribute("aria-describedby")||"";t=t.split(/\s+/).concat(this.$id).join(" ").trim(),this.$element.setAttribute("aria-describedby",t)},ToolTip.prototype.removeAriaDescribedby=function(){var t=this.$element.getAttribute("aria-describedby")||"";(t=t.replace(this.$id,"").replace(/\s+/g," ").trim())?this.$element.setAttribute("aria-describedby",t):this.$element.removeAttribute("aria-describedby")},ToolTip.prototype.removePopper=function(){this.$popper&&this.$popper.destroy(),this.$popper=null},ToolTip.prototype.transitionOnce=function(t,e){var n=this,i=this.getTransitionEndEvents(),r=!1;clearTimeout(this.$fadeTimeout),this.$fadeTimeout=null;var o=function(){r||(r=!0,clearTimeout(n.$fadeTimeout),n.$fadeTimeout=null,i.forEach(function(e){t.removeEventListener(e,o)}),e())};t.classList.contains(ClassName$1.FADE)?(i.forEach(function(t){n.$tip.addEventListener(t,o)}),this.$fadeTimeout=setTimeout(o,TRANSITION_DURATION)):o()},ToolTip.prototype.getTransitionEndEvents=function(){var t=this;for(var e in TransitionEndEvents$1)if(void 0!==t.$element.style[e])return TransitionEndEvents$1[e];return[]},ToolTip.prototype.update=function(){null!==this.$popper&&this.$popper.scheduleUpdate()},ToolTip.prototype.isWithContent=function(t){return!!(t=t||this.$tip)&&Boolean((t.querySelector(Selector$1.TOOLTIP_INNER)||{}).innerHTML)},ToolTip.prototype.addAttachmentClass=function(t){this.getTipElement().classList.add(CLASS_PREFIX$1+"-"+t)},ToolTip.prototype.getTipElement=function(){return this.$tip||(this.$tip=this.compileTemplate(this.$config.template)||this.compileTemplate(this.constructor.Default.template)),this.$tip},ToolTip.prototype.compileTemplate=function(t){if(!t||"string"!=typeof t)return null;var e=document.createElement("div");e.innerHTML=t.trim();var n=e.firstElementChild?e.removeChild(e.firstElementChild):null;return e=null,n},ToolTip.prototype.setContent=function(t){this.setElementContent(t.querySelector(Selector$1.TOOLTIP_INNER),this.getTitle()),t.classList.remove(ClassName$1.FADE),t.classList.remove(ClassName$1.SHOW)},ToolTip.prototype.setElementContent=function(t,e){if(t){var n=this.$config.html;"object"==typeof e&&e.nodeType?n?e.parentElement!==t&&(t.innerHtml="",t.appendChild(e)):t.innerText=e.innerText:t[n?"innerHTML":"innerText"]=e}},ToolTip.prototype.getTitle=function(){var t=this.$config.title||"";return"function"==typeof t&&(t=t(this.$element)),"object"==typeof t&&t.nodeType&&!t.innerHTML.trim()&&(t=""),"string"==typeof t&&(t=t.trim()),t||(t=(t=this.$element.getAttribute("title")||this.$element.getAttribute("data-original-title")||"").trim()),t},ToolTip.getAttachment=function(t){return AttachmentMap$1[t.toUpperCase()]},ToolTip.prototype.listen=function(){var t=this;this.$config.trigger.trim().split(/\s+/).forEach(function(e){"click"===e?t.$element.addEventListener("click",t):"focus"===e?(t.$element.addEventListener("focusin",t),t.$element.addEventListener("focusout",t)):"blur"===e?t.$element.addEventListener("focusout",t):"hover"===e&&(t.$element.addEventListener("mouseenter",t),t.$element.addEventListener("mouseleave",t))},this),this.setModalListener(!0),this.setRouteWatcher(!0)},ToolTip.prototype.unListen=function(){var t=this;["click","focusin","focusout","mouseenter","mouseleave"].forEach(function(e){t.$element.removeEventListener(e,t)},this),this.setModalListener(!1),this.setRouteWatcher(!1)},ToolTip.prototype.handleEvent=function(t){t.target&&t.target===this.$element&&(elDisabled(this.$element)||("click"===t.type?this.toggle(t):"focusin"===t.type||"mouseenter"===t.type?this.enter(t):"focusout"!==t.type&&"mouseleave"!==t.type||this.leave(t)))},ToolTip.prototype.setRouteWatcher=function(t){var e=this;t?(this.setRouteWatcher(!1),this.$root&&Boolean(this.$root.$route)&&(this.$routeWatcher=this.$root.$watch("$route",function(t,n){t!==n&&e.forceHide()}))):this.$routeWatcher&&(this.$routeWatcher(),this.$routeWatcher=null)},ToolTip.prototype.setModalListener=function(t){var e=this;this.$element.closest(MODAL_CLASS)&&this.$root&&(t?MODAL_CLOSE_EVENT.forEach(function(t){e.$root.$on(t,e.forceHide.bind(e))}):MODAL_CLOSE_EVENT.forEach(function(t){e.$root.$off(t,e.forceHide.bind(e))}))},ToolTip.prototype.setOnTouchStartListener=function(t){var e=this;"ontouchstart"in document.documentElement&&from(document.body.children).forEach(function(n){t?n.addEventListener("mouseover",e.noop):n.removeEventListener("mouseover",e.noop)})},ToolTip.prototype.noop=function(){},ToolTip.prototype.fixTitle=function(){var t=this.$element,e=typeof t.getAttribute("data-original-title");(t.getAttribute("title")||"string"!==e)&&(t.setAttribute("data-original-title",t.getAttribute("title")||""),t.setAttribute("title",""))},ToolTip.prototype.enter=function(t){var e=this;t&&(this.$activeTrigger["focusin"===t.type?"focus":"hover"]=!0),this.getTipElement().classList.contains(ClassName$1.SHOW)||this.$hoverState===HoverState.SHOW?this.$hoverState=HoverState.SHOW:(clearTimeout(this.$hoverTimeout),this.$hoverState=HoverState.SHOW,this.$config.delay&&this.$config.delay.show?this.$hoverTimeout=setTimeout(function(){e.$hoverState===HoverState.SHOW&&e.show()},this.$config.delay.show):this.show())},ToolTip.prototype.leave=function(t){var e=this;t&&(this.$activeTrigger["focusout"===t.type?"focus":"hover"]=!1,"focusout"===t.type&&/blur/.test(this.$config.trigger)&&(this.$activeTrigger.click=!1,this.$activeTrigger.hover=!1)),this.isWithActiveTrigger()||(clearTimeout(this.$hoverTimeout),this.$hoverState=HoverState.OUT,this.$config.delay&&this.$config.delay.hide?this.$hoverTimeout=setTimeout(function(){e.$hoverState===HoverState.OUT&&e.hide()},this.$config.delay.hide):this.hide())},ToolTip.prototype.getPopperConfig=function(t){var e=this;return{placement:t,modifiers:{offset:{offset:this.$config.offset||0},flip:{behavior:this.$config.fallbackPlacement},arrow:{element:".arrow"}},onCreate:function(t){t.originalPlacement!==t.placement&&e.handlePopperPlacementChange(t)},onUpdate:function(t){e.handlePopperPlacementChange(t)}}},ToolTip.prototype.getPlacement=function(){var t=this.$config.placement;return"function"==typeof t?t.call(this,this.$tip,this.$element):t},ToolTip.prototype.isWithActiveTrigger=function(){var t=this;for(var e in t.$activeTrigger)if(t.$activeTrigger[e])return!0;return!1},ToolTip.prototype.cleanTipClass=function(){var t=this.getTipElement(),e=t.className.match(BSCLS_PREFIX_REGEX$1);null!==e&&e.length>0&&e.forEach(function(e){t.classList.remove(e)})},ToolTip.prototype.handlePopperPlacementChange=function(t){this.cleanTipClass(),this.addAttachmentClass(this.constructor.getAttachment(t.placement))},ToolTip.prototype.fixTransition=function(t){var e=this.$config.animation||!1;null===t.getAttribute("x-placement")&&(t.classList.remove(ClassName$1.FADE),this.$config.animation=!1,this.hide(),this.show(),this.$config.animation=e)},Object.defineProperties(ToolTip,staticAccessors);var BvEvent=function t(e,n){if(void 0===n&&(n={}),!e)throw new TypeError("Failed to construct '"+this.constructor.name+"'. 1 argument required, "+arguments.length+" given.");assign(this,t.defaults(),n,{type:e}),defineProperties(this,{type:readonlyDescriptor(),cancelable:readonlyDescriptor(),nativeEvent:readonlyDescriptor(),target:readonlyDescriptor(),relatedTarget:readonlyDescriptor(),vueTarget:readonlyDescriptor()});var i=!1;this.preventDefault=function(){this.cancelable&&(i=!0)},defineProperty(this,"defaultPrevented",{enumerable:!0,get:function(){return i}})};BvEvent.defaults=function(){return{type:"",cancelable:!0,nativeEvent:null,target:null,relatedTarget:null,vueTarget:null}};var NAME="popover",CLASS_PREFIX="bs-popover",BSCLS_PREFIX_REGEX=new RegExp("\\b"+CLASS_PREFIX+"\\S+","g"),Defaults$1=assign({},ToolTip.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),ClassName={FADE:"fade",SHOW:"show"},Selector={TITLE:".popover-header",CONTENT:".popover-body"},PopOver=function(t){function e(){t.apply(this,arguments)}t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e;var n={Default:{},NAME:{}};return n.Default.get=function(){return Defaults$1},n.NAME.get=function(){return NAME},e.prototype.isWithContent=function(t){if(!(t=t||this.$tip))return!1;var e=Boolean((t.querySelector(Selector.TITLE)||{}).innerHTML),n=Boolean((t.querySelector(Selector.CONTENT)||{}).innerHTML);return e||n},e.prototype.addAttachmentClass=function(t){this.getTipElement().classList.add(CLASS_PREFIX+"-"+t)},e.prototype.setContent=function(t){this.setElementContent(t.querySelector(Selector.TITLE),this.getTitle()),this.setElementContent(t.querySelector(Selector.CONTENT),this.getContent()),t.classList.remove(ClassName.FADE),t.classList.remove(ClassName.SHOW)},e.prototype.cleanTipClass=function(){var t=this.getTipElement(),e=t.className.match(BSCLS_PREFIX_REGEX);null!==e&&e.length>0&&e.forEach(function(e){t.classList.remove(e)})},e.prototype.getTitle=function(){var t=this.$config.title||"";return"function"==typeof t&&(t=t(this.$element)),"object"==typeof t&&t.nodeType&&!t.innerHTML.trim()&&(t=""),"string"==typeof t&&(t=t.trim()),t||(t=(t=this.$element.getAttribute("title")||this.$element.getAttribute("data-original-title")||"").trim()),t},e.prototype.getContent=function(){var t=this.$config.content||"";return"function"==typeof t&&(t=t(this.$element)),"object"==typeof t&&t.nodeType&&!t.innerHTML.trim()&&(t=""),"string"==typeof t&&(t=t.trim()),t},Object.defineProperties(e,n),e}(ToolTip),popover={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"d-none",attrs:{"aria-hidden":"true"}},[n("div",{ref:"title"},[t._t("title")],2),n("div",{ref:"content"},[t._t("default")],2)])},staticRenderFns:[],data:function(){return{popOver:null}},props:{target:{type:[String,Object]},targetId:{type:String,default:null},title:{type:String,default:""},content:{type:String,default:""},triggers:{type:[String,Array],default:"click"},placement:{type:String,default:"right"},delay:{type:Number,default:0},offset:{type:[Number,String],default:0},noFade:{type:Boolean,default:!1}},mounted:function(){var t=this;this.$nextTick(function(){var e=t.getTarget();e?(t.popOver=new PopOver(e,t.getConfig(),t.$root),t.$on("close",t.onClose),observeDOM(t.$refs.content,t.updatePosition.bind(t),{subtree:!0,childList:!0,attributes:!0,attributeFilter:["class","style"]})):warn("b-popover: 'target' element not found!")})},updated:function(){this.popOver&&this.popOver.updateConfig(this.getConfig())},beforeDestroyed:function(){this.$off("close",this.onClose),this.popOver&&(this.popOver.destroy(),this.popOver=null),this.bringItBack()},computed:{baseConfig:function(){return{title:this.title.trim()||"",content:this.content.trim()||"",placement:this.placement||"top",delay:parseInt(this.delay,10)||0,offset:this.offset||0,animation:Boolean(this.noFade),trigger:isArray(this.triggers)?this.triggers.join(" "):this.triggers}}},methods:{onClose:function(t){this.popOver?this.popOver.hide(t):"function"==typeof t&&t()},updatePosition:function(){this.popOver&&this.popOver.update()},getConfig:function(){var t=assign({},this.baseConfig);return this.$refs.title.innerHTML.trim()&&(t.title=this.$refs.title,t.html=!0),this.$refs.content.innerHTML.trim()&&(t.content=this.$refs.content,t.html=!0),t.callbacks={show:this.onShow,shown:this.onShown,hide:this.onHide,hidden:this.onHidden},t},getTarget:function(){var t=this.target;return"string"==typeof t?document.getElementById(/^#/.test(t)?t.slice(1):t)||null:"object"==typeof t&&t.$el?t.$el:"object"==typeof t&&t.tagName?t:null},onShow:function(t){this.$emit("show",t)},onShown:function(t){this.$emit("shown",t)},onHide:function(t){this.$emit("hide",t)},onHidden:function(t){this.bringItBack(),this.$emit("hidden",t)},bringItBack:function(){this.$el&&(this.$refs.title&&this.$el.appendChild(this.$refs.title),this.$refs.content&&this.$el.appendChild(this.$refs.content))}}},bProgressBar={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.progressBarClasses,style:t.progressBarStyles,attrs:{role:"progressbar","aria-valuenow":t.value.toFixed(t.computedPrecision),"aria-valuemin":"0","aria-valuemax":t.computedMax}},[t._t("default",[t.label?n("span",{domProps:{innerHTML:t._s(t.label)}}):t.computedShowProgress?[t._v(t._s(t.progress.toFixed(t.computedPrecision))+"%")]:t.computedShowValue?[t._v(t._s(t.value.toFixed(t.computedPrecision)))]:t._e()])],2)},staticRenderFns:[],computed:{progressBarClasses:function(){return["progress-bar",this.computedVariant?"bg-"+this.computedVariant:"",this.computedStriped||this.computedAnimated?"progress-bar-striped":"",this.computedAnimated?"progress-bar-animated":""]},progressBarStyles:function(){return{width:this.value/this.computedMax*100+"%",height:this.computedHeight,lineHeight:this.computedHeight}},progress:function(){var t=Math.pow(10,this.computedPrecision);return Math.round(100*t*this.value/this.computedMax)/t},computedMax:function(){return"number"==typeof this.max?this.max:this.$parent.max||100},computedHeight:function(){return this.$parent.height||this.height||"1rem"},computedVariant:function(){return this.variant||this.$parent.variant},computedPrecision:function(){return"number"==typeof this.precision?this.precision:this.$parent.precision||0},computedStriped:function(){return"boolean"==typeof this.striped?this.striped:this.$parent.striped||!1},computedAnimated:function(){return"boolean"==typeof this.animated?this.animated:this.$parent.animated||!1},computedShowProgress:function(){return"boolean"==typeof this.showProgress?this.showProgress:this.$parent.showProgress||!1},computedShowValue:function(){return"boolean"==typeof this.showValue?this.showValue:this.$parent.showValue||!1}},props:{value:{type:Number,default:0},label:{type:String,value:null},max:{type:Number,default:null},precision:{type:Number,default:null},variant:{type:String,default:null},striped:{type:Boolean,default:null},animated:{type:Boolean,default:null},showProgress:{type:Boolean,default:null},showValue:{type:Boolean,default:null},height:{type:String,default:null}}},progress={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"progress"},[t._t("default",[n("b-progress-bar",{attrs:{value:t.value,max:t.max,precision:t.precision,variant:t.variant,animated:t.animated,striped:t.striped,"show-progress":t.showProgress,"show-value":t.showValue,height:t.height}})])],2)},staticRenderFns:[],components:{bProgressBar:bProgressBar},props:{variant:{type:String,default:null},striped:{type:Boolean,default:!1},animated:{type:Boolean,default:!1},height:{type:String,default:"1rem"},precision:{type:Number,default:0},showProgress:{type:Boolean,default:!1},showValue:{type:Boolean,default:!1},max:{type:Number,default:100},value:{type:Number,default:0}}},commonjsGlobal="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},INFINITY=1/0,symbolTag="[object Symbol]",reAsciiWord=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,reLatin=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,rsAstralRange="\\ud800-\\udfff",rsComboMarksRange="\\u0300-\\u036f\\ufe20-\\ufe23",rsComboSymbolsRange="\\u20d0-\\u20f0",rsDingbatRange="\\u2700-\\u27bf",rsLowerRange="a-z\\xdf-\\xf6\\xf8-\\xff",rsMathOpRange="\\xac\\xb1\\xd7\\xf7",rsNonCharRange="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",rsPunctuationRange="\\u2000-\\u206f",rsSpaceRange=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",rsUpperRange="A-Z\\xc0-\\xd6\\xd8-\\xde",rsVarRange="\\ufe0e\\ufe0f",rsBreakRange=rsMathOpRange+rsNonCharRange+rsPunctuationRange+rsSpaceRange,rsApos="['’]",rsAstral="["+rsAstralRange+"]",rsBreak="["+rsBreakRange+"]",rsCombo="["+rsComboMarksRange+rsComboSymbolsRange+"]",rsDigits="\\d+",rsDingbat="["+rsDingbatRange+"]",rsLower="["+rsLowerRange+"]",rsMisc="[^"+rsAstralRange+rsBreakRange+rsDigits+rsDingbatRange+rsLowerRange+rsUpperRange+"]",rsFitz="\\ud83c[\\udffb-\\udfff]",rsModifier="(?:"+rsCombo+"|"+rsFitz+")",rsNonAstral="[^"+rsAstralRange+"]",rsRegional="(?:\\ud83c[\\udde6-\\uddff]){2}",rsSurrPair="[\\ud800-\\udbff][\\udc00-\\udfff]",rsUpper="["+rsUpperRange+"]",rsZWJ="\\u200d",rsLowerMisc="(?:"+rsLower+"|"+rsMisc+")",rsUpperMisc="(?:"+rsUpper+"|"+rsMisc+")",rsOptLowerContr="(?:"+rsApos+"(?:d|ll|m|re|s|t|ve))?",rsOptUpperContr="(?:"+rsApos+"(?:D|LL|M|RE|S|T|VE))?",reOptMod=rsModifier+"?",rsOptVar="["+rsVarRange+"]?",rsOptJoin="(?:"+rsZWJ+"(?:"+[rsNonAstral,rsRegional,rsSurrPair].join("|")+")"+rsOptVar+reOptMod+")*",rsSeq=rsOptVar+reOptMod+rsOptJoin,rsEmoji="(?:"+[rsDingbat,rsRegional,rsSurrPair].join("|")+")"+rsSeq,rsSymbol="(?:"+[rsNonAstral+rsCombo+"?",rsCombo,rsRegional,rsSurrPair,rsAstral].join("|")+")",reApos=RegExp(rsApos,"g"),reComboMark=RegExp(rsCombo,"g"),reUnicode=RegExp(rsFitz+"(?="+rsFitz+")|"+rsSymbol+rsSeq,"g"),reUnicodeWord=RegExp([rsUpper+"?"+rsLower+"+"+rsOptLowerContr+"(?="+[rsBreak,rsUpper,"$"].join("|")+")",rsUpperMisc+"+"+rsOptUpperContr+"(?="+[rsBreak,rsUpper+rsLowerMisc,"$"].join("|")+")",rsUpper+"?"+rsLowerMisc+"+"+rsOptLowerContr,rsUpper+"+"+rsOptUpperContr,rsDigits,rsEmoji].join("|"),"g"),reHasUnicode=RegExp("["+rsZWJ+rsAstralRange+rsComboMarksRange+rsComboSymbolsRange+rsVarRange+"]"),reHasUnicodeWord=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,deburredLetters={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"ss"},freeGlobal="object"==typeof commonjsGlobal&&commonjsGlobal&&commonjsGlobal.Object===Object&&commonjsGlobal,freeSelf="object"==typeof self&&self&&self.Object===Object&&self,root=freeGlobal||freeSelf||Function("return this")(),deburrLetter=basePropertyOf(deburredLetters),objectProto=Object.prototype,objectToString=objectProto.toString,Symbol=root.Symbol,symbolProto=Symbol?Symbol.prototype:void 0,symbolToString=symbolProto?symbolProto.toString:void 0,startCase=createCompounder(function(t,e,n){return t+(n?" ":"")+upperFirst$1(e)}),upperFirst$1=createCaseFirst("toUpperCase"),lodash_startcase$1=startCase,toString=function(t){return t?t instanceof Object?keys(t).map(function(e){return toString(t[e])}).join(" "):String(t):""},recToString=function(t){return t instanceof Object?toString(keys(t).reduce(function(e,n){return/^_/.test(n)||"state"===n||(e[n]=t[n]),e},{})):""},defaultSortCompare=function(t,e,n){return"number"==typeof t[n]&&"number"==typeof e[n]?t[n]<e[n]&&-1||t[n]>e[n]&&1||0:toString(t[n]).localeCompare(toString(e[n]),void 0,{numeric:!0})},table={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",{class:t.tableClass,attrs:{id:t.id||null,"aria-busy":t.computedBusy?"true":"false"}},[n("thead",{class:t.headClass},[n("tr",t._l(t.computedFields,function(e,i){return n("th",{key:i,class:t.fieldClass(e,i),style:e.thStyle||{},attrs:{"aria-label":e.sortable?t.localSortDesc&&t.localSortBy===i?t.labelSortAsc:t.labelSortDesc:null,"aria-sort":e.sortable&&t.localSortBy===i?t.localSortDesc?"descending":"ascending":null,tabindex:e.sortable?"0":null},on:{click:function(n){n.stopPropagation(),n.preventDefault(),t.headClicked(n,e,i)},keydown:[function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13))return null;n.stopPropagation(),n.preventDefault(),t.headClicked(n,e,i)},function(n){if(!("button"in n)&&t._k(n.keyCode,"space",32))return null;n.stopPropagation(),n.preventDefault(),t.headClicked(n,e,i)}]}},[t._t("HEAD_"+i,[n("div",{domProps:{innerHTML:t._s(e.label)}})],{label:e.label,column:i,field:e})],2)}))]),t.footClone?n("tfoot",{class:t.footClass},[n("tr",t._l(t.computedFields,function(e,i){return n("th",{key:i,class:t.fieldClass(e,i),style:e.thStyle||{},attrs:{"aria-label":e.sortable?t.localSortDesc&&t.localSortBy===i?t.labelSortAsc:t.labelSortDesc:null,"aria-sort":e.sortable&&t.localSortBy===i?t.localSortDesc?"descending":"ascending":null,tabindex:e.sortable?"0":null},on:{click:function(n){n.stopPropagation(),n.preventDefault(),t.headClicked(n,e,i)},keydown:[function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13))return null;n.stopPropagation(),n.preventDefault(),t.headClicked(n,e,i)},function(n){if(!("button"in n)&&t._k(n.keyCode,"space",32))return null;n.stopPropagation(),n.preventDefault(),t.headClicked(n,e,i)}]}},[t.$scopedSlots["FOOT_"+i]?t._t("FOOT_"+i,[n("div",{domProps:{innerHTML:t._s(e.label)}})],{label:e.label,column:i,field:e}):t._t("HEAD_"+i,[n("div",{domProps:{innerHTML:t._s(e.label)}})],{label:e.label,column:i,field:e})],2)}))]):t._e(),n("tbody",[t.$scopedSlots["top-row"]?n("tr",[t._t("top-row",null,{columns:t.keys(t.fields).length,fields:t.fields})],2):t._e(),t._l(t.computedItems,function(e,i){return n("tr",{key:i,class:t.rowClass(e),on:{click:function(n){t.rowClicked(n,e,i)},dblclick:function(n){t.rowDblClicked(n,e,i)},mouseenter:function(n){t.rowHovered(n,e,i)}}},[t._l(t.computedFields,function(r,o){return[n("td",{key:o,class:t.tdClass(r,e,o)},[t._t(o,[t._v(t._s(e[o]))],{value:e[o],item:e,index:i})],2)]})],2)}),!t.showEmpty||t.computedItems&&0!==t.computedItems.length?t._e():n("tr",[n("td",{attrs:{colspan:t.keys(t.computedFields).length}},[t.filter?n("div",{attrs:{role:"alert","aria-live":"polite"}},[t._t("emptyfiltered",[n("div",{staticClass:"text-center my-2",domProps:{innerHTML:t._s(t.emptyFilteredText)}})])],2):n("div",{attrs:{role:"alert","aria-live":"polite"}},[t._t("empty",[n("div",{staticClass:"text-center my-2",domProps:{innerHTML:t._s(t.emptyText)}})])],2)])]),t.$scopedSlots["bottom-row"]?n("tr",[t._t("bottom-row",null,{columns:t.keys(t.fields).length,fields:t.fields})],2):t._e()],2)])},staticRenderFns:[],mixins:[listenOnRootMixin],data:function(){return{localSortBy:this.sortBy||"",localSortDesc:this.sortDesc||!1,localItems:[],filteredItems:[],localBusy:this.busy}},props:{id:{type:String,default:""},items:{type:[Array,Function],default:function(){return[]}},sortBy:{type:String,default:null},sortDesc:{type:Boolean,default:!1},apiUrl:{type:String,default:""},fields:{type:[Object,Array],default:null},striped:{type:Boolean,default:!1},bordered:{type:Boolean,default:!1},inverse:{type:Boolean,default:!1},hover:{type:Boolean,default:!1},small:{type:Boolean,default:!1},responsive:{type:Boolean,default:!1},headVariant:{type:String,default:""},footVariant:{type:String,default:""},perPage:{type:Number,default:null},currentPage:{type:Number,default:1},filter:{type:[String,RegExp,Function],default:null},sortCompare:{type:Function,default:null},noProviderPaging:{type:Boolean,default:!1},noProviderSorting:{type:Boolean,default:!1},noProviderFiltering:{type:Boolean,default:!1},busy:{type:Boolean,default:!1},value:{type:Array,default:function(){return[]}},footClone:{type:Boolean,default:!1},labelSortAsc:{type:String,default:"Click to sort Ascending"},labelSortDesc:{type:String,default:"Click to sort Descending"},showEmpty:{type:Boolean,default:!1},emptyText:{type:String,default:"There are no records to show"},emptyFilteredText:{type:String,default:"There are no records matching your request"}},watch:{items:function(t,e){e!==t&&this._providerUpdate()},filteredItems:function(t,e){this.providerFiltering||t.length===e.length||this.$emit("filtered",t)},sortDesc:function(t,e){t!==this.localSortDesc&&(this.localSortDesc=t||!1)},localSortDesc:function(t,e){t!==e&&(this.$emit("update:sortDesc",t),this.noProviderSorting||this._providerUpdate())},sortBy:function(t,e){t!==this.localSortBy&&(this.localSortBy=t||null)},localSortBy:function(t,e){t!==e&&(this.$emit("update:sortBy",t),this.noProviderSorting||this._providerUpdate())},perPage:function(t,e){e===t||this.noProviderPaging||this._providerUpdate()},currentPage:function(t,e){e===t||this.noProviderPaging||this._providerUpdate()},filter:function(t,e){e===t||this.noProviderFiltering||this._providerUpdate()},localBusy:function(t,e){t!==e&&this.$emit("update:busy",t)}},mounted:function(){var t=this;this.localSortBy=this.sortBy,this.localSortDesc=this.sortDesc,this.localBusy=this.busy,this.hasProvider&&this._providerUpdate(),this.listenOnRoot("table::refresh",function(e){e===t.id&&t._providerUpdate()})},computed:{tableClass:function(){return["table","b-table",this.striped?"table-striped":"",this.hover?"table-hover":"",this.inverse?"table-inverse":"",this.bordered?"table-bordered":"",this.responsive?"table-responsive":"",this.small?"table-sm":""]},headClass:function(){return this.headVariant?"thead-"+this.headVariant:""},footClass:function(){var t=this.footVariant||this.headVariant||null;return t?"thead-"+t:""},hasProvider:function(){return this.items instanceof Function},providerFiltering:function(){return Boolean(this.hasProvider&&!this.noProviderFiltering)},providerSorting:function(){return Boolean(this.hasProvider&&!this.noProviderSorting)},providerPaging:function(){return Boolean(this.hasProvider&&!this.noProviderPaging)},context:function(){return{perPage:this.perPage,currentPage:this.currentPage,filter:this.filter,apiUrl:this.apiUrl,sortBy:this.localSortBy,sortDesc:this.localSortDesc}},computedFields:function(){var t;if(isArray(this.fields)?(t={},this.fields.filter(function(t){return t}).forEach(function(e){t[e.key||e]=e})):t=this.fields||{},0===keys(t).length&&this.computedItems.length>0){var e=this.computedItems[0];keys(e).forEach(function(e){t[e]=!0})}return keys(t).forEach(function(e){!1!==t[e]?!0!==t[e]?"function"!=typeof t[e]?"string"==typeof t[e]&&(t[e]={label:lodash_startcase$1(e)}):t[e]={label:lodash_startcase$1(e),formatter:t[e]}:t[e]={label:lodash_startcase$1(e)}:delete t[e]}),t},computedItems:function(){var t=this,e=this.perPage,n=this.currentPage,i=this.filter,r=this.localSortBy,o=this.localSortDesc,s=this.sortCompare||defaultSortCompare,a=this.hasProvider?this.localItems:this.items;if(!a)return this.$nextTick(this._providerUpdate),[];if(a=JSON.parse(JSON.stringify(a)),this.fields&&"[object Object]"===this.fields.toString()&&keys(this.fields).filter(function(e,n,i){return t.hasFormatter(t.fields[e])}).forEach(function(e){a.forEach(function(n){n[e]=t.callFormatter(n,e,t.fields[e])},t)},this),i&&!this.providerFiltering)if(i instanceof Function)a=a.filter(i);else{var l;l=i instanceof RegExp?i:new RegExp(".*"+i+".*","ig"),a=a.filter(function(t){var e=l.test(recToString(t));return l.lastIndex=0,e})}return this.providerFiltering||(this.filteredItems=a.slice()),r&&!this.providerSorting&&(a=a.sort(function(t,e){var n=s(t,e,r);return o?-1*n:n})),e&&!this.providerPaging&&(a=a.slice((n-1)*e,n*e)),this.$emit("input",a),a},computedBusy:function(){return this.busy||this.localBusy}},methods:{keys:keys,fieldClass:function(t,e){return[t.sortable?"sorting":"",t.sortable&&this.localSortBy===e?"sorting_"+(this.localSortDesc?"desc":"asc"):"",t.variant?"table-"+t.variant:"",t.class?t.class:"",t.thClass?t.thClass:""]},tdClass:function(t,e,n){var i="";return e._cellVariants&&e._cellVariants[n]&&(i=(this.inverse?"bg-":"table-")+e._cellVariants[n]),[t.variant&&!i?(this.inverse?"bg-":"table-")+t.variant:"",i,t.class?t.class:"",t.tdClass?t.tdClass:""]},rowClass:function(t){return[t._rowVariant?(this.inverse?"bg-":"table-")+t._rowVariant:""]},rowClicked:function(t,e,n){if(this.computedBusy)return t.preventDefault(),void t.stopPropagation();this.$emit("row-clicked",e,n,t)},rowDblClicked:function(t,e,n){if(this.computedBusy)return t.preventDefault(),void t.stopPropagation();this.$emit("row-dblclicked",e,n,t)},rowHovered:function(t,e,n){if(this.computedBusy)return t.preventDefault(),void t.stopPropagation();this.$emit("row-hovered",e,n,t)},headClicked:function(t,e,n){if(this.computedBusy)return t.preventDefault(),void t.stopPropagation();var i=!1;e.sortable?(n===this.localSortBy?this.localSortDesc=!this.localSortDesc:(this.localSortBy=n,this.localSortDesc=!1),i=!0):this.localSortBy&&(this.localSortBy=null,this.localSortDesc=!1,i=!0),this.$emit("head-clicked",n,e,t),i&&this.$emit("sort-changed",this.context)},refresh:function(){this.hasProvider&&this._providerUpdate()},_providerSetLocal:function(t){this.localItems=t&&t.length>0?t.slice():[],this.localBusy=!1,this.$emit("refreshed"),this.emitOnRoot("table::refreshed",this.id)},_providerUpdate:function(){var t=this;if(!this.computedBusy&&this.hasProvider){this.localBusy=!0;var e=this.items(this.context,this._providerSetLocal);e&&(e.then&&"function"==typeof e.then?e.then(function(e){t._providerSetLocal(e)}):this._providerSetLocal(e))}},hasFormatter:function(t){return t.formatter&&("function"==typeof t.formatter||"string"==typeof t.formatter)},callFormatter:function(t,e,n){return n.formatter&&"function"==typeof n.formatter?n.formatter(t[e],e,t):n.formatter&&"function"==typeof this.$parent[n.formatter]?this.$parent[n.formatter](t[e],e,t):void 0}}},tabs={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(t.tag,{tag:"component",staticClass:"tabs",attrs:{id:t.safeId()}},[t.bottom?n("div",{ref:"tabsContainer",class:["tab-content",{"card-body":t.card}],attrs:{id:t.safeId("_BV_tab_container_")}},[t._t("default"),t.tabs&&t.tabs.length?t._e():t._t("empty")],2):t._e(),n("div",{class:{"card-header":t.card}},[n("ul",{class:["nav","nav-"+t.navStyle,t.card?"card-header-"+t.navStyle:null],attrs:{role:"tablist",tabindex:"0"},on:{keydown:[function(e){return"button"in e||!t._k(e.keyCode,"left",37)?"button"in e&&0!==e.button?null:void t.previousTab(e):null},function(e){if(!("button"in e)&&t._k(e.keyCode,"up",38))return null;t.previousTab(e)},function(e){return"button"in e||!t._k(e.keyCode,"right",39)?"button"in e&&2!==e.button?null:void t.nextTab(e):null},function(e){if(!("button"in e)&&t._k(e.keyCode,"down",40))return null;t.nextTab(e)},function(e){return("button"in e||!t._k(e.keyCode,"left",37))&&e.shiftKey?"button"in e&&0!==e.button?null:void t.setTab(0,!1,1):null},function(e){return("button"in e||!t._k(e.keyCode,"up",38))&&e.shiftKey?void t.setTab(0,!1,1):null},function(e){return("button"in e||!t._k(e.keyCode,"right",39))&&e.shiftKey?"button"in e&&2!==e.button?null:void t.setTab(t.tabs.length-1,!1,-1):null},function(e){return("button"in e||!t._k(e.keyCode,"down",40))&&e.shiftKey?void t.setTab(t.tabs.length-1,!1,-1):null}]}},[t._l(t.tabs,function(e,i){return n("li",{staticClass:"nav-item",attrs:{role:"presentation"}},[e.headHtml?n("div",{class:["tab-head",{small:t.small,active:e.localActive,disabled:e.disabled}],attrs:{role:"heading",tabindex:"-1"},domProps:{innerHTML:t._s(e.headHtml)}}):n("a",{class:["nav-link",{small:t.small,active:e.localActive,disabled:e.disabled}],attrs:{href:e.href,role:"tab","aria-setsize":t.tabs.length,"aria-posinset":t.currentTab+1,"aria-selected":e.localActive?"true":"false","aria-expanded":e.localActive?"true":"false","aria-controls":t.safeId("_BV_tab_container_"),"aria-disabled":e.disabled,id:e.controlledBy||t.safeId("_BV_tab_${index+1}_"),tabindex:"-1"},domProps:{innerHTML:t._s(e.title)},on:{click:function(e){e.preventDefault(),e.stopPropagation(),t.setTab(i)},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"space",32))return null;e.preventDefault(),e.stopPropagation(),t.setTab(i)},function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;e.preventDefault(),e.stopPropagation(),t.setTab(i)}]}})])}),t._t("tabs")],2)]),t.bottom?t._e():n("div",{ref:"tabsContainer",class:["tab-content",{"card-body":t.card}],attrs:{id:t.safeId("_BV_tab_container_")}},[t._t("default"),t.tabs&&t.tabs.length?t._e():t._t("empty")],2)])},staticRenderFns:[],mixins:[idMixin],data:function(){return{currentTab:this.value,tabs:[]}},props:{tag:{type:String,default:"div"},card:{type:Boolean,default:!1},small:{type:Boolean,default:!1},value:{type:Number,default:null},pills:{type:Boolean,default:!1},bottom:{type:Boolean,default:!1},noFade:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1}},watch:{currentTab:function(t,e){t!==e&&(this.$root.$emit("changed::tab",this,t,this.tabs[t]),this.$emit("input",t),this.tabs[t].$emit("click"))},value:function(t,e){if(t!==e){"number"!=typeof e&&(e=0);var n=t<e?-1:1;this.setTab(t,!1,n)}}},computed:{fade:function(){return!this.noFade},navStyle:function(){return this.pills?"pills":"tabs"}},methods:{sign:function(t){return 0===t?0:t>0?1:-1},nextTab:function(){this.setTab(this.currentTab+1,!1,1)},previousTab:function(){this.setTab(this.currentTab-1,!1,-1)},setTab:function(t,e,n){var i=this;if(n=this.sign(n||0),t=t||0,e||t!==this.currentTab){var r=this.tabs[t];r?r.disabled?n&&this.setTab(t+n,e,n):(this.tabs.forEach(function(t){t===r?i.$set(t,"localActive",!0):i.$set(t,"localActive",!1)}),this.currentTab=t):this.$emit("input",this.currentTab)}},updateTabs:function(){this.tabs=this.$children.filter(function(t){return t._isTab});var t=null;if(this.tabs.forEach(function(e,n){e.localActive&&!e.disabled&&(t=n)}),null===t){if(this.currentTab>=this.tabs.length)return void this.setTab(this.tabs.length-1,!0,-1);this.tabs[this.currentTab]&&!this.tabs[this.currentTab].disabled&&(t=this.currentTab)}null===t&&this.tabs.forEach(function(e,n){e.disabled||null!==t||(t=n)}),this.setTab(t||0,!0,0)}},mounted:function(){this.updateTabs(),observeDOM(this.$refs.tabsContainer,this.updateTabs.bind(this),{subtree:!1})}},tab={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{mode:"out-in"},on:{"before-enter":t.beforeEnter,"after-enter":t.afterEnter,"after-leave":t.afterLeave}},[t.localActive||!t.computedLazy?n(t.tag,{directives:[{name:"show",rawName:"v-show",value:t.localActive,expression:"localActive"}],ref:"panel",tag:"component",class:t.tabClasses,attrs:{id:t.safeId(),role:"tabpanel","aria-hidden":t.localActive?"false":"true","aria-expanded":t.localActive?"true":"false","aria-lablelledby":t.controlledBy||null}},[t._t("default")],2):t._e()],1)},staticRenderFns:[],mixins:[idMixin],methods:{beforeEnter:function(){this.show=!1},afterEnter:function(){this.show=!0},afterLeave:function(){this.show=!1}},data:function(){return{localActive:this.active&&!this.disabled,show:!1}},mounted:function(){this.show=this.localActive},computed:{tabClasses:function(){return["tab-pane",this.show?"show":"",this.computedFade?"fade":"",this.disabled?"disabled":"",this.localActive?"active":""]},controlledBy:function(){return this.buttonId||this.safeId("__BV_tab_button__")},computedFade:function(){return this.$parent.fade},computedLazy:function(){return this.$parent.lazy},_isTab:function(){return!0}},props:{active:{type:Boolean,default:!1},tag:{type:String,default:"div"},buttonId:{type:String,default:""},title:{type:String,default:""},headHtml:{type:String,default:null},disabled:{type:Boolean,default:!1},href:{type:String,default:"#"}}},tooltip={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"d-none",attrs:{"aria-hidden":"true"}},[n("div",{ref:"title"},[t._t("default")],2)])},staticRenderFns:[],data:function(){return{toolTip:null}},props:{target:{type:[String,Object]},targetId:{type:String,default:null},title:{type:String,default:""},triggers:{type:[String,Array],default:"hover focus"},placement:{type:String,default:"top"},delay:{type:Number,default:0},offset:{type:[Number,String],default:0},noFade:{type:Boolean,default:!1}},mounted:function(){var t=this;this.$nextTick(function(){var e=t.getTarget();e?(t.toolTip=new ToolTip(e,t.getConfig(),t.$root),t.$on("close",t.onClose),observeDOM(t.$refs.title,t.updatePosition.bind(t),{subtree:!0,childList:!0,attributes:!0,attributeFilter:["class","style"]})):warn("b-tooltip: 'target' element not found!")})},updated:function(){this.toolTip&&this.toolTip.updateConfig(this.getConfig())},beforeDestroy:function(){this.$off("close",this.onClose),this.toolTip&&(this.toolTip.destroy(),this.tooltip=null),this.bringItBack()},computed:{baseConfig:function(){return{title:this.title.trim()||"",placement:this.placement||"top",delay:parseInt(this.delay,10)||0,offset:this.offset||0,animation:Boolean(this.noFade),trigger:isArray(this.triggers)?this.triggers.join(" "):this.triggers}}},methods:{onClose:function(t){this.toolTip?this.toolTip.hide(t):"function"==typeof t&&t()},updatePosition:function(){this.toolTip&&this.toolTip.update()},getConfig:function(){var t=assign({},this.baseConfig);return this.$refs.title.innerHTML.trim()&&(t.title=this.$refs.title,t.html=!0),t.callbacks={show:this.onShow,shown:this.onShown,hide:this.onHide,hidden:this.onHidden},t},getTarget:function(){var t=this.target;return"string"==typeof t?document.getElementById(/^#/.test(t)?t.slice(1):t)||null:"object"==typeof t&&t.$el?t.$el:"object"==typeof t&&t.tagName?t:null},onShow:function(t){this.$emit("show",t)},onShown:function(t){this.$emit("shown",t)},onHide:function(t){this.$emit("hide",t)},onHidden:function(t){this.bringItBack(),this.$emit("hidden",t)},bringItBack:function(){this.$el&&this.$refs.title&&this.$el.appendChild(this.$refs.title)}}},components=Object.freeze({bAlert:alert,bBreadcrumb:breadcrumb,bBreadcrumbItem:BreadcrumbItem,bBreadcrumbLink:BreadcrumbLink,bButton:bBtn,bBtn:bBtn,bButtonToolbar:buttonToolbar,bBtnToolbar:buttonToolbar,bButtonGroup:buttonGroup,bBtnGroup:buttonGroup,bInputGroup:inputGroup,bInputGroupAddon:bInputGroupAddon,bInputGroupButton:inputGroupButton,bInputGroupBtn:inputGroupButton,bCol:col,bContainer:Container,bCard:card,bCardBody:CardBody,bCardHeader:CardHeader,bCardFooter:CardFooter,bCardGroup:cardGroup,bCardImg:CardImg,bDropdown:dropdown,bDd:dropdown,bDropdownItem:dropdownItem,bDdItem:dropdownItem,bDropdownItemButton:dropdownItemButton,bDdItemBtn:dropdownItemButton,bDdItemButton:dropdownItemButton,bDropdownItemBtn:dropdownItemButton,bDropdownDivider:dropdownDivider,bDdDivider:dropdownDivider,bDropdownHeader:dropdownHeader,bDdHeader:dropdownHeader,bForm:Form,bFormRow:bFormRow,bFormText:bFormText,bFormFeedback:bFormFeedback,bFormCheckbox:formCheckbox,bFormGroup:formGroup,bFormFieldset:formGroup,bFormFile:formFile,bFormRadio:formRadio,bFormInput:formInput,bFormTextarea:formTextarea,bFormSelect:formSelect,bImg:bImg,bImgLazy:imgLazy,bJumbotron:jumbotron,bBadge:badge,bMedia:media,bMediaBody:MediaBody,bMediaAside:MediaAside,bModal:modal,bNavbar:navbar,bNavbarBrand:navbarBrand,bNavText:navText,bNavForm:navForm,bRow:row,bPagination:pagination,bPaginationNav:paginationNav,bPopover:popover,bProgressBar:bProgressBar,bProgress:progress,bTable:table,bTooltip:tooltip,bTab:tab,bTabs:tabs,bNav:nav,bNavItem:navItem,bNavItemDropdown:navItemDropdown,bNavToggle:navToggle,bListGroupItem:listGroupItem,bListGroup:listGroup,bCarouselSlide:carouselSlide,bCarousel:carousel,bCollapse:collapse,bLink:bLink}),all_listen_types={hover:!0,click:!0,focus:!0},inBrowser$1="undefined"!=typeof window,listen_types={click:!0},BVT="__BV_toggle__",EVENT_TOGGLE="collapse::toggle",EVENT_STATE="collapse::toggle::state",toggle={bind:function(t,e,n){var i=targets(n,e,listen_types,function(t){var e=t.targets,n=t.vnode;e.forEach(function(t){n.context.$root.$emit(EVENT_TOGGLE,t)})});inBrowser$1&&n.context&&i.length>0&&(t.setAttribute("aria-controls",i.join(" ")),t.setAttribute("aria-expanded","false"),t[BVT]=function(e,n){-1!==i.indexOf(e)&&(t.setAttribute("aria-expanded",n?"true":"false"),n?t.classList.remove("collapsed"):t.classList.add("collapsed"))},n.context.$root.$on(EVENT_STATE,t[BVT]))},unbind:function(t,e,n){t[BVT]&&(n.context.$root.$off(EVENT_STATE,t[BVT]),t[BVT]=null)}},listen_types$1={click:!0},modal$1={bind:function(t,e,n){targets(n,e,listen_types$1,function(t){var e=t.targets,n=t.vnode;e.forEach(function(t){n.context.$root.$emit("show::modal",t,n.elm)})})}},inBrowser$2="undefined"!=typeof window,isServer=!inBrowser$2;inBrowser$2&&window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(t){var e,n=(this.document||this.ownerDocument).querySelectorAll(t),i=this;do{for(e=n.length;--e>=0&&n.item(e)!==i;);}while(e<0&&(i=i.parentElement));return i});var NAME$2="v-b-scrollspy",EVENT="scrollspy::activate",BVSS="__BV_ScrollSpy__",Default={element:"body",offset:10,method:"auto",throttle:100},DefaultType={element:"(string|element)",offset:"number",method:"string",throttle:"number"},ClassName$2={DROPDOWN_ITEM:"dropdown-item",DROPDOWN_MENU:"dropdown-menu",DROPDOWN_TOGGLE:"dropdown-toggle",NAV_LINK:"nav-link",LIST_ITEM:"list-group-item",ACTIVE:"active"},Selector$2={ACTIVE:".active",NAV_LIST_GROUP:".nav, .list-group",NAV:".nav",LIST_GROUP:".list-group",NAV_LINKS:".nav-link",LIST_ITEMS:".list-group-item",DROPDOWN:".dropdown",DROPDOWN_ITEMS:".dropdown-item",DROPDOWN_TOGGLE:".dropdown-toggle"},OffsetMethod={OFFSET:"offset",POSITION:"position"};ScrollSpy.prototype.updateConfig=function(t){var e=this;t.arg&&(this._config.element="#"+t.arg),keys(t.modifiers).forEach(function(t){/^\d+$/.test(t)?e._config.offset=parseInt(t,10):/^(auto|position|offset)$/.test(t)&&(e._config.method=t)}),"string"==typeof t.value?this._config.element=t.value:"number"==typeof t.value?this._config.offset=Math.round(t.value):"object"==typeof t.value&&keys(t.value).filter(function(t){return Boolean(DefaultType[t])}).forEach(function(n){e._config[n]=t.value[n]}),typeCheckConfig(NAME$2,this._config,DefaultType);var n=getVm(this._$el);return!this._$root&&n&&n.$root&&(this._$root=n.$root),this},ScrollSpy.prototype.listen=function(){var t=this._getScroller();return t&&("BODY"!==t.tagName&&t.addEventListener("scroll",this,!1),window.addEventListener("scroll",this,!1),window.addEventListener("orientationchange",this,!1),window.addEventListener("resize",this,!1)),this},ScrollSpy.prototype.unListen=function(){var t=this._getScroller();return t&&("BODY"!==t.tagName&&t.removeEventListener("scroll",this,!1),window.removeEventListener("scroll",this,!1),window.removeEventListener("orientationchange",this,!1),window.removeEventListener("resize",this,!1)),this},ScrollSpy.prototype.refresh=function(){var t=this,e=this._getScroller();if(!e)return this;var n="BODY"===e.tagName?OffsetMethod.OFFSET:OffsetMethod.POSITION,i="auto"===this._config.method?n:this._config.method,r=i===OffsetMethod.OFFSET?0:this._getScrollTop();return this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),$QSA(this._selector,this._$el).map(function(t){var n=t.getAttribute("href");if(n&&"#"===n.charAt(0)&&"#"!==n&&-1===n.indexOf("#/")){var o=$QS(n,e);if(!o)return null;var s=o.getBoundingClientRect();if(s.width||s.height)return{offset:(i===OffsetMethod.OFFSET?s.top:o.offsetTop)+r,href:n}}return null}).filter(function(t){return t}).sort(function(t,e){return t.offset-e.offset}).forEach(function(e){t._offsets.push(e.offset),t._targets.push(e.href)}),this},ScrollSpy.prototype.process=function(){var t=this;if(!this._getScroller)return this;var e=this._getScrollTop()+this._config.offset,n=this._getScrollHeight(),i=this._config.offset+n-this._getOffsetHeight();if(this._scrollHeight!==n&&this.refresh(),e>=i){var r=this._targets[this._targets.length-1];return this._activeTarget!==r&&this._activate(r),this}if(this._activeTarget&&e<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,this._clear(),this;for(var o=this._offsets.length;o--;)t._activeTarget!==t._targets[o]&&e>=t._offsets[o]&&(void 0===t._offsets[o+1]||e<t._offsets[o+1])&&t._activate(t._targets[o]);return this},ScrollSpy.prototype.scheduleRefresh=function(){return this.handleEvent({type:"resize"}),this},ScrollSpy.prototype.dispose=function(){this.unListen(),clearTimeout(this._resizeTimeout),this._resizeTimeout=null,this._$el=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null,this._$root=null},ScrollSpy.prototype.handleEvent=function(t){var e=this;"scroll"===t.type?this.process():"orientationchange"!==t.type&&"resize"!==t.type||(clearTimeout(e._resizeTimeout),e._resizeTimeout=setTimeout(function(){e.refresh().process()},e._config.throttle||Default.throttle))},ScrollSpy.prototype._getScroller=function(){if(isServer)return null;var t=this._config.element;return t?t&&isElement(t)?t:"string"==typeof t?"body"===t?document.body:$QS(t):null:null},ScrollSpy.prototype._getScrollTop=function(){var t=this._getScroller();return t?"BODY"===t.tagName?window.pageYOffset:t.scrollTop:0},ScrollSpy.prototype._getScrollHeight=function(){var t=this._getScroller();return t?"BODY"===t.tagName?Math.max(document.body.scrollHeight,document.documentElement.scrollHeight):t.scrollHeight:0},ScrollSpy.prototype._getOffsetHeight=function(){var t=this._getScroller();return t?"BODY"===t.tagName?window.innerHeight:t.getBoundingClientRect().height:0},ScrollSpy.prototype._activate=function(t){var e=this;this._activeTarget=t,this._clear();var n=this._selector.split(","),i=$QSA((n=n.map(function(e){return e+'[href="'+t+'"]'})).join(","),this._$el);i.forEach(function(t){if(t.classList.contains(ClassName$2.DROPDOWN_ITEM)){var n=closest(t,Selector$2.DROPDOWN);if(n){var i=$QS(Selector$2.DROPDOWN_TOGGLE,n);i&&e._setActiveState(i,!0)}e._setActiveState(t,!0)}else e._setActiveState(t,!0),e._setParentsSiblingActiveState(t,Selector$2.NAV_LIST_GROUP,[ClassName$2.NAV_LINK,ClassName$2.LIST_ITEM],!0)}),i&&i.length>0&&this._$root&&this._$root.$emit&&this._$root.$emit(EVENT,t)},ScrollSpy.prototype._clear=function(){var t=this;$QSA(this._selector,this._$el).filter(function(t){if(t.classList.contains(ClassName$2.ACTIVE)){var e=t.getAttribute("href");return"#"===e.charAt(0)&&0!==e.indexOf("#/")}return!1}).forEach(function(e){t._setActiveState(e,!1)})},ScrollSpy.prototype._setActiveState=function(t,e){if(t){var n=getVm(t);n&&Object.prototype.hasOwnProperty.call(n.$props,"active")?n.$props.active=e:t.classList[e?"add":"remove"](ClassName$2.ACTIVE)}},ScrollSpy.prototype._setParentsSiblingActiveState=function(t,e,n,i){var r=this;if(n){isArray(n)||(n=[n]);for(var o=t;o;)if((o=closest(o,e))&&o.previousElementSibling)for(var s=0;s<n.length-1;s++)o.previousElementSibling.classList.contains(n[s])&&r._setActiveState(o,i)}};var scrollspy={bind:function(t,e,n){isServer||addBVSS(t,e,n).scheduleRefresh()},inserted:function(t,e,n){isServer||addBVSS(t,e,n).refresh().process().scheduleRefresh()},update:function(t,e,n){isServer||addBVSS(t,e,n).refresh().process().scheduleRefresh()},componentUpdated:function(t,e,n){isServer||addBVSS(t,e,n).refresh().process().scheduleRefresh()},unbind:function(t){isServer||removeBVSS(t)}},inBrowser$3="undefined"!=typeof window&&"undefined"!=typeof document,BVTT="__BV_ToolTip__",validTriggers={focus:!0,hover:!0,click:!0,blur:!0},tooltip$1={bind:function(t,e,n){applyBVTT(t,e,n)},inserted:function(t,e,n){applyBVTT(t,e,n)},update:function(t,e,n){e.value!==e.oldValue&&applyBVTT(t,e,n)},componentUpdated:function(t,e,n){e.value!==e.oldValue&&applyBVTT(t,e,n)},unbind:function(t){removeBVTT(t)}},inBrowser$4="undefined"!=typeof window&&"undefined"!=typeof document,BVPO="__BV_PopOver__",validTriggers$1={focus:!0,hover:!0,click:!0,blur:!0},popover$1={bind:function(t,e,n){applyBVPO(t,e,n)},inserted:function(t,e,n){applyBVPO(t,e,n)},update:function(t,e,n){e.value!==e.oldValue&&applyBVPO(t,e,n)},componentUpdated:function(t,e,n){e.value!==e.oldValue&&applyBVPO(t,e,n)},unbind:function(t){removeBVPO(t)}},directives=Object.freeze({bToggle:toggle,bModal:modal$1,bScrollspy:scrollspy,bTooltip:tooltip$1,bPopover:popover$1}),VuePlugin={install:function(t){if(!t._bootstrap_vue_installed){t._bootstrap_vue_installed=!0;for(var e in components)t.component(e,components[e]);for(var n in directives)t.directive(n,directives[n])}}};"undefined"!=typeof window&&window.Vue&&window.Vue.use(VuePlugin);/* harmony default export */ __webpack_exports__["a"] = (VuePlugin);
//# sourceMappingURL=bootstrap-vue.esm.js.map

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./bootstrap-vue.css", function() {
			var newContent = require("!!../../css-loader/index.js!./bootstrap-vue.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./bootstrap.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./bootstrap.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(26)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(23),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.4.4
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
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
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
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

var _toString = Object.prototype.toString;

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
  var n = parseFloat(val);
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
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
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,is');

/**
 * Remove an item from an array
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
 * Check whether the object has the property.
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
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

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

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


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
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
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
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

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
var bailRE = /[^\w.$]/;
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

var warn = noop;
var tip = noop;
var formatComponentName = (null); // work around flow check

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
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
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

  var generateComponentTrace = function (vm) {
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

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (false) {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

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
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
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

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
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
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
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


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
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
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
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
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
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
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
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
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
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
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
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
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
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
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this) : parentVal
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
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
    return mergeDataOrFn.call(this, parentVal, childVal)
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
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
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
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
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
strats.watch = function (parentVal, childVal) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
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
strats.computed = function (parentVal, childVal) {
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
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
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
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options) {
  var inject = options.inject;
  if (Array.isArray(inject)) {
    var normalized = options.inject = {};
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = inject[i];
    }
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
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

  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
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
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (false) {
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
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
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

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

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
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
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
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
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
      perf.clearMeasures(name);
    };
  }
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
  this.functionalContext = undefined;
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

var prototypeAccessors = { child: {} };

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
function cloneVNode (vnode, deep) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
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
  cloned.isCloned = true;
  if (deep && vnode.children) {
    cloned.children = cloneVNodes(vnode.children);
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  var plain = !(passive || once$$1 || capture);
  return {
    name: name,
    plain: plain,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

// #6552
function prioritizePlainEvents (a, b) {
  return a.plain ? -1 : b.plain ? 1 : 0
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  var toAdd = [];
  var hasModifier = false;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (!event.plain) { hasModifier = true; }
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      event.handler = cur;
      toAdd.push(event);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  if (toAdd.length) {
    if (hasModifier) { toAdd.sort(prioritizePlainEvents); }
    for (var i = 0; i < toAdd.length; i++) {
      var event$1 = toAdd[i];
      add(event$1.name, event$1.handler, event$1.once, event$1.capture, event$1.passive);
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
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
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

function ensureCtor (comp, base) {
  if (comp.__esModule && comp.default) {
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
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
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

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
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
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
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
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      data && data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

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
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
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
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
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
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
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
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
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
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
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

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
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
    if (vm._watcher === watcher && vm._isMounted) {
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
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
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
      this.getter = function () {};
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
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
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
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
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

function checkOptionType (vm, name) {
  var option = vm.$options[name];
  if (!isPlainObject(option)) {
    warn(
      ("component option \"" + name + "\" should be an object."),
      vm
    );
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
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (false) {
      if (isReservedAttribute(key) || config.isReservedAttr(key)) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
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
  observerState.shouldConvert = true;
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
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  "production" !== 'production' && checkOptionType(vm, 'computed');
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
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
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

function initMethods (vm, methods) {
  "production" !== 'production' && checkOptionType(vm, 'methods');
  var props = vm.$options.props;
  for (var key in methods) {
    if (false) {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
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
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  "production" !== 'production' && checkOptionType(vm, 'watch');
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
  keyOrFn,
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
  return vm.$watch(keyOrFn, handler, options)
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
    dataDef.set = function (newData) {
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
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
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
    observerState.shouldConvert = false;
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
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject).filter(function (key) {
          /* istanbul ignore next */
          return Object.getOwnPropertyDescriptor(inject, key).enumerable
        })
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (false) {
        warn(("Injection \"" + key + "\" not found"), vm);
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || emptyObject,
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
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
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
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

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

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
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
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
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
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
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
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
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
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
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
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
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      props = extend(extend({}, bindObject), props);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "production" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
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

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
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
        if (!(key in hash)) {
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
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
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
        on[key] = existing ? [].concat(ours, existing) : ours;
      }
    }
  }
  return data
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
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
    defineReactive$$1(vm, '$listeners', vm.$options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', vm.$options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        if (slot._rendered) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (false) {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
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

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
  Vue.prototype._g = bindObjectListeners;
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {
      startTag = "vue-perf-init:" + (vm._uid);
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
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
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
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (false
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

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
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
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
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
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

var patternTypes = [String, RegExp, Array];

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

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
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

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.4.4';

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
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
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

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
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
	setAttribute: setAttribute
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
  if (!key) { return }

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

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
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
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
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
        inPre--;
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
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
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
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
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
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
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

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
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
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (false) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
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
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
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

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    if (false) {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
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
                bailed = true;
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
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
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
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
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
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
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
            }
            ancestor = ancestor.parent;
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
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
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
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
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
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
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
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
  if (isBooleanAttr(key)) {
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
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
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



function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */


/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var str;
var index$1;

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

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
    if (isUndef(props[key])) {
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
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number) {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
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
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
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
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
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
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
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
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
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
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

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
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
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

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
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
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
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
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
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
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
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
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
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
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
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

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
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
    if (value === oldValue) { return }
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
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

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

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$options._renderChildren;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
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
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
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

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

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

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
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
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
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
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (false) {
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

/*  */

/* harmony default export */ __webpack_exports__["a"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  'zh': {
    'days': ['日', '一', '二', '三', '四', '五', '六'],
    'months': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    'pickers': ['未来7天', '未来30天', '最近7天', '最近30天'],
    'placeholder': {
      'date': '请选择日期',
      'dateRange': '请选择日期范围'
    }
  },
  'en': {
    'days': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'months': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'pickers': ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'This Month', 'Last Month'],
    'placeholder': {
      'date': 'Select Date',
      'dateRange': 'Select Date Range'
    }
  },
  'es': {
    'days': ['Dom', 'Lun', 'mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    'months': ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    'pickers': ['próximos 7 días', 'próximos 30 días', '7 dás anteriores', '30 das anteriores'],
    'placeholder': {
      'date': 'Seleccionar fecha',
      'dateRange': 'Seleccionar un rango de fechas'
    }
  }
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bootstrap_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bootstrap_dist_css_bootstrap_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bootstrap_dist_css_bootstrap_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bootstrap_dist_css_bootstrap_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bootstrap_vue_dist_bootstrap_vue_css__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bootstrap_vue_dist_bootstrap_vue_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_bootstrap_vue_dist_bootstrap_vue_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__App_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__App_vue__);






__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_bootstrap_vue__["a" /* default */]);

new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({ // eslint-disable-line
  el: '#app',
  render: h => h(__WEBPACK_IMPORTED_MODULE_4__App_vue___default.a)
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    startAt: null,
    endAt: null,
    value: null,
    show: Boolean
  },
  data() {
    const translation = this.$parent.translation;
    return {
      months: translation.months,
      dates: [],
      now: new Date(),
      years: [],
      currentPanel: 'date'
    };
  },
  computed: {
    days() {
      const days = this.$parent.translation.days;
      const firstday = +this.$parent.firstDayOfWeek;
      return days.concat(days).slice(firstday, firstday + 7);
    },
    currentYear() {
      return this.now.getFullYear();
    },
    currentMonth() {
      return this.now.getMonth();
    }
  },
  created() {
    this.updateCalendar();
  },
  watch: {
    show(val) {
      if (val) {
        this.currentPanel = 'date';
        this.updateNow();
      }
    },
    value: {
      handler: 'updateNow',
      immediate: true
    },
    now: 'updateCalendar'
  },
  methods: {
    updateNow() {
      let now = this.value ? new Date(this.value) : new Date();
      now.setDate(1);
      this.now = now;
    },
    updateCalendar() {
      function getCalendar(time, firstday, length, classes) {
        return Array.apply(null, { length }).map((v, i) => {
          let day = firstday + i;
          const date = new Date(time.getFullYear(), time.getMonth(), day, 0, 0, 0);
          return {
            title: date.toLocaleDateString(),
            date,
            day,
            classes
          };
        });
      }
      const firstDayOfWeek = this.$parent.firstDayOfWeek;
      const time = new Date(this.now);
      time.setDate(0); // 把时间切换到上个月最后一天
      const lastMonthLength = (time.getDay() + 7 - firstDayOfWeek) % 7 + 1; // time.getDay() 0是星期天, 1是星期一 ...
      const lastMonthfirst = time.getDate() - (lastMonthLength - 1);
      const lastMonth = getCalendar(time, lastMonthfirst, lastMonthLength, 'lastMonth');

      time.setMonth(time.getMonth() + 2, 0); // 切换到这个月最后一天
      const curMonthLength = time.getDate();
      const curMonth = getCalendar(time, 1, curMonthLength, 'curMonth');

      time.setMonth(time.getMonth() + 1, 1);
      const nextMonthLength = 42 - (lastMonthLength + curMonthLength);
      const nextMonth = getCalendar(time, 1, nextMonthLength, 'nextMonth');

      // 分割数组
      let index = 0;
      let resIndex = 0;
      const arr = lastMonth.concat(curMonth, nextMonth);
      const result = new Array(6);
      while (index < 42) {
        result[resIndex++] = arr.slice(index, index += 7);
      }
      this.dates = result;
    },
    getClasses(cell) {
      const classes = [];
      const cellTime = cell.date.getTime();
      const curTime = this.value ? new Date(this.value).setHours(0, 0, 0, 0) : 0;
      const startTime = this.startAt ? new Date(this.startAt).setHours(0, 0, 0, 0) : 0;
      const endTime = this.endAt ? new Date(this.endAt).setHours(0, 0, 0, 0) : 0;
      const today = new Date().setHours(0, 0, 0, 0);

      if (this.$parent.disabledDays.some(v => +new Date(v) === +cell.date) || this.$parent.notBefore !== '' && cell.date.getTime() < new Date(this.$parent.notBefore).getTime() || this.$parent.notAfter !== '' && cell.date.getTime() > new Date(this.$parent.notAfter).getTime()) {
        return 'disabled';
      }

      classes.push(cell.classes);

      if (cellTime === today) {
        classes.push('today');
      }

      if (cellTime === curTime) {
        classes.push('current');
      } else if (startTime) {
        if (cellTime < startTime) {
          classes.push('disabled');
        } else if (curTime && cellTime <= curTime) {
          classes.push('inrange');
        }
      } else if (endTime) {
        if (cellTime > endTime) {
          classes.push('disabled');
        } else if (curTime && cellTime >= curTime) {
          classes.push('inrange');
        }
      }
      return classes.join(' ');
    },
    showMonths() {
      if (this.currentPanel === 'months') {
        this.currentPanel = 'date';
      } else {
        this.currentPanel = 'months';
      }
    },
    showYears() {
      // 当前年代
      if (this.currentPanel === 'years') {
        this.currentPanel = 'date';
      } else {
        let firstYear = Math.floor(this.now.getFullYear() / 10) * 10;
        let years = [];
        for (let i = 0; i < 10; i++) {
          years.push(firstYear + i);
        }
        this.years = years;
        this.currentPanel = 'years';
      }
    },
    // 前进或后退一年
    changeYear(flag) {
      if (this.currentPanel === 'years') {
        this.years = this.years.map(v => v + flag * 10);
      } else {
        const now = new Date(this.now);
        now.setFullYear(now.getFullYear() + flag);
        this.now = now;
      }
    },
    changeMonth(flag) {
      const now = new Date(this.now);
      now.setMonth(now.getMonth() + flag);
      this.now = now;
    },
    selectDate(cell) {
      const classes = this.getClasses(cell);
      if (classes.indexOf('disabled') !== -1) {
        return;
      }
      this.$emit('input', cell.date);
      this.$emit('select');
    },
    selectYear(year) {
      const now = new Date(this.now);
      now.setFullYear(year);
      this.now = now;
      this.currentPanel = 'months';
    },
    selectMonth(month) {
      const now = new Date(this.now);
      now.setMonth(month);
      this.now = now;
      this.currentPanel = 'date';
    }
  }
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar_panel_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar_panel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__calendar_panel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__languages_js__ = __webpack_require__(10);
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
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  components: { CalendarPanel: __WEBPACK_IMPORTED_MODULE_0__calendar_panel_vue___default.a },
  props: {
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    range: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: 210
    },
    placeholder: String,
    lang: {
      type: String,
      default: 'zh'
    },
    value: null,
    shortcuts: {
      type: [Boolean, Array],
      default: true
    },
    disabledDays: {
      type: Array,
      default: function () {
        return [];
      }
    },
    notBefore: {
      type: String,
      default: ''
    },
    notAfter: {
      type: String,
      default: ''
    },
    firstDayOfWeek: {
      default: 7,
      type: Number,
      validator: val => val >= 1 && val <= 7
    }
  },
  data() {
    return {
      showPopup: false,
      showCloseIcon: false,
      currentValue: this.value,
      position: null,
      ranges: []
    };
  },
  watch: {
    value: {
      handler(val) {
        if (!this.range) {
          this.currentValue = this.isValidDate(val) ? val : undefined;
        } else {
          this.currentValue = this.isValidRange(val) ? val : [undefined, undefined];
        }
      },
      immediate: true
    },
    currentValue(val) {
      if (!this.range && val || this.range && val[0] && val[1]) {
        this.$emit('input', val);
      }
    },
    showPopup(val) {
      if (val) {
        this.$nextTick(this.displayPopup);
      }
    }
  },
  computed: {
    translation() {
      return __WEBPACK_IMPORTED_MODULE_1__languages_js__["a" /* default */][this.lang] || __WEBPACK_IMPORTED_MODULE_1__languages_js__["a" /* default */]['en'];
    },
    innerPlaceholder() {
      return this.placeholder || (this.range ? this.translation.placeholder.dateRange : this.translation.placeholder.date);
    },
    text() {
      if (!this.range && this.currentValue) {
        return this.stringify(this.currentValue);
      }
      if (this.range && this.currentValue[0] && this.currentValue[1]) {
        return this.stringify(this.currentValue[0]) + ' ~ ' + this.stringify(this.currentValue[1]);
      }
      return '';
    }
  },
  methods: {
    closePopup() {
      this.showPopup = false;
    },
    togglePopup() {
      if (this.showPopup) {
        this.$refs.input.blur();
        this.showPopup = false;
      } else {
        this.$refs.input.focus();
        this.showPopup = true;
      }
    },
    hoverIcon(e) {
      if (e.type === 'mouseenter' && this.text) {
        this.showCloseIcon = true;
      }
      if (e.type === 'mouseleave') {
        this.showCloseIcon = false;
      }
    },
    clickCancel() {
      this.$emit('input', '');
    },
    clickIcon() {
      if (this.showCloseIcon) {
        this.$emit('input', '');
      } else {
        this.togglePopup();
      }
    },
    formatDate(date, fmt) {
      const map = {
        'M+': date.getMonth() + 1, // 月份
        '[Dd]+': date.getDate(), // 日
        '[Hh]+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      };
      let str = fmt.replace(/[Yy]+/g, function (str) {
        return ('' + date.getFullYear()).slice(4 - str.length);
      });
      Object.keys(map).forEach(key => {
        str = str.replace(new RegExp(key), function (str) {
          const value = '' + map[key];
          return str.length === 1 ? value : ('00' + value).slice(value.length);
        });
      });
      return str;
    },
    stringify(date) {
      return this.formatDate(new Date(date), this.format);
    },
    isValidDate(date) {
      return !!new Date(date).getTime();
    },
    isValidRange(date) {
      return Array.isArray(date) && date.length === 2 && this.isValidDate(date[0]) && this.isValidDate(date[1]);
    },
    selectRange(range) {
      this.$emit('input', [range.start, range.end]);
    },
    initRanges() {
      let thisMonthStart = new Date();
      let thisMonthFinish = new Date();

      let lastMonthStart = new Date();
      let lastMonthFinish = new Date();

      thisMonthStart.setFullYear(thisMonthStart.getFullYear(), thisMonthStart.getMonth(), 1);
      thisMonthFinish.setFullYear(thisMonthFinish.getFullYear(), thisMonthFinish.getMonth() + 1, 1);

      lastMonthFinish.setFullYear(lastMonthFinish.getFullYear(), lastMonthFinish.getMonth(), 1);
      lastMonthFinish = new Date(lastMonthFinish - 3600 * 1000 * 24);
      lastMonthStart.setFullYear(lastMonthFinish.getFullYear(), lastMonthStart.getMonth() - 1, 1);

      var d = new Date(lastMonthFinish - 3600 * 1000 * 24);
      console.log(d);

      if (Array.isArray(this.shortcuts)) {
        this.ranges = this.shortcuts;
      } else if (this.shortcuts) {
        this.ranges = [{
          text: 'Today',
          start: new Date(),
          end: new Date()
        }, {
          text: 'Yesterday',
          start: new Date(Date.now() - 3600 * 1000 * 24),
          end: new Date(Date.now() - 3600 * 1000 * 24)
        }, {
          text: 'Last 7 days',
          start: new Date(Date.now() - 3600 * 1000 * 24 * 7),
          end: new Date()
        }, {
          text: 'Last 30 days',
          start: new Date(Date.now() - 3600 * 1000 * 24 * 30),
          end: new Date()
        }, {
          text: 'This Month',
          start: new Date(thisMonthStart - 3600),
          end: new Date(thisMonthFinish - 3600 * 1000 * 24)
        }, {
          text: 'Last Month',
          start: new Date(lastMonthStart - 3600),
          end: new Date(lastMonthFinish)
        }];
        this.ranges.forEach((v, i) => {
          v.text = this.translation.pickers[i];
        });
      } else {
        this.ranges = [];
      }
    },
    displayPopup() {
      const dw = document.documentElement.clientWidth;
      const dh = document.documentElement.clientHeight;
      const InputRect = this.$el.getBoundingClientRect();
      const PopupRect = this.$refs.calendar.getBoundingClientRect();
      this.position = {};
      if (dw - InputRect.left < PopupRect.width && InputRect.right < PopupRect.width) {
        this.position.left = 1 - InputRect.left + 'px';
      } else if (InputRect.left + InputRect.width / 2 <= dw / 2) {
        this.position.left = 0;
      } else {
        this.position.right = 0;
      }
      if (InputRect.top <= PopupRect.height + 1 && dh - InputRect.bottom <= PopupRect.height + 1) {
        this.position.top = dh - InputRect.top - PopupRect.height - 1 + 'px';
      } else if (InputRect.top + InputRect.height / 2 <= dh / 2) {
        this.position.top = '100%';
      } else {
        this.position.bottom = '100%';
      }
    }
  },
  created() {
    this.initRanges();
  },
  directives: {
    clickoutside: {
      bind(el, binding, vnode) {
        el['@clickoutside'] = e => {
          if (!el.contains(e.target) && binding.expression && vnode.context[binding.expression]) {
            binding.value();
          }
        };
        document.addEventListener('click', el['@clickoutside'], true);
      },
      unbind(el) {
        document.removeEventListener('click', el['@clickoutside'], true);
      }
    }
  }
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__datepicker_index_vue__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__datepicker_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__datepicker_index_vue__);
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',
  components: { DatePicker: __WEBPACK_IMPORTED_MODULE_0__datepicker_index_vue___default.a },
  data() {
    return {
      value: ''
    };
  }
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".b-dropdown .dropdown-item:focus,.b-dropdown .dropdown-item:hover{box-shadow:inset 0 0 400px 110px rgba(0,0,0,.09)}.b-dropdown .dropdown-item:active{box-shadow:none}.b-form-group.form-group.is-invalid .invalid-feedback{display:block!important}.custom-file-control[data-v-c68bd5f8]{overflow:hidden}.custom-file-control.dragging[data-v-c68bd5f8]{overflow:hidden;filter:blur(3px)}.custom-file-control[data-v-c68bd5f8]:after{content:attr(data-selected)}.custom-file-control[data-v-c68bd5f8]:before{content:attr(data-choose)}.custom-file .drop-here[data-v-c68bd5f8]{position:absolute;left:0;right:0;top:0;bottom:0;background-color:rgba(0,0,0,.5);border-radius:3px;z-index:99999;display:flex;justify-content:center;align-items:center}.custom-file .drop-here[data-v-c68bd5f8]:before{color:#fff;content:attr(data-drop)}.hidden[data-v-1b4cbb68]{opacity:0!important}.modal[data-v-1b4cbb68]{display:block}.b-nav-dropdown .dropdown-item:focus,.b-nav-dropdown .dropdown-item:hover{box-shadow:inset 0 0 400px 110px rgba(0,0,0,.09)}.b-nav-dropdown .dropdown-item:active{box-shadow:none}.page-item[data-v-2792960b]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.page-item.disabled[data-v-2792960b]{cursor:not-allowed;opacity:.65}.page-item[data-v-20c4e761]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.page-item.disabled[data-v-20c4e761]{cursor:not-allowed;opacity:.65}table.b-table>tfoot>tr>.sorting,table.b-table>thead>tr>.sorting{padding-right:30px;cursor:pointer;position:relative}table.b-table tfoot>tr>.sorting:after,table.b-table tfoot>tr>.sorting:before,table.b-table thead>tr>.sorting:after,table.b-table thead>tr>.sorting:before{position:absolute;bottom:.9em;display:block;opacity:.3}table.b-table.table-sm>tfoot>tr>.sorting:after,table.b-table.table-sm>tfoot>tr>.sorting:before,table.b-table.table-sm>thead>tr>.sorting:after,table.b-table.table-sm>thead>tr>.sorting:before{bottom:.45em}table.b-table>tfoot>tr>.sorting:before,table.b-table>thead>tr>.sorting:before{right:1em;content:\"\\2191\"}table.b-table>tfoot>tr>.sorting:after,table.b-table>thead>tr>.sorting:after{right:.5em;content:\"\\2193\"}table.b-table>tfoot>tr>.sorting_asc:after,table.b-table>tfoot>tr>.sorting_desc:before,table.b-table>thead>tr>.sorting_asc:after,table.b-table>thead>tr>.sorting_desc:before,table.b-table[aria-busy=false]{opacity:1}table.b-table[aria-busy=true]{opacity:.6}", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "/*!\n * Bootstrap v4.0.0-beta (https://getbootstrap.com)\n * Copyright 2011-2017 The Bootstrap Authors\n * Copyright 2011-2017 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */@media print{*,:after,:before{text-shadow:none!important;box-shadow:none!important}a,a:visited{text-decoration:underline}abbr[title]:after{content:\" (\" attr(title) \")\"}pre{white-space:pre-wrap!important}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}.navbar{display:none}.badge{border:1px solid #000}.table{border-collapse:collapse!important}.table td,.table th{background-color:#fff!important}.table-bordered td,.table-bordered th{border:1px solid #ddd!important}}html{box-sizing:border-box;font-family:sans-serif;line-height:1.15;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-ms-overflow-style:scrollbar;-webkit-tap-highlight-color:transparent}*,:after,:before{box-sizing:inherit}@-ms-viewport{width:device-width}article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff}[tabindex=\"-1\"]:focus{outline:none!important}hr{box-sizing:content-box;height:0;overflow:visible}h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:.5rem}p{margin-top:0;margin-bottom:1rem}abbr[data-original-title],abbr[title]{text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;cursor:help;border-bottom:0}address{font-style:normal;line-height:inherit}address,dl,ol,ul{margin-bottom:1rem}dl,ol,ul{margin-top:0}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}dt{font-weight:700}dd{margin-bottom:.5rem;margin-left:0}blockquote{margin:0 0 1rem}dfn{font-style:italic}b,strong{font-weight:bolder}small{font-size:80%}sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}a{color:#007bff;text-decoration:none;background-color:transparent;-webkit-text-decoration-skip:objects}a:hover{color:#0056b3;text-decoration:underline}a:not([href]):not([tabindex]),a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover{color:inherit;text-decoration:none}a:not([href]):not([tabindex]):focus{outline:0}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}pre{overflow:auto}figure{margin:0 0 1rem}img{vertical-align:middle;border-style:none}svg:not(:root){overflow:hidden}[role=button],a,area,button,input,label,select,summary,textarea{-ms-touch-action:manipulation;touch-action:manipulation}table{border-collapse:collapse}caption{padding-top:.75rem;padding-bottom:.75rem;color:#868e96;caption-side:bottom}caption,th{text-align:left}label{display:inline-block;margin-bottom:.5rem}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}button,input,optgroup,select,textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{padding:0;border-style:none}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=date],input[type=datetime-local],input[type=month],input[type=time]{-webkit-appearance:listbox}textarea{overflow:auto;resize:vertical}fieldset{min-width:0;padding:0;margin:0;border:0}legend{display:block;width:100%;max-width:100%;padding:0;margin-bottom:.5rem;font-size:1.5rem;line-height:inherit;color:inherit;white-space:normal}progress{vertical-align:baseline}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px;-webkit-appearance:none}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{font:inherit;-webkit-appearance:button}output{display:inline-block}summary{display:list-item}template{display:none}[hidden]{display:none!important}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{margin-bottom:.5rem;font-family:inherit;font-weight:500;line-height:1.1;color:inherit}.h1,h1{font-size:2.5rem}.h2,h2{font-size:2rem}.h3,h3{font-size:1.75rem}.h4,h4{font-size:1.5rem}.h5,h5{font-size:1.25rem}.h6,h6{font-size:1rem}.lead{font-size:1.25rem;font-weight:300}.display-1{font-size:6rem}.display-1,.display-2{font-weight:300;line-height:1.1}.display-2{font-size:5.5rem}.display-3{font-size:4.5rem}.display-3,.display-4{font-weight:300;line-height:1.1}.display-4{font-size:3.5rem}hr{margin-top:1rem;margin-bottom:1rem;border:0;border-top:1px solid rgba(0,0,0,.1)}.small,small{font-size:80%;font-weight:400}.mark,mark{padding:.2em;background-color:#fcf8e3}.list-inline,.list-unstyled{padding-left:0;list-style:none}.list-inline-item{display:inline-block}.list-inline-item:not(:last-child){margin-right:5px}.initialism{font-size:90%;text-transform:uppercase}.blockquote{margin-bottom:1rem;font-size:1.25rem}.blockquote-footer{display:block;font-size:80%;color:#868e96}.blockquote-footer:before{content:\"\\2014   \\A0\"}.img-fluid,.img-thumbnail{max-width:100%;height:auto}.img-thumbnail{padding:.25rem;background-color:#fff;border:1px solid #ddd;border-radius:.25rem;transition:all .2s ease-in-out}.figure{display:inline-block}.figure-img{margin-bottom:.5rem;line-height:1}.figure-caption{font-size:90%;color:#868e96}code,kbd,pre,samp{font-family:Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}code{padding:.2rem .4rem;font-size:90%;color:#bd4147;background-color:#f8f9fa;border-radius:.25rem}a>code{padding:0;color:inherit;background-color:inherit}kbd{padding:.2rem .4rem;font-size:90%;color:#fff;background-color:#212529;border-radius:.2rem}kbd kbd{padding:0;font-size:100%;font-weight:700}pre{display:block;margin-top:0;margin-bottom:1rem;font-size:90%;color:#212529}pre code{padding:0;font-size:inherit;color:inherit;background-color:transparent;border-radius:0}.pre-scrollable{max-height:340px;overflow-y:scroll}.container{margin-right:auto;margin-left:auto;padding-right:15px;padding-left:15px;width:100%}@media (min-width:576px){.container{max-width:540px}}@media (min-width:768px){.container{max-width:720px}}@media (min-width:992px){.container{max-width:960px}}@media (min-width:1200px){.container{max-width:1140px}}.container-fluid{margin-right:auto;margin-left:auto;padding-right:15px;padding-left:15px;width:100%}.row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px}.no-gutters{margin-right:0;margin-left:0}.no-gutters>.col,.no-gutters>[class*=col-]{padding-right:0;padding-left:0}.col,.col-1,.col-2,.col-3,.col-4,.col-5,.col-6,.col-7,.col-8,.col-9,.col-10,.col-11,.col-12,.col-auto,.col-lg,.col-lg-1,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-auto,.col-md,.col-md-1,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-10,.col-md-11,.col-md-12,.col-md-auto,.col-sm,.col-sm-1,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-auto,.col-xl,.col-xl-1,.col-xl-2,.col-xl-3,.col-xl-4,.col-xl-5,.col-xl-6,.col-xl-7,.col-xl-8,.col-xl-9,.col-xl-10,.col-xl-11,.col-xl-12,.col-xl-auto{position:relative;width:100%;min-height:1px;padding-right:15px;padding-left:15px}.col{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.col-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:none}.col-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-1{-ms-flex-order:1;order:1}.order-2{-ms-flex-order:2;order:2}.order-3{-ms-flex-order:3;order:3}.order-4{-ms-flex-order:4;order:4}.order-5{-ms-flex-order:5;order:5}.order-6{-ms-flex-order:6;order:6}.order-7{-ms-flex-order:7;order:7}.order-8{-ms-flex-order:8;order:8}.order-9{-ms-flex-order:9;order:9}.order-10{-ms-flex-order:10;order:10}.order-11{-ms-flex-order:11;order:11}.order-12{-ms-flex-order:12;order:12}@media (min-width:576px){.col-sm{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.col-sm-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:none}.col-sm-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-sm-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-sm-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-sm-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-sm-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-sm-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-sm-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-sm-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-sm-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-sm-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-sm-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-sm-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-sm-1{-ms-flex-order:1;order:1}.order-sm-2{-ms-flex-order:2;order:2}.order-sm-3{-ms-flex-order:3;order:3}.order-sm-4{-ms-flex-order:4;order:4}.order-sm-5{-ms-flex-order:5;order:5}.order-sm-6{-ms-flex-order:6;order:6}.order-sm-7{-ms-flex-order:7;order:7}.order-sm-8{-ms-flex-order:8;order:8}.order-sm-9{-ms-flex-order:9;order:9}.order-sm-10{-ms-flex-order:10;order:10}.order-sm-11{-ms-flex-order:11;order:11}.order-sm-12{-ms-flex-order:12;order:12}}@media (min-width:768px){.col-md{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.col-md-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:none}.col-md-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-md-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-md-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-md-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-md-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-md-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-md-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-md-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-md-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-md-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-md-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-md-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-md-1{-ms-flex-order:1;order:1}.order-md-2{-ms-flex-order:2;order:2}.order-md-3{-ms-flex-order:3;order:3}.order-md-4{-ms-flex-order:4;order:4}.order-md-5{-ms-flex-order:5;order:5}.order-md-6{-ms-flex-order:6;order:6}.order-md-7{-ms-flex-order:7;order:7}.order-md-8{-ms-flex-order:8;order:8}.order-md-9{-ms-flex-order:9;order:9}.order-md-10{-ms-flex-order:10;order:10}.order-md-11{-ms-flex-order:11;order:11}.order-md-12{-ms-flex-order:12;order:12}}@media (min-width:992px){.col-lg{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.col-lg-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:none}.col-lg-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-lg-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-lg-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-lg-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-lg-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-lg-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-lg-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-lg-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-lg-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-lg-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-lg-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-lg-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-lg-1{-ms-flex-order:1;order:1}.order-lg-2{-ms-flex-order:2;order:2}.order-lg-3{-ms-flex-order:3;order:3}.order-lg-4{-ms-flex-order:4;order:4}.order-lg-5{-ms-flex-order:5;order:5}.order-lg-6{-ms-flex-order:6;order:6}.order-lg-7{-ms-flex-order:7;order:7}.order-lg-8{-ms-flex-order:8;order:8}.order-lg-9{-ms-flex-order:9;order:9}.order-lg-10{-ms-flex-order:10;order:10}.order-lg-11{-ms-flex-order:11;order:11}.order-lg-12{-ms-flex-order:12;order:12}}@media (min-width:1200px){.col-xl{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.col-xl-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:none}.col-xl-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-xl-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-xl-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-xl-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-xl-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-xl-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-xl-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-xl-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-xl-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-xl-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-xl-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-xl-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-xl-1{-ms-flex-order:1;order:1}.order-xl-2{-ms-flex-order:2;order:2}.order-xl-3{-ms-flex-order:3;order:3}.order-xl-4{-ms-flex-order:4;order:4}.order-xl-5{-ms-flex-order:5;order:5}.order-xl-6{-ms-flex-order:6;order:6}.order-xl-7{-ms-flex-order:7;order:7}.order-xl-8{-ms-flex-order:8;order:8}.order-xl-9{-ms-flex-order:9;order:9}.order-xl-10{-ms-flex-order:10;order:10}.order-xl-11{-ms-flex-order:11;order:11}.order-xl-12{-ms-flex-order:12;order:12}}.table{width:100%;max-width:100%;margin-bottom:1rem;background-color:transparent}.table td,.table th{padding:.75rem;vertical-align:top;border-top:1px solid #e9ecef}.table thead th{vertical-align:bottom;border-bottom:2px solid #e9ecef}.table tbody+tbody{border-top:2px solid #e9ecef}.table .table{background-color:#fff}.table-sm td,.table-sm th{padding:.3rem}.table-bordered,.table-bordered td,.table-bordered th{border:1px solid #e9ecef}.table-bordered thead td,.table-bordered thead th{border-bottom-width:2px}.table-striped tbody tr:nth-of-type(odd){background-color:rgba(0,0,0,.05)}.table-hover tbody tr:hover{background-color:rgba(0,0,0,.075)}.table-primary,.table-primary>td,.table-primary>th{background-color:#b8daff}.table-hover .table-primary:hover,.table-hover .table-primary:hover>td,.table-hover .table-primary:hover>th{background-color:#9fcdff}.table-secondary,.table-secondary>td,.table-secondary>th{background-color:#dddfe2}.table-hover .table-secondary:hover,.table-hover .table-secondary:hover>td,.table-hover .table-secondary:hover>th{background-color:#cfd2d6}.table-success,.table-success>td,.table-success>th{background-color:#c3e6cb}.table-hover .table-success:hover,.table-hover .table-success:hover>td,.table-hover .table-success:hover>th{background-color:#b1dfbb}.table-info,.table-info>td,.table-info>th{background-color:#bee5eb}.table-hover .table-info:hover,.table-hover .table-info:hover>td,.table-hover .table-info:hover>th{background-color:#abdde5}.table-warning,.table-warning>td,.table-warning>th{background-color:#ffeeba}.table-hover .table-warning:hover,.table-hover .table-warning:hover>td,.table-hover .table-warning:hover>th{background-color:#ffe8a1}.table-danger,.table-danger>td,.table-danger>th{background-color:#f5c6cb}.table-hover .table-danger:hover,.table-hover .table-danger:hover>td,.table-hover .table-danger:hover>th{background-color:#f1b0b7}.table-light,.table-light>td,.table-light>th{background-color:#fdfdfe}.table-hover .table-light:hover,.table-hover .table-light:hover>td,.table-hover .table-light:hover>th{background-color:#ececf6}.table-dark,.table-dark>td,.table-dark>th{background-color:#c6c8ca}.table-hover .table-dark:hover,.table-hover .table-dark:hover>td,.table-hover .table-dark:hover>th{background-color:#b9bbbe}.table-active,.table-active>td,.table-active>th,.table-hover .table-active:hover,.table-hover .table-active:hover>td,.table-hover .table-active:hover>th{background-color:rgba(0,0,0,.075)}.thead-inverse th{color:#fff;background-color:#212529}.thead-default th{color:#495057;background-color:#e9ecef}.table-inverse{color:#fff;background-color:#212529}.table-inverse td,.table-inverse th,.table-inverse thead th{border-color:#32383e}.table-inverse.table-bordered{border:0}.table-inverse.table-striped tbody tr:nth-of-type(odd){background-color:hsla(0,0%,100%,.05)}.table-inverse.table-hover tbody tr:hover{background-color:hsla(0,0%,100%,.075)}@media (max-width:991px){.table-responsive{display:block;width:100%;overflow-x:auto;-ms-overflow-style:-ms-autohiding-scrollbar}.table-responsive.table-bordered{border:0}}.form-control{display:block;width:100%;padding:.5rem .75rem;font-size:1rem;line-height:1.25;color:#495057;background-color:#fff;background-image:none;background-clip:padding-box;border:1px solid rgba(0,0,0,.15);border-radius:.25rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}.form-control::-ms-expand{background-color:transparent;border:0}.form-control:focus{color:#495057;background-color:#fff;border-color:#80bdff;outline:none}.form-control::-webkit-input-placeholder{color:#868e96;opacity:1}.form-control:-ms-input-placeholder{color:#868e96;opacity:1}.form-control::placeholder{color:#868e96;opacity:1}.form-control:disabled,.form-control[readonly]{background-color:#e9ecef;opacity:1}select.form-control:not([size]):not([multiple]){height:calc(2.25rem + 2px)}select.form-control:focus::-ms-value{color:#495057;background-color:#fff}.form-control-file,.form-control-range{display:block}.col-form-label{margin-bottom:0}.col-form-label,.col-form-label-lg{padding-top:calc(.5rem - 1px * 2);padding-bottom:calc(.5rem - 1px * 2)}.col-form-label-lg{font-size:1.25rem}.col-form-label-sm{padding-top:calc(.25rem - 1px * 2);padding-bottom:calc(.25rem - 1px * 2);font-size:.875rem}.col-form-legend{font-size:1rem}.col-form-legend,.form-control-plaintext{padding-top:.5rem;padding-bottom:.5rem;margin-bottom:0}.form-control-plaintext{line-height:1.25;border:solid transparent;border-width:1px 0}.form-control-plaintext.form-control-lg,.form-control-plaintext.form-control-sm,.input-group-lg>.form-control-plaintext.form-control,.input-group-lg>.form-control-plaintext.input-group-addon,.input-group-lg>.input-group-btn>.form-control-plaintext.btn,.input-group-sm>.form-control-plaintext.form-control,.input-group-sm>.form-control-plaintext.input-group-addon,.input-group-sm>.input-group-btn>.form-control-plaintext.btn{padding-right:0;padding-left:0}.form-control-sm,.input-group-sm>.form-control,.input-group-sm>.input-group-addon,.input-group-sm>.input-group-btn>.btn{padding:.25rem .5rem;font-size:.875rem;line-height:1.5;border-radius:.2rem}.input-group-sm>.input-group-btn>select.btn:not([size]):not([multiple]),.input-group-sm>select.form-control:not([size]):not([multiple]),.input-group-sm>select.input-group-addon:not([size]):not([multiple]),select.form-control-sm:not([size]):not([multiple]){height:calc(1.8125rem + 2px)}.form-control-lg,.input-group-lg>.form-control,.input-group-lg>.input-group-addon,.input-group-lg>.input-group-btn>.btn{padding:.5rem 1rem;font-size:1.25rem;line-height:1.5;border-radius:.3rem}.input-group-lg>.input-group-btn>select.btn:not([size]):not([multiple]),.input-group-lg>select.form-control:not([size]):not([multiple]),.input-group-lg>select.input-group-addon:not([size]):not([multiple]),select.form-control-lg:not([size]):not([multiple]){height:calc(2.3125rem + 2px)}.form-group{margin-bottom:1rem}.form-text{display:block;margin-top:.25rem}.form-row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-5px;margin-left:-5px}.form-row>.col,.form-row>[class*=col-]{padding-right:5px;padding-left:5px}.form-check{position:relative;display:block;margin-bottom:.5rem}.form-check.disabled .form-check-label{color:#868e96}.form-check-label{padding-left:1.25rem;margin-bottom:0}.form-check-input{position:absolute;margin-top:.25rem;margin-left:-1.25rem}.form-check-input:only-child{position:static}.form-check-inline{display:inline-block}.form-check-inline .form-check-label{vertical-align:middle}.form-check-inline+.form-check-inline{margin-left:.75rem}.invalid-feedback{display:none;margin-top:.25rem;font-size:.875rem;color:#dc3545}.invalid-tooltip{position:absolute;top:100%;z-index:5;display:none;width:250px;padding:.5rem;margin-top:.1rem;font-size:.875rem;line-height:1;color:#fff;background-color:rgba(220,53,69,.8);border-radius:.2rem}.custom-select.is-valid,.form-control.is-valid,.was-validated .custom-select:valid,.was-validated .form-control:valid{border-color:#28a745}.custom-select.is-valid:focus,.form-control.is-valid:focus,.was-validated .custom-select:valid:focus,.was-validated .form-control:valid:focus{box-shadow:0 0 0 .2rem rgba(40,167,69,.25)}.custom-select.is-valid~.invalid-feedback,.custom-select.is-valid~.invalid-tooltip,.form-control.is-valid~.invalid-feedback,.form-control.is-valid~.invalid-tooltip,.was-validated .custom-select:valid~.invalid-feedback,.was-validated .custom-select:valid~.invalid-tooltip,.was-validated .form-control:valid~.invalid-feedback,.was-validated .form-control:valid~.invalid-tooltip{display:block}.form-check-input.is-valid+.form-check-label,.was-validated .form-check-input:valid+.form-check-label{color:#28a745}.custom-control-input.is-valid~.custom-control-indicator,.was-validated .custom-control-input:valid~.custom-control-indicator{background-color:rgba(40,167,69,.25)}.custom-control-input.is-valid~.custom-control-description,.was-validated .custom-control-input:valid~.custom-control-description{color:#28a745}.custom-file-input.is-valid~.custom-file-control,.was-validated .custom-file-input:valid~.custom-file-control{border-color:#28a745}.custom-file-input.is-valid~.custom-file-control:before,.was-validated .custom-file-input:valid~.custom-file-control:before{border-color:inherit}.custom-file-input.is-valid:focus,.was-validated .custom-file-input:valid:focus{box-shadow:0 0 0 .2rem rgba(40,167,69,.25)}.custom-select.is-invalid,.form-control.is-invalid,.was-validated .custom-select:invalid,.was-validated .form-control:invalid{border-color:#dc3545}.custom-select.is-invalid:focus,.form-control.is-invalid:focus,.was-validated .custom-select:invalid:focus,.was-validated .form-control:invalid:focus{box-shadow:0 0 0 .2rem rgba(220,53,69,.25)}.custom-select.is-invalid~.invalid-feedback,.custom-select.is-invalid~.invalid-tooltip,.form-control.is-invalid~.invalid-feedback,.form-control.is-invalid~.invalid-tooltip,.was-validated .custom-select:invalid~.invalid-feedback,.was-validated .custom-select:invalid~.invalid-tooltip,.was-validated .form-control:invalid~.invalid-feedback,.was-validated .form-control:invalid~.invalid-tooltip{display:block}.form-check-input.is-invalid+.form-check-label,.was-validated .form-check-input:invalid+.form-check-label{color:#dc3545}.custom-control-input.is-invalid~.custom-control-indicator,.was-validated .custom-control-input:invalid~.custom-control-indicator{background-color:rgba(220,53,69,.25)}.custom-control-input.is-invalid~.custom-control-description,.was-validated .custom-control-input:invalid~.custom-control-description{color:#dc3545}.custom-file-input.is-invalid~.custom-file-control,.was-validated .custom-file-input:invalid~.custom-file-control{border-color:#dc3545}.custom-file-input.is-invalid~.custom-file-control:before,.was-validated .custom-file-input:invalid~.custom-file-control:before{border-color:inherit}.custom-file-input.is-invalid:focus,.was-validated .custom-file-input:invalid:focus{box-shadow:0 0 0 .2rem rgba(220,53,69,.25)}.form-inline{display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;-ms-flex-align:center;align-items:center}.form-inline .form-check{width:100%}@media (min-width:576px){.form-inline label{-ms-flex-align:center;-ms-flex-pack:center;justify-content:center}.form-inline .form-group,.form-inline label{display:-ms-flexbox;display:flex;align-items:center;margin-bottom:0}.form-inline .form-group{-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-flow:row wrap;flex-flow:row wrap;-ms-flex-align:center}.form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}.form-inline .form-control-plaintext{display:inline-block}.form-inline .input-group{width:auto}.form-inline .form-control-label{margin-bottom:0;vertical-align:middle}.form-inline .form-check{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:auto;margin-top:0;margin-bottom:0}.form-inline .form-check-label{padding-left:0}.form-inline .form-check-input{position:relative;margin-top:0;margin-right:.25rem;margin-left:0}.form-inline .custom-control{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding-left:0}.form-inline .custom-control-indicator{position:static;display:inline-block;margin-right:.25rem;vertical-align:text-bottom}.form-inline .has-feedback .form-control-feedback{top:0}}.btn{display:inline-block;font-weight:400;text-align:center;white-space:nowrap;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;padding:.5rem .75rem;font-size:1rem;line-height:1.25;border-radius:.25rem;transition:all .15s ease-in-out}.btn:focus,.btn:hover{text-decoration:none}.btn.focus,.btn:focus{outline:0;box-shadow:0 0 0 3px rgba(0,123,255,.25)}.btn.disabled,.btn:disabled{opacity:.65}.btn.active,.btn:active{background-image:none}a.btn.disabled,fieldset[disabled] a.btn{pointer-events:none}.btn-primary{color:#fff;background-color:#007bff;border-color:#007bff}.btn-primary:hover{color:#fff;background-color:#0069d9;border-color:#0062cc}.btn-primary.focus,.btn-primary:focus{box-shadow:0 0 0 3px rgba(0,123,255,.5)}.btn-primary.disabled,.btn-primary:disabled{background-color:#007bff;border-color:#007bff}.btn-primary.active,.btn-primary:active,.show>.btn-primary.dropdown-toggle{background-color:#0069d9;background-image:none;border-color:#0062cc}.btn-secondary{color:#fff;background-color:#868e96;border-color:#868e96}.btn-secondary:hover{color:#fff;background-color:#727b84;border-color:#6c757d}.btn-secondary.focus,.btn-secondary:focus{box-shadow:0 0 0 3px hsla(210,7%,56%,.5)}.btn-secondary.disabled,.btn-secondary:disabled{background-color:#868e96;border-color:#868e96}.btn-secondary.active,.btn-secondary:active,.show>.btn-secondary.dropdown-toggle{background-color:#727b84;background-image:none;border-color:#6c757d}.btn-success{color:#fff;background-color:#28a745;border-color:#28a745}.btn-success:hover{color:#fff;background-color:#218838;border-color:#1e7e34}.btn-success.focus,.btn-success:focus{box-shadow:0 0 0 3px rgba(40,167,69,.5)}.btn-success.disabled,.btn-success:disabled{background-color:#28a745;border-color:#28a745}.btn-success.active,.btn-success:active,.show>.btn-success.dropdown-toggle{background-color:#218838;background-image:none;border-color:#1e7e34}.btn-info{color:#fff;background-color:#17a2b8;border-color:#17a2b8}.btn-info:hover{color:#fff;background-color:#138496;border-color:#117a8b}.btn-info.focus,.btn-info:focus{box-shadow:0 0 0 3px rgba(23,162,184,.5)}.btn-info.disabled,.btn-info:disabled{background-color:#17a2b8;border-color:#17a2b8}.btn-info.active,.btn-info:active,.show>.btn-info.dropdown-toggle{background-color:#138496;background-image:none;border-color:#117a8b}.btn-warning{color:#111;background-color:#ffc107;border-color:#ffc107}.btn-warning:hover{color:#111;background-color:#e0a800;border-color:#d39e00}.btn-warning.focus,.btn-warning:focus{box-shadow:0 0 0 3px rgba(255,193,7,.5)}.btn-warning.disabled,.btn-warning:disabled{background-color:#ffc107;border-color:#ffc107}.btn-warning.active,.btn-warning:active,.show>.btn-warning.dropdown-toggle{background-color:#e0a800;background-image:none;border-color:#d39e00}.btn-danger{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-danger:hover{color:#fff;background-color:#c82333;border-color:#bd2130}.btn-danger.focus,.btn-danger:focus{box-shadow:0 0 0 3px rgba(220,53,69,.5)}.btn-danger.disabled,.btn-danger:disabled{background-color:#dc3545;border-color:#dc3545}.btn-danger.active,.btn-danger:active,.show>.btn-danger.dropdown-toggle{background-color:#c82333;background-image:none;border-color:#bd2130}.btn-light{color:#111;background-color:#f8f9fa;border-color:#f8f9fa}.btn-light:hover{color:#111;background-color:#e2e6ea;border-color:#dae0e5}.btn-light.focus,.btn-light:focus{box-shadow:0 0 0 3px rgba(248,249,250,.5)}.btn-light.disabled,.btn-light:disabled{background-color:#f8f9fa;border-color:#f8f9fa}.btn-light.active,.btn-light:active,.show>.btn-light.dropdown-toggle{background-color:#e2e6ea;background-image:none;border-color:#dae0e5}.btn-dark{color:#fff;background-color:#343a40;border-color:#343a40}.btn-dark:hover{color:#fff;background-color:#23272b;border-color:#1d2124}.btn-dark.focus,.btn-dark:focus{box-shadow:0 0 0 3px rgba(52,58,64,.5)}.btn-dark.disabled,.btn-dark:disabled{background-color:#343a40;border-color:#343a40}.btn-dark.active,.btn-dark:active,.show>.btn-dark.dropdown-toggle{background-color:#23272b;background-image:none;border-color:#1d2124}.btn-outline-primary{color:#007bff;background-color:transparent;background-image:none;border-color:#007bff}.btn-outline-primary:hover{color:#fff;background-color:#007bff;border-color:#007bff}.btn-outline-primary.focus,.btn-outline-primary:focus{box-shadow:0 0 0 3px rgba(0,123,255,.5)}.btn-outline-primary.disabled,.btn-outline-primary:disabled{color:#007bff;background-color:transparent}.btn-outline-primary.active,.btn-outline-primary:active,.show>.btn-outline-primary.dropdown-toggle{color:#fff;background-color:#007bff;border-color:#007bff}.btn-outline-secondary{color:#868e96;background-color:transparent;background-image:none;border-color:#868e96}.btn-outline-secondary:hover{color:#fff;background-color:#868e96;border-color:#868e96}.btn-outline-secondary.focus,.btn-outline-secondary:focus{box-shadow:0 0 0 3px hsla(210,7%,56%,.5)}.btn-outline-secondary.disabled,.btn-outline-secondary:disabled{color:#868e96;background-color:transparent}.btn-outline-secondary.active,.btn-outline-secondary:active,.show>.btn-outline-secondary.dropdown-toggle{color:#fff;background-color:#868e96;border-color:#868e96}.btn-outline-success{color:#28a745;background-color:transparent;background-image:none;border-color:#28a745}.btn-outline-success:hover{color:#fff;background-color:#28a745;border-color:#28a745}.btn-outline-success.focus,.btn-outline-success:focus{box-shadow:0 0 0 3px rgba(40,167,69,.5)}.btn-outline-success.disabled,.btn-outline-success:disabled{color:#28a745;background-color:transparent}.btn-outline-success.active,.btn-outline-success:active,.show>.btn-outline-success.dropdown-toggle{color:#fff;background-color:#28a745;border-color:#28a745}.btn-outline-info{color:#17a2b8;background-color:transparent;background-image:none;border-color:#17a2b8}.btn-outline-info:hover{color:#fff;background-color:#17a2b8;border-color:#17a2b8}.btn-outline-info.focus,.btn-outline-info:focus{box-shadow:0 0 0 3px rgba(23,162,184,.5)}.btn-outline-info.disabled,.btn-outline-info:disabled{color:#17a2b8;background-color:transparent}.btn-outline-info.active,.btn-outline-info:active,.show>.btn-outline-info.dropdown-toggle{color:#fff;background-color:#17a2b8;border-color:#17a2b8}.btn-outline-warning{color:#ffc107;background-color:transparent;background-image:none;border-color:#ffc107}.btn-outline-warning:hover{color:#fff;background-color:#ffc107;border-color:#ffc107}.btn-outline-warning.focus,.btn-outline-warning:focus{box-shadow:0 0 0 3px rgba(255,193,7,.5)}.btn-outline-warning.disabled,.btn-outline-warning:disabled{color:#ffc107;background-color:transparent}.btn-outline-warning.active,.btn-outline-warning:active,.show>.btn-outline-warning.dropdown-toggle{color:#fff;background-color:#ffc107;border-color:#ffc107}.btn-outline-danger{color:#dc3545;background-color:transparent;background-image:none;border-color:#dc3545}.btn-outline-danger:hover{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-outline-danger.focus,.btn-outline-danger:focus{box-shadow:0 0 0 3px rgba(220,53,69,.5)}.btn-outline-danger.disabled,.btn-outline-danger:disabled{color:#dc3545;background-color:transparent}.btn-outline-danger.active,.btn-outline-danger:active,.show>.btn-outline-danger.dropdown-toggle{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-outline-light{color:#f8f9fa;background-color:transparent;background-image:none;border-color:#f8f9fa}.btn-outline-light:hover{color:#fff;background-color:#f8f9fa;border-color:#f8f9fa}.btn-outline-light.focus,.btn-outline-light:focus{box-shadow:0 0 0 3px rgba(248,249,250,.5)}.btn-outline-light.disabled,.btn-outline-light:disabled{color:#f8f9fa;background-color:transparent}.btn-outline-light.active,.btn-outline-light:active,.show>.btn-outline-light.dropdown-toggle{color:#fff;background-color:#f8f9fa;border-color:#f8f9fa}.btn-outline-dark{color:#343a40;background-color:transparent;background-image:none;border-color:#343a40}.btn-outline-dark:hover{color:#fff;background-color:#343a40;border-color:#343a40}.btn-outline-dark.focus,.btn-outline-dark:focus{box-shadow:0 0 0 3px rgba(52,58,64,.5)}.btn-outline-dark.disabled,.btn-outline-dark:disabled{color:#343a40;background-color:transparent}.btn-outline-dark.active,.btn-outline-dark:active,.show>.btn-outline-dark.dropdown-toggle{color:#fff;background-color:#343a40;border-color:#343a40}.btn-link{font-weight:400;color:#007bff;border-radius:0}.btn-link,.btn-link.active,.btn-link:active,.btn-link:disabled{background-color:transparent}.btn-link,.btn-link:active,.btn-link:focus{border-color:transparent;box-shadow:none}.btn-link:hover{border-color:transparent}.btn-link:focus,.btn-link:hover{color:#0056b3;text-decoration:underline;background-color:transparent}.btn-link:disabled{color:#868e96}.btn-link:disabled:focus,.btn-link:disabled:hover{text-decoration:none}.btn-group-lg>.btn,.btn-lg{padding:.5rem 1rem;font-size:1.25rem;line-height:1.5;border-radius:.3rem}.btn-group-sm>.btn,.btn-sm{padding:.25rem .5rem;font-size:.875rem;line-height:1.5;border-radius:.2rem}.btn-block{display:block;width:100%}.btn-block+.btn-block{margin-top:.5rem}input[type=button].btn-block,input[type=reset].btn-block,input[type=submit].btn-block{width:100%}.fade{opacity:0;transition:opacity .15s linear}.fade.show{opacity:1}.collapse{display:none}.collapse.show{display:block}tr.collapse.show{display:table-row}tbody.collapse.show{display:table-row-group}.collapsing{height:0;overflow:hidden;transition:height .35s ease}.collapsing,.dropdown,.dropup{position:relative}.dropdown-toggle:after{display:inline-block;width:0;height:0;margin-left:.255em;vertical-align:.255em;content:\"\";border-top:.3em solid;border-right:.3em solid transparent;border-left:.3em solid transparent}.dropdown-toggle:empty:after{margin-left:0}.dropup .dropdown-menu{margin-top:0;margin-bottom:.125rem}.dropup .dropdown-toggle:after{border-top:0;border-bottom:.3em solid}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:10rem;padding:.5rem 0;margin:.125rem 0 0;font-size:1rem;color:#212529;text-align:left;list-style:none;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.15);border-radius:.25rem}.dropdown-divider{height:0;margin:.5rem 0;overflow:hidden;border-top:1px solid #e9ecef}.dropdown-item{display:block;width:100%;padding:.25rem 1.5rem;clear:both;font-weight:400;color:#212529;text-align:inherit;white-space:nowrap;background:none;border:0}.dropdown-item:focus,.dropdown-item:hover{color:#16181b;text-decoration:none;background-color:#f8f9fa}.dropdown-item.active,.dropdown-item:active{color:#fff;text-decoration:none;background-color:#007bff}.dropdown-item.disabled,.dropdown-item:disabled{color:#868e96;background-color:transparent}.show>a{outline:0}.dropdown-menu.show{display:block}.dropdown-header{display:block;padding:.5rem 1.5rem;margin-bottom:0;font-size:.875rem;color:#868e96;white-space:nowrap}.btn-group,.btn-group-vertical{position:relative;display:-ms-inline-flexbox;display:inline-flex;vertical-align:middle}.btn-group-vertical>.btn,.btn-group>.btn{position:relative;-ms-flex:0 1 auto;flex:0 1 auto;margin-bottom:0}.btn-group-vertical>.btn.active,.btn-group-vertical>.btn:active,.btn-group-vertical>.btn:focus,.btn-group-vertical>.btn:hover,.btn-group>.btn.active,.btn-group>.btn:active,.btn-group>.btn:focus,.btn-group>.btn:hover{z-index:2}.btn-group-vertical .btn+.btn,.btn-group-vertical .btn+.btn-group,.btn-group-vertical .btn-group+.btn,.btn-group-vertical .btn-group+.btn-group,.btn-group .btn+.btn,.btn-group .btn+.btn-group,.btn-group .btn-group+.btn,.btn-group .btn-group+.btn-group{margin-left:-1px}.btn-toolbar{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:start;justify-content:flex-start}.btn-toolbar .input-group{width:auto}.btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle){border-radius:0}.btn-group>.btn:first-child{margin-left:0}.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle){border-top-right-radius:0;border-bottom-right-radius:0}.btn-group>.btn:last-child:not(:first-child),.btn-group>.dropdown-toggle:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.btn-group>.btn-group{float:left}.btn-group>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-top-right-radius:0;border-bottom-right-radius:0}.btn-group>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-left-radius:0;border-bottom-left-radius:0}.btn+.dropdown-toggle-split{padding-right:.5625rem;padding-left:.5625rem}.btn+.dropdown-toggle-split:after{margin-left:0}.btn-group-sm>.btn+.dropdown-toggle-split,.btn-sm+.dropdown-toggle-split{padding-right:.375rem;padding-left:.375rem}.btn-group-lg>.btn+.dropdown-toggle-split,.btn-lg+.dropdown-toggle-split{padding-right:.75rem;padding-left:.75rem}.btn-group-vertical{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:center;justify-content:center}.btn-group-vertical .btn,.btn-group-vertical .btn-group{width:100%}.btn-group-vertical>.btn+.btn,.btn-group-vertical>.btn+.btn-group,.btn-group-vertical>.btn-group+.btn,.btn-group-vertical>.btn-group+.btn-group{margin-top:-1px;margin-left:0}.btn-group-vertical>.btn:not(:first-child):not(:last-child){border-radius:0}.btn-group-vertical>.btn:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn:last-child:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.btn-group-vertical>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group-vertical>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group-vertical>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-left-radius:0;border-top-right-radius:0}[data-toggle=buttons]>.btn-group>.btn input[type=checkbox],[data-toggle=buttons]>.btn-group>.btn input[type=radio],[data-toggle=buttons]>.btn input[type=checkbox],[data-toggle=buttons]>.btn input[type=radio]{position:absolute;clip:rect(0,0,0,0);pointer-events:none}.input-group{position:relative;display:-ms-flexbox;display:flex;width:100%}.input-group .form-control{position:relative;z-index:2;-ms-flex:1 1 auto;flex:1 1 auto;width:1%;margin-bottom:0}.input-group .form-control:active,.input-group .form-control:focus,.input-group .form-control:hover{z-index:3}.input-group-addon,.input-group-btn,.input-group .form-control{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.input-group-addon:not(:first-child):not(:last-child),.input-group-btn:not(:first-child):not(:last-child),.input-group .form-control:not(:first-child):not(:last-child){border-radius:0}.input-group-addon,.input-group-btn{white-space:nowrap;vertical-align:middle}.input-group-addon{padding:.5rem .75rem;margin-bottom:0;font-size:1rem;font-weight:400;line-height:1.25;color:#495057;text-align:center;background-color:#e9ecef;border:1px solid rgba(0,0,0,.15);border-radius:.25rem}.input-group-addon.form-control-sm,.input-group-sm>.input-group-addon,.input-group-sm>.input-group-btn>.input-group-addon.btn{padding:.25rem .5rem;font-size:.875rem;border-radius:.2rem}.input-group-addon.form-control-lg,.input-group-lg>.input-group-addon,.input-group-lg>.input-group-btn>.input-group-addon.btn{padding:.5rem 1rem;font-size:1.25rem;border-radius:.3rem}.input-group-addon input[type=checkbox],.input-group-addon input[type=radio]{margin-top:0}.input-group-addon:not(:last-child),.input-group-btn:not(:first-child)>.btn-group:not(:last-child)>.btn,.input-group-btn:not(:first-child)>.btn:not(:last-child):not(.dropdown-toggle),.input-group-btn:not(:last-child)>.btn,.input-group-btn:not(:last-child)>.btn-group>.btn,.input-group-btn:not(:last-child)>.dropdown-toggle,.input-group .form-control:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.input-group-addon:not(:last-child){border-right:0}.input-group-addon:not(:first-child),.input-group-btn:not(:first-child)>.btn,.input-group-btn:not(:first-child)>.btn-group>.btn,.input-group-btn:not(:first-child)>.dropdown-toggle,.input-group-btn:not(:last-child)>.btn-group:not(:first-child)>.btn,.input-group-btn:not(:last-child)>.btn:not(:first-child),.input-group .form-control:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.form-control+.input-group-addon:not(:first-child){border-left:0}.input-group-btn{font-size:0;white-space:nowrap}.input-group-btn,.input-group-btn>.btn{position:relative}.input-group-btn>.btn+.btn{margin-left:-1px}.input-group-btn>.btn:active,.input-group-btn>.btn:focus,.input-group-btn>.btn:hover{z-index:3}.input-group-btn:not(:last-child)>.btn,.input-group-btn:not(:last-child)>.btn-group{margin-right:-1px}.input-group-btn:not(:first-child)>.btn,.input-group-btn:not(:first-child)>.btn-group{z-index:2;margin-left:-1px}.input-group-btn:not(:first-child)>.btn-group:active,.input-group-btn:not(:first-child)>.btn-group:focus,.input-group-btn:not(:first-child)>.btn-group:hover,.input-group-btn:not(:first-child)>.btn:active,.input-group-btn:not(:first-child)>.btn:focus,.input-group-btn:not(:first-child)>.btn:hover{z-index:3}.custom-control{position:relative;display:-ms-inline-flexbox;display:inline-flex;min-height:1.5rem;padding-left:1.5rem;margin-right:1rem}.custom-control-input{position:absolute;z-index:-1;opacity:0}.custom-control-input:checked~.custom-control-indicator{color:#fff;background-color:#007bff}.custom-control-input:focus~.custom-control-indicator{box-shadow:0 0 0 1px #fff,0 0 0 3px #007bff}.custom-control-input:active~.custom-control-indicator{color:#fff;background-color:#b3d7ff}.custom-control-input:disabled~.custom-control-indicator{background-color:#e9ecef}.custom-control-input:disabled~.custom-control-description{color:#868e96}.custom-control-indicator{position:absolute;top:.25rem;left:0;display:block;width:1rem;height:1rem;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:#ddd;background-repeat:no-repeat;background-position:50%;background-size:50% 50%}.custom-checkbox .custom-control-indicator{border-radius:.25rem}.custom-checkbox .custom-control-input:checked~.custom-control-indicator{background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E\")}.custom-checkbox .custom-control-input:indeterminate~.custom-control-indicator{background-color:#007bff;background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='%23fff' d='M0 2h4'/%3E%3C/svg%3E\")}.custom-radio .custom-control-indicator{border-radius:50%}.custom-radio .custom-control-input:checked~.custom-control-indicator{background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E\")}.custom-controls-stacked{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.custom-controls-stacked .custom-control{margin-bottom:.25rem}.custom-controls-stacked .custom-control+.custom-control{margin-left:0}.custom-select{display:inline-block;max-width:100%;height:calc(2.25rem + 2px);padding:.375rem 1.75rem .375rem .75rem;line-height:1.25;color:#495057;vertical-align:middle;background:#fff url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23333' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\") no-repeat right .75rem center;background-size:8px 10px;border:1px solid rgba(0,0,0,.15);border-radius:.25rem;-webkit-appearance:none;-moz-appearance:none;appearance:none}.custom-select:focus{border-color:#80bdff;outline:none}.custom-select:focus::-ms-value{color:#495057;background-color:#fff}.custom-select:disabled{color:#868e96;background-color:#e9ecef}.custom-select::-ms-expand{opacity:0}.custom-select-sm{height:calc(1.8125rem + 2px);padding-top:.375rem;padding-bottom:.375rem;font-size:75%}.custom-file{position:relative;display:inline-block;max-width:100%;height:2.5rem;margin-bottom:0}.custom-file-input{min-width:14rem;max-width:100%;height:2.5rem;margin:0;opacity:0}.custom-file-control{position:absolute;top:0;right:0;left:0;z-index:5;height:2.5rem;padding:.5rem 1rem;line-height:1.5;color:#495057;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:#fff;border:1px solid rgba(0,0,0,.15);border-radius:.25rem}.custom-file-control:lang(en):empty:after{content:\"Choose file...\"}.custom-file-control:before{position:absolute;top:-1px;right:-1px;bottom:-1px;z-index:6;display:block;height:2.5rem;padding:.5rem 1rem;line-height:1.5;color:#495057;background-color:#e9ecef;border:1px solid rgba(0,0,0,.15);border-radius:0 .25rem .25rem 0}.custom-file-control:lang(en):before{content:\"Browse\"}.nav{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding-left:0;margin-bottom:0;list-style:none}.nav-link{display:block;padding:.5rem 1rem}.nav-link:focus,.nav-link:hover{text-decoration:none}.nav-link.disabled{color:#868e96}.nav-tabs{border-bottom:1px solid #ddd}.nav-tabs .nav-item{margin-bottom:-1px}.nav-tabs .nav-link{border:1px solid transparent;border-top-left-radius:.25rem;border-top-right-radius:.25rem}.nav-tabs .nav-link:focus,.nav-tabs .nav-link:hover{border-color:#e9ecef #e9ecef #ddd}.nav-tabs .nav-link.disabled{color:#868e96;background-color:transparent;border-color:transparent}.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{color:#495057;background-color:#fff;border-color:#ddd #ddd #fff}.nav-tabs .dropdown-menu{margin-top:-1px;border-top-left-radius:0;border-top-right-radius:0}.nav-pills .nav-link{border-radius:.25rem}.nav-pills .nav-link.active,.show>.nav-pills .nav-link{color:#fff;background-color:#007bff}.nav-fill .nav-item{-ms-flex:1 1 auto;flex:1 1 auto;text-align:center}.nav-justified .nav-item{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;text-align:center}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.navbar{position:relative;padding:.5rem 1rem}.navbar,.navbar>.container,.navbar>.container-fluid{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}.navbar-brand{display:inline-block;padding-top:.3125rem;padding-bottom:.3125rem;margin-right:1rem;font-size:1.25rem;line-height:inherit;white-space:nowrap}.navbar-brand:focus,.navbar-brand:hover{text-decoration:none}.navbar-nav{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;padding-left:0;margin-bottom:0;list-style:none}.navbar-nav .nav-link{padding-right:0;padding-left:0}.navbar-nav .dropdown-menu{position:static;float:none}.navbar-text{display:inline-block;padding-top:.5rem;padding-bottom:.5rem}.navbar-collapse{-ms-flex-preferred-size:100%;flex-basis:100%;-ms-flex-align:center;align-items:center}.navbar-toggler{padding:.25rem .75rem;font-size:1.25rem;line-height:1;background:transparent;border:1px solid transparent;border-radius:.25rem}.navbar-toggler:focus,.navbar-toggler:hover{text-decoration:none}.navbar-toggler-icon{display:inline-block;width:1.5em;height:1.5em;vertical-align:middle;content:\"\";background:no-repeat 50%;background-size:100% 100%}@media (max-width:575px){.navbar-expand-sm>.container,.navbar-expand-sm>.container-fluid{padding-right:0;padding-left:0}}@media (min-width:576px){.navbar-expand-sm{-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand-sm,.navbar-expand-sm .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand-sm .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-sm .navbar-nav .dropdown-menu-right{right:0;left:auto}.navbar-expand-sm .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-sm>.container,.navbar-expand-sm>.container-fluid{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand-sm .navbar-collapse{display:-ms-flexbox!important;display:flex!important}.navbar-expand-sm .navbar-toggler{display:none}}@media (max-width:767px){.navbar-expand-md>.container,.navbar-expand-md>.container-fluid{padding-right:0;padding-left:0}}@media (min-width:768px){.navbar-expand-md{-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand-md,.navbar-expand-md .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand-md .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-md .navbar-nav .dropdown-menu-right{right:0;left:auto}.navbar-expand-md .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-md>.container,.navbar-expand-md>.container-fluid{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand-md .navbar-collapse{display:-ms-flexbox!important;display:flex!important}.navbar-expand-md .navbar-toggler{display:none}}@media (max-width:991px){.navbar-expand-lg>.container,.navbar-expand-lg>.container-fluid{padding-right:0;padding-left:0}}@media (min-width:992px){.navbar-expand-lg{-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand-lg,.navbar-expand-lg .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand-lg .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-lg .navbar-nav .dropdown-menu-right{right:0;left:auto}.navbar-expand-lg .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-lg>.container,.navbar-expand-lg>.container-fluid{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand-lg .navbar-collapse{display:-ms-flexbox!important;display:flex!important}.navbar-expand-lg .navbar-toggler{display:none}}@media (max-width:1199px){.navbar-expand-xl>.container,.navbar-expand-xl>.container-fluid{padding-right:0;padding-left:0}}@media (min-width:1200px){.navbar-expand-xl{-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand-xl,.navbar-expand-xl .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand-xl .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-xl .navbar-nav .dropdown-menu-right{right:0;left:auto}.navbar-expand-xl .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-xl>.container,.navbar-expand-xl>.container-fluid{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand-xl .navbar-collapse{display:-ms-flexbox!important;display:flex!important}.navbar-expand-xl .navbar-toggler{display:none}}.navbar-expand{-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand>.container,.navbar-expand>.container-fluid{padding-right:0;padding-left:0}.navbar-expand .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand .navbar-nav .dropdown-menu{position:absolute}.navbar-expand .navbar-nav .dropdown-menu-right{right:0;left:auto}.navbar-expand .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand>.container,.navbar-expand>.container-fluid{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand .navbar-collapse{display:-ms-flexbox!important;display:flex!important}.navbar-expand .navbar-toggler{display:none}.navbar-light .navbar-brand,.navbar-light .navbar-brand:focus,.navbar-light .navbar-brand:hover{color:rgba(0,0,0,.9)}.navbar-light .navbar-nav .nav-link{color:rgba(0,0,0,.5)}.navbar-light .navbar-nav .nav-link:focus,.navbar-light .navbar-nav .nav-link:hover{color:rgba(0,0,0,.7)}.navbar-light .navbar-nav .nav-link.disabled{color:rgba(0,0,0,.3)}.navbar-light .navbar-nav .active>.nav-link,.navbar-light .navbar-nav .nav-link.active,.navbar-light .navbar-nav .nav-link.show,.navbar-light .navbar-nav .show>.nav-link{color:rgba(0,0,0,.9)}.navbar-light .navbar-toggler{color:rgba(0,0,0,.5);border-color:rgba(0,0,0,.1)}.navbar-light .navbar-toggler-icon{background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")}.navbar-light .navbar-text{color:rgba(0,0,0,.5)}.navbar-dark .navbar-brand,.navbar-dark .navbar-brand:focus,.navbar-dark .navbar-brand:hover{color:#fff}.navbar-dark .navbar-nav .nav-link{color:hsla(0,0%,100%,.5)}.navbar-dark .navbar-nav .nav-link:focus,.navbar-dark .navbar-nav .nav-link:hover{color:hsla(0,0%,100%,.75)}.navbar-dark .navbar-nav .nav-link.disabled{color:hsla(0,0%,100%,.25)}.navbar-dark .navbar-nav .active>.nav-link,.navbar-dark .navbar-nav .nav-link.active,.navbar-dark .navbar-nav .nav-link.show,.navbar-dark .navbar-nav .show>.nav-link{color:#fff}.navbar-dark .navbar-toggler{color:hsla(0,0%,100%,.5);border-color:hsla(0,0%,100%,.1)}.navbar-dark .navbar-toggler-icon{background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")}.navbar-dark .navbar-text{color:hsla(0,0%,100%,.5)}.card{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-width:0;word-wrap:break-word;background-color:#fff;background-clip:border-box;border:1px solid rgba(0,0,0,.125);border-radius:.25rem}.card-body{-ms-flex:1 1 auto;flex:1 1 auto;padding:1.25rem}.card-title{margin-bottom:.75rem}.card-subtitle{margin-top:-.375rem}.card-subtitle,.card-text:last-child{margin-bottom:0}.card-link:hover{text-decoration:none}.card-link+.card-link{margin-left:1.25rem}.card>.list-group:first-child .list-group-item:first-child{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.card>.list-group:last-child .list-group-item:last-child{border-bottom-right-radius:.25rem;border-bottom-left-radius:.25rem}.card-header{padding:.75rem 1.25rem;margin-bottom:0;background-color:rgba(0,0,0,.03);border-bottom:1px solid rgba(0,0,0,.125)}.card-header:first-child{border-radius:calc(.25rem - 1px) calc(.25rem - 1px) 0 0}.card-footer{padding:.75rem 1.25rem;background-color:rgba(0,0,0,.03);border-top:1px solid rgba(0,0,0,.125)}.card-footer:last-child{border-radius:0 0 calc(.25rem - 1px) calc(.25rem - 1px)}.card-header-tabs{margin-bottom:-.75rem;border-bottom:0}.card-header-pills,.card-header-tabs{margin-right:-.625rem;margin-left:-.625rem}.card-img-overlay{position:absolute;top:0;right:0;bottom:0;left:0;padding:1.25rem}.card-img{width:100%;border-radius:calc(.25rem - 1px)}.card-img-top{width:100%;border-top-left-radius:calc(.25rem - 1px);border-top-right-radius:calc(.25rem - 1px)}.card-img-bottom{width:100%;border-bottom-right-radius:calc(.25rem - 1px);border-bottom-left-radius:calc(.25rem - 1px)}@media (min-width:576px){.card-deck{-ms-flex-flow:row wrap;flex-flow:row wrap;margin-right:-15px;margin-left:-15px}.card-deck,.card-deck .card{display:-ms-flexbox;display:flex}.card-deck .card{-ms-flex:1 0 0%;flex:1 0 0%;-ms-flex-direction:column;flex-direction:column;margin-right:15px;margin-left:15px}}@media (min-width:576px){.card-group{display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap}.card-group .card{-ms-flex:1 0 0%;flex:1 0 0%}.card-group .card+.card{margin-left:0;border-left:0}.card-group .card:first-child{border-top-right-radius:0;border-bottom-right-radius:0}.card-group .card:first-child .card-img-top{border-top-right-radius:0}.card-group .card:first-child .card-img-bottom{border-bottom-right-radius:0}.card-group .card:last-child{border-top-left-radius:0;border-bottom-left-radius:0}.card-group .card:last-child .card-img-top{border-top-left-radius:0}.card-group .card:last-child .card-img-bottom{border-bottom-left-radius:0}.card-group .card:not(:first-child):not(:last-child),.card-group .card:not(:first-child):not(:last-child) .card-img-bottom,.card-group .card:not(:first-child):not(:last-child) .card-img-top{border-radius:0}}.card-columns .card{margin-bottom:.75rem}@media (min-width:576px){.card-columns{-webkit-column-count:3;column-count:3;-webkit-column-gap:1.25rem;column-gap:1.25rem}.card-columns .card{display:inline-block;width:100%}}.breadcrumb{padding:.75rem 1rem;margin-bottom:1rem;list-style:none;background-color:#e9ecef;border-radius:.25rem}.breadcrumb:after{display:block;clear:both;content:\"\"}.breadcrumb-item{float:left}.breadcrumb-item+.breadcrumb-item:before{display:inline-block;padding-right:.5rem;padding-left:.5rem;color:#868e96;content:\"/\"}.breadcrumb-item+.breadcrumb-item:hover:before{text-decoration:underline;text-decoration:none}.breadcrumb-item.active{color:#868e96}.pagination{display:-ms-flexbox;display:flex;padding-left:0;list-style:none;border-radius:.25rem}.page-item:first-child .page-link{margin-left:0;border-top-left-radius:.25rem;border-bottom-left-radius:.25rem}.page-item:last-child .page-link{border-top-right-radius:.25rem;border-bottom-right-radius:.25rem}.page-item.active .page-link{z-index:2;color:#fff;background-color:#007bff;border-color:#007bff}.page-item.disabled .page-link{color:#868e96;pointer-events:none;background-color:#fff;border-color:#ddd}.page-link{position:relative;display:block;padding:.5rem .75rem;margin-left:-1px;line-height:1.25;color:#007bff;background-color:#fff;border:1px solid #ddd}.page-link:focus,.page-link:hover{color:#0056b3;text-decoration:none;background-color:#e9ecef;border-color:#ddd}.pagination-lg .page-link{padding:.75rem 1.5rem;font-size:1.25rem;line-height:1.5}.pagination-lg .page-item:first-child .page-link{border-top-left-radius:.3rem;border-bottom-left-radius:.3rem}.pagination-lg .page-item:last-child .page-link{border-top-right-radius:.3rem;border-bottom-right-radius:.3rem}.pagination-sm .page-link{padding:.25rem .5rem;font-size:.875rem;line-height:1.5}.pagination-sm .page-item:first-child .page-link{border-top-left-radius:.2rem;border-bottom-left-radius:.2rem}.pagination-sm .page-item:last-child .page-link{border-top-right-radius:.2rem;border-bottom-right-radius:.2rem}.badge{display:inline-block;padding:.25em .4em;font-size:75%;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25rem}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.badge-pill{padding-right:.6em;padding-left:.6em;border-radius:10rem}.badge-primary{color:#fff;background-color:#007bff}.badge-primary[href]:focus,.badge-primary[href]:hover{color:#fff;text-decoration:none;background-color:#0062cc}.badge-secondary{color:#fff;background-color:#868e96}.badge-secondary[href]:focus,.badge-secondary[href]:hover{color:#fff;text-decoration:none;background-color:#6c757d}.badge-success{color:#fff;background-color:#28a745}.badge-success[href]:focus,.badge-success[href]:hover{color:#fff;text-decoration:none;background-color:#1e7e34}.badge-info{color:#fff;background-color:#17a2b8}.badge-info[href]:focus,.badge-info[href]:hover{color:#fff;text-decoration:none;background-color:#117a8b}.badge-warning{color:#111;background-color:#ffc107}.badge-warning[href]:focus,.badge-warning[href]:hover{color:#111;text-decoration:none;background-color:#d39e00}.badge-danger{color:#fff;background-color:#dc3545}.badge-danger[href]:focus,.badge-danger[href]:hover{color:#fff;text-decoration:none;background-color:#bd2130}.badge-light{color:#111;background-color:#f8f9fa}.badge-light[href]:focus,.badge-light[href]:hover{color:#111;text-decoration:none;background-color:#dae0e5}.badge-dark{color:#fff;background-color:#343a40}.badge-dark[href]:focus,.badge-dark[href]:hover{color:#fff;text-decoration:none;background-color:#1d2124}.jumbotron{padding:2rem 1rem;margin-bottom:2rem;background-color:#e9ecef;border-radius:.3rem}@media (min-width:576px){.jumbotron{padding:4rem 2rem}}.jumbotron-fluid{padding-right:0;padding-left:0;border-radius:0}.alert{padding:.75rem 1.25rem;margin-bottom:1rem;border:1px solid transparent;border-radius:.25rem}.alert-heading{color:inherit}.alert-link{font-weight:700}.alert-dismissible .close{position:relative;top:-.75rem;right:-1.25rem;padding:.75rem 1.25rem;color:inherit}.alert-primary{color:#004085;background-color:#cce5ff;border-color:#b8daff}.alert-primary hr{border-top-color:#9fcdff}.alert-primary .alert-link{color:#002752}.alert-secondary{color:#464a4e;background-color:#e7e8ea;border-color:#dddfe2}.alert-secondary hr{border-top-color:#cfd2d6}.alert-secondary .alert-link{color:#2e3133}.alert-success{color:#155724;background-color:#d4edda;border-color:#c3e6cb}.alert-success hr{border-top-color:#b1dfbb}.alert-success .alert-link{color:#0b2e13}.alert-info{color:#0c5460;background-color:#d1ecf1;border-color:#bee5eb}.alert-info hr{border-top-color:#abdde5}.alert-info .alert-link{color:#062c33}.alert-warning{color:#856404;background-color:#fff3cd;border-color:#ffeeba}.alert-warning hr{border-top-color:#ffe8a1}.alert-warning .alert-link{color:#533f03}.alert-danger{color:#721c24;background-color:#f8d7da;border-color:#f5c6cb}.alert-danger hr{border-top-color:#f1b0b7}.alert-danger .alert-link{color:#491217}.alert-light{color:#818182;background-color:#fefefe;border-color:#fdfdfe}.alert-light hr{border-top-color:#ececf6}.alert-light .alert-link{color:#686868}.alert-dark{color:#1b1e21;background-color:#d6d8d9;border-color:#c6c8ca}.alert-dark hr{border-top-color:#b9bbbe}.alert-dark .alert-link{color:#040505}@-webkit-keyframes progress-bar-stripes{0%{background-position:1rem 0}to{background-position:0 0}}@keyframes progress-bar-stripes{0%{background-position:1rem 0}to{background-position:0 0}}.progress{display:-ms-flexbox;display:flex;overflow:hidden;font-size:.75rem;line-height:1rem;text-align:center;background-color:#e9ecef;border-radius:.25rem}.progress-bar{height:1rem;line-height:1rem;color:#fff;background-color:#007bff;transition:width .6s ease}.progress-bar-striped{background-image:linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent);background-size:1rem 1rem}.progress-bar-animated{-webkit-animation:progress-bar-stripes 1s linear infinite;animation:progress-bar-stripes 1s linear infinite}.media{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start}.media-body{-ms-flex:1;flex:1}.list-group{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;padding-left:0;margin-bottom:0}.list-group-item-action{width:100%;color:#495057;text-align:inherit}.list-group-item-action:focus,.list-group-item-action:hover{color:#495057;text-decoration:none;background-color:#f8f9fa}.list-group-item-action:active{color:#212529;background-color:#e9ecef}.list-group-item{position:relative;display:block;padding:.75rem 1.25rem;margin-bottom:-1px;background-color:#fff;border:1px solid rgba(0,0,0,.125)}.list-group-item:first-child{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.list-group-item:last-child{margin-bottom:0;border-bottom-right-radius:.25rem;border-bottom-left-radius:.25rem}.list-group-item:focus,.list-group-item:hover{text-decoration:none}.list-group-item.disabled,.list-group-item:disabled{color:#868e96;background-color:#fff}.list-group-item.active{z-index:2;color:#fff;background-color:#007bff;border-color:#007bff}.list-group-flush .list-group-item{border-right:0;border-left:0;border-radius:0}.list-group-flush:first-child .list-group-item:first-child{border-top:0}.list-group-flush:last-child .list-group-item:last-child{border-bottom:0}.list-group-item-primary{color:#004085;background-color:#b8daff}a.list-group-item-primary,button.list-group-item-primary{color:#004085}a.list-group-item-primary:focus,a.list-group-item-primary:hover,button.list-group-item-primary:focus,button.list-group-item-primary:hover{color:#004085;background-color:#9fcdff}a.list-group-item-primary.active,button.list-group-item-primary.active{color:#fff;background-color:#004085;border-color:#004085}.list-group-item-secondary{color:#464a4e;background-color:#dddfe2}a.list-group-item-secondary,button.list-group-item-secondary{color:#464a4e}a.list-group-item-secondary:focus,a.list-group-item-secondary:hover,button.list-group-item-secondary:focus,button.list-group-item-secondary:hover{color:#464a4e;background-color:#cfd2d6}a.list-group-item-secondary.active,button.list-group-item-secondary.active{color:#fff;background-color:#464a4e;border-color:#464a4e}.list-group-item-success{color:#155724;background-color:#c3e6cb}a.list-group-item-success,button.list-group-item-success{color:#155724}a.list-group-item-success:focus,a.list-group-item-success:hover,button.list-group-item-success:focus,button.list-group-item-success:hover{color:#155724;background-color:#b1dfbb}a.list-group-item-success.active,button.list-group-item-success.active{color:#fff;background-color:#155724;border-color:#155724}.list-group-item-info{color:#0c5460;background-color:#bee5eb}a.list-group-item-info,button.list-group-item-info{color:#0c5460}a.list-group-item-info:focus,a.list-group-item-info:hover,button.list-group-item-info:focus,button.list-group-item-info:hover{color:#0c5460;background-color:#abdde5}a.list-group-item-info.active,button.list-group-item-info.active{color:#fff;background-color:#0c5460;border-color:#0c5460}.list-group-item-warning{color:#856404;background-color:#ffeeba}a.list-group-item-warning,button.list-group-item-warning{color:#856404}a.list-group-item-warning:focus,a.list-group-item-warning:hover,button.list-group-item-warning:focus,button.list-group-item-warning:hover{color:#856404;background-color:#ffe8a1}a.list-group-item-warning.active,button.list-group-item-warning.active{color:#fff;background-color:#856404;border-color:#856404}.list-group-item-danger{color:#721c24;background-color:#f5c6cb}a.list-group-item-danger,button.list-group-item-danger{color:#721c24}a.list-group-item-danger:focus,a.list-group-item-danger:hover,button.list-group-item-danger:focus,button.list-group-item-danger:hover{color:#721c24;background-color:#f1b0b7}a.list-group-item-danger.active,button.list-group-item-danger.active{color:#fff;background-color:#721c24;border-color:#721c24}.list-group-item-light{color:#818182;background-color:#fdfdfe}a.list-group-item-light,button.list-group-item-light{color:#818182}a.list-group-item-light:focus,a.list-group-item-light:hover,button.list-group-item-light:focus,button.list-group-item-light:hover{color:#818182;background-color:#ececf6}a.list-group-item-light.active,button.list-group-item-light.active{color:#fff;background-color:#818182;border-color:#818182}.list-group-item-dark{color:#1b1e21;background-color:#c6c8ca}a.list-group-item-dark,button.list-group-item-dark{color:#1b1e21}a.list-group-item-dark:focus,a.list-group-item-dark:hover,button.list-group-item-dark:focus,button.list-group-item-dark:hover{color:#1b1e21;background-color:#b9bbbe}a.list-group-item-dark.active,button.list-group-item-dark.active{color:#fff;background-color:#1b1e21;border-color:#1b1e21}.close{float:right;font-size:1.5rem;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:.5}.close:focus,.close:hover{color:#000;text-decoration:none;opacity:.75}button.close{padding:0;background:transparent;border:0;-webkit-appearance:none}.modal,.modal-open{overflow:hidden}.modal{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;display:none;outline:0}.modal.fade .modal-dialog{transition:-webkit-transform .3s ease-out;transition:transform .3s ease-out;transition:transform .3s ease-out,-webkit-transform .3s ease-out;-webkit-transform:translateY(-25%);transform:translateY(-25%)}.modal.show .modal-dialog{-webkit-transform:translate(0);transform:translate(0)}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.modal-dialog{position:relative;width:auto;margin:10px}.modal-content{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.2);border-radius:.3rem;outline:0}.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000}.modal-backdrop.fade{opacity:0}.modal-backdrop.show{opacity:.5}.modal-header{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;padding:15px;border-bottom:1px solid #e9ecef}.modal-title{margin-bottom:0;line-height:1.5}.modal-body{position:relative;-ms-flex:1 1 auto;flex:1 1 auto;padding:15px}.modal-footer{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:end;justify-content:flex-end;padding:15px;border-top:1px solid #e9ecef}.modal-footer>:not(:first-child){margin-left:.25rem}.modal-footer>:not(:last-child){margin-right:.25rem}.modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:576px){.modal-dialog{max-width:500px;margin:30px auto}.modal-sm{max-width:300px}}@media (min-width:992px){.modal-lg{max-width:800px}}.tooltip{position:absolute;z-index:1070;display:block;margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-style:normal;font-weight:400;line-height:1.5;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;white-space:normal;line-break:auto;font-size:.875rem;word-wrap:break-word;opacity:0}.tooltip.show{opacity:.9}.tooltip .arrow{position:absolute;display:block;width:5px;height:5px}.tooltip.bs-tooltip-auto[x-placement^=top],.tooltip.bs-tooltip-top{padding:5px 0}.tooltip.bs-tooltip-auto[x-placement^=top] .arrow,.tooltip.bs-tooltip-top .arrow{bottom:0}.tooltip.bs-tooltip-auto[x-placement^=top] .arrow:before,.tooltip.bs-tooltip-top .arrow:before{margin-left:-3px;content:\"\";border-width:5px 5px 0;border-top-color:#000}.tooltip.bs-tooltip-auto[x-placement^=right],.tooltip.bs-tooltip-right{padding:0 5px}.tooltip.bs-tooltip-auto[x-placement^=right] .arrow,.tooltip.bs-tooltip-right .arrow{left:0}.tooltip.bs-tooltip-auto[x-placement^=right] .arrow:before,.tooltip.bs-tooltip-right .arrow:before{margin-top:-3px;content:\"\";border-width:5px 5px 5px 0;border-right-color:#000}.tooltip.bs-tooltip-auto[x-placement^=bottom],.tooltip.bs-tooltip-bottom{padding:5px 0}.tooltip.bs-tooltip-auto[x-placement^=bottom] .arrow,.tooltip.bs-tooltip-bottom .arrow{top:0}.tooltip.bs-tooltip-auto[x-placement^=bottom] .arrow:before,.tooltip.bs-tooltip-bottom .arrow:before{margin-left:-3px;content:\"\";border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bs-tooltip-auto[x-placement^=left],.tooltip.bs-tooltip-left{padding:0 5px}.tooltip.bs-tooltip-auto[x-placement^=left] .arrow,.tooltip.bs-tooltip-left .arrow{right:0}.tooltip.bs-tooltip-auto[x-placement^=left] .arrow:before,.tooltip.bs-tooltip-left .arrow:before{right:0;margin-top:-3px;content:\"\";border-width:5px 0 5px 5px;border-left-color:#000}.tooltip .arrow:before{position:absolute;border-color:transparent;border-style:solid}.tooltip-inner{max-width:200px;padding:3px 8px;color:#fff;text-align:center;background-color:#000;border-radius:.25rem}.popover{top:0;left:0;z-index:1060;max-width:276px;padding:1px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-style:normal;font-weight:400;line-height:1.5;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;white-space:normal;line-break:auto;font-size:.875rem;word-wrap:break-word;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.2);border-radius:.3rem}.popover,.popover .arrow{position:absolute;display:block}.popover .arrow{width:10px;height:5px}.popover .arrow:after,.popover .arrow:before{position:absolute;display:block;border-color:transparent;border-style:solid}.popover .arrow:after,.popover .arrow:before{content:\"\";border-width:11px}.popover.bs-popover-auto[x-placement^=top],.popover.bs-popover-top{margin-bottom:10px}.popover.bs-popover-auto[x-placement^=top] .arrow,.popover.bs-popover-top .arrow{bottom:0}.popover.bs-popover-auto[x-placement^=top] .arrow:after,.popover.bs-popover-auto[x-placement^=top] .arrow:before,.popover.bs-popover-top .arrow:after,.popover.bs-popover-top .arrow:before{border-bottom-width:0}.popover.bs-popover-auto[x-placement^=top] .arrow:before,.popover.bs-popover-top .arrow:before{bottom:-11px;margin-left:-6px;border-top-color:rgba(0,0,0,.25)}.popover.bs-popover-auto[x-placement^=top] .arrow:after,.popover.bs-popover-top .arrow:after{bottom:-10px;margin-left:-6px;border-top-color:#fff}.popover.bs-popover-auto[x-placement^=right],.popover.bs-popover-right{margin-left:10px}.popover.bs-popover-auto[x-placement^=right] .arrow,.popover.bs-popover-right .arrow{left:0}.popover.bs-popover-auto[x-placement^=right] .arrow:after,.popover.bs-popover-auto[x-placement^=right] .arrow:before,.popover.bs-popover-right .arrow:after,.popover.bs-popover-right .arrow:before{margin-top:-8px;border-left-width:0}.popover.bs-popover-auto[x-placement^=right] .arrow:before,.popover.bs-popover-right .arrow:before{left:-11px;border-right-color:rgba(0,0,0,.25)}.popover.bs-popover-auto[x-placement^=right] .arrow:after,.popover.bs-popover-right .arrow:after{left:-10px;border-right-color:#fff}.popover.bs-popover-auto[x-placement^=bottom],.popover.bs-popover-bottom{margin-top:10px}.popover.bs-popover-auto[x-placement^=bottom] .arrow,.popover.bs-popover-bottom .arrow{top:0}.popover.bs-popover-auto[x-placement^=bottom] .arrow:after,.popover.bs-popover-auto[x-placement^=bottom] .arrow:before,.popover.bs-popover-bottom .arrow:after,.popover.bs-popover-bottom .arrow:before{margin-left:-7px;border-top-width:0}.popover.bs-popover-auto[x-placement^=bottom] .arrow:before,.popover.bs-popover-bottom .arrow:before{top:-11px;border-bottom-color:rgba(0,0,0,.25)}.popover.bs-popover-auto[x-placement^=bottom] .arrow:after,.popover.bs-popover-bottom .arrow:after{top:-10px;border-bottom-color:#fff}.popover.bs-popover-auto[x-placement^=bottom] .popover-header:before,.popover.bs-popover-bottom .popover-header:before{position:absolute;top:0;left:50%;display:block;width:20px;margin-left:-10px;content:\"\";border-bottom:1px solid #f7f7f7}.popover.bs-popover-auto[x-placement^=left],.popover.bs-popover-left{margin-right:10px}.popover.bs-popover-auto[x-placement^=left] .arrow,.popover.bs-popover-left .arrow{right:0}.popover.bs-popover-auto[x-placement^=left] .arrow:after,.popover.bs-popover-auto[x-placement^=left] .arrow:before,.popover.bs-popover-left .arrow:after,.popover.bs-popover-left .arrow:before{margin-top:-8px;border-right-width:0}.popover.bs-popover-auto[x-placement^=left] .arrow:before,.popover.bs-popover-left .arrow:before{right:-11px;border-left-color:rgba(0,0,0,.25)}.popover.bs-popover-auto[x-placement^=left] .arrow:after,.popover.bs-popover-left .arrow:after{right:-10px;border-left-color:#fff}.popover-header{padding:8px 14px;margin-bottom:0;font-size:1rem;color:inherit;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;border-top-left-radius:calc(.3rem - 1px);border-top-right-radius:calc(.3rem - 1px)}.popover-header:empty{display:none}.popover-body{padding:9px 14px;color:#212529}.carousel{position:relative}.carousel-inner{position:relative;width:100%;overflow:hidden}.carousel-item{position:relative;display:none;-ms-flex-align:center;align-items:center;width:100%;transition:-webkit-transform .6s ease;transition:transform .6s ease;transition:transform .6s ease,-webkit-transform .6s ease;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000px;perspective:1000px}.carousel-item-next,.carousel-item-prev,.carousel-item.active{display:block}.carousel-item-next,.carousel-item-prev{position:absolute;top:0}.carousel-item-next.carousel-item-left,.carousel-item-prev.carousel-item-right{-webkit-transform:translateX(0);transform:translateX(0)}@supports ((-webkit-transform-style:preserve-3d) or (transform-style:preserve-3d)){.carousel-item-next.carousel-item-left,.carousel-item-prev.carousel-item-right{-webkit-transform:translateZ(0);transform:translateZ(0)}}.active.carousel-item-right,.carousel-item-next{-webkit-transform:translateX(100%);transform:translateX(100%)}@supports ((-webkit-transform-style:preserve-3d) or (transform-style:preserve-3d)){.active.carousel-item-right,.carousel-item-next{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}.active.carousel-item-left,.carousel-item-prev{-webkit-transform:translateX(-100%);transform:translateX(-100%)}@supports ((-webkit-transform-style:preserve-3d) or (transform-style:preserve-3d)){.active.carousel-item-left,.carousel-item-prev{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}.carousel-control-next,.carousel-control-prev{position:absolute;top:0;bottom:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:15%;color:#fff;text-align:center;opacity:.5}.carousel-control-next:focus,.carousel-control-next:hover,.carousel-control-prev:focus,.carousel-control-prev:hover{color:#fff;text-decoration:none;outline:0;opacity:.9}.carousel-control-prev{left:0}.carousel-control-next{right:0}.carousel-control-next-icon,.carousel-control-prev-icon{display:inline-block;width:20px;height:20px;background:transparent no-repeat 50%;background-size:100% 100%}.carousel-control-prev-icon{background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\")}.carousel-control-next-icon{background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\")}.carousel-indicators{position:absolute;right:0;bottom:10px;left:0;z-index:15;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;padding-left:0;margin-right:15%;margin-left:15%;list-style:none}.carousel-indicators li{position:relative;-ms-flex:0 1 auto;flex:0 1 auto;width:30px;height:3px;margin-right:3px;margin-left:3px;text-indent:-999px;background-color:hsla(0,0%,100%,.5)}.carousel-indicators li:before{top:-10px}.carousel-indicators li:after,.carousel-indicators li:before{position:absolute;left:0;display:inline-block;width:100%;height:10px;content:\"\"}.carousel-indicators li:after{bottom:-10px}.carousel-indicators .active{background-color:#fff}.carousel-caption{position:absolute;right:15%;bottom:20px;left:15%;z-index:10;padding-top:20px;padding-bottom:20px;color:#fff;text-align:center}.align-baseline{vertical-align:baseline!important}.align-top{vertical-align:top!important}.align-middle{vertical-align:middle!important}.align-bottom{vertical-align:bottom!important}.align-text-bottom{vertical-align:text-bottom!important}.align-text-top{vertical-align:text-top!important}.bg-primary{background-color:#007bff!important}a.bg-primary:focus,a.bg-primary:hover{background-color:#0062cc!important}.bg-secondary{background-color:#868e96!important}a.bg-secondary:focus,a.bg-secondary:hover{background-color:#6c757d!important}.bg-success{background-color:#28a745!important}a.bg-success:focus,a.bg-success:hover{background-color:#1e7e34!important}.bg-info{background-color:#17a2b8!important}a.bg-info:focus,a.bg-info:hover{background-color:#117a8b!important}.bg-warning{background-color:#ffc107!important}a.bg-warning:focus,a.bg-warning:hover{background-color:#d39e00!important}.bg-danger{background-color:#dc3545!important}a.bg-danger:focus,a.bg-danger:hover{background-color:#bd2130!important}.bg-light{background-color:#f8f9fa!important}a.bg-light:focus,a.bg-light:hover{background-color:#dae0e5!important}.bg-dark{background-color:#343a40!important}a.bg-dark:focus,a.bg-dark:hover{background-color:#1d2124!important}.bg-white{background-color:#fff!important}.bg-transparent{background-color:transparent!important}.border{border:1px solid #e9ecef!important}.border-0{border:0!important}.border-top-0{border-top:0!important}.border-right-0{border-right:0!important}.border-bottom-0{border-bottom:0!important}.border-left-0{border-left:0!important}.border-primary{border-color:#007bff!important}.border-secondary{border-color:#868e96!important}.border-success{border-color:#28a745!important}.border-info{border-color:#17a2b8!important}.border-warning{border-color:#ffc107!important}.border-danger{border-color:#dc3545!important}.border-light{border-color:#f8f9fa!important}.border-dark{border-color:#343a40!important}.border-white{border-color:#fff!important}.rounded{border-radius:.25rem!important}.rounded-top{border-top-left-radius:.25rem!important}.rounded-right,.rounded-top{border-top-right-radius:.25rem!important}.rounded-bottom,.rounded-right{border-bottom-right-radius:.25rem!important}.rounded-bottom,.rounded-left{border-bottom-left-radius:.25rem!important}.rounded-left{border-top-left-radius:.25rem!important}.rounded-circle{border-radius:50%}.rounded-0{border-radius:0}.clearfix:after{display:block;clear:both;content:\"\"}.d-none{display:none!important}.d-inline{display:inline!important}.d-inline-block{display:inline-block!important}.d-block{display:block!important}.d-table{display:table!important}.d-table-cell{display:table-cell!important}.d-flex{display:-ms-flexbox!important;display:flex!important}.d-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}@media (min-width:576px){.d-sm-none{display:none!important}.d-sm-inline{display:inline!important}.d-sm-inline-block{display:inline-block!important}.d-sm-block{display:block!important}.d-sm-table{display:table!important}.d-sm-table-cell{display:table-cell!important}.d-sm-flex{display:-ms-flexbox!important;display:flex!important}.d-sm-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:768px){.d-md-none{display:none!important}.d-md-inline{display:inline!important}.d-md-inline-block{display:inline-block!important}.d-md-block{display:block!important}.d-md-table{display:table!important}.d-md-table-cell{display:table-cell!important}.d-md-flex{display:-ms-flexbox!important;display:flex!important}.d-md-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:992px){.d-lg-none{display:none!important}.d-lg-inline{display:inline!important}.d-lg-inline-block{display:inline-block!important}.d-lg-block{display:block!important}.d-lg-table{display:table!important}.d-lg-table-cell{display:table-cell!important}.d-lg-flex{display:-ms-flexbox!important;display:flex!important}.d-lg-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:1200px){.d-xl-none{display:none!important}.d-xl-inline{display:inline!important}.d-xl-inline-block{display:inline-block!important}.d-xl-block{display:block!important}.d-xl-table{display:table!important}.d-xl-table-cell{display:table-cell!important}.d-xl-flex{display:-ms-flexbox!important;display:flex!important}.d-xl-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}.d-print-block{display:none!important}@media print{.d-print-block{display:block!important}}.d-print-inline{display:none!important}@media print{.d-print-inline{display:inline!important}}.d-print-inline-block{display:none!important}@media print{.d-print-inline-block{display:inline-block!important}}@media print{.d-print-none{display:none!important}}.embed-responsive{position:relative;display:block;width:100%;padding:0;overflow:hidden}.embed-responsive:before{display:block;content:\"\"}.embed-responsive .embed-responsive-item,.embed-responsive embed,.embed-responsive iframe,.embed-responsive object,.embed-responsive video{position:absolute;top:0;bottom:0;left:0;width:100%;height:100%;border:0}.embed-responsive-21by9:before{padding-top:42.857143%}.embed-responsive-16by9:before{padding-top:56.25%}.embed-responsive-4by3:before{padding-top:75%}.embed-responsive-1by1:before{padding-top:100%}.flex-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.justify-content-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-center{-ms-flex-align:center!important;align-items:center!important}.align-items-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}@media (min-width:576px){.flex-sm-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-sm-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-sm-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-sm-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-sm-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-sm-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-sm-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.justify-content-sm-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-sm-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-sm-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-sm-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-sm-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-sm-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-sm-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-sm-center{-ms-flex-align:center!important;align-items:center!important}.align-items-sm-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-sm-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-sm-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-sm-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-sm-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-sm-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-sm-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-sm-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-sm-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-sm-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-sm-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-sm-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-sm-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-sm-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:768px){.flex-md-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-md-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-md-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-md-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-md-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-md-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-md-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.justify-content-md-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-md-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-md-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-md-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-md-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-md-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-md-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-md-center{-ms-flex-align:center!important;align-items:center!important}.align-items-md-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-md-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-md-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-md-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-md-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-md-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-md-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-md-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-md-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-md-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-md-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-md-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-md-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-md-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:992px){.flex-lg-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-lg-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-lg-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-lg-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-lg-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-lg-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-lg-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.justify-content-lg-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-lg-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-lg-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-lg-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-lg-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-lg-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-lg-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-lg-center{-ms-flex-align:center!important;align-items:center!important}.align-items-lg-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-lg-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-lg-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-lg-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-lg-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-lg-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-lg-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-lg-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-lg-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-lg-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-lg-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-lg-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-lg-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-lg-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:1200px){.flex-xl-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-xl-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-xl-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-xl-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-xl-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-xl-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-xl-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.justify-content-xl-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-xl-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-xl-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-xl-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-xl-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-xl-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-xl-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-xl-center{-ms-flex-align:center!important;align-items:center!important}.align-items-xl-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-xl-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-xl-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-xl-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-xl-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-xl-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-xl-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-xl-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-xl-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-xl-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-xl-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-xl-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-xl-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-xl-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}.float-left{float:left!important}.float-right{float:right!important}.float-none{float:none!important}@media (min-width:576px){.float-sm-left{float:left!important}.float-sm-right{float:right!important}.float-sm-none{float:none!important}}@media (min-width:768px){.float-md-left{float:left!important}.float-md-right{float:right!important}.float-md-none{float:none!important}}@media (min-width:992px){.float-lg-left{float:left!important}.float-lg-right{float:right!important}.float-lg-none{float:none!important}}@media (min-width:1200px){.float-xl-left{float:left!important}.float-xl-right{float:right!important}.float-xl-none{float:none!important}}.fixed-top{top:0}.fixed-bottom,.fixed-top{position:fixed;right:0;left:0;z-index:1030}.fixed-bottom{bottom:0}@supports ((position:-webkit-sticky) or (position:sticky)){.sticky-top{position:-webkit-sticky;position:sticky;top:0;z-index:1020}}.sr-only{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;-webkit-clip-path:inset(50%);clip-path:inset(50%);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;overflow:visible;clip:auto;white-space:normal;-webkit-clip-path:none;clip-path:none}.w-25{width:25%!important}.w-50{width:50%!important}.w-75{width:75%!important}.w-100{width:100%!important}.h-25{height:25%!important}.h-50{height:50%!important}.h-75{height:75%!important}.h-100{height:100%!important}.mw-100{max-width:100%!important}.mh-100{max-height:100%!important}.m-0{margin:0!important}.mt-0{margin-top:0!important}.mr-0{margin-right:0!important}.mb-0{margin-bottom:0!important}.ml-0,.mx-0{margin-left:0!important}.mx-0{margin-right:0!important}.my-0{margin-top:0!important;margin-bottom:0!important}.m-1{margin:.25rem!important}.mt-1{margin-top:.25rem!important}.mr-1{margin-right:.25rem!important}.mb-1{margin-bottom:.25rem!important}.ml-1,.mx-1{margin-left:.25rem!important}.mx-1{margin-right:.25rem!important}.my-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.m-2{margin:.5rem!important}.mt-2{margin-top:.5rem!important}.mr-2{margin-right:.5rem!important}.mb-2{margin-bottom:.5rem!important}.ml-2,.mx-2{margin-left:.5rem!important}.mx-2{margin-right:.5rem!important}.my-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.m-3{margin:1rem!important}.mt-3{margin-top:1rem!important}.mr-3{margin-right:1rem!important}.mb-3{margin-bottom:1rem!important}.ml-3,.mx-3{margin-left:1rem!important}.mx-3{margin-right:1rem!important}.my-3{margin-top:1rem!important;margin-bottom:1rem!important}.m-4{margin:1.5rem!important}.mt-4{margin-top:1.5rem!important}.mr-4{margin-right:1.5rem!important}.mb-4{margin-bottom:1.5rem!important}.ml-4,.mx-4{margin-left:1.5rem!important}.mx-4{margin-right:1.5rem!important}.my-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.m-5{margin:3rem!important}.mt-5{margin-top:3rem!important}.mr-5{margin-right:3rem!important}.mb-5{margin-bottom:3rem!important}.ml-5,.mx-5{margin-left:3rem!important}.mx-5{margin-right:3rem!important}.my-5{margin-top:3rem!important;margin-bottom:3rem!important}.p-0{padding:0!important}.pt-0{padding-top:0!important}.pr-0{padding-right:0!important}.pb-0{padding-bottom:0!important}.pl-0,.px-0{padding-left:0!important}.px-0{padding-right:0!important}.py-0{padding-top:0!important;padding-bottom:0!important}.p-1{padding:.25rem!important}.pt-1{padding-top:.25rem!important}.pr-1{padding-right:.25rem!important}.pb-1{padding-bottom:.25rem!important}.pl-1,.px-1{padding-left:.25rem!important}.px-1{padding-right:.25rem!important}.py-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.p-2{padding:.5rem!important}.pt-2{padding-top:.5rem!important}.pr-2{padding-right:.5rem!important}.pb-2{padding-bottom:.5rem!important}.pl-2,.px-2{padding-left:.5rem!important}.px-2{padding-right:.5rem!important}.py-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.p-3{padding:1rem!important}.pt-3{padding-top:1rem!important}.pr-3{padding-right:1rem!important}.pb-3{padding-bottom:1rem!important}.pl-3,.px-3{padding-left:1rem!important}.px-3{padding-right:1rem!important}.py-3{padding-top:1rem!important;padding-bottom:1rem!important}.p-4{padding:1.5rem!important}.pt-4{padding-top:1.5rem!important}.pr-4{padding-right:1.5rem!important}.pb-4{padding-bottom:1.5rem!important}.pl-4,.px-4{padding-left:1.5rem!important}.px-4{padding-right:1.5rem!important}.py-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.p-5{padding:3rem!important}.pt-5{padding-top:3rem!important}.pr-5{padding-right:3rem!important}.pb-5{padding-bottom:3rem!important}.pl-5,.px-5{padding-left:3rem!important}.px-5{padding-right:3rem!important}.py-5{padding-top:3rem!important;padding-bottom:3rem!important}.m-auto{margin:auto!important}.mt-auto{margin-top:auto!important}.mr-auto{margin-right:auto!important}.mb-auto{margin-bottom:auto!important}.ml-auto,.mx-auto{margin-left:auto!important}.mx-auto{margin-right:auto!important}.my-auto{margin-top:auto!important;margin-bottom:auto!important}@media (min-width:576px){.m-sm-0{margin:0!important}.mt-sm-0{margin-top:0!important}.mr-sm-0{margin-right:0!important}.mb-sm-0{margin-bottom:0!important}.ml-sm-0,.mx-sm-0{margin-left:0!important}.mx-sm-0{margin-right:0!important}.my-sm-0{margin-top:0!important;margin-bottom:0!important}.m-sm-1{margin:.25rem!important}.mt-sm-1{margin-top:.25rem!important}.mr-sm-1{margin-right:.25rem!important}.mb-sm-1{margin-bottom:.25rem!important}.ml-sm-1,.mx-sm-1{margin-left:.25rem!important}.mx-sm-1{margin-right:.25rem!important}.my-sm-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.m-sm-2{margin:.5rem!important}.mt-sm-2{margin-top:.5rem!important}.mr-sm-2{margin-right:.5rem!important}.mb-sm-2{margin-bottom:.5rem!important}.ml-sm-2,.mx-sm-2{margin-left:.5rem!important}.mx-sm-2{margin-right:.5rem!important}.my-sm-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.m-sm-3{margin:1rem!important}.mt-sm-3{margin-top:1rem!important}.mr-sm-3{margin-right:1rem!important}.mb-sm-3{margin-bottom:1rem!important}.ml-sm-3,.mx-sm-3{margin-left:1rem!important}.mx-sm-3{margin-right:1rem!important}.my-sm-3{margin-top:1rem!important;margin-bottom:1rem!important}.m-sm-4{margin:1.5rem!important}.mt-sm-4{margin-top:1.5rem!important}.mr-sm-4{margin-right:1.5rem!important}.mb-sm-4{margin-bottom:1.5rem!important}.ml-sm-4,.mx-sm-4{margin-left:1.5rem!important}.mx-sm-4{margin-right:1.5rem!important}.my-sm-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.m-sm-5{margin:3rem!important}.mt-sm-5{margin-top:3rem!important}.mr-sm-5{margin-right:3rem!important}.mb-sm-5{margin-bottom:3rem!important}.ml-sm-5,.mx-sm-5{margin-left:3rem!important}.mx-sm-5{margin-right:3rem!important}.my-sm-5{margin-top:3rem!important;margin-bottom:3rem!important}.p-sm-0{padding:0!important}.pt-sm-0{padding-top:0!important}.pr-sm-0{padding-right:0!important}.pb-sm-0{padding-bottom:0!important}.pl-sm-0,.px-sm-0{padding-left:0!important}.px-sm-0{padding-right:0!important}.py-sm-0{padding-top:0!important;padding-bottom:0!important}.p-sm-1{padding:.25rem!important}.pt-sm-1{padding-top:.25rem!important}.pr-sm-1{padding-right:.25rem!important}.pb-sm-1{padding-bottom:.25rem!important}.pl-sm-1,.px-sm-1{padding-left:.25rem!important}.px-sm-1{padding-right:.25rem!important}.py-sm-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.p-sm-2{padding:.5rem!important}.pt-sm-2{padding-top:.5rem!important}.pr-sm-2{padding-right:.5rem!important}.pb-sm-2{padding-bottom:.5rem!important}.pl-sm-2,.px-sm-2{padding-left:.5rem!important}.px-sm-2{padding-right:.5rem!important}.py-sm-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.p-sm-3{padding:1rem!important}.pt-sm-3{padding-top:1rem!important}.pr-sm-3{padding-right:1rem!important}.pb-sm-3{padding-bottom:1rem!important}.pl-sm-3,.px-sm-3{padding-left:1rem!important}.px-sm-3{padding-right:1rem!important}.py-sm-3{padding-top:1rem!important;padding-bottom:1rem!important}.p-sm-4{padding:1.5rem!important}.pt-sm-4{padding-top:1.5rem!important}.pr-sm-4{padding-right:1.5rem!important}.pb-sm-4{padding-bottom:1.5rem!important}.pl-sm-4,.px-sm-4{padding-left:1.5rem!important}.px-sm-4{padding-right:1.5rem!important}.py-sm-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.p-sm-5{padding:3rem!important}.pt-sm-5{padding-top:3rem!important}.pr-sm-5{padding-right:3rem!important}.pb-sm-5{padding-bottom:3rem!important}.pl-sm-5,.px-sm-5{padding-left:3rem!important}.px-sm-5{padding-right:3rem!important}.py-sm-5{padding-top:3rem!important;padding-bottom:3rem!important}.m-sm-auto{margin:auto!important}.mt-sm-auto{margin-top:auto!important}.mr-sm-auto{margin-right:auto!important}.mb-sm-auto{margin-bottom:auto!important}.ml-sm-auto,.mx-sm-auto{margin-left:auto!important}.mx-sm-auto{margin-right:auto!important}.my-sm-auto{margin-top:auto!important;margin-bottom:auto!important}}@media (min-width:768px){.m-md-0{margin:0!important}.mt-md-0{margin-top:0!important}.mr-md-0{margin-right:0!important}.mb-md-0{margin-bottom:0!important}.ml-md-0,.mx-md-0{margin-left:0!important}.mx-md-0{margin-right:0!important}.my-md-0{margin-top:0!important;margin-bottom:0!important}.m-md-1{margin:.25rem!important}.mt-md-1{margin-top:.25rem!important}.mr-md-1{margin-right:.25rem!important}.mb-md-1{margin-bottom:.25rem!important}.ml-md-1,.mx-md-1{margin-left:.25rem!important}.mx-md-1{margin-right:.25rem!important}.my-md-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.m-md-2{margin:.5rem!important}.mt-md-2{margin-top:.5rem!important}.mr-md-2{margin-right:.5rem!important}.mb-md-2{margin-bottom:.5rem!important}.ml-md-2,.mx-md-2{margin-left:.5rem!important}.mx-md-2{margin-right:.5rem!important}.my-md-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.m-md-3{margin:1rem!important}.mt-md-3{margin-top:1rem!important}.mr-md-3{margin-right:1rem!important}.mb-md-3{margin-bottom:1rem!important}.ml-md-3,.mx-md-3{margin-left:1rem!important}.mx-md-3{margin-right:1rem!important}.my-md-3{margin-top:1rem!important;margin-bottom:1rem!important}.m-md-4{margin:1.5rem!important}.mt-md-4{margin-top:1.5rem!important}.mr-md-4{margin-right:1.5rem!important}.mb-md-4{margin-bottom:1.5rem!important}.ml-md-4,.mx-md-4{margin-left:1.5rem!important}.mx-md-4{margin-right:1.5rem!important}.my-md-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.m-md-5{margin:3rem!important}.mt-md-5{margin-top:3rem!important}.mr-md-5{margin-right:3rem!important}.mb-md-5{margin-bottom:3rem!important}.ml-md-5,.mx-md-5{margin-left:3rem!important}.mx-md-5{margin-right:3rem!important}.my-md-5{margin-top:3rem!important;margin-bottom:3rem!important}.p-md-0{padding:0!important}.pt-md-0{padding-top:0!important}.pr-md-0{padding-right:0!important}.pb-md-0{padding-bottom:0!important}.pl-md-0,.px-md-0{padding-left:0!important}.px-md-0{padding-right:0!important}.py-md-0{padding-top:0!important;padding-bottom:0!important}.p-md-1{padding:.25rem!important}.pt-md-1{padding-top:.25rem!important}.pr-md-1{padding-right:.25rem!important}.pb-md-1{padding-bottom:.25rem!important}.pl-md-1,.px-md-1{padding-left:.25rem!important}.px-md-1{padding-right:.25rem!important}.py-md-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.p-md-2{padding:.5rem!important}.pt-md-2{padding-top:.5rem!important}.pr-md-2{padding-right:.5rem!important}.pb-md-2{padding-bottom:.5rem!important}.pl-md-2,.px-md-2{padding-left:.5rem!important}.px-md-2{padding-right:.5rem!important}.py-md-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.p-md-3{padding:1rem!important}.pt-md-3{padding-top:1rem!important}.pr-md-3{padding-right:1rem!important}.pb-md-3{padding-bottom:1rem!important}.pl-md-3,.px-md-3{padding-left:1rem!important}.px-md-3{padding-right:1rem!important}.py-md-3{padding-top:1rem!important;padding-bottom:1rem!important}.p-md-4{padding:1.5rem!important}.pt-md-4{padding-top:1.5rem!important}.pr-md-4{padding-right:1.5rem!important}.pb-md-4{padding-bottom:1.5rem!important}.pl-md-4,.px-md-4{padding-left:1.5rem!important}.px-md-4{padding-right:1.5rem!important}.py-md-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.p-md-5{padding:3rem!important}.pt-md-5{padding-top:3rem!important}.pr-md-5{padding-right:3rem!important}.pb-md-5{padding-bottom:3rem!important}.pl-md-5,.px-md-5{padding-left:3rem!important}.px-md-5{padding-right:3rem!important}.py-md-5{padding-top:3rem!important;padding-bottom:3rem!important}.m-md-auto{margin:auto!important}.mt-md-auto{margin-top:auto!important}.mr-md-auto{margin-right:auto!important}.mb-md-auto{margin-bottom:auto!important}.ml-md-auto,.mx-md-auto{margin-left:auto!important}.mx-md-auto{margin-right:auto!important}.my-md-auto{margin-top:auto!important;margin-bottom:auto!important}}@media (min-width:992px){.m-lg-0{margin:0!important}.mt-lg-0{margin-top:0!important}.mr-lg-0{margin-right:0!important}.mb-lg-0{margin-bottom:0!important}.ml-lg-0,.mx-lg-0{margin-left:0!important}.mx-lg-0{margin-right:0!important}.my-lg-0{margin-top:0!important;margin-bottom:0!important}.m-lg-1{margin:.25rem!important}.mt-lg-1{margin-top:.25rem!important}.mr-lg-1{margin-right:.25rem!important}.mb-lg-1{margin-bottom:.25rem!important}.ml-lg-1,.mx-lg-1{margin-left:.25rem!important}.mx-lg-1{margin-right:.25rem!important}.my-lg-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.m-lg-2{margin:.5rem!important}.mt-lg-2{margin-top:.5rem!important}.mr-lg-2{margin-right:.5rem!important}.mb-lg-2{margin-bottom:.5rem!important}.ml-lg-2,.mx-lg-2{margin-left:.5rem!important}.mx-lg-2{margin-right:.5rem!important}.my-lg-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.m-lg-3{margin:1rem!important}.mt-lg-3{margin-top:1rem!important}.mr-lg-3{margin-right:1rem!important}.mb-lg-3{margin-bottom:1rem!important}.ml-lg-3,.mx-lg-3{margin-left:1rem!important}.mx-lg-3{margin-right:1rem!important}.my-lg-3{margin-top:1rem!important;margin-bottom:1rem!important}.m-lg-4{margin:1.5rem!important}.mt-lg-4{margin-top:1.5rem!important}.mr-lg-4{margin-right:1.5rem!important}.mb-lg-4{margin-bottom:1.5rem!important}.ml-lg-4,.mx-lg-4{margin-left:1.5rem!important}.mx-lg-4{margin-right:1.5rem!important}.my-lg-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.m-lg-5{margin:3rem!important}.mt-lg-5{margin-top:3rem!important}.mr-lg-5{margin-right:3rem!important}.mb-lg-5{margin-bottom:3rem!important}.ml-lg-5,.mx-lg-5{margin-left:3rem!important}.mx-lg-5{margin-right:3rem!important}.my-lg-5{margin-top:3rem!important;margin-bottom:3rem!important}.p-lg-0{padding:0!important}.pt-lg-0{padding-top:0!important}.pr-lg-0{padding-right:0!important}.pb-lg-0{padding-bottom:0!important}.pl-lg-0,.px-lg-0{padding-left:0!important}.px-lg-0{padding-right:0!important}.py-lg-0{padding-top:0!important;padding-bottom:0!important}.p-lg-1{padding:.25rem!important}.pt-lg-1{padding-top:.25rem!important}.pr-lg-1{padding-right:.25rem!important}.pb-lg-1{padding-bottom:.25rem!important}.pl-lg-1,.px-lg-1{padding-left:.25rem!important}.px-lg-1{padding-right:.25rem!important}.py-lg-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.p-lg-2{padding:.5rem!important}.pt-lg-2{padding-top:.5rem!important}.pr-lg-2{padding-right:.5rem!important}.pb-lg-2{padding-bottom:.5rem!important}.pl-lg-2,.px-lg-2{padding-left:.5rem!important}.px-lg-2{padding-right:.5rem!important}.py-lg-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.p-lg-3{padding:1rem!important}.pt-lg-3{padding-top:1rem!important}.pr-lg-3{padding-right:1rem!important}.pb-lg-3{padding-bottom:1rem!important}.pl-lg-3,.px-lg-3{padding-left:1rem!important}.px-lg-3{padding-right:1rem!important}.py-lg-3{padding-top:1rem!important;padding-bottom:1rem!important}.p-lg-4{padding:1.5rem!important}.pt-lg-4{padding-top:1.5rem!important}.pr-lg-4{padding-right:1.5rem!important}.pb-lg-4{padding-bottom:1.5rem!important}.pl-lg-4,.px-lg-4{padding-left:1.5rem!important}.px-lg-4{padding-right:1.5rem!important}.py-lg-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.p-lg-5{padding:3rem!important}.pt-lg-5{padding-top:3rem!important}.pr-lg-5{padding-right:3rem!important}.pb-lg-5{padding-bottom:3rem!important}.pl-lg-5,.px-lg-5{padding-left:3rem!important}.px-lg-5{padding-right:3rem!important}.py-lg-5{padding-top:3rem!important;padding-bottom:3rem!important}.m-lg-auto{margin:auto!important}.mt-lg-auto{margin-top:auto!important}.mr-lg-auto{margin-right:auto!important}.mb-lg-auto{margin-bottom:auto!important}.ml-lg-auto,.mx-lg-auto{margin-left:auto!important}.mx-lg-auto{margin-right:auto!important}.my-lg-auto{margin-top:auto!important;margin-bottom:auto!important}}@media (min-width:1200px){.m-xl-0{margin:0!important}.mt-xl-0{margin-top:0!important}.mr-xl-0{margin-right:0!important}.mb-xl-0{margin-bottom:0!important}.ml-xl-0,.mx-xl-0{margin-left:0!important}.mx-xl-0{margin-right:0!important}.my-xl-0{margin-top:0!important;margin-bottom:0!important}.m-xl-1{margin:.25rem!important}.mt-xl-1{margin-top:.25rem!important}.mr-xl-1{margin-right:.25rem!important}.mb-xl-1{margin-bottom:.25rem!important}.ml-xl-1,.mx-xl-1{margin-left:.25rem!important}.mx-xl-1{margin-right:.25rem!important}.my-xl-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.m-xl-2{margin:.5rem!important}.mt-xl-2{margin-top:.5rem!important}.mr-xl-2{margin-right:.5rem!important}.mb-xl-2{margin-bottom:.5rem!important}.ml-xl-2,.mx-xl-2{margin-left:.5rem!important}.mx-xl-2{margin-right:.5rem!important}.my-xl-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.m-xl-3{margin:1rem!important}.mt-xl-3{margin-top:1rem!important}.mr-xl-3{margin-right:1rem!important}.mb-xl-3{margin-bottom:1rem!important}.ml-xl-3,.mx-xl-3{margin-left:1rem!important}.mx-xl-3{margin-right:1rem!important}.my-xl-3{margin-top:1rem!important;margin-bottom:1rem!important}.m-xl-4{margin:1.5rem!important}.mt-xl-4{margin-top:1.5rem!important}.mr-xl-4{margin-right:1.5rem!important}.mb-xl-4{margin-bottom:1.5rem!important}.ml-xl-4,.mx-xl-4{margin-left:1.5rem!important}.mx-xl-4{margin-right:1.5rem!important}.my-xl-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.m-xl-5{margin:3rem!important}.mt-xl-5{margin-top:3rem!important}.mr-xl-5{margin-right:3rem!important}.mb-xl-5{margin-bottom:3rem!important}.ml-xl-5,.mx-xl-5{margin-left:3rem!important}.mx-xl-5{margin-right:3rem!important}.my-xl-5{margin-top:3rem!important;margin-bottom:3rem!important}.p-xl-0{padding:0!important}.pt-xl-0{padding-top:0!important}.pr-xl-0{padding-right:0!important}.pb-xl-0{padding-bottom:0!important}.pl-xl-0,.px-xl-0{padding-left:0!important}.px-xl-0{padding-right:0!important}.py-xl-0{padding-top:0!important;padding-bottom:0!important}.p-xl-1{padding:.25rem!important}.pt-xl-1{padding-top:.25rem!important}.pr-xl-1{padding-right:.25rem!important}.pb-xl-1{padding-bottom:.25rem!important}.pl-xl-1,.px-xl-1{padding-left:.25rem!important}.px-xl-1{padding-right:.25rem!important}.py-xl-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.p-xl-2{padding:.5rem!important}.pt-xl-2{padding-top:.5rem!important}.pr-xl-2{padding-right:.5rem!important}.pb-xl-2{padding-bottom:.5rem!important}.pl-xl-2,.px-xl-2{padding-left:.5rem!important}.px-xl-2{padding-right:.5rem!important}.py-xl-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.p-xl-3{padding:1rem!important}.pt-xl-3{padding-top:1rem!important}.pr-xl-3{padding-right:1rem!important}.pb-xl-3{padding-bottom:1rem!important}.pl-xl-3,.px-xl-3{padding-left:1rem!important}.px-xl-3{padding-right:1rem!important}.py-xl-3{padding-top:1rem!important;padding-bottom:1rem!important}.p-xl-4{padding:1.5rem!important}.pt-xl-4{padding-top:1.5rem!important}.pr-xl-4{padding-right:1.5rem!important}.pb-xl-4{padding-bottom:1.5rem!important}.pl-xl-4,.px-xl-4{padding-left:1.5rem!important}.px-xl-4{padding-right:1.5rem!important}.py-xl-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.p-xl-5{padding:3rem!important}.pt-xl-5{padding-top:3rem!important}.pr-xl-5{padding-right:3rem!important}.pb-xl-5{padding-bottom:3rem!important}.pl-xl-5,.px-xl-5{padding-left:3rem!important}.px-xl-5{padding-right:3rem!important}.py-xl-5{padding-top:3rem!important;padding-bottom:3rem!important}.m-xl-auto{margin:auto!important}.mt-xl-auto{margin-top:auto!important}.mr-xl-auto{margin-right:auto!important}.mb-xl-auto{margin-bottom:auto!important}.ml-xl-auto,.mx-xl-auto{margin-left:auto!important}.mx-xl-auto{margin-right:auto!important}.my-xl-auto{margin-top:auto!important;margin-bottom:auto!important}}.text-justify{text-align:justify!important}.text-nowrap{white-space:nowrap!important}.text-truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.text-left{text-align:left!important}.text-right{text-align:right!important}.text-center{text-align:center!important}@media (min-width:576px){.text-sm-left{text-align:left!important}.text-sm-right{text-align:right!important}.text-sm-center{text-align:center!important}}@media (min-width:768px){.text-md-left{text-align:left!important}.text-md-right{text-align:right!important}.text-md-center{text-align:center!important}}@media (min-width:992px){.text-lg-left{text-align:left!important}.text-lg-right{text-align:right!important}.text-lg-center{text-align:center!important}}@media (min-width:1200px){.text-xl-left{text-align:left!important}.text-xl-right{text-align:right!important}.text-xl-center{text-align:center!important}}.text-lowercase{text-transform:lowercase!important}.text-uppercase{text-transform:uppercase!important}.text-capitalize{text-transform:capitalize!important}.font-weight-normal{font-weight:400}.font-weight-bold{font-weight:700}.font-italic{font-style:italic}.text-white{color:#fff!important}.text-primary{color:#007bff!important}a.text-primary:focus,a.text-primary:hover{color:#0062cc!important}.text-secondary{color:#868e96!important}a.text-secondary:focus,a.text-secondary:hover{color:#6c757d!important}.text-success{color:#28a745!important}a.text-success:focus,a.text-success:hover{color:#1e7e34!important}.text-info{color:#17a2b8!important}a.text-info:focus,a.text-info:hover{color:#117a8b!important}.text-warning{color:#ffc107!important}a.text-warning:focus,a.text-warning:hover{color:#d39e00!important}.text-danger{color:#dc3545!important}a.text-danger:focus,a.text-danger:hover{color:#bd2130!important}.text-light{color:#f8f9fa!important}a.text-light:focus,a.text-light:hover{color:#dae0e5!important}.text-dark{color:#343a40!important}a.text-dark:focus,a.text-dark:hover{color:#1d2124!important}.text-muted{color:#868e96!important}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.visible{visibility:visible!important}.invisible{visibility:hidden!important}", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".demo{float:left;margin:250px}.label{margin-right:1em}", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".datepicker[data-v-0526e06d]{position:relative;display:inline-block;color:#73879c;font:14px/1.5 Helvetica Neue,Helvetica,Arial,Microsoft Yahei,sans-serif}.datepicker [data-v-0526e06d]{box-sizing:border-box}.datepicker-popup[data-v-0526e06d]{position:absolute;width:250px;margin-top:1px;margin-bottom:1px;border:1px solid #d9d9d9;background-color:#fff;box-shadow:0 6px 12px rgba(0,0,0,.175);z-index:1000}.range[data-v-0526e06d]{width:750px}.input[data-v-0526e06d]{display:inline-block;width:100%;height:34px;padding:6px 30px 6px 10px;font-size:14px;line-height:1.4;color:#555;background-color:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.input-icon[data-v-0526e06d]{top:0;right:0;position:absolute;width:30px;height:100%;color:#888;text-align:center;font-style:normal}.input-icon[data-v-0526e06d]:after{content:\"\";display:inline-block;width:0;height:100%;vertical-align:middle}.input-icon__calendar[data-v-0526e06d]{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA00lEQVQ4T72SzQ2CQBCF54UGKIES6EAswQq0BS/A3PQ0hAt0oKVQgiVYAkcuZMwSMOyCyRKNe9uf+d6b2Qf6csGtL8sy7vu+Zebn/E5EoiAIwjRNH/PzBUBEGiJqmPniAMw+YeZkFSAiJwA3j45aVT0wsxGitwOjDGDnASBVvU4OLQARRURk9e4CAcSqWn8CLHp3Ae6MXAe/B4yzUeMkz/P9ZgdFUQzFIwD/B4yKgwMTos0OtvzCHcDRJ0gAzlmW1VYSq6oKu66LfQBTjC2AT+Hamxcml5IRpPq3VQAAAABJRU5ErkJggg==);background-position:50%;background-repeat:no-repeat}.input-icon__close[data-v-0526e06d]:before{content:\"\\2716\";vertical-align:middle}.datepicker-left[data-v-0526e06d]{margin:0 12px;line-height:34px;border-bottom:1px solid rgba(0,0,0,.05)}.datepicker-left>span[data-v-0526e06d]{white-space:nowrap;cursor:pointer}.datepicker-left>span[data-v-0526e06d]:hover{color:#1284e7}.datepicker-left>span[data-v-0526e06d]:after{content:\"|\";margin:0 10px;color:#48576a}", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".calendar[data-v-5897d82a]{float:left;padding:6px 12px}.calendar [data-v-5897d82a]{box-sizing:border-box}.calendar a[data-v-5897d82a]{color:inherit;text-decoration:none;cursor:pointer}.calendar-header[data-v-5897d82a]{line-height:34px;text-align:center}.calendar__next-icon[data-v-5897d82a],.calendar__prev-icon[data-v-5897d82a]{font-size:20px;padding:0 6px}.calendar-header>a[data-v-5897d82a]:hover{color:#1284e7}.calendar__prev-icon[data-v-5897d82a]{float:left}.calendar__next-icon[data-v-5897d82a]{float:right}.calendar-table[data-v-5897d82a]{width:100%;font-size:12px;table-layout:fixed;border-collapse:collapse;border-spacing:0}.calendar-table td[data-v-5897d82a],.calendar-table th[data-v-5897d82a]{width:32px;height:32px;text-align:center}.calendar-table td[data-v-5897d82a]{cursor:pointer}.calendar-month>a[data-v-5897d82a]:hover,.calendar-table td.inrange[data-v-5897d82a],.calendar-table td[data-v-5897d82a]:hover,.calendar-year>a[data-v-5897d82a]:hover{background-color:#eaf8fe}.calendar-month>a.current[data-v-5897d82a],.calendar-table td.current[data-v-5897d82a],.calendar-year>a.current[data-v-5897d82a]{color:#fff;background-color:#1284e7}.calendar-table td.disabled[data-v-5897d82a]{cursor:not-allowed;color:#ccc;background-color:#f3f3f3}.lastMonth[data-v-5897d82a],.nextMonth[data-v-5897d82a]{color:#ddd}.today[data-v-5897d82a]{color:#20a0ff}.calendar-month[data-v-5897d82a],.calendar-year[data-v-5897d82a]{width:100%;height:224px;padding:7px 0;text-align:center}.calendar-year>a[data-v-5897d82a]{display:inline-block;width:40%;margin:1px 5%;line-height:40px}.calendar-month>a[data-v-5897d82a]{display:inline-block;width:30%;line-height:40px;margin:8px 1.5%}", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(28)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(12),
  /* template */
  __webpack_require__(25),
  /* scopeId */
  "data-v-5897d82a",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(27)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(24),
  /* scopeId */
  "data-v-0526e06d",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('div', {
    staticClass: "demo"
  }, [_c('date-picker', {
    attrs: {
      "range": "",
      "lang": "en"
    },
    model: {
      value: (_vm.value),
      callback: function($$v) {
        _vm.value = $$v
      },
      expression: "value"
    }
  })], 1)])
},staticRenderFns: []}

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "clickoutside",
      rawName: "v-clickoutside",
      value: (_vm.closePopup),
      expression: "closePopup"
    }],
    staticClass: "datepicker",
    style: ({
      'width': _vm.width + 'px',
      'min-width': _vm.range ? '210px' : '140px'
    })
  }, [_c('input', {
    ref: "input",
    staticClass: "input",
    attrs: {
      "readonly": "",
      "placeholder": _vm.innerPlaceholder
    },
    domProps: {
      "value": _vm.text
    },
    on: {
      "click": _vm.togglePopup,
      "mousedown": function($event) {
        $event.preventDefault()
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "input-icon",
    class: _vm.showCloseIcon ? 'input-icon__close' : 'input-icon__calendar',
    on: {
      "mouseenter": _vm.hoverIcon,
      "mouseleave": _vm.hoverIcon,
      "click": _vm.clickIcon
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showPopup),
      expression: "showPopup"
    }],
    ref: "calendar",
    staticClass: "datepicker-popup",
    class: {
      'range': _vm.range
    },
    style: (_vm.position)
  }, [(!_vm.range) ? [_c('calendar-panel', {
    attrs: {
      "show": _vm.showPopup
    },
    on: {
      "select": function($event) {
        _vm.showPopup = false
      }
    },
    model: {
      value: (_vm.currentValue),
      callback: function($$v) {
        _vm.currentValue = $$v
      },
      expression: "currentValue"
    }
  })] : [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-4"
  }, [_c('calendar-panel', {
    staticStyle: {
      "box-shadow": "1px 0 rgba(0, 0, 0, .1)"
    },
    attrs: {
      "end-at": _vm.currentValue[1],
      "show": _vm.showPopup
    },
    model: {
      value: (_vm.currentValue[0]),
      callback: function($$v) {
        _vm.$set(_vm.currentValue, 0, $$v)
      },
      expression: "currentValue[0]"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-4"
  }, [_c('calendar-panel', {
    attrs: {
      "start-at": _vm.currentValue[0],
      "show": _vm.showPopup
    },
    model: {
      value: (_vm.currentValue[1]),
      callback: function($$v) {
        _vm.$set(_vm.currentValue, 1, $$v)
      },
      expression: "currentValue[1]"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-4"
  }, [(_vm.ranges.length) ? _c('div', {
    staticClass: "datepicker-left"
  }, [_vm._l((_vm.ranges), function(range) {
    return _c('button', {
      staticClass: "btn btn-sm btn-primary",
      staticStyle: {
        "display": "block",
        "margin": "5px",
        "width": "100%"
      },
      attrs: {
        "type": "button"
      },
      on: {
        "click": function($event) {
          _vm.selectRange(range)
        }
      }
    }, [_vm._v("\n                " + _vm._s(range.text) + "\n              ")])
  }), _vm._v(" "), _c('button', {
    staticClass: "btn btn-sm btn-success",
    staticStyle: {
      "margin": "5px"
    },
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.closePopup
    }
  }, [_vm._v("Apply")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-sm btn-secondary",
    staticStyle: {
      "margin": "5px"
    },
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.clickCancel
    }
  }, [_vm._v("Cancel")])], 2) : _vm._e()])])])]], 2)])
},staticRenderFns: []}

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "calendar"
  }, [_c('div', {
    staticClass: "calendar-header"
  }, [_c('a', {
    staticClass: "calendar__prev-icon",
    on: {
      "click": function($event) {
        _vm.changeYear(-1)
      }
    }
  }, [_vm._v("«")]), _vm._v(" "), _c('a', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentPanel === 'date'),
      expression: "currentPanel === 'date'"
    }],
    staticClass: "calendar__prev-icon",
    on: {
      "click": function($event) {
        _vm.changeMonth(-1)
      }
    }
  }, [_vm._v("‹")]), _vm._v(" "), _c('a', {
    staticClass: "calendar__next-icon",
    on: {
      "click": function($event) {
        _vm.changeYear(1)
      }
    }
  }, [_vm._v("»")]), _vm._v(" "), _c('a', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentPanel === 'date'),
      expression: "currentPanel === 'date'"
    }],
    staticClass: "calendar__next-icon",
    on: {
      "click": function($event) {
        _vm.changeMonth(1)
      }
    }
  }, [_vm._v("›")]), _vm._v(" "), _c('a', {
    on: {
      "click": _vm.showMonths
    }
  }, [_vm._v(_vm._s(_vm.months[_vm.currentMonth]))]), _vm._v(" "), _c('a', {
    on: {
      "click": _vm.showYears
    }
  }, [_vm._v(_vm._s(_vm.currentYear))])]), _vm._v(" "), _c('div', {
    staticClass: "calendar-content"
  }, [_c('table', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentPanel === 'date'),
      expression: "currentPanel === 'date'"
    }],
    staticClass: "calendar-table"
  }, [_c('thead', [_c('tr', _vm._l((_vm.days), function(day) {
    return _c('th', [_vm._v(_vm._s(day))])
  }))]), _vm._v(" "), _c('tbody', _vm._l((_vm.dates), function(row) {
    return _c('tr', _vm._l((row), function(cell) {
      return _c('td', {
        class: _vm.getClasses(cell),
        attrs: {
          "title": cell.title
        },
        on: {
          "click": function($event) {
            _vm.selectDate(cell)
          }
        }
      }, [_vm._v(_vm._s(cell.day))])
    }))
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentPanel === 'years'),
      expression: "currentPanel === 'years'"
    }],
    staticClass: "calendar-year"
  }, _vm._l((_vm.years), function(year) {
    return _c('a', {
      class: {
        'current': _vm.currentYear === year
      },
      on: {
        "click": function($event) {
          _vm.selectYear(year)
        }
      }
    }, [_vm._v(_vm._s(year))])
  })), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentPanel === 'months'),
      expression: "currentPanel === 'months'"
    }],
    staticClass: "calendar-month"
  }, _vm._l((_vm.months), function(month, index) {
    return _c('a', {
      class: {
        'current': _vm.currentMonth === index
      },
      on: {
        "click": function($event) {
          _vm.selectMonth(index)
        }
      }
    }, [_vm._v(_vm._s(month))])
  }))])])
},staticRenderFns: []}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("01ab9655", content, true);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("752b8e02", content, true);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("27b31dcd", content, true);

/***/ }),
/* 29 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map
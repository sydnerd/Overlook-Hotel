/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* This is an example of using Sass, otherwise plain CSS works too*/\n/* RESET */\nnav, body, h1, h2, h3 {\n  margin: 0;\n  padding: 0;\n  text-decoration: none;\n}\n\n/* MOBILE STYLING */\n* {\n  color: white;\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 400;\n  font-size: 1em;\n  line-height: 1.5;\n}\n\nnav {\n  background-color: black;\n  display: flex;\n  justify-content: space-between;\n  margin: 0;\n  padding: 0;\n}\n\n.colored-icon {\n  color: #359DDB;\n}\n\n.company-logo {\n  margin-bottom: 0;\n  margin-top: 0.5em;\n  font-family: \"Fjalla One\", sans-serif;\n  font-size: 2em;\n}\n\n.left-dropdown {\n  font-size: 0.5em;\n  margin-bottom: 0.5em;\n}\n\n.drop-downs {\n  margin-top: 0;\n}\n\n.left-dropdown {\n  margin-right: 1em;\n}\n\n.nav-icons,\n.left-nav,\n.username {\n  display: flex;\n}\n\n.home-icon,\n.star-icon,\n.night-icon,\n.bed-icon,\n.account-icon {\n  display: none;\n}\n\n.left-nav {\n  margin-top: 6em;\n  margin-left: 1em;\n}\n\n.username {\n  margin-top: 1em;\n}\n\nbody {\n  background-color: #EFEFEF;\n}\n\n.right-logo {\n  padding-bottom: 0;\n}\n\n.hotel-logo {\n  margin-top: 1em;\n  font-size: 2em;\n  color: #359DDB;\n}\n\n.colored-word {\n  color: #9D9D9E;\n}\n\nh2 {\n  color: #4D4D4D;\n  font-size: 3em;\n  padding: 25px;\n}\n\nh3 {\n  color: #4D4D4D;\n  font-size: 1em;\n  padding: 5px;\n}\n\n.image-container {\n  background-color: #FFFFFF;\n  position: relative;\n  display: grid;\n  grid-template-rows: repeat(6, 1fr);\n  grid-template-columns: 1fr;\n  gap: 10px;\n  height: 30em;\n  padding: 25px;\n  margin-top: 25px;\n}\n\n.hotel-image {\n  width: 100%;\n  height: 100%;\n}\n\n.left-nav {\n  display: block;\n}\n\n/* SMALL TABLET STYLING */\n@media screen and (min-width: 620px) {\n  .home-icon,\n.star-icon,\n.night-icon,\n.bed-icon,\n.account-icon {\n    display: inline;\n  }\n\n  .left-nav {\n    display: flex;\n  }\n\n  .left-dropdown {\n    font-size: 1em;\n  }\n\n  .image-container {\n    background-color: #FFFFFF;\n    position: relative;\n    display: grid;\n    grid-template-rows: repeat(6, 1fr);\n    grid-template-columns: 1fr;\n    gap: 10px;\n    height: 30em;\n    padding: 25px;\n    margin-top: 25px;\n  }\n}\n/* LARGE TABLET AND LAPTOP STYLING  */\n@media screen and (min-width: 960px) {\n  .image-container {\n    background-color: #FFFFFF;\n    position: relative;\n    display: grid;\n    grid-template-rows: repeat(3, 1fr);\n    grid-template-columns: 1fr 1fr;\n    gap: 10px;\n    height: 30em;\n    padding: 25px;\n    box-shadow: 5px 5px #BCBCBC;\n    margin-top: 25px;\n    margin-left: 25px;\n  }\n\n  .share-icon,\n.heart-icon,\n.person-icon,\n.account-icon {\n    display: inline;\n  }\n}\n/* DESKTOP STYLING  */\n@media screen and (min-width: 1200px) {\n  .card-section {\n    padding: 20px;\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    grid-template-rows: repeat(2, 1fr);\n  }\n\n  .one {\n    grid-area: 1/1/2/2;\n  }\n\n  .two {\n    grid-area: 1/2/2/3;\n  }\n\n  .three {\n    grid-area: 1/3/3/4;\n  }\n\n  .four {\n    grid-area: 1/4/2/5;\n  }\n\n  .five {\n    grid-area: 2/1/3/2;\n  }\n\n  .six {\n    grid-area: 2/2/3/3;\n  }\n\n  .seven {\n    grid-area: 2/3/3/4;\n  }\n\n  .eight {\n    grid-area: 2/4/3/5;\n  }\n\n  .card-container {\n    background-color: #FFFFFF;\n    position: relative;\n    display: grid;\n    grid-template-rows: repeat(5, 1fr);\n    grid-template-columns: 1fr;\n    gap: 10px;\n    height: 30em;\n    padding: 25px;\n    box-shadow: 5px 5px #BCBCBC;\n    margin-top: 25px;\n    margin-left: 25px;\n  }\n\n  .home-icon,\n.star-icon,\n.night-icon,\n.bed-icon,\n.account-icon {\n    display: inline;\n  }\n}\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/base.scss"],"names":[],"mappings":"AAAA,mEAAA;AASA,UAAA;AACA;EACE,SAAA;EACA,UAAA;EACA,qBAAA;AAPF;;AAUA,mBAAA;AACA;EACE,YAAA;EACA,iCAAA;EACA,gBAAA;EACA,cAAA;EACA,gBAAA;AAPF;;AAUA;EACE,uBAAA;EACA,aAAA;EACA,8BAAA;EACA,SAAA;EACA,UAAA;AAPF;;AAUA;EACE,cAAA;AAPF;;AAUA;EACE,gBAAA;EACA,iBAAA;EACA,qCAAA;EACA,cAAA;AAPF;;AAUA;EACE,gBAAA;EACA,oBAAA;AAPF;;AAUA;EACE,aAAA;AAPF;;AAUA;EACE,iBAAA;AAPF;;AAUA;;;EAGE,aAAA;AAPF;;AAUA;;;;;EAKE,aAAA;AAPF;;AAUA;EACE,eAAA;EACA,gBAAA;AAPF;;AAUA;EACE,eAAA;AAPF;;AAUA;EACE,yBAAA;AAPF;;AAUA;EACE,iBAAA;AAPF;;AAUA;EACE,eAAA;EACA,cAAA;EACA,cAAA;AAPF;;AAUA;EACE,cAAA;AAPF;;AAUA;EACE,cAAA;EACA,cAAA;EACA,aAAA;AAPF;;AAUA;EACE,cAAA;EACA,cAAA;EACA,YAAA;AAPF;;AAWA;EACE,yBAAA;EACA,kBAAA;EACA,aAAA;EACA,kCAAA;EACA,0BAAA;EACA,SAAA;EACA,YAAA;EACA,aAAA;EACA,gBAAA;AARF;;AAWA;EACE,WAAA;EACA,YAAA;AARF;;AAWA;EACE,cAAA;AARF;;AAYA,yBAAA;AACA;EACE;;;;;IAKE,eAAA;EATF;;EAWA;IACE,aAAA;EARF;;EAUA;IACE,cAAA;EAPF;;EASA;IACE,yBAAA;IACA,kBAAA;IACA,aAAA;IACA,kCAAA;IACA,0BAAA;IACA,SAAA;IACA,YAAA;IACA,aAAA;IACA,gBAAA;EANF;AACF;AASA,qCAAA;AACA;EAEE;IACE,yBAAA;IACA,kBAAA;IACA,aAAA;IACA,kCAAA;IACA,8BAAA;IACA,SAAA;IACA,YAAA;IACA,aAAA;IACA,2BAAA;IACA,gBAAA;IACA,iBAAA;EARF;;EAWA;;;;IAIE,eAAA;EARF;AACF;AAWA,qBAAA;AACA;EACE;IACE,aAAA;IACA,aAAA;IACA,qCAAA;IACA,kCAAA;EATF;;EAYA;IACE,kBAAA;EATF;;EAYA;IACE,kBAAA;EATF;;EAYA;IACE,kBAAA;EATF;;EAYA;IACE,kBAAA;EATF;;EAYA;IACE,kBAAA;EATF;;EAYA;IACE,kBAAA;EATF;;EAYA;IACE,kBAAA;EATF;;EAYA;IACE,kBAAA;EATF;;EAYA;IACE,yBAAA;IACA,kBAAA;IACA,aAAA;IACA,kCAAA;IACA,0BAAA;IACA,SAAA;IACA,YAAA;IACA,aAAA;IACA,2BAAA;IACA,gBAAA;IACA,iBAAA;EATF;;EAYA;;;;;IAKE,eAAA;EATF;AACF;AAYA;EACE,aAAA;AAVF","sourcesContent":["/* This is an example of using Sass, otherwise plain CSS works too*/\n// $primary-background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);\n\n// body {\n//   background: $primary-background;\n// }\n\n\n\n/* RESET */\nnav, body, h1, h2,h3 {\n  margin: 0;\n  padding: 0;\n  text-decoration: none;\n}\n\n/* MOBILE STYLING */\n* {\n  color: rgba(255, 255, 255, 1);\n  font-family: 'Roboto', sans-serif;\n  font-weight: 400;\n  font-size: 1em;\n  line-height: 1.5;\n}\n\nnav {\n  background-color: black;\n  display: flex;\n  justify-content: space-between;\n  margin: 0;\n  padding: 0;\n}\n\n.colored-icon {\n  color: #359DDB\n}\n\n.company-logo {\n  margin-bottom: 0;\n  margin-top: .5em;\n  font-family: 'Fjalla One', sans-serif;\n  font-size: 2em;\n}\n\n.left-dropdown {\n  font-size: .5em;\n  margin-bottom: .5em;\n}\n\n.drop-downs {\n  margin-top: 0;\n}\n\n.left-dropdown {\n  margin-right: 1em;\n}\n\n.nav-icons,\n.left-nav,\n.username {\n  display: flex;\n}\n\n.home-icon,\n.star-icon,\n.night-icon,\n.bed-icon,\n.account-icon {\n  display: none;\n}\n\n.left-nav {\n  margin-top: 6em;\n  margin-left: 1em;\n}\n\n.username {\n  margin-top: 1em;\n}\n\nbody {\n  background-color: #EFEFEF;\n}\n\n.right-logo {\n  padding-bottom: 0;\n}\n\n.hotel-logo {\n  margin-top: 1em;\n  font-size: 2em;\n  color: #359DDB;\n}\n\n.colored-word {\n  color: #9D9D9E;\n}\n\nh2 {\n  color: #4D4D4D;\n  font-size: 3em;\n  padding: 25px;\n}\n\nh3 {\n  color: #4D4D4D;\n  font-size: 1em;\n  padding: 5px;\n}\n\n\n.image-container {\n  background-color: #FFFFFF;\n  position: relative;\n  display: grid;\n  grid-template-rows: repeat(6, 1fr);\n  grid-template-columns: 1fr;\n  gap: 10px;\n  height: 30em;\n  padding: 25px;\n  margin-top: 25px;\n}\n\n.hotel-image {\n  width: 100%;\n  height: 100%;\n}\n\n.left-nav {\n  display: block;\n}\n\n\n/* SMALL TABLET STYLING */\n@media screen and (min-width: 620px) {\n  .home-icon,\n  .star-icon,\n  .night-icon,\n  .bed-icon,\n  .account-icon {\n    display: inline;\n  }\n  .left-nav {\n    display: flex;\n  }\n  .left-dropdown {\n    font-size: 1em;\n  }\n  .image-container {\n    background-color: #FFFFFF;\n    position: relative;\n    display: grid;\n    grid-template-rows: repeat(6, 1fr);\n    grid-template-columns: 1fr;\n    gap: 10px;\n    height: 30em;\n    padding: 25px;\n    margin-top: 25px;\n  }\n}\n\n/* LARGE TABLET AND LAPTOP STYLING  */\n@media screen and (min-width: 960px) {\n\n  .image-container {\n    background-color: #FFFFFF;\n    position: relative;\n    display: grid;\n    grid-template-rows: repeat(3, 1fr);\n    grid-template-columns: 1fr 1fr;\n    gap: 10px;\n    height: 30em;\n    padding: 25px;\n    box-shadow: 5px 5px #BCBCBC;\n    margin-top: 25px;\n    margin-left: 25px;\n  }\n\n  .share-icon,\n  .heart-icon,\n  .person-icon,\n  .account-icon {\n    display: inline;\n  }\n}\n\n/* DESKTOP STYLING  */\n@media screen and (min-width: 1200px) {\n  .card-section {\n    padding: 20px;\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    grid-template-rows: repeat(2, 1fr);\n  }\n\n  .one {\n    grid-area: 1/1/2/2;\n  }\n\n  .two {\n    grid-area: 1/2/2/3;\n  }\n\n  .three {\n    grid-area: 1/3/3/4;\n  }\n\n  .four {\n    grid-area: 1/4/2/5;\n  }\n\n  .five {\n    grid-area: 2/1/3/2;\n  }\n\n  .six {\n    grid-area: 2/2/3/3\n  }\n\n  .seven {\n    grid-area: 2/3/3/4\n  }\n\n  .eight {\n    grid-area: 2/4/3/5;\n  }\n\n  .card-container {\n    background-color: #FFFFFF;\n    position: relative;\n    display: grid;\n    grid-template-rows: repeat(5, 1fr);\n    grid-template-columns: 1fr;\n    gap: 10px;\n    height: 30em;\n    padding: 25px;\n    box-shadow: 5px 5px #BCBCBC;\n    margin-top: 25px;\n    margin-left: 25px;\n  }\n\n  .home-icon,\n  .star-icon,\n  .night-icon,\n  .bed-icon,\n  .account-icon {\n    display: inline;\n  }\n}\n\n.hidden {\n  display:none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAllData": () => (/* binding */ fetchAllData)
/* harmony export */ });


const fetchAllData = () => {
    const promises = [getCustomerData(), getRoomsData(), getBookingsData()]
    return Promise.all(promises)
        .catch(error => console.log("ERROR"))
}
const getCustomerData = () => {
  fetch("http://localhost:3001/api/v1/customers")
    .then(response => response.json())
    .catch(err => console.log("ERROR"))
}


const getRoomsData = () => {
  fetch("http://localhost:3001/api/v1/rooms")
    .then(response => response.json())
    .catch(err => console.log("ERROR"))
}


const getBookingsData = () => {
  fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
    .catch(err => console.log("ERROR"))
}




/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img1.jpg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img2.jpg");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img3.jpg");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img4.jpg");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img5.jpg");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img6.jpg");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
Object(function webpackMissingModule() { var e = new Error("Cannot find module './images/turing-logo.png'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _images_img1_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _images_img2_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _images_img3_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _images_img4_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _images_img5_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);
/* harmony import */ var _images_img6_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(12);
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file


// An example of how you tell webpack to use an image (also need to link to it in the index.html)








//Variables

//Event Listeners
window.addEventListener("load", getData)
//WINDOW LOAD FUNCTION
function getData() {
  ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchAllData)()
  console.log((0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchAllData)())
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
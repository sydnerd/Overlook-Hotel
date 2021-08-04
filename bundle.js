/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";


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

"use strict";
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
___CSS_LOADER_EXPORT___.push([module.id, "/* RESET */\nnav, body, h1, h2, h3 {\n  margin: 0;\n  padding: 0;\n  text-decoration: none;\n}\n\n* {\n  color: #FFFFFF;\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 400;\n  font-size: 1em;\n  line-height: 1.5;\n}\n\nnav {\n  background-color: black;\n  display: flex;\n  justify-content: space-between;\n  margin: 0;\n  padding: 0;\n}\n\n.colored-icon {\n  color: #359DDB;\n}\n\n.error-msg {\n  color: red;\n}\n\n.company-logo {\n  margin-bottom: 0;\n  margin-top: 0.5em;\n  font-family: \"Fjalla One\", sans-serif;\n  font-size: 2em;\n}\n\n.left-dropdown:hover {\n  font-size: 0.5em;\n  margin-bottom: 0.5em;\n  cursor: pointer;\n}\n\n.drop-downs {\n  margin-top: 0;\n}\n\n.left-dropdown {\n  margin-right: 1em;\n}\n\n.left-nav,\n.nav-icons,\n.username {\n  display: flex;\n}\n\n.account-icon,\n.bed-icon,\n.home-icon,\n.night-icon,\n.star-icon {\n  display: none;\n}\n\n.left-nav {\n  margin-top: 6em;\n  margin-left: 1em;\n  display: block;\n}\n\n.username {\n  margin-top: 1em;\n}\n\nbody {\n  background-color: #EFEFEF;\n}\n\n.right-logo {\n  padding-bottom: 0;\n}\n\n.hotel-logo {\n  margin-top: 1em;\n  font-size: 2em;\n  color: #359DDB;\n}\n\n.colored-word {\n  color: #9D9D9E;\n}\n\nh2 {\n  color: #4D4D4D;\n  font-size: 3em;\n  padding: 25px;\n}\n\nh3 {\n  color: #4D4D4D;\n  font-size: 1em;\n  padding: 5px;\n}\n\n.total-cost-container {\n  display: flex;\n}\n\n.image-container {\n  position: relative;\n  display: grid;\n  grid-template-rows: repeat(6, 1fr);\n  grid-template-columns: 1fr;\n  gap: 10px;\n  height: 30em;\n  padding: 25px;\n  margin-top: 25px;\n}\n\n.hotel-image {\n  width: 100%;\n  height: 100%;\n}\n\n.book-room-section {\n  display: flex;\n  justify-content: space-between;\n  margin-left: 5%;\n  border-radius: 5px;\n}\n\n.book-room-titles,\n.login-form-submit {\n  color: #4D4D4D;\n  font-size: 1.5em;\n}\n\n.book-now-button,\n.check-availability-btn,\n.login-form-submit:hover,\n.submit-btn {\n  color: #4D4D4D;\n  border-radius: 5px;\n  cursor: pointer;\n}\n\n.input-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 50px;\n}\n\n.input {\n  margin-top: 5px;\n}\n\n.login-page {\n  display: flex;\n  justify-content: center;\n  margin-top: 100px;\n}\n\n.booking-error,\n.login-error {\n  font-size: 1em;\n  color: red;\n}\n\n.login-title {\n  font-size: 3em;\n  color: #4D4D4D;\n}\n\n.login-form-input {\n  color: #4D4D4D;\n}\n\n.calendar:hover,\n.select-room,\n.submit-btn {\n  cursor: pointer;\n}\n\n.total-cost {\n  font-size: 1.5em;\n}\n\n.available-room-card,\n.filtered-room-card,\n.past-stays-card,\n.upcoming-stays-card {\n  background-color: #9D9D9E;\n  margin-bottom: 10px;\n  width: 200px;\n  height: 100%;\n  margin-right: 10px;\n  border-radius: 5px;\n  padding: 5px;\n}\n\n.past-stays-section,\n.upcoming-stays-section {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n\n.booking-error {\n  margin-left: 30%;\n}\n\n.check-availability-btn,\n.submit-btn {\n  background-color: #9D9D9E;\n  border: none;\n  color: #FFFFFF;\n}\n\n.available-room-cards,\n.filtered-room-cards {\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: 20px;\n}\n\n.detail-text {\n  margin: 0;\n}\n\n/* SMALL TABLET STYLING */\n@media screen and (min-width: 620px) {\n  .account-icon,\n.bed-icon,\n.home-icon,\n.night-icon,\n.star-icon {\n    display: inline;\n  }\n\n  .left-nav {\n    display: flex;\n  }\n\n  .left-dropdown {\n    font-size: 1em;\n  }\n\n  .image-container {\n    position: relative;\n    display: grid;\n    grid-template-rows: repeat(6, 1fr);\n    grid-template-columns: 1fr;\n    gap: 10px;\n    height: 30em;\n    padding: 25px;\n    margin-top: 25px;\n  }\n}\n/* LARGE TABLET AND LAPTOP STYLING  */\n@media screen and (min-width: 960px) {\n  .image-container {\n    position: relative;\n    display: grid;\n    grid-template-rows: repeat(3, 1fr);\n    grid-template-columns: 1fr 1fr;\n    gap: 10px;\n    height: 30em;\n    padding: 25px;\n    margin-top: 25px;\n    margin-left: 25px;\n  }\n\n  .account-icon,\n.heart-icon,\n.person-icon,\n.share-icon {\n    display: inline;\n  }\n}\n/* DESKTOP STYLING  */\n@media screen and (min-width: 1200px) {\n  .image-section {\n    padding: 20px;\n    display: grid;\n    height: 30em;\n    grid-template-columns: repeat(4, 1fr);\n    grid-template-rows: repeat(2, 1fr);\n  }\n\n  .account-icon,\n.bed-icon,\n.home-icon,\n.night-icon,\n.star-icon {\n    display: inline;\n  }\n}\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/_reset.scss","webpack://./src/css/base.scss","webpack://./src/css/_variables.scss","webpack://./src/css/_mixins.scss"],"names":[],"mappings":"AAAA,UAAA;AACA;EACE,SAAA;EACA,UAAA;EACA,qBAAA;ACCF;;AADA;EACE,cCJM;EDKN,iCAAA;EACA,gBAAA;EACA,cAAA;EACA,gBAAA;AAIF;;AADA;EACE,uBAAA;EACA,aAAA;EACA,8BAAA;EACA,SAAA;EACA,UAAA;AAIF;;AADA;EACE,cCjBK;ADqBP;;AADA;EACE,UAAA;AAIF;;AADA;EACE,gBAAA;EACA,iBAAA;EACA,qCAAA;EACA,cAAA;AAIF;;AADA;EACE,gBAAA;EACA,oBAAA;EACA,eAAA;AAIF;;AADA;EACE,aAAA;AAIF;;AADA;EACE,iBAAA;AAIF;;AADA;;;EAGE,aAAA;AAIF;;AADA;;;;;EAKE,aAAA;AAIF;;AADA;EACE,eAAA;EACA,gBAAA;EACA,cAAA;AAIF;;AADA;EACE,eAAA;AAIF;;AADA;EACE,yBAAA;AAIF;;AADA;EACE,iBAAA;AAIF;;AADA;EACE,eAAA;EACA,cAAA;EACA,cChFK;ADoFP;;AADA;EACE,cCrFW;ADyFb;;AADA;EACE,cC1FU;ED2FV,cAAA;EACA,aAAA;AAIF;;AADA;EACE,cChGU;EDiGV,cAAA;EACA,YAAA;AAIF;;AADA;EACE,aAAA;AAIF;;AADA;EACE,kBAAA;EACA,aAAA;EACA,kCAAA;EACA,0BAAA;EACA,SAAA;EACA,YAAA;EACA,aAAA;EACA,gBAAA;AAIF;;AADA;EACE,WAAA;EACA,YAAA;AAIF;;AADA;EACE,aAAA;EACA,8BAAA;EACA,eAAA;EACA,kBAAA;AAIF;;AADA;;EAEE,cClIU;EDmIV,gBAAA;AAIF;;AADA;;;;EAIE,cC1IU;ED2IV,kBAAA;EACA,eAAA;AAIF;;AADA;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,gBAAA;AAIF;;AADA;EACE,eAAA;AAIF;;AADA;EE3JE,aAAA;EACA,uBAAA;EF4JA,iBAAA;AAKF;;AAFA;;EAEE,cAAA;EACA,UAAA;AAKF;;AAFA;EACE,cAAA;EACA,cCvKU;AD4KZ;;AAFA;EACE,cC3KU;ADgLZ;;AAFA;;;EAGE,eAAA;AAKF;;AAFA;EACE,gBAAA;AAKF;;AAFA;;;;EAIE,yBC3LW;ED4LX,mBAAA;EACA,YAAA;EACA,YAAA;EACA,kBAAA;EACA,kBAAA;EACA,YAAA;AAKF;;AAFA;;EEtME,aAAA;EACA,uBAAA;EFwMA,eAAA;AAMF;;AAHA;EACE,gBAAA;AAMF;;AAHA;;EAEE,yBChNW;EDiNX,YAAA;EACA,cCpNM;AD0NR;;AAHA;;EAEE,aAAA;EACA,eAAA;EACA,gBAAA;AAMF;;AAHA;EACE,SAAA;AAMF;;AAJA,yBAAA;AACA;EACE;;;;;IAKE,eAAA;EAOF;;EAJA;IACE,aAAA;EAOF;;EAJA;IACE,cAAA;EAOF;;EAJA;IACE,kBAAA;IACA,aAAA;IACA,kCAAA;IACA,0BAAA;IACA,SAAA;IACA,YAAA;IACA,aAAA;IACA,gBAAA;EAOF;AACF;AALA,qCAAA;AACA;EACE;IACE,kBAAA;IACA,aAAA;IACA,kCAAA;IACA,8BAAA;IACA,SAAA;IACA,YAAA;IACA,aAAA;IACA,gBAAA;IACA,iBAAA;EAOF;;EAJA;;;;IAIE,eAAA;EAOF;AACF;AALA,qBAAA;AACA;EACE;IACE,aAAA;IACA,aAAA;IACA,YAAA;IACA,qCAAA;IACA,kCAAA;EAOF;;EAJA;;;;;IAKE,eAAA;EAOF;AACF;AAJA;EACE,aAAA;AAMF","sourcesContent":["/* RESET */\nnav, body, h1, h2,h3 {\n  margin: 0;\n  padding: 0;\n  text-decoration: none;\n}\n","@import 'reset';\n@import 'variables';\n@import 'mixins';\n// /* MOBILE STYLING */\n* {\n  color: $white;\n  font-family: 'Roboto', sans-serif;\n  font-weight: 400;\n  font-size: 1em;\n  line-height: 1.5;\n}\n\nnav {\n  background-color: black;\n  display: flex;\n  justify-content: space-between;\n  margin: 0;\n  padding: 0;\n}\n\n.colored-icon {\n  color: $blue;\n}\n\n.error-msg {\n  color: red;\n}\n\n.company-logo {\n  margin-bottom: 0;\n  margin-top: 0.5em;\n  font-family: 'Fjalla One', sans-serif;\n  font-size: 2em;\n}\n\n.left-dropdown:hover {\n  font-size: 0.5em;\n  margin-bottom: 0.5em;\n  cursor: pointer;\n}\n\n.drop-downs {\n  margin-top: 0;\n}\n\n.left-dropdown {\n  margin-right: 1em;\n}\n\n.left-nav,\n.nav-icons,\n.username {\n  display: flex;\n}\n\n.account-icon,\n.bed-icon,\n.home-icon,\n.night-icon,\n.star-icon {\n  display: none;\n}\n\n.left-nav {\n  margin-top: 6em;\n  margin-left: 1em;\n  display: block;\n}\n\n.username {\n  margin-top: 1em;\n}\n\nbody {\n  background-color: #EFEFEF;\n}\n\n.right-logo {\n  padding-bottom: 0;\n}\n\n.hotel-logo {\n  margin-top: 1em;\n  font-size: 2em;\n  color: $blue;\n}\n\n.colored-word {\n  color: $light-grey;\n}\n\nh2 {\n  color: $dark-grey;\n  font-size: 3em;\n  padding: 25px;\n}\n\nh3 {\n  color: $dark-grey;\n  font-size: 1em;\n  padding: 5px;\n}\n\n.total-cost-container {\n  display: flex;\n}\n\n.image-container {\n  position: relative;\n  display: grid;\n  grid-template-rows: repeat(6, 1fr);\n  grid-template-columns: 1fr;\n  gap: 10px;\n  height: 30em;\n  padding: 25px;\n  margin-top: 25px;\n}\n\n.hotel-image {\n  width: 100%;\n  height: 100%;\n}\n\n.book-room-section {\n  display: flex;\n  justify-content: space-between;\n  margin-left: 5%;\n  border-radius: 5px;\n}\n\n.book-room-titles,\n.login-form-submit {\n  color: $dark-grey;\n  font-size: 1.5em;\n}\n\n.book-now-button,\n.check-availability-btn,\n.login-form-submit:hover,\n.submit-btn {\n  color: $dark-grey;\n  border-radius: 5px;\n  cursor: pointer;\n}\n\n.input-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 50px;\n}\n\n.input {\n  margin-top: 5px;\n}\n\n.login-page {\n  @include centered();\n  margin-top: 100px;\n}\n\n.booking-error,\n.login-error {\n  font-size: 1em;\n  color: red;\n}\n\n.login-title {\n  font-size: 3em;\n  color: $dark-grey;\n}\n\n.login-form-input {\n  color: $dark-grey;\n}\n\n.calendar:hover,\n.select-room,\n.submit-btn {\n  cursor: pointer;\n}\n\n.total-cost {\n  font-size: 1.5em;\n}\n\n.available-room-card,\n.filtered-room-card,\n.past-stays-card,\n.upcoming-stays-card {\n  background-color: $light-grey;\n  margin-bottom: 10px;\n  width: 200px;\n  height: 100%;\n  margin-right: 10px;\n  border-radius: 5px;\n  padding: 5px;\n}\n\n.past-stays-section,\n.upcoming-stays-section {\n  @include centered();\n  flex-wrap: wrap;\n}\n\n.booking-error {\n  margin-left: 30%;\n}\n\n.check-availability-btn,\n.submit-btn {\n  background-color: $light-grey;\n  border: none;\n  color: $white;\n}\n\n.available-room-cards,\n.filtered-room-cards {\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: 20px;\n}\n\n.detail-text {\n  margin: 0;\n}\n/* SMALL TABLET STYLING */\n@media screen and (min-width: 620px) {\n  .account-icon,\n  .bed-icon,\n  .home-icon,\n  .night-icon,\n  .star-icon {\n    display: inline;\n  }\n\n  .left-nav {\n    display: flex;\n  }\n\n  .left-dropdown {\n    font-size: 1em;\n  }\n\n  .image-container {\n    position: relative;\n    display: grid;\n    grid-template-rows: repeat(6, 1fr);\n    grid-template-columns: 1fr;\n    gap: 10px;\n    height: 30em;\n    padding: 25px;\n    margin-top: 25px;\n  }\n}\n/* LARGE TABLET AND LAPTOP STYLING  */\n@media screen and (min-width: 960px) {\n  .image-container {\n    position: relative;\n    display: grid;\n    grid-template-rows: repeat(3, 1fr);\n    grid-template-columns: 1fr 1fr;\n    gap: 10px;\n    height: 30em;\n    padding: 25px;\n    margin-top: 25px;\n    margin-left: 25px;\n  }\n\n  .account-icon,\n  .heart-icon,\n  .person-icon,\n  .share-icon {\n    display: inline;\n  }\n}\n/* DESKTOP STYLING  */\n@media screen and (min-width: 1200px) {\n  .image-section {\n    padding: 20px;\n    display: grid;\n    height: 30em;\n    grid-template-columns: repeat(4, 1fr);\n    grid-template-rows: repeat(2, 1fr);\n  }\n\n  .account-icon,\n  .bed-icon,\n  .home-icon,\n  .night-icon,\n  .star-icon {\n    display: inline;\n  }\n}\n\n.hidden {\n  display: none;\n}\n"," // Color Pallette\n$white: #FFFFFF;\n$dark-grey: #4D4D4D;\n$light-grey: #9D9D9E;\n$blue: #359DDB;\n","@mixin centered() {\n  display: flex;\n  justify-content: center;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


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

"use strict";


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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAllData": () => (/* binding */ fetchAllData),
/* harmony export */   "postBooking": () => (/* binding */ postBooking),
/* harmony export */   "getBookingsData": () => (/* binding */ getBookingsData)
/* harmony export */ });
const fetchAllData = () => {
  const promises = [getCustomerData(), getRoomsData(), getBookingsData()]
  return Promise.all(promises)
    .catch(error => console.log("ERROR"))
}

const getCustomerData = () => {
  return fetch('https://overlook-hotel-api.herokuapp.com/api/v1/customers')
    .then(response => response.json())
    .catch(err => console.log("ERROR"))
}


const getRoomsData = () => {
  return fetch('https://overlook-hotel-api.herokuapp.com/api/v1/rooms')
    .then(response => response.json())
    .catch(err => console.log("ERROR"))
}


const getBookingsData = () => {
  return fetch('https://overlook-hotel-api.herokuapp.com/api/v1/bookings')
    .then(response => response.json())
    .catch(err => console.log("ERROR"))
}

const postBooking = (booking) => {
  const initObj = {
    userID: booking.id,
    date: booking.date,
    roomNumber: booking.roomNumber
  }
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(initObj)
  }
  return fetch('https://overlook-hotel-api.herokuapp.com/api/v1/bookings/', init)
    .then(response => checkForErr(response))
    .then(data => data)
    .catch(err => displayBookingError())
}

const checkForErr = (response) => {
  console.log(response)
  if(!response.ok) {
    throw new Error('Something went wrong')
  } else {
    displaySuccess()
    return response.json();
  }
}

const displayBookingError = () => {
  errorMsg.innerText = "Something went wrong. Please try again."
  setTimeout(() => errorMsg.innerText = "", 2000)
}

const displaySuccess = () => {
  errorMsg.innerText = "You have booked sucessfully!"
  setTimeout(() => errorMsg.innerText = "", 2000)
}




/***/ }),
/* 7 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this;if(!this.isValid())return $;var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=O.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:r};return n.replace(y,(function(t,e){return e||l[t]||r.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img1.jpg");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img2.jpg");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img3.jpg");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img4.jpg");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img5.jpg");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img6.jpg");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img7.jpg");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/book-room.gif");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/check-by-date.gif");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/filter-by-roomtype.gif");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/login.gif");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/main-view.gif");

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/past-stays.gif");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/upcoming-stays.gif");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookings = [];
  }

  getAllBookings(bookingData) {
    this.bookings = bookingData.filter(booking => booking.userID === this.id)
  }

  getTotalCost(roomData) {
    const totalCost = roomData.reduce((sum, room) => {
      this.bookings.forEach(booking => {
        if (room.number === booking.roomNumber) {
          sum += room.costPerNight;
        }
      })
      return sum
    }, 0)
    return totalCost.toFixed(2)
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Hotel {
  constructor(customerData, roomData, bookingData) {
    this.customers = customerData;
    this.rooms = roomData;
    this.bookings = bookingData;
    this.roomType = bookingData.roomType;
    this.availableRooms = []
  }

  findBookedRoomNumber(date) {
    const bookedRoom = this.bookings.filter(booking => date === booking.date)
    return bookedRoom.map(room => room.roomNumber)
  }

  findAvailableRooms(date) {
    this.availableRooms = []
    const bookedRooms = this.findBookedRoomNumber(date)
    this.availableRooms = this.rooms.filter(room => !bookedRooms.includes(room.number))
  }

  filterRoomsByType(type) {
    if (type === 'all rooms') {
      return this.availableRooms
    }
    return this.availableRooms.filter(room => room.roomType === type)
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hotel);


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_img1_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _images_img2_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _images_img3_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _images_img4_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _images_img5_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _images_img6_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var _images_img7_jpg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(14);
/* harmony import */ var _images_book_room_gif__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(15);
/* harmony import */ var _images_check_by_date_gif__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(16);
/* harmony import */ var _images_filter_by_roomtype_gif__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(17);
/* harmony import */ var _images_login_gif__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(18);
/* harmony import */ var _images_main_view_gif__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(19);
/* harmony import */ var _images_past_stays_gif__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(20);
/* harmony import */ var _images_upcoming_stays_gif__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(21);
/* harmony import */ var _Customer__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(22);
/* harmony import */ var _Hotel__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(23);
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file



















//Global Variables
let customers = [];
let bookings = [];
let rooms = [];
let currentCustomer;
let hotel = new _Hotel__WEBPACK_IMPORTED_MODULE_18__.default(customers, rooms, bookings)
//Query Selectors
const totalCost = document.getElementById('totalCost');
const bookRoomButton = document.getElementById('bookRoom');
const bookRoomSection = document.getElementById('bookRoomSection');
const imageContainer = document.getElementById('imageContainer');
const dashboard = document.getElementById('dashboard');
const main = document.getElementById('main');
const nav = document.getElementById('nav');
const login = document.getElementById('login');
const loginError = document.getElementById('loginErr');
const passwordInput = document.getElementById('passwordInput');
const usernameInput = document.getElementById('usernameInput');
const loginSubmit = document.getElementById('loginFormSubmit');
const welcomeText = document.getElementById('welcomeText');
const pastStays = document.getElementById('pastStays');
const pastStaysSection = document.getElementById('pastStaysSection');
const calendar = document.getElementById('calendar');
const bookingError = document.getElementById('bookingError');
const checkAvailabilityButton = document.getElementById('checkAvailabilityButton');
const availableRoomCards = document.getElementById('availableRoomCards');
const selectRoomType = document.getElementById('roomTypeForm');
const calendarSection = document.getElementById('calendarSection');
const roomTypeBtn = document.getElementById('roomTypeBtn');
const roomChoice = document.getElementById('roomChoice');
const filteredRoomsArea = document.getElementById('filteredRooms');
const upcomingStaysSection = document.getElementById('upcomingStaysSection');
const upcomingStays = document.getElementById('upcomingStays');
const errorMsg =document.getElementById('errorMsg')
//Event Listeners
window.addEventListener('load', loadData)
bookRoomButton.addEventListener('click', displayBookRoomSection)
dashboard.addEventListener('click', displayHome)
loginFormSubmit.addEventListener('click', (event) => {
  validateUser(event)
})
pastStays.addEventListener('click', displayPastBookings)
checkAvailabilityButton.addEventListener('click', checkRoomsAvailable)
roomTypeBtn.addEventListener('click', findRoomsByType)
availableRoomCards.addEventListener('click', bookRoom)
filteredRoomsArea.addEventListener('click', bookRoom)
upcomingStays.addEventListener('click', displayUpcoming)
//WINDOW LOAD FUNCTION
function loadData() {
  ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchAllData)()
    .then(function(data) {
      fillCustomers(data[0])
      fillBookings(data[2])
      fillRooms(data[1])
    })
  showLogin()
}
//Functions
function fillCustomers(customerData) {
  customerData.customers.forEach(customer => customers.push(customer))
}
function fillBookings(bookingsData) {
  bookingsData.bookings.forEach(booking => bookings.push(booking))
}
function fillRooms(roomData) {
  roomData.rooms.forEach(room => rooms.push(room))
}
function displayBookRoomSection() {
  imageContainer.classList.add('hidden')
  bookRoomSection.classList.remove('hidden')
  pastStaysSection.classList.add('hidden')
  upcomingStaysSection.classList.add('hidden')
  calendar.value = dayjs__WEBPACK_IMPORTED_MODULE_2___default()().format('YYYY-MM-DD')
  calendar.setAttribute('min', calendar.value)
  selectRoomType.classList.add('hidden')
  calendarSection.classList.remove('hidden')
  availableRoomCards.innerHTML = ''
  filteredRoomsArea.innerHTML = ''
}
function displayHome() {
  imageContainer.classList.remove('hidden')
  bookRoomSection.classList.add('hidden')
  pastStaysSection.classList.add('hidden')
}
function showLogin() {
  nav.classList.add('hidden')
  main.classList.add('hidden')
  login.classList.remove('hidden')
}
function loadMain() {
  login.classList.add('hidden')
  main.classList.remove('hidden')
  nav.classList.remove('hidden')
  findCurrentCustomer()
}
function findCurrentCustomer() {
  let loginInfo = usernameInput.value.split('r');
  return customers.find(customer => {
    if (customer.id === parseInt(loginInfo[1])) {
      currentCustomer = new _Customer__WEBPACK_IMPORTED_MODULE_17__.default(customers[parseInt(loginInfo[1]) - 1])
      updateUserWelcome()
      displayTotalCost()
    }
  })
}
function updateUserWelcome() {
  welcomeText.innerText = `WELCOME: ${currentCustomer.name}`
}
function validateUser(event) {
  event.preventDefault()
  let loginInfo = usernameInput.value.split('r');
  if (parseInt(loginInfo[1]) > 0 && parseInt(loginInfo[1]) < 51 && passwordInput.value === 'overlook2021') {
    loadMain()
  } else {
    loginError.classList.remove('hidden')
    clearForm(usernameInput, passwordInput);
  }
}
function clearForm(usernameInput, passwordInput) {
  usernameInput.value = '';
  passwordInput.value = '';
}
function displayTotalCost() {
  currentCustomer.getAllBookings(bookings)
  totalCost.innerText = `$ ${currentCustomer.getTotalCost(rooms)}`
}
function displayPastBookings(bookings) {
  pastStaysSection.classList.remove('hidden')
  currentCustomer.bookings.map(booking => {
    pastStaysSection.innerHTML += `
          <article class="past-stays-card">
          <p>Date: ${booking.date}</p>
          <p>Room number: ${booking.roomNumber}</p>
          <img class="hotel-image" src="./images/img6.jpg" alt="Room image">
          </article>
        `
  })
  imageContainer.classList.add('hidden')
  bookRoomSection.classList.add('hidden')
  upcomingStaysSection.classList.add('hidden')
}
function checkRoomsAvailable(event) {
  event.preventDefault()
  const dateSelected = dayjs__WEBPACK_IMPORTED_MODULE_2___default()(calendar.value).format('YYYY/MM/DD')
  hotel.findAvailableRooms(dateSelected)
  availableRoomCards.classList.remove('hidden')
  availableRoomCards.innerHTML = ''
  if (hotel.availableRooms.length === 0) {
    bookingError.classList.remove('hidden')
  } else {
    hotel.availableRooms.map(room => {
      availableRoomCards.innerHTML += `
        <article class="available-room-card" id=${room.number}>
        <button class="book-now-button">Book now</button>
        <p class="detail-text">Room number: ${room.number}</p>
        <p class="detail-text">Room type: ${room.roomType}</p>
        <p class="detail-text">Bidet: ${room.bidet}</p>
        <p class="detail-text">Bed size: ${room.bedSize}</p>
        <p class="detail-text">Number of beds: ${room.numBeds}</p>
        <p class="detail-text">Cost per night: $${room.costPerNight}</p>
        <img class="hotel-image" src="./images/img6.jpg" alt="Room image">
        </article>
      `
    })
    selectRoomType.classList.remove('hidden')
    calendarSection.classList.add('hidden')
  }
}
function findRoomsByType(event) {
  event.preventDefault()
  availableRoomCards.classList.add('hidden')
  filteredRoomsArea.innerHTML = ''
  const type = roomChoice.value.toLowerCase()
  const filteredRooms = hotel.filterRoomsByType(type)
  return filteredRooms.map(room => {
    filteredRoomsArea.innerHTML += `
     <article class="filtered-room-card" id=${room.number}>
     <button class="book-now-button">Book now</button>
     <p class="detail-text">Room number: ${room.number}</p>
     <p class="detail-text">Room type: ${room.roomType}</p>
     <p class="detail-text">Bidet: ${room.bidet}</p>
     <p class="detail-text">Bed size: ${room.bedSize}</p>
     <p class="detail-text">Number of beds: ${room.numBeds}</p>
     <p class="detail-text">Cost per night: $${room.costPerNight}</p>
     <img class="hotel-image" src="./images/img6.jpg" alt="Room image">
     </article>
   `
  })
}
function bookRoom(event) {
  if (event.target.classList.contains('book-now-button')) {
    const roomNumber = parseInt(event.target.closest('article').id)
    const dateSelected = dayjs__WEBPACK_IMPORTED_MODULE_2___default()(calendar.value).format('YYYY/MM/DD')
    const bookingSelected = {
      id: currentCustomer.id,
      date: dateSelected,
      roomNumber
    }
    ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.postBooking)(bookingSelected)
    clearData()
    loadDataAfterBooking()
    displayBookRoomSection()
  }
}
function clearData() {
  customers = [];
  bookings = [];
  rooms = [];
  hotel = new _Hotel__WEBPACK_IMPORTED_MODULE_18__.default(customers, rooms, bookings)
}
function loadDataAfterBooking() {
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchAllData)()
    .then(function(data) {
      fillCustomers(data[0])
      fillBookings(data[2])
      fillRooms(data[1])
    })
}
function loadDisplay() {
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchAllData)()
    .then(function(data) {
      fillCustomers(data[0])
      fillBookings(data[2])
      fillRooms(data[1])
      upcomingStaysSection.classList.remove('hidden')
      const currentDate = dayjs__WEBPACK_IMPORTED_MODULE_2___default()(Date.now()).format('YYYY/MM/DD');
      imageContainer.classList.add('hidden')
      bookRoomSection.classList.add('hidden')
      pastStaysSection.classList.add('hidden')
      upcomingStaysSection.innerHTML = ''
      bookings.forEach(booking => {
        if((booking.date >= currentDate) && (booking.userID === currentCustomer.id)) {
          upcomingStaysSection.innerHTML += `
                  <article class="upcoming-stays-card">
                  <p>Date: ${booking.date}</p>
                  <p>Room number: ${booking.roomNumber}</p>
                  <img class="hotel-image" src="./images/img6.jpg" alt="Room image">
                  </article>
                `
        }
      })
    })
}
function displayUpcoming() {
  clearData()
  loadDisplay()
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
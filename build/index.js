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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export disableAddOptions */
/* harmony export (immutable) */ __webpack_exports__["b"] = toggleAdditionalParamsForFormat;
/* harmony export (immutable) */ __webpack_exports__["a"] = noop;
function disableAddOptions(addOptionsBlock, disabled = true) {
    addOptionsBlock.style.display = disabled ? 'none': 'block';
    const controls = addOptionsBlock.querySelectorAll('input, select');

    controls.forEach((el) => {
        if (disabled) {
            el.setAttribute('disabled', 'disabled');
        } else {
            el.removeAttribute('disabled');
        }
    });
}

function toggleAdditionalParamsForFormat (form, formatEl) {
    const additionalCSV = form.querySelector('.additional-for-csv');
    const additionalSQL = form.querySelector('.additional-for-sql');

    switch (formatEl.value) {
        case 'csv':
            disableAddOptions(additionalCSV, false);
            disableAddOptions(additionalSQL);
            break;
        case 'sql':
            disableAddOptions(additionalCSV);
            disableAddOptions(additionalSQL, false);
            break;
        default:
            disableAddOptions(additionalCSV);
            disableAddOptions(additionalSQL);
    }
}

function noop () {}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__orderForm__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__groupForm__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__log__ = __webpack_require__(5);





const printToLog = Object(__WEBPACK_IMPORTED_MODULE_3__log__["a" /* default */])(document.querySelector('textarea[name=log]'));

Object(__WEBPACK_IMPORTED_MODULE_1__orderForm__["a" /* default */])(document.querySelector('form[name=order]'), (err, text) => printToLog(text));
Object(__WEBPACK_IMPORTED_MODULE_2__groupForm__["a" /* default */])(document.querySelector('form[name=group]'), (err, text) => printToLog(text));



/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__formUtils__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = (function (form, onComplete = __WEBPACK_IMPORTED_MODULE_0__formUtils__["a" /* noop */]) {
    const formatEl = form.querySelector('select[name=format]');

    Object(__WEBPACK_IMPORTED_MODULE_0__formUtils__["b" /* toggleAdditionalParamsForFormat */])(form, formatEl);

    formatEl.addEventListener('change', () => { Object(__WEBPACK_IMPORTED_MODULE_0__formUtils__["b" /* toggleAdditionalParamsForFormat */])(form, formatEl); });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        fetch('/api/order', { method: 'post', body: formData })
            .then(res => res.text())
            .then((text) => {
                onComplete(null, text);
            });
    });
});;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__formUtils__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = (function (form, onComplete = __WEBPACK_IMPORTED_MODULE_0__formUtils__["a" /* noop */]) {
    const formatEl = form.querySelector('select[name=format]');

    Object(__WEBPACK_IMPORTED_MODULE_0__formUtils__["b" /* toggleAdditionalParamsForFormat */])(form, formatEl);

    formatEl.addEventListener('change', () => { Object(__WEBPACK_IMPORTED_MODULE_0__formUtils__["b" /* toggleAdditionalParamsForFormat */])(form, formatEl); });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        fetch('/api/group', { method: 'post', body: formData })
            .then(res => res.text())
            .then((text) => {
                onComplete(null, text);
            });
    });
});;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = logController;
function logController(areaEl) {
    return (text) => {
        areaEl.value = text;
    };
}


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map
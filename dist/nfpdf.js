/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (app) {
    "use strict";

    app.directive('nfPdf', ['$sce', function ($sce) {
        return {
            restrict: 'E',
            scope: {
                url: '=',
                options: '='
            },
            link: function link(scope, element, attrs) {
                var canvas = document.createElement('canvas');

                PDFJS.getDocument(scope.url).then(function (pdf) {
                    pdf.getPage(1).then(function (page) {
                        var options = scope.options || {};
                        options.scale = options.scale || 1;
                        var viewport = page.getViewport(options.scale);

                        var canvas = document.createElement('canvas');
                        var context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        if (options.resizeToWidth || options.resizeToHeight) {
                            var resizeToWidth = options.resizeToWidth,
                                resizeToHeight = options.resizeToHeight;

                            var s = 1;
                            if (resizeToWidth) {
                                s = Math.round(resizeToWidth / canvas.width * 100) / 100;
                            }
                            if (resizeToHeight) {
                                s = Math.round(resizeToHeight / canvas.height * 100) / 100;
                            }
                            canvas.width = canvas.width * s;
                            canvas.height = canvas.height * s;
                            viewport = page.getViewport(s);
                        }

                        var renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        page.render(renderContext);
                        if (element && element.nodeType === 1) {
                            element.appendChild(canvas);
                        }
                        if (element[0] && element[0].nodeType === 1) {
                            element[0].appendChild(canvas);
                        }
                    });
                });
            }
        };
    }]);
})(angular.module('nfpdf', []));

/***/ })
/******/ ]);
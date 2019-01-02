exports.id = "main";
exports.modules = {

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server */ "./src/server.tsx");


var server = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(_server__WEBPACK_IMPORTED_MODULE_1__["default"]);
var currentApp = _server__WEBPACK_IMPORTED_MODULE_1__["default"];

server.listen("3000" || false, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('🚀 started');
});

if (true) {
    console.log('✅  Server-side HMR Enabled!');

    module.hot.accept(/*! ./server */ "./src/server.tsx", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server */ "./src/server.tsx");
(function () {
        console.log('🔁  HMR Reloading `./server`...');
        server.removeListener('request', currentApp);
        var newApp = __webpack_require__(/*! ./server */ "./src/server.tsx").default;
        server.on('request', newApp);
        currentApp = newApp;
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

/***/ }),

/***/ "apollo-boost":
false

};
//# sourceMappingURL=main.c27c18c4558ab9c59de6.hot-update.js.map
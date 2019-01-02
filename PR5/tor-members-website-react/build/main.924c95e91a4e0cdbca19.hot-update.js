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
/* harmony import */ var apollo_boost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-boost */ "apollo-boost");
/* harmony import */ var apollo_boost__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apollo_boost__WEBPACK_IMPORTED_MODULE_2__);




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
/*!*******************************!*\
  !*** external "apollo-boost" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-boost");

/***/ })

};
//# sourceMappingURL=main.924c95e91a4e0cdbca19.hot-update.js.map
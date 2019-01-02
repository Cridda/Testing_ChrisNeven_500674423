exports.id = "main";
exports.modules = {

/***/ "./src/components/reusable/MakeModal.tsx":
/*!***********************************************!*\
  !*** ./src/components/reusable/MakeModal.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/create */ "babel-runtime/core-js/object/create");
/* harmony import */ var babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/set-prototype-of */ "babel-runtime/core-js/object/set-prototype-of");
/* harmony import */ var babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);


var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default.a || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(b) : (__.prototype = b.prototype, new __());
    };
}();

var ModalProvider = /** @class */function (_super) {
    __extends(ModalProvider, _super);
    function ModalProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false
        };
        _this.onOpenModal = function () {
            _this.setState({ open: true });
        };
        _this.onCloseModal = function () {
            _this.setState({ open: false });
        };
        return _this;
    }
    ModalProvider.prototype.render = function () {
        var open = this.state.open;
        var children = this.props.children;
        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, children({
            onCloseModal: this.onCloseModal,
            onOpenModal: this.onOpenModal,
            open: open
        }));
    };
    return ModalProvider;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (ModalProvider);

/***/ })

};
//# sourceMappingURL=main.38976e5f42228f6703e9.hot-update.js.map
exports.id = "main";
exports.modules = {

/***/ "./src/components/molecules/bathroom/BathroomContainer.tsx":
/*!*****************************************************************!*\
  !*** ./src/components/molecules/bathroom/BathroomContainer.tsx ***!
  \*****************************************************************/
/*! exports provided: BathroomInputTypes, BedroomInputTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BathroomInputTypes", function() { return BathroomInputTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BedroomInputTypes", function() { return BedroomInputTypes; });
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _InputWithToggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../InputWithToggle */ "./src/components/molecules/InputWithToggle.tsx");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_5__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};





var BATHROOMTYPES_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query BathroomTypesQuery {\n        bathroomTypes {\n            id\n            name\n        }\n    }\n"], ["\n    query BathroomTypesQuery {\n        bathroomTypes {\n            id\n            name\n        }\n    }\n"])));
var BEDROOMTYPES_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    query BedroomTypesQuery {\n        bedroomTypes {\n            id\n            name\n        }\n    }\n"], ["\n    query BedroomTypesQuery {\n        bedroomTypes {\n            id\n            name\n        }\n    }\n"])));
var BathroomInputTypes = function BathroomInputTypes() {
    return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react_apollo__WEBPACK_IMPORTED_MODULE_5__["Query"], { query: BATHROOMTYPES_QUERY }, function (_a) {
        var data = _a.data,
            loading = _a.loading,
            error = _a.error;
        if (loading || error || !data) {
            return null;
        }
        var options = [];
        var optionValues = [];
        data.bathroomTypes.forEach(function (type) {
            options.push(type.name);
            optionValues.push(type.id);
        });
        return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](formik__WEBPACK_IMPORTED_MODULE_4__["Field"], { name: "type.id", options: options, optionValues: optionValues, component: _InputWithToggle__WEBPACK_IMPORTED_MODULE_3__["default"] });
    });
};
var BedroomInputTypes = function BedroomInputTypes() {
    return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react_apollo__WEBPACK_IMPORTED_MODULE_5__["Query"], { query: BEDROOMTYPES_QUERY }, function (_a) {
        var data = _a.data,
            loading = _a.loading,
            error = _a.error;
        if (loading || error || !data) {
            return null;
        }
        var options = [];
        var optionValues = [];
        data.bedroomTypes.forEach(function (type) {
            options.push(type.name);
            optionValues.push(type.id);
        });
        return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](formik__WEBPACK_IMPORTED_MODULE_4__["Field"], { name: "type.id", options: options, optionValues: optionValues, component: _InputWithToggle__WEBPACK_IMPORTED_MODULE_3__["default"] });
    });
};
var templateObject_1, templateObject_2;

/***/ })

};
//# sourceMappingURL=main.dbdb180e65b646511d88.hot-update.js.map
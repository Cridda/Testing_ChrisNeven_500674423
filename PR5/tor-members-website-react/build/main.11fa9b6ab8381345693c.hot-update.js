exports.id = "main";
exports.modules = {

/***/ "./src/components/molecules/AccommodationPickerEntry.tsx":
/*!***************************************************************!*\
  !*** ./src/components/molecules/AccommodationPickerEntry.tsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _atoms_ToggleButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../atoms/ToggleButton */ "./src/components/atoms/ToggleButton.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};




var AccommodationPickerEntry = function AccommodationPickerEntry(_a) {
    var onlyOneEntry = _a.onlyOneEntry,
        entry = _a.entry,
        first = _a.first,
        setOpened = _a.setOpened,
        opened = _a.opened,
        location = _a.location;
    var name = entry.name,
        photos = entry.photos,
        code = entry.code,
        id = entry.id;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, { first: first, opened: opened }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Link, { exact: true, onClick: function onClick() {
            return setOpened(false);
        }, to: "/accommodation/" + id, opened: opened ? 1 : 0 }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Thumbnail, { src: photos[0].url }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Description, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Title, null, name.length > 40 ? name.substring(0, 35).trim().concat('...') : name), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Code, null, code))), first && !onlyOneEntry && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_atoms_ToggleButton__WEBPACK_IMPORTED_MODULE_3__["default"], { fill: opened ? '#000' : '#FFF', handleOnToggle: function handleOnToggle() {
            return setOpened(!opened);
        } }));
};
/* harmony default export */ __webpack_exports__["default"] = (AccommodationPickerEntry);
var Container = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'AccommodationPickerEntry__Container',
    componentId: 'sc-1xq0d0r-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    color: ", ";\n    display: flex;\n    align-items: center;\n    height: 7.2rem;\n    background-color: ", ";\n    border-bottom: ", ";\n"], ["\n    color: ", ";\n    display: flex;\n    align-items: center;\n    height: 7.2rem;\n    background-color: ", ";\n    border-bottom: ", ";\n"])), function (_a) {
    var opened = _a.opened;
    return opened ? 'black' : 'white';
}, function (_a) {
    var opened = _a.opened;
    return opened && 'white';
}, function (_a) {
    var opened = _a.opened;
    return opened && '1px solid #F2F2F2';
});
var Link = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["NavLink"])(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    height: 7.2rem;\n    width: 100%;\n\n    &:after {\n        content: '';\n        position: absolute;\n        top: ", ";\n        left: ", ";\n        right: ", ";\n        width: ", ";\n        height: ", ";\n        bottom: 0;\n        background-color: ", ";\n        opacity: 0;\n        pointer-events: none;\n        z-index: 1;\n        transition: 0.25s opacity;\n    }\n\n    &.active {\n        &:after {\n            opacity: 1;\n        }\n    }\n\n    &:hover {\n        background-color: ", ";\n    }\n"], ["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    height: 7.2rem;\n    width: 100%;\n\n    &:after {\n        content: '';\n        position: absolute;\n        top: ", ";\n        left: ", ";\n        right: ", ";\n        width: ", ";\n        height: ", ";\n        bottom: 0;\n        background-color: ", ";\n        opacity: 0;\n        pointer-events: none;\n        z-index: 1;\n        transition: 0.25s opacity;\n    }\n\n    &.active {\n        &:after {\n            opacity: 1;\n        }\n    }\n\n    &:hover {\n        background-color: ", ";\n    }\n"])), function (_a) {
    var opened = _a.opened;
    return opened ? '0' : 'auto';
}, function (_a) {
    var opened = _a.opened;
    return opened ? '-1px' : '0';
}, function (_a) {
    var opened = _a.opened;
    return opened ? 'auto' : '0';
}, function (_a) {
    var opened = _a.opened;
    return opened ? '.4rem' : 'auto';
}, function (_a) {
    var opened = _a.opened;
    return opened ? '7.2rem' : '.4rem';
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.primary.turquoise;
}, function (_a) {
    var opened = _a.opened,
        theme = _a.theme;
    return opened && theme.colors.light.flash;
});
var Thumbnail = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.img.withConfig({
    displayName: 'AccommodationPickerEntry__Thumbnail',
    componentId: 'sc-1xq0d0r-1'
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    margin-left: 1rem;\n    width: 7.2rem;\n    height: 4.5rem;\n    object-fit: cover;\n    border-radius: 4px;\n"], ["\n    margin-left: 1rem;\n    width: 7.2rem;\n    height: 4.5rem;\n    object-fit: cover;\n    border-radius: 4px;\n"])));
var Description = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'AccommodationPickerEntry__Description',
    componentId: 'sc-1xq0d0r-2'
})(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    display: flex;\n    height: 4.5rem;\n    width: 25rem;\n    flex-direction: column;\n    justify-self: center;\n    margin: 0rem 1rem;\n"], ["\n    display: flex;\n    height: 4.5rem;\n    width: 25rem;\n    flex-direction: column;\n    justify-self: center;\n    margin: 0rem 1rem;\n"])));
var Title = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'AccommodationPickerEntry__Title',
    componentId: 'sc-1xq0d0r-3'
})(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    font-weight: 500;\n    line-height: 1.1em;\n    width: 20rem;\n"], ["\n    font-weight: 500;\n    line-height: 1.1em;\n    width: 20rem;\n"])));
var Code = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'AccommodationPickerEntry__Code',
    componentId: 'sc-1xq0d0r-4'
})(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    color: ", ";\n    font-size: 0.8em;\n"], ["\n    color: ", ";\n    font-size: 0.8em;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.dark.silver;
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;

/***/ })

};
//# sourceMappingURL=main.11fa9b6ab8381345693c.hot-update.js.map
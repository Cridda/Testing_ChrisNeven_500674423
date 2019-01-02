exports.id = "main";
exports.modules = {

/***/ "./src/components/organisms/info/InfoFacilities.tsx":
/*!**********************************************************!*\
  !*** ./src/components/organisms/info/InfoFacilities.tsx ***!
  \**********************************************************/
/*! exports provided: bedroomFragment, bathroomFragment, facilitiesFragment, InfoFacilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bedroomFragment", function() { return bedroomFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bathroomFragment", function() { return bathroomFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "facilitiesFragment", function() { return facilitiesFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoFacilities", function() { return InfoFacilities; });
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/symbol/iterator */ "babel-runtime/core-js/symbol/iterator");
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/symbol */ "babel-runtime/core-js/symbol");
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/core-js/object/create */ "babel-runtime/core-js/object/create");
/* harmony import */ var babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! babel-runtime/core-js/object/set-prototype-of */ "babel-runtime/core-js/object/set-prototype-of");
/* harmony import */ var babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _molecules_ContentHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../molecules/ContentHeader */ "./src/components/molecules/ContentHeader.tsx");
/* harmony import */ var _atoms_Divider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../atoms/Divider */ "./src/components/atoms/Divider.tsx");
/* harmony import */ var _atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../atoms/ContentBlock */ "./src/components/atoms/ContentBlock.tsx");
/* harmony import */ var _atoms_SecondaryButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../atoms/SecondaryButton */ "./src/components/atoms/SecondaryButton.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _atoms_Checkbox__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../atoms/Checkbox */ "./src/components/atoms/Checkbox.tsx");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_responsive_modal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-responsive-modal */ "react-responsive-modal");
/* harmony import */ var react_responsive_modal__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_responsive_modal__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _molecules_InputWithToggle__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../molecules/InputWithToggle */ "./src/components/molecules/InputWithToggle.tsx");
/* harmony import */ var _molecules_LanguagesInputBlock__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../molecules/LanguagesInputBlock */ "./src/components/molecules/LanguagesInputBlock.tsx");
/* harmony import */ var _atoms_PrimaryButton__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../atoms/PrimaryButton */ "./src/components/atoms/PrimaryButton.tsx");
/* harmony import */ var _atoms_DoubleBedSVG__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../atoms/DoubleBedSVG */ "./src/components/atoms/DoubleBedSVG.tsx");
/* harmony import */ var _atoms_SingleBedSVG__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../atoms/SingleBedSVG */ "./src/components/atoms/SingleBedSVG.tsx");
/* harmony import */ var _constants_theme__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../constants/theme */ "./src/constants/theme.tsx");
/* harmony import */ var _molecules_bathroom_BathroomModal__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../molecules/bathroom/BathroomModal */ "./src/components/molecules/bathroom/BathroomModal.tsx");






var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_5___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_4___default.a || { __proto__: [] } instanceof Array && function (d, b) {
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
        d.prototype = b === null ? babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_3___default()(b) : (__.prototype = b.prototype, new __());
    };
}();
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && (g[babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && o[babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};


















var bedroomFragment = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment BedroomFragment on Bedroom {\n        id\n        singleBed\n        doubleBed\n        type {\n            name\n        }\n        name {\n            nl\n            en\n            de\n        }\n    }\n"], ["\n    fragment BedroomFragment on Bedroom {\n        id\n        singleBed\n        doubleBed\n        type {\n            name\n        }\n        name {\n            nl\n            en\n            de\n        }\n    }\n"])));
var bathroomFragment = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    fragment BathroomFragment on Bathroom {\n        id\n        toilet\n        bath\n        shower\n        type {\n            name\n        }\n        name {\n            nl\n            en\n            de\n        }\n    }\n"], ["\n    fragment BathroomFragment on Bathroom {\n        id\n        toilet\n        bath\n        shower\n        type {\n            name\n        }\n        name {\n            nl\n            en\n            de\n        }\n    }\n"])));
var facilitiesFragment = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    fragment FacilitiesFragment on Accommodation {\n        bathrooms {\n            ...BathroomFragment\n        }\n        bedrooms {\n            ...BedroomFragment\n        }\n        sites {\n            name\n        }\n        features {\n            name\n        }\n    }\n    ", "\n    ", "\n"], ["\n    fragment FacilitiesFragment on Accommodation {\n        bathrooms {\n            ...BathroomFragment\n        }\n        bedrooms {\n            ...BedroomFragment\n        }\n        sites {\n            name\n        }\n        features {\n            name\n        }\n    }\n    ", "\n    ", "\n"])), bedroomFragment, bathroomFragment);
var SITES_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    query SitesQuery {\n        sites {\n            id\n            name\n        }\n    }\n"], ["\n    query SitesQuery {\n        sites {\n            id\n            name\n        }\n    }\n"])));
var FEATURES_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    query FeaturesQuery {\n        features {\n            id\n            name\n        }\n    }\n"], ["\n    query FeaturesQuery {\n        features {\n            id\n            name\n        }\n    }\n"])));
var BEDROOMTYPES_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    query BedroomTypesQuery {\n        bedroomTypes {\n            id\n            name\n        }\n    }\n"], ["\n    query BedroomTypesQuery {\n        bedroomTypes {\n            id\n            name\n        }\n    }\n"])));
var CREATE_BEDROOM = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    mutation CreateBedroom($accommodationId: ID!, $bedroom: BedroomInput!) {\n        createBedroom(accommodationId: $accommodationId, bedroom: $bedroom) {\n            ...BedroomFragment\n        }\n    }\n    ", "\n"], ["\n    mutation CreateBedroom($accommodationId: ID!, $bedroom: BedroomInput!) {\n        createBedroom(accommodationId: $accommodationId, bedroom: $bedroom) {\n            ...BedroomFragment\n        }\n    }\n    ", "\n"])), bedroomFragment);
var CREATE_BATHROOM = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    mutation CreateBathroom($accommodationId: ID!, $bathroom: BathroomInput!) {\n        createBathroom(accommodationId: $accommodationId, bathroom: $bathroom) {\n            ...BathroomFragment\n        }\n    }\n    ", "\n"], ["\n    mutation CreateBathroom($accommodationId: ID!, $bathroom: BathroomInput!) {\n        createBathroom(accommodationId: $accommodationId, bathroom: $bathroom) {\n            ...BathroomFragment\n        }\n    }\n    ", "\n"])), bathroomFragment);
// const bedroomSchema = Yup.object().shape({
//     name: Yup.object({ nl: Yup.string().required('Is verplicht goos') }),
//     singleBed: Yup.number().required('Is verplicht'),
//     doubleBed: Yup.number().required('Is verplicht')
// });
var OptionsBlock = styled_components__WEBPACK_IMPORTED_MODULE_11___default.a.div.withConfig({
    displayName: "InfoFacilities__OptionsBlock",
    componentId: "ac7lkc-0"
})(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    display: grid;\n    @media ", " {\n        grid-template-columns: 0.5fr 0.5fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.333fr 0.333fr 0.333fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;\n    }\n"], ["\n    display: grid;\n    @media ", " {\n        grid-template-columns: 0.5fr 0.5fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.333fr 0.333fr 0.333fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;\n    }\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].xs, _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].s, _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].l);
var Bedroom = styled_components__WEBPACK_IMPORTED_MODULE_11___default.a.div.withConfig({
    displayName: "InfoFacilities__Bedroom",
    componentId: "ac7lkc-1"
})(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    padding: 2rem;\n    background: ", ";\n    display: flex;\n    flex-direction: column;\n    height: 15rem;\n    cursor: pointer;\n    p {\n        margin: 0;\n    }\n    h4 {\n        padding-top: 0.5rem;\n        line-height: 1.2em;\n    }\n"], ["\n    padding: 2rem;\n    background: ", ";\n    display: flex;\n    flex-direction: column;\n    height: 15rem;\n    cursor: pointer;\n    p {\n        margin: 0;\n    }\n    h4 {\n        padding-top: 0.5rem;\n        line-height: 1.2em;\n    }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.light.flash;
});
var BedroomContainer = styled_components__WEBPACK_IMPORTED_MODULE_11___default.a.div.withConfig({
    displayName: "InfoFacilities__BedroomContainer",
    componentId: "ac7lkc-2"
})(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    padding: 0rem 1.5rem;\n    display: grid;\n    grid-template-columns: 1fr;\n    @media ", " {\n        grid-template-columns: 0.333fr 0.333fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.333fr 0.333fr 0.333fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr;\n    }\n    grid-column-gap: 1rem;\n    grid-row-gap: 1rem;\n"], ["\n    padding: 0rem 1.5rem;\n    display: grid;\n    grid-template-columns: 1fr;\n    @media ", " {\n        grid-template-columns: 0.333fr 0.333fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.333fr 0.333fr 0.333fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr;\n    }\n    grid-column-gap: 1rem;\n    grid-row-gap: 1rem;\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].xs, _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].s, _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].l, _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].xl);
var Beds = styled_components__WEBPACK_IMPORTED_MODULE_11___default.a.div.withConfig({
    displayName: "InfoFacilities__Beds",
    componentId: "ac7lkc-3"
})(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n"], ["\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n"])));
var InfoFacilities = /** @class */function (_super) {
    __extends(InfoFacilities, _super);
    function InfoFacilities() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false,
            bedrooms: []
        };
        _this.onOpenModal = function () {
            _this.setState({ open: true });
        };
        _this.onCloseModal = function () {
            _this.setState({ open: false });
        };
        _this.addToBedrooms = function (bedroom) {
            var bedrooms = _this.state.bedrooms;
            bedrooms.push(bedroom);
            _this.setState({ bedrooms: bedrooms });
        };
        _this.componentDidMount = function () {
            var accommodation = _this.props.accommodation;
            if (accommodation.bedrooms) {
                _this.setState({ bedrooms: accommodation.bedrooms });
            }
        };
        return _this;
    }
    InfoFacilities.prototype.render = function () {
        var _this = this;
        var accommodation = this.props.accommodation;
        var _a = this.state,
            open = _a.open,
            bedrooms = _a.bedrooms;
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_responsive_modal__WEBPACK_IMPORTED_MODULE_15___default.a, { open: open, onClose: this.onCloseModal, center: true }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", { style: { padding: '2rem 5rem 3rem 5rem' } }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h1", null, "Slaapkamer toevoegen"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_8__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolores incidunt ipsa, earum nobis beatae facilis, dolore harum vitae nihil molestias repudiandae non quisquam ab. Omnis unde atque voluptate ipsa!"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_14__["Mutation"], { mutation: CREATE_BEDROOM }, function (createBedroom) {
            return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_16__["Formik"], { initialValues: {
                    name: { en: '', nl: '', de: '' },
                    singleBed: 0,
                    doubleBed: 0,
                    type: { id: '' }
                }, onSubmit: function onSubmit(bedroom) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // Why tf do I need to do this ugly af workaround
                                    bedroom.doubleBed = Number(bedroom.doubleBed);
                                    bedroom.singleBed = Number(bedroom.singleBed);
                                    return [4 /*yield*/, createBedroom({
                                        variables: { accommodationId: accommodation.id, bedroom: bedroom }
                                    })];
                                case 1:
                                    response = _a.sent();
                                    if (response && response.data && response.data.createBedroom) {
                                        this.setState({ bedrooms: response.data.createBedroom });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                } }, function (_a) {
                var submitForm = _a.submitForm,
                    resetForm = _a.resetForm,
                    errors = _a.errors;
                return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_16__["Form"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h2", null, "Faciliteiten "), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__["default"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h4", null, "Type slaapkamer"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_14__["Query"], { query: BEDROOMTYPES_QUERY }, function (_a) {
                    var data = _a.data,
                        error = _a.error,
                        loading = _a.loading;
                    if (loading || error || !data) {
                        return null;
                    }
                    var options = [];
                    var optionValues = [];
                    data.bedroomTypes.map(function (bedroom) {
                        options.push(bedroom.name);
                        optionValues.push(bedroom.id);
                    });
                    return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_16__["Field"], { name: "type.id", options: options, optionValues: optionValues, component: _molecules_InputWithToggle__WEBPACK_IMPORTED_MODULE_17__["default"] });
                })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__["default"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h4", null, "Naam"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_molecules_LanguagesInputBlock__WEBPACK_IMPORTED_MODULE_18__["LanguagesInputBlock"], { errors: errors, name: "name" })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__["default"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h4", null, "Eenpersoonsbed"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_16__["Field"], { type: "number", name: "singleBed", options: [0, 1, 2, 3, 4, 5], component: _molecules_InputWithToggle__WEBPACK_IMPORTED_MODULE_17__["default"] }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h4", null, "Tweepersoonsbed"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_16__["Field"], { type: "number", name: "doubleBed", options: [0, 1, 2, 3, 4, 5], component: _molecules_InputWithToggle__WEBPACK_IMPORTED_MODULE_17__["default"] })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_8__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_PrimaryButton__WEBPACK_IMPORTED_MODULE_19__["PrimaryButton"], { onClick: function onClick() {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4 /*yield*/, submitForm()];
                                    case 1:
                                        _a.sent();
                                        resetForm();
                                        this.onCloseModal();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    } }, "Slaapkamer toevoegen"));
            });
        }))), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_molecules_ContentHeader__WEBPACK_IMPORTED_MODULE_7__["default"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h1", null, "Faciliteiten van het ", accommodation.type.name), "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quia reprehenderit minima nisi voluptates."), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_8__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__["default"], { threeColumns: true }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h2", null, "Slaapkamers"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam praesentium enim modi fugiat voluptatem, atque quod eveniet mollitia quas deleniti."), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_SecondaryButton__WEBPACK_IMPORTED_MODULE_10__["default"], { onClick: function onClick() {
                return _this.onOpenModal();
            }, type: "button" }, "Slaapkamer toevoegen")), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(BedroomContainer, null, bedrooms && bedrooms.map(function (bedroom, index) {
            var doubleBed = bedroom.doubleBed,
                singleBed = bedroom.singleBed;
            return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Bedroom, { onClick: function onClick() {
                    return _this.onOpenModal();
                }, key: 'bedroom'.concat(String(index)) }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Beds, null, __spread(Array(bedroom.doubleBed)).map(function (_, i) {
                return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_DoubleBedSVG__WEBPACK_IMPORTED_MODULE_20__["DoubleBedSVG"], { key: 'double'.concat(String(i)) });
            }), __spread(Array(bedroom.singleBed)).map(function (_, i) {
                return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_SingleBedSVG__WEBPACK_IMPORTED_MODULE_21__["SingleBedSVG"], { key: 'single'.concat(String(i)) });
            })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h4", null, bedroom.type.name), doubleBed > 0 && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, doubleBed + " tweepersoonsbed"), singleBed > 0 && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, singleBed + " eenpersoonsbed"));
        })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_8__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__["default"], { threeColumns: true }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h2", null, "Badkamers"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam praesentium enim modi fugiat voluptatem, atque quod eveniet mollitia quas deleniti."), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_molecules_bathroom_BathroomModal__WEBPACK_IMPORTED_MODULE_23__["default"], { edit: true })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_8__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__["default"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h2", null, "Ligging"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quia maiores, deleniti quaerat, fuga quos earum impedit id dolorum tempora quo architecto iure asperiores officiis quisquam nobis atque. Voluptatem, provident.")), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(OptionsBlock, null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_14__["Query"], { query: SITES_QUERY }, function (_a) {
            var loading = _a.loading,
                data = _a.data,
                error = _a.error;
            if (loading || !data) {
                return 'Loading...';
            }
            if (error) {
                return null;
            }
            var sites = data.sites;
            var accommodationSites = accommodation.sites;
            return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, sites.map(function (_a) {
                var id = _a.id,
                    name = _a.name;
                var checked = false;
                if (accommodationSites) {
                    checked = !!accommodationSites.find(function (accSite) {
                        return accSite.name === name;
                    });
                }
                return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Checkbox__WEBPACK_IMPORTED_MODULE_12__["default"], { key: id, checked: checked, onChange: function onChange() {
                        return '';
                    } }, name);
            }));
        })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_8__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__["default"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h2", null, "Accommodatie kenmerken"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quia maiores, deleniti quaerat, fuga quos earum impedit id dolorum tempora quo architecto iure asperiores officiis quisquam nobis atque. Voluptatem, provident.")), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(OptionsBlock, null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_14__["Query"], { query: FEATURES_QUERY }, function (_a) {
            var loading = _a.loading,
                error = _a.error,
                data = _a.data;
            if (loading || !data) {
                return 'Loading...';
            }
            if (error) {
                return null;
            }
            var features = data.features;
            var accommodationFeatures = accommodation.features;
            return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, features.map(function (_a) {
                var id = _a.id,
                    name = _a.name;
                var checked = false;
                if (accommodationFeatures) {
                    checked = !!accommodationFeatures.find(function (accFeature) {
                        return accFeature.name === name;
                    });
                }
                return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Checkbox__WEBPACK_IMPORTED_MODULE_12__["default"], { key: id, checked: checked, onChange: function onChange() {
                        return '';
                    } }, name);
            }));
        })));
    };
    return InfoFacilities;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;

/***/ }),

/***/ "./src/components/templates/Login.tsx":
/*!********************************************!*\
  !*** ./src/components/templates/Login.tsx ***!
  \********************************************/
/*! exports provided: Login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return Login; });
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/symbol/iterator */ "babel-runtime/core-js/symbol/iterator");
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/symbol */ "babel-runtime/core-js/symbol");
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _atoms_PrimaryButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../atoms/PrimaryButton */ "./src/components/atoms/PrimaryButton.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _atoms_AnchorTag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../atoms/AnchorTag */ "./src/components/atoms/AnchorTag.tsx");
/* harmony import */ var _atoms_Divider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../atoms/Divider */ "./src/components/atoms/Divider.tsx");
/* harmony import */ var _atoms_Logo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../atoms/Logo */ "./src/components/atoms/Logo.tsx");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! yup */ "yup");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _atoms_TextInput__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../atoms/TextInput */ "./src/components/atoms/TextInput.tsx");




var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_3___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && (g[babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = undefined;












var LOGIN_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_7___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation LoginMutation($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n            token\n        }\n    }\n"], ["\n    mutation LoginMutation($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n            token\n        }\n    }\n"])));
var LoginSchema = yup__WEBPACK_IMPORTED_MODULE_14__["object"]().shape({
    email: yup__WEBPACK_IMPORTED_MODULE_14__["string"]().email('Vul een geldig email adres in').required('Email adres is verplicht'),
    password: yup__WEBPACK_IMPORTED_MODULE_14__["string"]().required('Wachtwoord is verplicht')
});
var Login = function Login(_a) {
    var history = _a.history;
    if (Object(_utils__WEBPACK_IMPORTED_MODULE_12__["readToken"])()) {
        history.push('/accommodation/dashboard');
    }
    // Read token from localStorage in order to check if the user is logged in.
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_8__["Mutation"], { mutation: LOGIN_MUTATION }, function (mutate, _a) {
        var error = _a.error,
            data = _a.data;
        return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Container, null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(FormWrapper, null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_atoms_Logo__WEBPACK_IMPORTED_MODULE_11__["default"], { variant: "dark" }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_10__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_13__["Formik"], { initialValues: { email: '', password: '' }, validationSchema: LoginSchema, onSubmit: function onSubmit(values) {
                return __awaiter(_this, void 0, void 0, function () {
                    var response, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2,, 3]);
                                return [4 /*yield*/, mutate({
                                    variables: values
                                })];
                            case 1:
                                response = _a.sent();
                                if (response && response.data) {
                                    Object(_utils__WEBPACK_IMPORTED_MODULE_12__["setToken"])(response.data.login.token);
                                    history.push('/accommodation/dashboard');
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                e_1 = _a.sent();
                                alert('Verkeerde gebruikersnaam en/of wachtwoord');
                                return [3 /*break*/, 3];
                            case 3:
                                return [2 /*return*/];
                        }
                    });
                });
            } }, function (_a) {
            var handleSubmit = _a.handleSubmit;
            return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_13__["Form"], null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_13__["Field"], { name: "email", type: "text", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_15__["TextInput"], placeholder: 'Email' }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_13__["Field"], { name: "password", type: "password", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_15__["TextInput"], placeholder: 'Wachtwoord' }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_atoms_PrimaryButton__WEBPACK_IMPORTED_MODULE_5__["PrimaryButton"], { onClick: handleSubmit, type: "button" }, "Inloggen"));
        }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_10__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(LoginMenu, null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_atoms_AnchorTag__WEBPACK_IMPORTED_MODULE_9__["AnchorTag"], { to: '/register' }, "account aanmaken"), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_atoms_AnchorTag__WEBPACK_IMPORTED_MODULE_9__["AnchorTag"], { to: '/login' }, "wachtwoord vergeten")))));
    });
};
var Container = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div.withConfig({
    displayName: "Login__Container",
    componentId: "sc-1tj3y1i-0"
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n"], ["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n"])));
var LoginMenu = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div.withConfig({
    displayName: "Login__LoginMenu",
    componentId: "sc-1tj3y1i-1"
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    display: flex;\n    justify-content: space-between;\n    width: 100%;\n"], ["\n    display: flex;\n    justify-content: space-between;\n    width: 100%;\n"])));
var FormWrapper = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div.withConfig({
    displayName: "Login__FormWrapper",
    componentId: "sc-1tj3y1i-2"
})(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    width: 50rem;\n    input {\n        padding: 1rem;\n        margin-bottom: 1rem;\n    }\n"], ["\n    width: 50rem;\n    input {\n        padding: 1rem;\n        margin-bottom: 1rem;\n    }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

/***/ })

};
//# sourceMappingURL=main.a1f90fe473727e5c3949.hot-update.js.map
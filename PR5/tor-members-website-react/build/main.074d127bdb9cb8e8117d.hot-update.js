exports.id = "main";
exports.modules = {

/***/ "./src/components/atoms/AnchorTag.tsx":
/*!********************************************!*\
  !*** ./src/components/atoms/AnchorTag.tsx ***!
  \********************************************/
/*! exports provided: AnchorTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnchorTag", function() { return AnchorTag; });
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};



var StyledLink = styled_components__WEBPACK_IMPORTED_MODULE_3___default()(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    text-decoration: underline;\n    :hover {\n        color: ", ";\n    }\n"], ["\n    text-decoration: underline;\n    :hover {\n        color: ", ";\n    }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.primary.turquoise;
});
var AnchorTag = function AnchorTag(_a) {
    var to = _a.to,
        children = _a.children;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledLink, { to: to }, children);
};
var templateObject_1;

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
                                for (i = 1; i < 5; i++) {
                                    // Print i to the Output window.
                                    Debug.write('loop index is ' + i);
                                    // Wait for user to resume.
                                    debugger;
                                }
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3,, 4]);
                                return [4 /*yield*/, mutate({
                                    variables: values
                                })];
                            case 2:
                                response = _a.sent();
                                console.log(values.password);
                                if (response && response.data) {
                                    Object(_utils__WEBPACK_IMPORTED_MODULE_12__["setToken"])(response.data.login.token);
                                    history.push('/accommodation/dashboard');
                                }
                                return [3 /*break*/, 4];
                            case 3:
                                e_1 = _a.sent();
                                alert('Verkeerde gebruikersnaam en/of wachtwoord');
                                return [3 /*break*/, 4];
                            case 4:
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
var password = 'asdasd';
// @ts-ignore
eval(LoginSchema);
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
//# sourceMappingURL=main.074d127bdb9cb8e8117d.hot-update.js.map
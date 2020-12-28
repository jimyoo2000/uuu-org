"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var register_1 = require("./register");
var umiDapp_1 = require("../context/umiDapp");
var registerDone_1 = require("./registerDone");
var home_1 = require("./home");
var footer_1 = require("./footer");
var pool_open_1 = require("./pool/pool-open");
var about_1 = require("./about");
var sage_1 = require("./sage");
var sageDetail_1 = require("./sageDetail");
var sageV2_1 = require("./sageV2");
var sageV2Detail_1 = require("./sageV2Detail");
var profit_1 = require("./profit");
require("./App.less");
var chrismas_1 = require("./chrismas");
var App = function (props) {
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement(umiDapp_1["default"], null,
            react_1["default"].createElement(react_router_dom_1.Switch, null,
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/", component: home_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/register/:referrer?", component: register_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/registerok/", component: registerDone_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/pool/", component: pool_open_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/about/", component: about_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/sage/", component: sage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/sageDetail/", component: sageDetail_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/sagev2/", component: sageV2_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/sagev2Detail/", component: sageV2Detail_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/sagev2Profit/", component: profit_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/chrismas/", component: chrismas_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/404" })),
            react_1["default"].createElement(footer_1["default"], null))));
};
exports["default"] = App;

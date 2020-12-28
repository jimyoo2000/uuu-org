"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var App_1 = require("./pages/App");
var notfound_1 = require("./pages/error/notfound");
require("./index.less");
require("./index-phone.less");
react_dom_1["default"].render(react_1["default"].createElement(react_router_dom_1.HashRouter, null,
    react_1["default"].createElement(react_router_dom_1.Switch, null,
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/404", component: notfound_1["default"] }),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/", component: App_1["default"] }))), document.getElementById('root'));

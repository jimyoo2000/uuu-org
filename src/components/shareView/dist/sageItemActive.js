"use strict";
exports.__esModule = true;
var react_1 = require("react");
var qrcode_react_1 = require("qrcode.react");
function ShareView(_a) {
    var qrcodeContent = _a.qrcodeContent, closeAction = _a.closeAction;
    return (react_1["default"].createElement("div", { className: "reg-layer show" },
        react_1["default"].createElement("div", { className: "container" },
            react_1["default"].createElement("div", { className: "logo" },
                react_1["default"].createElement("img", { src: "/assets/image/logo26.png", alt: "" })),
            react_1["default"].createElement("div", { className: "msg" }, "The world\u2019s first custom financial mining platform."),
            react_1["default"].createElement("div", { className: "info" },
                react_1["default"].createElement("h3", null, "Scan the QR code to join UNIMINE."),
                react_1["default"].createElement("p", null, qrcodeContent),
                react_1["default"].createElement("div", { className: "ewm" },
                    react_1["default"].createElement(qrcode_react_1["default"], { value: qrcodeContent, size: 160, fgColor: "#000000" // 二维码的颜色
                        , style: { margin: 'auto' }, imageSettings: {
                            src: "/assets/image/logo26.png",
                            height: 26,
                            width: 26,
                            excavate: true
                        } }))))));
}
exports["default"] = ShareView;

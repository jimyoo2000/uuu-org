"use strict";
exports.__esModule = true;
var react_1 = require("react");
var header_1 = require("src/pages/header");
function PoolClose() {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(header_1["default"], { selectIndex: 2 }),
        react_1["default"].createElement("div", { className: "wal umipool" },
            react_1["default"].createElement("div", { className: "container wow fadeInUp" },
                react_1["default"].createElement("div", { className: "title" }, "Wellcom to unimine pool"),
                react_1["default"].createElement("div", { className: "content" },
                    "97.5 million UMI will be mined in all the pools.",
                    react_1["default"].createElement("br", null),
                    "Authorized and started mining to obtain UMI.The Ethereum wallet needs to be installed and authorized to obtain the wallet address to bind a unique identity.")),
            react_1["default"].createElement("div", { className: "list wow fadeInUp" },
                react_1["default"].createElement("div", { className: "title" },
                    react_1["default"].createElement("h2", null, "UNISAGE")),
                react_1["default"].createElement("h2", null, "Comming soon")),
            react_1["default"].createElement("div", { className: "row" },
                react_1["default"].createElement("div", { className: "col-2 wow fadeInUp" },
                    react_1["default"].createElement("div", { className: "title" }, "Liquidity mining"),
                    react_1["default"].createElement("div", { className: "content" }, "Coming soon")),
                react_1["default"].createElement("div", { className: "col-2 wow fadeInUp" },
                    react_1["default"].createElement("div", { className: "title" }, "Custom mining platform"),
                    react_1["default"].createElement("div", { className: "content" }, "Coming soon"))))));
}
;
exports["default"] = PoolClose;

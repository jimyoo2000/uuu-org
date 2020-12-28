"use strict";
exports.__esModule = true;
var react_1 = require("react");
var format_number_1 = require("src/utils/format-number");
var x3MatrixMap = [0, 1, 2];
var x2MatrixMap = [0, 1];
function SageItemActive(_a) {
    var data = _a.data, showStart = _a.showStart, startAction = _a.startAction;
    var levelIcon = [
        "/assets/image/ic_sg_level01.png",
        "/assets/image/ic_sg_level02.png",
        "/assets/image/ic_sg_level03.png",
        "/assets/image/ic_sg_level04.png",
        "/assets/image/ic_sg_level05.png",
        "/assets/image/ic_sg_level06.png",
        "/assets/image/ic_sg_level07.png",
        "/assets/image/ic_sg_level08.png",
        "/assets/image/ic_sg_level09.png",
        "/assets/image/ic_sg_level10.png"
    ];
    var notactiveBody = (react_1["default"].createElement("li", null,
        react_1["default"].createElement("div", { className: "box wow fadeInUp" },
            react_1["default"].createElement("div", { className: "level" },
                react_1["default"].createElement("img", { src: levelIcon[data.level - 1], alt: "" })),
            showStart ?
                (react_1["default"].createElement("div", { className: "btn", onClick: function (e) {
                        e.preventDefault();
                        startAction();
                    } },
                    react_1["default"].createElement("a", null, "Start "))) : react_1["default"].createElement("div", null))));
    var activeBody = (react_1["default"].createElement("li", null,
        react_1["default"].createElement("div", { className: "box wow fadeInUp" },
            react_1["default"].createElement("div", { className: "level" },
                react_1["default"].createElement("img", { src: levelIcon[data.level - 1], alt: "" })),
            react_1["default"].createElement("div", { className: "row" },
                react_1["default"].createElement("div", { className: "name" },
                    react_1["default"].createElement("dl", null,
                        react_1["default"].createElement("dd", null,
                            react_1["default"].createElement("b", null, format_number_1["default"](data.eth)),
                            react_1["default"].createElement("em", null, "ETH")),
                        react_1["default"].createElement("dd", null,
                            react_1["default"].createElement("b", null, format_number_1["default"](data.umi)),
                            react_1["default"].createElement("em", null, "UMI")))),
                react_1["default"].createElement("div", { className: "info" },
                    react_1["default"].createElement("dl", null,
                        react_1["default"].createElement("dd", null,
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("em", null, "x3"),
                                x3MatrixMap.map(function (value, index) {
                                    return react_1["default"].createElement("i", { key: index, className: index < data.x3matrix ? "on" : "" });
                                })),
                            react_1["default"].createElement("b", null, data.x3reopen)),
                        react_1["default"].createElement("dd", null,
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("em", null, "x2"),
                                x2MatrixMap.map(function (value, index) {
                                    return react_1["default"].createElement("i", { key: index, className: index < data.x2matrix ? "on" : "" });
                                })),
                            react_1["default"].createElement("b", null, data.x2reopen))))))));
    var body = data.active ? activeBody : notactiveBody;
    return body;
}
exports["default"] = SageItemActive;

"use strict";
exports.__esModule = true;
var react_1 = require("react");
var linkConfig_1 = require("src/config/linkConfig");
/**
 * 推特https://twitter.com/Unimine5
电报https://t.me/unisage
youtube:https://www.youtube.com/channel/UCK-jkj9u8GiZ6N1_685m4Cg
*/
function CommonFooter() {
    return (react_1["default"].createElement("div", { className: "g-foot" },
        react_1["default"].createElement("div", { className: "wal" },
            react_1["default"].createElement("div", { className: "logo" },
                react_1["default"].createElement("a", { href: "#/" },
                    react_1["default"].createElement("img", { src: "/assets/image/ic_logo_footer.png", alt: "" }))),
            react_1["default"].createElement("div", { className: "share" },
                react_1["default"].createElement("dl", null,
                    react_1["default"].createElement("dd", null,
                        react_1["default"].createElement("a", { href: linkConfig_1.telegramLink, target: "_blank", rel: "noopener noreferrer" },
                            react_1["default"].createElement("img", { src: "/assets/image/ic_telegram.png", alt: "" }))),
                    react_1["default"].createElement("dd", null,
                        react_1["default"].createElement("a", { href: linkConfig_1.twitterLink, target: "_blank", rel: "noopener noreferrer" },
                            react_1["default"].createElement("img", { src: "/assets/image/ic_tw.png", alt: "" }))),
                    react_1["default"].createElement("dd", null,
                        react_1["default"].createElement("a", { href: linkConfig_1.youtubeLink, target: "_blank", rel: "noopener noreferrer" },
                            react_1["default"].createElement("img", { src: "/assets/image/ic_ytb.png", alt: "" })))),
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("a", { href: "mailto:info@unimine.org", target: "_blank" }, "info@unimine.org"))),
            react_1["default"].createElement("div", { className: "list" },
                react_1["default"].createElement("ul", null,
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("h3", null,
                            react_1["default"].createElement("a", { href: "#/" }, "Unimine")),
                        react_1["default"].createElement("dl", null,
                            react_1["default"].createElement("dd", null,
                                react_1["default"].createElement("a", { href: "#/" }, "UMI Token")))),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("h3", null,
                            react_1["default"].createElement("a", { href: "#/pool" }, "Mining Pool")),
                        react_1["default"].createElement("dl", null,
                            react_1["default"].createElement("dd", null,
                                react_1["default"].createElement("a", { href: "#/sagev2" }, "UNISAGE V2")),
                            react_1["default"].createElement("dd", null, "Liquidity Mining"),
                            react_1["default"].createElement("dd", null, "Custom Mining Platform"))),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("h3", null,
                            react_1["default"].createElement("a", null, "Information")),
                        react_1["default"].createElement("dl", null,
                            react_1["default"].createElement("dd", null,
                                react_1["default"].createElement("a", { href: "#/about", target: "_blank" }, " About")),
                            react_1["default"].createElement("dd", null,
                                react_1["default"].createElement("a", { href: linkConfig_1.umiPaperLink, target: "_blank" }, "Lite Paper")))))))));
}
;
exports["default"] = CommonFooter;

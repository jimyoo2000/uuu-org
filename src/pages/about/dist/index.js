"use strict";
exports.__esModule = true;
var react_1 = require("react");
var header_1 = require("../header");
function About() {
    // const clickCertificate = () => {
    //   window.location.href = "/assets/pdf/Unimine_CERT_GS_D.pdf";
    // }
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(header_1["default"], { selectIndex: 4 }),
        react_1["default"].createElement("div", { className: "about" },
            react_1["default"].createElement("div", { className: "wal" },
                react_1["default"].createElement("div", { className: "title wow fadeInUp" },
                    react_1["default"].createElement("div", null),
                    react_1["default"].createElement("h2", null, "What\u2019s Unimine.ORG?")),
                react_1["default"].createElement("div", { className: "content wow fadeInUp" },
                    react_1["default"].createElement("p", null, "Unimine.org belongs to the Unimine Foundation, The registered name is Unimine Inc"),
                    react_1["default"].createElement("p", null, "In the initial stage, Unimine Foundation will handle all Unimine affairs such as development, operation, promotion, etc. After Phase I Unisage mining technology, Unimine Foundation will launch DAO (Decentralized Autonomous Organization), and all major community affairs will be decided by community voting."),
                    react_1["default"].createElement("p", null, "Unimine's goal is the world's NO.1 DeFi financing startup platform.")),
                react_1["default"].createElement("div", { className: "container" },
                    react_1["default"].createElement("div", { className: "logo wow fadeInUp" },
                        react_1["default"].createElement("img", { src: "/assets/image/img356.png", alt: "" })),
                    react_1["default"].createElement("dl", { className: "wow fadeInUp" },
                        react_1["default"].createElement("dd", null,
                            react_1["default"].createElement("em", null, "Registered name:"),
                            react_1["default"].createElement("b", null, "UNIMINE INC")),
                        react_1["default"].createElement("dd", null,
                            react_1["default"].createElement("em", null, "Registered ID :"),
                            react_1["default"].createElement("b", null, "20201892442")),
                        react_1["default"].createElement("dd", null,
                            react_1["default"].createElement("em", null, "Country :"),
                            react_1["default"].createElement("b", null, "USA")),
                        react_1["default"].createElement("dt", null,
                            react_1["default"].createElement("a", { href: "https://www.sos.state.co.us/biz/BusinessEntityDetail.do?quitButtonDestination=BusinessEntityResults&nameTyp=ENT&masterFileId=20201892442&entityId2=20201892442&fileId=20201892442&srchTyp=ENTITY", target: "_blank" }, "Checkout Company Status")),
                        react_1["default"].createElement("dt", null,
                            react_1["default"].createElement("a", { href: "/assets/pdf/Unimine_CERT_GS_D.pdf", target: "_blank" }, "Checkout Cetificate"))),
                    react_1["default"].createElement("div", { className: "img wow fadeInUp" },
                        react_1["default"].createElement("img", { src: "/assets/image/img700.png", alt: "" }))),
                react_1["default"].createElement("div", { className: "foot wow fadeInUp" },
                    "*The platform is still in the early stages of development, Pleas use it at your own risk.",
                    react_1["default"].createElement("br", null),
                    "*Any words on this website or lite paper and any other documents do not constitute investment advice.")))));
}
;
exports["default"] = About;

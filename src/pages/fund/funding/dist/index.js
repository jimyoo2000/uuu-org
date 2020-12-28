"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var antd_1 = require("antd");
var moment_1 = require("moment");
var react_1 = require("react");
var appConfig_1 = require("src/config/appConfig");
var appConfig_2 = require("src/config/dist/appConfig");
var linkConfig_1 = require("src/config/dist/linkConfig");
var linkConfig_2 = require("src/config/linkConfig");
var header_1 = require("src/pages/header");
var dapp_brower_checker_1 = require("src/utils/dapp-brower-checker");
var NullTimer = /** @class */ (function () {
    function NullTimer() {
    }
    NullTimer.prototype.hasRef = function () {
        return false;
    };
    NullTimer.prototype.refresh = function () {
        return this;
    };
    return NullTimer;
}());
var Funding = /** @class */ (function (_super) {
    __extends(Funding, _super);
    function Funding(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            timer: new NullTimer(),
            // 结束时间
            endTimeStr: '2020-11-09 24:00:00',
            endTime: moment_1["default"]('2020-11-09 24:00:00').valueOf(),
            // 显示
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            walletBrower: false
        };
        _this.doJoin.bind(_this);
        return _this;
    }
    Funding.prototype.formatNum = function (value) {
        return value < 10 ? "0" + value : value;
    };
    Funding.prototype.startTimer = function () {
        var _this = this;
        //定时更新当前时间
        this.setState({
            timer: setInterval(function () {
                var now = moment_1["default"]().valueOf();
                var cut = _this.state.endTime - now;
                _this.setState({
                    days: moment_1["default"].duration(cut).days(),
                    hours: moment_1["default"].duration(cut).hours(),
                    minutes: moment_1["default"].duration(cut).minutes(),
                    seconds: moment_1["default"].duration(cut).seconds()
                });
            }, 1000)
        });
    };
    Funding.prototype.componentDidMount = function () {
        this.startTimer();
        this.setState({
            walletBrower: dapp_brower_checker_1["default"]()
        });
    };
    Funding.prototype.componentWillUnmount = function () {
        if (this.state.timer) {
            clearInterval(this.state.timer);
            this.setState({
                timer: new NullTimer()
            });
        }
    };
    Funding.prototype.doJoin = function () {
        antd_1.message.error("not supported ");
    };
    Funding.prototype.render = function () {
        var _this = this;
        var _a = this.state, days = _a.days, hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds, walletBrower = _a.walletBrower;
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(header_1["default"], { selectIndex: 1 }),
            react_1["default"].createElement("div", { className: "wal fund-1" },
                react_1["default"].createElement("div", { className: "title wow fadeInUp" },
                    react_1["default"].createElement("h2", null, "UMI FIRST PROMOTION"),
                    react_1["default"].createElement("p", null, "90,000UMI Limited supply,after that UMI obtained only through mining & exchanges.")),
                react_1["default"].createElement("div", { className: "list" },
                    react_1["default"].createElement("div", { className: "col col-1 wow fadeInUp" },
                        react_1["default"].createElement("h3", null, "End at 2020-11-09 24:00:00."),
                        react_1["default"].createElement("ul", null,
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("b", { id: "day" }, this.formatNum(days)),
                                react_1["default"].createElement("div", null, "Days")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("b", { id: "hour" }, this.formatNum(hours)),
                                react_1["default"].createElement("div", null, "Hours")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("b", { id: "minute" }, this.formatNum(minutes)),
                                react_1["default"].createElement("div", null, "Mins")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("b", { id: "second" }, this.formatNum(seconds)),
                                react_1["default"].createElement("div", null, "Secs")))),
                    react_1["default"].createElement("div", { className: "col col-2 wow fadeInUp" },
                        react_1["default"].createElement("h3", null, "90,000 UMI were supplied totally."),
                        react_1["default"].createElement("ul", null,
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("b", null, "000000"),
                                react_1["default"].createElement("div", null, "Amount left now")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("b", null, "90000"),
                                react_1["default"].createElement("div", null, "Supply"))))),
                react_1["default"].createElement("div", { className: "form wow fadeInUp" },
                    react_1["default"].createElement("div", { className: "input" },
                        react_1["default"].createElement("input", { type: "text", placeholder: "" }),
                        react_1["default"].createElement("em", null, "ETH")),
                    react_1["default"].createElement("p", null,
                        react_1["default"].createElement("em", null, " 1 ETH  = 1500 UMI ")),
                    react_1["default"].createElement("div", { className: "submit" },
                        react_1["default"].createElement("input", { type: "button", value: "JOIN", onClick: function (e) {
                                _this.doJoin();
                            } }))),
                !walletBrower && (react_1["default"].createElement("div", { className: "msg wow fadeInUp" },
                    react_1["default"].createElement("div", { className: "ico" },
                        react_1["default"].createElement("img", { src: "/assets/image/img85.png", alt: "" })),
                    react_1["default"].createElement("p", null, "Install Ethereum wallet to purchase UMI cryptocurrency."),
                    react_1["default"].createElement("p", null,
                        "It\u2019s recommended to use: ",
                        react_1["default"].createElement("a", { href: linkConfig_2.metamaskLink, target: "_blank" }, "Metamask"),
                        "(Chrome extension & Firefox extension), ",
                        react_1["default"].createElement("a", { href: linkConfig_1.imtokenLink, target: "_blank" }, "imToken"),
                        ",",
                        react_1["default"].createElement("a", { href: linkConfig_2.trustWalletLink, target: "_blank" }, "Trustwallet"),
                        ",",
                        react_1["default"].createElement("a", { href: linkConfig_2.coinbaseLink, target: "_blank" }, "Coinbase"),
                        " etc.")))),
            react_1["default"].createElement("div", { className: "wal sage-4 sage-4-2" },
                react_1["default"].createElement("div", { className: "img wow fadeInUp" },
                    react_1["default"].createElement("img", { src: "/assets/image/img356.png", alt: "" })),
                react_1["default"].createElement("div", { className: "col" },
                    react_1["default"].createElement("div", { className: "title wow fadeInUp" },
                        react_1["default"].createElement("em", null, "About"),
                        react_1["default"].createElement("div", null, "What do we do?")),
                    react_1["default"].createElement("div", { className: "content wow fadeInUp" }, "Unimine is the best platform to get started mining cryptocurrency. It is the easiest platform for beginners to easily get into Blockchain.Unimine is the best platform to get started mining cryptocurrency. It is the easiest platform for beginners to easily get into Blockchain."),
                    react_1["default"].createElement("div", { className: "msg wow fadeInUp" },
                        react_1["default"].createElement("div", { className: "name" }, "Smart contract"),
                        react_1["default"].createElement("a", { href: appConfig_1.fundContractScanUrl, target: "_blank" }, appConfig_2.fundContractAddr)),
                    react_1["default"].createElement("div", { className: "btn wow fadeInUp" },
                        react_1["default"].createElement("a", { href: linkConfig_2.sagePaperLink, target: "_blank" },
                            react_1["default"].createElement("em", null, "ABOUT UNISAGE"),
                            react_1["default"].createElement("img", { src: "/assets/image/img20.png", alt: "" })),
                        react_1["default"].createElement("a", { href: linkConfig_2.sagePaperLink, target: "_blank" },
                            react_1["default"].createElement("em", null, "ABOUT UMI-Token"),
                            react_1["default"].createElement("img", { src: "/assets/image/img20.png", alt: "" }))))),
            react_1["default"].createElement("div", { className: "wal fund-2" },
                react_1["default"].createElement("div", { className: "title wow fadeInUp" }, "Got questions about UMI Token and UMI-fund related questions? We have got answers. Check it out!"),
                react_1["default"].createElement("ul", null,
                    react_1["default"].createElement("li", { className: "wow fadeInUp" },
                        react_1["default"].createElement("a", { href: "" }, "When will UMI Fund sale start?")),
                    react_1["default"].createElement("li", { className: "wow fadeInUp" },
                        react_1["default"].createElement("a", { href: "" }, "what is the minimun token purchase amount?")),
                    react_1["default"].createElement("li", { className: "wow fadeInUp" },
                        react_1["default"].createElement("a", { href: "" }, "How can I purchase UMI?")),
                    react_1["default"].createElement("li", { className: "wow fadeInUp" },
                        react_1["default"].createElement("a", { href: "" }, "Can I purchase UMI using a credit card?")),
                    react_1["default"].createElement("li", { className: "wow fadeInUp" },
                        react_1["default"].createElement("a", { href: "" }, "What is the UMI?")),
                    react_1["default"].createElement("li", { className: "wow fadeInUp" },
                        react_1["default"].createElement("a", { href: "" }, "What wallet do I need  to store UMI coins?")),
                    react_1["default"].createElement("li", { className: "wow fadeInUp" },
                        react_1["default"].createElement("a", { href: "" }, "When and how i will receive purchased UMI?")),
                    react_1["default"].createElement("li", { className: "wow fadeInUp" },
                        react_1["default"].createElement("a", { href: "" }, "Why are only 500000 coins available?")),
                    react_1["default"].createElement("li", { className: "wow fadeInUp" },
                        react_1["default"].createElement("a", { href: "" }, "what is the minimun token purchase amount?")),
                    react_1["default"].createElement("li", { className: "wow fadeInUp" },
                        react_1["default"].createElement("a", { href: "" }, "What are the benefits of UMI Token?"))))));
    };
    return Funding;
}(react_1["default"].Component));
exports["default"] = Funding;

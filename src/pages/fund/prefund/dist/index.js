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
var moment_1 = require("moment");
var react_1 = require("react");
var linkConfig_1 = require("src/config/linkConfig");
var header_1 = require("src/pages/header");
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
var Prefund = /** @class */ (function (_super) {
    __extends(Prefund, _super);
    function Prefund(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            timer: new NullTimer(),
            // 结束时间
            endTimeStr: '2020-11-02 24:00:00',
            endTime: moment_1["default"]('2020-11-02 24:00:00').valueOf(),
            // 显示
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        return _this;
    }
    Prefund.prototype.formatNum = function (value) {
        return value < 10 ? "0" + value : value;
    };
    Prefund.prototype.startTimer = function () {
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
    Prefund.prototype.componentDidMount = function () {
        this.startTimer();
    };
    Prefund.prototype.componentWillUnmount = function () {
        if (this.state.timer) {
            clearInterval(this.state.timer);
            this.setState({
                timer: new NullTimer()
            });
        }
    };
    Prefund.prototype.render = function () {
        var _a = this.state, days = _a.days, hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(header_1["default"], { selectIndex: 1 }),
            react_1["default"].createElement("div", { className: "wal index-1" },
                react_1["default"].createElement("div", { className: "title wow fadeInUp" },
                    react_1["default"].createElement("em", null),
                    react_1["default"].createElement("div", null, "UMI Token presale will land after:")),
                react_1["default"].createElement("div", { className: "list" },
                    react_1["default"].createElement("ul", { className: "wow fadeInUp" },
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
                            react_1["default"].createElement("div", null, "Secs"))))),
            react_1["default"].createElement("div", { className: "wal index-2" },
                react_1["default"].createElement("div", { className: "img wow fadeInUp" },
                    react_1["default"].createElement("img", { src: "/assets/image/logo_single.png", alt: "" })),
                react_1["default"].createElement("div", { className: "col" },
                    react_1["default"].createElement("div", { className: "title wow fadeInUp" },
                        react_1["default"].createElement("em", null, "About"),
                        react_1["default"].createElement("div", null, "What do we do?")),
                    react_1["default"].createElement("div", { className: "content wow fadeInUp" }, "Unimine is the best platform to get started mining cryptocurrency. It is the easiest platform for beginners to easily get into Blockchain.Unimine is the best platform to get started mining cryptocurrency. It is the easiest platform for beginners to easily get into Blockchain."),
                    react_1["default"].createElement("div", { className: "btn wow fadeInUp" },
                        react_1["default"].createElement("a", { href: linkConfig_1.umiPaperLink, target: "_blank" },
                            react_1["default"].createElement("em", null, "ABOUT UMI-Token"),
                            react_1["default"].createElement("img", { src: "/assets/image/img20.png", alt: "" })))))));
    };
    return Prefund;
}(react_1["default"].Component));
exports["default"] = Prefund;

"use strict";
exports.__esModule = true;
var react_1 = require("react");
var appConfig_1 = require("src/config/appConfig");
var umiDapp_1 = require("src/context/umiDapp");
var header_1 = require("../header");
var copy_to_clipboard_1 = require("copy-to-clipboard");
var antd_1 = require("antd");
var contract_1 = require("src/contract");
var shareView_1 = require("src/components/shareView");
var linkConfig_1 = require("src/config/linkConfig");
function RegisterOK() {
    var chainIdHex = react_1.useContext(umiDapp_1.UMIDapptContext).chainIdHex;
    var account = react_1.useContext(umiDapp_1.UMIDapptContext).account;
    var initDapp = react_1.useContext(umiDapp_1.UMIDapptContext).initDapp;
    var dappReady = react_1.useContext(umiDapp_1.UMIDapptContext).dappReady;
    var registered = react_1.useContext(umiDapp_1.UMIDapptContext).registered;
    var checkRegister = react_1.useContext(umiDapp_1.UMIDapptContext).checkRegister;
    var requestRegistered = react_1.useContext(umiDapp_1.UMIDapptContext).requestRegistered;
    var _a = react_1.useState(false), shownShare = _a[0], setShownShare = _a[1];
    var inviterUrl = react_1.useMemo(function () {
        return appConfig_1.appUrl + "/register/" + account;
    }, [account]);
    //share control
    var _b = react_1.useState(false), showShare = _b[0], setShowShare = _b[1];
    var doShowShare = function () {
        setShowShare(true);
    };
    var doHideShare = function () {
        setShowShare(false);
    };
    var registerAddress = react_1.useMemo(function () {
        return account;
    }, [account]);
    react_1.useEffect(function () {
        //如果钱包没有连接，连接钱包
        console.log("Register ok useEffect");
        if (!dappReady) {
            initDapp();
            console.log("Register ok useEffect initDapp");
            return;
        }
        if (!checkRegister) {
            requestRegistered();
            console.log("Register ok useEffect requestRegistered");
            return;
        }
    }, []);
    var onShare = function () {
        doShowShare();
        console.log(inviterUrl);
    };
    var onCopyLink = function () {
        copy_to_clipboard_1["default"](inviterUrl);
        console.log(inviterUrl);
        antd_1.message.success("copy successfully");
    };
    var _c = react_1.useState("reg-layer"), shareCardClassName = _c[0], setShareCardClassName = _c[1];
    react_1.useMemo(function () {
        if (shownShare) {
            setShareCardClassName("reg-layer show");
            console.log("ShareCard change show 1");
        }
        else {
            setShareCardClassName("reg-layer");
            console.log("ShareCard change show 2");
        }
    }, [shownShare]);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(header_1["default"], { selectIndex: 3 }),
        react_1["default"].createElement("div", { className: "wal regOk" },
            react_1["default"].createElement("div", { className: "title wow fadeInUp" },
                react_1["default"].createElement("em", null),
                react_1["default"].createElement("div", null, "Congratulations!")),
            react_1["default"].createElement("div", { className: "msg wow fadeInUp" },
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("p", null, "If the wallet does not show up, please add the UMI Token Contract:"),
                react_1["default"].createElement("p", null, contract_1.tokenContract.options.address)),
            react_1["default"].createElement("div", { className: "btn wow fadeInUp" },
                react_1["default"].createElement("a", { onClick: function (e) {
                        e.preventDefault();
                        onShare();
                    } }, "Invite Code"),
                react_1["default"].createElement("a", { onClick: function (e) {
                        e.preventDefault();
                        onCopyLink();
                    } }, "Copy Link")),
            react_1["default"].createElement("div", { className: "msg1 wow fadeInUp" },
                react_1["default"].createElement("p", null,
                    "The UMI token of the airdrop cannot be transferred in the early stage, and can only be transferred after the game is activated.",
                    react_1["default"].createElement("br", null),
                    "Follow our ",
                    react_1["default"].createElement("a", { href: linkConfig_1.twitterLink }, "Twitter"),
                    " and ",
                    react_1["default"].createElement("a", { href: linkConfig_1.telegramLink }, "Telegram"),
                    " for the latest information!"))),
        react_1["default"].createElement(shareView_1["default"], { show: showShare, qrcodeContent: inviterUrl, hideAction: doHideShare })));
}
;
exports["default"] = RegisterOK;

"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var linkConfig_1 = require("src/config/linkConfig");
var umiDapp_1 = require("src/context/umiDapp");
var header_1 = require("../header");
var contract_1 = require("src/contract");
var web3_1 = require("src/utils/web3");
var appConfig_1 = require("src/config/appConfig");
function Chrismas() {
    var chainIdHex = react_1.useContext(umiDapp_1.UMIDapptContext).chainIdHex;
    var account = react_1.useContext(umiDapp_1.UMIDapptContext).account;
    var initDapp = react_1.useContext(umiDapp_1.UMIDapptContext).initDapp;
    var dappReady = react_1.useContext(umiDapp_1.UMIDapptContext).dappReady;
    var registered = react_1.useContext(umiDapp_1.UMIDapptContext).registered;
    var checkRegister = react_1.useContext(umiDapp_1.UMIDapptContext).checkRegister;
    var requestRegistered = react_1.useContext(umiDapp_1.UMIDapptContext).requestRegistered;
    react_1.useEffect(function () {
        //如果钱包没有连接，连接钱包
        console.log("Chrismas useEffect");
        if (!dappReady) {
            initDapp();
            console.log("Chrismas useEffect initDapp");
            return;
        }
        if (!checkRegister) {
            requestRegistered();
            console.log("Chrismas useEffect requestRegistered");
            return;
        }
    }, []);
    var onJoin = function () {
        try {
            var value = web3_1["default"].utils.toWei("0");
            contract_1.chrismasContract.methods
                .getChrismasAirdrop()
                .send({
                from: web3_1["default"].eth.defaultAccount,
                to: contract_1.chrismasContract.options.address,
                value: value
            })
                .once('transactionHash', function (txHash) {
                antd_1.message.success("transaction submit,please wait ethereum confirms");
            })
                .once('receipt', function () {
                antd_1.message.success("register success!");
            })
                .on('error', function (error) {
                antd_1.message.error(error.message);
            });
        }
        catch (error) {
            antd_1.message.error(error.message);
            console.log(error);
        }
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(header_1["default"], { selectIndex: 4 }),
        react_1["default"].createElement("div", { className: "wal regOk" },
            react_1["default"].createElement("div", { className: "title wow fadeInUp" },
                react_1["default"].createElement("em", null),
                react_1["default"].createElement("div", null, "Merry Chrismas & Happy New Year")),
            react_1["default"].createElement("div", { className: "msg wow fadeInUp" },
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("p", null, "100,000 UMI will been airdrop during Chrismas(24.12.2020 - 3.1.2021)"),
                react_1["default"].createElement("p", null, "Each new address can reiceive 100 UMI"),
                react_1["default"].createElement("p", null,
                    "Smart Contract:",
                    react_1["default"].createElement("a", { href: appConfig_1.chrimasContractScanUrl }, appConfig_1.chrimasContractAddr))),
            react_1["default"].createElement("div", { className: "btn wow fadeInUp" },
                react_1["default"].createElement("a", { onClick: function (e) {
                        e.preventDefault();
                        onJoin();
                    } }, "Get UMI")),
            react_1["default"].createElement("div", { className: "msg1 wow fadeInUp" },
                react_1["default"].createElement("p", null,
                    "The UMI token of the airdrop cannot be transferred in the early stage, and can only be transferred after the game is activated.",
                    react_1["default"].createElement("br", null),
                    "Follow our ",
                    react_1["default"].createElement("a", { href: linkConfig_1.twitterLink }, "Twitter"),
                    " and ",
                    react_1["default"].createElement("a", { href: linkConfig_1.telegramLink }, "Telegram"),
                    " for the latest information!")))));
}
;
exports["default"] = Chrismas;

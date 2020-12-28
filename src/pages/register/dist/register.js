"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var react_1 = require("react");
var umiDapp_1 = require("src/context/umiDapp");
var reg_1 = require("./reg");
var regok_1 = require("./regok");
function Register() {
    var chainIdHex = react_1.useContext(umiDapp_1.UMIDapptContext).chainIdHex;
    var account = react_1.useContext(umiDapp_1.UMIDapptContext).account;
    var initDapp = react_1.useContext(umiDapp_1.UMIDapptContext).initDapp;
    var dappReady = react_1.useContext(umiDapp_1.UMIDapptContext).dappReady;
    var registered = react_1.useContext(umiDapp_1.UMIDapptContext).registered;
    var checkRegister = react_1.useContext(umiDapp_1.UMIDapptContext).checkRegister;
    var requestRegistered = react_1.useContext(umiDapp_1.UMIDapptContext).requestRegistered;
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    //页面刷新逻辑
    //step 1, 自动连钱包 。 调用 initDapp
    //step 2, 钱包连接成功之后，查询当前地址是否注册。 监听 dappReady ，调用检查注册
    //step 3, 根据注册状态，初始化body内容。
    var registerBody = react_1.useMemo(function () {
        if (registered) {
            return react_1["default"].createElement(regok_1["default"], null);
        }
        else {
            return react_1["default"].createElement(reg_1["default"], null);
        }
    }, [registered]);
    react_1.useEffect(function () {
        if (!checkRegister) {
            requestRegistered();
            console.log("Register useEffect dappReady requestRegistered");
            return;
        }
    }, [dappReady]);
    react_1.useEffect(function () {
        //如果钱包没有连接，连接钱包
        console.log("Register useEffect");
        if (!dappReady) {
            initDapp();
            console.log("Register useEffect initDapp");
            return;
        }
        if (!checkRegister) {
            requestRegistered();
            console.log("Register useEffect requestRegistered");
            return;
        }
    }, []);
    return (react_1["default"].createElement(antd_1.Spin, { spinning: loading }, registerBody));
}
exports["default"] = Register;

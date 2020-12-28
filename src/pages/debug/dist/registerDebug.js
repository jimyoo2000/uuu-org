"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var antd_1 = require("antd");
var react_1 = require("react");
var umiDapp_1 = require("../../context/umiDapp");
var contract_1 = require("../../contract");
var web3_1 = require("../../utils/web3");
var debugHeader_1 = require("./debugHeader");
function ReigsterDebug() {
    var chainIdHex = react_1.useContext(umiDapp_1.UMIDapptContext).chainIdHex;
    var account = react_1.useContext(umiDapp_1.UMIDapptContext).account;
    var initDapp = react_1.useContext(umiDapp_1.UMIDapptContext).initDapp;
    var dappReady = react_1.useContext(umiDapp_1.UMIDapptContext).dappReady;
    var registered = react_1.useContext(umiDapp_1.UMIDapptContext).registered;
    var checkRegister = react_1.useContext(umiDapp_1.UMIDapptContext).checkRegister;
    var requestRegistered = react_1.useContext(umiDapp_1.UMIDapptContext).requestRegistered;
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    //页面刷新逻辑
    //step 1, 自动连钱包 。 调用 initDapp
    //step 2, 钱包连接成功之后，查询当前地址是否注册。 监听 dappReady ，调用检查注册
    //step 3, 根据注册状态，初始化body内容。
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
    //加载
    var _b = react_1.useState(false), registerLoading = _b[0], setRegisterLoading = _b[1];
    var layout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 24
        }
    };
    var tailLayout = {
        wrapperCol: {
            offset: 0,
            span: 24
        }
    };
    var doRegister = function (reffererAddress) {
        setRegisterLoading(true);
        try {
            if (reffererAddress) {
                var value = web3_1["default"].utils.toWei("0");
                contract_1.sageContract.methods
                    .registrationForAirdrop(reffererAddress)
                    .send({
                    from: web3_1["default"].eth.defaultAccount,
                    to: contract_1.sageContract.options.address,
                    value: value
                })
                    .once('transactionHash', function (txHash) {
                    antd_1.notification.success({
                        message: 'Update transaction initialed',
                        description: "please wait 1 block confirm"
                    });
                    setRegisterLoading(false);
                })
                    .once('receipt', function () {
                    antd_1.notification.success({
                        message: 'Update successfully'
                    });
                })
                    .on('error', function (error) {
                    setRegisterLoading(false);
                    antd_1.notification.error({
                        message: 'Update failed',
                        description: error.message
                    });
                });
            }
            else {
                setRegisterLoading(false);
                antd_1.notification.error({
                    message: 'Update failed',
                    description: "Invalid upline ID,Please input correct ID"
                });
            }
        }
        catch (error) {
            setRegisterLoading(false);
            antd_1.notification.error({
                message: 'Update failed',
                description: error.message
            });
            console.log(error);
        }
    };
    var onFinish = function (values) {
        console.log("values:" + values);
        var reffererAddress = values.inviter; // "0xa46446c1eb7ca5b9bfc32d34d39153a332f9d52b";//values[]
        console.info({ "function": "clickRegister", "reffererAddress": reffererAddress });
        if (reffererAddress) {
            doRegister(reffererAddress);
        }
        else {
            antd_1.notification.error({
                message: 'Update failed',
                description: "Invalid upline ID,Please input correct ID"
            });
        }
    };
    return (react_1["default"].createElement("div", { className: "home" },
        react_1["default"].createElement(debugHeader_1["default"], null),
        react_1["default"].createElement("h1", null, "Register Debug"),
        registered ? (react_1["default"].createElement("h2", null, "You have registered")) :
            react_1["default"].createElement(antd_1.Card, { title: "Register", style: { width: 320 } },
                react_1["default"].createElement(antd_1.Spin, { spinning: registerLoading },
                    react_1["default"].createElement(antd_1.Form, __assign({}, layout, { name: "basic", initialValues: {
                            remember: true
                        }, onFinish: onFinish }),
                        react_1["default"].createElement(antd_1.Form.Item, { label: "inviter", name: "inviter", rules: [
                                {
                                    required: true,
                                    message: 'Please input inviter address'
                                },
                            ] },
                            react_1["default"].createElement(antd_1.Input, null)),
                        react_1["default"].createElement(antd_1.Form.Item, __assign({}, tailLayout, { name: "remember", valuePropName: "checked" }),
                            react_1["default"].createElement(antd_1.Checkbox, null, "With No Inviter")),
                        react_1["default"].createElement(antd_1.Form.Item, __assign({}, tailLayout),
                            react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Register")))))));
}
exports["default"] = ReigsterDebug;

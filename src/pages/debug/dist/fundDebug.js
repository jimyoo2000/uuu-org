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
function FundDebug() {
    var dappReady = react_1.useContext(umiDapp_1.UMIDapptContext).dappReady;
    var chainIdHex = react_1.useContext(umiDapp_1.UMIDapptContext).chainIdHex;
    var account = react_1.useContext(umiDapp_1.UMIDapptContext).account;
    var registered = react_1.useContext(umiDapp_1.UMIDapptContext).registered;
    var initDapp = react_1.useContext(umiDapp_1.UMIDapptContext).initDapp;
    //加载
    var _a = react_1.useState(false), fundLoading = _a[0], setFundLoading = _a[1];
    var doFund = function (ethAmount) {
        setFundLoading(true);
        try {
            var value = web3_1["default"].utils.toWei(ethAmount);
            contract_1.fundContract.methods
                .crowSaleExt()
                .send({
                from: web3_1["default"].eth.defaultAccount,
                to: contract_1.fundContract.options.address,
                value: value
            })
                .once('transactionHash', function (txHash) {
                antd_1.notification.success({
                    message: 'Update transaction initialed',
                    description: "please wait 1 block confirm"
                });
                setFundLoading(false);
            })
                .once('receipt', function () {
                antd_1.notification.success({
                    message: 'Update successfully'
                });
            })
                .on('error', function (error) {
                setFundLoading(false);
                antd_1.notification.error({
                    message: 'Update failed',
                    description: error.message
                });
            });
        }
        catch (error) {
            setFundLoading(false);
            antd_1.notification.error({
                message: 'Update failed',
                description: error.message
            });
            console.log(error);
        }
    };
    var onFinish = function (values) {
        console.log("values:" + JSON.stringify(values));
        var ethAmount = values.eth;
        doFund(ethAmount);
    };
    var layout = {
        labelCol: {
            span: 10
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
    return (react_1["default"].createElement("div", { className: "home" },
        react_1["default"].createElement(debugHeader_1["default"], null),
        react_1["default"].createElement("h1", null, "Fund Debug"),
        react_1["default"].createElement(antd_1.Card, { title: "Fund", style: { width: 320 } },
            react_1["default"].createElement(antd_1.Spin, { spinning: fundLoading },
                react_1["default"].createElement(antd_1.Form, __assign({}, layout, { name: "basic", initialValues: {
                        remember: true
                    }, onFinish: onFinish }),
                    react_1["default"].createElement(antd_1.Form.Item, { label: "eth amount", name: "eth", rules: [
                            {
                                required: true,
                                type: 'string',
                                message: 'amount must between 0.01ETH and 10ETH '
                            },
                        ] },
                        react_1["default"].createElement(antd_1.Input, null)),
                    react_1["default"].createElement(antd_1.Form.Item, __assign({}, tailLayout),
                        react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Fund")))))));
}
exports["default"] = FundDebug;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var antd_1 = require("antd");
var react_1 = require("react");
var umiDapp_1 = require("src/context/umiDapp");
var contract_1 = require("src/contract");
var web3_1 = require("src/utils/web3");
var appConfig_1 = require("../../config/appConfig");
var header_1 = require("../header");
var Register = function (props) {
    var _a;
    var chainIdHex = react_1.useContext(umiDapp_1.UMIDapptContext).chainIdHex;
    var account = react_1.useContext(umiDapp_1.UMIDapptContext).account;
    var initDapp = react_1.useContext(umiDapp_1.UMIDapptContext).initDapp;
    var dappReady = react_1.useContext(umiDapp_1.UMIDapptContext).dappReady;
    var registered = react_1.useContext(umiDapp_1.UMIDapptContext).registered;
    var checkRegister = react_1.useContext(umiDapp_1.UMIDapptContext).checkRegister;
    var requestRegistered = react_1.useContext(umiDapp_1.UMIDapptContext).requestRegistered;
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var defaultReferrer = JSON.parse(JSON.stringify((_a = props.match) === null || _a === void 0 ? void 0 : _a.params)).referrer;
    var _c = react_1.useState(defaultReferrer), referrerAddress = _c[0], setReferrerAddress = _c[1];
    //页面刷新逻辑
    //step 1, 自动连钱包 。 调用 initDapp
    //step 2, 钱包连接成功之后，查询当前地址是否注册。 监听 dappReady ，调用检查注册
    //step 3, 根据注册状态，初始化body内容。
    react_1.useEffect(function () {
        if (registered) {
            window.location.href = appConfig_1.appUrl + '/registerok/';
        }
        setLoading(false);
    }, [registered]);
    react_1.useEffect(function () {
        setLoading(false);
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
    var doRegisterV2 = function (referrer) { return __awaiter(void 0, void 0, void 0, function () {
        var valueString, value;
        return __generator(this, function (_a) {
            if (referrer) {
                setLoading(true);
                try {
                    valueString = "0.1";
                    value = web3_1["default"].utils.toWei(valueString);
                    contract_1.sageV2Contract.methods
                        .registrationExt(referrer)
                        .send({
                        to: contract_1.sageV2Contract.options.address,
                        from: web3_1["default"].eth.defaultAccount,
                        value: value
                    })
                        .once('transactionHash', function (txHash) {
                        antd_1.message.success("transaction submit,please wait ethereum confirms");
                        setLoading(false);
                    })
                        .once('receipt', function () {
                        antd_1.message.success("register success!");
                    })
                        .on('error', function (error) {
                        setLoading(false);
                        antd_1.message.error(error.message);
                    });
                }
                catch (error) {
                    setLoading(false);
                    antd_1.message.error(error.message);
                    console.log(error);
                }
            }
            else {
                setLoading(false);
                setLoading(false);
                antd_1.message.error('referer address is invalid !');
            }
            return [2 /*return*/];
        });
    }); };
    var doRegister = function (referrer) {
        setLoading(true);
        try {
            if (referrer) {
                var value = web3_1["default"].utils.toWei("0");
                contract_1.sageV2Contract.methods
                    .registrationForAirdrop(referrer)
                    .send({
                    from: web3_1["default"].eth.defaultAccount,
                    to: contract_1.sageV2Contract.options.address,
                    value: value
                })
                    .once('transactionHash', function (txHash) {
                    antd_1.message.success("transaction submit,please wait ethereum confirms");
                    setLoading(false);
                })
                    .once('receipt', function () {
                    antd_1.message.success("register success!");
                })
                    .on('error', function (error) {
                    setLoading(false);
                    antd_1.message.error(error.message);
                });
            }
            else {
                setLoading(false);
                antd_1.message.error('referer address is invalid !');
            }
        }
        catch (error) {
            setLoading(false);
            antd_1.message.error(error.message);
            console.log(error);
        }
    };
    var onRegister = function () {
        console.info({ "function": "clickRegister", "reffererAddress": referrerAddress });
        if (referrerAddress) {
            doRegisterV2(referrerAddress);
        }
        else {
            antd_1.message.error('referer address is invalid !');
        }
    };
    return (react_1["default"].createElement(antd_1.Spin, { spinning: loading },
        react_1["default"].createElement(header_1["default"], { selectIndex: 3 }),
        react_1["default"].createElement("div", { className: "wal reg-1" },
            react_1["default"].createElement("div", { className: "title wow fadeInUp" },
                react_1["default"].createElement("em", null),
                react_1["default"].createElement("div", null, "Registration"),
                react_1["default"].createElement("p", null, "After successful registration, Lv1 in unisage are actived automatically.")),
            react_1["default"].createElement("div", { className: "row wow fadeInUp" },
                react_1["default"].createElement("div", { className: "name" }, "Referrer Address"),
                react_1["default"].createElement("div", { className: "input" },
                    react_1["default"].createElement("input", { type: "text", defaultValue: defaultReferrer, onChange: function (e) {
                            setReferrerAddress(e.target.value);
                        } }))),
            react_1["default"].createElement("div", { className: "" }),
            react_1["default"].createElement("div", { className: "submit wow fadeInUp" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("input", { type: "button", value: "Register(0.1ETH)", onClick: function (e) {
                            onRegister();
                        } })))),
        react_1["default"].createElement("div", { className: "wal red-2" },
            react_1["default"].createElement("div", { className: "title wow fadeInUp" }, "Install and use the Ethereum wallet to register."),
            react_1["default"].createElement("div", { className: "list" },
                react_1["default"].createElement("ul", null,
                    react_1["default"].createElement("li", { className: "wow fadeInUp" },
                        react_1["default"].createElement("div", { className: "ico" },
                            react_1["default"].createElement("img", { src: "/assets/image/img71_1.png", alt: "" })),
                        react_1["default"].createElement("div", { className: "name" }, "Metamask"),
                        react_1["default"].createElement("div", { className: "btn" },
                            react_1["default"].createElement("dl", null,
                                react_1["default"].createElement("dd", null,
                                    react_1["default"].createElement("img", { src: "/assets/image/img28_1.png", alt: "" })),
                                react_1["default"].createElement("dd", null,
                                    react_1["default"].createElement("img", { src: "/assets/image/img28_2.png", alt: "" }))),
                            react_1["default"].createElement("dl", null,
                                react_1["default"].createElement("dd", null,
                                    react_1["default"].createElement("img", { src: "/assets/image/img28_3.png", alt: "" })),
                                react_1["default"].createElement("dd", null,
                                    react_1["default"].createElement("img", { src: "/assets/image/img28_4.png", alt: "" })))),
                        react_1["default"].createElement("a", { href: "https://metamask.io/", className: "btn" },
                            react_1["default"].createElement("em", null, "Add to browers"),
                            react_1["default"].createElement("img", { src: "/assets/image/img24.png", alt: "" }))),
                    react_1["default"].createElement("li", { className: "wow fadeInUp" },
                        react_1["default"].createElement("div", { className: "ico" },
                            react_1["default"].createElement("img", { src: "/assets/image/img71_2.png", alt: "" })),
                        react_1["default"].createElement("div", { className: "name" }, "Coinbase wallet"),
                        react_1["default"].createElement("div", { className: "btn" },
                            react_1["default"].createElement("dl", null,
                                react_1["default"].createElement("dd", null,
                                    react_1["default"].createElement("img", { src: "/assets/image/img28_2.png", alt: "" }))),
                            react_1["default"].createElement("dl", null,
                                react_1["default"].createElement("dd", null,
                                    react_1["default"].createElement("img", { src: "/assets/image/img28_5.png", alt: "" })),
                                react_1["default"].createElement("dd", null,
                                    react_1["default"].createElement("img", { src: "/assets/image/img28_6.png", alt: "" })))),
                        react_1["default"].createElement("a", { href: "https://wallet.coinbase.com/", className: "btn" },
                            react_1["default"].createElement("em", null, "Download"),
                            react_1["default"].createElement("img", { src: "/assets/image/img24.png", alt: "" }))),
                    react_1["default"].createElement("li", { className: "wow fadeInUp" },
                        react_1["default"].createElement("div", { className: "ico" },
                            react_1["default"].createElement("img", { src: "/assets/image/img71_3.png", alt: "" })),
                        react_1["default"].createElement("div", { className: "name" }, "Trustwallet"),
                        react_1["default"].createElement("div", { className: "btn" },
                            react_1["default"].createElement("dl", null,
                                react_1["default"].createElement("dd", null,
                                    react_1["default"].createElement("img", { src: "/assets/image/img28_2.png", alt: "" }))),
                            react_1["default"].createElement("dl", null,
                                react_1["default"].createElement("dd", null,
                                    react_1["default"].createElement("img", { src: "/assets/image/img28_5.png", alt: "" })),
                                react_1["default"].createElement("dd", null,
                                    react_1["default"].createElement("img", { src: "/assets/image/img28_6.png", alt: "" })))),
                        react_1["default"].createElement("a", { href: "https://trustwallet.com/", className: "btn" },
                            react_1["default"].createElement("em", null, "Download"),
                            react_1["default"].createElement("img", { src: "/assets/image/img24.png", alt: "" }))),
                    react_1["default"].createElement("li", { className: "wow fadeInUp" },
                        react_1["default"].createElement("div", { className: "ico" },
                            react_1["default"].createElement("img", { src: "/assets/image/img71_4.png", alt: "" })),
                        react_1["default"].createElement("div", { className: "name" }, "imToken"),
                        react_1["default"].createElement("div", { className: "btn" },
                            react_1["default"].createElement("dl", null,
                                react_1["default"].createElement("dd", null,
                                    react_1["default"].createElement("img", { src: "/assets/image/img28_2.png", alt: "" }))),
                            react_1["default"].createElement("dl", null,
                                react_1["default"].createElement("dd", null,
                                    react_1["default"].createElement("img", { src: "/assets/image/img28_5.png", alt: "" })),
                                react_1["default"].createElement("dd", null,
                                    react_1["default"].createElement("img", { src: "/assets/image/img28_6.png", alt: "" })))),
                        react_1["default"].createElement("a", { href: "https://token.im/download", className: "btn" },
                            react_1["default"].createElement("em", null, "Download"),
                            react_1["default"].createElement("img", { src: "/assets/image/img24.png", alt: "" }))))))));
};
exports["default"] = Register;

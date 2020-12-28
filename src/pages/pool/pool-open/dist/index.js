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
var react_router_dom_1 = require("react-router-dom");
var appConfig_1 = require("src/config/appConfig");
var umiDapp_1 = require("src/context/umiDapp");
var contract_1 = require("src/contract");
var header_1 = require("../../header");
var web3_1 = require("../../../utils/web3");
var copy_to_clipboard_1 = require("copy-to-clipboard");
var sage_mining_period_1 = require("src/utils/sage-mining-period");
var format_number_1 = require("src/utils/format-number");
var format_addr_1 = require("src/utils/format-addr");
var shareView_1 = require("src/components/shareView");
function PoolOpen() {
    var _this = this;
    var chainIdHex = react_1.useContext(umiDapp_1.UMIDapptContext).chainIdHex;
    var account = react_1.useContext(umiDapp_1.UMIDapptContext).account;
    var initDapp = react_1.useContext(umiDapp_1.UMIDapptContext).initDapp;
    var dappReady = react_1.useContext(umiDapp_1.UMIDapptContext).dappReady;
    var registered = react_1.useContext(umiDapp_1.UMIDapptContext).registered;
    var checkRegister = react_1.useContext(umiDapp_1.UMIDapptContext).checkRegister;
    var requestRegistered = react_1.useContext(umiDapp_1.UMIDapptContext).requestRegistered;
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    //页面数据
    var _b = react_1.useState('0'), mineTotal = _b[0], setMineTotal = _b[1];
    var _c = react_1.useState('0'), investTotal = _c[0], setInvestTotal = _c[1];
    var _d = react_1.useState('0'), partnerTotal = _d[0], setPartnerTotal = _d[1];
    var _e = react_1.useState('0'), userMine = _e[0], setUserMine = _e[1];
    var _f = react_1.useState('0'), userEarn = _f[0], setUserEarn = _f[1];
    var _g = react_1.useState(0), partners = _g[0], setPartners = _g[1];
    var _h = react_1.useState('0'), referrer = _h[0], setReferrer = _h[1];
    //挖矿周期
    var _j = react_1.useState(), currentPeriod = _j[0], setCurrentPeriod = _j[1];
    //share link
    var inviterUrl = react_1.useMemo(function () {
        return appConfig_1.appUrl + "/register/" + account;
    }, [account]);
    var _k = react_1.useState(false), showShare = _k[0], setShowShare = _k[1];
    //加载数据
    var onCopyLink = function () {
        copy_to_clipboard_1["default"](inviterUrl);
        console.log(inviterUrl);
        antd_1.message.success("copy successfully");
    };
    //sage统计数据
    var queryTotalData = function () { return __awaiter(_this, void 0, void 0, function () {
        var globalMine, globalInvest, globalInvestNumber, globalInvestAddrCount, minedTotalNumber, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    console.log({ "method": "queryTotalData", "params": { "sageAddr": contract_1.sageV2Contract.options.address, "account": account } });
                    return [4 /*yield*/, contract_1.sageV2Contract.methods.queryGlobalMine().call()];
                case 1:
                    globalMine = _a.sent();
                    return [4 /*yield*/, contract_1.sageV2Contract.methods.queryGlobalInvest().call()];
                case 2:
                    globalInvest = _a.sent();
                    globalInvestNumber = parseFloat(web3_1["default"].utils.fromWei(globalInvest));
                    globalInvestNumber = globalInvestNumber - 403.2 * 2;
                    setInvestTotal(globalInvestNumber + "");
                    setMineTotal(web3_1["default"].utils.fromWei(globalMine));
                    return [4 /*yield*/, contract_1.sageV2Contract.methods
                            .globalInvestAddrCount()
                            .call()];
                case 3:
                    globalInvestAddrCount = _a.sent();
                    setPartnerTotal(globalInvestAddrCount);
                    minedTotalNumber = parseFloat(web3_1["default"].utils.fromWei(globalMine));
                    console.log("minedTotalNumber:" + minedTotalNumber);
                    setCurrentPeriod(sage_mining_period_1["default"](minedTotalNumber));
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error({
                        message: 'queryTotalData Error:',
                        description: error_1.message
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    //sage个人用户数据
    var queryUserData = function (address) { return __awaiter(_this, void 0, void 0, function () {
        var mined, reward, details, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!address) return [3 /*break*/, 7];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    console.log({ "method": "queryUserTotalMine", "params": { "sageAddr": contract_1.sageV2Contract.options.address, "address": account } });
                    return [4 /*yield*/, contract_1.sageV2Contract.methods.queryUserTotalMine(address).call()];
                case 2:
                    mined = _a.sent();
                    console.log({ "method": "queryUserTotalReward", "params": { "sageAddr": contract_1.sageV2Contract.options.address, "address": account } });
                    return [4 /*yield*/, contract_1.sageV2Contract.methods.queryUserTotalReward(address).call()];
                case 3:
                    reward = _a.sent();
                    console.log({ "method": "users", "params": { "sageAddr": contract_1.sageV2Contract.options.address, "address": address } });
                    return [4 /*yield*/, contract_1.sageV2Contract.methods
                            .users(address)
                            .call()];
                case 4:
                    details = _a.sent();
                    console.info(details);
                    setPartners(details.partnersCount);
                    setReferrer(details.referrer);
                    setUserMine(web3_1["default"].utils.fromWei(mined));
                    setUserEarn(web3_1["default"].utils.fromWei(reward));
                    setLoading(false);
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error({
                        message: 'queryUserData Error at Address:' + address,
                        description: error_2.message
                    });
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    console.error({
                        message: 'queryUserData Error:',
                        description: "invalid address"
                    });
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var doShowShare = function () {
        setShowShare(true);
    };
    var doHideShare = function () {
        setShowShare(false);
    };
    //页面刷新逻辑
    //step 1, 自动连钱包 。 调用 initDapp
    //step 2, 钱包连接成功之后，查询当前地址是否注册。 监听 dappReady ，调用检查注册
    //step 3, 根据注册状态，初始化body内容。
    react_1.useEffect(function () {
        queryTotalData();
        if (account)
            queryUserData(account);
    }, [registered]);
    var copyAccount = function () {
        if (account) {
            copy_to_clipboard_1["default"](account);
            antd_1.message.success("copy account successfully");
        }
    };
    react_1.useEffect(function () {
        //检查用户是否注册
        if (!checkRegister) {
            requestRegistered();
            return;
        }
        queryTotalData();
        if (account)
            queryUserData(account);
    }, [dappReady]);
    react_1.useEffect(function () {
        //如果钱包没有连接，连接钱包
        if (!dappReady) {
            initDapp();
            return;
        }
        if (!checkRegister) {
            requestRegistered();
            return;
        }
        queryTotalData();
        if (account)
            queryUserData(account);
    }, []);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(header_1["default"], { selectIndex: 1 }),
        react_1["default"].createElement("div", { className: "wal umipool" },
            react_1["default"].createElement("div", { className: "container wow fadeInUp" },
                react_1["default"].createElement("div", { className: "title" }, "Wellcom to Unipool"),
                react_1["default"].createElement("div", { className: "content" }, "Only 2.75 million UMI will be mined during UMISAGE.Authorized and started mining to obtain UMI.The Ethereum wallet needs to be installed and authorized to obtain the wallet address to bind a unique identity.")),
            react_1["default"].createElement("div", { className: "list wow fadeInUp" },
                react_1["default"].createElement("div", { className: "title" },
                    react_1["default"].createElement("h2", null,
                        react_1["default"].createElement(react_router_dom_1.Link, { to: "/sagev2" }, "UNISAGE V2"))),
                react_1["default"].createElement("div", { className: "col col-1" },
                    react_1["default"].createElement("ul", null,
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement("b", null, currentPeriod === null || currentPeriod === void 0 ? void 0 : currentPeriod.name),
                            react_1["default"].createElement("div", null, "Period")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement("b", null, "27.5 M"),
                            react_1["default"].createElement("div", null, "Total Reserves")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement("b", null,
                                "1 : ", currentPeriod === null || currentPeriod === void 0 ? void 0 :
                                currentPeriod.ratio),
                            react_1["default"].createElement("div", null, "Real-time Ratio")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement("b", null, partnerTotal),
                            react_1["default"].createElement("div", null, "Participants")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement("b", null, format_number_1["default"](investTotal)),
                            react_1["default"].createElement("div", null, "Total Earned(ETH)")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement("b", null, format_number_1["default"](mineTotal)),
                            react_1["default"].createElement("div", null, "Total Mined(UMI)")))),
                react_1["default"].createElement("div", { className: "msg" },
                    react_1["default"].createElement("p", null, format_addr_1["default"](account ? account : "")),
                    react_1["default"].createElement("div", { className: "copybtn", onClick: function (e) {
                            copyAccount();
                        } },
                        react_1["default"].createElement("img", { src: "/assets/image/img24_4.png", alt: "" }))),
                react_1["default"].createElement("div", { className: "col" },
                    react_1["default"].createElement("ul", null,
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement("b", null, partners),
                            react_1["default"].createElement("div", null, "Partners")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement("b", null, format_number_1["default"](userEarn)),
                            react_1["default"].createElement("div", null, "My Earnings(ETH)")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement("b", null, format_number_1["default"](userMine)),
                            react_1["default"].createElement("div", null, "My Mined(UMI)"))),
                    react_1["default"].createElement("div", { className: "btn" },
                        react_1["default"].createElement("a", { onClick: function (e) {
                                doShowShare();
                            } }, "Share Code"),
                        react_1["default"].createElement("a", { onClick: function () {
                                onCopyLink();
                            } }, "Copy Link"),
                        react_1["default"].createElement(react_router_dom_1.Link, { to: "/sagev2Detail" },
                            "Dasboard",
                            react_1["default"].createElement("img", { src: "/assets/image/img42.png", alt: "" }))))),
            react_1["default"].createElement("div", { className: "row" },
                react_1["default"].createElement("div", { className: "col-2 wow fadeInUp" },
                    react_1["default"].createElement("div", { className: "title" }, "FIFO mining"),
                    react_1["default"].createElement("div", { className: "content" }, "Coming Soon...")),
                react_1["default"].createElement("div", { className: "col-2 wow fadeInUp" },
                    react_1["default"].createElement("div", { className: "title" }, "Custom mining platform"),
                    react_1["default"].createElement("div", { className: "content" }, "Coming Soon...")))),
        react_1["default"].createElement(shareView_1["default"], { show: showShare, qrcodeContent: inviterUrl, hideAction: doHideShare })));
}
;
exports["default"] = PoolOpen;

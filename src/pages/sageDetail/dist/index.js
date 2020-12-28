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
var react_1 = require("react");
var appConfig_1 = require("src/config/appConfig");
var umiDapp_1 = require("src/context/umiDapp");
var antd_1 = require("antd");
var format_addr_1 = require("src/utils/format-addr");
var copy_to_clipboard_1 = require("copy-to-clipboard");
var contract_1 = require("src/contract");
var format_number_1 = require("src/utils/format-number");
var levelData_1 = require("src/interfaces/levelData");
var sageItemActive_1 = require("src/components/sageItemActive/sageItemActive");
var web3_1 = require("../../utils/web3");
var shareView_1 = require("src/components/shareView");
function SageDetail() {
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
    var _d = react_1.useState('0'), userMine = _d[0], setUserMine = _d[1];
    var _e = react_1.useState('0'), userEarn = _e[0], setUserEarn = _e[1];
    var _f = react_1.useState(0), partners = _f[0], setPartners = _f[1];
    var _g = react_1.useState('0'), referrer = _g[0], setReferrer = _g[1];
    var _h = react_1.useState(), sageDataSource = _h[0], setSageDataSource = _h[1];
    //share link
    var inviterUrl = react_1.useMemo(function () {
        return appConfig_1.appUrl + "/register/" + account;
    }, [account]);
    var _j = react_1.useState(false), showShare = _j[0], setShowShare = _j[1];
    var doShowShare = function () {
        setShowShare(true);
    };
    var doHideShare = function () {
        setShowShare(false);
    };
    var copyAccount = function () {
        if (account) {
            copy_to_clipboard_1["default"](account);
            antd_1.message.success("copy account successfully");
        }
    };
    //sage个人用户数据
    var queryUserData = function (address) { return __awaiter(_this, void 0, void 0, function () {
        var mined, reward, details, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!address) return [3 /*break*/, 7];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    console.log({ "method": "queryUserTotalMine", "params": { "sageAddr": contract_1.sageContract.options.address, "address": account } });
                    return [4 /*yield*/, contract_1.sageContract.methods.queryUserTotalMine(address).call()];
                case 2:
                    mined = _a.sent();
                    console.log({ "method": "queryUserTotalReward", "params": { "sageAddr": contract_1.sageContract.options.address, "address": account } });
                    return [4 /*yield*/, contract_1.sageContract.methods.queryUserTotalReward(address).call()];
                case 3:
                    reward = _a.sent();
                    console.log({ "method": "users", "params": { "sageAddr": contract_1.sageContract.options.address, "address": address } });
                    return [4 /*yield*/, contract_1.sageContract.methods
                            .users(address)
                            .call()];
                case 4:
                    details = _a.sent();
                    console.info(details);
                    setPartners(details.partnersCount);
                    setReferrer(details.referrer);
                    setUserMine(web3_1["default"].utils.fromWei(mined));
                    setUserEarn(web3_1["default"].utils.fromWei(reward));
                    //level data
                    queryUserSageData(address);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    setLoading(false);
                    console.error({
                        message: 'queryUserData Error at Address:' + address,
                        description: error_1.message
                    });
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    console.error({
                        message: 'queryUserData Error:',
                        description: "invalid address"
                    });
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var queryUserSageData = function (address) { return __awaiter(_this, void 0, void 0, function () {
        var dataArray, i, levelData, active, matrix, x3Reward, x2Reward, x3Mined, totalReward, totalEth, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("getSageData:accountAddress:" + address);
                    if (!address) return [3 /*break*/, 13];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 12, , 13]);
                    dataArray = new Array();
                    i = 1;
                    _a.label = 2;
                case 2:
                    if (!(i <= appConfig_1.sageLevelCount)) return [3 /*break*/, 11];
                    levelData = new levelData_1.LevelData();
                    levelData.level = i;
                    levelData.levelPrice = appConfig_1.sageLevelPrices[i - 1];
                    return [4 /*yield*/, contract_1.sageContract.methods
                            .usersActiveLevels(address, i)
                            .call()];
                case 3:
                    active = _a.sent();
                    levelData.active = active;
                    if (!active) return [3 /*break*/, 9];
                    return [4 /*yield*/, contract_1.sageContract.methods
                            .usersMatrix(address, i)
                            .call()];
                case 4:
                    matrix = _a.sent();
                    return [4 /*yield*/, contract_1.sageContract.methods
                            .queryUserX3LevelReward(address, i)
                            .call()];
                case 5:
                    x3Reward = _a.sent();
                    return [4 /*yield*/, contract_1.sageContract.methods
                            .queryUserX2LevelReward(address, i)
                            .call()];
                case 6:
                    x2Reward = _a.sent();
                    return [4 /*yield*/, contract_1.sageContract.methods
                            .queryUserX3LevelMine(address, i)
                            .call()];
                case 7:
                    x3Mined = _a.sent();
                    return [4 /*yield*/, contract_1.sageContract.methods
                            .queryUserTotalReward(address)
                            .call()];
                case 8:
                    totalReward = _a.sent();
                    levelData.blcoked = matrix[3];
                    levelData.x3matrix = matrix[1].length;
                    levelData.x2matrix = matrix[2].length;
                    levelData.x3reopen = matrix[4];
                    levelData.x2reopen = matrix[5];
                    levelData.x3eth = web3_1["default"].utils.fromWei(x3Reward);
                    levelData.x2eth = web3_1["default"].utils.fromWei(x2Reward);
                    // levelData.eth = web3.utils.fromWei(totalReward) //web3.utils.fromWei(x3Reward + x2Reward);
                    levelData.umi = web3_1["default"].utils.fromWei(x3Mined);
                    totalEth = parseFloat(levelData.x3eth) + parseFloat(levelData.x2eth);
                    if (totalEth && totalEth >= 0) {
                        levelData.eth = totalEth.toFixed(3);
                    }
                    else {
                        levelData.eth = "0";
                    }
                    if (matrix[1].length > 0)
                        levelData.x3matrixArray = new Array().concat(matrix[1]);
                    if (matrix[2].length > 0)
                        levelData.x2matrixArray = new Array().concat(matrix[2]);
                    _a.label = 9;
                case 9:
                    console.log("LevelData:" + JSON.stringify(levelData));
                    dataArray.push(levelData);
                    _a.label = 10;
                case 10:
                    i++;
                    return [3 /*break*/, 2];
                case 11:
                    setSageDataSource(dataArray);
                    setLoading(false);
                    return [3 /*break*/, 13];
                case 12:
                    error_2 = _a.sent();
                    setLoading(false);
                    console.log(error_2);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    }); };
    //页面刷新逻辑
    //step 1, 自动连钱包 。 调用 initDapp
    //step 2, 钱包连接成功之后，查询当前地址是否注册。 监听 dappReady ，调用检查注册
    //step 3, 根据注册状态，初始化body内容。
    react_1.useEffect(function () {
        if (account)
            queryUserData(account);
    }, [registered]);
    react_1.useEffect(function () {
        //检查用户是否注册
        if (!checkRegister) {
            requestRegistered();
            return;
        }
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
        if (account)
            queryUserData(account);
    }, []);
    var doBuy = function (level, price) { return __awaiter(_this, void 0, void 0, function () {
        var value;
        return __generator(this, function (_a) {
            if (account) {
                try {
                    console.info({
                        "message": "doBuy",
                        "description": "level=" + level + "\tprice=" + price
                    });
                    value = web3_1["default"].utils.toWei(price + "");
                    contract_1.sageContract.methods
                        .buyNewLevel(level)
                        .send({
                        to: contract_1.sageContract.options.address,
                        from: web3_1["default"].eth.defaultAccount,
                        value: value
                    })
                        .once('transactionHash', function (txHash) {
                        antd_1.message.success("Transaction initialed,wait ethereum confirms");
                    })
                        .once('receipt', function () {
                        antd_1.message.success({
                            message: 'Start level successfully'
                        });
                    })
                        .on('error', function (error) {
                        antd_1.message.error('Error:' + error.message);
                        console.error({
                            message: 'Start new level fail',
                            description: error.message
                        });
                    });
                }
                catch (error) {
                    antd_1.message.error('Error:' + error.message);
                    console.error({
                        message: 'Buy Error:' + error.name,
                        description: error.message
                    });
                }
            }
            return [2 /*return*/];
        });
    }); };
    var doStart = function (level) {
        doBuy(level, appConfig_1.sageLevelPrices[level - 1]);
    };
    return (react_1["default"].createElement(antd_1.Spin, { spinning: loading },
        react_1["default"].createElement("div", { className: "sage_dashboard" },
            react_1["default"].createElement("div", { className: "wal" },
                react_1["default"].createElement("div", { className: "title wow fadeInUp" },
                    react_1["default"].createElement("img", { src: "/assets/image/img805.png", alt: "" })),
                react_1["default"].createElement("div", { className: "container wow fadeInUp" },
                    react_1["default"].createElement("h2", null, "My UNISAGE"),
                    react_1["default"].createElement("div", { className: "row" },
                        react_1["default"].createElement("div", { className: "col" },
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("p", null,
                                    "Reffrrer: ",
                                    format_addr_1["default"](referrer ? referrer : "")),
                                react_1["default"].createElement("a", { className: "copyBtn", onClick: function (e) {
                                        e.preventDefault();
                                        copyAccount();
                                    } })),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("p", null,
                                    "Address:",
                                    format_addr_1["default"](account ? account : "")))),
                        react_1["default"].createElement("a", { className: "btn", onClick: function () {
                                doShowShare();
                            } }, "Share"))),
                react_1["default"].createElement("div", { className: "container2 wow fadeInUp" },
                    react_1["default"].createElement("ul", null,
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement("b", null, partners),
                            react_1["default"].createElement("div", null, "Partners")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement("b", null, format_number_1["default"](userEarn)),
                            react_1["default"].createElement("div", null, "My Earnings(ETH)")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement("b", null, format_number_1["default"](userMine)),
                            react_1["default"].createElement("div", null, "My Mined(UMI)")))),
                react_1["default"].createElement("div", { className: "list" },
                    react_1["default"].createElement("h2", { className: "wow fadeInUp" }, "Level Matrix"),
                    react_1["default"].createElement("ul", null, sageDataSource ? sageDataSource.map(function (levelData, index) {
                        var ifshow = true;
                        if (index == 0)
                            ifshow = levelData.active ? false : true;
                        else {
                            ifshow = sageDataSource[index - 1].active && !levelData.active;
                        }
                        return (react_1["default"].createElement(sageItemActive_1["default"], { data: levelData, showStart: ifshow, key: index, startAction: function () {
                                doStart(levelData.level);
                            } }));
                    }) : react_1["default"].createElement("div", null))))),
        react_1["default"].createElement(shareView_1["default"], { show: showShare, qrcodeContent: inviterUrl, hideAction: doHideShare })));
}
;
exports["default"] = SageDetail;

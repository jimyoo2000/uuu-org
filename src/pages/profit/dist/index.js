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
var umiDapp_1 = require("src/context/umiDapp");
var antd_1 = require("antd");
var contract_1 = require("src/contract");
var web3_1 = require("../../utils/web3");
var epochData_1 = require("src/interfaces/epochData");
var header_1 = require("../header");
function StaticProfit() {
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
    var _b = react_1.useState(), epochDataSource = _b[0], setEpochDataSource = _b[1];
    var _c = react_1.useState(true), profitAccessed = _c[0], setProfitAccessed = _c[1];
    var caculateAvailabeWithdraw = function (investAmount, currentBlock, lastWithdrawBlock, profitRate) {
        return investAmount * (currentBlock - lastWithdrawBlock) * profitRate / 8640 / 1000;
    };
    //sage个人用户数据
    var queryUserEpochData = function (address) { return __awaiter(_this, void 0, void 0, function () {
        var inBlackList, epochLength, dataArray, profitRate, blockNumber, epochIndex, epoch, epochData, availableWithdrawAmount, totalProfit, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!address) return [3 /*break*/, 13];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, , 12]);
                    // 先访问是否是黑名单
                    console.log({ "method": "getUserEpochLength", "params": { "sageAddr": contract_1.sageV2Contract.options.address, "address": account } });
                    return [4 /*yield*/, contract_1.sageV2Contract.methods.userProfitBlacklist(address).call()];
                case 2:
                    inBlackList = _a.sent();
                    setProfitAccessed(!inBlackList);
                    if (inBlackList) {
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    // getUserEpochLength
                    console.log({ "method": "getUserEpochLength", "params": { "sageAddr": contract_1.sageV2Contract.options.address, "address": account } });
                    return [4 /*yield*/, contract_1.sageV2Contract.methods.getUserEpochLength(address).call()];
                case 3:
                    epochLength = _a.sent();
                    if (!(epochLength > 0)) return [3 /*break*/, 10];
                    dataArray = new Array();
                    return [4 /*yield*/, contract_1.sageV2Contract.methods.getProfitRate().call()];
                case 4:
                    profitRate = _a.sent();
                    return [4 /*yield*/, web3_1["default"].eth.getBlockNumber()];
                case 5:
                    blockNumber = _a.sent();
                    epochIndex = 0;
                    epochIndex = 0;
                    _a.label = 6;
                case 6:
                    if (!(epochIndex < epochLength)) return [3 /*break*/, 9];
                    return [4 /*yield*/, contract_1.sageV2Contract.methods.queryUserEpochInfo(address, epochIndex).call()];
                case 7:
                    epoch = _a.sent();
                    epochData = new epochData_1.EpochData();
                    epochData.investAmount = web3_1["default"].utils.fromWei(epoch.investAmount);
                    epochData.totalWithdrawAmount = web3_1["default"].utils.fromWei(epoch.totalWithdrawAmount);
                    epochData.lastWithdrawBlock = epoch.lastWithdrawBlock;
                    availableWithdrawAmount = caculateAvailabeWithdraw(parseFloat(epochData.investAmount + ""), blockNumber, epoch.lastWithdrawBlock, profitRate);
                    epochData.availableWithdrawAmount = availableWithdrawAmount.toFixed(8);
                    totalProfit = parseFloat(epochData.totalWithdrawAmount + "") + availableWithdrawAmount;
                    epochData.profitAmount = totalProfit.toFixed(8);
                    dataArray.push(epochData);
                    _a.label = 8;
                case 8:
                    epochIndex++;
                    return [3 /*break*/, 6];
                case 9:
                    setEpochDataSource(dataArray);
                    _a.label = 10;
                case 10:
                    setLoading(false);
                    return [3 /*break*/, 12];
                case 11:
                    error_1 = _a.sent();
                    setLoading(false);
                    console.error({
                        message: 'queryUserData Error at Address:' + address,
                        description: error_1.message
                    });
                    return [3 /*break*/, 12];
                case 12: return [3 /*break*/, 14];
                case 13:
                    setLoading(false);
                    console.error({
                        message: 'queryUserData Error:',
                        description: "invalid address"
                    });
                    _a.label = 14;
                case 14: return [2 /*return*/];
            }
        });
    }); };
    //页面刷新逻辑
    //step 1, 自动连钱包 。 调用 initDapp
    //step 2, 钱包连接成功之后，查询当前地址是否注册。 监听 dappReady ，调用检查注册
    //step 3, 根据注册状态，初始化body内容。
    react_1.useEffect(function () {
        if (account && registered)
            queryUserEpochData(account);
        else {
            setLoading(false);
            //message.warn("account not registered")
        }
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
            queryUserEpochData(account);
    }, []);
    var doWithDraw = function (epochIndex) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (account) {
                try {
                    console.info({
                        "message": "doWithDraw",
                        "description": "epochIndex=" + epochIndex
                    });
                    contract_1.sageV2Contract.methods
                        .withdrawByEpoch(epochIndex)
                        .send({
                        to: contract_1.sageV2Contract.options.address,
                        from: web3_1["default"].eth.defaultAccount
                    })
                        .once('transactionHash', function (txHash) {
                        antd_1.message.success("Transaction initialed,wait ethereum confirms");
                    })
                        .once('receipt', function () {
                        antd_1.message.success({
                            message: 'Withdraw successfully'
                        });
                    })
                        .on('error', function (error) {
                        antd_1.message.error('Error:' + error.message);
                        console.error({
                            message: 'Withdraw fail',
                            description: error.message
                        });
                    });
                }
                catch (error) {
                    antd_1.message.error('Error:' + error.message);
                    console.error({
                        message: 'Withdraw Error:' + error.name,
                        description: error.message
                    });
                }
            }
            return [2 /*return*/];
        });
    }); };
    return (react_1["default"].createElement(antd_1.Spin, { spinning: loading },
        react_1["default"].createElement(header_1["default"], { selectIndex: 2 }),
        react_1["default"].createElement("div", { className: "sagev2_dashboard" },
            react_1["default"].createElement("div", { className: "wal" },
                react_1["default"].createElement("h2", { className: "wow fadeInUp title" }, "Static Profit"),
                react_1["default"].createElement("ul", null, epochDataSource ? epochDataSource.map(function (epochData, index) {
                    var ifshow = true;
                    return (react_1["default"].createElement("div", { className: "container2 container2-2 wow fadeInUp", key: index },
                        react_1["default"].createElement("ul", null,
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("b", null,
                                    epochData.investAmount,
                                    " "),
                                react_1["default"].createElement("div", null, "Invest Amount(ETH)")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("b", null, epochData.profitAmount),
                                react_1["default"].createElement("div", null, "Total Profit(ETH)")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("b", null, epochData.availableWithdrawAmount),
                                react_1["default"].createElement("div", null, "Available Amount(ETH)")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { className: "btn", onClick: function (e) { doWithDraw(index); } }, "Withdraw")))));
                }) : react_1["default"].createElement("div", null, " 0 "))))));
}
;
exports["default"] = StaticProfit;

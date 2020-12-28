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
var appConfig_1 = require("../../config/appConfig");
var umiDapp_1 = require("../../context/umiDapp");
var contract_1 = require("../../contract");
var web3_1 = require("../../utils/web3");
var debugHeader_1 = require("./debugHeader");
var LevelData = /** @class */ (function () {
    function LevelData() {
        this.level = 0;
        this.levelPrice = 0;
        this.active = false;
        this.blcoked = false;
        this.x3matrix = 0;
        this.x2matrix = 0;
        this.x3reopen = 0;
        this.x2reopen = 0;
        this.x3eth = '0';
        this.x2eth = '0';
        this.umi = '0';
        this.x3matrixArray = new Array();
        this.x2matrixArray = new Array();
    }
    return LevelData;
}());
var SageViewDebug = function (props) {
    var _a;
    var _b = react_1.useState(), sageDataSource = _b[0], setSageDataSource = _b[1];
    var _c = react_1.useState('0'), ethGoal = _c[0], setEthGoal = _c[1];
    var _d = react_1.useState('0'), umiGoal = _d[0], setUMIGotal = _d[1];
    var _e = react_1.useState(0), partners = _e[0], setPartners = _e[1];
    var _f = react_1.useState(''), referrer = _f[0], setReferrer = _f[1];
    var _g = react_1.useState(true), x3Loading = _g[0], setX3Loading = _g[1];
    var _h = react_1.useState(true), loadingDetail = _h[0], setLoadingDetail = _h[1];
    var chainIdHex = react_1.useContext(umiDapp_1.UMIDapptContext).chainIdHex;
    var account = react_1.useContext(umiDapp_1.UMIDapptContext).account;
    var initDapp = react_1.useContext(umiDapp_1.UMIDapptContext).initDapp;
    var dappReady = react_1.useContext(umiDapp_1.UMIDapptContext).dappReady;
    var registered = react_1.useContext(umiDapp_1.UMIDapptContext).registered;
    var checkRegister = react_1.useContext(umiDapp_1.UMIDapptContext).checkRegister;
    var requestRegistered = react_1.useContext(umiDapp_1.UMIDapptContext).requestRegistered;
    var _j = react_1.useState(true), loading = _j[0], setLoading = _j[1];
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
    var address = JSON.parse(JSON.stringify((_a = props.match) === null || _a === void 0 ? void 0 : _a.params)).address;
    var getAccountDetail = function (address) { return __awaiter(void 0, void 0, void 0, function () {
        var details, umi, eth, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    console.log({ "method": "users", "params": { "sageAddr": contract_1.sageContract.options.address, "address": address } });
                    return [4 /*yield*/, contract_1.sageContract.methods
                            .users(address)
                            .call()];
                case 1:
                    details = _a.sent();
                    console.info(details);
                    setReferrer(details.referrer);
                    setPartners(details.partnersCount);
                    return [4 /*yield*/, contract_1.sageContract.methods
                            .queryUserTotalMine(address)
                            .call()];
                case 2:
                    umi = _a.sent();
                    setUMIGotal(web3_1["default"].utils.fromWei(umi));
                    return [4 /*yield*/, contract_1.sageContract.methods
                            .queryUserTotalReward(address)
                            .call()];
                case 3:
                    eth = _a.sent();
                    setEthGoal(web3_1["default"].utils.fromWei(eth));
                    setLoadingDetail(false);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    setLoadingDetail(false);
                    antd_1.message.error(error_1.description);
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var getSageData = function (address) { return __awaiter(void 0, void 0, void 0, function () {
        var dataArray, i, levelData, active, matrix, x3Reward, x2Reward, x3Mined, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("getSageData:accountAddress:" + address);
                    if (!address) return [3 /*break*/, 12];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, , 12]);
                    dataArray = new Array();
                    i = 1;
                    _a.label = 2;
                case 2:
                    if (!(i <= appConfig_1.sageLevelCount)) return [3 /*break*/, 10];
                    levelData = new LevelData();
                    levelData.level = i;
                    levelData.levelPrice = appConfig_1.sageLevelPrices[i - 1];
                    return [4 /*yield*/, contract_1.sageContract.methods
                            .usersActiveLevels(address, i)
                            .call()];
                case 3:
                    active = _a.sent();
                    levelData.active = active;
                    if (!active) return [3 /*break*/, 8];
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
                    levelData.blcoked = matrix[3];
                    levelData.x3matrix = matrix[1].length;
                    levelData.x2matrix = matrix[2].length;
                    levelData.x3reopen = matrix[4];
                    levelData.x2reopen = matrix[5];
                    levelData.x3eth = web3_1["default"].utils.fromWei(x3Reward);
                    levelData.x2eth = web3_1["default"].utils.fromWei(x2Reward);
                    levelData.umi = web3_1["default"].utils.fromWei(x3Mined);
                    if (matrix[1].length > 0)
                        levelData.x3matrixArray = new Array().concat(matrix[1]);
                    if (matrix[2].length > 0)
                        levelData.x2matrixArray = new Array().concat(matrix[2]);
                    _a.label = 8;
                case 8:
                    console.log("LevelData:" + JSON.stringify(levelData));
                    dataArray.push(levelData);
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 2];
                case 10:
                    setSageDataSource(dataArray);
                    setX3Loading(false);
                    return [3 /*break*/, 12];
                case 11:
                    error_2 = _a.sent();
                    setX3Loading(false);
                    console.log(error_2);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    }); };
    react_1.useMemo(function () {
        if (address) {
            getAccountDetail(address);
            getSageData(address);
        }
    }, [dappReady]);
    return (react_1["default"].createElement("div", { className: "home" },
        react_1["default"].createElement(debugHeader_1["default"], null),
        react_1["default"].createElement("h4", null,
            "account:",
            address),
        react_1["default"].createElement("h4", null,
            "referer:",
            referrer),
        react_1["default"].createElement(antd_1.Spin, { spinning: loadingDetail },
            react_1["default"].createElement(antd_1.Row, null,
                react_1["default"].createElement(antd_1.Col, { span: 8 },
                    "ETH:",
                    ethGoal),
                react_1["default"].createElement(antd_1.Col, { span: 8 },
                    "UMI:",
                    umiGoal),
                react_1["default"].createElement(antd_1.Col, { span: 8 },
                    "Parnters:",
                    partners))),
        react_1["default"].createElement(antd_1.Spin, { spinning: x3Loading }, appConfig_1.sageLevelPrices.map(function (levelPrice, index) {
            return (react_1["default"].createElement("div", { key: index },
                react_1["default"].createElement("div", { style: {
                        marginTop: 10,
                        marginBottom: 10
                    } },
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '50%',
                            textAlign: 'center',
                            height: 40,
                            padding: 4,
                            backgroundColor: '#888888'
                        } },
                        "LV:",
                        sageDataSource ? sageDataSource[index].levelPrice : 0,
                        "ETH"),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '30%',
                            textAlign: 'center',
                            height: 40,
                            padding: 4,
                            backgroundColor: '#888888'
                        } }, "partners:0"),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '20%',
                            textAlign: 'center',
                            height: 40,
                            padding: 4,
                            backgroundColor: '#888888'
                        } }, "disable"),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '5%',
                            textAlign: 'center',
                            height: 40,
                            padding: 0
                        } }, "x3"),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '22%',
                            textAlign: 'center',
                            height: 40,
                            padding: 4
                        } },
                        "eth:",
                        sageDataSource ? sageDataSource[index].x3eth : 0),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '23%',
                            textAlign: 'center',
                            height: 40,
                            padding: 4
                        } },
                        "umi:",
                        sageDataSource ? sageDataSource[index].umi : 0),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '25%',
                            textAlign: 'center',
                            height: 40,
                            padding: 4
                        } },
                        "blocked:",
                        sageDataSource ? sageDataSource[index].blcoked ? 'true' : 'false' : 'false'),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '25%',
                            textAlign: 'center',
                            height: 40,
                            padding: 4
                        } },
                        "reopen:",
                        sageDataSource ? sageDataSource[index].x3reopen : 0),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '5%',
                            textAlign: 'center',
                            height: 40,
                            padding: 0
                        } }, "x2"),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '22%',
                            textAlign: 'center',
                            height: 40,
                            padding: 4
                        } },
                        "eth:",
                        sageDataSource ? sageDataSource[index].x2eth : 0),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '23%',
                            textAlign: 'center',
                            height: 40,
                            padding: 4
                        } },
                        "reopen:",
                        sageDataSource ? sageDataSource[index].x2reopen : 0),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '25%',
                            textAlign: 'center',
                            height: 40,
                            padding: 4
                        } },
                        "x3-m:",
                        sageDataSource ? sageDataSource[index].x3matrix : 0),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '25%',
                            textAlign: 'center',
                            height: 40,
                            padding: 4
                        } },
                        "x2-m:",
                        sageDataSource ? sageDataSource[index].x2matrix : 0),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '100%',
                            textAlign: 'center',
                            height: 40,
                            padding: 4
                        } },
                        "x3-matrix-1:",
                        sageDataSource ? sageDataSource[index].x3matrixArray[0] : 0),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '100%',
                            textAlign: 'center',
                            height: 40,
                            padding: 4
                        } },
                        "x3-matrix-2:",
                        sageDataSource ? sageDataSource[index].x3matrixArray[1] : 0),
                    react_1["default"].createElement(antd_1.Card.Grid, { style: {
                            width: '100%',
                            textAlign: 'center',
                            height: 40,
                            padding: 4
                        } },
                        "x2-matrix-1:",
                        sageDataSource ? sageDataSource[index].x2matrixArray[0] : 0))));
        }))));
};
exports["default"] = SageViewDebug;

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
exports.UMIDapptContext = void 0;
var react_1 = require("react");
var noop_1 = require("lodash/noop");
var use_mount_ref_1 = require("../hooks/use-mount-ref");
var account_1 = require("../api/account");
var web3_1 = require("../utils/web3");
var antd_1 = require("antd");
var contract_1 = require("../contract");
exports.UMIDapptContext = react_1.createContext({
    initDapp: noop_1["default"],
    requestRegistered: noop_1["default"]
});
var UMIDapptContextProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(), account = _b[0], setAccount = _b[1];
    var _c = react_1.useState(), chainIdHex = _c[0], setChainIdHex = _c[1];
    var _d = react_1.useState(false), registered = _d[0], setRegistered = _d[1];
    var _e = react_1.useState(false), checkRegister = _e[0], setCheckRegister = _e[1];
    //所有准备工作准备完毕 walletConnected=true & accountReady =true & contractReady = true
    var _f = react_1.useState(false), dappReady = _f[0], setDappReady = _f[1];
    var activeRef = use_mount_ref_1["default"]();
    var connectWallet = function () { return __awaiter(void 0, void 0, void 0, function () {
        var accounts, defaultAccount, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, account_1.requestAccounts()];
                case 1:
                    accounts = _a.sent();
                    if (accounts && accounts.length > 0) {
                        defaultAccount = accounts[0];
                        web3_1["default"].eth.defaultAccount = defaultAccount;
                        web3_1["default"].defaultAccount = defaultAccount;
                        setAccount(defaultAccount);
                        console.info({
                            message: "Wallet connected",
                            description: "account:" + account
                        });
                    }
                    else {
                        console.error({
                            message: "Wallet connect error",
                            description: "accounts invalid"
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    antd_1.message.error(error_1.message);
                    console.log(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var getChainIdHex = function () { return __awaiter(void 0, void 0, void 0, function () {
        var chain, chainIdHex_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, account_1.getChain()];
                case 1:
                    chain = _a.sent();
                    if (activeRef.current) {
                        chainIdHex_1 = chain.chainIdHex;
                        setChainIdHex(chainIdHex_1);
                        console.info({
                            message: "Chain ready",
                            description: "chainIdHex:" + chainIdHex_1
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error({
                        message: 'getChainIdHex Error:' + error_2.name,
                        description: error_2.message
                    });
                    antd_1.message.error("Error:" + error_2.message);
                    console.log(error_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var initDapp = function () {
        if (typeof ethereum !== 'undefined') {
            if (typeof ethereum.on === 'function') {
                ethereum.removeAllListeners();
                ethereum.on('accountsChanged', function (accounts) {
                    if (accounts.length === 0) {
                        // MetaMask is locked or the user has not connected any accounts
                        antd_1.notification.info({
                            message: "Account Changed",
                            description: "Please connect to MetaMask"
                        });
                    }
                    else if (accounts[0] !== account) {
                        if (activeRef.current) {
                            var defaultAccount = accounts[0];
                            setAccount(defaultAccount);
                            web3_1["default"].eth.defaultAccount = defaultAccount;
                            web3_1["default"].defaultAccount = defaultAccount;
                            contract_1.sageV2Contract.defaultAccount = defaultAccount;
                        }
                    }
                });
                ethereum.on('chainChanged', function (chainId) {
                    if (chainId !== chainIdHex) {
                        antd_1.notification.warn({
                            message: 'Ethereum Network changed',
                            description: "chainIdHex:" + chainIdHex + "\t chainId:" + chainId
                        });
                        setChainIdHex(chainId);
                    }
                });
            }
            if (ethereum.isConnected()) {
                connectWallet();
                getChainIdHex();
            }
        }
    };
    react_1.useEffect(function () {
        if (account && chainIdHex) {
            setDappReady(true);
        }
    }, [account, chainIdHex]);
    var requestRegistered = function () { return __awaiter(void 0, void 0, void 0, function () {
        var isUserExists, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!account) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log({ "method": "requestRegistered", "params": { "sageAddr": contract_1.sageV2Contract.options.address, "account": account } });
                    return [4 /*yield*/, contract_1.sageV2Contract.methods.isUserExists(account).call()];
                case 2:
                    isUserExists = _a.sent();
                    setRegistered(isUserExists);
                    if (isUserExists) {
                        console.info({
                            message: 'Account Registered',
                            description: "enjoy unisage"
                        });
                    }
                    else {
                        console.info({
                            message: 'Account Not Registered',
                            description: "enjoy unisage"
                        });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    setRegistered(false);
                    console.error({
                        message: 'requestRegistered Error:' + error_3.name,
                        description: error_3.message
                    });
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    setRegistered(false);
                    console.info({
                        message: 'check register fail',
                        description: "dappReady:" + dappReady + "\taccount:" + account + "\r:chainIdHex:" + chainIdHex
                    });
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var contextValues = react_1.useMemo(function () { return ({
        account: account,
        chainIdHex: chainIdHex,
        dappReady: dappReady,
        registered: registered,
        initDapp: initDapp,
        checkRegister: checkRegister,
        requestRegistered: requestRegistered
    }); }, [account, chainIdHex, dappReady, registered, initDapp, checkRegister, requestRegistered]);
    return (react_1["default"].createElement(exports.UMIDapptContext.Provider, { value: contextValues }, children));
};
exports["default"] = UMIDapptContextProvider;

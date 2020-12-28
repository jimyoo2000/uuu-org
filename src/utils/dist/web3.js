"use strict";
exports.__esModule = true;
exports.provider = void 0;
var web3_1 = require("web3");
var currentProvider;
if (typeof ethereum !== 'undefined') {
    ethereum.autoRefreshOnNetworkChange = false;
    currentProvider = ethereum;
    ethereum.enable();
}
else if (typeof web3 !== 'undefined') {
    currentProvider = web3.currentProvider;
}
else {
    currentProvider = null;
}
exports.provider = currentProvider;
var web3Object = new web3_1["default"](exports.provider);
exports["default"] = web3Object;

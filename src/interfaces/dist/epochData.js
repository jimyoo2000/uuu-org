"use strict";
exports.__esModule = true;
exports.EpochData = void 0;
var EpochData = /** @class */ (function () {
    // const investAmount = epoch.investAmount
    // const lastWithdrawBlock = epoch.lastWithdrawBlock
    // const totalWithdrawAmount = epoch.totalWithdrawAmount
    function EpochData() {
        this.investAmount = '0';
        this.lastWithdrawBlock = 0;
        this.totalWithdrawAmount = '0';
        this.availableWithdrawAmount = '0';
        this.profitAmount = '0';
    }
    return EpochData;
}());
exports.EpochData = EpochData;

"use strict";
exports.__esModule = true;
exports.miningPeriodData = void 0;
var miningPeriodData = /** @class */ (function () {
    function miningPeriodData() {
    }
    return miningPeriodData;
}());
exports.miningPeriodData = miningPeriodData;
function formatNumber(numStr, decimal) {
    if (decimal === void 0) { decimal = 2; }
    if (!numStr) {
        return '-';
    }
    else {
        var number = parseFloat(numStr);
        if (isNaN(number)) {
            return '-';
        }
        else {
            return parseFloat(number.toFixed(decimal));
        }
    }
}
exports["default"] = formatNumber;

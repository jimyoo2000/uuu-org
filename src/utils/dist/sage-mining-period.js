"use strict";
exports.__esModule = true;
exports.MiningPeriodData = void 0;
var appConfig_1 = require("src/config/appConfig");
var MiningPeriodData = /** @class */ (function () {
    function MiningPeriodData() {
        this.name = '';
        this.ratio = 0;
        this.supply = 0;
        this.period = 0;
    }
    return MiningPeriodData;
}());
exports.MiningPeriodData = MiningPeriodData;
function sageMiningPeriod(umiMined) {
    var period = 0;
    if (umiMined <= appConfig_1.salePeriodTotal[0])
        period = 0;
    else if (umiMined <= appConfig_1.salePeriodTotal[1])
        period = 1;
    else if (umiMined <= appConfig_1.salePeriodTotal[2])
        period = 2;
    else if (umiMined <= appConfig_1.salePeriodTotal[3])
        period = 3;
    var data = new MiningPeriodData();
    data.name = appConfig_1.salePeriodName[period];
    data.ratio = appConfig_1.salePeriodRatio[period];
    data.supply = appConfig_1.salePeriodTotal[period];
    data.period = period;
    return data;
}
exports["default"] = sageMiningPeriod;

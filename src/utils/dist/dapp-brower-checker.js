"use strict";
exports.__esModule = true;
function checkDappBrower() {
    if (typeof ethereum !== 'undefined') {
        return true;
    }
    else if (typeof web3 !== 'undefined') {
        return true;
    }
    else {
        return false;
    }
}
exports["default"] = checkDappBrower;

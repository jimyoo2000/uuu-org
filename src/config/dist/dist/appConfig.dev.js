"use strict";
/**
 * Project config
 */

exports.__esModule = true;
exports.uniswapContractAddr = exports.fundContractAddr = exports.tokenContractAddr = exports.sageContractAddr = exports.sageLevelCount = exports.sageLevelPrices = exports.appUrl = exports.varVersion = exports.varVersion_Test = exports.varVersion_Prod = void 0;
exports.varVersion_Prod = 'prod';
exports.varVersion_Test = 'test';
exports.varVersion = exports.varVersion_Test; //app url

var appUrl_Prod = "http://localhost:3000/#";
var appUrl_Test = "http://unimine.org/#";
var appUrls = {
  'prod': appUrl_Prod,
  'test': appUrl_Test
};
exports.appUrl = appUrls[exports.varVersion]; // sage Level

exports.sageLevelPrices = [0.05, 0.1, 0.2, 0.4, 0.8, 1.6, 3.2, 6.4, 12.8, 25.6];
exports.sageLevelCount = 10; // contracts

var sageContractAddrs = {
  'prod': '0x31B80003774888D077cE68AAEaCa8e4d94F64F58',
  'test': '0xb4BEea5476A3Bc7eCB0FebaD836B392c87BDd53b'
};
exports.sageContractAddr = sageContractAddrs[exports.varVersion];
var tokenContractAddrs = {
  'prod': '0x5284d793542815354b9604f06Df14f157BE90462',
  'test': '0x81362c8c5dd5CEC3131657E7E859AAC41acC2172'
};
exports.tokenContractAddr = tokenContractAddrs[exports.varVersion];
var fundContractAddrs = {
  'prod': '0x106e54dAdbc06767c80eea38e86672a7b34f1338',
  'test': '0x1018314f1508FAD1bf11c008a06078C3Fd0Cb4Cf'
};
exports.fundContractAddr = fundContractAddrs[exports.varVersion];
var uniswapContractAddrs = {
  'prod': '0xd7fd5f56271d85418CD87f7Faaf967D3713835F7',
  'test': '0xd7fd5f56271d85418CD87f7Faaf967D3713835F7'
};
exports.uniswapContractAddr = uniswapContractAddrs[exports.varVersion];
"use strict";
/**
 * Project config
 */
exports.__esModule = true;
exports.salePeriodRatio = exports.salePeriodTotal = exports.salePeriodName = exports.salePeriodIndex = exports.chrimasContractScanUrl = exports.chrimasContractAddr = exports.uniswapContractScanUrl = exports.uniswapContractAddr = exports.fundContractScanUrl = exports.fundContractAddr = exports.tokenContractScanUrl = exports.tokenContractAddr = exports.sageV2ContractScanUrl = exports.sageV2ContractAddr = exports.sageContractScanUrl = exports.sageContractAddr = exports.appUrl = exports.env = exports.EnvEnum = exports.sageLevelCount = exports.sagev2LevelPrices = exports.sageLevelPrices = void 0;
// sage Level
exports.sageLevelPrices = [0.05, 0.1, 0.2, 0.4, 0.8, 1.6, 3.2, 6.4, 12.8, 25.6];
//export const sagev2LevelPrices: Array<number> = [0.1, 0.2, 0.4, 0.8, 1.6, 3.2, 6.4, 12.8, 25.6,51.2];
exports.sagev2LevelPrices = [0.1, 0.2, 0.4, 0.8, 1.6, 3.2];
exports.sageLevelCount = 6;
var EnvEnum;
(function (EnvEnum) {
    EnvEnum["prod"] = "prod";
    EnvEnum["test"] = "test";
    EnvEnum["gray"] = "gray";
})(EnvEnum = exports.EnvEnum || (exports.EnvEnum = {}));
exports.env = EnvEnum.prod;
//app url
var appUrl_Prod = "http://unimine.org/#";
var appUrl_Test = "http://localhost:3000/#";
var appUrl_Gray = "http://test.unimine.org/#";
var appUrls = {
    'prod': appUrl_Prod,
    'gray': appUrl_Gray,
    'test': appUrl_Test
};
exports.appUrl = appUrls[exports.env];
//scan url
var etherscanUrl = {
    'prod': "https://etherscan.io/address/",
    'test': "https://goerli.etherscan.io/address/",
    'gray': "https://goerli.etherscan.io/address/"
};
// contracts
var sageContractAddrs = {
    'prod': '0x31B80003774888D077cE68AAEaCa8e4d94F64F58',
    'test': '0xb4BEea5476A3Bc7eCB0FebaD836B392c87BDd53b',
    'gray': '0xb4BEea5476A3Bc7eCB0FebaD836B392c87BDd53b'
};
exports.sageContractAddr = sageContractAddrs[exports.env];
exports.sageContractScanUrl = etherscanUrl[exports.env] + exports.sageContractAddr;
// sage II
var sageV2ContractAddrs = {
    'prod': '0xd4845cBc79acE2cc6E48C8671a5860FfAB920bC2',
    'test': '0xf61DdA9A827cff208b6242FCF72AD1bB2006A995',
    'gray': '0xf61DdA9A827cff208b6242FCF72AD1bB2006A995'
};
exports.sageV2ContractAddr = sageV2ContractAddrs[exports.env];
exports.sageV2ContractScanUrl = etherscanUrl[exports.env] + sageV2ContractAddrs;
var tokenContractAddrs = {
    'prod': '0xf61DdA9A827cff208b6242FCF72AD1bB2006A995',
    'test': '0x3B4005397f57804BEbFAf5B0aFA3B2DD13CD7F0F',
    'gray': '0x3B4005397f57804BEbFAf5B0aFA3B2DD13CD7F0F'
};
exports.tokenContractAddr = tokenContractAddrs[exports.env];
exports.tokenContractScanUrl = etherscanUrl[exports.env] + exports.tokenContractAddr;
var fundContractAddrs = {
    'prod': '0x106e54dAdbc06767c80eea38e86672a7b34f1338',
    'test': '0x1018314f1508FAD1bf11c008a06078C3Fd0Cb4Cf',
    'gray': '0x1018314f1508FAD1bf11c008a06078C3Fd0Cb4Cf'
};
exports.fundContractAddr = fundContractAddrs[exports.env];
exports.fundContractScanUrl = etherscanUrl[exports.env] + exports.fundContractAddr;
var uniswapContractAddrs = {
    'prod': '0x83eb2cf2f97424b21ca7c79dd8016b05474b77d6',
    'test': '0xd7fd5f56271d85418CD87f7Faaf967D3713835F7',
    'gray': '0xd7fd5f56271d85418CD87f7Faaf967D3713835F7'
};
exports.uniswapContractAddr = uniswapContractAddrs[exports.env];
exports.uniswapContractScanUrl = etherscanUrl[exports.env] + exports.uniswapContractAddr;
var chrimasContractAddrs = {
    'prod': '0xB69973797D8fc3f5F22826c66e817ce8692Ef890',
    'test': '0x797021050f8D9B694d4605DC4867adEbacBBFb03',
    'gray': '0x797021050f8D9B694d4605DC4867adEbacBBFb03'
};
exports.chrimasContractAddr = chrimasContractAddrs[exports.env];
exports.chrimasContractScanUrl = etherscanUrl[exports.env] + exports.chrimasContractAddr;
var naviData = [
    {
        title: "Unimine",
        ref: "/"
    },
    {
        title: "UMI",
        ref: "/prefund"
    },
    {
        title: "Pool",
        ref: "/pool",
        items: [
            {
                title: "Unisage V2",
                enable: true,
                ref: "/sage"
            },
            {
                title: "Liquidity Mining",
                enable: false,
                ref: "/pool"
            }, ,
            {
                title: "Custom Mining",
                enable: false,
                ref: "/pool"
            }
        ]
    },
    {
        title: "Register",
        ref: "/register"
    }
];
//sale 
exports.salePeriodIndex = [0, 1, 2, 3];
exports.salePeriodName = ["01", "02", "03", "04"];
exports.salePeriodTotal = [10000000, 5000000, 2500000, 10000000];
exports.salePeriodRatio = [1000, 500, 250, 125];

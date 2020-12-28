/**
 * Project config
 */

// sage Level
export const sageLevelPrices: Array<number> = [0.05, 0.1, 0.2, 0.4, 0.8, 1.6, 3.2, 6.4, 12.8, 25.6];
//export const sagev2LevelPrices: Array<number> = [0.1, 0.2, 0.4, 0.8, 1.6, 3.2, 6.4, 12.8, 25.6,51.2];
export const sagev2LevelPrices: Array<number> = [0.1, 0.2, 0.4, 0.8, 1.6, 3.2];

export const sageLevelCount: number = 6;

export enum EnvEnum {
    prod = 'prod',
    test = 'test',
    gray = 'gray',
}

export let env = EnvEnum.prod;

//app url
const appUrl_Prod = "http://unimine.org/#";
const appUrl_Test = "http://localhost:3000/#";
const appUrl_Gray = "http://test.unimine.org/#";
const appUrls = {
    'prod': appUrl_Prod,
    'gray': appUrl_Gray,
    'test': appUrl_Test
}
export const appUrl = appUrls[env];

//scan url
const etherscanUrl = {
    'prod': "https://etherscan.io/address/",
    'test': "https://goerli.etherscan.io/address/",
    'gray': "https://goerli.etherscan.io/address/"
}

// contracts
const sageContractAddrs = {
    'prod': '0x31B80003774888D077cE68AAEaCa8e4d94F64F58',
    'test': '0xb4BEea5476A3Bc7eCB0FebaD836B392c87BDd53b',
    'gray': '0xb4BEea5476A3Bc7eCB0FebaD836B392c87BDd53b'
}
export const sageContractAddr = sageContractAddrs[env];
export const sageContractScanUrl = etherscanUrl[env] + sageContractAddr;


// sage II
const sageV2ContractAddrs = {
    'prod': '0xd4845cBc79acE2cc6E48C8671a5860FfAB920bC2',
    'test': '0xf61DdA9A827cff208b6242FCF72AD1bB2006A995',
    'gray': '0xf61DdA9A827cff208b6242FCF72AD1bB2006A995'
}
export const sageV2ContractAddr = sageV2ContractAddrs[env];
export const sageV2ContractScanUrl = etherscanUrl[env] + sageV2ContractAddrs;

const tokenContractAddrs = {
    'prod': '0xf61DdA9A827cff208b6242FCF72AD1bB2006A995',
    'test': '0x3B4005397f57804BEbFAf5B0aFA3B2DD13CD7F0F',
    'gray': '0x3B4005397f57804BEbFAf5B0aFA3B2DD13CD7F0F'
}
export const tokenContractAddr = tokenContractAddrs[env];
export const tokenContractScanUrl = etherscanUrl[env] + tokenContractAddr;


const fundContractAddrs = {
    'prod': '0x106e54dAdbc06767c80eea38e86672a7b34f1338',
    'test': '0x1018314f1508FAD1bf11c008a06078C3Fd0Cb4Cf',
    'gray': '0x1018314f1508FAD1bf11c008a06078C3Fd0Cb4Cf'
}
export const fundContractAddr = fundContractAddrs[env];
export const fundContractScanUrl = etherscanUrl[env] + fundContractAddr;

const uniswapContractAddrs = {
    'prod': '0x83eb2cf2f97424b21ca7c79dd8016b05474b77d6',
    'test': '0xd7fd5f56271d85418CD87f7Faaf967D3713835F7',
    'gray': '0xd7fd5f56271d85418CD87f7Faaf967D3713835F7'
}
export const uniswapContractAddr = uniswapContractAddrs[env];
export const uniswapContractScanUrl = etherscanUrl[env] + uniswapContractAddr;


const chrimasContractAddrs = {
    'prod': '0xB69973797D8fc3f5F22826c66e817ce8692Ef890',
    'test': '0x797021050f8D9B694d4605DC4867adEbacBBFb03',
    'gray': '0x797021050f8D9B694d4605DC4867adEbacBBFb03'
}
export const chrimasContractAddr = chrimasContractAddrs[env];
export const chrimasContractScanUrl = etherscanUrl[env] + chrimasContractAddr;


const naviData = [
    {
        title: "Unimine",
        ref: "/",
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
            }]
    },
    {
        title: "Register",
        ref: "/register"
    }
]

//sale 
export const salePeriodIndex = [0, 1, 2, 3];
export const salePeriodName = ["01", "02", "03", "04"];
export const salePeriodTotal = [10000000, 5000000, 2500000, 10000000];
export const salePeriodRatio = [1000, 500, 250, 125];

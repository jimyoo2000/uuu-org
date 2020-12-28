import web3 from '../../utils/web3'
import abisProd from './abi-prod'
import abisTest from './abi-test'
import { env, EnvEnum, sageContractAddr } from '../../config/appConfig'

let abis = env == EnvEnum.test?abisTest:abisProd;
const contract = new web3.eth.Contract(abis)
contract.options.address = sageContractAddr;
contract.defaultAccount = web3.eth.defaultAccount


export default contract

import web3 from '../../utils/web3'
import abis from './abi'

const contract = new web3.eth.Contract(abis)

contract.defaultAccount = web3.eth.defaultAccount

export default contract

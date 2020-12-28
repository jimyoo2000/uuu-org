import Web3 from 'web3'

let currentProvider

if (typeof ethereum !== 'undefined') {
    ethereum.autoRefreshOnNetworkChange = false
    currentProvider = ethereum
    ethereum.enable()
} else if (typeof web3 !== 'undefined') {
    currentProvider = web3.currentProvider
} else {
    currentProvider = null;
}

export const provider = currentProvider
const web3Object = new Web3(provider)

export default web3Object

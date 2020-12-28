import web3 from '../utils/web3'
import { Chain } from '../interfaces/chain'
import { env, EnvEnum } from 'src/config/appConfig'

export function requestAccounts() {
    return web3.eth.requestAccounts()
}

export async function requestAccountBalance(addr: string) {
    const balance = await web3.eth.getBalance(addr)

    return web3.utils.fromWei(balance)
}

export async function getChain(): Promise<Chain> {

    //mainnet 0x01
    //Ropsten 0x03
    //Rinkeby 0x04
    //Goerli 0x05
    //Kovan 0x21
    const chainId = env === EnvEnum.prod?0x01:0x05;
    
    const chainIdHex = web3.utils.toHex(chainId)
    
    return {
        chainId,
        chainIdHex,
        chainName: 'Main Net',
    }
}

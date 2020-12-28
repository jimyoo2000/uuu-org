import React, {
    createContext,
    FC,
    useState,
    useMemo,
    useEffect,
    useCallback,
} from 'react'

import noop from 'lodash/noop'
import useMountRef from '../hooks/use-mount-ref'
import { requestAccounts, getChain } from '../api/account'
import web3 from '../utils/web3'
import { message, notification, Spin, Statistic } from 'antd'

import { sageV2Contract } from '../contract'

export interface UMIDappContextValues {
    account?: string
    chainIdHex?: string

    //init dapp
    dappReady?: boolean
    initDapp: () => void

    //register
    registered?: boolean
    checkRegister?: boolean
    requestRegistered: () => void

}

export const UMIDapptContext = createContext<UMIDappContextValues>({
    initDapp: noop,
    requestRegistered: noop
})


const UMIDapptContextProvider: FC = ({ children }) => {

    const [account, setAccount] = useState<string>()
    const [chainIdHex, setChainIdHex] = useState<string>()
    const [registered, setRegistered] = useState<boolean>(false)
    const [checkRegister, setCheckRegister] = useState<boolean>(false);

    //所有准备工作准备完毕 walletConnected=true & accountReady =true & contractReady = true
    const [dappReady, setDappReady] = useState<boolean>(false)

    const activeRef = useMountRef()

    const connectWallet = async () => {
        try {
            const accounts = await requestAccounts()
            if (accounts && accounts.length > 0) {
                const defaultAccount = accounts[0]
                web3.eth.defaultAccount = defaultAccount
                web3.defaultAccount = defaultAccount

                setAccount(defaultAccount)

                console.info({
                    message: "Wallet connected",
                    description: "account:" + account
                })
            } else {
                console.error({
                    message: "Wallet connect error",
                    description: "accounts invalid"
                })
            }

        } catch (error) {
            message.error(error.message)
            console.log(error.message)
        }
    }

    const getChainIdHex = async () => {
        try {
            const chain = await getChain()

            if (activeRef.current) {
                const { chainIdHex } = chain
                setChainIdHex(chainIdHex)

                console.info({
                    message: "Chain ready",
                    description: "chainIdHex:" + chainIdHex
                })
            }
        } catch (error) {
            console.error({
                message: 'getChainIdHex Error:' + error.name,
                description: error.message
            }
            )
            message.error("Error:" + error.message)
            console.log(error.message)
        }
    }


    const initDapp = () => {
        if (typeof ethereum !== 'undefined') {
            if (typeof ethereum.on === 'function') {
                ethereum.removeAllListeners()

                ethereum.on('accountsChanged', (accounts: string[]) => {
                    if (accounts.length === 0) {
                        // MetaMask is locked or the user has not connected any accounts
                        notification.info({
                            message: "Account Changed",
                            description: "Please connect to MetaMask"
                        })
                    } else if (accounts[0] !== account) {
                        if (activeRef.current) {
                            const defaultAccount = accounts[0]
                            setAccount(defaultAccount)
                            web3.eth.defaultAccount = defaultAccount
                            web3.defaultAccount = defaultAccount
                            sageV2Contract.defaultAccount = defaultAccount
                        }
                    }

                })
                ethereum.on('chainChanged', (chainId: string) => {
                    if (chainId !== chainIdHex) {
                        notification.warn({
                            message: 'Ethereum Network changed',
                            description: "chainIdHex:" + chainIdHex + "\t chainId:" + chainId
                        }
                        )
                        setChainIdHex(chainId)
                    }
                })
            }
            if (ethereum.isConnected()) {
                connectWallet()
                getChainIdHex()
            }
        }
    }

    useEffect(() => {
        if (account && chainIdHex) {

            setDappReady(true)
        }

    }, [account, chainIdHex])

    const requestRegistered = async () => {

        if (account) {
            try {

                console.log({ "method": "requestRegistered", "params": { "sageAddr": sageV2Contract.options.address, "account": account } })

                const isUserExists = await sageV2Contract.methods.isUserExists(account).call()
                setRegistered(isUserExists)
                if (isUserExists) {
                    console.info({
                        message: 'Account Registered',
                        description: "enjoy unisage"
                    }
                    )
                } else {
                    console.info({
                        message: 'Account Not Registered',
                        description: "enjoy unisage"
                    }
                    )

                }
            } catch (error) {
                setRegistered(false)
                console.error({
                    message: 'requestRegistered Error:' + error.name,
                    description: error.message
                }
                )
            }
        } else {
            setRegistered(false)
            console.info({
                message: 'check register fail',
                description: "dappReady:" + dappReady + "\taccount:" + account + "\r:chainIdHex:" + chainIdHex
            }
            )
        }
    }

    const contextValues = useMemo<UMIDappContextValues>(
        () => ({
            account,
            chainIdHex,
            dappReady,
            registered,
            initDapp,
            checkRegister,
            requestRegistered
        }),
        [account, chainIdHex, dappReady, registered, initDapp, checkRegister, requestRegistered]
    )
    return (
        <UMIDapptContext.Provider value={contextValues}>
            {children}
        </UMIDapptContext.Provider>
    )
}

export default UMIDapptContextProvider

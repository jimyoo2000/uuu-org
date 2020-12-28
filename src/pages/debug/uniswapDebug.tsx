import { Spin } from 'antd'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { UMIDapptContext } from '../../context/umiDapp'
import { uniswapContract } from '../../contract'
import ETHAmount from '../../utils/eth-amount'
import web3 from '../../utils/web3'
import DebugHeader from './debugHeader'

function UniswapDebug() {

  const [uniswapPrice, setUniswapPrice] = useState<number>()
  const [loadingPrice, setLoadingPrice] = useState<boolean>(true)

  const { dappReady } = useContext(UMIDapptContext)
  const { chainIdHex } = useContext(UMIDapptContext)


  const getReserves = async () => {
    setLoadingPrice(true)
    try {
      const res = await uniswapContract.methods.getReserves().call()
      const umi = +web3.utils.fromWei(res['0'])
      const eth = +web3.utils.fromWei(res['1'])
      console.log("price: eth=" + eth + "\t umi=" + umi);
      setUniswapPrice(eth / umi)

      setLoadingPrice(false);
    } catch (error) {
      setLoadingPrice(false);
      console.log(error)
    }
  }

  useMemo(() => {

    if (chainIdHex) {

      getReserves()
    }
  }, [dappReady])



  return (
    <div className="home">
      <DebugHeader />
      <h1>Uniswap Debug</h1>
      <Spin spinning={loadingPrice}>
        Price:1UMI = {uniswapPrice ? (<ETHAmount amount={uniswapPrice.toString()} decimal={4} />) : (<br></br>)}
      </Spin>

    </div>
  )
}

export default UniswapDebug

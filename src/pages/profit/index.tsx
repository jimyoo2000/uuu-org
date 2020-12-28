import React, { useContext, useEffect, useMemo, useState } from 'react'
import { appUrl, sageLevelCount, sageLevelPrices } from 'src/config/appConfig';
import { UMIDapptContext } from 'src/context/umiDapp';
import { message, Spin } from 'antd';
import copy from 'copy-to-clipboard';
import { sageV2Contract } from 'src/contract';
import web3 from '../../utils/web3'
import ShareView from 'src/components/shareView';
import { EpochData } from 'src/interfaces/epochData';
import CommonHeader from '../header';



function StaticProfit() {

  const { chainIdHex } = useContext(UMIDapptContext)
  const { account } = useContext(UMIDapptContext)

  const { initDapp } = useContext(UMIDapptContext)
  const { dappReady } = useContext(UMIDapptContext)

  const { registered } = useContext(UMIDapptContext)
  const { checkRegister } = useContext(UMIDapptContext)
  const { requestRegistered } = useContext(UMIDapptContext)


  const [loading, setLoading] = useState<boolean>(true);

  //页面数据
  const [epochDataSource, setEpochDataSource] = useState<Array<EpochData>>();
  const [profitAccessed, setProfitAccessed] = useState<boolean>(true)

  const caculateAvailabeWithdraw = (investAmount: number, currentBlock: number, lastWithdrawBlock: number, profitRate: number) => {
    return investAmount * (currentBlock - lastWithdrawBlock) * profitRate / 8640 / 1000;
  }

  //sage个人用户数据
  const queryUserEpochData = async (address: string) => {
    if (address) {
      try {

        // 先访问是否是黑名单
        console.log({ "method": "getUserEpochLength", "params": { "sageAddr": sageV2Contract.options.address, "address": account } })

        const inBlackList = await sageV2Contract.methods.userProfitBlacklist(address).call()
        setProfitAccessed(!inBlackList)
        if (inBlackList) {
          
          setLoading(false)
          return;
        }

        // getUserEpochLength
        console.log({ "method": "getUserEpochLength", "params": { "sageAddr": sageV2Contract.options.address, "address": account } })
        const epochLength = await sageV2Contract.methods.getUserEpochLength(address).call()

        if (epochLength > 0) {

          let dataArray = new Array<EpochData>();

          const profitRate = await sageV2Contract.methods.getProfitRate().call()
          const blockNumber = await web3.eth.getBlockNumber();
          let epochIndex = 0;
          for (epochIndex = 0; epochIndex < epochLength; epochIndex++) {
            const epoch = await sageV2Contract.methods.queryUserEpochInfo(address, epochIndex).call()

            let epochData: EpochData = new EpochData()

            epochData.investAmount = web3.utils.fromWei(epoch.investAmount)
            epochData.totalWithdrawAmount = web3.utils.fromWei(epoch.totalWithdrawAmount)
            epochData.lastWithdrawBlock = epoch.lastWithdrawBlock

            let availableWithdrawAmount = caculateAvailabeWithdraw(parseFloat(epochData.investAmount + ""), blockNumber, epoch.lastWithdrawBlock, profitRate)
            epochData.availableWithdrawAmount = availableWithdrawAmount.toFixed(8)

            let totalProfit = parseFloat(epochData.totalWithdrawAmount + "") + availableWithdrawAmount
            epochData.profitAmount = totalProfit.toFixed(8)

            dataArray.push(epochData)
          }

          setEpochDataSource(dataArray);

        }
        setLoading(false)

      } catch (error) {
        setLoading(false);
        console.error({
          message: 'queryUserData Error at Address:' + address,
          description: error.message
        }
        )
      }
    } else {
      setLoading(false);
      console.error({
        message: 'queryUserData Error:',
        description: "invalid address"
      }
      )
    }
  }
  //页面刷新逻辑
  //step 1, 自动连钱包 。 调用 initDapp
  //step 2, 钱包连接成功之后，查询当前地址是否注册。 监听 dappReady ，调用检查注册
  //step 3, 根据注册状态，初始化body内容。

  useEffect(() => {
    if (account && registered)
      queryUserEpochData(account)
    else {
      setLoading(false)
      //message.warn("account not registered")
    }
  }, [registered])

  useEffect(() => {
    //检查用户是否注册
    if (!checkRegister) {
      requestRegistered();
      return;
    }
  }, [dappReady])

  useEffect(() => {
    //如果钱包没有连接，连接钱包
    if (!dappReady) {
      initDapp();
      return;
    }

    if (!checkRegister) {
      requestRegistered();
      return;
    }

    if (account)
      queryUserEpochData(account)

  }, [])


  const doWithDraw = async (epochIndex: number) => {
    if (account) {
      try {
        console.info({
          "message": "doWithDraw",
          "description": "epochIndex=" + epochIndex
        })
        sageV2Contract.methods
          .withdrawByEpoch(epochIndex)
          .send({
            to: sageV2Contract.options.address,
            from: web3.eth.defaultAccount,
          })
          .once('transactionHash', (txHash: string) => {
            message.success("Transaction initialed,wait ethereum confirms")
          })
          .once('receipt', () => {
            message.success({
              message: 'Withdraw successfully',
            })
          })
          .on('error', (error: Error) => {
            message.error('Error:' + error.message)
            console.error({
              message: 'Withdraw fail',
              description: error.message,
            })
          })
      } catch (error) {
        message.error('Error:' + error.message)
        console.error({
          message: 'Withdraw Error:' + error.name,
          description: error.message
        }
        )
      }
    }
  }

  return (
    <Spin spinning={loading}>
      <CommonHeader selectIndex={2}></CommonHeader>
      <div className="sagev2_dashboard">
        <div className="wal">
          <h2 className="wow fadeInUp title">Static Profit</h2>
          <ul>
            {
              epochDataSource ? epochDataSource.map(
                (epochData, index) => {
                  let ifshow: boolean = true;
                  return (
                    <div className="container2 container2-2 wow fadeInUp" key={index}>
                      <ul>
                        <li>
                          <b>{epochData.investAmount} </b>
                          <div>Invest Amount(ETH)</div>
                        </li>
                        <li>
                          <b>{epochData.profitAmount}</b>
                          <div>Total Profit(ETH)</div>
                        </li>
                        <li>
                          <b>{epochData.availableWithdrawAmount}</b>
                          <div>Available Amount(ETH)</div>
                        </li>
                        <li><a className="btn" onClick={(e) => { doWithDraw(index) }}>Withdraw</a></li>
                      </ul>
                    </div>
                  )
                }) : <div> 0 </div>
            }
          </ul>
        </div>
      </div>

    </Spin >
  )
};

export default StaticProfit;

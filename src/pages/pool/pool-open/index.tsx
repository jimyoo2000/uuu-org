import { message, Spin } from 'antd';
import React, { Component, useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { appUrl, sageContractAddr, salePeriodIndex, salePeriodName, salePeriodRatio, salePeriodTotal } from 'src/config/appConfig';
import { UMIDapptContext } from 'src/context/umiDapp';
import { sageV2Contract } from 'src/contract';

import CommonHeader from '../../header';
import web3 from '../../../utils/web3';
import copy from 'copy-to-clipboard';
import sageMiningPeriod, { MiningPeriodData } from 'src/utils/sage-mining-period';
import formatNumber from 'src/utils/format-number';
import formatAddr from 'src/utils/format-addr';
import ShareView from 'src/components/shareView';



function PoolOpen() {

  const { chainIdHex } = useContext(UMIDapptContext)
  const { account } = useContext(UMIDapptContext)

  const { initDapp } = useContext(UMIDapptContext)
  const { dappReady } = useContext(UMIDapptContext)

  const { registered } = useContext(UMIDapptContext)
  const { checkRegister } = useContext(UMIDapptContext)
  const { requestRegistered } = useContext(UMIDapptContext)
  const [loading, setLoading] = useState<boolean>(true);

  //页面数据
  const [mineTotal, setMineTotal] = useState<string>('0');
  const [investTotal, setInvestTotal] = useState<string>('0')
  const [partnerTotal, setPartnerTotal] = useState<string>('0')

  const [userMine, setUserMine] = useState<string>('0')
  const [userEarn, setUserEarn] = useState<string>('0')
  const [partners, setPartners] = useState<number>(0)
  const [referrer, setReferrer] = useState<string>('0');

  //挖矿周期
  const [currentPeriod, setCurrentPeriod] = useState<MiningPeriodData>();

  //share link
  const inviterUrl = useMemo(() => {
    return appUrl + "/register/" + account;
  }, [account])
  const [showShare, setShowShare] = useState<boolean>(false);

  //加载数据

  const onCopyLink = () => {
    copy(inviterUrl)
    console.log(inviterUrl);
    message.success("copy successfully");
  }



  //sage统计数据
  const queryTotalData = async () => {
    try {
      console.log({ "method": "queryTotalData", "params": { "sageAddr": sageV2Contract.options.address, "account": account } })
      const globalMine = await sageV2Contract.methods.queryGlobalMine().call()
      const globalInvest = await sageV2Contract.methods.queryGlobalInvest().call()

      let globalInvestNumber = parseFloat(web3.utils.fromWei(globalInvest))
      globalInvestNumber = globalInvestNumber-403.2*2;
      setInvestTotal(globalInvestNumber+"")

      setMineTotal(web3.utils.fromWei(globalMine))

      const globalInvestAddrCount = await sageV2Contract.methods
        .globalInvestAddrCount()
        .call()


      setPartnerTotal(globalInvestAddrCount)

      let minedTotalNumber = parseFloat(web3.utils.fromWei(globalMine))
      console.log("minedTotalNumber:" + minedTotalNumber)
      setCurrentPeriod(sageMiningPeriod(minedTotalNumber))

    } catch (error) {
      console.error({
        message: 'queryTotalData Error:',
        description: error.message
      }
      )
    }
  }

  //sage个人用户数据
  const queryUserData = async (address: string) => {
    if (address) {
      try {
        console.log({ "method": "queryUserTotalMine", "params": { "sageAddr": sageV2Contract.options.address, "address": account } })
        const mined = await sageV2Contract.methods.queryUserTotalMine(address).call()

        console.log({ "method": "queryUserTotalReward", "params": { "sageAddr": sageV2Contract.options.address, "address": account } })
        const reward = await sageV2Contract.methods.queryUserTotalReward(address).call()


        console.log({ "method": "users", "params": { "sageAddr": sageV2Contract.options.address, "address": address } })
        const details = await sageV2Contract.methods
          .users(address)
          .call()
        console.info(details);


        setPartners(details.partnersCount)
        setReferrer(details.referrer)
        setUserMine(web3.utils.fromWei(mined))
        setUserEarn(web3.utils.fromWei(reward))



        setLoading(false);
      } catch (error) {
        console.error({
          message: 'queryUserData Error at Address:' + address,
          description: error.message
        }
        )
      }
    } else {
      console.error({
        message: 'queryUserData Error:',
        description: "invalid address"
      }
      )
    }
  }

  const doShowShare = () => {
    setShowShare(true)
  }
  const doHideShare = () => {
    setShowShare(false)
  }

  //页面刷新逻辑
  //step 1, 自动连钱包 。 调用 initDapp
  //step 2, 钱包连接成功之后，查询当前地址是否注册。 监听 dappReady ，调用检查注册
  //step 3, 根据注册状态，初始化body内容。

  useEffect(() => {
    queryTotalData();
    if (account)
      queryUserData(account)

  }, [registered])

  const copyAccount = () => {
    if (account) {
      copy(account);
      message.success("copy account successfully");
    }
  }

  useEffect(() => {
    //检查用户是否注册
    if (!checkRegister) {
      requestRegistered();
      return;
    }
    queryTotalData();
    if (account)
      queryUserData(account)

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

    queryTotalData();
    if (account)
      queryUserData(account)

  }, [])

  return (
    <div>
      <CommonHeader selectIndex={1}></CommonHeader>

      <div className="wal umipool">
        <div className="container wow fadeInUp">
          <div className="title">Wellcom to Unipool</div>
          <div className="content">
            Only 2.75 million UMI will be mined during UMISAGE.Authorized and started mining to obtain UMI.The Ethereum wallet needs to be installed and authorized to obtain the wallet address to bind a unique identity.
        </div>
        </div>
        <div className="list wow fadeInUp">
          <div className="title">
            <h2><Link to="/sagev2">UNISAGE V2</Link></h2>
          </div>
          <div className="col col-1">
            <ul>
              <li>
                <b>{currentPeriod?.name}</b>
                <div>Period</div>
              </li>
              <li>
                <b>27.5 M</b>
                <div>Total Reserves</div>
              </li>
              <li>
                <b>1 : {currentPeriod?.ratio}</b>
                <div>Real-time Ratio</div>
              </li>
              <li>
                <b>{partnerTotal}</b>
                <div>Participants</div>
              </li>
              <li>
                <b>{formatNumber(investTotal)}</b>
                <div>Total Earned(ETH)</div>
              </li>
              <li>
                <b>{formatNumber(mineTotal)}</b>
                <div>Total Mined(UMI)</div>
              </li>
            </ul>
          </div>
          <div className="msg">
            <p>{formatAddr(account ? account : "")}</p>
            <div className="copybtn" onClick={(e) => {
              copyAccount()
            }} ><img src="/assets/image/img24_4.png" alt="" /></div>
          </div>
          <div className="col">
            <ul>
              <li>
                <b>{partners}</b>
                <div>Partners</div>
              </li>
              <li>
                <b>{formatNumber(userEarn)}</b>
                <div>My Earnings(ETH)</div>
              </li>
              <li>
                <b>{formatNumber(userMine)}</b>
                <div>My Mined(UMI)</div>
              </li>
            </ul>
            <div className="btn">
              <a onClick={(e) => {
                doShowShare();
              }}>Share Code</a>

              <a onClick={() => {
                onCopyLink()
              }}>Copy Link</a>

              <Link to="/sagev2Detail">Dasboard<img src="/assets/image/img42.png" alt="" /></Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-2 wow fadeInUp">
            <div className="title">FIFO mining</div>
            <div className="content">
              Coming Soon...
            </div>
          </div>
          <div className="col-2 wow fadeInUp">
            <div className="title">Custom mining platform</div>
            <div className="content">
              Coming Soon...
            </div>
          </div>
        </div>
      </div>

      <ShareView show={showShare} qrcodeContent={inviterUrl} hideAction={doHideShare}></ShareView>
    </div>
  )
};

export default PoolOpen;

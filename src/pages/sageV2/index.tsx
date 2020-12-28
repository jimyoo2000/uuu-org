import { message, Spin } from 'antd';
import React, { Component, useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { appUrl, sageV2ContractAddr, salePeriodIndex, salePeriodName, salePeriodRatio, salePeriodTotal } from 'src/config/appConfig';
import { UMIDapptContext } from 'src/context/umiDapp';
import { sageV2Contract } from 'src/contract';

import CommonHeader from '../header';
import web3 from '../../utils/web3';
import formatAddr from 'src/utils/format-addr';
import formatNumber from 'src/utils/format-number';
import copy from 'copy-to-clipboard';
import sageMiningPeriod, { MiningPeriodData } from 'src/utils/sage-mining-period';
import ShareView from 'src/components/shareView';
import { sagePaperLink, umiPaperLink } from 'src/config/linkConfig';

function SageV2Index() {

  const { chainIdHex } = useContext(UMIDapptContext)
  const { account } = useContext(UMIDapptContext)

  const { initDapp } = useContext(UMIDapptContext)
  const { dappReady } = useContext(UMIDapptContext)

  const { registered } = useContext(UMIDapptContext)
  const { checkRegister } = useContext(UMIDapptContext)
  const { requestRegistered } = useContext(UMIDapptContext)
  const [loading, setLoading] = useState<boolean>(true);

  //页面数据
  const [mineTotal, setMineTotal] = useState<string>('0')
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

  const doShowShare = () => {
    setShowShare(true)
  }
  const doHideShare = () => {
    setShowShare(false)
  }

  const onCopyLink = () => {
    copy(inviterUrl)
    console.log(inviterUrl);
    message.success("copy successfully");
  }

  //加载数据

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
      console.info("globalInvestAddrCount:" + globalInvestAddrCount);

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

  const caculatePeriod = () => {
    debugger
    let minedTotal = web3.utils.hexToNumber(web3.utils.toHex(mineTotal))

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


  //页面刷新逻辑
  //step 1, 自动连钱包 。 调用 initDapp
  //step 2, 钱包连接成功之后，查询当前地址是否注册。 监听 dappReady ，调用检查注册
  //step 3, 根据注册状态，初始化body内容。

  useEffect(() => {
    queryTotalData();
    if (registered) {
      if (account)
        queryUserData(account)
    } else {
      setLoading(false);
    }


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
    <Spin spinning={loading}>
      <CommonHeader selectIndex={2}></CommonHeader>

      <div className="sage-1">
        <div className="wal">
          <h2 className="wow fadeInUp">
            Only 27.5 million UMI will be mined during UNISAGE & UNISAGE V2.
        </h2>
          <div className="container wow fadeInUp">
            <p>
              Authorized and started mining to obtain UMI.The Ethereum wallet needs to be installed and authorized to obtain the wallet address to bind a unique identity.
            </p>
            <div className="btn">
              <a href={sagePaperLink} target="_blank">What is the UNISAGEV2?<img src="/assets/image/img24_5.png" alt="" /></a>
              <a href={sagePaperLink} target="_blank">How to participate and get benefits<img src="/assets/image/img24_5.png" alt="" /></a>
            </div>
          </div>
          <div className="list wow fadeInUp">
            <ul>
              <li>
                <h3>{partnerTotal}</h3>
                <div>participants</div>
              </li>
              <li>
                <h3>{formatNumber(investTotal)}</h3>
                <div>Total Invest(ETH)</div>
              </li>
              <li>
                <h3>{formatNumber(mineTotal)}</h3>
                <div>Total Mined(UMI)</div>
              </li>
            </ul>
          </div>
          <div className="container2 wow fadeInUp">
            <div className="msg">
              <p>{formatAddr(account ? account : "")}</p>
              <a onClick={(e) => {
                e.preventDefault();
                copyAccount();
              }}><img src="/assets/image/img24_4.png" alt="" /></a>
            </div>
            <div className="row">
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
                {/* <a onClick={() => {
                  doShowShare()
                }}>Invite Code</a>
                <a onClick={() => {
                  onCopyLink()
                }}>Copy Link</a> */}

                <Link to="/sagev2Profit">Profit<img src="/assets/image/img42.png" alt="" /></Link>
                <Link to="/sagev2Detail">Dasboard<img src="/assets/image/img42.png" alt="" /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wal sage-3">
        <div className="container wow fadeInUp">
          <div className="title">Period</div>
          <h3>Mining bonuses :  50%</h3>
          <p>
            When the UMI supply for one period is over, the next period begins.<br />
            Current period: <em>{currentPeriod ? currentPeriod.name : ""}</em>
          </p>
        </div>
        <div className="list wow fadeInUp">
          <ul>
            <li className="li_01">
              <div className="line"></div>
            </li>
            <li className="li_02">
              <div className="line"></div>
            </li>
            <li className="li_03">
              <div className="line"></div>
            </li>
            <li className="li_04">
              <div className="line"></div>
            </li>
          </ul>
          <ul className="ul-1">
            {salePeriodIndex.map((period, index) => {
              return (
                <li key={index}>
                  <dl>
                    <dd>
                      <em>Mine Reserves</em>
                      <span>{salePeriodTotal[period]} UMI</span>
                    </dd>
                    <dd>
                      <em>Reward ratio</em>
                      <span>1ETH : {salePeriodRatio[period]}UMI</span>
                    </dd>
                  </dl>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="wal sage-4">
        <div className="img wow fadeInUp"><img src="/assets/image/img356.png" alt="" /></div>
        <div className="col">
          <div className="title wow fadeInUp">
            <em>About</em>
            <div>What do we do?</div>
          </div>
          <div className="content wow fadeInUp">
            Unimine is the best platform to get started mining cryptocurrency. It is the easiest platform for beginners to easily get into Blockchain.Unimine is the best platform to get started mining cryptocurrency. It is the easiest platform for beginners to easily get into Blockchain.
        </div>
          <div className="msg wow fadeInUp">
            <div className="name">Smart contract</div>
            <p>{sageV2ContractAddr}</p>
          </div>
          <div className="btn wow fadeInUp">
            <a href={sagePaperLink} target="_blank"><em>ABOUT UNISAGE</em><img src="/assets/image/img20.png" alt="" /></a>
            <a href={umiPaperLink} target="_blank"><em>ABOUT UMI-Token</em><img src="/assets/image/img20.png" alt="" /></a>
          </div>
        </div>
      </div>


      <ShareView show={showShare} qrcodeContent={inviterUrl} hideAction={doHideShare}></ShareView>
    </Spin>
  )
};

export default SageV2Index;

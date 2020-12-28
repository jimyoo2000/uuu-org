import React, { useContext, useEffect, useMemo, useState } from 'react'
import { appUrl, sageLevelCount, sagev2LevelPrices } from 'src/config/appConfig';
import { UMIDapptContext } from 'src/context/umiDapp';
import { message, Spin } from 'antd';
import formatAddr from 'src/utils/format-addr';
import copy from 'copy-to-clipboard';
import { sageV2Contract } from 'src/contract';
import formatNumber from 'src/utils/format-number';
import { LevelData } from 'src/interfaces/levelData';
import web3 from '../../utils/web3'
import ShareView from 'src/components/shareView';
import SageV2ItemActive from 'src/components/sagev2ItemActive/sagev2ItemActive';
import CommonHeader from '../header';



function SageV2Detail() {

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

  const [userMine, setUserMine] = useState<string>('0')
  const [userEarn, setUserEarn] = useState<string>('0')
  const [partners, setPartners] = useState<number>(0)
  const [referrer, setReferrer] = useState<string>('0');

  const [sageDataSource, setSageDataSource] = useState<Array<LevelData>>();

  //贡献值
  const [contributionSingle, setContributionSingle] = useState<string>('0');
  const [contributionTotal, setContributionTotal] = useState<string>('0');
  //静态
  const [staticProfitRate, setStaticProfitRate] = useState<number>(0.0);
  const [totalStaticProfit, setTotalStaticProfit] = useState<number>(0.0);
  const [avalableStaticProfit, setAvalableStaticProfit] = useState<number>(0.0);
  const [withdrawStaticProfit, setWithdrawStaticProfit] = useState<number>(0.0);

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


  const copyAccount = () => {
    if (account) {
      copy(account);
      message.success("copy account successfully");
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

        // //提现数据
        // const epochIndex = 0;
        // const epoch = await sageV2Contract.methods
        //   .queryUserEpochInfo(address,epochIndex)
        //   .call()
        // console.info(epoch);
        // const investAmount = epoch.investAmount
        // const lastWithdrawBlock = epoch.lastWithdrawBlock
        // const totalWithdrawAmount = epoch.totalWithdrawAmount
        // caculateProfit(epoch)
        //investAmount uint256, lastWithdrawBlock uint256, totalWithdrawAmount uint256

        //level data
        queryUserSageData(address);
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


  const queryUserSageData = async (address: string) => {
    console.log("getSageData:accountAddress:" + address);
    // address = "0xe9A8ED9b70f594CFaD519e15142CD0A40051DfaF"
    // address = "0x34BB5e4c1366155EB39130De72C51Cf686bCF0aE"
    if (address) {
      try {
        let dataArray = new Array<LevelData>();
        for (var i = 1; i <= sageLevelCount; i++) {
          let levelData = new LevelData();
          levelData.level = i;
          levelData.levelPrice = sagev2LevelPrices[i - 1];
          //active
          const active = await sageV2Contract.methods
            .usersActiveLevels(address, i)
            .call();
          levelData.active = active;
          if (active) {
            //matrix
            const matrix = await sageV2Contract.methods
              .usersMatrix(address, i)
              .call();
            //x3 reward 
            const x3Reward = await sageV2Contract.methods
              .queryUserX3LevelReward(address, i)
              .call();
            //x2 reward 
            const x2Reward = await sageV2Contract.methods
              .queryUserX2LevelReward(address, i)
              .call();

            //x3 mine umi queryUserX3LevelMine
            const x3Mined = await sageV2Contract.methods
              .queryUserX3LevelMine(address, i)
              .call();
            //
            const totalReward = await sageV2Contract.methods
              .queryUserTotalReward(address)
              .call();

            levelData.blcoked = matrix[3]
            levelData.x3matrix = matrix[1].length
            levelData.x2matrix = matrix[2].length
            levelData.x3reopen = matrix[4]
            levelData.x2reopen = matrix[5]
            levelData.x3eth = web3.utils.fromWei(x3Reward)
            levelData.x2eth = web3.utils.fromWei(x2Reward)

            // caculate reopen ， + + levelData.levelPrice/10 为了解决float 除法精度丢失问题
            const x3ethValue = parseFloat(levelData.x3eth) + 0.01;
            // debugger
            const reopen = x3ethValue/(1.6*levelData.levelPrice);
            levelData.x3reopen = Math.floor(reopen);
            
            // levelData.eth = web3.utils.fromWei(totalReward) //web3.utils.fromWei(x3Reward + x2Reward);
            levelData.umi = web3.utils.fromWei(x3Mined)

            // let totalGoalTemp:number;
            let totalEth: number = parseFloat(levelData.x3eth) + parseFloat(levelData.x2eth)
            if (totalEth && totalEth >= 0) {
              levelData.eth = totalEth.toFixed(3)
            } else {
              levelData.eth = "0";
            }


            if (matrix[1].length > 0)
              levelData.x3matrixArray = new Array().concat(matrix[1])
            if (matrix[2].length > 0)
              levelData.x2matrixArray = new Array().concat(matrix[2])
          }

          console.log("LevelData:" + JSON.stringify(levelData))
          dataArray.push(levelData)
        }
        setSageDataSource(dataArray)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error)
      }
    }
  }
  //页面刷新逻辑
  //step 1, 自动连钱包 。 调用 initDapp
  //step 2, 钱包连接成功之后，查询当前地址是否注册。 监听 dappReady ，调用检查注册
  //step 3, 根据注册状态，初始化body内容。

  useEffect(() => {
    if (account && registered)
      queryUserData(account)
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
      queryUserData(account)

  }, [])


  const doBuy = async (level: number, price: number) => {
    if (account) {
      try {
        console.info({
          "message": "doBuy",
          "description": "level=" + level + "\tprice=" + price
        })
        const value = web3.utils.toWei(price + "")
        sageV2Contract.methods
          .buyNewLevel(level)
          .send({
            to: sageV2Contract.options.address,
            from: web3.eth.defaultAccount,
            value: value
          })
          .once('transactionHash', (txHash: string) => {
            message.success("Transaction initialed,wait ethereum confirms")
          })
          .once('receipt', () => {

            message.success({
              message: 'Start level successfully',
            })
          })
          .on('error', (error: Error) => {
            message.error('Error:' + error.message)
            console.error({
              message: 'Start new level fail',
              description: error.message,
            })
          })
      } catch (error) {
        message.error('Error:' + error.message)
        console.error({
          message: 'Buy Error:' + error.name,
          description: error.message
        }
        )
      }
    }
  }

  const doStart = (level: number) => {
    doBuy(level, sagev2LevelPrices[level - 1]);
  }


  return (
    <Spin spinning={loading}>
      <CommonHeader selectIndex={2}></CommonHeader>

      <div className="dashboard-head">
        <div className="wal">
          <div className="title">
            <h2>UNISAGE II</h2>
            <div><em>Instructions</em><img src="/assets/image/img24_3.png" alt="" /></div>
          </div>
          <div className="box">
            <dl>
              <dd><em>My Contribution:</em><b>{contributionSingle}</b></dd>
              <dd><em>Total Contribution:</em><b>{contributionTotal}</b></dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="sagev2_dashboard">
        <div className="wal">
          <div className="title wow fadeInUp"><img src="/assets/image/img805.png" alt="" /></div>
          <div className="container wow fadeInUp">
            <h2>My UNISAGE II</h2>
            <div className="row">
              <div className="col">
                <div>
                  <p>Reffrrer: {formatAddr(referrer ? referrer : "")}</p>
                  <a className="copyBtn" onClick={(e) => {
                    e.preventDefault();
                    copyAccount();
                  }}></a>
                </div>
                <div>
                  <p>Address:{formatAddr(account ? account : "")}</p>
                </div>
              </div>
              <a className="btn" onClick={() => {
                doShowShare()
              }}>Share</a>
            </div>
          </div>
          <div className="container2 wow fadeInUp">
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
          </div>

          <div className="list">
            <h2 className="wow fadeInUp">slots level</h2>
            <ul>
              {
                sageDataSource ? sageDataSource.map(
                  (levelData, index) => {
                    let ifshow: boolean = true;
                    if (index == 0)
                      ifshow = levelData.active ? false : true;
                    else {
                      ifshow = sageDataSource[index - 1].active && !levelData.active
                    }
                    return (<SageV2ItemActive data={levelData} showStart={ifshow} key={index} startAction={() => {
                      doStart(levelData.level);
                    }} />)
                  }) : <div></div>
              }
            </ul>
          </div>
        </div>
      </div>

      <ShareView show={showShare} qrcodeContent={inviterUrl} hideAction={doHideShare}></ShareView>
    </Spin>
  )
};

export default SageV2Detail;

import React, { useContext, useEffect, useMemo, useState } from 'react'
import { appUrl, sageLevelCount, sageLevelPrices } from 'src/config/appConfig';
import { UMIDapptContext } from 'src/context/umiDapp';
import { message, Spin } from 'antd';
import formatAddr from 'src/utils/format-addr';
import copy from 'copy-to-clipboard';
import { sageContract } from 'src/contract';
import formatNumber from 'src/utils/format-number';
import { LevelData } from 'src/interfaces/levelData';
import SageItemActive from 'src/components/sageItemActive/sageItemActive';
import web3 from '../../utils/web3'
import CommonHeader from '../header';
import ShareView from 'src/components/shareView';

function SageDetail() {

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
        console.log({ "method": "queryUserTotalMine", "params": { "sageAddr": sageContract.options.address, "address": account } })
        const mined = await sageContract.methods.queryUserTotalMine(address).call()

        console.log({ "method": "queryUserTotalReward", "params": { "sageAddr": sageContract.options.address, "address": account } })
        const reward = await sageContract.methods.queryUserTotalReward(address).call()

        console.log({ "method": "users", "params": { "sageAddr": sageContract.options.address, "address": address } })
        const details = await sageContract.methods
          .users(address)
          .call()
        console.info(details);

        setPartners(details.partnersCount)
        setReferrer(details.referrer)
        setUserMine(web3.utils.fromWei(mined))
        setUserEarn(web3.utils.fromWei(reward))

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

    if (address) {
      try {
        let dataArray = new Array<LevelData>();
        for (var i = 1; i <= sageLevelCount; i++) {
          let levelData = new LevelData();
          levelData.level = i;
          levelData.levelPrice = sageLevelPrices[i - 1];
          //active
          const active = await sageContract.methods
            .usersActiveLevels(address, i)
            .call();
          levelData.active = active;
          if (active) {
            //matrix
            const matrix = await sageContract.methods
              .usersMatrix(address, i)
              .call();
            //x3 reward 
            const x3Reward = await sageContract.methods
              .queryUserX3LevelReward(address, i)
              .call();
            //x2 reward 
            const x2Reward = await sageContract.methods
              .queryUserX2LevelReward(address, i)
              .call();

            //x3 mine umi queryUserX3LevelMine
            const x3Mined = await sageContract.methods
              .queryUserX3LevelMine(address, i)
              .call();
            //
            const totalReward = await sageContract.methods
              .queryUserTotalReward(address)
              .call();

            levelData.blcoked = matrix[3]
            levelData.x3matrix = matrix[1].length
            levelData.x2matrix = matrix[2].length
            levelData.x3reopen = matrix[4]
            levelData.x2reopen = matrix[5]
            levelData.x3eth = web3.utils.fromWei(x3Reward)
            levelData.x2eth = web3.utils.fromWei(x2Reward)
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

    if (account)
      queryUserData(account)
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
        sageContract.methods
          .buyNewLevel(level)
          .send({
            to: sageContract.options.address,
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
    doBuy(level, sageLevelPrices[level - 1]);
  }


  return (
    <Spin spinning={loading}>

      <div className="sage_dashboard">
        <div className="wal">
          <div className="title wow fadeInUp"><img src="/assets/image/img805.png" alt="" /></div>
          <div className="container wow fadeInUp">
            <h2>My UNISAGE</h2>
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
            <h2 className="wow fadeInUp">Level Matrix</h2>
            <ul>
              {
                sageDataSource ? sageDataSource.map(
                  (levelData, index) => {
                    let ifshow: boolean = true;
                    if (index == 0)
                      ifshow = levelData.active?false:true;
                    else {
                      ifshow = sageDataSource[index - 1].active && !levelData.active
                    }
                    return (<SageItemActive data={levelData} showStart={ifshow} key={index} startAction={() => {
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

export default SageDetail;

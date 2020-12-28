import { Button, Card, Col, message, notification, Row, Spin, Statistic, Table, Tag } from 'antd';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react'
import { RouteChildrenProps } from 'react-router';
import { sageLevelCount, sageLevelPrices } from '../../config/appConfig';
import { UMIDapptContext } from '../../context/umiDapp';
import { sageContract } from '../../contract';
import web3 from '../../utils/web3';
import DebugHeader from './debugHeader';


class LevelData {
  public level: number;
  public levelPrice: number;
  public active: boolean;
  public blcoked: boolean;
  public x3matrix: number;
  public x2matrix: number;
  public x3reopen: number;
  public x2reopen: number;
  public x3eth: string;
  public x2eth: string;
  public umi: string;

  public x3matrixArray: Array<string>;
  public x2matrixArray: Array<string>;

  constructor() {
    this.level = 0;
    this.levelPrice = 0;
    this.active = false;
    this.blcoked = false;
    this.x3matrix = 0;
    this.x2matrix = 0;
    this.x3reopen = 0;
    this.x2reopen = 0;
    this.x3eth = '0';
    this.x2eth = '0';
    this.umi = '0';
    this.x3matrixArray = new Array<string>();
    this.x2matrixArray = new Array<string>();
  }
}

const SageViewDebug: FC<RouteChildrenProps> = (props) => {

  const [sageDataSource, setSageDataSource] = useState<Array<LevelData>>();
  const [ethGoal, setEthGoal] = useState<string>('0')
  const [umiGoal, setUMIGotal] = useState<string>('0')
  const [partners, setPartners] = useState<number>(0);
  const [referrer, setReferrer] = useState<string>('')

  const [x3Loading, setX3Loading] = useState<boolean>(true)
  const [loadingDetail, setLoadingDetail] = useState<boolean>(true)


  const { chainIdHex } = useContext(UMIDapptContext)
  const { account } = useContext(UMIDapptContext)


  const { initDapp } = useContext(UMIDapptContext)
  const { dappReady } = useContext(UMIDapptContext)

  const { registered } = useContext(UMIDapptContext)
  const { checkRegister } = useContext(UMIDapptContext)
  const { requestRegistered } = useContext(UMIDapptContext)
  const [loading, setLoading] = useState<boolean>(true);


  //页面刷新逻辑
  //step 1, 自动连钱包 。 调用 initDapp
  //step 2, 钱包连接成功之后，查询当前地址是否注册。 监听 dappReady ，调用检查注册
  //step 3, 根据注册状态，初始化body内容。

  useEffect(() => {
    if (!checkRegister) {
      requestRegistered();

      console.log("Register useEffect dappReady requestRegistered");
      return;
    }
  }, [dappReady])

  useEffect(() => {
    //如果钱包没有连接，连接钱包
    console.log("Register useEffect");
    if (!dappReady) {
      initDapp();
      console.log("Register useEffect initDapp");
      return;
    }

    if (!checkRegister) {
      requestRegistered();
      console.log("Register useEffect requestRegistered");
      return;
    }

  }, [])

  const address = JSON.parse(JSON.stringify(props.match?.params)).address;

  const getAccountDetail = async (address: string) => {
    try {

      console.log({ "method": "users", "params": { "sageAddr": sageContract.options.address, "address": address } })

      const details = await sageContract.methods
        .users(address)
        .call()
      console.info(details);


      setReferrer(details.referrer);
      setPartners(details.partnersCount)


      //umi
      const umi = await sageContract.methods
        .queryUserTotalMine(address)
        .call()

      setUMIGotal(web3.utils.fromWei(umi))

      //eth 
      const eth = await sageContract.methods
        .queryUserTotalReward(address)
        .call()
      setEthGoal(web3.utils.fromWei(eth))


      setLoadingDetail(false)
    } catch (error) {
      setLoadingDetail(false)
      message.error(error.description)
      console.log(error)
    }
  }

  const getSageData = async (address: string) => {
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
            levelData.blcoked = matrix[3];
            levelData.x3matrix = matrix[1].length;
            levelData.x2matrix = matrix[2].length;
            levelData.x3reopen = matrix[4];
            levelData.x2reopen = matrix[5];
            levelData.x3eth = web3.utils.fromWei(x3Reward);
            levelData.x2eth = web3.utils.fromWei(x2Reward);
            levelData.umi = web3.utils.fromWei(x3Mined);
            if (matrix[1].length > 0)
              levelData.x3matrixArray = new Array().concat(matrix[1]);
            if (matrix[2].length > 0)
              levelData.x2matrixArray = new Array().concat(matrix[2]);
          }

          console.log("LevelData:" + JSON.stringify(levelData));
          dataArray.push(levelData);
        }
        setSageDataSource(dataArray);
        setX3Loading(false);
      } catch (error) {
        setX3Loading(false);
        console.log(error)
      }
    }
  }



  useMemo(() => {

    if (address) {

      getAccountDetail(address);
      getSageData(address);
    }
  }, [dappReady])

  return (
    <div className="home">
      <DebugHeader />
      <h4>account:{address}</h4>
      <h4>referer:{referrer}</h4>
      <Spin spinning={loadingDetail}>
        <Row>
          <Col span={8}>ETH:{ethGoal}</Col>
          <Col span={8}>UMI:{umiGoal}</Col>
          <Col span={8}>Parnters:{partners}</Col>
        </Row>
      </Spin>


      <Spin spinning={x3Loading}>
        {
          sageLevelPrices.map((levelPrice, index) => {
            return (
              <div key={index}>
                <div
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <Card.Grid style={{
                    width: '50%',
                    textAlign: 'center',
                    height: 40,
                    padding: 4,
                    backgroundColor: '#888888',
                  }}>LV:{sageDataSource ? sageDataSource[index].levelPrice : 0}ETH</Card.Grid>

                  <Card.Grid style={{
                    width: '30%',
                    textAlign: 'center',
                    height: 40,
                    padding: 4,
                    backgroundColor: '#888888',
                  }}>
                    partners:0
              </Card.Grid>
                  <Card.Grid style={{
                    width: '20%',
                    textAlign: 'center',
                    height: 40,
                    padding: 4,
                    backgroundColor: '#888888',
                  }}>
                    disable
                  </Card.Grid>

                  <Card.Grid style={{
                    width: '5%',
                    textAlign: 'center',
                    height: 40,
                    padding: 0
                  }}>x3</Card.Grid>
                  <Card.Grid style={{
                    width: '22%',
                    textAlign: 'center',
                    height: 40,
                    padding: 4
                  }}>eth:{sageDataSource ? sageDataSource[index].x3eth : 0}</Card.Grid>
                  <Card.Grid style={{
                    width: '23%',
                    textAlign: 'center',
                    height: 40,
                    padding: 4
                  }}>umi:{sageDataSource ? sageDataSource[index].umi : 0}</Card.Grid>
                  <Card.Grid style={{
                    width: '25%',
                    textAlign: 'center',
                    height: 40,
                    padding: 4
                  }}>blocked:{sageDataSource ? sageDataSource[index].blcoked ? 'true' : 'false' : 'false'}</Card.Grid>
                  <Card.Grid style={{
                    width: '25%',
                    textAlign: 'center',
                    height: 40,
                    padding: 4
                  }}>reopen:{sageDataSource ? sageDataSource[index].x3reopen : 0}</Card.Grid>

                  <Card.Grid style={{
                    width: '5%',
                    textAlign: 'center',
                    height: 40,
                    padding: 0
                  }}>x2</Card.Grid>
                  <Card.Grid style={{
                    width: '22%',
                    textAlign: 'center',
                    height: 40,
                    padding: 4
                  }}>eth:{sageDataSource ? sageDataSource[index].x2eth : 0}</Card.Grid>
                  <Card.Grid style={{
                    width: '23%',
                    textAlign: 'center',
                    height: 40,
                    padding: 4
                  }}>reopen:{sageDataSource ? sageDataSource[index].x2reopen : 0}</Card.Grid>
                  <Card.Grid style={{
                    width: '25%',
                    textAlign: 'center',
                    height: 40,
                    padding: 4
                  }}>x3-m:{sageDataSource ? sageDataSource[index].x3matrix : 0}</Card.Grid>
                  <Card.Grid style={{
                    width: '25%',
                    textAlign: 'center',
                    height: 40,
                    padding: 4
                  }}>x2-m:{sageDataSource ? sageDataSource[index].x2matrix : 0}</Card.Grid>

                  <Card.Grid style={{
                    width: '100%',
                    textAlign: 'center',
                    height: 40,
                    padding: 4
                  }}>x3-matrix-1:{sageDataSource ? sageDataSource[index].x3matrixArray[0] : 0}</Card.Grid>
                  <Card.Grid style={{
                    width: '100%',
                    textAlign: 'center',
                    height: 40,
                    padding: 4
                  }}>x3-matrix-2:{sageDataSource ? sageDataSource[index].x3matrixArray[1] : 0}</Card.Grid>
                  <Card.Grid style={{
                    width: '100%',
                    textAlign: 'center',
                    height: 40,
                    padding: 4
                  }}>x2-matrix-1:{sageDataSource ? sageDataSource[index].x2matrixArray[0] : 0}</Card.Grid>
                </div>
              </div >
            )
          })
        }
      </Spin >
    </div>
  )
}

export default SageViewDebug

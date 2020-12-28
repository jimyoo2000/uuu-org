import { message, Spin } from 'antd'
import React, { FC, useContext, useEffect, useMemo, useState } from 'react'
import { RouteChildrenProps } from 'react-router'
import { UMIDapptContext } from 'src/context/umiDapp'
import { sageV2Contract } from 'src/contract'
import web3 from 'src/utils/web3'
import { appUrl, env, EnvEnum } from "../../config/appConfig";
import CommonHeader from '../header'


const Register: FC<RouteChildrenProps> = (props) => {

  const { chainIdHex } = useContext(UMIDapptContext)
  const { account } = useContext(UMIDapptContext)


  const { initDapp } = useContext(UMIDapptContext)
  const { dappReady } = useContext(UMIDapptContext)

  const { registered } = useContext(UMIDapptContext)
  const { checkRegister } = useContext(UMIDapptContext)
  const { requestRegistered } = useContext(UMIDapptContext)
  const [loading, setLoading] = useState<boolean>(true);

  const defaultReferrer = JSON.parse(JSON.stringify(props.match?.params)).referrer;
  const [referrerAddress, setReferrerAddress] = useState<string>(defaultReferrer);


  //页面刷新逻辑
  //step 1, 自动连钱包 。 调用 initDapp
  //step 2, 钱包连接成功之后，查询当前地址是否注册。 监听 dappReady ，调用检查注册
  //step 3, 根据注册状态，初始化body内容。

  useEffect(() => {
    if (registered) {
      window.location.href = appUrl + '/registerok/';
    }
    setLoading(false);
  }, [registered])

  useEffect(() => {
    setLoading(false);
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

  const doRegisterV2 = async (referrer: string) => {
    if (referrer) {
      setLoading(true)
      try {
        const valueString = "0.1"
        const value = web3.utils.toWei(valueString)
        sageV2Contract.methods
          .registrationExt(referrer)
          .send({
            to: sageV2Contract.options.address,
            from: web3.eth.defaultAccount,
            value: value
          })
          .once('transactionHash', (txHash: string) => {
            message.success("transaction submit,please wait ethereum confirms");
            setLoading(false)
          })
          .once('receipt', () => {
            message.success("register success!");
          })
          .on('error', (error: Error) => {
            setLoading(false)
            message.error(error.message)
          })

      } catch (error) {
        setLoading(false)
        message.error(error.message);
        console.log(error)

      }
    }
    else {
      setLoading(false)
      setLoading(false)
      message.error('referer address is invalid !');
    }
  }


  const doRegister = (referrer: string) => {
    setLoading(true)
    try {
      if (referrer) {
        const value = web3.utils.toWei("0")
        sageV2Contract.methods
          .registrationForAirdrop(referrer)
          .send({
            from: web3.eth.defaultAccount,
            to: sageV2Contract.options.address,
            value
          })
          .once('transactionHash', (txHash: string) => {
            message.success("transaction submit,please wait ethereum confirms");
            setLoading(false)
          })
          .once('receipt', () => {
            message.success("register success!");
          })
          .on('error', (error: Error) => {
            setLoading(false)
            message.error(error.message)
          })
      } else {
        setLoading(false)
        message.error('referer address is invalid !');
      }

    } catch (error) {
      setLoading(false)
      message.error(error.message);
      console.log(error)
    }
  }

  const onRegister = () => {

    console.info({ "function": "clickRegister", "reffererAddress": referrerAddress })

    if (referrerAddress) {
      doRegisterV2(referrerAddress)
    } else {
      message.error('referer address is invalid !');
    }
  };

  return (
    <Spin spinning={loading}>
      <CommonHeader selectIndex={3}></CommonHeader>

      <div className="wal reg-1">
        <div className="title wow fadeInUp">
          <em></em>
          <div>Registration</div>
          <p>After successful registration, Lv1 in unisage are actived automatically.</p>
        </div>
        <div className="row wow fadeInUp">
          <div className="name">Referrer Address</div>
          <div className="input"><input type="text" defaultValue={defaultReferrer} onChange={(e) => {
            setReferrerAddress(e.target.value);
          }} /></div>
        </div>
        <div className=""></div>
        <div className="submit wow fadeInUp">
          <div><input type="button" value="Register(0.1ETH)" onClick={(e) => {
            onRegister();
          }} /></div>
        </div>
      </div>

      <div className="wal red-2">
        <div className="title wow fadeInUp">Install and use the Ethereum wallet to register.</div>
        <div className="list">
          <ul>
            <li className="wow fadeInUp">
              <div className="ico"><img src="/assets/image/img71_1.png" alt="" /></div>
              <div className="name">Metamask</div>
              <div className="btn">
                <dl>
                  <dd><img src="/assets/image/img28_1.png" alt="" /></dd>
                  <dd><img src="/assets/image/img28_2.png" alt="" /></dd>
                </dl>
                <dl>
                  <dd><img src="/assets/image/img28_3.png" alt="" /></dd>
                  <dd><img src="/assets/image/img28_4.png" alt="" /></dd>
                </dl>
              </div>
              <a href="https://metamask.io/" className="btn"><em>Add to browers</em><img src="/assets/image/img24.png" alt="" /></a>
            </li>
            <li className="wow fadeInUp">
              <div className="ico"><img src="/assets/image/img71_2.png" alt="" /></div>
              <div className="name">Coinbase wallet</div>
              <div className="btn">
                <dl>
                  <dd><img src="/assets/image/img28_2.png" alt="" /></dd>
                </dl>
                <dl>
                  <dd><img src="/assets/image/img28_5.png" alt="" /></dd>
                  <dd><img src="/assets/image/img28_6.png" alt="" /></dd>
                </dl>
              </div>
              <a href="https://wallet.coinbase.com/" className="btn"><em>Download</em><img src="/assets/image/img24.png" alt="" /></a>
            </li>
            <li className="wow fadeInUp">
              <div className="ico"><img src="/assets/image/img71_3.png" alt="" /></div>
              <div className="name">Trustwallet</div>
              <div className="btn">
                <dl>
                  <dd><img src="/assets/image/img28_2.png" alt="" /></dd>
                </dl>
                <dl>
                  <dd><img src="/assets/image/img28_5.png" alt="" /></dd>
                  <dd><img src="/assets/image/img28_6.png" alt="" /></dd>
                </dl>
              </div>
              <a href="https://trustwallet.com/" className="btn"><em>Download</em><img src="/assets/image/img24.png" alt="" /></a>
            </li>
            <li className="wow fadeInUp">
              <div className="ico"><img src="/assets/image/img71_4.png" alt="" /></div>
              <div className="name">imToken</div>
              <div className="btn">
                <dl>
                  <dd><img src="/assets/image/img28_2.png" alt="" /></dd>
                </dl>
                <dl>
                  <dd><img src="/assets/image/img28_5.png" alt="" /></dd>
                  <dd><img src="/assets/image/img28_6.png" alt="" /></dd>
                </dl>
              </div>
              <a href="https://token.im/download" className="btn"><em>Download</em><img src="/assets/image/img24.png" alt="" /></a>
            </li>
          </ul>
        </div>
      </div>
    </Spin>
  )
}

export default Register

import React, { Component, useContext, useEffect, useMemo, useState } from 'react'
import { message } from 'antd';
import { telegramLink, twitterLink } from 'src/config/linkConfig';
import { UMIDapptContext } from 'src/context/umiDapp';
import CommonHeader from '../header';
import { chrismasContract } from 'src/contract'
import web3 from 'src/utils/web3'
import { chrimasContractAddr, chrimasContractScanUrl } from 'src/config/appConfig';


function Chrismas() {

  const { chainIdHex } = useContext(UMIDapptContext)
  const { account } = useContext(UMIDapptContext)


  const { initDapp } = useContext(UMIDapptContext)
  const { dappReady } = useContext(UMIDapptContext)

  const { registered } = useContext(UMIDapptContext)
  const { checkRegister } = useContext(UMIDapptContext)
  const { requestRegistered } = useContext(UMIDapptContext)

  useEffect(() => {
    //如果钱包没有连接，连接钱包
    console.log("Chrismas useEffect");
    if (!dappReady) {
      initDapp();
      console.log("Chrismas useEffect initDapp");
      return;
    }

    if (!checkRegister) {
      requestRegistered();
      console.log("Chrismas useEffect requestRegistered");
      return;
    }

  }, [])

  const onJoin = () => {

    try {
      const value = web3.utils.toWei("0")
      chrismasContract.methods
        .getChrismasAirdrop()
        .send({
          from: web3.eth.defaultAccount,
          to: chrismasContract.options.address,
          value
        })
        .once('transactionHash', (txHash: string) => {
          message.success("transaction submit,please wait ethereum confirms");
        })
        .once('receipt', () => {
          message.success("register success!");
        })
        .on('error', (error: Error) => {
          message.error(error.message)
        })

    } catch (error) {
      message.error(error.message);
      console.log(error)
    }
  }

  return (
    <div>
      <CommonHeader selectIndex={4}></CommonHeader>
      <div className="wal regOk">
        <div className="title wow fadeInUp">
          <em></em>
          <div>Merry Chrismas & Happy New Year</div>
        </div>
        <div className="msg wow fadeInUp">
          {/* <p><em>You will get 50 UMI !</em></p> */}
          <br ></br>
          <p>100,000 UMI will been airdrop during Chrismas(24.12.2020 - 3.1.2021)</p>
          <p>Each new address can reiceive 100 UMI</p>
          <p>Smart Contract:<a href={chrimasContractScanUrl}>{chrimasContractAddr}</a></p>
        </div>
        <div className="btn wow fadeInUp">
          <a onClick={(e) => {
            e.preventDefault();
            onJoin();
          }}>Get UMI</a>
        </div>

        <div className="msg1 wow fadeInUp">
          <p>The UMI token of the airdrop cannot be transferred in the early stage, and can only be transferred after the game is activated.<br />
            Follow our <a href={twitterLink}>Twitter</a> and <a href={telegramLink}>Telegram</a> for the latest information!</p>
        </div>
      </div>

    </div >
  )
};

export default Chrismas;

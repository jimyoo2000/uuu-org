import React, { Component, useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { appUrl } from 'src/config/appConfig';
import { UMIDapptContext } from 'src/context/umiDapp';

import QRCode from 'qrcode.react';
import CommonHeader from '../header';
import copy from "copy-to-clipboard";
import { message } from 'antd';
import { tokenContract } from 'src/contract'
import ShareView from 'src/components/shareView';
import { telegramLink, twitterLink } from 'src/config/linkConfig';

function RegisterOK() {

  const { chainIdHex } = useContext(UMIDapptContext)
  const { account } = useContext(UMIDapptContext)


  const { initDapp } = useContext(UMIDapptContext)
  const { dappReady } = useContext(UMIDapptContext)

  const { registered } = useContext(UMIDapptContext)
  const { checkRegister } = useContext(UMIDapptContext)
  const { requestRegistered } = useContext(UMIDapptContext)

  const [shownShare, setShownShare] = useState<boolean>(false);

  const inviterUrl = useMemo(() => {
    return appUrl + "/register/" + account;
  }, [account])

  //share control
  const [showShare, setShowShare] = useState<boolean>(false);
  const doShowShare = () => {
    setShowShare(true)
  }
  const doHideShare = () => {
    setShowShare(false)
  }


  const registerAddress = useMemo(() => {
    return account;
  }, [account])


  useEffect(() => {
    //如果钱包没有连接，连接钱包
    console.log("Register ok useEffect");
    if (!dappReady) {
      initDapp();
      console.log("Register ok useEffect initDapp");
      return;
    }

    if (!checkRegister) {
      requestRegistered();
      console.log("Register ok useEffect requestRegistered");
      return;
    }

  }, [])

  const onShare = () => {
    doShowShare();
    console.log(inviterUrl);
  }

  const onCopyLink = () => {
    copy(inviterUrl)
    console.log(inviterUrl);
    message.success("copy successfully");
  }

  const [shareCardClassName, setShareCardClassName] = useState<string>("reg-layer");

  useMemo(() => {
    if (shownShare) {
      setShareCardClassName("reg-layer show")
      console.log("ShareCard change show 1");
    } else {
      setShareCardClassName("reg-layer")
      console.log("ShareCard change show 2");
    }
  }, [shownShare])


  return (
    <div>
      <CommonHeader selectIndex={3}></CommonHeader>
      <div className="wal regOk">
        <div className="title wow fadeInUp">
          <em></em>
          <div>Congratulations!</div>
        </div>
        <div className="msg wow fadeInUp">
          {/* <p><em>You will get 50 UMI !</em></p> */}
          <br ></br>
          <p>If the wallet does not show up, please add the UMI Token Contract:</p>
          <p>{tokenContract.options.address}</p>
        </div>
        <div className="btn wow fadeInUp">
          <a onClick={(e) => {
            e.preventDefault();
            onShare();
          }}>Invite Code</a>

          <a onClick={(e) => {
            e.preventDefault();
            onCopyLink();
          }}>Copy Link</a>
        </div>

        <div className="msg1 wow fadeInUp">
          <p>The UMI token of the airdrop cannot be transferred in the early stage, and can only be transferred after the game is activated.<br />
            Follow our <a href={twitterLink}>Twitter</a> and <a href={telegramLink}>Telegram</a> for the latest information!</p>
        </div>
      </div>

      <ShareView show={showShare} qrcodeContent={inviterUrl} hideAction={doHideShare}></ShareView>
    </div >
  )
};

export default RegisterOK;

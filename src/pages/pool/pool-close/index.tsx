import React, { Component, useContext, useEffect, useMemo, useState } from 'react'
import { UMIDapptContext } from 'src/context/umiDapp';
import CommonHeader from 'src/pages/header';


function PoolClose() {

  return (
    <div>
      <CommonHeader selectIndex={2}></CommonHeader>
      <div className="wal umipool">
        <div className="container wow fadeInUp">
          <div className="title">Wellcom to unimine pool</div>
          <div className="content">
            97.5 million UMI will be mined in all the pools.<br/>
            Authorized and started mining to obtain UMI.The Ethereum wallet needs to be installed and authorized to obtain the wallet address to bind a unique identity.
        </div>
        </div>
        <div className="list wow fadeInUp">
          <div className="title">
            <h2>UNISAGE</h2>
          </div>
          <h2>Comming soon</h2>
        </div>
        <div className="row">
          <div className="col-2 wow fadeInUp">
            <div className="title">Liquidity mining</div>
            <div className="content">
              Coming soon
            </div>
          </div>
          <div className="col-2 wow fadeInUp">
            <div className="title">Custom mining platform</div>
            <div className="content">
              Coming soon
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PoolClose;

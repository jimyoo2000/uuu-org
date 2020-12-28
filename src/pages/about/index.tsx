import React from 'react'
import CommonHeader from '../header';

function About() {
  // const clickCertificate = () => {
  //   window.location.href = "/assets/pdf/Unimine_CERT_GS_D.pdf";
  // }

  return (
    <div>
      <CommonHeader selectIndex={4}></CommonHeader>
      <div className="about">
        <div className="wal">
          <div className="title wow fadeInUp">
            <div></div>
            <h2>What’s Unimine.ORG?</h2>
          </div>
          <div className="content wow fadeInUp">
            <p>Unimine.org belongs to the Unimine Foundation, The registered name is Unimine Inc</p>
            <p>In the initial stage, Unimine Foundation will handle all Unimine affairs such as development, operation, promotion, etc. After Phase I Unisage mining technology, Unimine Foundation will launch DAO (Decentralized Autonomous Organization), and all major community affairs will be decided by community voting.</p>
            <p>Unimine's goal is the world's NO.1 DeFi financing startup platform.</p>
          </div>
          <div className="container">
            <div className="logo wow fadeInUp"><img src="/assets/image/img356.png" alt="" /></div>
            <dl className="wow fadeInUp">
              <dd><em>Registered name:</em><b>UNIMINE INC</b></dd>
              <dd><em>Registered ID :</em><b>20201892442</b></dd>
              <dd><em>Country :</em><b>USA</b></dd>
              <dt><a href="https://www.sos.state.co.us/biz/BusinessEntityDetail.do?quitButtonDestination=BusinessEntityResults&nameTyp=ENT&masterFileId=20201892442&entityId2=20201892442&fileId=20201892442&srchTyp=ENTITY" target="_blank">Checkout Company Status</a></dt>
              <dt><a href="/assets/pdf/Unimine_CERT_GS_D.pdf" target="_blank" >Checkout Cetificate</a></dt>
            </dl>
            <div className="img wow fadeInUp"><img src="/assets/image/img700.png" alt="" /></div>
          </div>
          <div className="foot wow fadeInUp">
            *The platform is still in the early stages of development, Pleas use it at your own risk.<br />
              *Any words on this website or lite paper and any other documents do not constitute investment advice.
        </div>
        </div>
      </div>
    </div>
  )
};

export default About;

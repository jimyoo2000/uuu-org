import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { appUrl } from 'src/config/dist/appConfig';
import { umiPaperLink } from 'src/config/linkConfig';
import { UMIDapptContext } from 'src/context/umiDapp';
import CommonHeader from '../header';



function Home() {
  return (
    <div>
      <CommonHeader selectIndex={0}></CommonHeader>

      <div className="landing-1">
        <div className="wal">
          <div className="title wow fadeInUp"><img src="/assets/image/title912.png" alt="" /></div>
          <div className="msg wow fadeInUp">
            Unprecedented mining experience, easily to get
            benefits from the blockchain.
        </div>
          {/* <div className="btn2 wow fadeInUp"><a href={umiPaperLink} target="_blank"><em>Learn more in Lite-Paper</em><img src="/assets/image/img24_5.png" alt=""/></a></div> */}
          <div className="btn wow fadeInUp">
            <a href={umiPaperLink} className="on">LitePaper</a>
            <Link to="/sagev2/" >Unisage</Link><br />
            <Link to="/chrismas/">Chrismas</Link>
          </div>
        </div>
      </div>

      <div className="landing-2">
        <div className="wal">
          <div className="img wow fadeInUp"><img src="/assets/image/img526.png" alt="" /></div>
          <div className="col">
            <div className="title wow fadeInUp">
              <div>whats uminine</div>
              <h2>
                A multi-dimensional decentralized blockchain-mining open platform.
                </h2>
            </div>
            <div className="content wow fadeInUp">
              As we know, YFI provides the aggregation liquidity of De-Fi projects, SUSHI provides the liquidity of DEX. They are creative and successful. Decentralization will be the key point of blockchain, and decentralized mining becomes the most popular trend of blockchain technology and investment.<br />
                      Unimine integrates premium users and outstanding projects by providing diffrent kind of decentralized mining pool. And open the protocol to the developers and project founders.It will be a muli-dimensional platform.
            </div>
            <ul className="wow fadeInUp">
              <li>A decentralized massive data flow platform.</li>
              <li>A decentralized advertising platform.</li>
              <li>A decentralized investment platform.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="landing-3">
        <div className="wal">
          <div className="title wow fadeInUp">
            <div>Features</div>
            <h2>Unimine is the best platform to get started mining cryptocurrency.</h2>
            <p>Unimine is the best platform to get started mining cryptocurrency. It is the easiest platform for beginners to easily get into Blockchain.</p>
          </div>
          <div className="list">
            <ul>
              <li className="wow fadeInUp">
                <div className="box">
                  <div className="ico"><img src="/assets/image/img60_1.png" alt="" /></div>
                  <h3>Pure-Decentralization</h3>
                  <p>All the modules of Unimine are runing on the ethereum network without any centralized services. All the programming are built the smart contract code.</p>
                </div>
              </li>
              <li className="wow fadeInUp">
                <div className="box">
                  <div className="ico"><img src="/assets/image/img60_2.png" alt="" /></div>
                  <h3>Non-KYC</h3>
                  <p>All users are anonymous without KYC.it can protect the privacy of all the participants.</p>
                </div>
              </li>
              <li className="wow fadeInUp">
                <div className="box">
                  <div className="ico"><img src="/assets/image/img60_3.png" alt="" /></div>
                  <h3>Open</h3>
                  <p>Unimine will open the mining protocol api which are the smart constract code of etherum.</p>
                </div>
              </li>
              <li className="wow fadeInUp">
                <div className="box">
                  <div className="ico"><img src="/assets/image/img60_4.png" alt="" /></div>
                  <h3>Instant</h3>
                  <p>Transcations and settlements are finished in every new block. It’s fast and instant.</p>
                </div>
              </li>
              <li className="wow fadeInUp">
                <div className="box">
                  <div className="ico"><img src="/assets/image/img60_5.png" alt="" /></div>
                  <h3>Transparency</h3>
                  <p>The smart contract code is open source. Anyone can see the code and the entire transaction history</p>
                </div>
              </li>
              <li className="wow fadeInUp">
                <div className="box">
                  <div className="ico"><img src="/assets/image/img60_6.png" alt="" /></div>
                  <h3>Governance</h3>
                  <p>UMI is the governance token of unimie, and all the governance functionality are decentralization.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="landing-4">
        <div className="wal">
          <div className="title wow fadeInUp">
            <div>Rounds</div>
            <h2>The Unimine Period</h2>
            <p>This is the development goals for Unimine.More functions and services will be opened at different times.</p>
          </div>
          <div className="list">
            <ul>
              <li className="wow fadeInUp">
                <div className="ico"><img src="/assets/image/stage1.png" alt="" /></div>
                <div className="name">Stage 1</div>
                <h3>classNameic</h3>
                <p>Different classNameic decentralized mining pools will built and opening in this period. Integrating users and building high-yield mining pools are the main missions of this period.Each users can give the suggestions in the community.</p>
              </li>
              <li className="wow fadeInUp">
                <div className="ico"><img src="/assets/image/stage2.png" alt="" /></div>
                <div className="name">Stage 2</div>
                <h3>Open Platform</h3>
                <p>Opening the protocol and api are finished in this period. Developers and project founders can join deeply and build theirselve’s pool. They can create new mining algorithms and new inercations, and also can fork them from the pools online with the ERC20 Token.</p>
              </li>
              <li className="wow fadeInUp">
                <div className="ico"><img src="/assets/image/img_stage3.png" alt="" /></div>
                <div className="name">Stage 3</div>
                <h3>Innovation</h3>
                <p>With the technology and developing of market. More new and creative mining pools will be built in this period. Unimine will provide the most popular and high-yield mining pools in a longtime in the future.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="landing-5">
        <div className="wal">
          <div className="title wow fadeInUp">
            <h2>Get Unimine Token</h2>
            <p>
              UMI is mainly used for platform governance and program execution.It's a completely decentralized governance token. Unimine is a distribution ecology with complete community autonomy.The liquidity provider comes from the community, and the use of liquidity will also be decided by the community through UMI voting.
            </p>
          </div>
          <div className="list">
            <ul>
              <li className="wow fadeInUp"><a href="https://pro.coinbase.com" target="_blank"><img src="/assets/image/img200_1.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://bitfinex.com" target="_blank"><img src="/assets/image/img200_2.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://bitflyer.com" target="_blank"><img src="/assets/image/img200_3.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://binance.com" target="_blank"> <img src="/assets/image/img200_4.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://bitstamp.net" target="_blank"><img src="/assets/image/img200_5.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://ftx.com" target="_blank" ><img src="/assets/image/img200_6.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://kraken.com" target="_blank"><img src="/assets/image/img200_7.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://huobi.com" target="_blank"><img src="/assets/image/img200_8.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://upbit.com" target="_blank"><img src="/assets/image/img200_9.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://okex.com" target="_blank"><img src="/assets/image/img200_10.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://poloniex.com" target="_blank"><img src="/assets/image/img200_11.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://bittrex.com" target="_blank"><img src="/assets/image/img200_12.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://liquid.com" target="_blank"><img src="/assets/image/img200_13.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://pro.btcturk.com" target="_blank"><img src="/assets/image/img200_14.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://indodax.com" target="_blank"><img src="/assets/image/img200_15.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://www.paribu.com" target="_blank"><img src="/assets/image/img200_16.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://zaif.jp" target="_blank"><img src="/assets/image/img200_17.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://bitso.com" target="_blank"><img src="/assets/image/img200_18.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://gate.io" target="_blank"><img src="/assets/image/img200_19.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://gemini.com" target="_blank"><img src="/assets/image/img200_20.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://www.mercadobitcoin.com.br" target="_blank"><img src="/assets/image/img200_21.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://www.korbit.co.kr" target="_blank"><img src="/assets/image/img200_22.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://cex.io" target="_blank"><img src="/assets/image/img200_23.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://wazirx.com" target="_blank"><img src="/assets/image/img200_24.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://www.chiliz.net" target="_blank"><img src="/assets/image/img200_25.png" alt="" /></a></li>
              <li className="wow fadeInUp"><a href="https://www.mexo.io" target="_blank"><img src="/assets/image/img200_26.png" alt="" /></a></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home

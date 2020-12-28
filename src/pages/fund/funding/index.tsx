import { message } from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import { render } from 'react-dom';
import { RouteChildrenProps } from 'react-router';
import { fundContractScanUrl } from 'src/config/appConfig';
import { fundContractAddr } from 'src/config/dist/appConfig';
import { imtokenLink } from 'src/config/dist/linkConfig';
import { coinbaseLink, metamaskLink, sagePaperLink, trustWalletLink } from 'src/config/linkConfig';
import CommonHeader from 'src/pages/header';
import checkDappBrower from 'src/utils/dapp-brower-checker';

interface IPrefundState {
  timer: NodeJS.Timer,
  endTimeStr: string,
  endTime: number,
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  walletBrower: boolean
}

class NullTimer implements NodeJS.Timer {
  public ref: any;
  public unref: any;
  constructor() {

  }

  hasRef() {
    return false;
  }

  refresh() {
    return this;
  }
}

class Funding extends React.Component<RouteChildrenProps, IPrefundState> {

  constructor(props: RouteChildrenProps) {
    super(props);
    this.state = {
      timer: new NullTimer(),
      // 结束时间
      endTimeStr: '2020-11-09 24:00:00',
      endTime: moment('2020-11-09 24:00:00').valueOf(),
      // 显示
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      walletBrower: false
    }
    this.doJoin.bind(this);
  }

  formatNum(value: number) {
    return value < 10 ? `0${value}` : value;
  }

  startTimer() {
    //定时更新当前时间
    this.setState({
      timer: setInterval(() => {

        const now = moment().valueOf();
        const cut = this.state.endTime - now;
        this.setState({
          days: moment.duration(cut).days(),
          hours: moment.duration(cut).hours(),
          minutes: moment.duration(cut).minutes(),
          seconds: moment.duration(cut).seconds(),
        })
      }, 1000)
    })
  }

  componentDidMount() {
    this.startTimer();
    this.setState({
      walletBrower: checkDappBrower()
    })
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({
        timer: new NullTimer(),
      })
    }
  }

  doJoin() {
    message.error("not supported ")
  }

  render() {
    const { days, hours, minutes, seconds, walletBrower } = this.state;

    return (
      <div>

        <CommonHeader selectIndex={1}></CommonHeader>
        <div className="wal fund-1">
          <div className="title wow fadeInUp">
            <h2>
              UMI FIRST PROMOTION
            </h2>
            <p>90,000UMI Limited supply,after that UMI obtained only through mining & exchanges.</p>
          </div>
          <div className="list">
            <div className="col col-1 wow fadeInUp">
              <h3>
                End at 2020-11-09 24:00:00.
            </h3>
              <ul>
                <li>
                  <b id="day">{this.formatNum(days)}</b>
                  <div>Days</div>
                </li>
                <li>
                  <b id="hour">{this.formatNum(hours)}</b>
                  <div>Hours</div>
                </li>
                <li>
                  <b id="minute">{this.formatNum(minutes)}</b>
                  <div>Mins</div>
                </li>
                <li>
                  <b id="second">{this.formatNum(seconds)}</b>
                  <div>Secs</div>
                </li>
              </ul>
            </div>
            <div className="col col-2 wow fadeInUp">
              <h3>
                90,000 UMI were supplied totally.
            </h3>
              <ul>
                <li>
                  <b>000000</b>
                  <div>Amount left now</div>
                </li>
                <li>
                  <b>90000</b>
                  <div>Supply</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="form wow fadeInUp">
            <div className="input"><input type="text" placeholder="" /><em>ETH</em></div>
            <p><em> 1 ETH  = 1500 UMI </em></p>
            <div className="submit"><input type="button" value="JOIN" onClick={(e) => {
              this.doJoin()
            }} /></div>
          </div>

          {
            !walletBrower && (<div className="msg wow fadeInUp">
              <div className="ico"><img src="/assets/image/img85.png" alt="" /></div>
              <p>Install Ethereum wallet to purchase UMI cryptocurrency.</p>
              <p>It’s recommended to use: <a href={metamaskLink} target="_blank">Metamask</a>(Chrome extension & Firefox extension), <a href={imtokenLink} target="_blank">imToken</a>,<a href={trustWalletLink} target="_blank">Trustwallet</a>,<a
                href={coinbaseLink} target="_blank">Coinbase</a> etc.</p>
            </div>)
          }
        </div>

        <div className="wal sage-4 sage-4-2">
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
              <a href={fundContractScanUrl} target="_blank">{fundContractAddr}</a>
            </div>
            <div className="btn wow fadeInUp">
              <a href={sagePaperLink} target="_blank"><em>ABOUT UNISAGE</em><img src="/assets/image/img20.png" alt="" /></a>
              <a href={sagePaperLink} target="_blank"><em>ABOUT UMI-Token</em><img src="/assets/image/img20.png" alt="" /></a>
            </div>
          </div>
        </div>

        <div className="wal fund-2">
          <div className="title wow fadeInUp">Got questions about UMI Token and UMI-fund related questions? We have got answers. Check it out!</div>
          <ul>
            <li className="wow fadeInUp"><a href="">When will UMI Fund sale start?</a></li>
            <li className="wow fadeInUp"><a href="">what is the minimun token purchase amount?</a></li>
            <li className="wow fadeInUp"><a href="">How can I purchase UMI?</a></li>
            <li className="wow fadeInUp"><a href="">Can I purchase UMI using a credit card?</a></li>
            <li className="wow fadeInUp"><a href="">What is the UMI?</a></li>
            <li className="wow fadeInUp"><a href="">What wallet do I need  to store UMI coins?</a></li>
            <li className="wow fadeInUp"><a href="">When and how i will receive purchased UMI?</a></li>
            <li className="wow fadeInUp"><a href="">Why are only 500000 coins available?</a></li>
            <li className="wow fadeInUp"><a href="">what is the minimun token purchase amount?</a></li>
            <li className="wow fadeInUp"><a href="">What are the benefits of UMI Token?</a></li>
          </ul>
        </div>
      </div>
    )
  }
}
export default Funding


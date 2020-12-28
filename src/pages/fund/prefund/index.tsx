import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import { render } from 'react-dom';
import { RouteChildrenProps } from 'react-router';
import { umiPaperLink } from 'src/config/linkConfig';
import CommonHeader from 'src/pages/header';



interface IPrefundState {
  timer: NodeJS.Timer,
  endTimeStr: string,
  endTime: number,
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
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

class Prefund extends React.Component<RouteChildrenProps, IPrefundState> {

  constructor(props: RouteChildrenProps) {
    super(props);
    this.state = {
      timer: new NullTimer(),
      // 结束时间
      endTimeStr: '2020-11-02 24:00:00',
      endTime: moment('2020-11-02 24:00:00').valueOf(),
      // 显示
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  formatNum (value:number) {
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
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({
        timer: new NullTimer(),
      })
    }
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;

    return (
      <div>

        <CommonHeader selectIndex={1}></CommonHeader>

        <div className="wal index-1">
          <div className="title wow fadeInUp">
            <em></em>
            <div>UMI Token presale will land after:</div>
          </div>
          <div className="list">
            <ul className="wow fadeInUp">
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
            {/* <p className="wow fadeInUp">Get 1000.00 UMI per 1.0 Ether,and only 0.5 million UMI will be issued during sales.</p> */}
          </div>
        </div>

        <div className="wal index-2">
          <div className="img wow fadeInUp"><img src="/assets/image/logo_single.png" alt="" /></div>
          <div className="col">
            <div className="title wow fadeInUp">
              <em>About</em>
              <div>What do we do?</div>
            </div>
            <div className="content wow fadeInUp">
              Unimine is the best platform to get started mining cryptocurrency. It is the easiest platform for beginners to easily get into Blockchain.Unimine is the best platform to get started mining cryptocurrency. It is the easiest platform for beginners to easily get into Blockchain.
          </div>
            <div className="btn wow fadeInUp"><a href={umiPaperLink} target="_blank"><em>ABOUT UMI-Token</em><img src="/assets/image/img20.png" alt="" /></a></div>
          </div>
        </div>
      </div>
    )
  }
}
export default Prefund

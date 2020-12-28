import React from 'react'

function Fundend() {

  /**
   * <script type="text/javascript">
          $(function () {
            run('2020/11/18 00:00:00');

        function run(enddate) {
            setInterval(function () {
              dateDif(new Date(enddate).getTime())
            }, 1000)
          }

        function dateDif(enddate) {
            var date = enddate - new Date().getTime();
            var days = date / 1000 / 60 / 60 / 24;
            var daysRound = Math.floor(days);
            var hours = date / 1000 / 60 / 60 - (24 * daysRound);
            var hoursRound = Math.floor(hours);
            var minutes = date / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
            var minutesRound = Math.floor(minutes);
            var seconds = date / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
            var secondsRound = Math.floor(seconds);
            $("#day").text(daysRound);
            $("#hour").text(hoursRound);
            $("#minute").text(minutesRound);
            $("#second").text(secondsRound);
        }
    })
</script>
   */
  return (
    <div>
      <div className="wal index-1">
        <div className="title wow fadeInUp">
          <em>Fund</em>
          <div>Unimine Cryptocurrency Sales Start in:</div>
        </div>
        <div className="list">
          <ul className="wow fadeInUp">
            <li>
              <b id="day">00</b>
              <div>Days</div>
            </li>
            <li>
              <b id="hour">00</b>
              <div>Hours</div>
            </li>
            <li>
              <b id="minute">00</b>
              <div>Mins</div>
            </li>
            <li>
              <b id="second">00</b>
              <div>Secs</div>
            </li>
          </ul>
          <p className="wow fadeInUp">Get 100.00 UMI per Ether,and only 0.5 million UMI will be issued during sales.</p>
        </div>
        <div className="msg wow fadeInUp">
          <div className="ico"><img src="/assets/image/img85.png" alt="" /></div>
          <p>Install Ethereum wallet to purchase UMI cryptocurrency.</p>
          <p>It’s recommended to use: <a href="">Metamask</a>(Chrome extension & Firefox extension), <a href="">imToken</a>,<a href="">Trustwallet</a>,<a
            href="">Coinbase</a> etc.</p>
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
          <div className="btn wow fadeInUp"><a href=""><em>ABOUT UMI-Token</em><img src="/assets/image/img20.png" alt="" /></a></div>
        </div>
      </div>
    </div>
  )
}

export default Fundend

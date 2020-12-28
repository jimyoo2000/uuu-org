import React from 'react'
import { telegramLink, twitterLink, umiPaperLink, youtubeLink } from 'src/config/linkConfig';

/**
 * 推特https://twitter.com/Unimine5
电报https://t.me/unisage
youtube:https://www.youtube.com/channel/UCK-jkj9u8GiZ6N1_685m4Cg
*/

function CommonFooter() {
  return (
    <div className="g-foot">
      <div className="wal">
        <div className="logo"><a href="#/"><img src="/assets/image/ic_logo_footer.png" alt="" /></a></div>
        <div className="share">
          <dl>
            <dd><a href={telegramLink} target="_blank" rel="noopener noreferrer" ><img src="/assets/image/ic_telegram.png" alt="" /></a></dd>
            <dd><a href={twitterLink} target="_blank" rel="noopener noreferrer" ><img src="/assets/image/ic_tw.png" alt="" /></a></dd>
            <dd><a href={youtubeLink} target="_blank" rel="noopener noreferrer" ><img src="/assets/image/ic_ytb.png" alt="" /></a></dd>
          </dl>
          <p><a href="mailto:info@unimine.org" target="_blank">info@unimine.org</a></p>
        </div>
        <div className="list">
          <ul>
            <li>
              <h3><a href="#/">Unimine</a></h3>
              <dl>
                <dd><a href="#/">UMI Token</a></dd>
                {/* <dd><a href="#/">Pre-sale</a></dd> */}
              </dl>
            </li>
            <li>
              <h3><a href="#/pool">Mining Pool</a></h3>
              <dl>
                <dd><a href="#/sagev2">UNISAGE V2</a></dd>
                <dd>Liquidity Mining</dd>
                <dd>Custom Mining Platform</dd>
              </dl>
            </li>
            <li>
              <h3><a>Information</a></h3>
              <dl>
                <dd><a href="#/about" target="_blank"> About</a></dd>
                <dd><a href={umiPaperLink} target="_blank">Lite Paper</a></dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default CommonFooter;

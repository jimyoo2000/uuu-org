import React from 'react'
import { LevelData } from 'src/interfaces/levelData'
import formatNumber from 'src/utils/format-number';

const x3MatrixMap = [0, 1, 2];
const x2MatrixMap = [0, 1];

function SageItemActive({ data, showStart, startAction }: { data: LevelData, showStart: boolean, startAction: () => void }) {

  const levelIcon = [
    "/assets/image/ic_sg_level01.png",
    "/assets/image/ic_sg_level02.png",
    "/assets/image/ic_sg_level03.png",
    "/assets/image/ic_sg_level04.png",
    "/assets/image/ic_sg_level05.png",
    "/assets/image/ic_sg_level06.png",
    "/assets/image/ic_sg_level07.png",
    "/assets/image/ic_sg_level08.png",
    "/assets/image/ic_sg_level09.png",
    "/assets/image/ic_sg_level10.png"];

  const notactiveBody = (
    <li>
      <div className="box wow fadeInUp">
        <div className="level"><img src={levelIcon[data.level - 1]} alt="" /></div>
        {showStart ?
          (<div className="btn" onClick={(e) => {
            e.preventDefault();
            startAction();
          }}><a >Start </a></div>) : <div></div>
        }
      </div>
    </li>
  )
  const activeBody = (<li><div className="box wow fadeInUp">
    <div className="level"><img src={levelIcon[data.level - 1]} alt="" /></div>
    <div className="row">
      <div className="name">
        <dl>
          <dd>
            <b>{formatNumber(data.eth)}</b><em>ETH</em>
          </dd>
          <dd>
            <b>{formatNumber(data.umi)}</b><em>UMI</em>
          </dd>
        </dl>
      </div>
      <div className="info">
        <dl>
          <dd>
            <div><em>x3</em>
              {
                x3MatrixMap.map((value, index) => {
                  return <i key={index} className={index < data.x3matrix ? "on" : ""}></i>
                })
              }
            </div>
            <b>{data.x3reopen}</b>
          </dd>
          <dd>
            <div><em>x2</em>
              {
                x2MatrixMap.map((value, index) => {
                  return <i key={index} className={index < data.x2matrix ? "on" : ""}></i>
                })
              }
            </div>
            <b>{data.x2reopen}</b>
          </dd>
        </dl>
      </div>
    </div>
  </div>
  </li>)

  const body = data.active ? activeBody : notactiveBody;

  return body;
}

export default SageItemActive;
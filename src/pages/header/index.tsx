import React, { useState } from 'react'
import { Link } from 'react-router-dom';


function CommonHeader({
  selectIndex
}: {
  selectIndex: number
}) {

  // const naviData = [
  //   {
  //     title: "Unimine",
  //     ref: "/",
  //   },
  //   {
  //     title: "UMI",
  //     ref: "/umi"
  //   },
  //   {
  //     title: "Pool",
  //     ref: "/pool",
  //     items: [
  //       {
  //         title: "Unisage",
  //         enable: true,
  //         ref: "/sage"
  //       },
  //       {
  //         title: "Liquidity Mining",
  //         enable: false,
  //         ref: "/pool"
  //       }, ,
  //       {
  //         title: "Custom Mining",
  //         enable: false,
  //         ref: "/pool"
  //       }]
  //   },
  //   {
  //     title: "Register",
  //     ref: "/register"
  //   }
  // ]

  const naviData = [
    {
      title: "Unimine",
      ref: "/",
    },
    {
      title: "Pool",
      ref: "/pool"
    },
    {
      title: "Unisage V2",
      ref: "/sagev2"
    },
    {
      title: "Register",
      ref: "/register"
    },
    {
      title: "Chrismas",
      ref: "/chrismas"
    }
  ]

  const [naviClassName, setNaviClassName] = useState<string>("g-head");

  // const [showNavi, setShowNavi] = useState<boolean>(false);
  const toggleNavi = () => {
    if (naviClassName === 'g-head navShow')
      setNaviClassName("g-head");
    else
      setNaviClassName("g-head navShow");
  }

  const showNaviMenu = (show: boolean) => {
    if (show) {
      setNaviClassName("g-head navShow");
    } else {
      setNaviClassName("g-head")
    }
  }

  const clickItem = (index: number) => {
    showNaviMenu(false);
  }

  /**
            <li><Link to="/" className="name">HOME</Link></li>
           <li><Link to="/umi/" className="name">UMI Token</Link></li>
           <li><Link to="/fund/" className="name">Fund</Link></li>
           <li><Link to="/register/" className="name on">register</Link></li>
  */
  return (
    <div>
      <div className="g-headD"></div>

      <div className={naviClassName}>
        <div className="wal">
          <a className="logo"></a>
          <div className="navA" onClick={(e) => {
            // toggleNavi();
            toggleNavi();
          }}> </div>
          <div className="g-nav">
            <ul>
              {naviData.map((navi, index) => {
                return (
                  <li key={index} onClick={(e) => {
                    clickItem(index);
                  }}>
                    <Link to={navi.ref} className={index === selectIndex ? "name on" : "name"}>{navi.title}</Link>
                    {/* {{
                    navi.items ? (<div className="list"> <dl>{navi.items.map((subNavi, subIndex) => {
                      return subNavi ? subNavi.enable ? (<dd key={subIndex}><Link to={subNavi.ref}>{subNavi.title}</Link></dd>) : (<dd>{subNavi.title}</dd>) : (<div></div>)
                    })}</dl></div>) : (<div></div>)
                  }} */}
                  </li>)
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CommonHeader;

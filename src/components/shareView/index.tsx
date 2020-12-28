import React, { useMemo, useState } from 'react'
import QRCode from 'qrcode.react';


function ShareView({ show, qrcodeContent, hideAction }: { show: boolean, qrcodeContent: string, hideAction: () => void }) {

  const [shownClassName, setShownClassName] = useState<string>("reg-layer");

  const hide = () => {
    hideAction();
  }
  useMemo(() => {

    if (show) {
      setShownClassName("reg-layer show");
    } else {
      setShownClassName("reg-layer")
    }
  }, [show])

  return (
    <div className={shownClassName} onClick={(e) => {
      hide();
    }}>
      <div className="container">

        <div className="header">
          <div className="logo"><img src="/assets/image/logo26.png" alt="" /></div>
          <div className="msg">
            The world’s first custom financial mining platform. </div>
        </div>

        <div className="info">
          <h3>Scan the QR code to join UNIMINE.</h3>
          <p>{qrcodeContent}</p>
        </div>

        <div className="ewmcontaner">
          <div className="ewm">
            <QRCode
              value={qrcodeContent}
              size={160} // 二维码的大小
              fgColor="#000000" // 二维码的颜色
              style={{ margin: 'auto' }}
              imageSettings={{ // 二维码中间的logo图片
                src: "/assets/image/logo26.png",
                height: 26,
                width: 26,
                excavate: true, // 中间图片所在的位置是否镂空
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default ShareView;
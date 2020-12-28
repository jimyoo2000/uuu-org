import { Button, Card, Input, Space, Form, Checkbox, Spin, notification } from 'antd'

import React, { useContext, useEffect, useState } from 'react'
import { UMIDapptContext } from '../../context/umiDapp'
import { sageContract } from "../../contract";
import web3 from "../../utils/web3";
import DebugHeader from './debugHeader';

function ReigsterDebug() {

  const { chainIdHex } = useContext(UMIDapptContext)
  const { account } = useContext(UMIDapptContext)


  const { initDapp } = useContext(UMIDapptContext)
  const { dappReady } = useContext(UMIDapptContext)

  const { registered } = useContext(UMIDapptContext)
  const { checkRegister } = useContext(UMIDapptContext)
  const { requestRegistered } = useContext(UMIDapptContext)
  const [loading, setLoading] = useState<boolean>(true);


  //页面刷新逻辑
  //step 1, 自动连钱包 。 调用 initDapp
  //step 2, 钱包连接成功之后，查询当前地址是否注册。 监听 dappReady ，调用检查注册
  //step 3, 根据注册状态，初始化body内容。

  useEffect(() => {
    if (!checkRegister) {
      requestRegistered();

      console.log("Register useEffect dappReady requestRegistered");
      return;
    }
  }, [dappReady])

  useEffect(() => {
    //如果钱包没有连接，连接钱包
    console.log("Register useEffect");
    if (!dappReady) {
      initDapp();
      console.log("Register useEffect initDapp");
      return;
    }

    if (!checkRegister) {
      requestRegistered();
      console.log("Register useEffect requestRegistered");
      return;
    }

  }, [])

  //加载
  const [registerLoading, setRegisterLoading] = useState<boolean>(false)

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 0,
      span: 24
    },
  };

  const doRegister = (reffererAddress: string) => {
    setRegisterLoading(true)
    try {
      if (reffererAddress) {
        const value = web3.utils.toWei("0")
        sageContract.methods
          .registrationForAirdrop(reffererAddress)
          .send({
            from: web3.eth.defaultAccount,
            to: sageContract.options.address,
            value
          })
          .once('transactionHash', (txHash: string) => {
            notification.success({
              message: 'Update transaction initialed',
              description: `please wait 1 block confirm`,
            })
            setRegisterLoading(false)
          })
          .once('receipt', () => {
            notification.success({
              message: 'Update successfully',
            })
          })
          .on('error', (error: Error) => {
            setRegisterLoading(false)
            notification.error({
              message: 'Update failed',
              description: error.message,
            })
          })
      } else {
        setRegisterLoading(false)
        notification.error({
          message: 'Update failed',
          description: "Invalid upline ID,Please input correct ID",
        })
      }

    } catch (error) {
      setRegisterLoading(false)
      notification.error({
        message: 'Update failed',
        description: error.message,
      })
      console.log(error)
    }
  }

  const onFinish = (values: any) => {
    console.log("values:" + values);
    let reffererAddress = values.inviter;// "0xa46446c1eb7ca5b9bfc32d34d39153a332f9d52b";//values[]
    console.info({ "function": "clickRegister", "reffererAddress": reffererAddress })

    if (reffererAddress) {
      doRegister(reffererAddress)
    } else {
      notification.error({
        message: 'Update failed',
        description: "Invalid upline ID,Please input correct ID",
      })
    }

  };

  return (
    <div className="home">
      <DebugHeader />
      <h1>Register Debug</h1>
      {registered ? (<h2>You have registered</h2>) :

        <Card title="Register" style={{ width: 320 }}>
          <Spin spinning={registerLoading}>
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="inviter"
                name="inviter"
                rules={[
                  {
                    required: true,
                    message: 'Please input inviter address',
                  },
                ]}
              >
                <Input />
              </Form.Item>


              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>With No Inviter</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Register
        </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      }
    </div>
  )
}

export default ReigsterDebug

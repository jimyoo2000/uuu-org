import { Button, Card, Checkbox, Form, Input, notification, Spin } from 'antd'
import React, { useContext, useMemo, useState } from 'react'
import { UMIDapptContext } from '../../context/umiDapp'
import { fundContract } from '../../contract'
import web3 from '../../utils/web3'
import DebugHeader from './debugHeader'

function FundDebug() {

  const { dappReady } = useContext(UMIDapptContext)
  const { chainIdHex } = useContext(UMIDapptContext)
  const { account } = useContext(UMIDapptContext)
  const { registered } = useContext(UMIDapptContext)
  const { initDapp } = useContext(UMIDapptContext)

  //加载
  const [fundLoading, setFundLoading] = useState<boolean>(false)

  const doFund = (ethAmount: string) => {
    setFundLoading(true)
    try {
      const value = web3.utils.toWei(ethAmount)
      fundContract.methods
        .crowSaleExt()
        .send({
          from: web3.eth.defaultAccount,
          to: fundContract.options.address,
          value
        })
        .once('transactionHash', (txHash: string) => {
          notification.success({
            message: 'Update transaction initialed',
            description: `please wait 1 block confirm`,
          })
          setFundLoading(false)
        })
        .once('receipt', () => {
          notification.success({
            message: 'Update successfully',
          })
        })
        .on('error', (error: Error) => {
          setFundLoading(false)
          notification.error({
            message: 'Update failed',
            description: error.message,
          })
        })
    }
    catch (error) {
      setFundLoading(false)
      notification.error({
        message: 'Update failed',
        description: error.message,
      })
      console.log(error)
    }
  }

  const onFinish = (values: any) => {
    console.log("values:" + JSON.stringify(values));
    let ethAmount = values.eth;
    doFund(ethAmount);
  };

  const layout = {
    labelCol: {
      span: 10,
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
  return (
    <div className="home">
      <DebugHeader />

      <h1>Fund Debug</h1>


      <Card title="Fund" style={{ width: 320 }}>
        <Spin spinning={fundLoading}>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="eth amount"
              name="eth"
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'amount must between 0.01ETH and 10ETH '
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Fund
        </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  )
}

export default FundDebug

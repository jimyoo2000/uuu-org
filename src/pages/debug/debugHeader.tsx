import { Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function DebugHeader() {

  return(
    <div style={{
      height: 30,
    }}>
      <Row>
        <Col span={6}><Link to='/debug-register/'> Register</Link><br /></Col>
        <Col span={6}><Link to='/debug-fund/'> Fund</Link><br /></Col>
        <Col span={6}><Link to='/debug-sage/'> Sage</Link><br /></Col>
        <Col span={6}><Link to='/debug-uniswap/'> Uniswap</Link><br /></Col>
      </Row>
    </div>
  )
}

export default DebugHeader

import React from 'react'
import { Link } from 'react-router-dom'
import DebugHeader from './debugHeader'

function DebugHome() {

  return (
    <div className='home'>

      <Link to='/debug-register/'> Register Debug</Link><br />
      <Link to='/debug-fund/'> Fund Debug</Link><br />
      <Link to='/debug-sage/'> Sage Debug</Link><br />
      <Link to='/debug-uniswap/'> Uniswap Debug</Link><br />

    </div>
  )
}

export default DebugHome

import React, { useContext, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Register from './register'
import UMIDapptContextProvider from '../context/umiDapp'
import RegisterOK from './registerDone'
import Home from './home'
import CommonFooter from './footer'
import PoolOpen from './pool/pool-open'
import About from './about'
import SageIndex from './sage'
import SageDetail from './sageDetail'
import SageV2Index from './sageV2'
import SageV2Detail from './sageV2Detail'
import StaticProfit from './profit'


import './App.less'
import Chrismas from './chrismas'

const App: React.FC = (props) => {

  return (
    <div className="App">
      <UMIDapptContextProvider>
        <Switch>
          <Route exact path="/" component={Home} />

          {/* <Route path="/umi" component={Funding} /> */}
          {/* <Route path="/prefund" component={Prefund} /> */}
          {/* <Route path="/fundend" component={Fundend} /> */}

          <Route path="/register/:referrer?" component={Register} />
          <Route path="/registerok/" component={RegisterOK} />

          {/* <Route path="/poolnotopen/" component={PoolClose} /> */}
          <Route path="/pool/" component={PoolOpen} />

          <Route path="/about/" component={About} />

          <Route path="/sage/" component={SageIndex} />
          <Route path="/sageDetail/" component={SageDetail} />

          <Route path="/sagev2/" component={SageV2Index} />
          <Route path="/sagev2Detail/" component={SageV2Detail} />
          <Route path="/sagev2Profit/" component={StaticProfit} />

          <Route path="/chrismas/" component={Chrismas} />

          {/* <Route path="/debug" component={DebugHome} />
          <Route path="/debug-fund" component={FundDebug} />
          <Route path="/debug-sage" component={SageDebug} />
          <Route path="/debug-sageview/:address" component={SageViewDebug} />
          <Route path="/debug-uniswap" component={UniswapDebug} />
          <Route path="/debug-register" component={RegisterDebug} /> */}
          <Redirect to="/404" />
        </Switch>
        <CommonFooter />
      </UMIDapptContextProvider>
    </div>
  )
}

export default App

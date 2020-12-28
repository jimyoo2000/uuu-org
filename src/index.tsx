import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, HashRouter } from 'react-router-dom'
import App from './pages/App'
import Notfound from './pages/error/notfound'

import './index.less'
import './index-phone.less'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/404" component={Notfound} />
      <Route path="/" component={App} />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
)

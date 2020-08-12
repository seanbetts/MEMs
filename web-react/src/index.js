import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Auth0ProviderWithHistory from './auth0-provider-with-history'

import Loading from './components/Loading'
import PrivateRoute from './components/Private-Route'

import './index.css'

import Home from './components/Home'
import UserAccount from './components/UserAccount/UserAccount'
import NotFoundPage from './NotFoundPage'

import registerServiceWorker from './registerServiceWorker'

import { ApolloProvider } from '@apollo/client'
import Client from './components/ApolloClient'

const Main = () => (
  <ApolloProvider client={Client}>
    <div className="App container">
      <div className="jumbotron">
        <Router>
          <Auth0ProviderWithHistory>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/useraccount" component={UserAccount} />
              <Route path="*" component={NotFoundPage} />
              <Redirect to="/404" />
            </Switch>
          </Auth0ProviderWithHistory>
        </Router>
      </div>
    </div>
  </ApolloProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'))
registerServiceWorker()

export { Loading, PrivateRoute }

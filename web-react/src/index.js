import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth0-provider-with-history'

import Loading from './components/Loading';
import PrivateRoute from './components/Private-Route';

import './index.css'

import Home from './components/Home';
import UserAccount from './components/UserAccount/UserAccount';
import MEMsGrid from './components/UserAccount/MemsGrid';
import NotFoundPage from './NotFoundPage';

// import App from './App'
import registerServiceWorker from './registerServiceWorker'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
})

const Main = () => (
  <ApolloProvider client={client}>
    <div className="App container">
      <div className="jumbotron">
        <Router>
          <Auth0ProviderWithHistory>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/useraccount/dashboard" component={UserAccount} />
              <Route exact path="/useraccount/memsgrid" component={MEMsGrid} />
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

export { Loading, PrivateRoute };
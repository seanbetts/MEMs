import React from 'react'
import { useHistory } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = 'mems.eu.auth0.com'
  const clientId = 'w5Gj6j1S4SKDiH3l7CmQqEtXxzxt8xQ0'

  const history = useHistory()

  const onRedirectCallback = () => {
    //(appState)
    history.push('/useraccount') //appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      sameSite="strict"
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory

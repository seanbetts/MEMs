import { ApolloClient, InMemoryCache } from '@apollo/client'

const Client = new ApolloClient({
  uri: `${window.location.protocol}//${window.location.hostname}:7687`,
  cache: new InMemoryCache(),
})

export default Client

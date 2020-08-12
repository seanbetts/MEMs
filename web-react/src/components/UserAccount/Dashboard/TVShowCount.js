import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from '../.././Title'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  navLink: {
    textDecoration: 'none',
  },
})

const GET_COUNT_QUERY = gql`
  {
    tvshowCount
  }
`

export default function TVShowCount() {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_COUNT_QUERY)
  if (error) return <p>Error</p>
  return (
    <React.Fragment>
      <Title>Total TV Shows</Title>
      <Typography component="p" variant="h4">
        {loading ? 'Loading...' : parseInt(data.tvshowCount).toLocaleString()}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        TV shows found
      </Typography>
      <div>View TV shows</div>
    </React.Fragment>
  )
}

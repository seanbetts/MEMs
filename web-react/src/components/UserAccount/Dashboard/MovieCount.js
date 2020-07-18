import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from '../.././Title'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

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
    movieCount
  }
`

export default function Deposits() {
    const classes = useStyles()

    const { loading, error, data } = useQuery(GET_COUNT_QUERY)
    if (error) return <p>Error</p>
    return (
        <React.Fragment>
            <Title>Total Movies</Title>
            <Typography component="p" variant="h4">
                {loading ? 'Loading...' : parseInt(data.movieCount).toLocaleString()}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                movies found
      </Typography>
            <div>
                <Link to="/users" className={classes.navLink}>
                    View movies
        </Link>
            </div>
        </React.Fragment>
    )
}
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
    musicCount
  }
`

export default function Deposits() {
    const classes = useStyles()

    const { loading, error, data } = useQuery(GET_COUNT_QUERY)
    if (error) return <p>Error</p>
    return (
        <React.Fragment>
            <Title>Total Albums</Title>
            <Typography component="p" variant="h4">
                {loading ? 'Loading...' : parseInt(data.musicCount).toLocaleString()}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                albums found
      </Typography>
            <div>
                <Link to="/users" className={classes.navLink}>
                    View albums
        </Link>
            </div>
        </React.Fragment>
    )
}
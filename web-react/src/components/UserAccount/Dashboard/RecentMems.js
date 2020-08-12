import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Title from '../.././Title'

const GET_RECENT_MEMS_QUERY = gql`
  {
    Mem(first: 10, orderBy: date_desc) {
      memID
      mem
      date {
        formatted
        day
        month
        year
      }
      memType
      emoji
      personID @skip(if: false)
      placeID @skip(if: false)
      person {
        nickname
      }
      place {
        place
      }
      music {
        albumArt
      }
      movie {
        poster
      }
      tvshow {
        poster
      }
      game {
        boxArt
      }
    }
  }
`

export default function RecentMems() {
  const { loading, error, data } = useQuery(GET_RECENT_MEMS_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>Recent MEMs</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Feeling</TableCell>
            <TableCell>MEM</TableCell>
            <TableCell>People</TableCell>
            <TableCell>Place</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.Mem.map((row) => (
            <TableRow hover key={row.memID}>
              <TableCell>{row.date.formatted}</TableCell>
              <TableCell>{row.memType}</TableCell>
              <TableCell>{row.emoji}</TableCell>
              <TableCell>{row.mem}</TableCell>
              <TableCell>{row.person.nickname}</TableCell>
              <TableCell>{row.place.place}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

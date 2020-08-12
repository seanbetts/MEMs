import React from 'react'
import _ from 'lodash'
import dateformat from 'dateformat'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@material-ui/lab'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Loading from '../Loading'
import { CssBaseline } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import Theme from '../Theme'

const useStyles = makeStyles(() => ({
  timelineContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    scrollSnapType: 'y mandatory',
    WebkitOverflowScrolling: 'touch',
  },
  monthlyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    scrollSnapAlign: 'start',
  },
  monthlyTitle: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '0px',
    padding: '8px',
    paddingRight: '15px',
    width: '98%',
    borderRadius: '4px',
    backgroundColor: 'black',
    color: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: '20px',
  },
  timelineSeparator: {},
  timelineDot: {
    color: 'black',
    backgroundColor: 'black',
  },
  timelineConnector: {
    backgroundColor: 'black',
  },
  memsImageContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '10vw',
    minWidth: '100px',
    padding: '10px',
  },
  memsImage: {
    width: '10vw',
    minWidth: '100px',
    padding: '10px',
  },
}))

const GET_MEM = gql`
  {
    Mem(orderBy: date_asc) {
      memID
      memType
      date {
        month
        year
      }
      favourite
      public
      event {
        image
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

const MemsLine = () => {
  const classes = useStyles()

  const { loading, data, error } = useQuery(GET_MEM)
  if (loading) return <Loading />
  if (error) return <p style={{ textAlign: 'center' }}>Error</p>

  const orderedMems = _.orderBy(
    data.Mem,
    ['date.year', 'date.month'],
    ['asc', 'asc']
  )
  const memsByMonth = _.groupBy(
    orderedMems,
    (item) => `${item.date.year}-${item.date.month}`
  )
  const memsImages = Object.entries(memsByMonth).map(([key, value]) => [
    key,
    ...value.flatMap(({ event, music, movie, tvshow, game, book }) => [
      ...event.map(({ image }) => `${image}`),
      ...music.map(({ albumArt }) => `${albumArt}`),
      ...movie.map(({ poster }) => `${poster}`),
      ...tvshow.map(({ poster }) => `${poster}`),
      ...game.map(({ boxArt }) => `${boxArt}`),
    ]),
  ])

  return memsImages.map((data, i) => {
    const month = data.shift()

    return (
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <div className={classes.timelineContainer}>
          <div key={i} className={classes.monthlyTitle}>
            {dateformat(month, 'mmmm yyyy').toLowerCase()}
          </div>
          <Timeline align="right" className={classes.monthlyContainer}>
            <TimelineItem>
              <TimelineSeparator className={classes.timelineSeparator}>
                <TimelineDot className={classes.timelineDot} />
                <TimelineConnector className={classes.timelineConnector} />
              </TimelineSeparator>
              {data.map((url, i) => (
                <TimelineContent className={classes.memsImageContainer} key={i}>
                  <img className={classes.memsImage} src={url} alt="MEMs" />
                </TimelineContent>
              ))}
            </TimelineItem>
          </Timeline>
        </div>
      </ThemeProvider>
    )
  })
}

export default MemsLine

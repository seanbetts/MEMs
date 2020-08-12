import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../Loading'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Box,
  Card,
  Avatar,
  CardMedia,
  CardActions,
  TextField,
  IconButton,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import {
  Cake as EventIcon,
  LibraryMusic as MusicIcon,
  Tv as TVIcon,
  LocalMovies as MovieIcon,
  SportsEsports as GameIcon,
  Public as PublicIcon,
  Apps as AppsIcon,
  List as ListIcon,
} from '@material-ui/icons'
import FavoriteIcon from '@material-ui/icons/Favorite'

const useStyles = makeStyles(() => ({
  navLink: {
    color: 'black',
    textDecorationColor: 'black',
  },
  memsGridContainer: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingRight: '50px',
  },
  searchContainer: {
    display: 'flex',
    flexGrow: '4',
    marginLeft: '10px',
    marginRight: '8px',
    marginBottom: '5px',
    paddingTop: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '10px',
    backgroundColor: 'white',
  },
  topBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    width: '99.4%',
  },
  searchInput: {
    width: '97%',
    marginLeft: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  searchIcon: {
    alignSelf: 'flex-end',
    marginBottom: '5px',
  },
  displayContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100px',
    marginLeft: '8px',
    marginBottom: '5px',
    paddingTop: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '10px',
    backgroundColor: 'white',
  },
  card: {
    width: '263px',
    minWidth: '263px',
  },
  cardMedia: {
    margin: 'auto',
    marginTop: '-60px',
    minHeight: '395px',
    zIndex: '-1',
    backgroundSize: 'contain',
  },
  topBar: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: '0px',
    zIndex: '2',
    width: '100%',
    height: '60px',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  avatar: {
    backgroundColor: 'black',
    margin: '7px',
    marginTop: '10px',
  },
  titleText: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    flexGrow: '4',
    justifyContent: 'center',
    width: '180px',
    paddingLeft: '5px',
  },
  emoji: {
    fontSize: '30px',
    verticalAlign: 'middle',
    lineHeight: '2',
    marginTop: '0px',
    marginRight: '7px',
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '-60px',
    marginRight: '-8px',
    paddingLeft: '10px',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  details: {
    margin: '0px',
    textAlign: 'left',
    fontSize: '10px',
    '& p': {
      margin: '0px',
    },
  },
}))

const GET_MEM = gql`
  {
    Mem(memType: "Person", orderBy: date_asc) {
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
      favourite
      public
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

const People = () => {
  const classes = useStyles()
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [filter, setFilter] = useState('')

  // const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //     setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;

  const handleSearchChange = (e) => {
    setFilter(e.target.value)
  }

  const renderAvatar = (memType) => {
    if (memType === 'Music') {
      return <MusicIcon style={{ color: 'white' }} />
    } else if (memType === 'Movie') {
      return <MovieIcon style={{ color: 'white' }} />
    } else if (memType === 'TVShow') {
      return <TVIcon style={{ color: 'white' }} />
    } else if (memType === 'Game') {
      return <GameIcon style={{ color: 'white' }} />
    } else if (memType === 'Event') {
      return <EventIcon style={{ color: 'white' }} />
    }
  }

  const renderPicture = (memType, memID) => {
    if (memType === 'Music') {
      return memID.music.map((albumArt) => albumArt.albumArt).toString()
    } else if (memType === 'Movie') {
      return memID.movie.map((poster) => poster.poster).toString()
    } else if (memType === 'TVShow') {
      return memID.tvshow.map((poster) => poster.poster).toString()
    } else if (memType === 'Game') {
      return memID.game.map((boxArt) => boxArt.boxArt).toString()
    } else if (memType === 'Event') {
      return require('../../img/historyHead.png')
    }
  }

  const renderDetails = (memType, memID) => {
    if (memType === 'Event') {
      return (
        <p>
          with{' '}
          {memID.person.map((person, i, arr) => {
            let divider = i < arr.length - 1 && <span>, </span>
            return (
              <span key={i}>
                {person.nickname}
                {divider}
              </span>
            )
          })}
          <span> at</span>{' '}
          {memID.place.map((place, i) => (
            <span key={i}>{place.place}</span>
          ))}
        </p>
      )
    } else {
    }
  }

  const renderFavourite = (favourite) => {
    if (favourite === true) {
      return (
        <IconButton
          style={{
            margin: '0px',
            padding: '10px',
            marginLeft: '0px',
            color: 'red',
          }}
          aria-label="add to favorites"
        >
          <FavoriteIcon />
        </IconButton>
      )
    } else {
      return (
        <IconButton
          style={{ margin: '0px', padding: '10px', marginLeft: '0px' }}
          aria-label="add to favorites"
        >
          <FavoriteIcon />
        </IconButton>
      )
    }
  }

  const renderPublic = (memPublic) => {
    if (memPublic === true) {
      return (
        <IconButton
          style={{ margin: '0px', padding: '10px', color: 'green' }}
          aria-label="make public"
        >
          <PublicIcon />
        </IconButton>
      )
    } else {
      return (
        <IconButton
          style={{ margin: '0px', padding: '10px' }}
          aria-label="make public"
        >
          <PublicIcon />
        </IconButton>
      )
    }
  }

  // const renderDate = (memID) => {
  //     var date = new Date(Date.UTC({ memID.date.year }, { memID.date.month }, { memID.date.day }, 0, 0, 0))
  //     return date
  // }

  const { loading, data, error } = useQuery(GET_MEM)
  if (loading) return <Loading />
  if (error) return <p style={{ textAlign: 'center' }}>Error</p>

  const getMemsCard = () => {
    return data.Mem.map(
      (memID, i) =>
        memID.mem.toLocaleLowerCase().includes(filter) && (
          <Grid item sm={'auto'} md={'auto'} lg={'auto'} key={i}>
            <Card className={classes.card}>
              <div className={classes.topBar}>
                {
                  <Avatar aria-label="memory" className={classes.avatar}>
                    {renderAvatar(memID.memType)}
                  </Avatar>
                }
                <div className={classes.titleText}>
                  {
                    <span style={{ fontSize: '12px', fontWeight: '550' }}>
                      {memID.person.nickname}
                    </span>
                  }
                  {
                    <span style={{ fontSize: '10px' }}>
                      {memID.date.day}-{memID.date.month}-{memID.date.year}
                    </span>
                  }
                </div>
                {<span className={classes.emoji}>{memID.emoji}</span>}
              </div>
              <>
                {renderPicture(memID.memType, memID) ? (
                  <CardMedia
                    className={classes.cardMedia}
                    image={renderPicture(memID.memType, memID)}
                    style={{ width: '100%' }}
                  />
                ) : (
                  <Loading />
                )}
              </>
              <CardActions
                className={classes.cardActions}
                style={{ justifyContent: 'flex-end' }}
              >
                <div className={classes.details}>
                  {renderDetails(memID.memType, memID)}
                </div>
                {renderFavourite(memID.favourite)}
                {renderPublic(memID.public)}
                {/* <IconButton onClick={handleClick} style={{ margin: "0px", padding: "10px", color: "black" }} aria-label="share">
                            <ShareIcon />
                        </IconButton> */}
              </CardActions>
            </Card>
          </Grid>
        )
    )
  }

  return (
    <Grid
      container
      justify="center"
      spacing={2}
      className={classes.memsGridContainer}
    >
      <div className={classes.topBox}>
        <Box boxShadow={1} borderRadius={4} className={classes.searchContainer}>
          <SearchIcon className={classes.searchIcon} />
          <TextField
            className={classes.searchInput}
            onChange={handleSearchChange}
            label="People search"
            variant="standard"
          />
        </Box>
        <Box
          boxShadow={1}
          borderRadius={4}
          className={classes.displayContainer}
        >
          <AppsIcon fontSize="large" style={{ margin: '8px' }}></AppsIcon>
          <ListIcon fontSize="large" style={{ margin: '8px' }}></ListIcon>
        </Box>
      </div>
      {getMemsCard()}
      {/* <div>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    The content of the Popover.
            </Popover>
            </div> */}
    </Grid>
  )
}

export default People

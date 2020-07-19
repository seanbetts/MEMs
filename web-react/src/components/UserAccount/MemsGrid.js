import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import {
    CircularProgress,
    Grid,
    Box,
    Card,
    CardHeader,
    Avatar,
    CardMedia,
    CardContent,
    CardActions,
    TextField,
    IconButton,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import SearchIcon from "@material-ui/icons/Search";
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Theme from '../Theme';

const useStyles = makeStyles(Theme => ({
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
        width: '87%',
        marginLeft: '10px',
        marginRight: '8px',
        marginBottom: '5px',
        paddingTop: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingBottom: '10px',
        backgroundColor: 'white',

    },
    searchInput: {
        width: '97%',
        marginLeft: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    },
    displayContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '10%',
        marginLeft: '8px',
        marginBottom: '5px',
        paddingTop: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingBottom: '10px',
        backgroundColor: 'white',

    },
    card: {
    },
    cardHeader: {
        paddingTop: '10px',
        paddingLeft: '16px',
        paddingRight: '24px',
        paddingBottom: '5px',
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    avatar: {
        backgroundColor: 'black',
    },
    cardMedia: {
        margin: 'auto',
        marginTop: '-30px',
    },
    cardContent: {
        marginTop: '-136px',
        textAlign: "left",
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingTop: '10px',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: '10px',
    },
    cardActions: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '-60px',
        paddingLeft: '10px',
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    details: {
        margin: '0px',
        textAlign: 'left',
        fontSize: '10px',
        "& p": {
            margin: '0px',
        },
    },
    emoji: {
        fontSize: '30px',
        verticalAlign: 'middle',
        lineHeight: '2',
        marginTop: '-100px',
    },
}))

const GET_MEM = gql`
  {
    Mem(orderBy: date_asc) {
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

const MemsGrid = (props, i) => {

    const classes = useStyles();
    const { history } = props;
    const [filter, setFilter] = useState("");

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    const renderAvatar = (memType) => {
        if ((memType === "Music")) {
            return <MusicIcon style={{ color: 'white' }} />
        } else if ((memType === "Movie")) {
            return <MovieIcon style={{ color: 'white' }} />
        } else if ((memType === "TVShow")) {
            return <TVIcon style={{ color: 'white' }} />
        } else if ((memType === "Game")) {
            return <GameIcon style={{ color: 'white' }} />
        } else if ((memType === "Event")) {
            return <EventIcon style={{ color: 'white' }} />
        }
    }

    const renderPicture = (memType, memID) => {
        if ((memType === "Music")) {
            return ((memID.music.map((albumArt) => (albumArt.albumArt))).toString())
        } else if ((memType === "Movie")) {
            return ((memID.movie.map((poster) => (poster.poster))).toString())
        } else if ((memType === "TVShow")) {
            return ((memID.tvshow.map((poster) => (poster.poster))).toString())
        } else if ((memType === "Game")) {
            return ((memID.game.map((boxArt) => (boxArt.boxArt))).toString())
        } else if ((memType === "Event")) {
            return require('../../img/historyHead.png')
        }
    }

    const renderDetails = (memType, memID) => {
        if ((memType === "Event")) {
            return <p>with {memID.person
                .map((person, i, arr) => {
                    let divider = i < arr.length - 1 && <span>, </span>;
                    return (
                        <span key={i}>
                            {person.nickname}
                            {divider}
                        </span>
                    )
                })}
                <span> at</span> {memID.place
                    .map((place, i) => <span key={i}>{place.place}</span>)}</p>
        } else { }
    }

    const { loading, data, error } = useQuery(GET_MEM)
    if (loading) return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><CircularProgress color="#000000" /> <p style={{ textAlign: "center" }} >Loading...</p></div>
    if (error) return <p style={{ textAlign: "center" }} >Error</p>

    const getMemsCard = (i) => {
        return data.Mem.map((memID, i) => (
            memID.mem.includes(filter) &&
            < Grid item xs={12} sm={4} lg={3} key={i} >
                <Card className={classes.card}>
                    <ThemeProvider theme={Theme}>
                        <CardHeader className={classes.cardHeader}
                            avatar={
                                <Avatar aria-label="memory" className={classes.avatar}>
                                    {renderAvatar(memID.memType)}
                                </Avatar>
                            }
                            action={
                                <span className={classes.emoji}>{memID.emoji}</span>
                            }
                            title={<span style={{ fontSize: '0.5vw', fontWeight: '550' }}>{memID.mem}</span>}
                            subheader={<span style={{ fontSize: '0.4vw' }}>{memID.date.day}-{memID.date.month}-{memID.date.year}</span>}
                        />
                    </ThemeProvider>
                    <CardMedia
                        className={classes.cardMedia}
                        image={renderPicture(memID.memType, memID)}
                        style={{ width: "100%", height: "350px" }}
                    />
                    <CardActions className={classes.cardActions} style={{ justifyContent: 'flex-end' }}>
                        <div className={classes.details}>{renderDetails(memID.memType, memID)}</div>
                        <IconButton style={{ margin: "0px", padding: "10px", marginLeft: "20px" }} aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton style={{ margin: "0px", padding: "10px" }} aria-label="make public">
                            <PublicIcon />
                        </IconButton>
                        <IconButton style={{ margin: "0px", padding: "10px" }} aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid >
        ))
    };

    return (
        <Grid container spacing={2} className={classes.memsGridContainer} key={i}>
            <Box boxShadow={1} borderRadius={4} className={classes.searchContainer}>
                <SearchIcon className={classes.searchIcon} />
                <TextField
                    className={classes.searchInput}
                    onChange={handleSearchChange}
                    label="MEMs search"
                    variant="standard"
                />
            </Box>
            <Box boxShadow={1} borderRadius={4} className={classes.displayContainer}>
                <Link to="/memsgrid" className={classes.navLink}>
                    <AppsIcon fontSize="large" style={{ marginRight: '8px' }}></AppsIcon>
                </Link>
                <Link to="/memslist" className={classes.navLink}>
                    <ListIcon fontSize="large" style={{ marginLeft: '8px' }}></ListIcon>
                </Link>
            </Box>
            {getMemsCard(i)}
        </Grid >
    );
};

export default MemsGrid;

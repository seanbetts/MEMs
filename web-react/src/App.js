import React from 'react'

import { Switch, Route, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Home from './components/Home'
import UserAccount from './components/UserAccount/UserAccount'
import MemsLine from './components/UserAccount/MemsLine'
import MemsGrid from './components/UserAccount/MemsGrid'
import MemsList from './components/UserAccount/MemsList'
import Mems from './components/UserAccount/Mems'
import PeopleGrid from './components/UserAccount/PeopleGrid'
// import PlaceList from './components/UserAccount/MemsList'
// import EventList from './components/UserAccount/MemsList'
// import MusicList from './components/UserAccount/MemsList'
// import MovieList from './components/UserAccount/MemsList'
// import TVShowList from './components/UserAccount/MemsList'
// import GameList from './components/UserAccount/MemsList'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Link as MUILink,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
  ArrowBackIos as ArrowBackIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  History as MemsIcon,
  People as PeopleIcon,
  Place as PlaceIcon,
  Cake as EventIcon,
  LibraryMusic as MusicIcon,
  Tv as TVIcon,
  LocalMovies as MovieIcon,
  SportsEsports as GameIcon,
  Timeline as TimelineIcon,
} from '@material-ui/icons'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MUILink color="inherit" href="https://www.seanbetts.com/">
        MEMs
      </MUILink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const history = createBrowserHistory();

const drawerWidth = 200

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    backgroundColor: 'black',
    color: 'white',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingLeft: '8px',
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  appBarImage: {
    maxHeight: '75px',
    marginLeft: '-40px',
    paddingRight: '20px',
  },
}))

export default function App() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Router history={history}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar style={{ background: '#000000' }}
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" className={classes.navLink}>
              <img
                className={classes.appBarImage}
                src="img/mems-logo.png"
                alt="mems logo"
              />
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ArrowBackIcon style={{ color: 'white' }} />
            </IconButton>
          </div>

          <Divider />
          <List>

            <Link to="/dashboard" className={classes.navLink}>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>

            <Link to="/memsline" className={classes.navLink}>
              <ListItem button>
                <ListItemIcon>
                  <TimelineIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="MemsLine" />
              </ListItem>
            </Link>

            <Link to="/memsgrid" className={classes.navLink}>
              <ListItem button>
                <ListItemIcon>
                  <MemsIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="MEMs" />
              </ListItem>
            </Link>

            <Link to="/events" className={classes.navLink}>
              <ListItem button>
                <ListItemIcon>
                  <EventIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Events" />
              </ListItem>
            </Link>

            <Link to="/people" className={classes.navLink}>
              <ListItem button>
                <ListItemIcon>
                  <PeopleIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="People" />
              </ListItem>
            </Link>

            <Link to="/places" className={classes.navLink}>
              <ListItem button>
                <ListItemIcon>
                  <PlaceIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Places" />
              </ListItem>
            </Link>

            <Link to="/music" className={classes.navLink}>
              <ListItem button>
                <ListItemIcon>
                  <MusicIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Music" />
              </ListItem>
            </Link>

            <Link to="/movies" className={classes.navLink}>
              <ListItem button>
                <ListItemIcon>
                  <MovieIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Movies" />
              </ListItem>
            </Link>

            <Link to="/tvshows" className={classes.navLink}>
              <ListItem button>
                <ListItemIcon>
                  <TVIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="TV Shows" />
              </ListItem>
            </Link>

            <Link to="/games" className={classes.navLink}>
              <ListItem button>
                <ListItemIcon>
                  <GameIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Games" />
              </ListItem>
            </Link>
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/useraccount" component={UserAccount} />
              <Route exact path="/memsline" component={MemsLine} />
              <Route exact path="/memslist" component={MemsList} />
              <Route exact path="/memsgrid" component={MemsGrid} />
              {/* <Route exact path="/mems/:memID" component={Mems} /> */}
              <Route exact path="/people" component={PeopleGrid} />
              {/* <Route exact path="/places" component={PlaceList} />
              <Route exact path="/events" component={EventList} />
              <Route exact path="/music" component={MusicList} />
              <Route exact path="/movies" component={MovieList} />
              <Route exact path="/tvshows" component={TVShowList} />
              <Route exact path="/games" component={GameList} /> */}
            </Switch>

            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </Router >
  )
}

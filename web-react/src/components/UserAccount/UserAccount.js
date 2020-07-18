import React from 'react'
import { Router, Link } from "react-router-dom";
import { createBrowserHistory } from 'history'

import Auth0ProviderWithHistory from '../../auth0-provider-with-history'

import { useModal } from '../UseModal'
import Can from "../../components/Can";
import UserSettings from "./UserSettings";
import Dashboard from "./Dashboard/Dashboard";
import MEMsLine from "./MemsLine";
import MEMsGrid from "./MemsGrid";
import Copyright from "../Copyright";

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
    CssBaseline,
    Drawer,
    Box,
    AppBar,
    Toolbar,
    List,
    Divider,
    IconButton,
    Container,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@material-ui/core'
import {
    ArrowBackIos as ArrowBackIcon,
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    History as MEMsIcon,
    People as PeopleIcon,
    Place as PlaceIcon,
    Cake as EventIcon,
    LibraryMusic as MusicIcon,
    Tv as TVIcon,
    LocalMovies as MovieIcon,
    SportsEsports as GameIcon,
    Timeline as MEMslineIcon,
    Settings as SettingsIcon,
} from '@material-ui/icons'

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

const UserAccount = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }

    const { show: showSettings, RenderModal: RenderSettingsModal } = useModal()
    const { show: showDashboard, RenderModal: RenderDashboardModal } = useModal()
    const { show: showMEMsLine, RenderModal: RenderMEMsLineModal } = useModal()
    const { show: showMEMsGrid, RenderModal: RenderMEMsGridModal } = useModal()
    const { show: showEvents, RenderModal: RenderEventsModal } = useModal()
    const { show: showPeople, RenderModal: RenderPeopleModal } = useModal()
    const { show: showPlaces, RenderModal: RenderPlacesModal } = useModal()
    const { show: showMusic, RenderModal: RenderMusicModal } = useModal()
    const { show: showMovies, RenderModal: RenderMoviesModal } = useModal()
    const { show: showTVShows, RenderModal: RenderTVShowsModal } = useModal()
    const { show: showGames, RenderModal: RenderGamesModal } = useModal()

    return (
        // <AuthConsumer>
        //   {({ user }) => (
        //     <Can
        //       role={user.role}
        //       perform="useraccount:visit"
        //       yes={() => (
        <Router history={history}>
            <Auth0ProviderWithHistory>
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
                                    src="../../img/mems-logo-large.png"
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
                            <ListItem button>
                                <ListItemIcon>
                                    <SettingsIcon onClick={showSettings} style={{ color: 'white' }} />
                                    <RenderSettingsModal>
                                        <UserSettings />
                                    </RenderSettingsModal>
                                </ListItemIcon>
                                <ListItemText primary="Settings" />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <DashboardIcon onClick={showDashboard} style={{ color: 'white' }} />
                                    <RenderDashboardModal>
                                        <Dashboard />
                                    </RenderDashboardModal>
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <MEMslineIcon onClick={showMEMsLine} style={{ color: 'white' }} />
                                    <RenderMEMsLineModal>
                                        <MEMsLine />
                                    </RenderMEMsLineModal>
                                </ListItemIcon>
                                <ListItemText primary="MEMsLine" />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <MEMsIcon onClick={showMEMsGrid} style={{ color: 'white' }} />
                                    <RenderMEMsGridModal>
                                        <MEMsGrid />
                                    </RenderMEMsGridModal>
                                </ListItemIcon>
                                <ListItemText primary="All MEMs" />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <EventIcon onClick={showEvents} style={{ color: 'white' }} />
                                    <RenderEventsModal>
                                        <p>Events</p>
                                    </RenderEventsModal>
                                </ListItemIcon>
                                <ListItemText primary="Events" />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <PeopleIcon onClick={showPeople} style={{ color: 'white' }} />
                                    <RenderPeopleModal>
                                        <p>People</p>
                                    </RenderPeopleModal>
                                </ListItemIcon>
                                <ListItemText primary="People" />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <PlaceIcon onClick={showPlaces} style={{ color: 'white' }} />
                                    <RenderPlacesModal>
                                        <p>Places</p>
                                    </RenderPlacesModal>
                                </ListItemIcon>
                                <ListItemText primary="Places" />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <MusicIcon onClick={showMusic} style={{ color: 'white' }} />
                                    <RenderMusicModal>
                                        <p>Music</p>
                                    </RenderMusicModal>
                                </ListItemIcon>
                                <ListItemText primary="Music" />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <MovieIcon onClick={showMovies} style={{ color: 'white' }} />
                                    <RenderMoviesModal>
                                        <p>Movies</p>
                                    </RenderMoviesModal>
                                </ListItemIcon>
                                <ListItemText primary="Movies" />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <TVIcon onClick={showTVShows} style={{ color: 'white' }} />
                                    <RenderTVShowsModal>
                                        <p>TV Shows</p>
                                    </RenderTVShowsModal>
                                </ListItemIcon>
                                <ListItemText primary="TV Shows" />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <GameIcon onClick={showGames} style={{ color: 'white' }} />
                                    <RenderGamesModal>
                                        <p>Games</p>
                                    </RenderGamesModal>
                                </ListItemIcon>
                                <ListItemText primary="Games" />
                            </ListItem>
                        </List>
                        <Divider />
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Container maxWidth="lg" className={classes.container}>
                            <div id='modal-root' />
                            <Box pt={4}>
                                <Copyright />
                            </Box>
                        </Container>
                    </main>
                </div>
            </Auth0ProviderWithHistory>
        </Router >
        //       )}
        //       no={() => <Redirect to="/" />}
        //     />
        //   )}
        // </AuthConsumer>
    )
}

export default UserAccount
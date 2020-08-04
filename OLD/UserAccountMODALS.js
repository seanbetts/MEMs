import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Logout-Button";
import LoginButton from "../Login-Button";
import { Nav } from "react-bootstrap";
import Modal from "react-modal";

import Auth0ProviderWithHistory from '../../auth0-provider-with-history'

import UserSettings from "./UserSettings";
import Dashboard from "./Dashboard/Dashboard";
import MEMsLine from "./MemsLine";
import MEMsGrid from "./MemsGrid";
import Copyright from "../Copyright";

import { withStyles } from '@material-ui/core/styles'
import {
    Box,
    List,
    Divider,
    Container,
    ListItem,
    ListItemIcon,
} from '@material-ui/core'
import {
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

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    titleBar: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        background: '#000000',
        position: "absolute",
    },
    titleBarImage: {
        marginLeft: '0px',
        marginTop: '7px',
        maxHeight: '75px',
        paddingRight: '20px',
    },
    mainContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
    },
    menuBar: {
        marginTop: '77px',
        position: 'relative',
        whiteSpace: 'nowrap',
        backgroundColor: 'black',
        color: 'white',
        width: '60px',
    },
    content: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexGrow: 5,
        marginTop: '90px',
        height: '92vh',
        padding: '10px',
    },
    modal: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-end',
        height: '91vh',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    navLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    personIcon: {
        background: '#000000',
        display: 'flex',
        flexDirection: 'row',
    },
})

const ActiveDashboardIcon = ({ data }) =>
    <div>
        {data ? data :
            <ListItem button id="dashboardIcon" style={{ backgroundColor: 'black' }}>
                <ListItemIcon>
                    <DashboardIcon style={{ color: 'white' }} />
                </ListItemIcon>
            </ListItem>
        }
    </div>;

class UserAccount extends Component {
    state = {
        dashboardOpened: true,
        memslineOpened: false,
        memsOpened: false,
        eventsOpened: false,
        peopleOpened: false,
        placesOpened: false,
        musicOpened: false,
        moviesOpened: false,
        tvshowsOpened: false,
        gamesOpened: false,
        settingsOpened: false
    };

    openModal = modalType => () => {
        if (modalType === "dashboard") {
            this.setState({
                dashboardOpened: true,
                memslineOpened: false,
                memsOpened: false,
                eventsOpened: false,
                peopleOpened: false,
                placesOpened: false,
                musicOpened: false,
                moviesOpened: false,
                tvshowsOpened: false,
                gamesOpened: false,
                settingsOpened: false
            });
        } else if (modalType === "memsline") {
            this.setState({
                dashboardOpened: false,
                memslineOpened: true,
                memsOpened: false,
                eventsOpened: false,
                peopleOpened: false,
                placesOpened: false,
                musicOpened: false,
                moviesOpened: false,
                tvshowsOpened: false,
                gamesOpened: false,
                settingsOpened: false
            });
        } else if (modalType === "mems") {
            this.setState({
                dashboardOpened: false,
                memslineOpened: false,
                memsOpened: true,
                eventsOpened: false,
                peopleOpened: false,
                placesOpened: false,
                musicOpened: false,
                moviesOpened: false,
                tvshowsOpened: false,
                gamesOpened: false,
                settingsOpened: false
            });
        } else if (modalType === "events") {
            this.setState({
                dashboardOpened: false,
                memslineOpened: false,
                memsOpened: false,
                eventsOpened: true,
                peopleOpened: false,
                placesOpened: false,
                musicOpened: false,
                moviesOpened: false,
                tvshowsOpened: false,
                gamesOpened: false,
                settingsOpened: false
            });
        } else if (modalType === "people") {
            this.setState({
                dashboardOpened: false,
                memslineOpened: false,
                memsOpened: false,
                eventsOpened: false,
                peopleOpened: true,
                placesOpened: false,
                musicOpened: false,
                moviesOpened: false,
                tvshowsOpened: false,
                gamesOpened: false,
                settingsOpened: false
            });
        } else if (modalType === "places") {
            this.setState({
                dashboardOpened: false,
                memslineOpened: false,
                memsOpened: false,
                eventsOpened: false,
                peopleOpened: false,
                placesOpened: true,
                musicOpened: false,
                moviesOpened: false,
                tvshowsOpened: false,
                gamesOpened: false,
                settingsOpened: false
            });
        } else if (modalType === "music") {
            this.setState({
                dashboardOpened: false,
                memslineOpened: false,
                memsOpened: false,
                eventsOpened: false,
                peopleOpened: false,
                placesOpened: false,
                musicOpened: true,
                moviesOpened: false,
                tvshowsOpened: false,
                gamesOpened: false,
                settingsOpened: false
            });
        } else if (modalType === "movies") {
            this.setState({
                dashboardOpened: false,
                memslineOpened: false,
                memsOpened: false,
                eventsOpened: false,
                peopleOpened: false,
                placesOpened: false,
                musicOpened: false,
                moviesOpened: true,
                tvshowsOpened: false,
                gamesOpened: false,
                settingsOpened: false
            });
        } else if (modalType === "tvshows") {
            this.setState({
                dashboardOpened: false,
                memslineOpened: false,
                memsOpened: false,
                eventsOpened: false,
                peopleOpened: false,
                placesOpened: false,
                musicOpened: false,
                moviesOpened: false,
                tvshowsOpened: true,
                gamesOpened: false,
                settingsOpened: false
            });
        } else if (modalType === "games") {
            this.setState({
                dashboardOpened: false,
                memslineOpened: false,
                memsOpened: false,
                eventsOpened: false,
                peopleOpened: false,
                placesOpened: false,
                musicOpened: false,
                moviesOpened: false,
                tvshowsOpened: false,
                gamesOpened: true,
                settingsOpened: false
            });
        } else if (modalType === "settings") {
            this.setState({
                dashboardOpened: false,
                memslineOpened: false,
                memsOpened: false,
                eventsOpened: false,
                peopleOpened: false,
                placesOpened: false,
                musicOpened: false,
                moviesOpened: false,
                tvshowsOpened: false,
                gamesOpened: false,
                settingsOpened: true
            });
        }
    };

    closeModal = modalType => () => {
        if (modalType === "dashboard") {
            this.setState({
                dashboardOpened: false
            });
        } else if (modalType === "memsline") {
            this.setState({
                memslineOpened: false
            });
        } else if (modalType === "mems") {
            this.setState({
                memslineOpened: false
            });
        }
        else if (modalType === "events") {
            this.setState({
                memslineOpened: false
            });
        } else if (modalType === "people") {
            this.setState({
                memslineOpened: false
            });
        } else if (modalType === "places") {
            this.setState({
                memslineOpened: false
            });
        } else if (modalType === "music") {
            this.setState({
                memslineOpened: false
            });
        } else if (modalType === "movies") {
            this.setState({
                memslineOpened: false
            });
        } else if (modalType === "tvshows") {
            this.setState({
                memslineOpened: false
            });
        } else if (modalType === "games") {
            this.setState({
                memslineOpened: false
            });
        } else if (modalType === "settings") {
            this.setState({
                memslineOpened: false
            });
        }
    };

    componentDidMount() {
        this.setState({
            data:
                <ListItem button id="dashboardIcon" style={{ backgroundColor: 'white' }}>
                    <ListItemIcon>
                        <DashboardIcon style={{ color: 'black' }} />
                    </ListItemIcon>
                </ListItem>
        })
    }

    componentWillUnmount() {
        this.setState({
            data:
                <ListItem button id="dashboardIcon" style={{ backgroundColor: 'black' }}>
                    <ListItemIcon>
                        <DashboardIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                </ListItem>
        })
    }

    render() {
        const { dashboardOpened, memslineOpened, memsOpened, eventsOpened, peopleOpened, placesOpened, musicOpened, moviesOpened, tvshowsOpened, gamesOpened, settingsOpened } = this.state;
        const { classes } = this.props

        const AuthNav = () => {
            const { isAuthenticated } = useAuth0();

            return (
                <Nav className="justify-content-end">
                    {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                </Nav>
            );
        };

        const modalStyle = {
            overlay: {
                position: 'absolute',
                top: '95px',
                bottom: '70px',
                left: '50%',
                marginLeft: '35px',
                marginRight: 'auto',
                transform: 'translate(-50%, -0%)',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                maxWidth: '1500px',
                border: 'none',
            },
            content: {
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                padding: '10px',
                maxWidth: '1200px',
                border: 'none',
            }
        };

        return (
            <>
                <Auth0ProviderWithHistory>
                    <div className={classes.root}>
                        <div className={classes.titleBar}>
                            <Link to="/" className={classes.navLink}>
                                <img
                                    className={classes.titleBarImage}
                                    src='https://storage.googleapis.com/mems-images/mems-logo-small-rounded.png'
                                    alt="mems logo"
                                />
                            </Link>
                            <div className={classes.personIcon} style={{ width: '100%', justifyContent: 'flex-end' }}>
                                <AuthNav />
                            </div>
                        </div>

                        <div className={classes.mainContainer}>
                            <List className={classes.menuBar}>
                                <div>
                                    <ActiveDashboardIcon data={this.state.data} onClick={this.openModal("dashboard")} />
                                </div>

                                <ListItem button id="memslineIcon" style={{ backgroundColor: 'black' }}>
                                    <ListItemIcon>
                                        <MEMslineIcon onClick={this.openModal("memsline")} style={{ color: 'white' }} />
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <MEMsIcon onClick={this.openModal("mems")} style={{ color: 'white' }} />
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <EventIcon onClick={this.openModal("events")} style={{ color: 'white' }} />
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <PeopleIcon onClick={this.openModal("people")} style={{ color: 'white' }} />
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <PlaceIcon onClick={this.openModal("places")} style={{ color: 'white' }} />
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <MusicIcon onClick={this.openModal("music")} style={{ color: 'white' }} />
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <MovieIcon onClick={this.openModal("movies")} style={{ color: 'white' }} />
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <TVIcon onClick={this.openModal("tvshows")} style={{ color: 'white' }} />
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <GameIcon onClick={this.openModal("games")} style={{ color: 'white' }} />
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <SettingsIcon onClick={this.openModal("settings")} style={{ color: 'white' }} />
                                    </ListItemIcon>
                                </ListItem>

                            </List>
                            <Divider />
                            <div id="content" className={classes.content}>
                                <div id="modal" className={classes.modal}></div>
                                <Container maxWidth="lg" className={classes.container}>
                                    <Box pt={4}>
                                        <Copyright />
                                    </Box>
                                </Container>
                            </div>
                        </div>
                    </div>

                    <Modal
                        isOpen={dashboardOpened}
                        onRequestClose={this.closeModal("dashboard")}
                        parentSelector={() => document.querySelector('#modal')}
                        shouldFocusAfterRender={false}
                        style={modalStyle}
                        ariaHideApp={false}
                        contentLabel={"dashboard"}
                    >
                        <Dashboard />
                    </Modal>

                    <Modal
                        isOpen={memslineOpened}
                        onRequestClose={this.closeModal("memsline")}
                        parentSelector={() => document.querySelector('#modal')}
                        shouldFocusAfterRender={false}
                        style={modalStyle}
                        ariaHideApp={false}
                        contentLabel={"memsline"}
                    >
                        <MEMsLine />
                    </Modal>

                    <Modal
                        isOpen={memsOpened}
                        onRequestClose={this.closeModal("mems")}
                        parentSelector={() => document.querySelector('#modal')}
                        shouldFocusAfterRender={false}
                        style={modalStyle}
                        ariaHideApp={false}
                        contentLabel={"mems"}
                    >
                        <MEMsGrid />
                    </Modal>

                    <Modal
                        isOpen={eventsOpened}
                        onRequestClose={this.closeModal("events")}
                        parentSelector={() => document.querySelector('#modal')}
                        shouldFocusAfterRender={false}
                        style={modalStyle}
                        ariaHideApp={false}
                        contentLabel={"events"}
                    >
                        <h2>Events</h2>
                    </Modal>

                    <Modal
                        isOpen={peopleOpened}
                        onRequestClose={this.closeModal("people")}
                        parentSelector={() => document.querySelector('#modal')}
                        shouldFocusAfterRender={false}
                        style={modalStyle}
                        ariaHideApp={false}
                        contentLabel={"people"}
                    >
                        <h2>People</h2>
                    </Modal>

                    <Modal
                        isOpen={placesOpened}
                        onRequestClose={this.closeModal("places")}
                        parentSelector={() => document.querySelector('#modal')}
                        shouldFocusAfterRender={false}
                        style={modalStyle}
                        ariaHideApp={false}
                        contentLabel={"places"}
                    >
                        <h2>Places</h2>
                    </Modal>

                    <Modal
                        isOpen={musicOpened}
                        onRequestClose={this.closeModal("music")}
                        parentSelector={() => document.querySelector('#modal')}
                        shouldFocusAfterRender={false}
                        style={modalStyle}
                        ariaHideApp={false}
                        contentLabel={"music"}
                    >
                        <h2>Music</h2>
                    </Modal>

                    <Modal
                        isOpen={moviesOpened}
                        onRequestClose={this.closeModal("movies")}
                        parentSelector={() => document.querySelector('#modal')}
                        shouldFocusAfterRender={false}
                        style={modalStyle}
                        ariaHideApp={false}
                        contentLabel={"movies"}
                    >
                        <h2>Movies</h2>
                    </Modal>

                    <Modal
                        isOpen={tvshowsOpened}
                        onRequestClose={this.closeModal("tvshows")}
                        parentSelector={() => document.querySelector('#modal')}
                        shouldFocusAfterRender={false}
                        style={modalStyle}
                        ariaHideApp={false}
                        contentLabel={"tv shows"}
                    >
                        <h2>TV Shows</h2>
                    </Modal>

                    <Modal
                        isOpen={gamesOpened}
                        onRequestClose={this.closeModal("games")}
                        parentSelector={() => document.querySelector('#modal')}
                        shouldFocusAfterRender={false}
                        style={modalStyle}
                        ariaHideApp={false}
                        contentLabel={"games"}
                    >
                        <h2>Games</h2>
                    </Modal>

                    <Modal
                        isOpen={settingsOpened}
                        onRequestClose={this.closeModal("settings")}
                        parentSelector={() => document.querySelector('#modal')}
                        shouldFocusAfterRender={false}
                        style={modalStyle}
                        ariaHideApp={false}
                        contentLabel={"settings"}
                    >
                        <UserSettings />
                    </Modal>

                </Auth0ProviderWithHistory>
            </>
        )
    }
}

export default withStyles(useStyles)(UserAccount)
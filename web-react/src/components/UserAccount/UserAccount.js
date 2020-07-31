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
import Events from "./Events";
import People from "./People";
import Places from "./Places";
import Music from "./Music";
import Movies from "./Movies";
import TVShows from "./TVShows";
import Games from "./Games";
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
    Timeline as MEMsLineIcon,
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

const activeModal = [
    { modalName: 'dashboard', modal: Dashboard, active: true, icon: DashboardIcon, iconColor: 'black', iconBackground: 'white' },
    { modalName: 'memsline', modal: MEMsLine, active: false, icon: MEMsLineIcon, iconColor: 'white', iconBackground: 'black' },
    { modalName: 'mems', modal: MEMsGrid, active: false, icon: MEMsIcon, iconColor: 'white', iconBackground: 'black' },
    { modalName: 'events', modal: Events, active: false, icon: EventIcon, iconColor: 'white', iconBackground: 'black' },
    { modalName: 'people', modal: People, active: false, icon: PeopleIcon, iconColor: 'white', iconBackground: 'black' },
    { modalName: 'places', modal: Places, active: false, icon: PlaceIcon, iconColor: 'white', iconBackground: 'black' },
    { modalName: 'music', modal: Music, active: false, icon: MusicIcon, iconColor: 'white', iconBackground: 'black' },
    { modalName: 'movies', modal: Movies, active: false, icon: MovieIcon, iconColor: 'white', iconBackground: 'black' },
    { modalName: 'tvshows', modal: TVShows, active: false, icon: TVIcon, iconColor: 'white', iconBackground: 'black' },
    { modalName: 'games', modal: Games, active: false, icon: GameIcon, iconColor: 'white', iconBackground: 'black' },
    { modalName: 'settings', modal: UserSettings, active: false, icon: SettingsIcon, iconColor: 'white', iconBackground: 'black' }
]

class UserAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeModal,
        };
    }

    // UPDATE - set specific modal active property to TRUE, iconColor to 'black' and iconBackground to 'white'
    openModal = modalType => () => {
        this.setState(state => {
            const updatedActiveModal = state.activeModal.map(item => {
                if (item.active === true) {
                    return {
                        modalName: item.modalName,
                        modal: item.modal,
                        active: false,
                        icon: item.icon,
                        iconColor: 'white',
                        iconBackground: 'black'
                    };
                } else if (item.modalName === modalType) {
                    return {
                        modalName: item.modalName,
                        modal: item.modal,
                        active: true,
                        icon: item.icon,
                        iconColor: 'black',
                        iconBackground: 'white'
                    };
                } else {
                    return item;
                }
            });
            return {
                activeModal: updatedActiveModal,
            };
        });
    };

    // UPDATE  - set all active properties to FALSE, all iconColors to 'white' and iconBackgrounds to 'black'
    closeModal = modalType => () => {
        this.setState(state => {
            const updatedActiveModal = state.activeModal.map(item => {
                if (item.active === true) {
                    return {
                        modalName: item.modalName,
                        modal: item.modal,
                        active: false,
                        icon: item.icon,
                        iconColor: 'white',
                        iconBackground: 'black'
                    };
                } else {
                    return item;
                }
            });
            return {
                activeModal: updatedActiveModal,
            };
        });
    };

    render() {
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

        const displayModal =
            this.state.activeModal.filter(item => {
                return item.active === true
            });

        const DisplayModalType = displayModal[0].modal

        const displayButtons = this.state.activeModal.map((item, index) => {
            const DisplayModalType = item.icon;
            const buttonID = item.modalName;
            const backgroundColor = item.iconBackground;
            const iconColor = item.iconColor;

            return (
                <div key={index}>
                    <ListItem button id={buttonID} style={{ backgroundColor: backgroundColor }}>
                        <ListItemIcon>
                            <DisplayModalType onClick={this.openModal(buttonID)} style={{ color: iconColor }} />
                        </ListItemIcon>
                    </ListItem>
                </div>
            );
        });

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
                                {displayButtons}
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
                        isOpen={true}
                        onRequestClose={this.closeModal(displayModal[0].modalName)}
                        parentSelector={() => document.querySelector('#modal')}
                        shouldFocusAfterRender={false}
                        style={modalStyle}
                        ariaHideApp={false}
                        contentLabel={displayModal[0].modalName}
                    >
                        <DisplayModalType />
                    </Modal>

                </Auth0ProviderWithHistory>
            </>
        )
    }
}

export default withStyles(useStyles)(UserAccount)
import React from 'react'
import { Nav } from "react-bootstrap";

import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logout-Button";
import LoginButton from "./Login-Button";
import Loading from "./Loading";
import Copyright from "./Copyright";

import { makeStyles } from '@material-ui/core/styles'
import {
    CssBaseline,
    Box,
    AppBar,
    Container,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        background: '#000000',
        paddingTop: '10px',
        paddingRight: '-20px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    personIcon: {
        background: '#000000',
        paddingTop: '10px',
        paddingRight: '-20px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        background: '#000000',
        color: '#FFFFFF'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    logo: {
        maxHeight: '10vw',
        marginTop: '-3vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        flexWrap: 'nowrap',
    },
    strap: {
        position: 'relative',
        marginTop: '-3vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        flexWrap: 'nowrap',
        color: 'white',
    },
    coming: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        color: 'white',
    },
}))

export default function Home() {
    const classes = useStyles()

    const AuthNav = () => {
        const { isAuthenticated } = useAuth0();

        return (
            <Nav className="justify-content-end">
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </Nav>
        );
    };

    const { isLoading } = useAuth0();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar className={classes.appBar}>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.personIcon}>
                    <AuthNav />
                </div>
                <div id="logo">
                    <img
                        className={classes.logo}
                        src="img/mems-logo.png"
                        alt="mems logo"
                    />
                </div>
                <div id="strap" className={classes.strap}>
                    <p>Memories are precious. Don't lose them.</p>
                </div>
                <div id="coming" className={classes.coming}>
                    <h2>New website coming soon...</h2>
                </div>
                <Container maxWidth="lg" className={classes.container}>
                    <Box pt={4} >
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    )
};
import React from 'react'

import { Container, Row, Col } from "react-bootstrap";

import { useAuth0 } from "@auth0/auth0-react";

import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export default function UserSettings() {

    const { user } = useAuth0();
    const { nickname, name, picture, email, updated_at, email_verified, sub } = user;

    const theme = useTheme()

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
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
        profileContainer: {
            display: 'flex',
            flexDirection: 'row',
            paddingTop: '20px',
            paddingBottom: '20px',
        },
        profile: {
            borderRadius: '50%',
            maxWidth: '200px',
            marginLeft: '30px',
            marginRight: '30px',
        },
    }))

    const classes = useStyles(theme)

    return (
        <>
            <Grid container spacing={4}>
                {/* Profile */}
                <Grid item xs={12}>
                    <Paper>
                        <Container className={classes.profileContainer}>
                            <Row className="align-items-center profile-header mb-5 text-center text-md-left">
                                <Col md={2}>
                                    <img
                                        src={picture}
                                        alt="Profile"
                                        className={classes.profile}
                                    />
                                </Col>
                                <Col md>
                                    <h2 style={{ textAlign: 'center' }}>{nickname}</h2>
                                </Col>
                            </Row>
                            <Row>
                                <p><strong>Name: </strong>{name}</p>
                                <p><strong>Profile Last Updated: </strong>{updated_at}</p>
                                <p><strong>Email: </strong>{email}</p>
                                <p><strong>Email Verified: </strong>{email_verified ? 'Yes' : 'No'}</p>
                                <p><strong>ID: </strong>{sub}</p>
                                <p></p>
                                {/* <p>{JSON.stringify(user, null, 2)}</p> */}
                            </Row>
                        </Container>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
};
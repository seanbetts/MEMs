import React from 'react'
import { Link } from "react-router-dom"
import Copyright from './components/Copyright'

import { makeStyles } from '@material-ui/core/styles'
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link as MUILink,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  userIcon: {
    fontSize: '45px',
  },
  content: {
    paddingTop: '20px',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  navLink: {
  },
  appBarImage: {
    maxHeight: '75px',
    marginLeft: '0px',
    paddingRight: '20px',
  },
  elephant: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '20px',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default function NotFoundPage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{ background: '#000000' }}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={classes.navLink}>
            <img
              className={classes.appBarImage}
              src="img/mems-logo.png"
              alt="mems logo"
            />
          </Link>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <img
          className={classes.elephant}
          src='https://storage.googleapis.com/mems-images/elephant.png'
          alt='Elephant'
        />
        <h2 style={{ textAlign: "center" }}>Uh Oh....</h2>
        <p style={{ textAlign: "center" }}>It seems like we've forgotten something</p>
        <p style={{ textAlign: "center" }}><Link to="/">Go Home </Link></p>
        <Container maxWidth="lg" className={classes.container}>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  )
}
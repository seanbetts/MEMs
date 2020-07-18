import React from 'react'

import LogoutButton from "../Logout-Button";
import Profile from "../Profile";

import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

export default function UserSettings() {

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
    }))

    const classes = useStyles(theme)
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    return (
        <>
            <Grid container spacing={4}>
                {/* Profile */}
                <Grid item xs={12}>
                    <Paper>
                        <Profile />
                        <LogoutButton />
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
};
import React from 'react'

import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import MemCount from './MemCount'
import PeopleCount from './PeopleCount'
import PlaceCount from './PlaceCount'
import MusicCount from './MusicCount'
import MovieCount from './MovieCount'
import TVShowCount from './TVShowCount'
import GameCount from './GameCount'
import RecentMems from './RecentMems'

export default function Dashboard() {

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
                {/* Mem Count */}
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={fixedHeightPaper}>
                        <MemCount />
                    </Paper>
                </Grid>
                {/* People Count */}
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={fixedHeightPaper}>
                        <PeopleCount />
                    </Paper>
                </Grid>
                {/* Place Count */}
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={fixedHeightPaper}>
                        <PlaceCount />
                    </Paper>
                </Grid>
                {/* Music Count */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <MusicCount />
                    </Paper>
                </Grid>
                {/* Movie Count */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <MovieCount />
                    </Paper>
                </Grid>
                {/* TV Show Count */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <TVShowCount />
                    </Paper>
                </Grid>
                {/* Game Count */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <GameCount />
                    </Paper>
                </Grid>
                {/* Recent Mems */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <RecentMems />
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
};
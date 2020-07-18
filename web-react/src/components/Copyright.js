import React from 'react'
import { Typography, Link as MUILink, } from '@material-ui/core'

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

export default Copyright
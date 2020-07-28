import React from 'react'
import { Link as MUILink, } from '@material-ui/core'

function Copyright() {
    return (
        <div style={{ width: "100%", color: "black", fontSize: "13px", textAlign: "center" }} >
            {'Copyright © '}
            <MUILink color="inherit" href="https://www.mems.life/">
                MEMs
      </MUILink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </div>
    )
}

export default Copyright
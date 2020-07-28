import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
    ListItem,
    ListItemIcon,
} from '@material-ui/core'

import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

const LogoutButton = () => {
    const { user, logout } = useAuth0();
    const { picture } = user;

    const theme = useTheme()

    const useStyles = makeStyles((theme) => ({
        profileImage: {
            borderRadius: '50%',
            maxWidth: '50px',
            marginLeft: '30px',
            marginRight: '30px',
        },
    }))

    const classes = useStyles(theme)

    return (
        <ListItem button>
            <ListItemIcon>
                <img
                    src={picture}
                    alt="Profile"
                    className={classes.profileImage}
                    onClick={() => logout({ returnTo: window.location.origin, })}
                />
            </ListItemIcon>
        </ListItem>
    );
};

export default LogoutButton;
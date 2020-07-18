import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
    ListItem,
    ListItemIcon,
} from '@material-ui/core'
import {
    Person as PersonIcon,
} from '@material-ui/icons'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <ListItem button>
            <ListItemIcon>
                <PersonIcon
                    style={{ color: 'white', fontSize: '3em' }}
                    onClick={() => loginWithRedirect()}
                    variant="primary"
                    className="btn-margin"
                />
            </ListItemIcon>
        </ListItem>
    );
};

export default LoginButton;
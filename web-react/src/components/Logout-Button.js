import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
    ListItem,
    ListItemIcon,
} from '@material-ui/core'
import {
    Person as PersonIcon,
} from '@material-ui/icons'

const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <ListItem button>
            <ListItemIcon>
                <PersonIcon
                    style={{ color: 'green', fontSize: '3em' }}
                    onClick={() => logout({ returnTo: window.location.origin, })}
                    variant="danger"
                    className="btn-margin"
                />
            </ListItemIcon>
        </ListItem>
    );
};

export default LogoutButton;
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { ListItem, ListItemIcon, Popover, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const LogoutButton = () => {
  const { user, logout } = useAuth0()
  const { picture } = user

  const useStyles = makeStyles(() => ({
    profileImage: {
      borderRadius: '50%',
      maxWidth: '50px',
      maxHeight: '50px',
      marginLeft: '30px',
      marginRight: '30px',
    },
    paper: {
      padding: '5px',
      display: 'flex',
      flexDirection: 'column',
    },
    loginButton: {
      margin: '5px',
    },
  }))

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const history = useHistory()

  return (
    <div>
      <ListItem
        button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <ListItemIcon>
          <img src={picture} alt="Profile" className={classes.profileImage} />
        </ListItemIcon>
      </ListItem>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        classes={{
          paper: classes.paper,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Button
          variant="contained"
          color="#000000"
          disableElevation
          className={classes.loginButton}
          onClick={() => history.push('/useraccount')}
        >
          User Account
        </Button>
        <Button
          variant="contained"
          color="#000000"
          disableElevation
          className={classes.loginButton}
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </Button>
      </Popover>
    </div>
  )
}

export default LogoutButton

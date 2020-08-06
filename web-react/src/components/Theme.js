// theme.js
import { createMuiTheme } from '@material-ui/core/styles'

const Theme = createMuiTheme({
    typography: {
        body2: {
            lineHeight: '0.8',
        },
    },
    overrides: {
        MuiListItem: {
            gutters: {
                paddingLeft: '0px',
                paddingRight: '0px',
            },
        },
        MuiTimelineItem: {
            missingOppositeContent: {
                "&:before": {
                    display: "none"
                }
            }
        },
        MuiSvgIcon: {
            root: {
                fontSize: '1.0rem',
            }
        }
    }
})

export default Theme
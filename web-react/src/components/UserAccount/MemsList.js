import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { withStyles } from '@material-ui/core/styles'
import {
  Grid,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
  TableSortLabel,
  TextField,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import { Apps as AppsIcon, List as ListIcon } from '@material-ui/icons'

const styles = (theme) => ({
  root: {
    maxWidth: 800,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margin: 'auto',
  },
  navLink: {
    color: 'black',
    textDecorationColor: 'black',
  },
  memsGridContainer: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingRight: '50px',
  },
  searchContainer: {
    display: 'flex',
    width: '87%',
    marginLeft: '10px',
    marginRight: '8px',
    marginBottom: '5px',
    paddingTop: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '10px',
    backgroundColor: 'white',
  },
  searchInput: {
    width: '97%',
    marginLeft: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  searchIcon: {
    alignSelf: 'flex-end',
    marginBottom: '5px',
  },
  displayContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
    marginLeft: '8px',
    marginBottom: '5px',
    paddingTop: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '10px',
    backgroundColor: 'white',
  },
  tableContainer: {
    display: 'flex',
    width: '100%',
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '5px',
    paddingTop: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '10px',
    backgroundColor: 'white',
  },
  table: {
    minWidth: 800,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 300,
  },
})

const GET_MEM = gql`
  query memPaginateQuery(
    $first: Int
    $offset: Int
    $orderBy: [_MemOrdering]
    $filter: _MemFilter
  ) {
    Mem(first: $first, offset: $offset, orderBy: $orderBy, filter: $filter) {
      id: memID
      mem
      date {
        formatted
        day
        month
        year
      }
      memType
      emoji
      personID @skip(if: false)
      placeID @skip(if: false)
      person {
        nickname
      }
      place {
        place
      }
      music {
        albumArt
      }
      movie {
        poster
      }
      tvshow {
        poster
      }
      game {
        boxArt
      }
    }
  }
`

function MemsList(props) {
  const { classes } = props
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('date')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(20)
  const [filterState, setFilterState] = React.useState({ memFilter: '' })
  const rows = { GET_MEM }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const getFilter = () => {
    return filterState.memFilter.length > 0
      ? { mem_contains: filterState.memFilter }
      : {}
  }

  const { loading, data, error } = useQuery(GET_MEM, {
    variables: {
      first: rowsPerPage,
      offset: rowsPerPage * page,
      orderBy: orderBy + '_' + order,
      filter: getFilter(),
    },
  })

  const handleSortRequest = (property) => {
    const newOrderBy = property
    let newOrder = 'desc'

    if (orderBy === property && order === 'desc') {
      newOrder = 'asc'
    }

    setOrder(newOrder)
    setOrderBy(newOrderBy)
  }

  const handleSearchChange = (filterMem) => (event) => {
    const val = event.target.value

    setFilterState((oldFilterState) => ({
      ...oldFilterState,
      [filterMem]: val,
    }))
  }

  return (
    <React.Fragment>
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {data && !loading && !error && (
        <Grid container spacing={2} className={classes.memsGridContainer}>
          <Box
            boxShadow={1}
            borderRadius={4}
            className={classes.searchContainer}
          >
            <SearchIcon className={classes.searchIcon} />
            <TextField
              id="search"
              className={classes.searchInput}
              value={filterState.memFilter}
              onChange={handleSearchChange('memFilter')}
              label="MEMs search"
              variant="standard"
              InputProps={{
                className: classes.input,
              }}
            />
          </Box>
          <Box
            boxShadow={1}
            borderRadius={4}
            className={classes.displayContainer}
          >
            <Link to="/memslist" className={classes.navLink}>
              <AppsIcon
                fontSize="large"
                style={{ marginRight: '8px' }}
              ></AppsIcon>
            </Link>
            <Link to="/memsgrid" className={classes.navLink}>
              <ListIcon
                fontSize="large"
                style={{ marginLeft: '8px' }}
              ></ListIcon>
            </Link>
          </Box>
          <Box
            boxShadow={1}
            borderRadius={4}
            className={classes.tableContainer}
          >
            <TableContainer>
              <Table className={classes.table} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      key="mem"
                      sortDirection={orderBy === 'mem' ? order : false}
                    >
                      <Tooltip
                        title="Sort"
                        placement="bottom-start"
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === 'mem'}
                          direction={order}
                          onClick={() => handleSortRequest('mem')}
                        >
                          mem
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      key="date"
                      sortDirection={orderBy === 'date' ? order : false}
                    >
                      <Tooltip
                        title="Sort"
                        placement="bottom-start"
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === 'date'}
                          direction={order}
                          onClick={() => handleSortRequest('date')}
                        >
                          date
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      key="memType"
                      sortDirection={orderBy === 'memType' ? order : false}
                    >
                      <Tooltip
                        title="Sort"
                        placement="bottom-start"
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === 'memType'}
                          direction={order}
                          onClick={() => handleSortRequest('memType')}
                        >
                          memType
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      key="emoji"
                      sortDirection={orderBy === 'emoji' ? order : false}
                    >
                      <Tooltip
                        title="Sort"
                        placement="bottom-end"
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === 'emoji'}
                          direction={order}
                          onClick={() => handleSortRequest('emoji')}
                        >
                          Feeling
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.Mem.map((n) => {
                    return (
                      <TableRow hover key={n.id}>
                        <TableCell component="th" scope="row">
                          {n.mem}
                        </TableCell>
                        <TableCell>{n.date.formatted}</TableCell>
                        <TableCell>{n.memType}</TableCell>
                        <TableCell align="left">{n.emoji}</TableCell>
                      </TableRow>
                    )
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[20]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
              />
            </TableContainer>
          </Box>
        </Grid>
      )}
    </React.Fragment>
  )
}

export default withStyles(styles)(MemsList)

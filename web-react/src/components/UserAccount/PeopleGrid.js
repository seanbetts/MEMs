import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
} from '@material-ui/core'

const useStyles = makeStyles({
    peopleGridContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px',
    },
    cardMedia: {
        margin: "auto",
    },
    cardContent: {
        textAlign: "left",
    },
})

const GET_PERSON = gql`
  {
    Person {
      personID
      nickname
      firstName
      lastName
    }
  }
`

const PeopleGrid = (props, personID) => {
    const classes = useStyles();
    const { history } = props;
    const [filter, setFilter] = useState("");

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    const { loading, data, error } = useQuery(GET_PERSON)
    if (loading) return <p style={{ textAlign: "center" }} >Loading...</p>
    if (error) return <p style={{ textAlign: "center" }} >Error</p>

    const getPeopleCard = (personID) => {
        return data.Person.map(personID => (
            <Grid item xs={12} sm={4} lg={4} key={personID}>
                <Card style={{ padding: "5px" }} onClick={() => history.push(`/people/${personID.personID}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={require('../../img/historyHead.png')}
                        style={{ width: "130px", height: "130px" }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography>{personID.nickname}</Typography>
                        <p>{personID.firstName} {personID.lastName}</p>
                    </CardContent>
                </Card>
            </Grid>
        ))
    };

    return (
        <Grid container spacing={2} className={classes.peopleGridContainer} key={personID} >
            {getPeopleCard()}
        </Grid >
    );
};

export default PeopleGrid;

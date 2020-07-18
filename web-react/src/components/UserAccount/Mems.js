import React, { useState } from "react";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks'
import { Typography } from "@material-ui/core";

const GET_MEM = gql`
  {
    Mem(memID: $memID, orderBy: date_asc) {
      memID
      mem
      date {
        day
        month
        year
      }
      memType
      emoji
    }
  }
`

const Mems = (props) => {
  const { match } = props;
  const { params } = match;
  const { memID } = params;

  const { loading, data, error } = useQuery(GET_MEM)
  if (loading) return <p style={{ textAlign: "center" }} >Loading...</p>
  if (error) return <p style={{ textAlign: "center" }} >Error</p>

  return data.Mem.map(memID => (
    <>
      <Typography>{memID.mem}</Typography>
    </>
  ));
};

export default Mems;
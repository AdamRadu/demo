import React, { useState } from 'react';
import CustomAppBar from "../components/AppBar"
import { useHistory } from "react-router-dom";
import CustomButton from "../components/Button";
import UpdateUserPaper from '../components/papers/UpdateUserPaper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import jwt from 'jwt-decode'

const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  paper: {
      borderRadius: "5px",
      width: "100%",
  },
}));

export default function Home() {
  const history = useHistory()
  const classes = useStyles()
  const location = history.location.pathname
  const [openUpdateUser, setOpenUpdateUser] = useState(false)
  var user, tokens

  if (history.location.state) {
    tokens = history.location.state.tokens

    const tokenToString = jwt(tokens.access_token);
    user = { id: tokenToString.user_id }
  }else{
    tokens = undefined
    user = undefined
  }

  const handleRefreshClick = async () => {
    setOpenUpdateUser(!openUpdateUser)
  }

  return <div>
    <CustomAppBar location={location}
      user={user} />
    <Grid container
      className={classes.paper}
      direction="column"
      justifyContent='center'
      alignItems='center'>
      {
        tokens !== undefined ?
          <CustomButton text="Update User"
            onClick={handleRefreshClick} />
          : ""
      }
      {openUpdateUser === true ? <UpdateUserPaper user={user}/> : ""}
    </Grid>
  </div>;
}
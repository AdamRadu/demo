import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as controller from '../user/contorller'
import { Parser } from 'html-to-react'
import { Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import CustomButton from './Button';
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@material-ui/core/IconButton';
import CustomTextField from './TextField';
import { Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const style = {
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  heiht: "100%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  text: {
      paddingLeft: "10px",
  },
  icon:{
    marginBottom: "20px" 
  }
}));

export default function CustomModal() {
  const history = useHistory()
  const classes= useStyles()
  const [redirect, setRedirect] = React.useState(false);
  const [redirectPage] = useState()
  const onClick = async (event) => {
    event.preventDefault()

    var response = await controller.getGoogleLogin()


    if (!response.redirected){
      history.push({
        pathname: "/home",
        state: {
            tokens: response
        }
    });
    }else{
      window.open(response.url, "_self")
    }

  };
  const handleClose = () => setRedirect(false);


  return (
    <div>
      <IconButton className={classes.icon} onClick={onClick} color="inherit" aria-label="menu">
        <GoogleIcon />
        {/* <img src="https://img.icons8.com/color/48/000000/google-logo.png"/> */}
        <Typography className={classes.text}>Login with Google</Typography>
      </IconButton>
    </div>
  );
} 
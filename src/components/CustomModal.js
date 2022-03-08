import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as controller from '../user/contorller'
import { Parser } from 'html-to-react'
import { Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import CustomButton from './Button';

const style = {
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  heiht:"100%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const iframeStyle = {
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  height: "100%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function CustomModal() {
  const [redirect, setRedirect] = React.useState(false);
  const [redirectPage] = useState()
  const handleOpen = async (event) => {
    event.preventDefault()

    var response = await controller.postGoogleLogin()
    window.open(response, "_self")
  };
  const handleClose = () => setRedirect(false);


  return (
    <div>
      <CustomButton onClick={handleOpen} text={"Login with google"}/>
      <Modal
        open={redirect}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Redirect to={redirectPage}/>

      </Modal>
    </div>
  );
} 
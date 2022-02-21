import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import CustomTextField from '../TextField';
import CustomButton from '../Button';
import CustomizedSnackbar from '../Snackbar';
import * as controller from '../../user/contorller'
import { useHistory } from 'react-router-dom';
// all the css for the signup page
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        borderRadius: "5px",
        width: "400px",
    },
    text: {
        marginTop: "10px"
    },
    title: {
        marginTop: "10px"
    },
    titleBackground: {
        borderRadius: "2.5px",
        height: "50px",
        backgroundColor: "#3C9BD8",
    },
    form: {
        '& label.Mui-focused': {
            color: "#3C9BD8",
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: "#3C9BD8",
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: "#3C9BD8",
            },
            '&.Mui-focused fieldset': {
                borderColor: "#3C9BD8",
            },
        },
    }
}));

const HTTP_STATUS_CCREATED_SUCCESS = 201

export default function SignupPaper() {
    const history = useHistory()
    const classes = useStyles();
    const [username, setusername] = useState()
    const [password, setPassword] = useState()
    const [confirmationPassword, setConfirmationPassword] = useState()
    const [snackbarText, setSnackbarText] = useState()
    const [snackbarType, setSnackbarType] = useState()
    const [open, setOpen] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (username && password) {
            if(password === confirmationPassword){
                var response = await controller.signupUser({username: username, password: password, confirmationPassword: confirmationPassword})
                const code = response.code
                if (code === HTTP_STATUS_CCREATED_SUCCESS) {
                    setOpen(true)
                    setSnackbarType("success")
                    setSnackbarText("Succesfully signed up!")
                    setTimeout(function () {
                        history.push({
                            pathname:  "/login",
                            state: {
                                backLocation: "/signup"
                            } 
                         });
                    }, 5000);
                } else {
                    setOpen(true)
                    setSnackbarType("error")
                    setSnackbarText("Wrong username or password!")
                }
            }
        } else {
            if (username === undefined) {
                setOpen(true)
                setSnackbarType("error")
                setSnackbarText("Plaease provide a username!")
            } else if (password === undefined) {
                setOpen(true)
                setSnackbarType("error")
                setSnackbarText("Plaease provide a password!")
            }
        }
    }

    const closeSnackbar = () => {
        setOpen(false)
    }

    const handlePasswordChange = (value) => {
        setPassword(value)
    }

    const handleConfirmationPasswordChange = (value) => {
        setConfirmationPassword(value)
    }

    const handleUsernameChange = (value) => {
        setusername(value)
    }

    return (
        <div className={classes.root}>
            <Paper elevation={3}
                className={classes.root}>
                <Grid container
                    className={classes.paper}
                    direction="column">
                    <Grid item
                        className={classes.titleBackground}>
                        <Typography className={classes.title}
                            variant="h5" >
                            Register
                        </Typography>
                    </Grid>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <CustomTextField placeholder="Email"
                            saveValue={handleUsernameChange} />
                        <CustomTextField type="password"
                            placeholder="Password"
                            saveValue={handlePasswordChange} />
                        <CustomTextField type="password"
                            placeholder="Confirm Password"
                            saveValue={handleConfirmationPasswordChange} />
                        {password !== confirmationPassword ? <Alert severity="error" className={classes.text}>Passwords do not match!</Alert>:""}
                        <CustomButton type="submit" text={"Register"} />
                    </form>
                </Grid>
            </Paper>
            {open === true ? <CustomizedSnackbar open={open}
                text={snackbarText}
                severity={snackbarType}
                closeSnackbar={closeSnackbar} />
                : ""}
        </div>
    );
}




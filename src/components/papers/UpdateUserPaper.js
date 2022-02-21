import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CustomTextField from '../TextField';
import CustomButton from '../Button';
import CustomizedSnackbar from '../Snackbar';
import * as controller from '../../user/contorller'
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

const HTTP_STATUS_SUCCESS = 200

export default function UpdateUserPaper(props) {
    const classes = useStyles();
    const [user, setUser] = useState(props.user)
    const [snackbarText, setSnackbarText] = useState()
    const [snackbarType, setSnackbarType] = useState()
    const [open, setOpen] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (user.username && user.email) {
            var response = await controller.updateUser(user)
            const code = response.code
            if (code === HTTP_STATUS_SUCCESS) {
                setOpen(true)
                setSnackbarType("success")
                setSnackbarText("Updated user information successfully!")
            } else {
                setOpen(true)
                setSnackbarType("error")
                setSnackbarText("Wrong username or password!")
            }        
            if (user.username === undefined) {
                setOpen(true)
                setSnackbarType("error")
                setSnackbarText("Plaease provide a username!")
            } else if (user.email === undefined) {
                setOpen(true)
                setSnackbarType("error")
                setSnackbarText("Plaease provide a password!")
            }
        }
    }

    const closeSnackbar = () => {
        setOpen(false)
    }

    const handleEmailChange = (value) => {
        setUser({ ...user, ...{email: value}})
    }

    const handleUsernameChange = (value) => {
        setUser({ ...user, ...{username: value}})
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
                            Update user information
                        </Typography>
                    </Grid>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <CustomTextField placeholder="Username"
                            saveValue={handleUsernameChange} />
                        <CustomTextField placeholder="Email"
                            saveValue={handleEmailChange} />
                        <CustomButton type="submit" text={"Submit"} />
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




import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import CustomTextField from '../TextField';
import CustomButton from '../Button';
import CustomizedSnackbar from '../Snackbar';
import * as controller from '../../user/contorller'

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

export default function UpdatePasswordPaper(props) {
    const classes = useStyles();
    const [user, setUser] = useState(props.user)
    const [password, setPassword] = useState()
    const [snackbarText, setSnackbarText] = useState()
    const [snackbarType, setSnackbarType] = useState()
    const [open, setOpen] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (user.id && password.old) {
            if (password.new === password.confirmation) {
                var response = await controller.updatePassword({id: user.id, password: password})
                const code = response.code
                if (code === HTTP_STATUS_SUCCESS) {
                    setOpen(true)
                    setSnackbarType("success")
                    setSnackbarText("Password was updated with success!")
                } else {
                    setOpen(true)
                    setSnackbarType("error")
                    setSnackbarText("Wrong password!")
                }
            }
        }
        else {
            if (password.old === undefined) {
                setOpen(true)
                setSnackbarType("error")
                setSnackbarText("Plaease provide your old password!")
            } else if (user.email === undefined) {
                setOpen(true)
                setSnackbarType("error")
                setSnackbarText("Plaease provide a new password!")
            }
        }
    }

    const closeSnackbar = () => {
        setOpen(false)
    }

    const handleOldPasswordChange = (value) => {
        setPassword({ ...password, ...{ old: value } })
    }

    const handleNewPasswordChange = (value) => {
        setPassword({ ...password, ...{ new: value } })
    }

    const handleNewPasswordConfirmationChange = (value) => {
        setPassword({ ...password, ...{ confirmation: value } })
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
                        <CustomTextField type="password"
                            placeholder="Old password"
                            saveValue={handleOldPasswordChange} />
                        <CustomTextField type="password"
                            placeholder="New Password"
                            saveValue={handleNewPasswordChange} />
                        <CustomTextField type="password"
                            placeholder="Confirm New Password"
                            saveValue={handleNewPasswordConfirmationChange} />
                        {password !== undefined ? password.new !== password.confirmation ? <Alert severity="error" className={classes.text}>Passwords do not match!</Alert> : "":""}
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




import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CustomButton from '../Button';
import { useOktaAuth } from '@okta/okta-react';
// all the css for the login page
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        borderRadius: "5px",
        width: "400px",
        height: "550"
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

const HTTP_STATUS_SUCCESs = 200

export default function LoginPaper() {
    const { authState, oktaAuth } = useOktaAuth();
    const classes = useStyles();

    const loginWithOkta = async () => oktaAuth.signInWithRedirect({originalUri: "/home"})
    const logout = async () => oktaAuth.signOut()

    const text = authState !== null ? authState.isAuthenticated ? "Logout": "Login" : ""
    const onClick = authState!== null ? authState.isAuthenticated ? logout : loginWithOkta : function(){}

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
                            {text}
                        </Typography>
                    </Grid>
                    <CustomButton onClick={onClick}
                    text={text} />
                </Grid>
            </Paper>
        </div>
    );
}




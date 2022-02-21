import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import CustomAppBar from "../components/AppBar"
import SignupPaper from "../components/papers/SignupPaper"

const useStyles = makeStyles((theme) => ({
  root:{
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  signupForm: {
    height:"90%",
    padding: "200px 0",
    textAlign: "center"
  },
}));

export default function Signup() {
  const classes = useStyles();
  const history = useHistory()

  const location = history.location.pathname

  return <div className={classes.root}>
    <CustomAppBar location={location} />
    <Grid className={classes.signupForm}
      container
      direction="row"
      justifyContent="center"
      alignItems="center">

      <SignupPaper />
    
    </Grid>
  </div>
}
import { useHistory } from "react-router-dom";

export default function MagicLink() {
  const classes = useStyles();
  const history = useHistory()

  const location = history.location.pathname

  
  return <div className={classes.root}>
  </div>
}
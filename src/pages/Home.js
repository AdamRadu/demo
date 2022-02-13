import CustomAppBar from "../components/AppBar"
import { useHistory } from "react-router-dom";

export default function Home() {
  console.log("ajunge pana aici")
  console.log(useHistory())
  const history = useHistory()
  const location = history.location.pathname
  var user
  if (history.location.state) {
    user = history.location.state.response
  }
  return <div>
    <CustomAppBar location={location}
      user={user} />
    <h2>Home</h2>
  </div>;
}
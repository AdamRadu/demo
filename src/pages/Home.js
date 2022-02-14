import CustomAppBar from "../components/AppBar"
import { useHistory } from "react-router-dom";
import CustomButton from "../components/Button";
import { refreshTokens } from "../user/contorller";

export default function Home() {
  const history = useHistory()
  const location = history.location.pathname
  var user, tokens
  if (history.location.state) {
    user = history.location.state.response.user
    tokens = history.location.state.response.tokens
  }

  const handleRefreshClick = async () => {
    console.log(tokens)
    await refreshTokens(tokens.refresh_token)
  }

  console.log(tokens)
  return <div>
    <CustomAppBar location={location}
      user={user} />
    <h2>Home</h2>
    {
      tokens !==undefined?
    <CustomButton text = "RefreshTokens"
      onClick = {handleRefreshClick}/>
      :""
    }
  </div>;
}
import CustomAppBar from "../components/AppBar"
import { useHistory } from "react-router-dom";
import CustomButton from "../components/Button";
import { refreshTokens } from "../user/contorller";
import jwt from 'jwt-decode'

export default function Home() {
  const history = useHistory()
  const location = history.location.pathname
  var user, tokens
  
  if (history.location.state) {
    tokens = history.location.state.tokens

    const tokenToString = jwt(tokens.access_token); 
    user = {id: tokenToString.user_id}
  }

  const handleRefreshClick = async () => {
    console.log(tokens)
    await refreshTokens(tokens.refresh_token)
  }

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
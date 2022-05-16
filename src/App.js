import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import List from "./pages/UsersList"
import { CookiesProvider } from "react-cookie";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import './App.css';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";

const BASE_URL = "http://127.0.0.1:3000"

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CALLBACK_PATH = process.env.REACT_APP_CALLBACK_PATH;
const ISSUER = process.env.REACT_APP_ISSUER;
const REDIRECT_URI = `${BASE_URL}${CALLBACK_PATH}`;
const SCOPES = process.env.REACT_APP_SCOPES;


if (!SCOPES || !CLIENT_ID || !CALLBACK_PATH || !ISSUER) {
  throw new Error("All environmental variables must be set");
}

const cfg = {
  clientId: CLIENT_ID,
  issuer: ISSUER,
  redirectUri: REDIRECT_URI,
  // scopes: SCOPES.split(/\s+/),
  responseType: "token"
}

const oktaAuth = new OktaAuth(cfg)

console.log(cfg)

function App() {
  const history = useHistory()
  console.log(history)
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin ))
  }
  return (
    <Security restoreOriginalUri={restoreOriginalUri} oktaAuth={oktaAuth}>
      <div className="App">
        <Switch>   
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>      
          <SecureRoute path="/home">
            <CookiesProvider>
            <Home />
            </CookiesProvider>
          </SecureRoute>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/login/callback" component={LoginCallback} />
        </Switch>
      </div>
      </Security>
  );
}

const AppWrapper = () =>{
  return(
    <Router><App/></Router>
  )
}
export default AppWrapper;
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import List from "./pages/UsersList"
import { CookiesProvider } from "react-cookie";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import MagicLink from "./pages/MagicLink";
import Home from "./pages/Home"
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>   
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>      
          <Route path="/home">
            <CookiesProvider>
            <Home />
            </CookiesProvider>
          </Route>
          <Route path="/list">
            <List />
          </Route>
          <Route>
            <MagicLink/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
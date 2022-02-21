import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import List from "./pages/UsersList"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
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
            <Home />
          </Route>
          <Route path="/list">
            <List />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
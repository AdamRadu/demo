import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./pages/Login"
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
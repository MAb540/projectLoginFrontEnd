import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import SignUp from "./Screens/SignUp";
import VerifyCode from "./Screens/VerifyCode";

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />

        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/verify" component={VerifyCode} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />

          <Redirect to="/" />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from "./routes/Login";
import Onboard from "./routes/Onboard";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/onboard'>
          <Onboard />
        </Route>
        <Route path='/'>
          <Onboard />
        </Route>
      </Switch>
    </Router>
  )
}
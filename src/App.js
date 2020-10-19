//React Imports
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//Material Imports





//File Imports
import './App.css';
import Home from './Path/Home'
import Nav from './Nav/nav'
import Initial from './Initial/Initial'


function App() {



  return (
    <Router forceRefresh={true}>

        <div>
          <Nav/>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/path">
              <Home />
            </Route>
            <Route path="/">
              <Initial />
            </Route>
          </Switch>
          
        </div>
      
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}





export default App;

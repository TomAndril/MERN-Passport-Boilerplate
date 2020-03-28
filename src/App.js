import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Header from "./components/Header";
import Signup from "./components/Signup";
import About from "./components/About";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
  const [user, setUser] = useState({ isLogged: false, username: null });

  useEffect(() => {
    initialCheck()
  }, [])

  const initialCheck = async () => {
      const isLoggedCheck = await axios.get('/user')
      console.log('checking user data')
      console.log(isLoggedCheck.data)
      if(isLoggedCheck.data.user) {
        setUser({isLogged: true})
      }
  }

  const globalStyles = {
    margin: 0,
    padding: 0,
    boxSizing: "border-box"
  };

  return (
    <Router>
      <div style={globalStyles}>
        <Header isLogged={user.isLogged} setUser={setUser} />
        <Container className="m-5">
          <Switch>
            <Route exact path="/">
              <Home username={user.username} setUser={setUser} />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login" render={() => <Login setUser={setUser} />} />
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
};

export default App;

import React, { useState } from "react";
import { Form, Button, Row, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/user/login", { username: username, password: password })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          props.setUser({ isLogged: true, username: res.data.username });
          setRedirect("/");
        }
      })
      .catch(err => {
        setErrorAlert(true);
        console.log("Login error");
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      {redirect ? (
        <Redirect to={{ pathname: redirect }}></Redirect>
      ) : (
        <React.Fragment>
          <Row className="m-4">
            <h4>Login to your account</h4>
          </Row>
          
            {errorAlert && <Alert variant='danger'>
                Please check your username or password
              </Alert>}
          
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={e => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button onClick={e => handleSubmit(e)}>Submit</Button>
          </Form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Login;

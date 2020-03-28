import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameTaken, setUsernameTaken] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/user", { username: username, password: password, email: email })
      .then(res => {
        console.log(res);
        if (res.data.error) {
          setUsernameTaken(true)
          console.log("Signup good so far");
        } else {
          console.log("Signup not so good");
        }
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  };

  return (
    <React.Fragment>
      <Row className="m-4">
        <h4>Create an account</h4>
      </Row>
      <Row>
        <Col>
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
              {!usernameTaken ? null : (
                <Form.Text className="text-danger">
                  Sorry, this username is already taken. Please choose another.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
              <Form.Text className="text-muted">
                We will never share your Email with anyone else
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={e => {
                handleSubmit(e);
              }}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Signup;

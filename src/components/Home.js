import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = props => {
  const [user, setUsername] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    axios
      .get("/user")
      .then(res => {
        console.log(res.data)
        setUsername(props.username);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      {!user ? <h3>Not logged in</h3> : <h3>Hello {user}</h3>}
    </React.Fragment>
  );
};

export default Home;

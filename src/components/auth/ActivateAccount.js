import React from "react";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Activate_Account = () => {
  const params = useParams();
  const { id } = params;
  const [activateState, setActivateState] = useState({
    name: "",
    token: "",
    buttonText: "Activate Account",
    success: "",
    error: "",
  });

  const { name, token, buttonText, success, error } = activateState;

  useEffect(() => {
    let token = id;
    if (token) {
      const { name } = jwtDecode(token);
      setActivateState({ ...activateState, name, token });
    }
  }, [name]);

  const clickSubmit = async (e) => {
    e.preventDefault();
    setActivateState({
      ...activateState,
      buttonText: "Activating...",
    });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/register/activate`,
        {
          token,
        }
      );
      console.log("Account activate:", response);
      setActivateState({
        ...activateState,
        name: "",
        token: "",
        buttonText: "Activated",
        success: response.data.message,
      });
    } catch (error) {
      setActivateState({
        ...activateState,
        buttonText: "Activate Account",
        error: error.response.data.error,
      });
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h1>G'day {name},Ready to activate your account?</h1>
      <br />
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="outline-success" size="lg" block onClick={clickSubmit}>
        {buttonText}
      </Button>
    </div>
  );
};

export default Activate_Account;

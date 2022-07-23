import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Alert } from "react-bootstrap";
import loginIcon from "../../images/forgotPassword.svg";
import "../Login.css";
import userDp from "../../images/profile.svg";


const ForgotPassword = () => {
  const [forgotState, setForgotState] = useState({
    email: "",
    buttonText: "Forgot Password",
    success: "",
    error: "",
  });
  const { email, buttonText, success, error } = forgotState;

  const handleChange = (e) => {
    setForgotState({
      ...forgotState,
      email: e.target.value,
      success: "",
      error: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("post email to:  ", email);

    setForgotState({
      ...forgotState,
      buttonText: "Wait....",
    });

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/forgot-password`,
        { email }
      );
      console.log("Forgot:", response);
      setForgotState({
        ...forgotState,
        email: "",
        buttonText: "Done",
        success: response.data.message,
      });
    } catch (err) {
      console.log("Forgot Pw error", err);
      setForgotState({
        ...forgotState,
        buttonText: "Forgot password",
        error: err.response.data.error,
      });
    }
  };
  return (
    <Container>
      <Row>
        <Col lg={4} md={6} sn={12} className="text-center">
          <img className="imgIcon" src={userDp} alt="login-icon" />

          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <div>
            <h2 className="pb-2">Forgot Password</h2>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={email}
                required
              />
            </Form.Group>

            <Button variant="primary btn-block" type="submit">
              {buttonText}
            </Button>
          </Form>
        </Col>
        <Col lg={8} md={6} sn={12}>
          <img className="w-100" src={loginIcon} alt="side-icon" />
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;

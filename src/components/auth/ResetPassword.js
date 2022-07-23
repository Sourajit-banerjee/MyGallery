import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Alert } from "react-bootstrap";
import loginIcon from "../../images/forgotPassword.svg";
import "../Login.css";
import userDp from "../../images/profile.svg";

import jwtDecode from "jwt-decode";

const ResetPassword = () => {
  const params = useParams();

  const [resetState, setResetState] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Reset Password",
    success: "",
    error: "",
  });

  const { name, token, newPassword, buttonText, success, error } = resetState;

  useEffect(() => {
    const { id } = params;
    console.log(params)
    const decoded = jwtDecode(id);
    if (decoded) {
      setResetState({
        ...resetState,
        name: decoded.name,
        token: id,
      });
    }
  }, [params]);

  const handleChange = (e) => {
    setResetState({
      ...resetState,
      newPassword: e.target.value,
      success: "",
      error: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 

    setResetState({
      ...resetState,
      buttonText: "Sending....",
    });

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/reset-password`,
        {
          resetPasswordLink: token,
          newPassword,
        }
      );
      console.log("Reset:", response);
      setResetState({
        ...resetState,
        email: "",
        buttonText: "Done",
        success: response.data.message,
      });
    } catch (err) {
      console.log("Forgot Pw error", err);
      setResetState({
        ...resetState,
        buttonText: "Reset password",
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
            <h4 className="pb-2">Hi ,{name} ready to reset your password ?</h4>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                onChange={handleChange}
                
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

export default ResetPassword;

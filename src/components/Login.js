import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Alert } from "react-bootstrap";
import loginIcon from "../images/undraw_photo_session_re_c0cp.svg";
import "./Login.css";
import { Link } from "react-router-dom";
import userDp from "../images/profile.svg";
import { authenticate, isAuth } from "../helpers/auth";

const Login = () => {
  const [regState, setRegState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Login",
  });

  const { buttonText, success, password, error, email } = regState;
  const history = useHistory();

  useEffect(() => {
    isAuth() && history.push('/')
  }, []);

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    setRegState({
      ...regState,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Login",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    setRegState({ ...regState, buttonText: "Logging in...." });
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/login`, {
        email,
        password,
      });

      // console.log("Login:", res);

      authenticate(res, () => {
        return history.push("/");
      });
    } catch (error) {
      console.log("Error:", error);
      setRegState({
        ...regState,
        buttonText: "Login",
        error: error.response.data.error,
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
            <h1>Login</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange("email")}
                value={email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange("password")}
                value={password}
              />
            </Form.Group>
            <Button variant="primary btn-block" type="submit">
              {buttonText}
            </Button>
            <div>
              <Link to="/forgot-password">
                <div className="reset float-right text-danger"> Forgot Password ?</div>
              </Link>
            </div>
          </Form>
        </Col>
        <Col lg={8} md={6} sn={12}>
          <img className="w-100" src={loginIcon} alt="side-icon" />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

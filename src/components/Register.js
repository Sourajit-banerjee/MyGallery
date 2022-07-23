import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Alert } from "react-bootstrap";
import loginIcon from "../images/loginPic.svg";
import "./Login.css";
import { Link } from "react-router-dom";
import userDp from "../images/profile.svg";
import axios from "axios";
import { useState,useEffect } from "react";
import { isAuth } from "../helpers/auth";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [regState, setRegState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Register",
  });
  const history=useHistory();
  const { buttonText, success, password, name, error, email } = regState;

  
  useEffect(() => {
    isAuth() && history.push('/')
  }, []);

  const handleChange = (name) => (e) => {
    console.log(e.target.value);
    setRegState({
      ...regState,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Register",
    });
  };


  const handleSubmit=async (e)=>{
    e.preventDefault();
    setRegState({ ...regState, buttonText: "Registering...." });
    try{
      const res= await axios.post(`${process.env.REACT_APP_API}/register`, {
      name,
      email,
      password,
    })
    console.log("Register:", res);
    setRegState({
      ...regState,
      name: "",
      email: "",
      password: "",
      buttonText: "Submitted",
      success: res.data.message,
    });

    }catch(error){

      console.log("Error:",error);
      setRegState({
        ...regState,
        buttonText: "Register",
        error: error.response.data.error,
      });

  }
}

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setRegState({ ...regState, buttonText: "Registering...." });
  //   console.table({ name, email, password });
  //   axios
  //     .post("http://localhost:8000/api/register", {
  //       name,
  //       email,
  //       password,
  //     })
  //     .then((res) => {
  //       console.log("Register:", res);
  //       setRegState({
  //         ...regState,
  //         name: "",
  //         email: "",
  //         password: "",
  //         buttonText: "Submitted",
  //         success: res.data.message,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("Error:",error);
  //       setRegState({
  //         ...regState,
  //         buttonText: "Register",
  //         error: error.res.data.error,
  //       });
  //     });
  // };

  return (
    <Container>
      <Row>
        <Col lg={4} md={6} sn={12} className="text-center">
          <img className="imgIcon" src={userDp} alt="login-icon" />

          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

         <div ><h1 className="pb-2">Register</h1></div>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              value={name}
              onChange={handleChange("name")}
              className="mb-2 mr-sm-2"
              id="inlineFormInputName2"
              placeholder="Enter Name"
            />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                value={email}
                onChange={handleChange("email")}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                value={password}
                onChange={handleChange("password")}
                type="password"
                placeholder="Password"
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

export default Register;

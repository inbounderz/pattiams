import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col, FormGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import FormContainer from "../Components/FormContainer";
import { register } from "../Actions/userActions";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get("test1") || "";

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        setMessage("Passwords do not match!")
    }else {
        dispatch(register(name, email, number, password))
    }
  };

  return (
    <div className="loginScreen">
      <FormContainer>
        <Col
          xs={12}
          lg={7}
          className="d-flex flex-column justify-content-between py-5"
          >
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
          <div className="d-flex justify-content-center p-3">
            <Image src="images/pattiams_header_logo.svg" />
          </div>
          <h3>Sign Up</h3>
          <h5>Create your Pattiams Account</h5>
          <Form onSubmit={submitHandler}>
            
          <Form.Group controlId="name" className="mt-3">
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="mt-3">
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="number" className="mt-3">
          <Form.Control
            type="number"
            placeholder="Enter Mobile Number"
            value={number}
            minLength="10"
            onChange={(e) => setNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            minLength="6"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mt-3">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            minLength="6"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>

      </Form>
          <Row className="py-3">
            <Col>
              Have an account?{" "}
              <Link to={redirect ? `/login?test1=${redirect}` : "/login"}>
                Login
              </Link>
            </Col>
          </Row>
        </Col>

        <Col md={5} className="d-lg-flex align-items-center d-none">
          <Image className="sign-in-img" src="images/pattiams_signin.jpg" />
        </Col>
      </FormContainer>
    </div>
  );
};

export default RegisterScreen;
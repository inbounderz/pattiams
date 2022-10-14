import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col, FormGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import FormContainer from "../Components/FormContainer";
import { login } from "../Actions/userActions";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailorMobile, setEmailorMobile] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [fetchError, setFetchError] = useState();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [erMessage, setErMessage] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get("goto") || "";

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const [passwordType, setPasswordType] = useState("password");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(emailorMobile, password));
    // if (userInfo) navigate("/");
  };

  const resetHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { "content-type": "application/json" },
      };

      const { data } = await axios.post(
        "/api/users/getotp",
        { resetEmail },
        config
      );

      if (data) {
        setShowOtpInput(true);
      }

      setFetchError(false);
    } catch (error) {
      setFetchError(true);
    }
  };

  const otpHandler = async (e) => {
    e.preventDefault();
    if(newPassword===confirmNewPassword){

      try {
        const config = {
          headers: { "content-type": "application/json" },
        };
  
        const { data } = await axios.put(
          "/api/users/reset",
          { resetEmail, otp, newPassword },
          config
        );
  
        if (data) {
          setResetSuccess(true);
        }
  
        
      } catch (error) {
        const erMsg = error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
          setErMessage(erMsg);
      }
    } else {
      setPasswordError(true);
    }

  }

  if (fetchError === true || fetchError === false) {
    setTimeout(() => {
      setFetchError();
    }, 5000);
  }
  if(passwordError===true){
    setTimeout(() => {
      setPasswordError(false);
    }, 5000);
  }
  if(erMessage){
    setTimeout(() => {
      setErMessage("");
    }, 5000);
  }

  return (
    <div className="loginScreen">
      <FormContainer>
        <Col
          xs={12}
          lg={7}
          className="d-flex flex-column justify-content-between py-5"
        >
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <div className="d-flex justify-content-center p-3">
            <Image src="images/pattiams_header_logo.svg" />
          </div>
          <h3>Sign in</h3>
          <h5>Use your Pattiams Account</h5>
          <Form onSubmit={submitHandler}>
            <FormGroup className="mt-3">
              <Form.Control
                type="text"
                placeholder="Enter Email or Mobile"
                value={emailorMobile}
                onChange={(e) => setEmailorMobile(e.target.value)}
              ></Form.Control>
            </FormGroup>

            <FormGroup className="mt-3 d-flex">
              <Form.Control
                type={passwordType}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
              <div className="input-group-btn">
                <div
                  className="btn btn-outline-danger"
                  onClick={togglePassword}
                >
                  {passwordType === "password" ? (
                    <i className="fa fa-thin fa-eye"></i>
                  ) : (
                    <i className="fa fa-thin fa-eye-slash"></i>
                  )}
                </div>
              </div>
            </FormGroup>

            <Button type="submit" className="mt-2">
              Log in
            </Button>
          </Form>
          <span className="forget-pw" onClick={handleShow}>
            Forget password?
          </span>
          <Row className="py-3">
            <Col>
              New customer?{" "}
              <Link to={redirect ? `/register?test1=${redirect}` : "/register"}>
                Register
              </Link>
            </Col>
          </Row>
        </Col>

        <Col md={5} className="d-lg-flex align-items-center d-none">
          <Image className="sign-in-img" src="images/pattiams_signin.jpg" />
        </Col>
      </FormContainer>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h5>Please enter your registered Email</h5>
          <Form onSubmit={resetHandler}>
            <FormGroup className="mt-3">
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <Button type="submit" className="mt-2">
              Submit
            </Button>
          </Form>
          {showOtpInput && (
            <>
              <h5 className="mt-3">Enter the OTP received in your Email</h5>
              <Form onSubmit={otpHandler}>
                <FormGroup className="mt-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  ></Form.Control>
                </FormGroup>
                <FormGroup className="mt-3">
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></Form.Control>
                </FormGroup>
                <FormGroup className="mt-3">
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  ></Form.Control>
                </FormGroup>
                <Button type="submit" className="mt-2">
                  Submit
                </Button>
              </Form>
            </>
          )}
          {fetchError && (
            <div style={{ color: "red" }}>
              Some error occured. Please check your Email
            </div>
          )}
          {fetchError === false && (
            <div style={{ color: "green" }}>
              Check the OTP sent to your Email
            </div>
          )}
          {passwordError === true && (
            <div style={{ color: "red" }}>
            Passwords doesn't match
          </div>
          )}
          {erMessage && (
            <div style={{ color: "red" }}>
            {erMessage}
          </div>
          )}
          {resetSuccess && (
            <div style={{ color: "green" }}>
            Password reset successfull
          </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginScreen;

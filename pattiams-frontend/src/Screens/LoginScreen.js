import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col, FormGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import FormContainer from "../Components/FormContainer";
import { login } from "../Actions/userActions";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailorMobile, setEmailorMobile] = useState("");
  const [password, setPassword] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get("goto") || "";

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const [passwordType, setPasswordType] = useState("password");

    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }

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
              >
              </Form.Control>
              <div className="input-group-btn">
                     <div className="btn btn-outline-danger" onClick={togglePassword}>
                      { passwordType==="password"? <i className="fa fa-thin fa-eye"></i> : <i className="fa fa-thin fa-eye-slash"></i> }
                     </div>
              </div>
            </FormGroup>

            <Button type="submit" className="mt-2">
              Log in
            </Button>
          </Form>
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
    </div>
  );
};

export default LoginScreen;

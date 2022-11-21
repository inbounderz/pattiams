import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import CheckoutSteps from '../Components/CheckoutSteps';
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../Components/FormContainer";
import { saveShippingAddress } from "../Actions/cartActions";

const ShippingScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState(shippingAddress.name);
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [email, setEmail] = useState(shippingAddress.email);
  const [flat, setFlat] = useState(shippingAddress.flat);
  const [area, setArea] = useState(shippingAddress.area);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [landmark, setLandmark] = useState(shippingAddress.landmark);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);

  const submitHandler = (e) => {
    e.preventDefault();
    if(phone.length >= 10) {
      dispatch(
        saveShippingAddress({ name, phone, email, flat, area, postalCode, landmark, city, state })
      );
      navigate("/payment");
    }
  };

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajastan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "Wesh Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman & Diu",
    "The Government of NCT of Delhi",
    "Jammu & Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Pudcherry",
  ];

  return (
    <Container className="mt-5">
      <Row>
        <div className="shipping-user-details p-4">
          <h4>Hi {userInfo.name}</h4>
          <h6>{userInfo.email}</h6>
          <h6>{userInfo.number}</h6>
        </div>
      </Row>
      <Row className="mt-4">
        <CheckoutSteps step1 step2 />
        <Col>
          <FormContainer>
            <div className="p-4">
              <h3>Shipping</h3>
              <h5>Please provide your shipping address</h5>

              <Form onSubmit={submitHandler}>

                <Form.Group controlId="name" className="mt-4">
                  <Form.Label>
                    Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="phone" className="mt-4">
                  <Form.Label>
                    Phone
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={phone}
                    required
                    min="10"
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email" className="mt-4">
                  <Form.Label>
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                
                <Form.Group controlId="flat" className="mt-4">
                  <Form.Label>
                    Flat, House no., Building, Company, Apartment
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={flat}
                    required
                    onChange={(e) => setFlat(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="area" className="mt-4">
                  <Form.Label>Area, Street, Sector, Village</Form.Label>
                  <Form.Control
                    type="text"
                    value={area}
                    required
                    onChange={(e) => setArea(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode" className="mt-4">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="6 digits [0-9] PIN code"
                    value={postalCode}
                    required
                    minLength="6"
                    onChange={(e) => setPostalCode(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="landmark" className="mt-4">
                  <Form.Label>Landmark (If any)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Eg. near Apollo hospital"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="city" className="mt-4">
                  <Form.Label>Town/City</Form.Label>
                  <Form.Control
                    type="text"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mt-4">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    {states.map((state) => (
                      <option key={state}>{state}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-4">
                  Continue
                </Button>
              </Form>
            </div>
          </FormContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingScreen;

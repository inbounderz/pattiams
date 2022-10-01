import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import CheckoutSteps from "../Components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../Components/FormContainer";
import { savePaymentMethod } from "../Actions/cartActions";

const PaymentScreen = () => {
  const navigate = useNavigate();

  const cartItems2 = useSelector((state) => state.cartItems2);
  const { shippingAddress } = cartItems2;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="mt-3 paymentScreen">
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1>Payment method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="RazorPay/credit or debit card"
                id="RazorPay"
                name="paymentMethod"
                value="RazorPay/credit or debit card"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              {/* <Form.Check
                type="radio"
                label="Paypal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check> */}
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default PaymentScreen;

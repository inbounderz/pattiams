import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  shipOrder,
} from "../Actions/orderActions";
import axios from "axios";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_SHIP_RESET,
} from "../Constants/orderConstants";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const orderShip = useSelector((state) => state.orderShip);
  const { loading: loadingShip, success: successShip } = orderShip;

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!order || successPay || successDeliver || successShip) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_SHIP_RESET });

      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id, successPay, successDeliver, successShip, order]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const showRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const { data } = await axios.post(`/razorpay/${id}`);

    const options = {
      key: "rzp_live_n3kZPGXkI0GqVK",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Pattiams",
      description: "Make the payment now",
      image: "",
      handler: async (response) => {
        await axios.post(`/razorpay/success/${id}`);
        dispatch({ type: ORDER_PAY_SUCCESS });

        alert("Transaction successful");
      },
      prefill: {
        name: "Pattiams_Ayurveda",
        email: "designinbounderz@gmail.com",
        phone_number: "9876543210",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    dispatch(payOrder(id));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const shipHandler = () => {
    dispatch(shipOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Container className="orderscreen mt-5">
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>Order ID: {order._id}</h5>
              <p>
                <strong>
                  Address:
                  <br />
                </strong>
                {order.shippingAddress.name}
                <br />
                {order.shippingAddress.phone}
                <br />
                {order.shippingAddress.flat}
                <br />
                {order.shippingAddress.area}
                <br />
                {order.shippingAddress.city}
                <br />
                {order.shippingAddress.state}
                <br />
                {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.landmark}
              </p>
              <div className="my-3">
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Order Submitted</Message>
                )}
                {order.isShipped && (
                  <Message variant="success">
                    Shipped on {order.shippedAt}
                  </Message>
                )}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment method</h2>
              <strong>Method: </strong>
              {order.paymentMethod}
              <div className="my-3">
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not paid</Message>
                )}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X{" "}
                          {item.discountPrice > 0 ? (
                            <>₹{item.discountPrice}</>
                          ) : (
                            <>₹{item.price}</>
                          )}{" "}
                          = ₹
                          {item.qty *
                            (item.discountPrice > 0
                              ? item.discountPrice
                              : item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} className="order-summary-card">
          <Card className="mb-5">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-center">
                {!order.isPaid && order.paymentMethod === "Razorpay" && (
                  <ListGroup.Item>
                    <Button
                      onClick={showRazorpay}
                      className="btn btn-block round"
                    >
                      Pay with RazorPay
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup.Item>

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                order.isShipped &&
                !order.isDelivered && (
                  <Button
                    className="btn btn - block"
                    type="button"
                    onClick={deliverHandler}
                  >
                    Mark as delivered
                  </Button>
                )}
              {loadingShip && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isShipped && (
                  <Button
                    className="btn btn - block"
                    type="button"
                    onClick={shipHandler}
                  >
                    Mark as shipped
                  </Button>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderScreen;

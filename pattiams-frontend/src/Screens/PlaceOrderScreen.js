import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import CheckoutSteps from "../Components/CheckoutSteps";
import { createOrder } from "../Actions/orderActions";
import { getItemsFromCart } from "../Actions/cartActions";
// import { ORDER_CREATE_RESET } from "../Constants/orderConstants";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const cart = useSelector((state) => state.cart);
  const cartItems2 = useSelector((state) => state.cartItems2);

  //Calculate the prices using reduce array method

  // cart.itemsPrice = cart.cartItems.reduce(
  //   (acc, item) =>
  //     acc +
  //     (item.discountPrice > 0 ? item.discountPrice : item.price) * item.qty,
  //   0
  // );

  cartItems2.itemsPrice = cartItems2.products.reduce((acc, item) => acc + Number(item.qty) * (item.price), 0);
  cartItems2.normalPrice = cartItems2.itemsPrice;

  // 10% discount
  cartItems2.itemsPrice = Number((cartItems2.itemsPrice - cartItems2.itemsPrice*0.10).toFixed(2));

  // cartItems2.shippingPrice = cartItems2.itemsPrice > 199 ? 0 : 60;
  cartItems2.shippingPrice = 0;

  cartItems2.taxPrice = 0;
  
  cartItems2.products.map((product) => {
    if(product.productCategory==="ayurveda"){
      cartItems2.taxPrice = cartItems2.taxPrice + Number((0.05 * product.price * product.qty).toFixed(2));
    }else{
      cartItems2.taxPrice = cartItems2.taxPrice + Number((0.18 * product.price * product.qty).toFixed(2));
    }
  })

  cartItems2.taxPrice = Number(cartItems2.taxPrice.toFixed(2));

  if (cartItems2.itemsPrice + cartItems2.taxtPrice<999) {
    cartItems2.shippingPrice = 100
  } else {
    cartItems2.shippingPrice = 50
  }


  cartItems2.totalPrice = Number(
    (cartItems2.itemsPrice + cartItems2.shippingPrice + cartItems2.taxPrice).toFixed(2)
  );

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(()=>{
    if(success){
      navigate(`/order/${order._id}`)
      // dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  },[navigate, success, dispatch, getItemsFromCart])

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cartItems2.products,
      shippingAddress: cartItems2.shippingAddress,
      paymentMethod: cartItems2.paymentMethod,
      itemsPrice: cartItems2.itemsPrice,
      shippingPrice: cartItems2.shippingPrice,
      taxPrice: cartItems2.taxPrice,
      totalPrice: cartItems2.totalPrice,
    }))
  };
  return (
    <Container className="placeorderScreen">
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shopping</h2>
              <p>
                <strong>
                  Address:
                  <br />
                </strong>
                {cartItems2.shippingAddress.name}
                <br />
                {cartItems2.shippingAddress.phone}
                <br />
                {cartItems2.shippingAddress.flat}
                <br />
                {cartItems2.shippingAddress.area}
                <br />
                {cartItems2.shippingAddress.city}
                <br />
                {cartItems2.shippingAddress.state}
                <br />
                {cartItems2.shippingAddress.postalCode}
                <br />
                {cartItems2.shippingAddress.landmark}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment method</h2>
              <strong>Method: </strong>
              {cartItems2.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              {cartItems2.products.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems2.products.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="align-items-center">
                        <Col xs={1}>
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          {/* <Link to={`/product/${item.product}`}> */}
                            {item.productName}
                          {/* </Link> */}
                        </Col>
                        <Col xs={4}>
                          {item.qty} X{" "}
                          {item.price}{" "}
                          = <span className="rupee-symbol">₹</span>
                          {item.qty *
                            (item.price)}
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
                  <Col>
                  <span className="rupee-symbol">₹</span><s>{cartItems2.normalPrice}</s>{' '}
                  <span className="rupee-symbol">₹</span>{cartItems2.itemsPrice}{' '}
                  <span style={{fontSize: "10px",color: "green"}}>(10% off)</span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col><span className="rupee-symbol">₹</span>{cartItems2.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col><span className="rupee-symbol">₹</span>{cartItems2.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col><span className="rupee-symbol">₹</span>{cartItems2.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-center">
                <div
                  type="button"
                  className="placeorder-button"
                  disabled={cartItems2.products === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;

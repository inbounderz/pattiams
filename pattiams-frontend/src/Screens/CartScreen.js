import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Container } from "react-bootstrap";
import {
  addToCart,
  getItemsFromCart,
  removeFromCart,
  selectProductVariant,
} from "../Actions/cartActions";
import Message from "../Components/Message";
import Loader from "../Components/Loader";

const CartScreen = () => {

  const dispatch = useDispatch();

  // const { id } = useParams();

  let navigate = useNavigate();

  // const search = useLocation().search;
  // const qty = search && new URLSearchParams(search).get("qty");
  // const variant = search && new URLSearchParams(search).get("variant");
  // const price = search && new URLSearchParams(search).get("price");

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;

  const cartItems2 = useSelector((state) => state.cartItems2);
  const { loading, error, products } = cartItems2;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteFromCart = useSelector((state) => state.deleteFromCart);
  const { success } = deleteFromCart;


  // cartItems.find(cart=>cart.variant.some(vari => vari.model));

  // const [selectedVariant, setSelectedVariant] = useState(cartItems.find(cart=>cart.variant.some(vari => vari.model)));

  useEffect(() => {

    
    if(!userInfo){
      navigate('/login?goto=cart');
    } else {
      dispatch(getItemsFromCart());
    }


    // if (id) {
    //   dispatch(addToCart(id, qty, variant, price));
    // }

  }, [userInfo, navigate, dispatch, getItemsFromCart, success]);

  const removeFromCartHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(removeFromCart(id));
    }
  };

  const checkoutHandler = () => {
    navigate("/login?goto=shipping");
  };

  return (
    <Container className="cartscreen">
      <Row className="d-none d-md-flex">
        <Col md={8}>
          <h1>Shopping cart</h1>
          {loading && <Loader/>}
          {products && products.length === 0 ? (
            <Message>
              Your cart is empty. <Link to="/">Go back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {loading && <Loader/>}
              {products && products.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="d-flex align-items-center">
                    <Col md={2}>
                      <Image src={item.productImage} alt={item.productImage} fluid rounded />
                    </Col>
                    <Col md={3}>
                      {item.productName}
                    </Col>
                    {/* <Col md={2}>{item.discountPrice[0] > 0 ? <><s>₹{item.price[0]}</s> ₹{item.discountPrice[0]}</> : <>₹{item.price[0]}</>}</Col> */}

                    {/* <Col md={2}>
                        <span>Variant: </span>
                        <span className="fw-bold">{variant && item.variantFromDB[variant].model}</span>
                    </Col> */}

                    <Col md={2}>
                      <span>Quantity:&nbsp;</span>
                      <span>{item && item.qty}</span>
                      {/* <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control> */}
                    </Col>

                    <Col md={2}>
                      <span>Price:&nbsp;</span>
                      <span>₹{item && item.productVariant[0].price}</span>
                    </Col>

                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        delete<i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {products &&
                    products.reduce((acc, item) => acc + Number(item.qty), 0)}
                  ) items
                </h2>
                ₹
                {products &&
                  products
                    .reduce(
                      (acc, item) =>
                        acc + Number(item.qty) * item.productVariant[0].price,
                      0
                    )
                    .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="checkoutButton"
                  disabled={products && products.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <div className="d-block d-md-none">
        <h3 className="text-center">Shopping Cart</h3>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {products &&
                      products.reduce(
                        (acc, item) => acc + Number(item.qty),
                        0
                      )}
                    ) items
                  </h2>
                  ₹
                  {products &&
                    products
                      .reduce(
                        (acc, item) =>
                          acc + Number(item.qty) * item.productVariant[0].price,
                        0
                      )
                      .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="checkoutButton"
                    disabled={products && products.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
        {products && products.length === 0 ? (
          <Message>
            Your cart is empty. <Link to="/">Go back</Link>
          </Message>
        ) : (
          <>
            {products && products.map((item) => (
              <Row className="mx-1 my-2 product-in-cart" key={item._id}>
                <Col xs={3}>
                  <Image
                    className="cart-screen-img-mobile"
                    src={item.productImage}
                    alt={item.productImage}
                    fluid
                    rounded
                  />
                </Col>
                <Col xs={5}>
                  <div>
                    {item.productName}
                  </div>
                  <div>
                    <span>Quantity:&nbsp;</span>
                    <span>{item && item.qty}</span>
                  </div>
                  <div>
                    <span>Price:&nbsp;</span>
                    <span>₹{item && item.productVariant[0].price}</span>
                  </div>
                </Col>
                <Col xs={4} className="d-flex align-items-center">
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    Remove<i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            ))}
          </>
        )}
      </div>
    </Container>
  );
};

export default CartScreen;

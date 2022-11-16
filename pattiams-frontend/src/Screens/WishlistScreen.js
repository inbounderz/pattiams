import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container
} from "react-bootstrap";
import Message from "../Components/Message";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { removeFromWishlist } from "../Actions/wishlistActions";

const WishlistScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const removeFromWishlistHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(removeFromWishlist(id));
    }
  };

  return (
    <Container className="wishlistScreen">
      <Row>
        <Col md={9}>
          <h1>Wishlist</h1>
          {wishlistItems && wishlistItems.length === 0 ? (
            <Message>
              Your wishlist is empty <Link to="/">Go back</Link>{" "}
            </Message>
          ) : (
            <ListGroup variant="flush">
              {wishlistItems &&
                wishlistItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row className="d-flex align-items-center" >
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={2}>
                        <Link to={`/product/${item.category}/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                      <span className="rupee-symbol">₹</span>{item.variant[0].price} onwards
                      </Col>
                      <Col md={3}>
                      <Link to={`/product/${item.category}/${item.product}`} className="text-decoration-none">
                        <Button
                          type="button"
                          variant="light"
                        >
                          <i className="fa fa-shopping-cart"></i>{" "}
                          <span style={{ fontSize: "11px" }}>Go to product page</span>
                        </Button>
                        </Link>
                      </Col>
                      <Col md={3}>
                      <Button
                          type="button"
                          variant="light"
                          onClick={() =>
                            removeFromWishlistHandler(item.product)
                          }
                        >
                          <i className="fa fa-trash"></i>{" "}
                          <span style={{ fontSize: "11px" }}>Remove item</span>
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                        <Col>

                        </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>
                  Subtotal (
                  {wishlistItems &&
                    wishlistItems.reduce((acc, item) => acc + Number(qty), 0)}
                  ) items
                </h4>
                <span className="rupee-symbol">₹</span>
                {wishlistItems &&
                  wishlistItems
                    .reduce(
                      (acc, item) =>
                        acc +
                        Number(qty) *
                          (item.discountPrice > 0
                            ? item.discountPrice
                            : item.variant[0].price),
                      0
                    )
                    .toFixed(2)}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WishlistScreen;
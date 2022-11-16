import "./Navigationbar.css";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Badge } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/esm/Button";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Actions/userActions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { listProducts } from "../Actions/productActions";

const Navigationbar = () => {
  const [keyword, setKeyword] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;

  const cartItems2 = useSelector((state) => state.cartItems2);
  const { products: cartItems } = cartItems2;

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const logoutHandler = () => {
    dispatch(logout());
  };

  let searchWord = "";
  const searchHandler = (event) => {
    searchWord = event.target.value;
    const newFilter = products.filter((product) => {
      return product.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord == "") {
      setKeyword([]);
    } else {
      setKeyword(newFilter);
    }
  };

  const blurHandler = () => {
    setKeyword([]);
  };

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src="/images/pattiams_header_logo.svg" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <Navbar.Text className="me-4">
                <InputGroup className="inputfield-for-search">
                  <div>
                    <div className="d-flex">
                      <div className="d-none d-lg-block">
                        <DropdownButton
                          variant=""
                          title="Categories"
                          id="input-group-dropdown-1"
                        >
                          <Dropdown.Item href="/productlist/ayurveda">
                            Ayurveda
                          </Dropdown.Item>
                          <Dropdown.Item href="/productlist/beautycare">
                            Beauty Care
                          </Dropdown.Item>
                          <Dropdown.Item href="/productlist/organicfoods">
                            Foods
                          </Dropdown.Item>
                        </DropdownButton>
                      </div>
                      <input
                        type="text"
                        className="input-search-bar"
                        placeholder="Search here"
                        aria-label="Text input with dropdown button"
                        onChange={searchHandler}
                      />
                      <Button type="submit" className="button-search">
                        <img src="/images/search_icon.svg" />
                      </Button>
                    </div>
                  </div>
                </InputGroup>
                {keyword.length != 0 && (
                  <div className="show-search-result">
                    {keyword &&
                      keyword.map((product) => (
                        <Link
                          key={product._id}
                          to={`/product/${product.category}/${product._id}`}
                          className="text-decoration-none"
                          onClick={blurHandler}
                        >
                          <p className="products-in-search">{product.name}</p>
                        </Link>
                      ))}
                  </div>
                )}
              </Navbar.Text>
              <LinkContainer to="/wishlist" className="me-4">
                <Nav.Link className="d-flex align-items-center me-4">
                  <div className="d-flex justify-content-start align-items-start">
                    <img
                      className="wishlist-icon"
                      src="/images/wishlist_icon.svg"
                      alt="pattiams_wishlist"
                    />
                    <Badge bg="danger">
                      {wishlistItems &&
                        wishlistItems.reduce((acc, item) => acc + 1, 0)}
                    </Badge>
                  </div>
                  <span className="wishlist-text">Wishlist</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart" className="me-4">
                <Nav.Link eventKey={2} className="d-flex align-items-center">
                  <img
                    className="cart-icon"
                    src="/images/shopping_cart_icon.svg"
                    alt="pattiams_shopping_cart"
                  />
                  <div className="cart-and-price d-flex flex-column justify-content-center">
                    <span className="cart-text-header">My Cart</span>
                    <span className="cart-price-header">
                    <span className="rupee-symbol">₹</span>
                      {cartItems &&
                        cartItems
                          .reduce(
                            (acc, item) => acc + Number(item.qty) * item.price,
                            0
                          )
                          .toFixed(2)}
                    </span>
                  </div>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <Dropdown>
                  <Dropdown.Toggle className="profile-pic-n-arrow">
                    <span className="text-dark">{userInfo.name}</span>
                    {/* <img className="profile_image_header me-2" src="/images/profile_pic.jpg" alt="pattiams-user-profile-pic" /> */}
                    <img
                      src="/images/down-arrow.svg"
                      alt="pattiams-arrow-down"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <LinkContainer to="/myorders">
                      <Dropdown.Item>My Orders</Dropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/profile">
                      <Dropdown.Item>Profile</Dropdown.Item>
                    </LinkContainer>
                    {userInfo.isAdmin && (
                      <LinkContainer to="/admin-dashboard">
                        <Dropdown.Item>Admin options</Dropdown.Item>
                      </LinkContainer>
                    )}
                    <Dropdown.Item onClick={logoutHandler}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <span className="text-dark">Login/Register</span>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigationbar;

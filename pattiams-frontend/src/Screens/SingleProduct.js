import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Rating from "../Components/Rating";
import {
  Row,
  Col,
  Image,
  Container,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Carousel from "react-bootstrap/Carousel";

import {
  listProductDetails,
  createProductReview,
  listProductsByCategory,
} from "../Actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Constants/productConstants";
import ProductSlider from "../Components/ProductSlider";
import { createCart } from "../Actions/cartActions";

const SingleProduct = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { cat } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let [productVariant, setProductVariant] = useState(0);
  let [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const benefit = product.benefits && product.benefits.split(",");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const cartCreate = useSelector((state) => state.cartCreate);
  const { success } = cartCreate;

  const productsByCategory = useSelector((state) => state.productsByCategory);
  const {
    loading: productCategoryLoading,
    products: productCategoryProducts,
    error: productCategoryError,
  } = productsByCategory;

  const [productLargeImg, setProductLargeImg] = useState("");

  const radios = [];
  product.variant &&
    product.variant.find((vari, index) => {
      radios.push({ name: vari.model, value: index });
    });

  const onTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(listProductDetails(id));
    dispatch(listProductsByCategory(cat));
    onTop();
    if (successProductReview) {
      alert("Review submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, id, successProductReview]);

  const handleDec = () => {
    if (qty > 1) {
      setQty((qty -= 1));
    }
  };
  const handleInc = () => {
    if (qty < 10) {
      setQty((qty += 1));
    }
  };

  const addToCartHandler = () => {

    if(userInfo) {
      const productAdded = {
        id: id,
        qty: qty,
        variant: productVariant,
        price: product.variant[productVariant].price,
      };
  
      dispatch(createCart(productAdded));
        navigate('/cart')
    } else {
      navigate('/login?goto=cart')
    }

    // navigate(
    //   `/cart/${id}?qty=${qty}&variant=${productVariant}&price=${product.variant[productVariant].price}`
    // );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  const productImgHandler = (img) => {
    setProductLargeImg(img);
  };

  // const changeSizeHandler = (event) => {
  //   setProductSize(event.target.value);
  // };

  // arrayOfElements.map((element) => {
  //   return {...element, subElements: element.subElements.filter((subElement) => subElement.surname === 1)}
  // })

  return (
    <div className="pt-5">
      <div className="mobile-screen-btn d-lg-none">
        <button
          onClick={addToCartHandler}
          className="add-to-cart-mobile"
          disabled={product.countInStock === 0}
        >
          Buy Now
        </button>
      </div>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col lg={6} className="d-none d-lg-block">
              <div className="sticky-top">
                <div>
                  <ul className="thumb">
                    {/* {product.image &&
                      product.image.map((thumb) => (
                        <li key={thumb}>
                          <div className="thumb-img-div">
                            <Image
                              className="thumb-img"
                              src={thumb}
                              onMouseOver={() => productImgHandler(thumb)}
                            />
                          </div>
                        </li>
                      ))} */}

                    <li>
                      <div className="thumb-img-div">
                        <Image
                          className="thumb-img"
                          src={product.image && product.image}
                          onMouseOver={() => productImgHandler(product.image)}
                        />
                      </div>
                    </li>

                    {/* <li>
                      <div className="thumb-img-div">
                        <Image className="thumb-img" src={product.thumb} />
                      </div>
                  </li>
                  <li>
                      <div className="thumb-img-div">
                        <Image className="thumb-img" src={product.thumb} />
                      </div>
                  </li>
                  <li>
                      <div className="thumb-img-div">
                        <Image className="thumb-img" src={product.thumb} />
                      </div>
                  </li> */}
                  </ul>
                </div>
                <div className="product-image-div">
                  <Image
                    className="product-image imgBox"
                    src={
                      productLargeImg == "" ? product.image : productLargeImg
                    }
                    alt="sampleImage"
                  />
                </div>

                <div className="row justify-content-center">
                  <div className="col-9">
                    <button
                      className="add-to-cart"
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={12} className="d-lg-none">
              <Carousel>
                {/* {product.thumb &&
                  product.thumb.map((img) => (
                    <Carousel.Item key={product._id}>
                      <img
                        className="d-block w-100"
                        src={img}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  ))} */}
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={product.image && product.image}
                    alt="First slide"
                  />
                </Carousel.Item>
              </Carousel>
            </Col>

            <Col lg={6}>
              <Row className="my-3">
                <h3>{product.name}</h3>
              </Row>
              <Row className="my-3">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </Row>
              <Row className="my-3">
                <span>
                  Price:{" "}
                  {product.variant && product.variant.length === 1 && (
                    <>₹{product.variant[0]?.price}</>
                  )}
                  {product.variant && product.variant.length !== 1 && (
                    <>₹{product.variant[productVariant].price}</>
                  )}
                  {/* {productSize && product.discountPrice[0] > 0 ? (
                    <>
                      <s>₹{product.price[productSize]}</s>{" "}
                      <span className="h4">
                        ₹{product.discountPrice[productSize]}
                      </span>
                    </>
                  ) : (
                    <>
                      ₹
                      {productSize
                        ? product.price[productSize]
                        : product.price && product.price[0]}
                    </>
                  )} */}
                  {/* {productSize ? product.discountPrice[productSize] : product.discountPrice[0] > 0 ? (
                    <>
                      <s>₹{productSize ? product.discountPrice[productSize] : product.discountPrice[0]}</s>{" "}
                      <span className="h4">₹{productSize ? product.discountPrice[productSize] : product.discountPrice[0]}</span>
                    </>
                  ) : (
                    <>₹{productSize ? product.price[productSize] : product.price && product.price[0]}</>
                  )} */}
                  {/* <>₹{productSize ? product.price[productSize] : product.price && product.price[0]}</> */}
                </span>
              </Row>
              <div className="d-flex align-items-center mt-4">
                <span className="label-text me-3">Size: </span>
                {product.variant && product.variant.length !== 1 && (
                  <ButtonGroup>
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        variant="outline-danger"
                        type="radio"
                        name="radio"
                        value={radio.value}
                        checked={productVariant === radio.value}
                        onChange={(e) =>
                          setProductVariant(e.currentTarget.value)
                        }
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                )}
                {product.variant && product.variant.length === 1 && (
                  <>{product.variant[0].model}</>
                )}
              </div>

              <div className="product-quantity d-flex align-items-center mt-4">
                <span className="label-text me-3">Quantity: </span>
                <button className="quantity-control" onClick={handleDec}>
                  -
                </button>
                <div className="quantity-show">{qty}</div>
                <button className="quantity-control" onClick={handleInc}>
                  +
                </button>
              </div>

                  <hr />

              <Row className="mt-5 product-desc">
                <span className="desc-subhead">Description:</span>
                <span className="product-desc-text">
                  {product.description && product.description}
                </span>
                <span className="desc-subhead">Ingredients:</span>
                <span className="product-desc-text">
                  {product.ingredients && product.ingredients}
                </span>
                <span className="desc-subhead">How to use:</span>
                <span className="product-desc-text">
                  {product.howToUse && product.howToUse}
                </span>
                
                  {benefit && <span className="desc-subhead">Benefits:</span>}
                
                <ul>
                  {benefit &&
                    benefit.map((ben, index) => (
                      <li className="product-desc-list" key={index}>
                        {ben}
                      </li>
                    ))}
                </ul>
              </Row>

            </Col>
          </Row>

        )}

        <Row className="mt-5">
          <Col>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No reviews</Message>}
            <ListGroup>
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Write a customer review</h2>
                {errorProductReview && (
                  <Message variant="danger">{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="mt-2">
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to="/login">Sign in</Link> to write your review
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2>Related Products</h2>
          </Col>
        </Row>
        <Row>
          <ProductSlider cat={cat} />
        </Row>
      </Container>
    </div>
  );
};

export default SingleProduct;

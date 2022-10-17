import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { Link } from "react-router-dom";
import { listAyurvedicProducts } from "../Actions/productActions";
import { Container, Row, Col } from "react-bootstrap";
import OneProductCard2 from "../Components/OneProductCard2";

const AyurvedaProductsPage = () => {
  const dispatch = useDispatch();

  // const pageNumber = useParams().pageNumber || 1;

  const { catslug } = useParams();

  const onTop = () => {
    window.scrollTo(0, 0);
  };

  const listProductsByCategory = useSelector(
    (state) => state.listProductsByCategory
  );
  const { loading, products, error } = listProductsByCategory;

  useEffect(() => {
    onTop();
    dispatch(listAyurvedicProducts(catslug));
  }, [dispatch, listAyurvedicProducts, catslug]);

  return (
    <>
      <Container>
        <div className="mt-4 productscreen-first-column p-2">
          <span>Categories:&nbsp;</span>
          <span className="product-screen-each-cat">
            <Link to={`/productlist/ayurveda`} className="sidebar-links">
              Ayurveda |
            </Link>
          </span>
          <span className="product-screen-each-cat">
            <Link to={`/productlist/beautycare`} className="sidebar-links">
              &nbsp;Beauty Care |
            </Link>
          </span>
          <span className="product-screen-each-cat">
            <Link to={`/productlist/organicfoods`} className="sidebar-links">
              &nbsp;Foods |
            </Link>
          </span>
          <span className="product-screen-each-cat">
            <Link to={`/productlist/furniture`} className="sidebar-links">
              &nbsp;Furniture
            </Link>
          </span>
        </div>

        <div className="mt-4 productscreen-first-column p-2">
          <div className="mx-4 mt-3 text-center">
            <img className="my-3" src="../images/pattiams_ayurveda_icon.svg" />
            <p className="mt-3">
              Ayurveda is the adaptation of nature into human life. Pattiam's
              ayurvedic herbal products help you improve your immunity and
              digestion, boosts strength and stamina. Experience the magical
              herbs in their pure form.
            </p>
          </div>
          <div>
            <Row className="d-none d-xxl-flex">
              {loading && <Loader />}
              {error && <Message variant="danger">{error.message}</Message>}
              {products &&
                products.map((product) => (
                    <Col md={3} key={product._id} className="mt-2 mt-lg-5">
                      <OneProductCard2 product={product} />
                    </Col>
                ))}
            </Row>

            <Row className="d-none d-lg-flex d-xxl-none">
              {loading && <Loader />}
              {error && <Message variant="danger">{error.message}</Message>}
              {products &&
                products.map((product) => (
                    <Col md={4} key={product._id} className="mt-2 mt-lg-5">
                      <OneProductCard2 product={product} />
                    </Col>
                ))}
            </Row>

            <Row className="d-flex d-lg-none">
              {loading && <Loader />}
              {error && <Message variant="danger">{error.message}</Message>}

              {products &&
                products.map((product) => (
                    <Col md={6} key={product._id} className="mt-2 mt-lg-5">
                      <OneProductCard2 product={product} />
                    </Col>
                ))}
            </Row>

            {/* <div className="d-flex justify-content-center mt-5">
            <Paginate pages={pages} page={page} cat={cat} />
          </div> */}
          </div>
        </div>
      </Container>
    </>
  );
};

export default AyurvedaProductsPage;

import React, { useEffect, useState } from "react";
import { Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import OneProductCard2 from "../Components/OneProductCard2";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  listCategory2,
  listProductsByCategory,
} from "../Actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Paginate from "../Components/Paginate";
import { Link } from "react-router-dom";

const ProductListScreen = () => {
  const dispatch = useDispatch();

  const { cat } = useParams();

  // const [categories, setCategories] = useState();

  const productsByCategory = useSelector((state) => state.productsByCategory);
  const { loading, products, error, page, pages } = productsByCategory;

  const listCategories = useSelector((state) => state.listCategory2);
  const {
    loading: loadingCategories,
    categories: listAyurCategories,
    error: errorCategories,
  } = listCategories;

  const onTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // const fetchCategoryDetails = async () => {
    //   const { data } = await axios.get("/api/categories");
    //   setCategories(data);
    // };
    // fetchCategoryDetails();
    onTop();
    if (cat === "ayurveda") {
      dispatch(listCategory2());
    }
    dispatch(listProductsByCategory(cat));
  }, [dispatch, listProductsByCategory, cat, listCategory2]);

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
          <div className="mx-4 mt-3">
            {cat && cat === "ayurveda" ? (
              <div className="text-center">
                <img
                  className="my-3"
                  src="../images/pattiams-ayurveda-logo-final.svg"
                />
                <p className="mt-3">
                  Ayurveda is the adaptation of nature into human life.
                  Pattiam's ayurvedic herbal products help you improve your
                  immunity and digestion, boosts strength and stamina.
                  Experience the magical herbs in their pure form.
                </p>
              </div>
            ) : cat === "beautycare" ? (
              <div className="text-center">
                <img
                  className="my-3"
                  src="../images/pattiams-beautycare-logo-final.svg"
                />
                <p className="mt-3">
                  Bringing you an exclusive collection of natural cosmetics. A
                  healthy partner for all your beauty care needs. Toxin-free,
                  harmless and beneficial for your skin.
                </p>
              </div>
            ) : cat === "organicfoods" ? (
              <div className="text-center">
                <img
                  className="my-3"
                  src="../images/pattiams-foods-logo-final.svg"
                />
                <p className="mt-3">
                  Pattiam's food products are manufactured with utmost hygiene
                  and supreme quality. The natural ingredients we use keeps our
                  products tasty and healthy.
                </p>
              </div>
            ) : cat === "furniture" ? (
              <div className="text-center">
                <img
                  className="my-3"
                  src="../images/pattiams-furniture-logo-final.svg"
                />
                <p className="mt-3">
                  A place where all your dream-home decor needs are met.
                  Aesthetic, modern, sleek and stylistic customized furniture
                  products for every interior.
                </p>
              </div>
            ) : cat === "abhyanga" ? (
              <div className="text-center">
                <img
                  className="my-3"
                  src="../images/pattiams_abhyanga_icon.svg"
                />
                <p className="mt-3">
                  The Panchakarma treatment followed from the ancient
                  practitioners, directly for you to experience in the exact
                  same way. The treatment helps to relax the mind, purifies the
                  body, enhances the strength of digestive system, relieves
                  stress and boosts immunity.
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>

          <Row className="d-none d-xxl-flex">
            {cat && cat === "ayurveda" && (
              <Container>
                <div className="text-center my-3 cat-btn-div">
                  <a href="#patent" className="text-decoration-none">
                    <span className="ayurveda-cat-btn">Patent Products</span>
                  </a>
                  <a href="#classical" className="text-decoration-none">
                    <span className="ayurveda-cat-btn">Classical Products</span>
                  </a>
                </div>
              </Container>
            )}

            {cat && cat === "ayurveda" && (
              <h3 className="text-center mt-5" id="patent">
                Patent Products
              </h3>
            )}

            {loading && <Loader />}
            {error && <Message variant="danger">{error.message}</Message>}
            {products &&
              products.map(
                (product) =>
                  !product.subCategory && (
                    <Col md={3} key={product._id} className="mt-2 mt-lg-5">
                      <OneProductCard2 product={product} />
                    </Col>
                  )
              )}

            {cat && cat === "ayurveda" && (
              <h3 className="text-center mt-5" id="classical">Classical Products</h3>
            )}
            {cat &&
              cat === "ayurveda" &&
              listAyurCategories &&
              listAyurCategories.map((cats) => (
                <>
                  <Col md={3} key={cats._id} className="mt-2 mt-lg-5">
                    <Link
                      to={`/ayurveda/${cats.slug}`}
                      className="text-decoration-none"
                    >
                      <div className="ayur-cat-div p-2">
                        <div className="cat-img-div">
                          <img className="cat-img" src={cats.image} />
                        </div>
                        <p className="category-names text-center">
                          {cats.name}
                        </p>
                      </div>
                    </Link>
                  </Col>
                </>
              ))}

            {/* {products &&
              products.map(
                (product) =>
                  product.subCategory && (
                    <>
                      <Col md={3} key={product._id} className="mt-2 mt-lg-5">
                        <OneProductCard2 product={product} />
                      </Col>
                    </>
                  )
              )} */}
          </Row>

          <Row className="d-none d-lg-flex d-xxl-none">

          {cat && cat === "ayurveda" && (
              <Container>
                <div className="text-center my-3 cat-btn-div">
                  <a href="#patent2" className="text-decoration-none">
                    <span className="ayurveda-cat-btn">Patent Products</span>
                  </a>
                  <a href="#classical2" className="text-decoration-none">
                    <span className="ayurveda-cat-btn">Classical Products</span>
                  </a>
                </div>
              </Container>
            )}

            {loading && <Loader />}
            {error && <Message variant="danger">{error.message}</Message>}
            {cat && cat === "ayurveda" && (
              <h3 className="text-center mt-5" id="patent2">
                Patent Products
              </h3>
            )}
            {products &&
              products.map(
                (product) =>
                  !product.subCategory && (
                    <Col md={4} className="mt-2 mt-lg-5">
                      <OneProductCard2 product={product} />
                    </Col>
                  )
              )}

            {cat && cat === "ayurveda" && (
              <h3 className="text-center mt-5" id="classical2">Classical Products</h3>
            )}

            {cat &&
              cat === "ayurveda" &&
              listAyurCategories &&
              listAyurCategories.map((cats) => (
                <Col md={4} key={cats._id} className="mt-2 mt-lg-5">
                  <Link
                      to={`/ayurveda/${cats.slug}`}
                      className="text-decoration-none"
                    >
                  <div className="ayur-cat-div p-2">
                    <div className="cat-img-div">
                      <img className="cat-img" src={cats.image} />
                    </div>
                    <p className="category-names text-center">{cats.name}</p>
                  </div>
                  </Link>
                </Col>
              ))}

            {/* {products &&
              products.map(
                (product) =>
                  product.subCategory && (
                    <>
                      <Col md={4} className="mt-2 mt-lg-5">
                        <OneProductCard2 product={product} />
                      </Col>
                    </>
                  )
              )} */}
          </Row>

          <Row className="d-flex d-lg-none">
            {loading && <Loader />}
            {error && <Message variant="danger">{error.message}</Message>}

            {cat && cat === "ayurveda" && (
              <Container>
                <div className="text-center my-3 cat-btn-div">
                  <a href="#patent3" className="text-decoration-none">
                    <span className="ayurveda-cat-btn">Patent Products</span>
                  </a>
                  <a href="#classical3" className="text-decoration-none">
                    <span className="ayurveda-cat-btn">Classical Products</span>
                  </a>
                </div>
              </Container>
            )}

            {cat && cat === "ayurveda" && (
              <h3 className="text-center mt-5" id="patent3">
                Patent Products
              </h3>
            )}
            {products &&
              products.map(
                (product) =>
                  !product.subCategory && (
                    <Col md={6} className="mt-2 mt-lg-5">
                      <OneProductCard2 product={product} />
                    </Col>
                  )
              )}

            {cat && cat === "ayurveda" && (
              <h3 className="text-center mt-5" id="classical3">Classical Products</h3>
            )}

            {cat &&
              cat === "ayurveda" &&
              listAyurCategories &&
              listAyurCategories.map((cats) => (
                <>
                  <Col md={6} key={cats._id} className="mt-2 mt-lg-5">
                  <Link
                      to={`/ayurveda/${cats.slug}`}
                      className="text-decoration-none"
                    >
                    <div className="d-flex justify-content-center">
                      <div className="ayur-cat-div p-2">
                        <div className="cat-img-div">
                          <img className="cat-img" src={cats.image} />
                        </div>
                        <p className="category-names text-center">
                          {cats.name}
                        </p>
                      </div>
                    </div>
                    </Link>
                  </Col>
                </>
              ))}

            {/* {products &&
              products.map(
                (product) =>
                  product.subCategory && (
                    <>
                      <Col md={6} className="mt-2 mt-lg-5">
                        <OneProductCard2 product={product} />
                      </Col>
                    </>
                  )
              )} */}
          </Row>

          {/* <div className="d-flex justify-content-center mt-5">
            <Paginate pages={pages} page={page} cat={cat} />
          </div> */}
        </div>
      </Container>
    </>
  );
};

export default ProductListScreen;

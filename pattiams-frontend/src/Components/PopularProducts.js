import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import OneProductCard from "./OneProductCard";

import "./PopularProducts.css";
import { listTopProducts } from "../Actions/productActions";
import Slider from "react-slick";

const PopularProducts = ({ showAlert }) => {
  const sliderRef = useRef(null);
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  const carouselProperties = {
    arrows: false,
    ref: sliderRef,
    autoplay: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="popular-products-main-div">
        <div className="container">
          <div className="row">
            <div className="d-flex align-items-center justify-content-between">
              <span className="popular-products-title text-center">
                Popular Products
              </span>

              {products && products.length > 4 ? (
                <div className="d-none d-md-block">
                  <span
                    className="arrow-button-products"
                    onClick={() => sliderRef.current.slickPrev()}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </span>
                  <span
                    className="arrow-button-products"
                    onClick={() => sliderRef.current.slickNext()}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </div>
              ) : (
                <></>
              )}
              {/* <div className="d-none d-md-block">
                <span
                  className="arrow-button-products"
                  onClick={() => sliderRef.current.slickPrev()}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </span>
                <span
                  className="arrow-button-products"
                  onClick={() => sliderRef.current.slickNext()}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </div> */}
            </div>

            <div className="">
              <Slider {...carouselProperties}>
                {products &&
                  products.map((product) => (
                    <div className="product-cards-main-div" key={product._id}>
                      <OneProductCard showAlert={showAlert} product={product} />
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularProducts;

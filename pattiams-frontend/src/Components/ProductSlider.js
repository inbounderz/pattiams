import React, { useRef, useState, useEffect } from "react";
import OneProductCard from "./OneProductCard";
import "./ProductSlider.css";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Loader from "../Components/Loader";
import Message from "../Components/Message";

import { useDispatch, useSelector } from "react-redux";
// Carousel/slider imports starts here
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Carousel/slider imports ends here

import {
  listProducts,
  listProductsByCategory,
} from "../Actions/productActions";

import axios from "axios";

const ProductSlider = ({ cat, showAlert }) => {
  const dispatch = useDispatch();

  const sliderRefPC = useRef(null);

  const pageNumber = useParams().pageNumber || "";

  const [fetchProducts, setFetchProducts] = useState();

  const productsByCategory = useSelector((state) => state.productsByCategory);
  const { loading, error, products } = productsByCategory;

  useEffect(() => {
    // dispatch(listProductsByCategory(cat));
    const fetchProductsFun = async () => {
      const { data } = await axios.get(
        `/api/products/category/${cat}?pageNumber=${pageNumber}`
      );
      setFetchProducts(data.products);
    };
    fetchProductsFun();
  }, [axios, cat, pageNumber]);

  const prevButton = (props) => {
    return (
      <div>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    );
  };

  const nextButton = (props) => {
    return (
      <div>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    );
  };

  const PrevBtn = (props) => {
    const { className, onClick } = props;
    return (
      <div className="className" onClick={onClick}>
        <i className="fa-solid fa-arrow-left"></i>
      </div>
    );
  };

  const NextBtn = (props) => {
    const { className, onClick } = props;
    return (
      <div className="className" onClick={onClick}>
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    );
  };

  const carouselProperties = {
    arrows: false,
    ref: sliderRefPC,
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
      <div className="row">
        <div className="d-flex align-items-center justify-content-end">
          <div className="arrows">
            <span
              className="arrow-button-products"
              onClick={() => sliderRefPC.current.slickPrev()}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            <span
              className="arrow-button-products-right"
              onClick={() => sliderRefPC.current.slickNext()}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : cat && cat == "ayurveda" ? (
        <Slider {...carouselProperties}>
          {fetchProducts &&
            fetchProducts.map(
              (product) =>
                product.subCategory === "" || !product.subCategory && (
                  <div key={product._id}>
                    <OneProductCard
                      key={product.name}
                      product={product}
                      showAlert={showAlert}
                    />
                  </div>
                )
            )}
        </Slider>
      ) : (
        <Slider {...carouselProperties}>
          {fetchProducts &&
            fetchProducts.map((product) => (
              <div key={product._id}>
                <OneProductCard
                  key={product.name}
                  product={product}
                  showAlert={showAlert}
                />
              </div>
            ))}
        </Slider>
      )}
      {/* Multi item carousel ends here */}
    </>
  );
};

export default ProductSlider;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./OneProductCard2.css";
import { addToCart } from "../Actions/cartActions";
import { addToWishlist } from "../Actions/wishlistActions";

const OneProductCard = ({ product, showAlert }) => {

  const dispatch = useDispatch();

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add to wishlist
    </Tooltip>
  );
  
  const addToWishlistHandler = () => {
    dispatch(addToWishlist(product._id));
    showAlert("The product added to wishlist", "danger");
  };

  return (
    <>
      <div className="product-card">
        <div className="card-content-main-div">
          <Link
            to={`/product/${product.category}/${product._id}`}
            className="text-decoration-none"
          >
            <div className="popular-product-image-div">
              <img
                className="popular-product-image"
                src={product && product.image}
                alt="pattiams_product_image"
              />
            </div>

            <div className="popular-product-text-div">
              <p className="popular-products-category-name"></p>
              <p className="popular-products-name">{product && product.name}</p>
            </div>
          </Link>

          <div className="price-and-button-div row">
            <div className="col-3">
              <span className="discounted-price">
              <span className="rupee-symbol">₹</span>{product.variant && product.variant[0].price}
              </span>
            </div>
            <div className="col-9 d-flex align-items-center justify-content-end">
              <OverlayTrigger
                placement="left"
                delay={{ show: 10, hide: 400 }}
                overlay={renderTooltip}
              >
                <img
                  className="popular-product-add-to-fav-icon"
                  src="../../images/pattiams_add_to_favourites_icon.svg"
                  alt="pattiams_add_to_favourites_icon"
                  onClick={addToWishlistHandler}
                />
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneProductCard;

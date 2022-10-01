import React from "react";
import "./CategoryBar.css";
import { Link } from "react-router-dom";

const CategoryBar = () => {
  return (
    <>
      <div className="categories-tab-main-div">
        <div className="row d-flex justify-content-center">
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
              <Link to={`productlist/ayurveda`} className="text-decoration-none">
            <div className="text-center ">
              <img
                className=""
                src="images/pattiams_ayurveda_category_icon.svg"
                alt="pattiams_ayurveda_category_icon"
              />
              <p className="categorybar-text">Ayurveda</p>
            </div>
              </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
          <Link to={`productlist/organicfoods`} className="text-decoration-none">
            <div className="text-center">
              <img
                className=""
                src="images/pattiams_organic_food_category_icon.svg"
                alt="pattiams_organic_food_category_icon"
              />
              <p className="categorybar-text">Foods</p>
            </div>
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
          <Link to={`productlist/beautycare`} className="text-decoration-none">
            <div className="text-center">
              <img
                className=""
                src="images/pattiams_beautycare_category_icon.svg"
                alt="pattiams_beautycare_category_icon"
              />
              <p className="categorybar-text">Beauty Care</p>
            </div>
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
          <Link to={`productlist/furniture`} className="text-decoration-none">
            <div className="text-center">
              <img
                className=""
                src="images/pattiams_furniture_category_icon.svg"
                alt="pattiams_furniture_category_icon"
              />
              <p className="categorybar-text">Furniture</p>
            </div>
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
          <Link to={`productlist/abhyanga`} className="text-decoration-none">
            <div className="text-center">
              <img
                className=""
                src="images/pattiams_panchakarma_category_icon.svg"
                alt="pattiams_panchakarma_category_icon"
              />
              <p className="categorybar-text">Abhyanga</p>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryBar;

import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import "./Products.css";
import ProductSlider from "./ProductSlider";
import HomepageButton from "./HomepageButton";
import { Link } from "react-router-dom";
// import CategoryHeading from "./CategoryHeading";

import axios from "axios";
import { Button } from "react-bootstrap";

const Products = ({ showAlert }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      const { data } = await axios.get("/api/categories");
      setCategories(data);
    };

    fetchCategoryDetails();
  }, [axios]);

  return (
    <Container className="products-main-div">
      <div>
        <div
          className="mb-5 d-none d-lg-block"
          style={{
            background: `rgba(147, 178, 120, 0.1)`,
            marginTop: "110px",
            height: "200px",
            border: `1px solid #93B278`,
            borderRadius: "30px",
          }}
        >
          <div className="d-flex align-items-center">
            <div className="p-5">
              <div className="pattiams-ayurveda-icon me-4 d-flex flex-column text-center">
                <img
                  className="pattiams-ayurveda-icon-img"
                  src="images/pattiams-ayurveda-logo-final.svg"
                  alt="pattiams_ayurveda_icon"
                />
              </div>
            </div>
            <div className="pattiams-ayurveda-img me-2">
              <img
                src="images/pattiams_ayurveda_img.svg"
                alt="pattiams_ayurveda_icon"
              />
            </div>
            <div className="p-5">
              <span className="pattiams-category-desc">
                Experience the magical herbs in their pure form.
              </span>
            </div>
          </div>
        </div>

        {/* <div className="mx-3 my-5 text-center d-none d-lg-block">
          <h6>{category.desc}</h6>
        </div> */}

        <div className="d-flex d-lg-none flex-column align-items-center mobile-cat-main-div">
          <img
            className="mobile-category-icon"
            src="images/pattiams-ayurveda-logo-final.svg"
          />
          <div className="pattiams-category-heading-mobile">
            <span className="pattiams-category-heading-text">
              Experience the magical herbs in their pure form.
            </span>
          </div>
        </div>
        {/* <div className="text-center d-lg-none">
          <p>{category.desc}</p>
        </div> */}
        {/* Category heading ends here */}
        {categories
          .filter((cat) => cat.name == "ayurveda")
          .map((category) => (
            <div key={category._id}>
              <ProductSlider
                key={category._id}
                cat={category.name}
                showAlert={showAlert}
              />
              <Link
                to={`/productlist/${category.name}`}
                className="text-decoration-none"
              >
                <HomepageButton text="View more" />
              </Link>
            </div>
          ))}
      </div>

      <div>
        <div
          className="mb-5 d-none d-lg-block"
          style={{
            background: `rgba(134, 129, 211, 0.15)`,
            marginTop: "110px",
            height: "200px",
            border: `1px solid #8681D3`,
            borderRadius: "30px",
          }}
        >
          <div className="d-flex align-items-center">
            <div className="p-5">
              <div className="pattiams-ayurveda-icon me-4 d-flex flex-column text-center">
                <img
                  className="pattiams-ayurveda-icon-img"
                  src="images/pattiams-beautycare-logo-final.svg"
                  alt="pattiams_bodycare_logo"
                />
              </div>
            </div>
            <div className="pattiams-ayurveda-img me-2">
              <img
                src="images/pattiams_bodycare_img.svg"
                alt="pattiams_bodycare_icon"
              />
            </div>
            <div className="p-5">
              <span className="pattiams-category-desc">
                Bringing you an exclusive collection of natural cosmetics.
              </span>
            </div>
          </div>
        </div>

        {/* <div className="mx-3 my-5 text-center d-none d-lg-block">
          <h6>{category.desc}</h6>
        </div> */}

        <div className="d-flex d-lg-none flex-column align-items-center mobile-cat-main-div">
          <img
            className="mobile-category-icon"
            src="images/pattiams-beautycare-logo-final.svg"
          />
          <div className="pattiams-category-heading-mobile">
            <span className="pattiams-category-heading-text">
              Bringing you an exclusive collection of natural cosmetics.
            </span>
          </div>
        </div>
        {/* <div className="text-center d-lg-none">
          <p>{category.desc}</p>
        </div> */}
        {/* Category heading ends here */}
        {categories
          .filter((cat) => cat.name == "beautycare")
          .map((category) => (
            <div key={category._id}>
              <ProductSlider
                key={category._id}
                cat={category.name}
                showAlert={showAlert}
              />
              <Link
                to={`/productlist/${category.name}`}
                className="text-decoration-none"
              >
                <HomepageButton text="View more" />
              </Link>
            </div>
          ))}
      </div>

      <div>
        <div
          className="mb-5 d-none d-lg-block"
          style={{
            background: `rgba(255, 173, 90, 0.15`,
            marginTop: "110px",
            height: "200px",
            border: `1px solid #FFAD5A`,
            borderRadius: "30px",
          }}
        >
          <div className="d-flex align-items-center">
            <div className="p-5">
              <div className="pattiams-ayurveda-icon me-4 d-flex flex-column text-center">
                <img
                  className="pattiams-ayurveda-icon-img"
                  src="images/pattiams-foods-logo-final.svg"
                  alt="pattiams_foods_logo"
                />
              </div>
            </div>
            <div className="pattiams-ayurveda-img me-2">
              <img
                src="images/pattiams_organicfoods_img.svg"
                alt="pattiams_organicfoods_icon"
              />
            </div>
            <div className="p-5">
              <span className="pattiams-category-desc">
                Pattiam's food products are manufactured with utmost hygiene and
                supreme quality.
              </span>
            </div>
          </div>
        </div>

        {/* <div className="mx-3 my-5 text-center d-none d-lg-block">
          <h6>{category.desc}</h6>
        </div> */}

        <div className="d-flex d-lg-none flex-column align-items-center mobile-cat-main-div">
          <img
            className="mobile-category-icon"
            src="images/pattiams-foods-logo-final.svg"
          />
          <div className="pattiams-category-heading-mobile">
            <span className="pattiams-category-heading-text">
              Pattiam's food products are manufactured with utmost hygiene and
              supreme quality.
            </span>
          </div>
        </div>
        {/* <div className="text-center d-lg-none">
          <p>{category.desc}</p>
        </div> */}
        {/* Category heading ends here */}
        {categories
          .filter((cat) => cat.name == "organicfoods")
          .map((category) => (
            <div key={category._id}>
              <ProductSlider
                key={category._id}
                cat={category.name}
                showAlert={showAlert}
              />
              <Link
                to={`/productlist/${category.name}`}
                className="text-decoration-none"
              >
                <HomepageButton text="View more" />
              </Link>
            </div>
          ))}
      </div>

      <div>
        <div
          className="mb-5 d-none d-lg-block"
          style={{
            background: `rgba(205, 163, 109, 0.15)`,
            marginTop: "110px",
            height: "200px",
            border: `1px solid #CDA36D`,
            borderRadius: "30px",
          }}
        >
          <div className="d-flex align-items-center">
            <div className="p-5">
              <div className="pattiams-ayurveda-icon me-4 d-flex flex-column text-center">
                <img
                  className="pattiams-ayurveda-icon-img"
                  src="images/pattiams-furniture-logo-final.svg"
                  alt="pattiams_furniture_logo"
                />
              </div>
            </div>
            <div className="pattiams-ayurveda-img me-2">
              <img
                src="images/pattiams_furniture_img.svg"
                alt="pattiams_furniture_icon"
              />
            </div>
            <div className="p-5">
              <span className="pattiams-category-desc">
                Aesthetic, modern, sleek and stylistic customized furniture
                products for every interior.
              </span>
            </div>
          </div>
        </div>

        {/* <div className="mx-3 my-5 text-center d-none d-lg-block">
          <h6>{category.desc}</h6>
        </div> */}

        <div className="d-flex d-lg-none flex-column align-items-center mobile-cat-main-div">
          <img
            className="mobile-category-icon"
            src="images/pattiams-furniture-logo-final.svg"
          />
          <div className="pattiams-category-heading-mobile">
            <span className="pattiams-category-heading-text">
              Aesthetic, modern, sleek and stylistic customized furniture
              products for every interior.
            </span>
          </div>
        </div>
        {/* <div className="text-center d-lg-none">
          <p>{category.desc}</p>
        </div> */}
        {/* Category heading ends here */}
        {categories
          .filter((cat) => cat.name == "furniture")
          .map((category) => (
            <div key={category._id}>
              <Link
                key={category._id}
                to={`/productlist/${category.name}`}
                className="text-decoration-none"
              >
                <HomepageButton text="View more" />
              </Link>
            </div>
          ))}
      </div>

      <div>
        <div
          className="mb-5 d-none d-lg-block"
          style={{
            background: `rgba(205, 163, 109, 0.15)`,
            marginTop: "110px",
            height: "200px",
            border: `1px solid #CDA36D`,
            borderRadius: "30px",
          }}
        >
          <div className="d-flex align-items-center">
            <div className="p-5">
              <div className="pattiams-ayurveda-icon me-4 d-flex flex-column text-center">
                <img
                  className="pattiams-ayurveda-icon-img"
                  src="images/pattiams_abhyanga_icon.svg"
                  alt="ppattiams_abhyanga_icon"
                />
              </div>
            </div>
            <div className="pattiams-ayurveda-img me-2">
              <img
                src="images/pattiams_abhyanga_img.svg"
                alt="pattiams_abhyanga_img"
              />
            </div>
            <div className="p-5">
              <span className="pattiams-category-desc">
                The Panchakarma treatment followed from the ancient
                practitioners.
              </span>
            </div>
          </div>
        </div>

        {/* <div className="mx-3 my-5 text-center d-none d-lg-block">
          <h6>{category.desc}</h6>
        </div> */}

        <div className="d-flex d-lg-none flex-column align-items-center mobile-cat-main-div">
          <img
            className="mobile-category-icon"
            src="images/pattiams_abhyanga_icon.svg"
          />
          <div className="pattiams-category-heading-mobile">
            <span className="pattiams-category-heading-text">
              The Panchakarma treatment followed from the ancient practitioners.
            </span>
          </div>
        </div>
        {/* <div className="text-center d-lg-none">
          <p>{category.desc}</p>
        </div> */}
        <div className="text-center">
        <a
          href={`https://pattiamsabhyanga.com`}
          className="text-decoration-none"
          target="_blank"
        >
          <Button>Visit Pattiam's Abhyanga</Button>
        </a>
        </div>
      </div>
    </Container>
  );
};

export default Products;

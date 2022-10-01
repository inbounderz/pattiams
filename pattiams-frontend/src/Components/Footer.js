import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-main-div">
        <div className="container">
          <div className="d-none d-lg-block">
            <div className="row justify-content-between">
              <div className="col-2">
                <img
                  src="/images/pattiams_header_logo.svg"
                  alt="pattiams_logo"
                />
              </div>
              <div className="col-2">
                <div className="footer-sub-heading">Categories</div>
                <Link
                  to={`productlist/ayurveda`}
                  className="text-decoration-none"
                >
                  <span className="footer-links">Ayurveda</span>
                </Link>
                <br />
                <Link
                  to={`productlist/organicfoods`}
                  className="text-decoration-none"
                >
                  <span className="footer-links">Foods</span>
                </Link>
                <br />
                <Link
                  to={`productlist/beautycare`}
                  className="text-decoration-none"
                >
                  <span className="footer-links">Beauty Care</span>
                </Link>
                <br />
                <Link
                  to={`productlist/furniture`}
                  className="text-decoration-none"
                >
                  <span className="footer-links">Furniture</span>
                </Link>
                <br />
                <Link to={``} className="text-decoration-none">
                  <span className="footer-links">Abhyanga</span>
                </Link>
              </div>
              <div className="col-2">
                <div className="footer-sub-heading">Society</div>
                <Link to={`/aboutpattiams`} className="text-decoration-none">
                  <span className="footer-links">About</span>
                </Link>
                <br />
                <Link to={`/message`} className="text-decoration-none">
                  <span className="footer-links">Chairman's Message</span>
                </Link>
                <br />
                <Link to={`/careers`} className="text-decoration-none">
                  <span className="footer-links">Career</span>
                </Link>
              </div>
              <div className="col-2">
                <div className="footer-sub-heading">Policies</div>
                <Link to={`/privacy`} className="text-decoration-none">
                  <span className="footer-links">Privacy Policy</span>
                </Link>
                <br />
                <Link to={`/terms`} className="text-decoration-none">
                  <span className="footer-links">Terms and Conditions</span>
                </Link>
                <br />
              </div>
              <div className="col-2">
                <div className="footer-sub-heading">Contact</div>
                <Link to={`/contact`} className="text-decoration-none">
                  <span className="footer-links">Contact Us</span>
                </Link>
                <br />

                <div className="d-flex mt-5">
                  <img
                    className="me-3"
                    src="/images/pattiams_fb_icon.svg"
                    alt="pattiams_fb_icon"
                  />
                  <img
                    className="me-3"
                    src="/images/pattiams_insta_icon.svg"
                    alt="pattiams_insta_icon"
                  />
                  <img
                    className="me-3"
                    src="/images/pattiams_twitter_icon.svg"
                    alt="pattiams_twitter_icon"
                  />
                  <img
                    className="me-3"
                    src="/images/pattiams_youtube_icon.svg"
                    alt="pattiams_youtube_icon"
                  />
                </div>
              </div>
            </div>
            <div className="footer-bottom-text-div d-flex justify-content-between">
              <span className="footer-bottom-text">&#169;Pattiam's</span>
              <span className="footer-bottom-text">
                All Rights
                Reserved&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Designed
                by{" "}
                <a
                  href="https://www.inbounderz.com"
                  className="text-dark"
                >
                  Inbounderz
                </a>
              </span>
            </div>
          </div>

          {/* Mobile view starts here */}
          <div className="d-block d-lg-none">
            <div className="d-flex flex-column align-items-center">
              <img src="/images/pattiams_header_logo.svg" />
            </div>
            <div className="my-5 w-100">
              <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Categories</Accordion.Header>
                  <Accordion.Body>
                    <Link
                      to={`productlist/ayurveda`}
                      className="text-decoration-none"
                    >
                      <span className="footer-links">Ayurveda</span>
                    </Link>
                    <br />
                    <Link
                      to={`productlist/ayurveda`}
                      className="text-decoration-none"
                    >
                      <span className="footer-links">Foods</span>
                    </Link>
                    <br />
                    <Link
                      to={`productlist/beautycare`}
                      className="text-decoration-none"
                    >
                      <span className="footer-links">Beauty Care</span>
                    </Link>
                    <br />
                    <Link
                      to={`productlist/furniture`}
                      className="text-decoration-none"
                    >
                      <span className="footer-links">Furniture</span>
                    </Link>
                    <br />
                    <Link
                      to={`productlist/ayurveda`}
                      className="text-decoration-none"
                    >
                      <span className="footer-links">Panchakarma</span>
                    </Link>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Society</Accordion.Header>
                  <Accordion.Body>
                    <Link
                      to={`/aboutpattiams`}
                      className="text-decoration-none"
                    >
                      <span className="footer-links">About</span>
                    </Link>
                    <br />
                    <Link to={`/message`} className="text-decoration-none">
                      <span className="footer-links">Chairman's Message</span>
                    </Link>
                    <br />
                    <Link to={`/careers`} className="text-decoration-none">
                      <span className="footer-links">Career</span>
                    </Link>
                    <br />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Policies</Accordion.Header>
                  <Accordion.Body>
                    <Link to={`/privacy`} className="text-decoration-none">
                      <span className="footer-links">Privacy</span>
                    </Link>
                    <br />
                    <Link to={`/terms`} className="text-decoration-none">
                      <span className="footer-links">Terms and Conditions</span>
                    </Link>
                    <br />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Contact</Accordion.Header>
                  <Accordion.Body>
                    <Link to={`/contact`} className="text-decoration-none">
                      <span className="footer-links">Contact Us</span>
                    </Link>
                    <br />
                    <br />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="d-flex justify-content-center mb-3">
              <a href={`https://facebook.com`} className="text-decoration-none">
                <img
                  className="mx-3"
                  src="/images/pattiams_fb_icon.svg"
                  alt="pattiams_fb_icon"
                />
              </a>
              <a
                href={`https://instagram.com`}
                className="text-decoration-none"
              >
                <img
                  className="mx-3"
                  src="/images/pattiams_insta_icon.svg"
                  alt="pattiams_insta_icon"
                />
              </a>
              <img
                className="mx-3"
                src="/images/pattiams_twitter_icon.svg"
                alt="pattiams_twitter_icon"
              />
              <img
                className="mx-3"
                src="/images/pattiams_youtube_icon.svg"
                alt="pattiams_youtube_icon"
              />
            </div>
            <div className="d-flex align-items-center flex-column">
              <span className="footer-bottom-text">&#169;Pattiam's</span>
              <span className="footer-bottom-text text-center">
                All Rights Reserved | Designed by{" "}
                <a
                  href="https://www.inbounderz.com"
                  className="text-dark"
                >
                  Inbounderz
                </a>
              </span>
            </div>
          </div>

          {/* Mobile view ends here */}
        </div>
      </div>
    </>
  );
};

export default Footer;

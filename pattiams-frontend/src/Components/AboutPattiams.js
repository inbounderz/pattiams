import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AboutPattiams.css";
import HomepageButton from "./HomepageButton";
import MessageTabs from "./MessageTabs";

const AboutPattiams = () => {
  return (
    <>
      <div className="about-pattiams-main-div">
        <Container>
          <div className="d-none d-md-block">
            <Row className="d-flex justify-content-between">
              <div className="col-12 col-lg-6 d-flex flex-column pe-5 about-main-div mb-5">
                <span className="about-text-in-about-pattiams">About</span>
                <img
                  className="pattiams-logo-in-about"
                  src="images/pattiams_header_logo.svg"
                  alt="pattiams-logo"
                />
                <span className="about-text-desc long-paras">
                  Pattiam Social Service Society, registered under the “Society
                  Registration Act 1860, Section 21” during the year 1995 with
                  the head quarter at East Kadirur. The Society has been able to
                  play a vital role in the economic and social development of
                  the area for the last 25 years. The History As recent as three
                  decades ago, the economy of Pattiam and East Kathiroor in
                  North Kerala was in total doldrums with extreme poverty,
                  hunger and near-total unemployment. It was the far-sighted
                  vision of Sri. P Jayarajan and Comrades, that brought about a
                  stunning transformation to the area, with several of its
                  productive initiatives now bringing sustainable income.
                </span>
                <Link to={`/aboutpattiams`} className="text-decoration-none">
                  <HomepageButton text="Read more" />
                </Link>
              </div>
              <div className="col-12 col-lg-5">
                <MessageTabs />
              </div>
            </Row>
          </div>

          <div className="d-md-none">
            <div className="d-flex flex-column align-items-center">
              <span className="about-text-in-about-pattiams">About</span>
              <img
                className="pattiams-logo-in-about mb-5"
                src="images/pattiams_header_logo.svg"
                alt="pattiams-logo"
              />
              <span className="text-center">
                Pattiam Social Service Society, registered under the “Society
                Registration Act 1860, Section 21” during the year 1995 with the
                head quarter at East Kadirur. The Society has been able to play
                a vital role in the economic and social development of the area
                for the last 25 years.
              </span>
              <Link to={`/aboutpattiams`} className="text-decoration-none">
                <HomepageButton text="Read more" />
              </Link>
              <span className="founder-msg-heading-mobile">
                Founder's Message
              </span>
              <img
                className="founder-img-in-mobile"
                src="images/chairman.jpeg"
              />
              <span className="directors-name">Chairman</span>
              <span className="directors-subhead">ANAND KP</span>
              <span className="text-center">
                Greetings.
                <br /> It is indeed heartening for me to address all of you
                through this website, as Chairman of Pattiam Social Service
                Society. Pattiams is formed to eradicate unemployment through
                the construction of various employment opportunities...
                <Link to={`/message`} className="text-decoration-none">
                  <HomepageButton text={"Read more"} />
                </Link>
              </span>
            </div>
            <span className="founder-msg-heading-mobile">
              Board of Directors
            </span>
            <div className="d-flex justify-content-evenly">
              <div className="col-4 d-flex flex-column align-items-center">
                <img className="executives-mob" src="images/md.jpeg" />
                <span className="directors-name">Managing Director</span>
                <span className="directors-subhead">C PRAKASHAN</span>
              </div>

              <div className="col-4 d-flex flex-column align-items-center">
                <img className="executivesed-mob" src="images/ed.jpeg" />
                <span className="directors-name">Executive Director</span>
                <span className="directors-subhead">A RAMACHANDRAN</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AboutPattiams;

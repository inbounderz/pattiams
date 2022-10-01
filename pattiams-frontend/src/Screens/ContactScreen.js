import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const ContactScreen = () => {
  const onTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    onTop();
  }, [onTop]);

  return (
    <Container>
      <div className="contact-main-div mt-5">
        <h1 className="mb-5">Contact Us</h1>
        <Row>
          <Col md={6}>
            <p>Pattiam Social Service Society</p>
            <p>Reg. S. No. 82/95 East Kadirur (P.O),</p>
            <p>670642, Thalassery, Kannur, Kerala, India</p>
            <p>
              Customer Care:{" "}
              <a href="tel:+918129392113" className="text-decoration-none">
                +91 81293 92113
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:help@pattiams.com"
                className="text-decoration-none"
              >
                help@pattiams.com
              </a>
            </p>
          </Col>
          <Col md={6}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3905.722750458319!2d75.55037781480999!3d11.784561191642377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe3f238254569bb3d!2zMTHCsDQ3JzA0LjQiTiA3NcKwMzMnMDkuMiJF!5e0!3m2!1sen!2sin!4v1664603376163!5m2!1sen!2sin"
              width={"100%"}
              height={"300"}
              loading={"lazy"}
            ></iframe>
          </Col>
        </Row>
        <hr
          style={{
            backgroundColor: "black",
            height: "1px",
          }}
        />
      </div>
    </Container>
  );
};

export default ContactScreen;

import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

const AboutPattiams = () => {
  const onTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    onTop();
  }, []);

  return (
    <Container className="my-5 chairman-page">
      <h1>Chairman's Message</h1>
      <div className="d-flex justify-content-center">
        <img className="chairman-img img-fluid" src="images/chairman.jpeg" />
      </div>
      <div className="long-paras">
        <p>Greetings.</p>
        <p>
          Welcome! Let me convey some of the company's aims, ideals, and plans
          to you, our valuable customer.
        </p>
        <p>
          The main aim of Pattiam's has been employment generation in local
          rural communities. We focus on surmounting the challenges we face and
          achieving our goals through teamwork. The people employed in our
          organization are happy workers who diligently perform their tasks. The
          organization extends its support to employees' families, as well. We
          aim to reach perfection in our products and services and offer prompt
          communication. We are currently introducing new product ranges
          including traditional ayurvedic wellness products, panchakarma
          treatment, furniture made of plantation and traditional woods, beauty
          care and cosmetic products, and so on.
        </p>
        <p>
          To conclude, I emphasize our core value of TEAM WORK, honouring each
          of our employees, who have shown unparalleled efficiency, for their
          decisions that have led the company to its accomplishments.
        </p>
        <p>
          We invite you to join the Pattiam's family and support our programs.
        </p>
      </div>
      Regards
      <br />
      <strong>Anand K P</strong>
      <br />
      Chairman
    </Container>
  );
};

export default AboutPattiams;

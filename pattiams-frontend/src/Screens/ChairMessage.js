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
        It is indeed heartening for me to address all of you through this
        website, as Chairman of Pattiam Social Service Society. Pattiams is
        formed to eradicate unemployment through the construction of various
        employment opportunities needed for the people in our society. There are
        a lot of risk factors for achieving the goals, but our teamwork can
        simplify all these risks to attain the final goal.
      </p>
      <p>
        The people or their families in our organization are very happy, and
        performing their roles perfectly in all areas of their activities. We
        are aiming to reach zero defects in products, in communication or in all
        our services. We are also introducing various product ranges including
        Traditional Ayurvedic, Panchakarma Treatment, Manufacture Furniture with
        Plantation and Traditional woods, Beauty Care Products etc…
      </p>
      <p>
        All the people are invited to join our Pattiams family and support our
        programs.
      </p>
      <p>
        To conclude, I highlight the word- 'TEAM WORK', consisting of the
        complete employees having unequalled efficiency and consummate
        capability, to derive the right decisions behind all our
        accomplishments.
      </p>
      </div>
      Regards
      <br />
      <strong>Anand K P</strong><br />Chairman
    </Container>
  );
};

export default AboutPattiams;

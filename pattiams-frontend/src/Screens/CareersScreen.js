import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

const CareersScreen = () => {
    
  const onTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    onTop();
  }, [onTop]);

  return (
    <div className="careers-screen-main-div">
      <Container className="mt-5 ">
        <h1>Careers at Pattiam's</h1>
      </Container>
    </div>
  );
};

export default CareersScreen;

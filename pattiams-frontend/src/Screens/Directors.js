import React, { useEffect } from "react";

const Directors = () => {
  const onTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    onTop();
  }, [])
  

  return (
    <div className="container">
      <h3 className="text-center my-3">Directors</h3>
      <div className="row justify-content-center">
        <div className="col-6 col-xl-2 d-flex flex-column align-items-center mb-3">
          <img src="images/md.jpeg" className="executives" alt="img"/>
          <span className="mt-2 designation">Managing Director</span>
          <span className="person-name">
            <strong>C PRAKASHAN</strong>
          </span>
        </div>
        <div className="col-6 col-xl-2 d-flex flex-column align-items-center mb-3">
          <img src="images/ed.jpeg" className="executives" alt="img"/>
          <span className="mt-2 designation">Executive Director</span>
          <span className="person-name">
            <strong>A RAMACHANDRAN</strong>
          </span>
        </div>
      </div>
      <div className="row my-5 ">
        <div className="mb-3 col-6 col-md-4 col-lg-2 d-flex flex-column align-items-center">
          <img
            src="images/pradeep-kumar.png"
            className="executives"
            alt="pers"
          />
          <span className="person-name">
            <strong>PRADEEP KUMAR</strong>
          </span>
        </div>

        <div className="mb-3 col-6 col-md-4 col-lg-2 d-flex flex-column align-items-center">
          <img src="images/ramesh-babu.png" className="executives" alt="pers" />
          <span className="person-name">
            <strong>RAMESH BABU</strong>
          </span>
        </div>

        <div className="mb-3 col-6 col-md-4 col-lg-2 d-flex flex-column align-items-center">
          <img src="images/reena-KN.png" className="executives" alt="pers" />
          <span className="person-name">
            <strong>REENA KN</strong>
          </span>
        </div>

        <div className="mb-3 col-6 col-md-4 col-lg-2 d-flex flex-column align-items-center">
          <img src="images/satheeshan.png" className="executives" alt="pers" />
          <span className="person-name">
            <strong>SATHEESHAN</strong>
          </span>
        </div>

        <div className="mb-3 col-6 col-md-4 col-lg-2 d-flex flex-column align-items-center">
          <img
            src="images/sheeja-injikandi.png"
            className="executives"
            alt="pers"
          />
          <span className="person-name">
            <strong>SHEEJA INJIKANDI</strong>
          </span>
        </div>

        <div className="mb-3 col-6 col-md-4 col-lg-2 d-flex flex-column align-items-center">
          <img src="images/shynesh.png" className="executives" alt="pers" />
          <span className="person-name">
            <strong>SHYNESH</strong>
          </span>
        </div>

        <div className="mb-3 col-6 col-md-4 col-lg-2 d-flex flex-column align-items-center">
          <img src="images/suresh.png" className="executives" alt="pers" />
          <span className="person-name">
            <strong>SURESH</strong>
          </span>
        </div>

        <div className="mb-3 col-6 col-md-4 col-lg-2 d-flex flex-column align-items-center">
          <img src="images/ajeesh.png" className="executives" alt="pers" />
          <span className="person-name">
            <strong>AJEESH</strong>
          </span>
        </div>
        <div className="mb-3 col-6 col-md-4 col-lg-2 d-flex flex-column align-items-center">
          <img src="images/ismail-vs.png" className="executives" alt="pers" />
          <span className="person-name">
            <strong>ISMAIL VS</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Directors;

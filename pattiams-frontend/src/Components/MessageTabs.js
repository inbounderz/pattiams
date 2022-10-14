import React, { useState } from "react";
import "./MessageTabs.css";

import HomepageButton from "./HomepageButton";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MessageTabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="messageTab">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Chairman's Message
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Board of Directors
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <div className="d-flex">
            <Row>
              <div className="col-12 d-flex flex-column align-items-center">
                <span className="m-3">
                  Greetings.<br /> It is indeed heartening for me to address all of
                  you through this website, as Chairman of Pattiam Social
                  Service Society. Pattiams is formed to eradicate unemployment
                  through the construction of various employment opportunities...
                </span>
                <Link to={`/message`} className="text-decoration-none">
                <HomepageButton text="Read More" />
                </Link>
              </div>
            </Row>
          </div>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h4>Board of Directors</h4>
          <hr />
          <div className="row">
            <div className="col-6 d-flex flex-column align-items-center">
              <img className="executives" src="images/md.jpeg" alt="img"/>
              <span className="mt-2">Managing Director</span>
              <span><strong>C PRAKASHAN</strong></span>
            </div>
            <div className="col-6 d-flex flex-column align-items-center">
              <img className="executivesd" src="images/ed.jpeg" alt="img"/>
              <span className="mt-2">Executive Director</span>
              <span><strong>A RAMACHANDRAN</strong></span>
            </div>
            <Link to={`/directors`} className="text-decoration-none">
                <HomepageButton text="View all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageTabs;

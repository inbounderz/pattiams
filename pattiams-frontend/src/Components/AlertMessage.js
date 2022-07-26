import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = (props) => {
  return (
    props.alert && (
      <Alert
        style={{
          position: "fixed",
          zIndex: 1,
          top: '2.25rem',
          right: '2.25rem',
          width: "300px",
          border: "1px solid #CE0E2D",
        }}
        variant={props.alert.type}
      >
        <p className="mb-0">{props.alert.message}</p>
      </Alert>
    )
  );
};

export default AlertMessage;
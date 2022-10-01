import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './FormContainer.css';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="formContainer row">
        {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
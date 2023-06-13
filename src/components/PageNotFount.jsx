import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function PageNotFount() {
  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={6}>
          <h1 className="text-center">PageNotFount</h1>
        </Col>
      </Row>
    </Container>
  );
}

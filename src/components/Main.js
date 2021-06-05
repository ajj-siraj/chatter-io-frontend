import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import StageInput from "./StageInput";

function Main() {

  return (
    <>
      <Container fluid className="main-container">
        <Row className="justify-content-center mb-5">
          <Col>
            <h1>Welcome to Chatter.io!</h1>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center text-center">
          <Col>
            <StageInput />
          </Col>
        </Row>
      </Container>
      <div className="background"></div>
    </>
  );
}

export default Main;

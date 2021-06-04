import React, { useState } from "react";
import { Container, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";

const StageOneInput = (props) => (
  <>
    <Row>
      <Col xs="12">Enter your preferred Username</Col>
    </Row>
    <Row className="d-flex justify-content-center stage-one">
      <Col md="4">
        <InputGroup className="group">
          <input type="text" required />
          <InputGroup.Prepend>
            <Button className="form-button-next" onClick={() => props.setStage(2)}>
              Next
            </Button>
          </InputGroup.Prepend>
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Name</label>
        </InputGroup>
      </Col>
    </Row>
  </>
);

const StageTwoInput = (props) => (
  <>
    <Row>
      <Col xs="12">Search for a Chatroom or enter a new one to start your own</Col>
    </Row>
    <Row className="d-flex justify-content-center stage-two">
      <Col md="8">
        <InputGroup className="group">
          <InputGroup.Prepend>
            <Button className="form-button-back" onClick={() => props.setStage(1)}>
              Back
            </Button>
          </InputGroup.Prepend>
          <input type="text" required />
          <InputGroup.Prepend>
            <Button className="form-button-next" onClick={() => props.setStage(3)}>
              Next
            </Button>
          </InputGroup.Prepend>
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Name</label>
        </InputGroup>
      </Col>
    </Row>
  </>
);

function Main() {
  let [stage, setStage] = useState(1);

  return (
    <Container fluid className="main-container">
      <Row className="justify-content-center">
        <Col>
          <h1>Welcome to Chatter.io!</h1>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center text-center">
        <Col>
          {stage === 1 ? <StageOneInput setStage={setStage} /> : null}
          {stage === 2 ? <StageTwoInput setStage={setStage} /> : null}
          {stage === 3 ? <div>Now we're at the final stage!</div> : null}
        </Col>
      </Row>
    </Container>
  );
}

export default Main;

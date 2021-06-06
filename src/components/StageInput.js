import React, { useState, useContext, useEffect } from "react";
import { Row, Col, InputGroup, Button } from "react-bootstrap";
import { Ctx, Types } from "../Context";

function StageInput(props) {
  let [inp, setInp] = useState("");
  let [stage, setStageState] = useState(1);
  let ctx = useContext(Ctx);

  const { dispatch } = ctx;

  useEffect(() => {
    console.log(ctx.state);
  });

  const setStage = (nextStage, data) => {
    if (nextStage === 2) {
      dispatch({ type: Types.SET_USERNAME, payload: { username: data } });
    } else if (nextStage === 3) {
      dispatch({ type: Types.SET_CHATROOM, payload: { chatroom: data } });
    }
    setInp("");
    setStageState(nextStage);
  };

  let stageInput;
  let stageOne = (
    <>
      <Row>
        <Col xs="12">Enter your preferred Username</Col>
      </Row>
      <Row className="d-flex justify-content-center stage-one">
        <Col md="4">
          <InputGroup className="group">
            <input type="text" required value={inp} onChange={(e) => setInp(e.target.value)} />
            <InputGroup.Prepend>
              <Button className="form-button-next" onClick={() => setStage(2, inp)}>
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

  let stageTwo = (
    <>
      <Row>
        <Col xs="12">Search for a Chatroom or enter a new one to start your own</Col>
      </Row>
      <Row className="d-flex justify-content-center stage-two">
        <Col md="8">
          <InputGroup className="group">
            <InputGroup.Prepend>
              <Button className="form-button-back" onClick={() => setStage(1)}>
                Back
              </Button>
            </InputGroup.Prepend>
            <input type="text" required value={inp} onChange={(e) => setInp(e.target.value)} />
            <InputGroup.Prepend>
              <Button className="form-button-next" onClick={() => setStage(3, inp)}>
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

  if (stage === 1) stageInput = stageOne;
  if (stage === 2) stageInput = stageTwo;

  return <>{stageInput}</>;
}

export default StageInput;

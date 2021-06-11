import React, { useState, useContext, useEffect } from "react";
import { Row, Col, InputGroup, Button } from "react-bootstrap";
import { Ctx, Types } from "../Context";
import {Redirect} from "react-router-dom";

function StageInput(props) {
  let [inp, setInp] = useState("");
  let [stage, setStageState] = useState(1);
  let [error, setError] = useState(false);
  let ctx = useContext(Ctx);
  // let [isLoading, setLoading] = useState(false);

  // isLoading = ctx.state.isLoading;
  
  const { dispatch } = ctx;

  useEffect(() => {
    console.log(ctx.state);
  });

  const setStage = (nextStage, data, type) => {
    if ((!data || data.length > 25 || data.length < 3) && type !== "backButton") {
      setError(true);
    } else {
      error && setError(false);
      if (nextStage === 2) {
        dispatch({ type: Types.SET_USERNAME, payload: { username: data } });
      } else if (nextStage === 3) {
        dispatch({ type: Types.SET_CHATROOM, payload: { chatroom: data } });
      }
      setInp("");
      setStageState(nextStage);
    }
  };

  //Allow progress by pressing enter, <form> was avoided due to the existence of
  //two buttons in stage 2 which complicated the use of onSubmit. This is simpler.
  const handleKeyPress = (event, nextStage, data) => {
    event.key === "Enter" && setStage(nextStage, data);
  };

  let stageInput;
  let stageOne = (
    <>
      <Row>
        <Col xs="12">
          <h2>Enter your preferred Username</h2>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center stage-one">
        <Col md="6">
          <InputGroup className="group">
            <input
              autoFocus
              type="text"
              value={inp}
              onChange={(e) => setInp(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 2, inp)}
            />
            <InputGroup.Prepend>
              <Button
                variant="success"
                className="form-button-next"
                onClick={() => setStage(2, inp)}
              >
                Next
              </Button>
            </InputGroup.Prepend>
            <span className="bar"></span>
            <label>Username</label>
          </InputGroup>
        </Col>
      </Row>
      {error ? (
        <Row>
          <Col xs="12">
            <div className="validation-error-message">
              Input must be between 3 and 25 characters.
            </div>
          </Col>
        </Row>
      ) : null}
    </>
  );

  let stageTwo = (
    <>
      <Row>
        <Col xs="12">
          <h2>Search for a Chatroom or enter a new one to start your own</h2>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center stage-two">
        <Col md="6">
          <InputGroup className="group">
            <InputGroup.Prepend>
              <Button
                variant="secondary"
                className="form-button-back"
                onClick={() => setStage(1, "", "backButton")}
              >
                Back
              </Button>
            </InputGroup.Prepend>
            <input
              autoFocus
              type="text"
              required
              disabled
              value="Guest"
            />
            <InputGroup.Prepend>
              <Button
                variant="success"
                className="form-button-next"
                onClick={() => setStage(3, "Guest")}
              >
                Next
              </Button>
            </InputGroup.Prepend>
            <span className="bar"></span>
            <label>Chatroom Name</label>
          </InputGroup>
        </Col>
      </Row>
      {error ? (
        <Row>
          <Col xs="12">
            <div className="validation-error-message">
              Input must be between 3 and 25 characters.
            </div>
          </Col>
        </Row>
      ) : null}
    </>
  );

  if (stage === 1) stageInput = stageOne;
  if (stage === 2) stageInput = stageTwo;
  if (stage === 3) stageInput = <Redirect to={`/chatroom/${ctx.state.chatroom}`}/>;

  return <>{stageInput}</>;
}

export default StageInput;

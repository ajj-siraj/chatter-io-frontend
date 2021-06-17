import React from "react";
import { Row, Col } from "react-bootstrap";


function Error({ error }) {

  return (
    <Row className="error-container align-items-center">
      <Col>
        <div>
          {error.message}
        </div>
      </Col>
    </Row>
  );
}

export default Error;

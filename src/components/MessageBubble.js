import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function MessageBubble({ children }) {
  let owner = true;

  return (
    <>
      {owner ? (
        <Row className="justify-content-start m-0 p-0">
          <Col md="6" className="m-0 p-0">
            <div className={`message-bubble message-bubble-user`}>{children}</div>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-end m-0 p-0">
          <Col md="6" className="m-0 p-0">
            <div className={`message-bubble message-bubble-other`}>{children}</div>
          </Col>
        </Row>
      )}
    </>
  );
}

export default MessageBubble;

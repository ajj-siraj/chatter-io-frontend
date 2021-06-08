import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MessageBox from "./MessageBox";

function ChatroomView({ match }) {
  return (
    <>
      <Container fluid className="chatroom-container">
        <Row className="justify-content-center mt-3 mb-0">
          <Col md="8">
            <div className="chatroom-area">
              <div className="chat-messages-area">This is the area for the chat</div>
              <MessageBox />
            </div>
          </Col>
          <Col md="4">
            <div className="chatroom-area">
              <div>This is the area for the users in the current chatroom</div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="background"></div>
    </>
  );
}

export default ChatroomView;

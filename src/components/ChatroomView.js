import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MessageBox from "./MessageBox";
import MessageBubble from "./MessageBubble";
import { w3cwebsocket } from "websocket";

let client = new w3cwebsocket("ws://localhost:3002/");

client.onerror = function (err) {
  console.error("Websocket Connection Error", err);
};

client.onopen = function () {
  console.log("WebSocket Client Connected");
};

client.onclose = function () {
  console.warn("Client Closed");
};

function ChatroomView({ match }) {
  let [messages, addMessage] = useState([]);
  let [msgError, setError] = useState(false);

  client.onmessage = function (e) {
    addMessage([...messages, e.data]);
  };

  const validateMsg = (message) => {
    const regex = /(\n+)/g;
    if (message.length < 1 || regex.test(message)) return false;
    else return true;
  };

  const sendMessage = (msg) => {
    validateMsg(msg) && client.readyState === client.OPEN && client.send(msg);
  };

  return (
    <>
      <Container fluid className="chatroom-container">
        <Row className="justify-content-center mt-3 mb-0">
          <Col md="8">
            <div className="chatroom-area">
              <div className="chat-messages-area">
                {messages.map((msg, idx) => (
                  <MessageBubble key={`msg-${idx}`}>{msg}</MessageBubble>
                ))}
              </div>
              <MessageBox room={match.params.chatroomName} sendMessage={sendMessage} />
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

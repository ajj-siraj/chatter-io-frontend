import React, { useContext, useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Ctx } from "../Context";

function MessageBox({ sendMessage }) {
  
  let inpRef = useRef(null);
  let state = useContext(Ctx).state;

  const handleClick = (message) => {
    let msg = {
      type: "normal",
      owner: state.username,
      message: message,
    };

    sendMessage(msg);
    inpRef.value = "";
  };

  const handleKeyPress = (event, message) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleClick(message);
    }
  };

  return (
    <div className="message-box-container">
      <textarea
        className="message-box"
        ref={(el) => (inpRef = el)}
        onKeyPress={(e) => handleKeyPress(e, inpRef.value)}
      />
      <Button variant="primary" className="form-button-send" onClick={() => handleClick(inpRef.value)}>
        Send
      </Button>
    </div>
  );
}

export default MessageBox;

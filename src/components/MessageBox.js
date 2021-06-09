import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function MessageBox({ sendMessage }) {
  let [input, updateInput] = useState();
  let inpRef = useRef(null);

  

  const handleClick = (message) => {
    
    sendMessage(message);
    inpRef.value = "";
  }

  const handleKeyPress = (event, message) => {
    if(event.key === "Enter") {
      event.preventDefault();
      handleClick(message);
    }
  };

  return (
    <div className="message-box-container">
      <textarea className="message-box" ref={(el) => inpRef=el} onKeyPress={(e) => handleKeyPress(e, inpRef.value)}/>
      <Button className="form-button-send" onClick={() => handleClick(inpRef.value)}>
        Send
      </Button>
    </div>
  );
}

export default MessageBox;

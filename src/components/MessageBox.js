import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function MessageBox() {
  return (
    <div className="message-box-container">
      <input type="textarea" className="message-box" />
      <Button className="form-button-send">Send</Button>
    </div>
  );
}

export default MessageBox;

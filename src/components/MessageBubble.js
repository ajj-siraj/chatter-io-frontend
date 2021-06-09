import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { Ctx } from "../Context";

function MessageBubble({ children }) {
  let user = useContext(Ctx).state.username;
  let owner = children.owner;

  return (
    <>
      {children.type === "normal" ? (
        <>
          {owner === user ? (
            <Row className="justify-content-end m-0 p-0">
              <Col md="6" className="m-0 p-0">
                <div className={`message-bubble message-bubble-owner`}>
                  <div className="message-bubble-username">{children.owner}</div>
                  {children.message}
                </div>
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-start m-0 p-0">
              <Col md="6" className="m-0 p-0">
                <div className={`message-bubble message-bubble-other`}>
                  <div className="message-bubble-username">{children.owner}</div>
                  {children.message}
                </div>
              </Col>
            </Row>
          )}
        </>
      ) : null}
    </>
  );
}

export default MessageBubble;

import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Ctx } from "../Context";

function MessageBubble({ children }) {
  let user = useContext(Ctx).state.username;
  let owner = children.owner;
  let [message, setMessage] = useState("");
  let [messageRemainder, setMessageRemainder] = useState("");
  let [readMore, setReadMore] = useState(false);
  let [readMoreClicked, setReadMoreClicked] = useState(false);

  useEffect(() => {
    console.log(readMore, readMoreClicked);
    if (
      !readMore &&
      children.message &&
      children.type === "normal" &&
      children.message.length > 500
    ) {
      setMessage(children.message.slice(0, 500) + "...");
      setMessageRemainder(children.message.slice(500));
      setReadMore(true);
    }
  }, [children]);

  const handleReadMore = () => {
    setMessage(message + messageRemainder);
    setReadMoreClicked(true);
  };

  return (
    <>
      {children.type === "normal" ? (
        <>
          {owner === user ? (
            <Row className="justify-content-end m-0 p-0">
              <Col md="6" className="m-0 p-0">
                <div className={`message-bubble message-bubble-owner`}>
                  <div className="message-bubble-username">{children.owner}</div>
                  {message}
                  {!readMoreClicked ? (
                    <div className="readmore" onClick={handleReadMore}>
                      Read More
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-start m-0 p-0">
              <Col md="6" className="m-0 p-0">
                <div className={`message-bubble message-bubble-other`}>
                  <div className="message-bubble-username">{children.owner}</div>
                  {message}
                  {!readMoreClicked ? (
                    <div className="readmore" onClick={handleReadMore}>
                      Read More
                    </div>
                  ) : null}
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

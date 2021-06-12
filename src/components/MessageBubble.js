import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Ctx } from "../Context";

function MessageBubble({ children }) {
  let user = useContext(Ctx).state.username;
  let owner = children.owner;
  let [message, setMessage] = useState("");
  let [messageError, setMessageError] = useState(false);
  let [messageRemainder, setMessageRemainder] = useState("");
  let [readMore, setReadMore] = useState(false);
  let [readMoreClicked, setReadMoreClicked] = useState(false);

  useEffect(() => {
    if (
      !readMore &&
      children.message &&
      children.type === "normal" &&
      children.message.length > 500 &&
      children.message.length < 1000
    ) {
      messageError && setMessageError(false);
      setMessage(children.message.slice(0, 500) + "...");
      setMessageRemainder(children.message.slice(500));
      setReadMore(true);
    } else if (
      !readMore &&
      children.message &&
      children.type === "normal" &&
      children.message.length < 1000
    ) {
      messageError && setMessageError(false);
      setMessage(children.message);
    } else {
      setMessageError(true);
    }
  }, [children]);

  const handleReadMore = () => {
    console.log(message);
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
                  {readMore && !readMoreClicked ? (
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
                  {readMore && !readMoreClicked ? (
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

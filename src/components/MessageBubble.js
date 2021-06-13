import React, { useContext, useEffect, useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Ctx } from "../Context";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

function MessageBubble({ children }) {
  let user = useContext(Ctx).state.username;
  let owner = children.owner;
  let [message, setMessage] = useState("");
  let [messageError, setMessageError] = useState(false);
  let [messageRemainder, setMessageRemainder] = useState("");
  let [readMore, setReadMore] = useState(false);
  let [readMoreClicked, setReadMoreClicked] = useState(false);
  let msgBubble = useRef(null);
  const customEase = CustomEase.create(
    "custom",
    "M0,0 C0.14,0 0.242,0.438 0.272,0.561 0.313,0.728 0.434,1.129 0.442,1.166 0.45,1.151 0.609,0.986 0.65,0.924 0.705,0.839 0.83,0.862 0.862,0.9 0.919,0.968 0.893,0.983 0.9,1 0.968,1 0.916,1 0.94,1 0.974,1 0.931,1 0.96,1 0.981,1 0.967,1 0.982,1 0.997,1 1,1 1,1 "
  );
  //Animation on component mount
  let tl = gsap.timeline({ transformOrigin: "right" });
  useEffect(() => {
    tl.from(msgBubble, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: customEase,
    });
    // .from(msgBubble, {scaleX: 0.5, duration: 1})
    console.log(msgBubble);
  }, []);

  //Determine if message is too long:
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
            <Row
              className="justify-content-end m-0 p-0 message-bubble-container"
              ref={(el) => (msgBubble = el)}
            >
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
            <Row className="justify-content-start m-0 p-0" ref={(el) => (msgBubble = el)}>
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

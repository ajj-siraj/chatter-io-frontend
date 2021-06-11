import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MessageBox from "./MessageBox";
import MessageBubble from "./MessageBubble";
import UserList from "./UserList";
import Loading from "./Loading";

import { w3cwebsocket } from "websocket";
import { Ctx, Types } from "../Context";

let client = new w3cwebsocket("ws://localhost:3002/");

function ChatroomView({ match }) {
  let [messages, addMessage] = useState([]);
  let [initial, setInitial] = useState(true);
  let [userList, updateUserList] = useState([]);
  let [msgError, setError] = useState(false);
  let ctx = useContext(Ctx);
  let {username, isLoading} = ctx.state;

  const { dispatch } = ctx;

  useEffect(() => {
    //initial message to identity client username on the server
    sendMessage();

    dispatch({type: Types.LOADING_START});

    //trigger re-render every 5 seconds to update user list in case of changes without having to wait for a new message.
    setInterval(() => sendMessage("refresh"), 5000);
  }, []);

  client.onerror = (err) => {
    console.error("Websocket Connection Error", err);
  };

  client.onclose = () => {
    console.warn("Client Closed");
  };

  client.onmessage = (e) => {
    client.readyState === client.OPEN && dispatch({type: Types.LOADING_DONE});
    let parsed = JSON.parse(e.data);
    console.log("Parsed: ", parsed);
    updateUserList(parsed.userList);
    parsed.data && addMessage([...messages, parsed.data]);
  };

  const validateMsg = (message) => {
    const regex = /(\n+)/g;
    if (message.message.length < 1 || regex.test(message.message)) return false;
    else return true;
  };

  const sendMessage = (msg) => {
    console.log("Messages: ", messages);
    if (initial) {
      let initialMsg = {
        type: "initial",
        username: username,
      };
      client.readyState === client.OPEN && client.send(JSON.stringify(initialMsg));
      setInitial(false);
    } else if (msg === "refresh") {
      let refreshMsg = {
        type: "refresh",
      };
      client.readyState === client.OPEN && client.send(JSON.stringify(refreshMsg));
    } else {
      validateMsg(msg) && client.readyState === client.OPEN && client.send(JSON.stringify(msg));
    }
  };

  if (isLoading) return <Loading />;
  else
    return (
      <>
        <Container fluid className="chatroom-container">
          <Row className="justify-content-center mt-3 mb-0">
            <Col md="8">
              <div className="chatroom-area">
                <div className="chat-messages-area">
                  <div>
                    {messages.map((msg, idx) => {
                      if (idx === 0) return;
                      return <MessageBubble key={`msg-${idx}`}>{msg}</MessageBubble>;
                    })}
                  </div>
                </div>
                <MessageBox room={match.params.chatroomName} sendMessage={sendMessage} />
              </div>
            </Col>
            <Col md="4">
              <div className="chatroom-area">
                <UserList users={userList} username={username} />
              </div>
            </Col>
          </Row>
        </Container>
        <div className="background"></div>
      </>
    );
}

export default ChatroomView;

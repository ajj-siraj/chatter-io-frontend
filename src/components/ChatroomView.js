import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MessageBox from "./MessageBox";
import MessageBubble from "./MessageBubble";
import UserList from "./UserList";
import { w3cwebsocket } from "websocket";
import { Ctx } from "../Context";

let client = new w3cwebsocket("ws://localhost:3002/");

client.onerror = (err) => {
  console.error("Websocket Connection Error", err);
};

client.onopen = () => {
  console.log("WebSocket Client Connected");
};

client.onclose = () => {
  console.warn("Client Closed");
};

function ChatroomView({ match }) {
  let [messages, addMessage] = useState([]);
  let [initial, setInitial] = useState(true);
  let [userList, updateUserList] = useState([]);
  let [msgError, setError] = useState(false);
  let username = useContext(Ctx).state.username;

  useEffect(() => {
    //initial message to identity client username on the server
    sendMessage();
  }, []);

  client.onmessage = (e) => {
    let parsed = JSON.parse(e.data);
    console.log(parsed);
    updateUserList(parsed.userList);
    parsed.data && addMessage([...messages, parsed.data]);
  };

  const validateMsg = (message) => {
    const regex = /(\n+)/g;
    if (message.length < 1 || regex.test(message)) return false;
    else return true;
  };

  const sendMessage = (msg) => {
    console.log("Messages: ", messages);
    if (initial) {
      let initialMsg = {
        type: "initial",
        username: username,
      };
      client.send(JSON.stringify(initialMsg));
      setInitial(false);
    } else {
      validateMsg(msg) && client.readyState === client.OPEN && client.send(msg);
    }
  };

  return (
    <>
      <Container fluid className="chatroom-container">
        <Row className="justify-content-center mt-3 mb-0">
          <Col md="8">
            <div className="chatroom-area">
              <div className="chat-messages-area">
                <div>
                  {messages.map((msg, idx) => {
                    if(idx === 0) return;
                    return <MessageBubble key={`msg-${idx}`}>{msg}</MessageBubble>;
                  })}
                </div>
              </div>
              <MessageBox room={match.params.chatroomName} sendMessage={sendMessage} />
            </div>
          </Col>
          <Col md="4">
            <div className="chatroom-area">
              <UserList users={userList} />
            </div>
          </Col>
        </Row>
      </Container>
      <div className="background"></div>
    </>
  );
}

export default ChatroomView;

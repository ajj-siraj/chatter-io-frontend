import React from "react";
import Main from "./components/Main";
import { StateProvider } from "./Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatroomView from "./components/ChatroomView";

import "./css/App.css";
import "./css/forms.css";
import "./css/chatroom.css";
import "./css/customButtons.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <StateProvider>
        <Router>
          <Switch>
            <Route path="/chatroom/:chatroomName" component={ChatroomView} />
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </Router>
      </StateProvider>
    </div>
  );
}

export default App;

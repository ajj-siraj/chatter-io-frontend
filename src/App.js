import React from "react";
import Main from "./components/Main";
import { StateProvider } from "./Context";

import "./css/App.css";
import "./css/forms.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <StateProvider>
        <Main />
      </StateProvider>
    </div>
  );
}

export default App;

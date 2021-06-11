import React from "react";
import { Spinner } from "react-bootstrap";
import { Ctx } from "../Context";

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden-focusable">Loading</span>
        </Spinner>
      </div>
    </div>
  );
}

export default Loading;

import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import gsap from "gsap";

gsap.registerPlugin();

function Loading({ isLoading }) {
  let loadingRef = useRef(null);
  let [warning, setWarning] = useState(false);

  setTimeout(() => setWarning(true), 30000);

  useEffect(() => {
    isLoading && gsap.to(loadingRef, { opacity: 1, duration: 0.2 });
  }, [isLoading]);

  return (
    <Row className="loading-container align-items-center" ref={(el) => (loadingRef = el)}>
      <Col>
        <Spinner animation="border" role="status">
          <span className="visually-hidden-focusable">Loading</span>
        </Spinner>
        {warning ? <div>Loading is taking a long time, please refresh.</div> : null}
      </Col>
    </Row>
  );
}

export default Loading;

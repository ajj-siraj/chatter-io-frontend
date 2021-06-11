import React, { useEffect, useRef } from "react";
import { Spinner } from "react-bootstrap";
import gsap from "gsap";

gsap.registerPlugin();

function Loading({ isLoading }) {
  let loadingRef = useRef(null);

  useEffect(() => {
    isLoading && gsap.to(loadingRef, { opacity: 1, duration: 0.5 });
  }, [isLoading]);

  return (
    <div className="loading-container" ref={(el) => (loadingRef = el)}>
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden-focusable">Loading</span>
        </Spinner>
      </div>
    </div>
  );
}

export default Loading;

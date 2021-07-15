import React, { useEffect, useState } from "react";

import "./nav.css";

function Alert({ Message, variant, visible }) {
  const [isVisible, setisVisible] = useState();

  useEffect(() => {
    if (visible === true) {
      setisVisible(true);
    }
  }, [visible]);

  return isVisible ? (
    <div
      style={{
        width: "20rem",
        margin: "0.5rem",
        padding: "0.5rem",
        backgroundColor: `${variant}`,
        color: "white",
      }}
    >
      <span
        style={{
          marginLeft: "4rem",
          cursor: "pointer",
          float: "right",
          fontSize: "1.2rem",
        }}
        onClick={() => {
          setisVisible(false);
        }}
      >
        &times;
      </span>
      {Message}
    </div>
  ) : null;
}

export default Alert;

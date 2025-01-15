import React, { useState, useEffect, useRef } from "react";

const Editable = ({ value, handleBio, placeholder }) => {
  const [text, setText] = useState(value);
  const textareaRef = useRef(null);

  useEffect(() => {
    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "inherit";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    // Adjust height on mount and text changes
    adjustHeight();
  }, [text]);

  const handleChange = (event) => {
    setText(event.target.value);
    handleBio(event.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      style={{
        width: "100%",
        minHeight: "40px !important",
        maxHeight: "80px",
        boxSizing: "border-box",
        border: "0",
        fontSize: "16px",
        resize: "none",
        overflow: "hidden",
        backgroundColor: "transparent",
        color: "var(--text)",
      }}
    />
  );
};

export default Editable;

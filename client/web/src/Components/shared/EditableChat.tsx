import React, { useState, useEffect, useRef } from "react";

const EditableChat = ({
  value,
  onChange,
  placeholder,
  onSendMessageWhenEnter = null,
  hasMaxHeight = true,
}) => {
  const [text, setText] = useState(value);
  const textareaRef = useRef(null);
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `40px`;
      const sHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${sHeight}px`;
      if (!text.length || !value.length) {
        textareaRef.current.style.height = `40px`;
      }
    }
  };
  useEffect(() => {
    // Adjust height on mount and text changes
    adjustHeight();
  }, [text, value]);

  const handleChange = (event) => {
    if (event.key === "Enter") {
      if (onSendMessageWhenEnter) {
        onSendMessageWhenEnter();
        setText("");
        adjustHeight();
        return;
      }
      // Perform your action here, such as submitting a form or filtering data
    }
    if (event.key.length !== 1) {
      return;
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        setText(e.target.value);
        onChange(e.target.value);
        if (e.target.value.trim() === "") {
          e.preventDefault();
        }
      }}
      placeholder={placeholder}
      onKeyUp={handleChange}
      style={{
        width: "100%",
        height: "40px",
        boxSizing: "border-box",
        flex: "1",
        fontSize: "16px",
        resize: "none",
        overflow: "hidden",
        backgroundColor: "transparent",
        color: "var(--text)",
        padding: "10px",
        border: "0px",
        maxHeight: hasMaxHeight ? "80px" : "",
        transition: "all 0.2s ease",
      }}
    />
  );
};

export default EditableChat;

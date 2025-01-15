import React, { useState } from "react";

function CopyLinks({ link, label }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const el = document.createElement("input");
    el.value = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  };
  return (
    <div className="box-to-book-link">
      <button
        className="copy-meettinglink"
        style={{ width: "100%" }}
        onClick={copy}
      >
        {!copied ? label : "Link Copied!"}
      </button>
    </div>
  );
}
export default CopyLinks;

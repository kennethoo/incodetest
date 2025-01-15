import { useRef } from "react";

function AddNote({ note, setNote }) {
  const chatInput: any = useRef();
  const addMessage = (e) => {
    setNote(e.target.innerText);
  };
  return (
    <div
      style={{
        border: "1px solid var(--main-bg-cool-rgb)",
        borderRadius: "10px",
        marginTop: "10px",
      }}
      className="section-info"
    >
      <div className="data-to-show">
        <div
          style={{ paddingLeft: "0px", padding: "0px" }}
          className="watpr-contnr-mem"
        >
          <div
            style={{ paddingLeft: "8px", padding: "0px" }}
            className="wrappe-mmeshe"
          >
            <div
              style={{ width: "100%", color: "#ccc" }}
              ref={chatInput}
              contentEditable="true"
              onKeyUp={addMessage}
              data-placeholder={`Add a note . . .`}
              className="hold-message noped"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddNote;

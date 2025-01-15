import { IoCloseSharp } from "react-icons/io5";
import LoadingSpin from "Components/Loadingspin";
import { useState } from "react";
import UserMannager from "ApiServiveGateWay/userMannager";
import { useNavigate } from "react-router-dom";
import { codeSessionApi } from "ApiServiveGateWay/CodeSession";
import realtimeBoardSocket from "realtimeBoardSocket";

//Todo write the code for this
function EndSession({ session, setIsEndSessionModal }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const deleteAccount = async () => {
    setIsLoading(true);
    await codeSessionApi.handleAction({
      action: codeSessionApi.END_SESSION,
      payload: { sessionId: session._id },
    });
    /// broadcst the message to the connected client
    realtimeBoardSocket.emit("codeWorkSession:event", {
      eventName: codeSessionApi.END_SESSION,
      workSessionId: session._id,
      payload: {},
    });
    setIsLoading(false);
    window.location.replace("/app/home");
  };
  return (
    <div className={`overlay-new-program active`}>
      <div className="box-that-create-a-new-program">
        <div className="title-of--thise-action">
          <button
            onClick={() => {
              setIsEndSessionModal(false);
            }}
            className="close-that">
            <IoCloseSharp />
          </button>
          <p>End Session</p>
        </div>
        <div className="smal-descritptpr">
          <strong style={{ color: "#C0392B" }}>Warning:</strong> Are you sure
          you want to end this session?
        </div>

        {isLoading === false ? (
          <button
            onClick={deleteAccount}
            style={{ backgroundColor: "red" }}
            className={`next agreen   ${isLoading ? "loading" : ""}  `}>
            YES END
          </button>
        ) : (
          <button className={`next agreen   ${isLoading ? "loading" : ""}  `}>
            {isLoading ? <LoadingSpin /> : ""}
          </button>
        )}
      </div>
    </div>
  );
}

export default EndSession;

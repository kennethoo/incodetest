import { IoCloseSharp } from "react-icons/io5";
import LoadingSpin from "Components/Loadingspin";
import { useState } from "react";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import { useNavigate } from "react-router-dom";

function DeleteProject({ project, setIsDeledModal }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const deleteAccount = async () => {
    setIsLoading(true);
    await apiGateway.handleActionForProject({
      action: apiGateway.DELETE_PROJECT,
      payload: project,
    });
    setIsLoading(false);
    navigate(-1);
  };
  return (
    <div className={`overlay-new-program active`}>
      <div className="box-that-create-a-new-program">
        <div className="title-of--thise-action">
          <button
            onClick={() => {
              setIsDeledModal(false);
            }}
            className="close-that"
          >
            <IoCloseSharp />
          </button>
          <p>Project Deletion</p>
        </div>
        <div className="smal-descritptpr">
          <strong style={{ color: "#C0392B" }}>Warning:</strong> Are you sure
          you want to delete your project?
        </div>

        {isLoading === false ? (
          <button
            onClick={deleteAccount}
            style={{ backgroundColor: "red" }}
            className={`next agreen   ${isLoading ? "loading" : ""}  `}
          >
            YES DELETE
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

export default DeleteProject;

import { IoCloseSharp } from "react-icons/io5";
import LoadingSpin from "Components/Loadingspin";
import { useState } from "react";
import UserMannager from "ApiServiveGateWay/userMannager";
import useUser from "hooks/useUser";
function DeleteAccountConfirmation({ closeModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const userMannager = new UserMannager(user?.userId);
  const deleteAccount = async () => {
    setIsLoading(true);
    await userMannager.deleteAccount();
    window.location.reload();
  };
  return (
    <div className={`overlay-new-program active`}>
      <div className="box-that-create-a-new-program">
        <div className="title-of--thise-action">
          <button onClick={closeModal} className="close-that">
            <IoCloseSharp />
          </button>
          <p>Account Deletion</p>
        </div>
        <div className="smal-descritptpr">
          <strong style={{ color: "#C0392B" }}>Warning:</strong> Deleting your
          account is irreversible. Are you sure you want to proceed with account
          deletion?"
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

export default DeleteAccountConfirmation;
